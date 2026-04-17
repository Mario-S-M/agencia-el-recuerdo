"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const morphTime = 1.2
const cooldownTime = 2.5

function useMorphingText(texts: string[]) {
  const textIndexRef = useRef(0)
  const morphRef = useRef(0)
  const cooldownRef = useRef(0)
  const timeRef = useRef<number | null>(null)

  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  const setMorph = useCallback((fraction: number) => {
    if (!text1Ref.current || !text2Ref.current) return

    text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
    text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

    const invertedFraction = 1 - fraction
    text1Ref.current.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`
    text1Ref.current.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`

    text1Ref.current.textContent = texts[textIndexRef.current % texts.length]
    text2Ref.current.textContent = texts[(textIndexRef.current + 1) % texts.length]
  }, [texts])

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current
    cooldownRef.current = 0

    let fraction = morphRef.current / morphTime

    if (fraction > 1) {
      cooldownRef.current = cooldownTime
      fraction = 1
    }

    setMorph(fraction)
  }, [setMorph])

  const doCooldown = useCallback(() => {
    if (!text1Ref.current || !text2Ref.current) return
    morphRef.current = 0

    text2Ref.current.style.filter = "none"
    text2Ref.current.style.opacity = "100%"
    text1Ref.current.style.filter = "none"
    text1Ref.current.style.opacity = "0%"
  }, [])

  useEffect(() => {
    let lastTime = performance.now()

    const animate = (now: number) => {
      const dt = (now - lastTime) / 1000
      lastTime = now
      timeRef.current = requestAnimationFrame(animate)

      cooldownRef.current -= dt

      if (cooldownRef.current <= 0) {
        if (morphRef.current === 0) {
          textIndexRef.current++
        }
        doMorph()
      } else {
        doCooldown()
      }
    }

    timeRef.current = requestAnimationFrame(animate)
    return () => {
      if (timeRef.current) cancelAnimationFrame(timeRef.current)
    }
  }, [doMorph, doCooldown])

  return { text1Ref, text2Ref }
}

interface MorphingTextProps {
  className?: string
  texts: string[]
}

export function MorphingText({ texts, className }: MorphingTextProps) {
  const { text1Ref, text2Ref } = useMorphingText(texts)

  return (
    <div
      className={cn(
        "relative flex h-16 w-full items-center justify-center",
        className,
      )}
    >
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="morphing-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <span
        ref={text1Ref}
        className="absolute w-full text-center"
        style={{ filter: "none", opacity: "100%" }}
      />
      <span
        ref={text2Ref}
        className="absolute w-full text-center"
        style={{ filter: "blur(8px)", opacity: "0%" }}
      />
    </div>
  )
}
