"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface SpeechRecognitionHook {
  isListening: boolean
  transcript: string
  confidence: number
  error: string | null
  startListening: () => void
  stopListening: () => void
  resetTranscript: () => void
  isSupported: boolean
}

export function useSpeechRecognition(): SpeechRecognitionHook {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [confidence, setConfidence] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(false)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const continuousListenRef = useRef(false)
  const lastTranscriptRef = useRef("")
  const isMountedRef = useRef(false)

  // Initialize speech recognition
  useEffect(() => {
    isMountedRef.current = true
    
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()
      
      const recognition = recognitionRef.current
      recognition.continuous = true
      recognition.interimResults = true
      recognition.maxAlternatives = 1
      recognition.lang = "sd-SD" // Sindhi language code
      
      recognition.onstart = () => {
        if (isMountedRef.current) {
          setIsListening(true)
          setError(null)
        }
      }
      
      recognition.onresult = (event) => {
        let finalTranscript = ""
        let interimTranscript = ""
        let highestConfidence = 0
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i]
          
          if (result.isFinal) {
            finalTranscript += result[0].transcript + " "
            if (result[0].confidence > highestConfidence) {
              highestConfidence = result[0].confidence
            }
          } else {
            interimTranscript += result[0].transcript
          }
        }
        
        if (isMountedRef.current) {
          if (finalTranscript) {
            setTranscript(prev => prev + finalTranscript)
            lastTranscriptRef.current = finalTranscript
            setConfidence(highestConfidence)
          } else if (interimTranscript) {
            setTranscript(prev => {
              // Remove previous interim result
              const base = prev.endsWith(lastTranscriptRef.current) 
                ? prev.slice(0, -lastTranscriptRef.current.length) 
                : prev
              return base + interimTranscript
            })
            lastTranscriptRef.current = interimTranscript
          }
        }
      }
      
      recognition.onerror = (event) => {
        if (isMountedRef.current) {
          setError(`Recognition error: ${event.error}`)
          setIsListening(false)
          
          // Auto-recover from common errors
          if (['no-speech', 'audio-capture', 'network'].includes(event.error)) {
            setTimeout(() => {
              if (continuousListenRef.current && recognitionRef.current) {
                try {
                  recognitionRef.current.start()
                } catch (e) {
                  console.error("Recovery start failed:", e)
                }
              }
            }, 1000)
          }
        }
      }
      
      recognition.onend = () => {
        if (isMountedRef.current) {
          setIsListening(false)
          
          // Auto-restart if in continuous mode
          if (continuousListenRef.current) {
            setTimeout(() => {
              if (recognitionRef.current && !isListening) {
                try {
                  recognitionRef.current.start()
                } catch (e) {
                  console.error("Auto-restart failed:", e)
                }
              }
            }, 300)
          }
        }
      }
    } else {
      setIsSupported(false)
      setError("Speech recognition not supported in this browser")
    }

    return () => {
      isMountedRef.current = false
      if (recognitionRef.current) {
        recognitionRef.current.onend = null
        recognitionRef.current.onerror = null
        recognitionRef.current.onresult = null
        recognitionRef.current.onstart = null
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startListening = useCallback(() => {
    continuousListenRef.current = true
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        setError("Failed to start: " + (error as Error).message)
      }
    }
  }, [isListening])

  const stopListening = useCallback(() => {
    continuousListenRef.current = false
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }, [isListening])

  const resetTranscript = useCallback(() => {
    setTranscript("")
    setConfidence(0)
    lastTranscriptRef.current = ""
  }, [])

  return {
    isListening,
    transcript,
    confidence,
    error,
    startListening,
    stopListening,
    resetTranscript,
    isSupported
  }
}
