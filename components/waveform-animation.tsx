"use client"

import { useEffect, useRef } from "react"

interface WaveformAnimationProps {
  isActive: boolean
  className?: string
}

export function WaveformAnimation({ isActive, className = "" }: WaveformAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerY = height / 2
    const bars = 20
    const barWidth = width / bars

    let animationTime = 0

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      if (isActive) {
        ctx.fillStyle = "#3b82f6"

        for (let i = 0; i < bars; i++) {
          const barHeight = isActive ? Math.sin(animationTime * 0.05 + i * 0.5) * 20 + 25 : 5

          const x = i * barWidth + barWidth * 0.2
          const y = centerY - barHeight / 2

          ctx.fillRect(x, y, barWidth * 0.6, barHeight)
        }

        animationTime += 1
      } else {
        // Static bars when not active
        ctx.fillStyle = "#e5e7eb"
        for (let i = 0; i < bars; i++) {
          const x = i * barWidth + barWidth * 0.2
          const y = centerY - 2.5
          ctx.fillRect(x, y, barWidth * 0.6, 5)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive])

  return <canvas ref={canvasRef} width={200} height={60} className={`${className}`} />
}
