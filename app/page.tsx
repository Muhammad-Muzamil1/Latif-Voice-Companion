
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
  const [isMicClicked, setIsMicClicked] = useState(false)

  // Ajrak pattern for texture
  const ajrakPattern = {
    backgroundImage: `
      radial-gradient(circle at center, 
        rgba(139, 30, 63, 0.1) 0%, 
        rgba(253, 246, 236, 0.8) 70%
      ),
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <rect width="25" height="25" fill="%238b1e3f" opacity="0.2"/>
        <rect x="25" y="25" width="25" height="25" fill="%238b1e3f" opacity="0.2"/>
        <rect x="50" y="50" width="25" height="25" fill="%238b1e3f" opacity="0.2"/>
      </svg>')
    `
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: `
        linear-gradient(160deg, #fdf6ec 0%, #e8c9a0 100%),
        ${ajrakPattern.backgroundImage}
      `,
      backgroundSize: "cover, 50px 50px",
      color: "#1b1b1b",
      fontFamily: "'Poppins', sans-serif",
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: "rgba(253, 246, 236, 0.95)",
        borderBottom: "2px solid rgba(139, 30, 63, 0.3)",
        boxShadow: "0 2px 10px rgba(139, 30, 63, 0.1)",
        backdropFilter: "blur(4px)",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#8b1e3f",
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
              }}>
                Latif Voice Companion
              </h1>
              <p style={{
                fontSize: "0.875rem",
                color: "rgba(139, 30, 63, 0.8)",
                marginTop: "0.25rem"
              }}>
                Embracing Sindhi Heritage
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#8b1e3f",
                fontStyle: "italic"
              }}>
                Shah Jo Risalo
              </p>
              <p style={{
                fontSize: "0.75rem",
                color: "rgba(139, 30, 63, 0.7)"
              }}>
                Authentic Sindhi Poetry
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation with enhanced mic button */}
      <nav style={{
        backgroundColor: "rgba(253, 246, 236, 0.9)",
        borderBottom: "1px solid rgba(139, 30, 63, 0.2)",
        position: "sticky",
        top: "68px",
        zIndex: 40
      }}>
        <div className="max-w-6xl mx-auto px-4">
          <div style={{ display: "flex", gap: "0.5rem", padding: "0.5rem 0" }}>
            <Button
              onClick={() => {
                setActiveTab("voice")
                setIsMicClicked(true)
                setTimeout(() => setIsMicClicked(false), 300)
              }}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                borderRadius: "9999px",
                border: "none",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: isMicClicked ? "scale(0.95)" : "scale(1)",
                boxShadow: activeTab === "voice" 
                  ? "0 4px 14px rgba(139, 30, 63, 0.35), 0 0 0 2px #8b1e3f"
                  : "0 2px 6px rgba(139, 30, 63, 0.15)",
                background: activeTab === "voice" 
                  ? "linear-gradient(135deg, #d11243 0%, #8b1e3f 100%)" 
                  : "rgba(139, 30, 63, 0.08)",
                color: activeTab === "voice" ? "#fff" : "rgba(27, 27, 27, 0.9)"
              }}
            >
              <Mic style={{
                width: "1.25rem",
                height: "1.25rem",
                color: activeTab === "voice" ? "#fff" : "#8b1e3f",
                transform: activeTab === "voice" ? "scale(1.2)" : "scale(1)",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
              }} />
              <span>Voice Recognition</span>
              {activeTab === "voice" && (
                <span style={{
                  position: "absolute",
                  bottom: "-3px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60%",
                  height: "3px",
                  background: "linear-gradient(90deg, #ff3b6e, #fff)",
                  borderRadius: "3px",
                  animation: "pulse 2s infinite"
                }} />
              )}
            </Button>

            <Button
              onClick={() => setActiveTab("library")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                borderRadius: "9999px",
                border: "none",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
                background: activeTab === "library" 
                  ? "rgba(139, 30, 63, 0.15)" 
                  : "transparent",
                color: activeTab === "library" ? "#8b1e3f" : "rgba(27, 27, 27, 0.7)"
              }}
            >
              <BookOpen style={{
                width: "1rem",
                height: "1rem",
                color: activeTab === "library" ? "#8b1e3f" : "rgba(27, 27, 27, 0.7)"
              }} />
              <span>Verse Library</span>
            </Button>

            <Button
              onClick={() => setActiveTab("about")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                borderRadius: "9999px",
                border: "none",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
                background: activeTab === "about" 
                  ? "rgba(139, 30, 63, 0.15)" 
                  : "transparent",
                color: activeTab === "about" ? "#8b1e3f" : "rgba(27, 27, 27, 0.7)"
              }}
            >
              <Info style={{
                width: "1rem",
                height: "1rem",
                color: activeTab === "about" ? "#8b1e3f" : "rgba(27, 27, 27, 0.7)"
              }} />
              <span>About</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8" style={{
        position: "relative",
        minHeight: "calc(100vh - 220px)"
      }}>
        {activeTab === "voice" && <VoiceInterface />}
        {activeTab === "library" && <VerseLibrary />}
        {activeTab === "about" && <AboutSection />}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: "rgba(253, 246, 236, 0.9)",
        borderTop: "1px solid rgba(139, 30, 63, 0.2)",
        padding: "2.5rem 0",
        marginTop: "3rem"
      }}>
        <div className="max-w-6xl mx-auto px-4">
          <div style={{ textAlign: "center" }}>
            <p style={{
              color: "rgba(139, 30, 63, 0.9)",
              marginBottom: "0.5rem",
              fontSize: "1rem"
            }}>
              Experience the wisdom of Shah Abdul Latif Bhittai
            </p>
            <p style={{
              color: "rgba(139, 30, 63, 0.7)",
              fontSize: "0.875rem"
            }}>
              Authentic Sindhi poetry, powered by AI
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 0.8; transform: translateX(-50%) scale(0.9); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
          100% { opacity: 0.8; transform: translateX(-50%) scale(0.9); }
        }
      `}</style>
    </div>
  )
}

// About section
function AboutSection() {
  return (
    <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1rem" }}>
      <Card style={{
        backgroundColor: "rgba(253, 246, 236, 0.7)",
        borderRadius: "1rem",
        border: "1px solid rgba(139, 30, 63, 0.2)",
        boxShadow: "0 4px 20px rgba(139, 30, 63, 0.1)",
        transition: "all 0.3s ease",
        overflow: "hidden"
      }}>
        <CardContent style={{ padding: "2rem" }}>
          <h2 style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "#8b1e3f",
            marginBottom: "1.5rem",
            position: "relative",
            display: "inline-block"
          }}>
            Latif Voice Companion
            <span style={{
              position: "absolute",
              bottom: "-5px",
              left: 0,
              width: "100%",
              height: "3px",
              background: "linear-gradient(90deg, #8b1e3f, #e8c9a0)",
              borderRadius: "3px"
            }} />
          </h2>
          
          <p style={{
            color: "rgba(27, 27, 27, 0.9)",
            lineHeight: 1.7,
            marginBottom: "1.5rem"
          }}>
            This application brings the profound poetry of Shah Abdul Latif Bhittai to life through
            advanced voice recognition and verse recommendations.
          </p>

          <h3 style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#8b1e3f",
            marginBottom: "1rem",
            position: "relative"
          }}>
            Key Features
          </h3>
          <ul style={{
            listStyleType: "disc",
            paddingLeft: "1.5rem",
            marginBottom: "2rem",
            lineHeight: 1.7,
            color: "rgba(27, 27, 27, 0.8)"
          }}>
            {[
              "Real-time Sindhi Text: Converts voice into authentic Sindhi script",
              "Continuous Listening: Stays active until manually stopped",
              "Intelligent Recommendations: AI-powered verse suggestions",
              "Comprehensive Library: 100+ verses from Shah Jo Risalo"
            ].map((item, idx) => (
              <li key={idx} style={{ marginBottom: "0.5rem" }}>{item}</li>
            ))}
          </ul>

          <div style={{
            backgroundColor: "rgba(139, 30, 63, 0.1)",
            border: "1px solid rgba(139, 30, 63, 0.2)",
            borderRadius: "0.75rem",
            padding: "1.25rem",
            marginTop: "2rem"
          }}>
            <h4 style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "#8b1e3f",
              marginBottom: "0.5rem"
            }}>
              Your Voice System is Active
            </h4>
            <p style={{
              color: "rgba(139, 30, 63, 0.9)",
              fontSize: "0.9375rem",
              lineHeight: 1.6
            }}>
              Experience stable Sindhi conversion with AI-enhanced recommendations.
              Tap the mic to begin your poetic journey.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
