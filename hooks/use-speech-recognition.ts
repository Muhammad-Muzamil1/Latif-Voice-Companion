"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface SpeechRecognitionHook {
  isListening: boolean
  transcript: string
  interimTranscript: string
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
  const [interimTranscript, setInterimTranscript] = useState("")
  const [confidence, setConfidence] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(false)

  const recognitionRef = useRef<any>(null)
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isManualStopRef = useRef(false) // Ref to track user-initiated stop

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        setIsSupported(true)
        recognitionRef.current = new SpeechRecognition()

        const recognition = recognitionRef.current

        recognition.continuous = true // Set to true for continuous listening until manual stop
        recognition.interimResults = true
        recognition.maxAlternatives = 1

        recognition.lang = "ur-PK" // Using Urdu as primary language (closest to Sindhi)

        recognition.onstart = () => {
          console.log("Speech recognition started")
          setIsListening(true)
          setError(null)
          isManualStopRef.current = false // Reset manual stop flag on start
          if (restartTimeoutRef.current) {
            clearTimeout(restartTimeoutRef.current)
            restartTimeoutRef.current = null
          }
        }

        recognition.onresult = (event) => {
          let currentInterim = ""
          let currentFinal = ""
          let currentConfidence = 0

          // Process all results from the current event
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const result = event.results[i]
            const transcriptPart = result[0].transcript
            currentConfidence = result[0].confidence

            if (result.isFinal) {
              currentFinal += transcriptPart + " "
            } else {
              currentInterim += transcriptPart
            }
          }

          if (currentFinal) {
            setTranscript((prev) => prev + currentFinal)
            setInterimTranscript("") // Clear interim once final is processed
          } else {
            setInterimTranscript(currentInterim)
          }
          setConfidence(currentConfidence)
        }

        recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error)
          setError(`Speech recognition error: ${event.error}`)
          setIsListening(false) // Stop listening on error

          // For 'aborted' or 'no-speech', attempt to restart if not manual stop
          // In continuous mode, these errors usually mean a problem, so we try to recover.
          if (
            !isManualStopRef.current &&
            (event.error === "aborted" || event.error === "no-speech" || event.error === "audio-capture")
          ) {
            console.log("Attempting to restart speech recognition due to recoverable error.")
            restartTimeoutRef.current = setTimeout(() => {
              try {
                recognition.start()
              } catch (e) {
                console.error("Error restarting recognition after error:", e)
                setError("Failed to restart speech recognition automatically after error.")
              }
            }, 100) // Short delay before restarting
          }
        }

        recognition.onend = () => {
          console.log("Speech recognition ended (onend event).")
          setIsListening(false) // Always set to false when recognition ends

          // If it was NOT a manual stop, and continuous was intended, it means an unexpected end.
          // In continuous mode, onend only fires on stop() or unexpected termination.
          // So, if not manual stop, it's an unexpected end, try to restart.
          if (!isManualStopRef.current) {
            console.log("Unexpected speech recognition end. Attempting to restart.")
            restartTimeoutRef.current = setTimeout(() => {
              try {
                recognition.start()
              } catch (e) {
                console.error("Error restarting recognition after unexpected end:", e)
                setError("Failed to restart speech recognition automatically after unexpected end.")
              }
            }, 100)
          }
          isManualStopRef.current = false // Reset flag after handling
        }
      }
    }

    return () => {
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current)
      }
      // Clean up recognition object and its event handlers on unmount
      if (recognitionRef.current) {
        recognitionRef.current.stop()
        recognitionRef.current.onresult = null
        recognitionRef.current.onerror = null
        recognitionRef.current.onend = null
      }
    }
  }, []) // Empty dependency array ensures this runs once on mount

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        isManualStopRef.current = false // Ensure this is false when starting
        recognitionRef.current.start()
      } catch (error) {
        console.error("Error starting recognition:", error)
        setError("Failed to start speech recognition")
      }
    }
  }, [isListening])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      isManualStopRef.current = true // Set flag for manual stop
      recognitionRef.current.stop()
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current)
        restartTimeoutRef.current = null
      }
    }
  }, [isListening])

  const resetTranscript = useCallback(() => {
    setTranscript("")
    setInterimTranscript("")
    setConfidence(0)
    setError(null)
    // If listening, stop and restart to clear internal state
    if (isListening) {
      stopListening()
      // A small delay before restarting to ensure state is fully reset
      setTimeout(() => startListening(), 200)
    }
  }, [isListening, startListening, stopListening])

  return {
    isListening,
    transcript,
    interimTranscript,
    confidence,
    error,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
  }
}
