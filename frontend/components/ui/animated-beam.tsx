"use client"

import { useEffect, useId, useRef, useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface AnimatedBeamProps {
  className?: string
  containerRef: React.RefObject<HTMLDivElement | null>
  fromRef: React.RefObject<HTMLDivElement | null>
  toRef: React.RefObject<HTMLDivElement | null>
  curvature?: number
  reverse?: boolean
  duration?: number
  delay?: number
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 3,
  delay = 0,
  pathColor = "rgba(255,255,255,0.1)",
  pathWidth = 2,
  pathOpacity = 0.14,
  gradientStartColor = "#F97316",
  gradientStopColor = "#0D9488",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId()
  const [pathD, setPathD] = useState("")
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })

  const gradientCoordinates = reverse
    ? { x1: ["90%", "-10%"], x2: ["100%", "0%"], y1: ["0%", "0%"], y2: ["0%", "0%"] }
    : { x1: ["-10%", "90%"], x2: ["0%", "100%"], y1: ["0%", "0%"], y2: ["0%", "0%"] }

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const fromRect = fromRef.current.getBoundingClientRect()
      const toRect = toRef.current.getBoundingClientRect()

      const svgW = containerRect.width
      const svgH = containerRect.height
      setSvgDimensions({ width: svgW, height: svgH })

      const sx = fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset
      const sy = fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset
      const ex = toRect.left - containerRect.left + toRect.width / 2 + endXOffset
      const ey = toRect.top - containerRect.top + toRect.height / 2 + endYOffset

      const midX = (sx + ex) / 2
      const midY = (sy + ey) / 2 - curvature

      setPathD(`M ${sx},${sy} Q ${midX},${midY} ${ex},${ey}`)
    }

    updatePath()
    const observer = new ResizeObserver(updatePath)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset])

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute left-0 top-0 transform-gpu", className)}
      style={{ zIndex: 0 }}
    >
      <path d={pathD} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} strokeLinecap="round" />
      <path d={pathD} strokeWidth={pathWidth} strokeLinecap="round" stroke={`url(#${id})`} />
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: gradientCoordinates.x1[0], x2: gradientCoordinates.x2[0], y1: gradientCoordinates.y1[0], y2: gradientCoordinates.y2[0] }}
          animate={{ x1: gradientCoordinates.x1, x2: gradientCoordinates.x2, y1: gradientCoordinates.y1, y2: gradientCoordinates.y2 }}
          transition={{ delay, duration, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 0 }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  )
}
