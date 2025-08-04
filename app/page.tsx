"use client"

import { useState, useEffect } from "react"
import { Mic, BookOpen, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VoiceInterface } from "@/components/voice-interface"
import { VerseLibrary } from "@/components/verse-library"

type TabType = "voice" | "library" | "about"

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("voice")
  const [isHovered, setIsHovered] = useState(false)

  // Ajrak pattern background
  const ajrakPattern = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><rect width=\"25\" height=\"25\" fill=\"%238b1e3f\"/><rect x=\"25\" y=\"25\" width=\"25\" height=\"25\" fill=\"%238b1e3f\"/><rect x=\"50\" y=\"50\" width=\"25\" height=\"25\" fill=\"%238b1e3f\"/><rect x=\"75\" y=\"75\" width=\"25\" height=\"25\" fill=\"%238b1e3f\"/><rect x=\"0\" y=\"75\" width=\"25\" height=\"25\" fill=\"%238b1e3f\"/><rect x=\"75\" y=\"0\" width=\"25\" height=\"25\" fill=\"%238b1e3f\"/></svg>')"

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
          linear-gradient(135deg, rgba(253, 246, 236, 0.9) 0%, rgba(232, 201, 160, 0.8) 100%),
          ${ajrakPattern}
        `,
        backgroundSize: "cover, 50px 50px",
        color: "#1b1b1b",
        transition: "all 0.5s ease",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Header with Sindhi embroidery borders */}
      <header
        style={{
          backgroundColor: "rgba(253, 246, 236, 0.9)",
          borderBottom: "3px solid #8b1e3f",
          boxShadow: "0 4px 6px rgba(139, 30, 63, 0.1)",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        {/* Embroidery border effect */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "10px",
          background: `
            repeating-linear-gradient(
              90deg,
              #8b1e3f,
              #8b1e3f 10px,
              #e8c9a0 10px,
              #e8c9a0 20px
            )
          `,
        }}></div>
        
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div style={{ position: "relative" }}>
              <h1 className="text-3xl font-bold" style={{ 
                color: "#8b1e3f",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                fontFamily: "'Playfair Display', serif",
                transition: "all 0.3s ease",
                transform: isHovered ? "scale(1.02)" : "scale(1)"
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
                Latif Voice Companion
              </h1>
              <p className="text-sm mt-1" style={{ 
                color: "rgba(139, 30, 63, 0.8)",
                transition: "all 0.3s ease"
              }}>
                Embracing Sindhi Heritage
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm" style={{ 
                color: "#8b1e3f",
                fontWeight: "600",
                letterSpacing: "1px",
                fontStyle: "italic"
              }}>
                Shah Jo Risalo
              </p>
              <p className="text-xs" style={{ 
                color: "rgba(139, 30, 63, 0.7)",
                transition: "all 0.3s ease"
              }}>
                Authentic Sindhi Poetry
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation with Sindhi-inspired buttons */}
      <nav
        style={{
          backgroundColor: "rgba(253, 246, 236, 0.8)",
          borderBottom: "2px solid #8b1e3f",
          position: "relative",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-2 py-3">
            <Button
              variant="ghost"
              onClick={() => setActiveTab("voice")}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: activeTab === "voice" ? "#8b1e3f" : "transparent",
                color: activeTab === "voice" ? "#fdf6ec" : "#1b1b1b",
                border: "none",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                transform: activeTab === "voice" ? "translateY(-2px)" : "none",
              }}
            >
              <span className="relative z-10">
                <Mic className="w-4 h-4" />
                Voice Recognition
              </span>
              {activeTab === "voice" && (
                <span style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "linear-gradient(90deg, #fdf6ec, #e8c9a0)",
                  animation: "slideIn 0.3s ease-out"
                }}></span>
              )}
            </Button>

            <Button
              variant="ghost"
              onClick={() => setActiveTab("library")}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: activeTab === "library" ? "#8b1e3f" : "transparent",
                color: activeTab === "library" ? "#fdf6ec" : "#1b1b1b",
                border: "none",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                transform: activeTab === "library" ? "translateY(-2px)" : "none",
              }}
            >
              <span className="relative z-10">
                <BookOpen className="w-4 h-4" />
                Verse Library
              </span>
              {activeTab === "library" && (
                <span style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "linear-gradient(90deg, #fdf6ec, #e8c9a0)",
                  animation: "slideIn 0.3s ease-out"
                }}></span>
              )}
            </Button>

            <Button
              variant="ghost"
              onClick={() => setActiveTab("about")}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: activeTab === "about" ? "#8b1e3f" : "transparent",
                color: activeTab === "about" ? "#fdf6ec" : "#1b1b1b",
                border: "none",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                transform: activeTab === "about" ? "translateY(-2px)" : "none",
              }}
            >
              <span className="relative z-10">
                <Info className="w-4 h-4" />
                About
              </span>
              {activeTab === "about" && (
                <span style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "linear-gradient(90deg, #fdf6ec, #e8c9a0)",
                  animation: "slideIn 0.3s ease-out"
                }}></span>
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content with smooth transitions */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div style={{
          minHeight: "400px",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transition: "opacity 0.5s ease, transform 0.5s ease",
            opacity: activeTab === "voice" ? 1 : 0,
            transform: activeTab === "voice" ? "translateY(0)" : "translateY(20px)",
            pointerEvents: activeTab === "voice" ? "auto" : "none"
          }}>
            <VoiceInterface />
          </div>
          
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transition: "opacity 0.5s ease, transform 0.5s ease",
            opacity: activeTab === "library" ? 1 : 0,
            transform: activeTab === "library" ? "translateY(0)" : "translateY(20px)",
            pointerEvents: activeTab === "library" ? "auto" : "none"
          }}>
            <VerseLibrary />
          </div>
          
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transition: "opacity 0.5s ease, transform 0.5s ease",
            opacity: activeTab === "about" ? 1 : 0,
            transform: activeTab === "about" ? "translateY(0)" : "translateY(20px)",
            pointerEvents: activeTab === "about" ? "auto" : "none"
          }}>
            <AboutSection />
          </div>
        </div>
      </main>

      {/* Footer with Sindhi embroidery pattern */}
      <footer
        style={{
          backgroundColor: "rgba(253, 246, 236, 0.9)",
          borderTop: "3px solid #8b1e3f",
          marginTop: "3rem",
          position: "relative",
        }}
      >
        {/* Embroidery top border */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "10px",
          background: `
            repeating-linear-gradient(
              90deg,
              #8b1e3f,
              #8b1e3f 10px,
              #e8c9a0 10px,
              #e8c9a0 20px
            )
          `,
        }}></div>
        
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <p style={{ 
              color: "#8b1e3f",
              marginBottom: "0.5rem",
              fontWeight: "500",
              fontSize: "1.1rem",
              transition: "all 0.3s ease"
            }}>
              Experience the wisdom of Shah Abdul Latif Bhittai.
            </p>
            <p className="text-sm" style={{ 
              color: "rgba(139, 30, 63, 0.8)",
              transition: "all 0.3s ease"
            }}>
              Authentic Sindhi poetry, powered by AI.
            </p>
            
            {/* Sindhi embroidery-inspired decorations */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "1rem"
            }}>
              {[1, 2, 3, 4].map((item) => (
                <div key={item} style={{
                  width: "30px",
                  height: "30px",
                  background: "radial-gradient(circle, #8b1e3f 30%, #e8c9a0 70%)",
                  borderRadius: "50%",
                  animation: `pulse 2s infinite ${item * 0.2}s`,
                  transform: "scale(1)",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                }}></div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

// About Section with enhanced styling and animations
function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card
        className="shadow-lg rounded-xl"
        style={{
          backgroundColor: "rgba(253, 246, 236, 0.8)",
          color: "#1b1b1b",
          border: "2px solid #8b1e3f",
          overflow: "hidden",
          position: "relative",
          transition: "all 0.5s ease",
        }}
      >
        {/* Ajrak pattern corners */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50px",
          height: "50px",
          borderTop: "5px solid #8b1e3f",
          borderLeft: "5px solid #8b1e3f",
          borderRight: "5px solid transparent",
          borderBottom: "5px solid transparent"
        }}></div>
        <div style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "50px",
          height: "50px",
          borderBottom: "5px solid #8b1e3f",
          borderRight: "5px solid #8b1e3f",
          borderLeft: "5px solid transparent",
          borderTop: "5px solid transparent"
        }}></div>
        
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold mb-6" style={{ 
            color: "#8b1e3f",
            position: "relative",
            display: "inline-block",
            fontFamily: "'Playfair Display', serif",
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
            }}></span>
          </h2>
          
          <div className="space-y-6">
            <p style={{ 
              color: "rgba(139, 30, 63, 0.9)", 
              lineHeight: "1.8",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
            }}>
              This application is designed to bring the profound poetry of Shah Abdul Latif Bhittai to life through
              advanced voice recognition and intelligent verse recommendations.
            </p>

            <div
              style={{
                borderLeft: "3px solid #8b1e3f",
                paddingLeft: "1rem",
                margin: "2rem 0",
                transition: "all 0.5s ease",
              }}
            >
              <p style={{ 
                color: "#8b1e3f",
                fontStyle: "italic",
                fontWeight: "500",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
              }}>
                "Latif's poetry is not just words, but the voice of the Sindhi soul"
              </p>
            </div>

            <h3 className="text-xl font-semibold" style={{ 
              color: "#8b1e3f",
              position: "relative",
              paddingBottom: "0.5rem",
              transition: "all 0.3s ease",
            }}>
              Key Features
              <span style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "50px",
                height: "2px",
                background: "#8b1e3f",
                transition: "all 0.5s ease",
              }}></span>
            </h3>
            
            <ul className="space-y-3" style={{ 
              color: "rgba(139, 30, 63, 0.9)",
              transition: "all 0.3s ease",
            }}>
              {[
                "Real-time Sindhi Text: Converts your voice into Sindhi script in real time",
                "Continuous Listening: Keeps the mic on until you manually stop it",
                "Ultra-Accurate Recommendations: AI suggests the most relevant verses",
                "Expanded Verse Library: Contains over 100 rich and meaningful verses"
              ].map((item, index) => (
                <li key={index} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  transition: "all 0.3s ease",
                }}>
                  <span style={{
                    display: "inline-block",
                    width: "24px",
                    height: "24px",
                    background: "#8b1e3f",
                    color: "#fdf6ec",
                    borderRadius: "50%",
                    textAlign: "center",
                    lineHeight: "24px",
                    marginRight: "0.5rem",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                  }}>{index + 1}</span>
                  <span style={{ transition: "all 0.3s ease" }}>{item}</span>
                </li>
              ))}
            </ul>

            <div
              style={{
                border: "2px solid rgba(139, 30, 63, 0.2)",
                borderRadius: "12px",
                padding: "1.5rem",
                background: "rgba(253, 246, 236, 0.5)",
                transition: "all 0.5s ease",
                boxShadow: "0 4px 15px rgba(139, 30, 63, 0.1)",
              }}
            >
              <h4 className="font-bold text-lg mb-3" style={{ 
                color: "#8b1e3f",
                transition: "all 0.3s ease",
              }}>
                How to Use
              </h4>
              
              <ol className="space-y-2" style={{ 
                color: "rgba(139, 30, 63, 0.9)",
                transition: "all 0.3s ease",
              }}>
                {[
                  "Click the microphone to start listening",
                  "Speak naturally in Sindhi",
                  "Text will appear in authentic Sindhi script",
                  "Relevant verse recommendations will appear",
                  "Click the mic again to stop",
                  "Use feedback buttons to train the AI engine"
                ].map((step, index) => (
                  <li key={index} style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b1e3f" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div
              style={{
                background: "linear-gradient(to right, rgba(139, 30, 63, 0.9), rgba(139, 30, 63, 0.7))",
                borderRadius: "10px",
                padding: "1.5rem",
                color: "#fdf6ec",
                marginTop: "2rem",
                transition: "all 0.5s ease",
                transform: "translateY(0)",
                animation: "pulse 3s infinite",
                boxShadow: "0 4px 20px rgba(139, 30, 63, 0.3)"
              }}
            >
              <h4 className="font-bold text-lg mb-2" style={{ 
                transition: "all 0.3s ease",
              }}>
                Your Voice System is Ready!
              </h4>
              <p style={{ 
                transition: "all 0.3s ease",
                lineHeight: "1.7"
              }}>
                This version combines the stability of the initial voice system with the advanced Sindhi conversion and
                recommendation capabilities. Speak into the mic to experience the rich poetry of Shah Latif!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
