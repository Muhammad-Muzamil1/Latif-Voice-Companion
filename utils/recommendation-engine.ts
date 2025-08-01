import type { RecommendationResult } from "@/types/verse"
import { expandedVersesData } from "@/data/verses"

export class RecommendationEngine {
  private contextHistory: string[] = []
  private userFeedback: Map<number, boolean> = new Map()
  private verseUsageCount: Map<number, number> = new Map()
  private sessionContext: string[] = []

  // Enhanced Sindhi linguistic analysis
  private sindhiLinguisticAnalysis = {
    // Root word patterns for better matching
    rootPatterns: {
      love: ["محبت", "پيار", "عشق", "مينه", "پريم"],
      divine: ["الله", "خدا", "رب", "پرماتما", "ايشور"],
      separation: ["جدائي", "فراق", "وچھوڙو", "بچھڙو", "ويراگ"],
      pain: ["درد", "ڏک", "تڪليف", "پيڙ", "ڪشٽ"],
      joy: ["خوشي", "مسرت", "آنند", "سک", "هرش"],
      nature: ["قدرت", "فطرت", "ماحول", "ڪائنات", "جگت"],
      wisdom: ["عقل", "دانش", "گيان", "بدھي", "سمجھ"],
      soul: ["روح", "آتما", "جان", "پران", "چيتن"],
    },

    // Sindhi grammatical patterns
    grammaticalMarkers: {
      possessive: ["جو", "جي", "جا", "جون"],
      locative: ["۾", "تي", "وٽ", "کان"],
      instrumental: ["سان", "سٽ", "ذريعي"],
      temporal: ["وقت", "ڏينهن", "رات", "صبح", "شام"],
    },

    // Emotional intensity markers
    intensityMarkers: {
      high: ["تمام", "ڏاڍو", "انتهائي", "بيحد", "لامحدود"],
      medium: ["ڪافي", "ڪجهه", "ٿورو", "گهڻو"],
      low: ["ٿورڙو", "ٿوري", "ڪم", "گهٽ"],
    },
  }

  // Ultra-precise text normalization
  private ultraNormalizeSindhi(text: string): string {
    return (
      text
        // Character normalization
        .replace(/ي/g, "ی")
        .replace(/ك/g, "ک")
        .replace(/ى/g, "ی")
        .replace(/ء/g, "ٔ")
        .replace(/ہ/g, "ه")
        .replace(/ة/g, "ت")
        .replace(/ؤ/g, "و")
        .replace(/ئ/g, "ي")
        // Diacritic handling
        .replace(/[\u064B-\u0652]/g, "") // Remove diacritics for matching
        // Whitespace normalization
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase()
    )
  }

  // Advanced semantic analysis
  private performSemanticAnalysis(text: string): {
    themes: Array<{ name: string; confidence: number; keywords: string[] }>
    emotions: Array<{ name: string; intensity: number; markers: string[] }>
    semanticDensity: number
    linguisticComplexity: number
  } {
    const normalizedText = this.ultraNormalizeSindhi(text)
    const words = normalizedText.split(" ").filter((w) => w.length > 1)

    // Theme analysis with confidence scoring
    const themes = []
    for (const [themeName, patterns] of Object.entries(this.sindhiLinguisticAnalysis.rootPatterns)) {
      const matchedKeywords = []
      let confidence = 0

      for (const pattern of patterns) {
        const normalizedPattern = this.ultraNormalizeSindhi(pattern)
        if (normalizedText.includes(normalizedPattern)) {
          matchedKeywords.push(pattern)
          confidence += 0.2
        }
      }

      if (confidence > 0) {
        themes.push({
          name: this.mapToTheme(themeName),
          confidence: Math.min(confidence, 1.0),
          keywords: matchedKeywords,
        })
      }
    }

    // Emotion analysis with intensity
    const emotions = []
    const emotionPatterns = {
      Joyful: ["خوش", "مسرور", "خوشي", "مسرت", "شاد"],
      Melancholic: ["غم", "اداس", "دک", "افسوس", "رنج"],
      Longing: ["ياد", "انتظار", "تڏ", "اميد", "آس"],
      Peaceful: ["سکون", "امن", "آرام", "چين", "اطمينان"],
      Ecstatic: ["جوش", "جذبو", "مستي", "وجد", "بيخودي"],
      Contemplative: ["سوچ", "فکر", "غور", "تدبر", "مراقبو"],
      Betrayed: ["دغا", "ڌوڪو", "بيوفا", "خيانت", "فريب"],
    }

    for (const [emotionName, patterns] of Object.entries(emotionPatterns)) {
      const markers = []
      let intensity = 0

      for (const pattern of patterns) {
        const normalizedPattern = this.ultraNormalizeSindhi(pattern)
        if (normalizedText.includes(normalizedPattern)) {
          markers.push(pattern)
          intensity += 0.3
        }
      }

      // Check for intensity markers
      for (const [level, intensifiers] of Object.entries(this.sindhiLinguisticAnalysis.intensityMarkers)) {
        for (const intensifier of intensifiers) {
          if (normalizedText.includes(this.ultraNormalizeSindhi(intensifier))) {
            intensity *= level === "high" ? 1.5 : level === "medium" ? 1.2 : 0.8
          }
        }
      }

      if (intensity > 0) {
        emotions.push({
          name: emotionName,
          intensity: Math.min(intensity, 2.0),
          markers,
        })
      }
    }

    // Calculate semantic density and complexity
    const uniqueWords = new Set(words)
    const semanticDensity = uniqueWords.size / Math.max(words.length, 1)
    const linguisticComplexity = (themes.length + emotions.length) / Math.max(words.length, 1)

    return {
      themes: themes.sort((a, b) => b.confidence - a.confidence),
      emotions: emotions.sort((a, b) => b.intensity - a.intensity),
      semanticDensity,
      linguisticComplexity,
    }
  }

  private mapToTheme(rootTheme: string): string {
    const mapping: Record<string, string> = {
      love: "HumanLove",
      divine: "DivineLove",
      separation: "Separation",
      pain: "Separation",
      joy: "HumanLove",
      nature: "Nature",
      wisdom: "Wisdom",
      soul: "Spirituality",
    }
    return mapping[rootTheme] || "General"
  }

  // Ultra-accurate verse recommendation
  recommendVerse(transcript: string): RecommendationResult[] {
    // Add to session context
    this.sessionContext.push(transcript)
    if (this.sessionContext.length > 5) {
      this.sessionContext.shift()
    }

    // Perform deep semantic analysis
    const analysis = this.performSemanticAnalysis(transcript)
    const contextAnalysis = this.performSemanticAnalysis(this.sessionContext.join(" "))

    console.log("Ultra-accurate analysis:", { analysis, contextAnalysis })

    // Multi-dimensional scoring
    const scoredVerses = expandedVersesData.map((verse) => {
      let totalScore = 0
      const scoreBreakdown = {
        themeMatch: 0,
        emotionMatch: 0,
        keywordMatch: 0,
        contextMatch: 0,
        userFeedback: 0,
        novelty: 0,
      }

      // Theme matching with confidence weighting
      const matchingThemes = analysis.themes.filter((t) => t.name === verse.theme)
      if (matchingThemes.length > 0) {
        scoreBreakdown.themeMatch = matchingThemes[0].confidence * 0.3
      }

      // Emotion matching with intensity consideration
      const matchingEmotions = analysis.emotions.filter((e) => e.name === verse.emotion)
      if (matchingEmotions.length > 0) {
        scoreBreakdown.emotionMatch = (matchingEmotions[0].intensity / 2.0) * 0.25
      }

      // Advanced keyword matching
      const verseText = this.ultraNormalizeSindhi(verse.text)
      const transcriptWords = this.ultraNormalizeSindhi(transcript).split(" ")
      let keywordMatches = 0

      for (const word of transcriptWords) {
        if (word.length > 2 && verseText.includes(word)) {
          keywordMatches++
        }
      }
      scoreBreakdown.keywordMatch = (keywordMatches / Math.max(transcriptWords.length, 1)) * 0.2

      // Context matching
      const contextWords = this.ultraNormalizeSindhi(this.sessionContext.join(" ")).split(" ")
      let contextMatches = 0
      for (const word of contextWords) {
        if (word.length > 2 && verseText.includes(word)) {
          contextMatches++
        }
      }
      scoreBreakdown.contextMatch = (contextMatches / Math.max(contextWords.length, 1)) * 0.15

      // User feedback weighting
      if (this.userFeedback.has(verse.id)) {
        scoreBreakdown.userFeedback = this.userFeedback.get(verse.id) ? 0.1 : -0.2
      }

      // Novelty bonus (prefer less frequently shown verses)
      const usageCount = this.verseUsageCount.get(verse.id) || 0
      scoreBreakdown.novelty = Math.max(0, 0.05 - usageCount * 0.01)

      totalScore = Object.values(scoreBreakdown).reduce((sum, score) => sum + score, 0)

      return {
        verse,
        relevanceScore: Math.min(totalScore, 1.0),
        matchedThemes: analysis.themes.map((t) => t.name),
        emotionMatch: analysis.emotions[0]?.name || "Neutral",
        scoreBreakdown,
      }
    })

    // Sort by score and select top recommendations
    const topRecommendations = scoredVerses.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 3)

    // Update usage counts
    topRecommendations.forEach((rec) => {
      const currentCount = this.verseUsageCount.get(rec.verse.id) || 0
      this.verseUsageCount.set(rec.verse.id, currentCount + 1)
    })

    return topRecommendations
  }

  // Enhanced feedback learning
  logRelevance(verseId: number, isRelevant: boolean): void {
    this.userFeedback.set(verseId, isRelevant)

    // Adjust related verses based on feedback
    if (isRelevant) {
      const verse = expandedVersesData.find((v) => v.id === verseId)
      if (verse) {
        // Boost similar verses
        expandedVersesData
          .filter((v) => v.theme === verse.theme && v.emotion === verse.emotion && v.id !== verseId)
          .forEach((v) => {
            const currentFeedback = this.userFeedback.get(v.id)
            if (currentFeedback === undefined) {
              // Give slight positive bias to similar verses
              this.userFeedback.set(v.id, true)
            }
          })
      }
    }

    console.log(`Ultra-accurate feedback logged for verse ${verseId}: ${isRelevant ? "Relevant" : "Irrelevant"}`)
  }

  // Get accuracy metrics
  getAccuracyMetrics(): {
    totalFeedback: number
    positiveRatio: number
    averageScore: number
    themeAccuracy: number
  } {
    const feedbackEntries = Array.from(this.userFeedback.entries())
    const totalFeedback = feedbackEntries.length
    const positiveCount = feedbackEntries.filter(([_, isPositive]) => isPositive).length
    const positiveRatio = totalFeedback > 0 ? positiveCount / totalFeedback : 0

    return {
      totalFeedback,
      positiveRatio,
      averageScore: positiveRatio,
      themeAccuracy: positiveRatio, // Simplified for now
    }
  }
}
