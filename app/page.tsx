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
        backgroundImage: "linear-gradient(to bottom right, #fdf6ec, rgba(253, 246, 236, 0.8))",
        color: "#1b1b1b",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#fdf6ec",
          borderBottom: "1px solid rgba(139, 30, 63, 0.3)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#1b1b1b" }}>
                Latif Voice Companion
              </h1>
              <p className="text-sm" style={{ color: "rgba(27, 27, 27, 0.8)" }}>
                Embracing Sindhi Heritage
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm" style={{ color: "rgba(27, 27, 27, 0.8)" }}>
                Shah Jo Risalo
              </p>
              <p className="text-xs" style={{ color: "rgba(27, 27, 27, 0.6)" }}>
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
          <div className="flex space-x-2 py-2">
            <Button
              variant="ghost"
              onClick={() => setActiveTab("voice")}
              className="flex items-center gap-2 px-4 py-2 rounded-md border transition-all duration-300"
              style={{
                backgroundColor: activeTab === "voice" ? "#8b1e3f" : "transparent",
                color: activeTab === "voice" ? "#fdf6ec" : "#1b1b1b",
                borderColor: "#8b1e3f",
              }}
            >
              <Mic className="w-4 h-4" />
              Voice Recognition
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("library")}
              className="flex items-center gap-2 px-4 py-2 rounded-md border transition-all duration-300"
              style={{
                backgroundColor: activeTab === "library" ? "#8b1e3f" : "transparent",
                color: activeTab === "library" ? "#fdf6ec" : "#1b1b1b",
                borderColor: "#8b1e3f",
              }}
            >
              <BookOpen className="w-4 h-4" />
              Verse Library
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("about")}
              className="flex items-center gap-2 px-4 py-2 rounded-md border transition-all duration-300"
              style={{
                backgroundColor: activeTab === "about" ? "#8b1e3f" : "transparent",
                color: activeTab === "about" ? "#fdf6ec" : "#1b1b1b",
                borderColor: "#8b1e3f",
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
            <p style={{ color: "rgba(27, 27, 27, 0.8)", marginBottom: "0.5rem" }}>
              Experience the wisdom of Shah Abdul Latif Bhittai.
            </p>
            <p className="text-sm" style={{ color: "rgba(27, 27, 27, 0.6)" }}>
              Authentic Sindhi poetry, powered by AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// About Section
function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card
        className="shadow-md rounded-xl border"
        style={{
          backgroundColor: "#fdf6ec",
          color: "#1b1b1b",
          borderColor: "rgba(139, 30, 63, 0.3)",
        }}
      >
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1b1b1b" }}>
            Latif Voice Companion
          </h2>
          <div className="space-y-4">
            <p style={{ color: "rgba(27, 27, 27, 0.8)", lineHeight: "1.75" }}>
              This application is designed to bring the profound poetry of Shah Abdul Latif Bhittai to life through
              advanced voice recognition and intelligent verse recommendations.
            </p>

            <h3 className="text-lg font-semibold" style={{ color: "#1b1b1b" }}>
              Key Features
            </h3>
            <ul className="list-disc list-inside space-y-2" style={{ color: "rgba(27, 27, 27, 0.8)" }}>
              <li>
                <strong>Real-time Sindhi Text:</strong> Converts your voice into Sindhi script in real time.
              </li>
              <li>
                <strong>Continuous Listening:</strong> Keeps the mic on until you manually stop it.
              </li>
              <li>
                <strong>Ultra-Accurate Recommendations:</strong> AI suggests the most relevant verses.
              </li>
              <li>
                <strong>Expanded Verse Library:</strong> Contains over 100 rich and meaningful verses.
              </li>
            </ul>

            <h3 className="text-lg font-semibold" style={{ color: "#1b1b1b" }}>
              How to Use
            </h3>
            <ol className="list-decimal list-inside space-y-2" style={{ color: "rgba(27, 27, 27, 0.8)" }}>
              <li>Click the microphone to start listening</li>
              <li>Speak naturally in Sindhi</li>
              <li>Text will appear in authentic Sindhi script</li>
              <li>Relevant verse recommendations will appear</li>
              <li>Click the mic again to stop</li>
              <li>Use thumbs up/down to train the AI engine</li>
            </ol>

            <div
              className="border p-4 rounded-lg"
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
