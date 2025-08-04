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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #fdf6ec, rgba(253, 246, 236, 0.8))",
        color: "#1b1b1b",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#fdf6ec",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid rgba(139, 30, 63, 0.3)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#8b1e3f" }}>
                Latif Voice Companion
              </h1>
              <p className="text-sm" style={{ color: "rgba(139, 30, 63, 0.8)" }}>
                Embracing Sindhi Heritage
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm" style={{ color: "rgba(139, 30, 63, 0.8)" }}>
                Shah Jo Risalo
              </p>
              <p className="text-xs" style={{ color: "rgba(139, 30, 63, 0.6)" }}>
                Authentic Sindhi Poetry
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav
        style={{
          backgroundColor: "#fdf6ec",
          borderBottom: "1px solid rgba(139, 30, 63, 0.3)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-1">
            <Button
              variant={activeTab === "voice" ? "default" : "ghost"}
              onClick={() => setActiveTab("voice")}
              className="flex items-center gap-2"
              style={{
                color: activeTab === "voice" ? "#fdf6ec" : "#1b1b1b",
                backgroundColor: activeTab === "voice" ? "#8b1e3f" : "transparent",
                transition: "all 0.3s ease",
              }}
            >
              <Mic className="w-4 h-4" />
              Voice Recognition
            </Button>
            <Button
              variant={activeTab === "library" ? "default" : "ghost"}
              onClick={() => setActiveTab("library")}
              className="flex items-center gap-2"
              style={{
                color: activeTab === "library" ? "#fdf6ec" : "#1b1b1b",
                backgroundColor: activeTab === "library" ? "#8b1e3f" : "transparent",
                transition: "all 0.3s ease",
              }}
            >
              <BookOpen className="w-4 h-4" />
              Verse Library
            </Button>
            <Button
              variant={activeTab === "about" ? "default" : "ghost"}
              onClick={() => setActiveTab("about")}
              className="flex items-center gap-2"
              style={{
                color: activeTab === "about" ? "#fdf6ec" : "#1b1b1b",
                backgroundColor: activeTab === "about" ? "#8b1e3f" : "transparent",
                transition: "all 0.3s ease",
              }}
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
      <footer
        style={{
          backgroundColor: "#fdf6ec",
          borderTop: "1px solid rgba(139, 30, 63, 0.3)",
          marginTop: "4rem",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p style={{ color: "rgba(139, 30, 63, 0.8)", marginBottom: "0.5rem" }}>
              Experience the wisdom of Shah Abdul Latif Bhittai.
            </p>
            <p className="text-sm" style={{ color: "rgba(139, 30, 63, 0.6)" }}>
              Authentic Sindhi poetry, powered by AI.
            </p>
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
      <Card
        className="shadow-lg transition-all duration-300"
        style={{
          backgroundColor: "#fdf6ec",
          color: "#1b1b1b",
          borderColor: "rgba(139, 30, 63, 0.3)",
        }}
      >
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#8b1e3f" }}>
            Latif Voice Companion
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-ajrak-dark/80 leading-relaxed mb-4">
              This application is designed to bring the profound poetry of Shah Abdul Latif Bhittai to life through
              advanced voice recognition and intelligent verse recommendations.
            </p>

            <h3 className="text-lg font-semibold mb-3" style={{ color: "#8b1e3f" }}>
              Key Features
            </h3>
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

            <h3 className="text-lg font-semibold mb-3" style={{ color: "#8b1e3f" }}>
              How to Use
            </h3>
            <ol className="list-decimal list-inside text-ajrak-dark/80 space-y-2 mb-6">
              <li>Click the microphone button to start listening</li>
              <li>Speak naturally in Sindhi - the system will convert to Sindhi text</li>
              <li>Watch your speech appear in authentic Sindhi script</li>
              <li>Get relevant verse recommendations from Shah Jo Risalo</li>
              <li>Click the microphone again to stop listening</li>
              <li>Use thumbs up/down to improve recommendations</li>
            </ol>

            <div
              className="bg-red-100 border border-red-300 p-4 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: "rgba(139, 30, 63, 0.1)",
                borderColor: "rgba(139, 30, 63, 0.3)",
              }}
            >
              <h4 className="font-medium mb-2" style={{ color: "#8b1e3f" }}>
                Your Voice System is Ready!
              </h4>
              <p className="text-sm" style={{ color: "rgba(139, 30, 63, 0.9)" }}>
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
