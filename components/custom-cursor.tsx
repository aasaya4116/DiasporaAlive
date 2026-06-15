"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    // Check if the device is a mobile/tablet or doesn't support hover triggers
    const isMobile =
      window.matchMedia("(max-width: 768px)").matches ||
      !window.matchMedia("(any-hover: hover)").matches
    if (isMobile) return

    setHidden(false)

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`
      }
    }

    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)

    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        "a, button, [role='button'], input, select, textarea, .hover-lift, [onclick]"
      )
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true))
        el.addEventListener("mouseleave", () => setHovered(false))
      })
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)

    // Hide system cursor globally
    document.documentElement.classList.add("custom-cursor-active")

    addHoverListeners()

    // Mutation observer to dynamically add hover events to items loaded asynchronously (e.g. leaflet elements)
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      document.documentElement.classList.remove("custom-cursor-active")
      observer.disconnect()
    }
  }, [])

  if (hidden) return null

  return (
    <>
      {/* Dynamic Cursor Core Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 bg-emerald-400 rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out ${
          clicked ? "scale-75 bg-amber-500" : hovered ? "scale-150 bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.6)]" : "scale-100 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
        }`}
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      {/* Elastic Following Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-emerald-500/40 pointer-events-none z-[9998] transition-[transform_duration_150ms_cubic-bezier(0.25,1,0.5,1),width_duration_200ms,height_duration_200ms,border-color_duration_200ms] ${
          clicked
            ? "scale-90 border-emerald-400/80 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            : hovered
              ? "scale-[1.6] border-amber-400/50 bg-amber-500/5 backdrop-blur-[1px] shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              : "scale-100 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
        }`}
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
    </>
  )
}
