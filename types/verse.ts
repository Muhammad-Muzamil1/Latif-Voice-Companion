export interface Verse {
  id: number
  text: string
  theme: string
  emotion: string
  sur: string
  translation?: string
}

export interface SpeechResult {
  text: string
  confidence: number
  timestamp: Date
}

export interface RecommendationResult {
  verse: Verse
  relevanceScore: number
  matchedThemes: string[]
  emotionMatch: string
}

export interface UserFeedback {
  verseId: number
  isRelevant: boolean
  timestamp: Date
}
