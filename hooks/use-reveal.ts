"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Scroll-reveal visibility. Returns a ref to attach to the section and a
 * `visible` flag that flips true once the element enters the viewport.
 * Honors prefers-reduced-motion by revealing immediately.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.1) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}
