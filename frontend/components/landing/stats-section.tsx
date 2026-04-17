"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

const stats = [
  {
    number: 2000,
    suffix: "+",
    label: "Clientes felices",
    icon: "😊",
    tag: "Por qué elegirnos",
    description:
      "Familias, parejas y grupos que nos eligieron para vivir su mejor viaje. Cada uno, una historia que nos llena de orgullo.",
    image:
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1800&q=80",
    accent: "#F97316",
    glow: "rgba(249,115,22,0.18)",
    imageA:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    imageB:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    number: 60,
    suffix: "+",
    label: "Destinos disponibles",
    icon: "🌍",
    tag: "Alcance global",
    description:
      "Desde el Caribe Mexicano hasta el corazón de Europa. Cada destino curado y probado para garantizar una experiencia sin igual.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80",
    accent: "#0D9488",
    glow: "rgba(13,148,136,0.18)",
    imageA:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    imageB:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80",
  },
  {
    number: 14,
    suffix: "",
    label: "Años de experiencia",
    icon: "⭐",
    tag: "Trayectoria",
    description:
      "Más de una década perfeccionando el arte de viajar. Conocimiento local, conexiones internacionales y el trato que marca la diferencia.",
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1800&q=80",
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.18)",
    imageA:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80",
    imageB:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=900&q=80",
  },
  {
    number: 98,
    suffix: "%",
    label: "Satisfacción garantizada",
    icon: "💫",
    tag: "Calidad",
    description:
      "No es un número al azar: es el resultado de escuchar, personalizar y acompañar a nuestros viajeros desde la primera consulta hasta el regreso.",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=80",
    accent: "#10B981",
    glow: "rgba(16,185,129,0.18)",
    imageA:
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=900&q=80",
    imageB:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80",
  },
];

function useCountUp(
  target: number,
  duration: number,
  isActive: boolean
): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setCount(0);
      return;
    }
    let startTime: number | null = null;
    let rafId: number;

    function step(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, isActive]);

  return count;
}

function StatPanel({
  stat,
  index,
  isActive,
}: {
  stat: (typeof stats)[0];
  index: number;
  isActive: boolean;
}) {
  const count = useCountUp(stat.number, 2200, isActive);

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 55, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -45, filter: "blur(10px)" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end"
        >
          {/* Left: stat info */}
          <div className="rounded-[2rem] border border-white/15 bg-black/30 p-7 backdrop-blur-lg md:p-10">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-4xl">{stat.icon}</span>
              <span
                className="rounded-full border px-3 py-1 text-xs font-bold tracking-wide"
                style={{
                  borderColor: `${stat.accent}50`,
                  color: stat.accent,
                  background: `${stat.accent}18`,
                }}
              >
                {stat.tag}
              </span>
            </div>

            <div className="text-xs uppercase tracking-[0.28em] text-white/55">
              Estadística {String(index + 1).padStart(2, "0")}
            </div>

            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-7xl font-black leading-none text-white tabular-nums md:text-[5.5rem]">
                {count.toLocaleString()}
              </span>
              <span
                className="text-4xl font-black leading-none md:text-5xl"
                style={{ color: stat.accent }}
              >
                {stat.suffix}
              </span>
            </div>

            <h3 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
              {stat.label}
            </h3>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65 md:text-base">
              {stat.description}
            </p>
          </div>

          {/* Right: two images */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <motion.div
              key={`${stat.label}-a`}
              initial={{ opacity: 0, x: 40, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.92 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="h-44 rounded-[1.5rem] border border-white/20 bg-cover bg-center shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:h-52"
              style={{ backgroundImage: `url(${stat.imageA})` }}
            />
            <motion.div
              key={`${stat.label}-b`}
              initial={{ opacity: 0, x: 40, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.92 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.04 }}
              className="h-44 rounded-[1.5rem] border border-white/20 bg-cover bg-center shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:h-52"
              style={{ backgroundImage: `url(${stat.imageB})` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const stepVh = 58;
  const totalVh = stats.length * stepVh + 140;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(
      stats.length - 1,
      Math.floor(value * stats.length)
    );
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  const activeStat = stats[activeIndex];

  return (
    <section id="nosotros" className="relative bg-[#050A18]">
      <div
        ref={sectionRef}
        className="relative hidden lg:block"
        style={{ height: `${totalVh}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Backgrounds */}
          {stats.map((stat, index) => (
            <motion.div
              key={`bg-${stat.label}`}
              initial={false}
              animate={{ opacity: activeIndex === index ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${stat.image})` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#030712]/94 via-[#030712]/55 to-[#030712]/30" />
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 70% 50%, ${stat.glow} 0%, transparent 55%)`,
                }}
              />
            </motion.div>
          ))}

          {/* Content */}
          <div className="relative z-10 flex h-full w-full items-center justify-center px-6 py-8 md:px-10">
            <div className="w-full max-w-6xl">
              {/* Header bar */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-white/70">
                  NÚMEROS QUE HABLAN
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs text-white/70">
                  <span>Estadística</span>
                  <span className="text-white/35">
                    {activeIndex + 1}/{stats.length}
                  </span>
                </div>
              </div>

              {/* Stat panels */}
              {stats.map((stat, index) => (
                <StatPanel
                  key={stat.label}
                  stat={stat}
                  index={index}
                  isActive={activeIndex === index}
                />
              ))}

              {/* Progress */}
              <div className="mt-8 grid grid-cols-4 gap-2">
                {stats.map((stat, index) => (
                  <button
                    key={`progress-${stat.label}`}
                    type="button"
                    aria-label={`Ir a ${stat.label}`}
                    onClick={() => {
                      const el = sectionRef.current;
                      if (!el) return;
                      const rect = el.getBoundingClientRect();
                      const sectionTop = window.scrollY + rect.top;
                      const scrollable = Math.max(
                        1,
                        el.offsetHeight - window.innerHeight
                      );
                      const ratio =
                        stats.length === 1 ? 0 : index / (stats.length - 1);
                      window.scrollTo({
                        top: sectionTop + scrollable * ratio,
                        behavior: "smooth",
                      });
                    }}
                    className="h-2 rounded-full bg-white/20"
                  >
                    <motion.span
                      className="block h-full rounded-full"
                      animate={{
                        opacity: activeIndex === index ? 1 : 0.25,
                        scaleX: activeIndex === index ? 1 : 0.5,
                        backgroundColor:
                          activeIndex === index
                            ? activeStat.accent
                            : "rgba(255,255,255,0.4)",
                      }}
                      transition={{ duration: 0.35 }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 px-5 pb-16 md:px-8 lg:hidden">
        {stats.map((stat, index) => (
          <motion.article
            key={`mobile-${stat.label}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
            className="relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-black/35"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${stat.image})` }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#030712]/95 via-[#030712]/62 to-[#030712]/22" />
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 70% 40%, ${stat.glow} 0%, transparent 55%)`,
              }}
            />

            <div className="relative z-10 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl leading-none">{stat.icon}</span>
                  <span
                    className="rounded-full border px-3 py-1 text-[10px] font-bold tracking-wide"
                    style={{
                      borderColor: `${stat.accent}50`,
                      color: stat.accent,
                      background: `${stat.accent}18`,
                    }}
                  >
                    {stat.tag}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black leading-none text-white tabular-nums">
                  {stat.number.toLocaleString()}
                </span>
                <span className="text-3xl font-black leading-none" style={{ color: stat.accent }}>
                  {stat.suffix}
                </span>
              </div>

              <h3 className="mt-2 text-2xl font-black tracking-tight text-white">{stat.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/68">{stat.description}</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div
                  className="aspect-4/3 rounded-2xl border border-white/20 bg-cover bg-center shadow-[0_16px_36px_rgba(0,0,0,0.35)]"
                  style={{ backgroundImage: `url(${stat.imageA})` }}
                />
                <div
                  className="aspect-4/3 rounded-2xl border border-white/20 bg-cover bg-center shadow-[0_16px_36px_rgba(0,0,0,0.35)]"
                  style={{ backgroundImage: `url(${stat.imageB})` }}
                />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
