"use client"

import { useState } from "react"
import { Mic, MicOff, VolumeX, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { WaveformAnimation } from "./waveform-animation"
import { RecommendationEngine } from "@/utils/recommendation-engine"
import type { RecommendationResult } from "@/types/verse"
import { VerseCard } from "./verse-card"

export function VoiceInterface() {
  const {
    isListening,
    transcript,
    interimTranscript,
    confidence,
    error,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
  } = useSpeechRecognition()

  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [engine] = useState(() => new RecommendationEngine())
  const [isSpeaking, setIsSpeaking] = useState(false)

  const speakVerse = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "ur-PK"
      utterance.rate = 0.8
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const handleMicClick = () => {
    if (isListening) {
      // If currently listening, stop and trigger analysis
      stopListening()
      const fullText = transcript + interimTranscript // Get the complete transcript
      if (fullText.trim().length > 0) {
        setIsProcessing(true) // Show processing indicator
        console.log("Triggering analysis for transcript:", fullText)
        // Simulate API call or heavy processing for recommendations
        setTimeout(() => {
          const results = engine.recommendVerse(fullText)
          console.log("Recommendations after manual stop:", results)
          setRecommendations(results)
          setIsProcessing(false) // Hide processing indicator
        }, 1500) // A slight delay to simulate processing time
      } else {
        setRecommendations([]) // Clear recommendations if no speech was captured
      }
    } else {
      // If not listening, start
      resetTranscript() // Clear previous transcript and interim
      setRecommendations([]) // Clear previous recommendations
      setIsProcessing(false) // Ensure processing indicator is off
      startListening()
    }
  }

  const handleClearTranscript = () => {
    resetTranscript()
    setRecommendations([])
    setIsProcessing(false)
  }

  const handleFeedback = (verseId: number, isRelevant: boolean) => {
    engine.logRelevance(verseId, isRelevant)
    console.log(`Feedback recorded: Verse ${verseId} is ${isRelevant ? "relevant" : "not relevant"}`)
  }

  if (!isSupported) {
    return (
      <Card className="w-full max-w-md mx-auto bg-ajrak-cream text-ajrak-dark border-ajrak-red/30 shadow-lg">
        <CardContent className="p-6 text-center">
          <p className="text-destructive">Speech recognition is not supported in this browser.</p>
          <p className="text-sm text-ajrak-dark/80 mt-2">Please use Chrome, Edge, or Safari for the best experience.</p>
        </CardContent>
      </Card>
    )
  }

  const fullTranscript = transcript + interimTranscript

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Main Voice Interface */}
      <Card className="relative overflow-hidden bg-ajrak-cream text-ajrak-dark border-ajrak-red/30 shadow-lg transition-all duration-300">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ajrak-dark mb-2">Latif Voice Companion</h2>
            <p className="text-ajrak-dark/80">Speak in Sindhi. Analysis will begin after you stop the microphone.</p>
          </div>

          {/* Waveform Animation */}
          <div className="mb-6 flex justify-center">
            <WaveformAnimation isActive={isListening} className="rounded-lg border border-ajrak-blue/30" />
          </div>

          {/* Mic Button */}
          <div className="mb-6 flex justify-center gap-4">
            <Button
              onClick={handleMicClick}
              size="lg"
              className={`w-20 h-20 rounded-full transition-all duration-300 ${
                isListening
                  ? "bg-ajrak-red hover:bg-ajrak-red/90 animate-pulse"
                  : "bg-ajrak-blue hover:bg-ajrak-blue/90"
              }`}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 text-ajrak-cream" />
              ) : (
                <Mic className="w-8 h-8 text-ajrak-cream" />
              )}
            </Button>

            {fullTranscript && (
              <Button
                onClick={handleClearTranscript}
                variant="outline"
                size="lg"
                className="w-16 h-16 rounded-full bg-transparent border-ajrak-dark/30 text-ajrak-dark hover:bg-ajrak-dark/10 transition-all duration-300"
              >
                <Trash2 className="w-6 h-6" />
              </Button>
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            {isListening && (
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-ajrak-red rounded-full animate-pulse"></div>
                <p className="text-ajrak-red font-medium">Listening continuously in Sindhi...</p>
              </div>
            )}
            {isProcessing && (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-ajrak-green"></div>
                <p className="text-ajrak-green font-medium">Analyzing speech and finding verses...</p>
              </div>
            )}
            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>

          {/* Real-time Sindhi Transcript */}
          {fullTranscript && (
            <div className="mt-4 space-y-3">
              <div className="p-4 bg-gradient-to-r from-ajrak-cream/50 to-ajrak-cream rounded-lg text-left border border-ajrak-green/30 shadow-inner transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-ajrak-green">Sindhi Text Output:</p>
                  <div className="flex gap-2">
                    {confidence > 0 && (
                      <Badge variant="outline" className="text-xs border-ajrak-dark/30 text-ajrak-dark">
                        {Math.round(confidence * 100)}% confident
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs bg-ajrak-gold/20 text-ajrak-gold">
                      {fullTranscript.length} chars
                    </Badge>
                  </div>
                </div>

                <div className="text-right">
                  {/* Final transcript in Sindhi */}
                  <span className="text-ajrak-dark font-medium text-lg sindhi-font leading-relaxed">{transcript}</span>
                  {/* Interim transcript in Sindhi */}
                  <span className="text-ajrak-blue opacity-70 text-lg sindhi-font leading-relaxed">
                    {interimTranscript}
                  </span>
                  {/* Cursor */}
                  {isListening && <span className="animate-pulse text-ajrak-blue font-bold">|</span>}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-ajrak-dark">Ultra-Accurate Verse Recommendations</h3>
            <Badge variant="default" className="text-xs bg-ajrak-red text-ajrak-cream">
              {Math.round(recommendations[0].relevanceScore * 100)}% match
            </Badge>
          </div>

          {recommendations.map((recommendation, index) => (
            <VerseCard
              key={recommendation.verse.id}
              verse={recommendation.verse}
              relevanceScore={recommendation.relevanceScore}
              matchedThemes={recommendation.matchedThemes}
              emotionMatch={recommendation.emotionMatch}
              onSpeak={() => speakVerse(recommendation.verse.text)}
              onStopSpeak={stopSpeaking}
              isSpeaking={isSpeaking}
              rank={index + 1}
              onFeedback={handleFeedback}
            />
          ))}
        </div>
      )}

      {/* Audio Controls */}
      {isSpeaking && (
        <Card className="fixed bottom-4 right-4 w-auto bg-ajrak-cream text-ajrak-dark border-ajrak-red/30 shadow-lg">
          <CardContent className="p-3">
            <Button
              onClick={stopSpeaking}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-ajrak-cream text-ajrak-dark border-ajrak-dark/30 hover:bg-ajrak-dark/10 transition-all duration-300"
            >
              <VolumeX className="w-4 h-4" />
              Stop Audio
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
