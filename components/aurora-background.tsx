"use client"

import { useEffect, useRef } from "react"

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles: Particle[] = []
    const particleCount = 45

    const mouse = { x: -1000, y: -1000, radius: 140 }

    class Particle {
      x = Math.random() * width
      y = Math.random() * height
      size = Math.random() * 1.5 + 0.5
      speedY = Math.random() * 0.3 + 0.08
      speedX = (Math.random() - 0.5) * 0.15
      alpha = Math.random() * 0.4 + 0.1
      glowColor = Math.random() > 0.5 ? "16, 185, 129" : "245, 158, 11" // Emerald green or Amber gold

      update() {
        this.y -= this.speedY
        this.x += this.speedX + Math.sin(this.y * 0.008) * 0.03

        // Wrap around screen boundaries
        if (this.y < 0) {
          this.y = height
          this.x = Math.random() * width
        }
        if (this.x < 0 || this.x > width) {
          this.x = Math.random() * width
        }

        // Mouse repulsion physics
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius
          const angle = Math.atan2(dy, dx)
          // Gently push away from mouse cursor
          this.x -= Math.cos(angle) * force * 1.8
          this.y -= Math.sin(angle) * force * 1.8
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.glowColor}, ${this.alpha})`
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("resize", handleResize)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.update()
        p.draw()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {/* Moving blurred breathing ambient gradient mesh bubbles */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500/[0.06] blur-[120px] animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/[0.04] blur-[100px] animate-[pulse_12s_ease-in-out_infinite]" />
      <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-500/[0.03] blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />

      <canvas ref={canvasRef} className="w-full h-full opacity-70" />
    </div>
  )
}
