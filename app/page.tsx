"use client"

import { useState } from "react"
import { Mic, BookOpen, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VoiceInterface } from "@/components/voice-interface"
import { VerseLibrary } from "@/components/verse-library"

type TabType = "voice" | "library" | "about"

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("voice")

  return (
    <div className="min-h-screen bg-gradient-to-br from-ajrak-cream to-ajrak-cream/80 text-ajrak-dark">
      {/* Header */}
      <header className="bg-ajrak-cream shadow-md border-b border-ajrak-red/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-ajrak-dark">Latif Voice Companion</h1>
              <p className="text-sm text-ajrak-dark/80">Embracing Sindhi Heritage</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-ajrak-dark/80">Shah Jo Risalo</p>
              <p className="text-xs text-ajrak-dark/60">Authentic Sindhi Poetry</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-ajrak-cream border-b border-ajrak-red/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-1">
            <Button
              variant={activeTab === "voice" ? "default" : "ghost"}
              onClick={() => setActiveTab("voice")}
              className="flex items-center gap-2 text-ajrak-dark data-[state=active]:bg-ajrak-red data-[state=active]:text-ajrak-cream hover:bg-ajrak-red/10 transition-all duration-300"
            >
              <Mic className="w-4 h-4" />
              Voice Recognition
            </Button>
            <Button
              variant={activeTab === "library" ? "default" : "ghost"}
              onClick={() => setActiveTab("library")}
              className="flex items-center gap-2 text-ajrak-dark data-[state=active]:bg-ajrak-red data-[state=active]:text-ajrak-cream hover:bg-ajrak-red/10 transition-all duration-300"
            >
              <BookOpen className="w-4 h-4" />
              Verse Library
            </Button>
            <Button
              variant={activeTab === "about" ? "default" : "ghost"}
              onClick={() => setActiveTab("about")}
              className="flex items-center gap-2 text-ajrak-dark data-[state=active]:bg-ajrak-red data-[state=active]:text-ajrak-cream hover:bg-ajrak-red/10 transition-all duration-300"
            >
              <Info className="w-4 h-4" />
              About
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === "voice" && <VoiceInterface />}
        {activeTab === "library" && <VerseLibrary />}
        {activeTab === "about" && <AboutSection />}
      </main>

      {/* Footer */}
      <footer className="bg-ajrak-cream border-t border-ajrak-red/30 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-ajrak-dark/80 mb-2">Experience the wisdom of Shah Abdul Latif Bhittai.</p>
            <p className="text-sm text-ajrak-dark/60">Authentic Sindhi poetry, powered by AI.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// About section
function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-ajrak-cream text-ajrak-dark border-ajrak-red/30 shadow-lg transition-all duration-300">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-ajrak-dark mb-4">Latif Voice Companion</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-ajrak-dark/80 leading-relaxed mb-4">
              This application is designed to bring the profound poetry of Shah Abdul Latif Bhittai to life through
              advanced voice recognition and intelligent verse recommendations.
            </p>

            <h3 className="text-lg font-semibold text-ajrak-dark mb-3">Key Features</h3>
            <ul className="list-disc list-inside text-ajrak-dark/80 space-y-2 mb-6">
              <li>
                <strong>Real-time Sindhi Text:</strong> Your spoken words are converted to authentic Sindhi script in
                real-time, directly by your browser's speech recognition.
              </li>
              <li>
                <strong>Continuous Listening:</strong> The system listens until you manually stop the microphone.
              </li>
              <li>
                <strong>Ultra-Accurate Recommendations:</strong> Leverages advanced linguistic analysis for highly
                relevant verse suggestions from Shah Jo Risalo.
              </li>
              <li>
                <strong>Expanded Verse Library:</strong> Includes over 100 verses for richer recommendations.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-ajrak-dark mb-3">How to Use</h3>
            <ol className="list-decimal list-inside text-ajrak-dark/80 space-y-2 mb-6">
              <li>Click the microphone button to start listening</li>
              <li>Speak naturally in Sindhi - the system will convert to Sindhi text</li>
              <li>Watch your speech appear in authentic Sindhi script</li>
              <li>Get relevant verse recommendations from Shah Jo Risalo</li>
              <li>Click the microphone again to stop listening</li>
              <li>Use thumbs up/down to improve recommendations</li>
            </ol>

            <div className="bg-ajrak-red/10 border border-ajrak-red/30 p-4 rounded-lg transition-all duration-300">
              <h4 className="font-medium text-ajrak-red mb-2">Your Voice System is Ready!</h4>
              <p className="text-sm text-ajrak-red/90">
                This version combines the stability of the initial voice system with the advanced Sindhi conversion and
                recommendation capabilities. Speak into the mic and experience it!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
