"use client"

import { useState, useMemo } from "react"
import { Search, Filter, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { expandedVersesData } from "@/data/verses"
import type { Verse } from "@/types/verse"
import { RecommendationEngine } from "@/utils/recommendation-engine"

export function VerseLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTheme, setSelectedTheme] = useState<string>("all")
  const [selectedEmotion, setSelectedEmotion] = useState<string>("all")
  const [engine] = useState(() => new RecommendationEngine())

  // Get unique themes and emotions
  const themes = useMemo(() => {
    const uniqueThemes = [...new Set(expandedVersesData.map((v) => v.theme))]
    return uniqueThemes.sort()
  }, [])

  const emotions = useMemo(() => {
    const uniqueEmotions = [...new Set(expandedVersesData.map((v) => v.emotion))]
    return uniqueEmotions.sort()
  }, [])

  // Filter verses
  const filteredVerses = useMemo(() => {
    let filtered = expandedVersesData

    // Search filter
    if (searchQuery.trim()) {
      filtered = engine.searchVerses(searchQuery)
    }

    // Theme filter
    if (selectedTheme !== "all") {
      filtered = filtered.filter((verse) => verse.theme === selectedTheme)
    }

    // Emotion filter
    if (selectedEmotion !== "all") {
      filtered = filtered.filter((verse) => verse.emotion === selectedEmotion)
    }

    return filtered
  }, [searchQuery, selectedTheme, selectedEmotion, engine])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTheme("all")
    setSelectedEmotion("all")
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-ajrak-dark mb-2">Shah Jo Risalo Library</h2>
        <p className="text-ajrak-dark/80">Explore the complete collection of verses</p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-ajrak-cream text-ajrak-dark border-ajrak-red/30 shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-ajrak-dark">
            <Search className="w-5 h-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ajrak-dark/60 w-4 h-4" />
            <Input
              placeholder="Search verses, themes, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-ajrak-cream border-ajrak-dark/30 text-ajrak-dark transition-all duration-300"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger className="bg-ajrak-cream border-ajrak-dark/30 text-ajrak-dark transition-all duration-300">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent className="bg-ajrak-cream text-ajrak-dark border-ajrak-dark/30">
                  <SelectItem value="all">All Themes</SelectItem>
                  {themes.map((theme) => (
                    <SelectItem key={theme} value={theme}>
                      {theme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <Select value={selectedEmotion} onValueChange={setSelectedEmotion}>
                <SelectTrigger className="bg-ajrak-cream border-ajrak-dark/30 text-ajrak-dark transition-all duration-300">
                  <SelectValue placeholder="Select emotion" />
                </SelectTrigger>
                <SelectContent className="bg-ajrak-cream text-ajrak-dark border-ajrak-dark/30">
                  <SelectItem value="all">All Emotions</SelectItem>
                  {emotions.map((emotion) => (
                    <SelectItem key={emotion} value={emotion}>
                      {emotion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              onClick={clearFilters}
              className="bg-ajrak-cream border-ajrak-dark/30 text-ajrak-dark hover:bg-ajrak-dark/10 transition-all duration-300"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {/* Results Count */}
          <div className="text-sm text-ajrak-dark/80">
            Showing {filteredVerses.length} of {expandedVersesData.length} verses
          </div>
        </CardContent>
      </Card>

      {/* Verses Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredVerses.map((verse) => (
          <VerseLibraryCard key={verse.id} verse={verse} />
        ))}
      </div>

      {/* No Results */}
      {filteredVerses.length === 0 && (
        <Card className="bg-ajrak-cream text-ajrak-dark border-ajrak-red/30 shadow-lg">
          <CardContent className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-ajrak-dark/60 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-ajrak-dark mb-2">No verses found</h3>
            <p className="text-ajrak-dark/80 mb-4">Try adjusting your search terms or filters</p>
            <Button
              onClick={clearFilters}
              className="bg-ajrak-red text-ajrak-cream hover:bg-ajrak-red/90 transition-all duration-300"
            >
              Clear all filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Individual verse card for library
function VerseLibraryCard({ verse }: { verse: Verse }) {
  const [showTranslation, setShowTranslation] = useState(false)

  const speakVerse = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(verse.text)
      utterance.lang = "ur-PK"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow bg-ajrak-cream text-ajrak-dark border-ajrak-red/30">
      <CardContent className="p-4 space-y-3">
        {/* Verse Text */}
        <div className="text-right">
          <p className="text-base leading-relaxed font-medium text-ajrak-dark mb-1">{verse.text}</p>
          <p className="text-xs text-ajrak-dark/80">— {verse.sur}</p>
        </div>

        {/* Translation */}
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
            {showTranslation && <p className="text-xs text-ajrak-dark/70 mt-1 italic">{verse.translation}</p>}
          </div>
        )}

        {/* Metadata and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            <Badge variant="default" className="text-xs bg-ajrak-red text-ajrak-cream">
              {verse.theme}
            </Badge>
            <Badge variant="secondary" className="text-xs bg-ajrak-green/20 text-ajrak-green">
              {verse.emotion}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={speakVerse}
            className="text-xs text-ajrak-dark hover:bg-ajrak-dark/10 transition-all duration-300"
          >
            <BookOpen className="w-3 h-3 mr-1" />
            Listen
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
