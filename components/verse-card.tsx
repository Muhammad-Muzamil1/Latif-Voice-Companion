"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, Volume2, Share2, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Verse } from "@/types/verse"
import "./verse-card.css" // Import the new CSS file

interface VerseCardProps {
  verse: Verse
  relevanceScore: number
  matchedThemes: string[]
  emotionMatch: string
  onSpeak: () => void
  onStopSpeak: () => void
  isSpeaking: boolean
  rank: number
  onFeedback?: (verseId: number, isRelevant: boolean) => void // Add this
}

export function VerseCard({
  verse,
  relevanceScore,
  matchedThemes,
  emotionMatch,
  onSpeak,
  onStopSpeak,
  isSpeaking,
  rank,
  onFeedback,
}: VerseCardProps) {
  const [feedback, setFeedback] = useState<"positive" | "negative" | null>(null)
  const [showTranslation, setShowTranslation] = useState(false)

  const handleFeedback = (type: "positive" | "negative") => {
    setFeedback(type)
    const isRelevant = type === "positive"

    // Call the parent feedback handler
    if (onFeedback) {
      onFeedback(verse.id, isRelevant)
    }

    console.log(`Feedback for verse ${verse.id}: ${type}`)

    // Show user confirmation
    const message = isRelevant
      ? "Thank you! This helps improve recommendations."
      : "Thanks for the feedback. We'll improve future suggestions."

    // You could show a toast notification here
    setTimeout(() => {
      console.log(message)
    }, 100)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shah Jo Risalo Verse",
          text: `${verse.text}\n\n- ${verse.sur}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${verse.text}\n\n- ${verse.sur}`)
      alert("Verse copied to clipboard!")
    }
  }

  return (
    <Card className="relative overflow-hidden border-l-4 border-l-ajrak-red bg-ajrak-cream text-ajrak-dark shadow-md transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs bg-ajrak-gold/20 text-ajrak-gold">
              #{rank}
            </Badge>
            <Badge variant="outline" className="text-xs border-ajrak-dark/30 text-ajrak-dark">
              {Math.round(relevanceScore * 100)}% match
            </Badge>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSpeak}
              disabled={isSpeaking}
              className="text-ajrak-dark hover:bg-ajrak-dark/10 transition-all duration-300"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-ajrak-dark hover:bg-ajrak-dark/10 transition-all duration-300"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Verse Text */}
        <div className="text-right">
          <p className="verse-text text-ajrak-dark">{verse.text}</p>
          <p className="verse-sur text-ajrak-dark/80">— {verse.sur}</p>
        </div>

        {/* Translation Toggle */}
        {verse.translation && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTranslation(!showTranslation)}
              className="text-xs text-ajrak-blue hover:text-ajrak-blue/80 p-0 h-auto transition-all duration-300"
            >
              <BookOpen className="w-3 h-3 mr-1" />
              {showTranslation ? "Hide" : "Show"} Translation
            </Button>
            {showTranslation && <p className="text-sm text-ajrak-dark/70 mt-2 italic">{verse.translation}</p>}
          </div>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="default" className="text-xs bg-ajrak-red text-ajrak-cream">
            {verse.theme}
          </Badge>
          <Badge variant="secondary" className="text-xs bg-ajrak-green/20 text-ajrak-green">
            {verse.emotion}
          </Badge>
          {matchedThemes.map((theme) => (
            <Badge key={theme} variant="outline" className="text-xs border-ajrak-dark/30 text-ajrak-dark">
              {theme}
            </Badge>
          ))}
        </div>

        {/* Feedback Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-ajrak-dark/20">
          <div className="flex gap-2">
            <Button
              variant={feedback === "positive" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleFeedback("positive")}
              className={`text-xs transition-all duration-300 ${feedback === "positive" ? "bg-ajrak-green text-ajrak-cream" : "text-ajrak-dark hover:bg-ajrak-dark/10"}`}
            >
              <ThumbsUp className="w-3 h-3 mr-1" />
              Relevant
            </Button>
            <Button
              variant={feedback === "negative" ? "destructive" : "ghost"}
              size="sm"
              onClick={() => handleFeedback("negative")}
              className={`text-xs transition-all duration-300 ${feedback === "negative" ? "bg-destructive text-destructive-foreground" : "text-ajrak-dark hover:bg-ajrak-dark/10"}`}
            >
              <ThumbsDown className="w-3 h-3 mr-1" />
              Not Relevant
            </Button>
          </div>
          <p className="text-xs text-ajrak-dark/60">Emotion: {emotionMatch}</p>
        </div>
      </CardContent>
    </Card>
  )
}
