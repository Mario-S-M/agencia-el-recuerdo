"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import { MorphingText } from "@/components/ui/morphing-text"

const steps = [
  {
    number: "01",
    icon: "💬",
    title: "Escríbenos",
    description: "Contacta a nuestro asistente o un asesor. Estamos disponibles 24/7.",
    accent: "#F97316",
  },
  {
    number: "02",
    icon: "🗺️",
    title: "Cuéntanos tu sueño",
    description: "Destino, fechas, viajeros y cualquier preferencia especial.",
    accent: "#0D9488",
  },
  {
    number: "03",
    icon: "📋",
    title: "Recibe tu propuesta",
    description: "Cotización personalizada con opciones a tu medida en minutos.",
    accent: "#F59E0B",
  },
  {
    number: "04",
    icon: "✈️",
    title: "¡A volar!",
    description: "Confirmamos y coordinamos todo. Tú solo disfruta el viaje.",
    accent: "#10B981",
  },
]

const floatingTags = [
  { label: "🏖️ Cancún", delay: 0 },
  { label: "🗼 París", delay: 0.4 },
  { label: "🏰 Roma", delay: 0.8 },
  { label: "🌅 Bali", delay: 1.2 },
  { label: "🎭 NY", delay: 1.6 },
  { label: "🌊 Caribe", delay: 0.2 },
]

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.0])
  const tagsY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])

  return (
    <section
      ref={sectionRef}
      id="cotizar"
      className="relative overflow-hidden bg-[#030710]"
    >
      {/* Parallax glow blobs */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(ellipse at 35% 50%, #F97316 0%, #0D9488 55%, transparent 75%)",
            filter: "blur(90px)",
          }}
        />
      </motion.div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 30%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32">
        {/* ── Main hero card ─────────────────────────────── */}
        <div className="relative mb-28">
          {/* Floating destination tags */}
          <motion.div
            style={{ y: tagsY }}
            className="pointer-events-none absolute inset-0 hidden lg:block"
          >
            {floatingTags.map((tag, i) => {
              const positions = [
                { top: "8%", left: "4%" },
                { top: "18%", right: "6%" },
                { top: "55%", left: "2%" },
                { top: "62%", right: "3%" },
                { bottom: "12%", left: "8%" },
                { bottom: "18%", right: "7%" },
              ]
              return (
                <motion.div
                  key={tag.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: tag.delay + 0.3, duration: 0.6 }}
                  animate={{ y: [0, -8, 0] }}
                  // @ts-expect-error motion animate with transition
                  transition2={{
                    duration: 3 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: tag.delay,
                  }}
                  className="absolute rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-sm"
                  style={positions[i]}
                >
                  {tag.label}
                </motion.div>
              )
            })}
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[48px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(13,148,136,0.08) 40%, rgba(3,7,18,0.9) 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow:
                "0 0 0 1px rgba(249,115,22,0.08), 0 40px 120px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Inner decorative ring */}
            <div
              className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full opacity-30"
              style={{
                background:
                  "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 65%)",
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full opacity-20"
              style={{
                background:
                  "radial-gradient(circle, rgba(13,148,136,0.2) 0%, transparent 65%)",
              }}
            />

            <div className="relative px-10 py-20 text-center lg:px-24 lg:py-28">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-5 py-2 text-xs font-semibold tracking-[0.2em] text-orange-400 uppercase"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
                Asistente disponible ahora
              </motion.div>

              {/* Headline */}
              <h2 className="mx-auto mb-8 max-w-4xl text-5xl font-black leading-[0.92] tracking-tighter text-white sm:text-6xl lg:text-8xl">
                ¿Listo para tu
                <br />
                <span className="gradient-text-orange">próxima aventura?</span>
              </h2>

              {/* Subtext */}
              <p className="mx-auto mb-6 max-w-xl text-base leading-relaxed text-white/40 lg:text-lg">
                Habla con nuestro{" "}
                <span className="font-semibold text-orange-400">
                  asistente de IA
                </span>{" "}
                o un asesor humano. En minutos tendrás una propuesta
                personalizada para el viaje de tus sueños.
              </p>

              {/* Trust micro-stats */}
              <div className="mb-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/30">
                <span className="flex items-center gap-1.5">
                  <span className="text-orange-400">✓</span> 2,000+ clientes satisfechos
                </span>
                <span className="h-3 w-px bg-white/10" />
                <span className="flex items-center gap-1.5">
                  <span className="text-teal-400">✓</span> 60+ destinos disponibles
                </span>
                <span className="h-3 w-px bg-white/10" />
                <span className="flex items-center gap-1.5">
                  <span className="text-amber-400">✓</span> 14 años de experiencia
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.a
                  href="#chat"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-10 py-5 text-base font-bold text-white transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    💬 Chatear con el asistente
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                  {/* shine sweep */}
                  <span className="absolute inset-0 -translate-x-full skew-x-12 bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />
                </motion.a>

                <motion.a
                  href="https://wa.me/1234567890"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-10 py-5 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
                >
                  📱 WhatsApp
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── How it works ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
            Proceso
          </span>
          <h3 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Así de simple funciona
          </h3>
        </motion.div>

        <HowItWorks steps={steps} />
      </div>
    </section>
  )
}

/* ── HowItWorks component ─────────────────────────────────── */

interface Step {
  number: string
  icon: string
  title: string
  description: string
  accent: string
}

const STEP_DURATION = 3500 // ms per step

function HowItWorks({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0)

  // auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, STEP_DURATION)
    return () => clearInterval(id)
  }, [steps.length])

  const current = steps[active]

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
      {/* Left — MorphingText + description */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Step counter */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-xs font-semibold tracking-[0.25em] text-white/30 uppercase">
            Paso
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-black tabular-nums"
              style={{ color: current.accent }}
            >
              {current.number} / {String(steps.length).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* MorphingText — cycles through step titles */}
        <MorphingText
          texts={steps.map((s) => s.title)}
          className="mb-6 h-20 justify-start text-left text-4xl font-black tracking-tight text-white sm:text-5xl"
        />

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="max-w-md text-base leading-relaxed text-white/50"
          >
            {current.description}
          </motion.p>
        </AnimatePresence>

        {/* Step dots */}
        <div className="mt-8 flex items-center gap-3">
          {steps.map((step, i) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ir a ${step.title}`}
              className="group flex items-center gap-2 transition-all duration-300"
            >
              <motion.div
                animate={{
                  width: active === i ? 32 : 8,
                  opacity: active === i ? 1 : 0.3,
                  backgroundColor: active === i ? step.accent : "rgba(255,255,255,0.4)",
                }}
                transition={{ duration: 0.35 }}
                className="h-2 rounded-full"
              />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Right — step cards stack */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative h-72"
      >
        {steps.map((step, i) => {
          const offset = i - active
          const isActive = offset === 0
          const isPrev = offset === -1 || (active === 0 && i === steps.length - 1)

          return (
            <motion.button
              key={step.number}
              type="button"
              onClick={() => setActive(i)}
              animate={{
                y: isActive ? 0 : isPrev ? -24 : Math.min(offset, 3) * 22,
                scale: isActive ? 1 : 1 - Math.min(Math.abs(offset), 3) * 0.06,
                opacity: Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.5,
                zIndex: isActive ? 10 : 10 - Math.abs(offset),
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-x-0 cursor-pointer rounded-3xl p-6 text-left"
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${step.accent}18, rgba(255,255,255,0.04))`
                  : "rgba(255,255,255,0.03)",
                border: isActive
                  ? `1px solid ${step.accent}40`
                  : "1px solid rgba(255,255,255,0.07)",
                boxShadow: isActive
                  ? `0 20px 60px ${step.accent}25`
                  : "none",
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black"
                  style={{
                    background: `${step.accent}22`,
                    border: `1.5px solid ${step.accent}55`,
                    color: step.accent,
                  }}
                >
                  {step.number}
                </div>
                <span className="text-xl">{step.icon}</span>
                <span className="ml-auto text-sm font-bold text-white/80">{step.title}</span>
              </div>
              {isActive && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm leading-relaxed text-white/40"
                >
                  {step.description}
                </motion.p>
              )}
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
