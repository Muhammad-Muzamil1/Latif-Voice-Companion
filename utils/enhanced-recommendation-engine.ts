import type { Verse, RecommendationResult } from "@/types/verse"
import { expandedVersesData } from "@/data/verses" // Corrected import

export class EnhancedRecommendationEngine {
  private contextHistory: string[] = []
  private userFeedback: Map<number, boolean> = new Map()
  private sindhiStopWords = ["آهي", "آهن", "جو", "جي", "کي", "۾", "تي", "سان", "اي", "هن", "اهو", "اها"]

  // Enhanced Sindhi text normalization
  private normalizeSindhi(text: string): string {
    return text
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/ى/g, "ی")
      .replace(/ء/g, "ٔ")
      .replace(/ہ/g, "ه")
      .replace(/ة/g, "ت")
      .trim()
      .toLowerCase()
  }

  // Remove stop words for better keyword matching
  private removeStopWords(text: string): string {
    const words = text.split(" ")
    return words.filter((word) => !this.sindhiStopWords.includes(word) && word.length > 1).join(" ")
  }

  // Enhanced context analysis with weighted scoring
  private analyzeContext(transcript: string): {
    theme: string
    emotion: string
    confidence: number
    keywords: string[]
  } {
    const normalizedText = this.normalizeSindhi(transcript)
    const cleanText = this.removeStopWords(normalizedText)

    // Enhanced theme detection with more specific patterns
    const themes = {
      DivineLove: {
        patterns: [
          /الله/g,
          /محبوب/g,
          /فنا/g,
          /خدا/g,
          /رب/g,
          /عشق.*الله/g,
          /روحاني/g,
          /رحمت/g,
          /عبادت.*خدا/g,
          /ذڪر/g,
          /واحد/g,
          /لا.*شريک/g,
        ],
        weight: 2.0,
      },
      HumanLove: {
        patterns: [
          /سڄڻ/g,
          /يار/g,
          /محبت/g,
          /دل.*يار/g,
          /عاشق/g,
          /معشوق/g,
          /پيار/g,
          /محبوب.*انسان/g,
          /دل.*محبت/g,
          /عشق.*انسان/g,
        ],
        weight: 2.0,
      },
      Separation: {
        patterns: [
          /جدائي/g,
          /فراق/g,
          /دوري/g,
          /بچھڙو/g,
          /انتظار/g,
          /ياد/g,
          /تڏ/g,
          /غم.*فراق/g,
          /دل.*ياد/g,
          /تنهائي/g,
          /اڪيلو/g,
        ],
        weight: 2.0,
      },
      Spirituality: {
        patterns: [
          /روح/g,
          /عبادت/g,
          /ايمان/g,
          /نماز/g,
          /قرآن/g,
          /دين/g,
          /تقوي/g,
          /سجدو/g,
          /دعا/g,
          /توبه/g,
          /استغفار/g,
          /حج/g,
          /زڪات/g,
        ],
        weight: 1.8,
      },
      Nature: {
        patterns: [
          /گل/g,
          /باغ/g,
          /دريا/g,
          /چاند/g,
          /سج/g,
          /هوا/g,
          /برسات/g,
          /بهار/g,
          /تارا/g,
          /سمنڊ/g,
          /جهيل/g,
          /ٻيلو/g,
          /پهاڙ/g,
          /وڻ/g,
        ],
        weight: 1.5,
      },
      Wisdom: {
        patterns: [
          /عقل/g,
          /دانش/g,
          /سمجھ/g,
          /علم/g,
          /حکمت/g,
          /سبق/g,
          /نصيحت/g,
          /تجربو/g,
          /صبر/g,
          /حلم/g,
          /تحمل/g,
          /سچ/g,
          /راستو/g,
        ],
        weight: 1.7,
      },
    }

    // Enhanced emotion detection with context awareness
    const emotions = {
      Joyful: {
        patterns: [
          /خوش/g,
          /مسرور/g,
          /سُک/g,
          /خوشي/g,
          /مزو/g,
          /راحت/g,
          /جوش/g,
          /خوشحال/g,
          /مسرت/g,
          /شادي/g,
          /جشن/g,
          /کلڻ/g,
        ],
        weight: 2.0,
      },
      Melancholic: {
        patterns: [/غم/g, /دک/g, /سوڳ/g, /افسوس/g, /رنج/g, /پريشاني/g, /اداس/g, /مايوس/g, /نراش/g, /ڏک/g, /تڪليف/g],
        weight: 2.0,
      },
      Betrayed: {
        patterns: [/دغا/g, /ڌوڪو/g, /بيوفا/g, /خيانت/g, /فريب/g, /جھوٽ/g, /ٺڳي/g, /مڪر/g, /چال/g, /ناانصافي/g],
        weight: 2.5,
      },
      Longing: {
        patterns: [/انتظار/g, /ياد/g, /تڏ/g, /اميد/g, /آس/g, /تمنا/g, /خواهش/g, /ارمان/g, /حسرت/g, /طلب/g, /چاهت/g],
        weight: 2.0,
      },
      Contemplative: {
        patterns: [/سوچ/g, /فکر/g, /غور/g, /تدبر/g, /مراقبو/g, /ذکر/g, /صبر/g, /تأمل/g, /خيال/g, /چنتن/g, /مطالعو/g],
        weight: 1.8,
      },
      Peaceful: {
        patterns: [/سکون/g, /امن/g, /آرام/g, /صبر/g, /سلامتي/g, /چين/g, /اطمينان/g, /راحت/g, /خاموشي/g, /سادگي/g],
        weight: 1.5,
      },
      Ecstatic: {
        patterns: [/جوش/g, /جذبو/g, /ديوانگي/g, /مستي/g, /بيخودي/g, /وجد/g, /حال/g, /کيف/g, /سرور/g, /انتهاء/g],
        weight: 2.2,
      },
    }

    // Calculate theme scores with keyword extraction
    let maxThemeScore = 0
    let detectedTheme = "General"
    let matchedKeywords: string[] = []

    for (const [theme, config] of Object.entries(themes)) {
      let score = 0
      const themeKeywords: string[] = []

      for (const pattern of config.patterns) {
        const matches = cleanText.match(pattern) || []
        if (matches.length > 0) {
          score += matches.length * config.weight
          themeKeywords.push(...matches)
        }
      }

      if (score > maxThemeScore) {
        maxThemeScore = score
        detectedTheme = theme
        matchedKeywords = themeKeywords
      }
    }

    // Calculate emotion scores
    let maxEmotionScore = 0
    let detectedEmotion = "Neutral"

    for (const [emotion, config] of Object.entries(emotions)) {
      let score = 0

      for (const pattern of config.patterns) {
        const matches = cleanText.match(pattern) || []
        score += matches.length * config.weight
      }

      if (score > maxEmotionScore) {
        maxEmotionScore = score
        detectedEmotion = emotion
      }
    }

    // Calculate confidence based on keyword density and match strength
    const totalWords = cleanText.split(" ").length
    const keywordDensity = matchedKeywords.length / Math.max(totalWords, 1)
    const confidence = Math.min((maxThemeScore + maxEmotionScore) / 5 + keywordDensity, 1.0)

    return {
      theme: detectedTheme,
      emotion: detectedEmotion,
      confidence,
      keywords: matchedKeywords,
    }
  }

  // Enhanced recommendation with multiple scoring factors
  recommendVerse(transcript: string): RecommendationResult[] {
    // Add to context history
    this.contextHistory.push(transcript)
    if (this.contextHistory.length > 3) {
      this.contextHistory.shift()
    }

    // Analyze current input + context
    const contextualInput = this.contextHistory.join(" ")
    const analysis = this.analyzeContext(contextualInput)

    console.log("Enhanced Analysis:", analysis)

    // Filter verses based on detected theme and emotion
    let themeVerses: Verse[] = expandedVersesData.filter((v) => v.theme === analysis.theme)

    // If no specific theme verses, consider all verses for keyword matching
    if (themeVerses.length === 0) {
      themeVerses = expandedVersesData
    }

    // Multi-tier matching strategy
    const recommendations: RecommendationResult[] = []

    // 1. Exact theme + emotion match (highest priority)
    const exactMatches = this.scoreVerses(
      themeVerses.filter((v) => v.emotion === analysis.emotion),
      analysis,
      0.95,
    )
    recommendations.push(...exactMatches.slice(0, 2))

    // 2. Same theme, compatible emotions
    if (recommendations.length < 3) {
      const compatibleEmotions = this.getCompatibleEmotions(analysis.emotion)
      for (const emotion of compatibleEmotions) {
        const compatibleMatches = this.scoreVerses(
          themeVerses.filter((v) => v.emotion === emotion),
          analysis,
          0.8,
        )
        recommendations.push(...compatibleMatches.slice(0, 3 - recommendations.length))
        if (recommendations.length >= 3) break
      }
    }

    // 3. Keyword-based matching across all verses (if still not enough recommendations)
    if (recommendations.length < 3) {
      const keywordMatches = this.findKeywordMatches(analysis)
      recommendations.push(...keywordMatches.slice(0, 3 - recommendations.length))
    }

    // Remove duplicates and sort by score
    const uniqueRecommendations = recommendations
      .filter((rec, index, arr) => arr.findIndex((r) => r.verse.id === rec.verse.id) === index)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 3)

    return uniqueRecommendations.length > 0 ? uniqueRecommendations : this.getFallbackRecommendations(analysis)
  }

  private scoreVerses(verses: Verse[], analysis: any, baseScore: number): RecommendationResult[] {
    return verses
      .map((verse) => {
        let score = baseScore

        // Apply user feedback weighting
        if (this.userFeedback.has(verse.id)) {
          score *= this.userFeedback.get(verse.id) ? 1.3 : 0.4
        }

        // Keyword matching bonus
        const verseText = this.normalizeSindhi(verse.text)
        const keywordMatches = analysis.keywords.filter((keyword: string) => verseText.includes(keyword)).length
        score += keywordMatches * 0.1

        // Confidence factor
        score *= analysis.confidence

        return {
          verse,
          relevanceScore: Math.min(score, 1.0),
          matchedThemes: [analysis.theme],
          emotionMatch: analysis.emotion,
        }
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
  }

  private getCompatibleEmotions(emotion: string): string[] {
    const emotionCompatibility: Record<string, string[]> = {
      Joyful: ["Peaceful", "Ecstatic"],
      Melancholic: ["Longing", "Contemplative"],
      Betrayed: ["Melancholic", "Longing"],
      Longing: ["Melancholic", "Contemplative"],
      Contemplative: ["Peaceful", "Longing"],
      Peaceful: ["Contemplative", "Joyful"],
      Ecstatic: ["Joyful", "Contemplative"],
    }
    return emotionCompatibility[emotion] || []
  }

  private findKeywordMatches(analysis: any): RecommendationResult[] {
    const matches: RecommendationResult[] = []

    for (const verse of expandedVersesData) {
      const verseText = this.normalizeSindhi(verse.text)
      let keywordScore = 0

      for (const keyword of analysis.keywords) {
        if (verseText.includes(keyword)) {
          keywordScore += 0.2
        }
      }

      if (keywordScore > 0.1) {
        matches.push({
          verse,
          relevanceScore: keywordScore * analysis.confidence,
          matchedThemes: [analysis.theme],
          emotionMatch: analysis.emotion,
        })
      }
    }

    return matches.sort((a, b) => b.relevanceScore - a.relevanceScore)
  }

  private getFallbackRecommendations(analysis: any): RecommendationResult[] {
    // Get random verses with slight preference for detected theme
    const themeVerses = expandedVersesData.filter((v) => v.theme === analysis.theme)
    const fallbackVerses = themeVerses.length > 0 ? themeVerses : expandedVersesData

    const shuffled = [...fallbackVerses].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 3).map((verse, index) => ({
      verse,
      relevanceScore: 0.4 - index * 0.05,
      matchedThemes: [analysis.theme || "General"],
      emotionMatch: analysis.emotion || "Neutral",
    }))
  }

  // User feedback integration
  logRelevance(verseId: number, isRelevant: boolean): void {
    this.userFeedback.set(verseId, isRelevant)
    console.log(`Enhanced feedback logged for verse ${verseId}: ${isRelevant ? "Relevant" : "Irrelevant"}`)
  }

  // Search functionality
  searchVerses(query: string): Verse[] {
    const normalizedQuery = this.normalizeSindhi(query)
    return expandedVersesData.filter(
      (verse) =>
        this.normalizeSindhi(verse.text).includes(normalizedQuery) ||
        verse.theme.toLowerCase().includes(query.toLowerCase()) ||
        verse.sur.toLowerCase().includes(query.toLowerCase()) ||
        (verse.translation && verse.translation.toLowerCase().includes(query.toLowerCase())),
    )
  }
}
