"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Globe } from "@/components/ui/globe";
import { AuroraText } from "@/components/ui/aurora-text";
import { Meteors } from "@/components/ui/meteors";

const floatingBadges = [
  { icon: "🏖️", label: "Cancún", delay: 0, x: "-8%", y: "20%" },
  { icon: "🗼", label: "París", delay: 0.4, x: "88%", y: "18%" },
  { icon: "🌊", label: "Caribe", delay: 0.8, x: "-10%", y: "65%" },
  { icon: "🗽", label: "Nueva York", delay: 1.2, x: "85%", y: "60%" },
  { icon: "⛩️", label: "Tokio", delay: 1.6, x: "42%", y: "88%" },
  { icon: "🏛️", label: "Roma", delay: 2.0, x: "18%", y: "82%" },
];

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.12,
      duration: 0.7,
      ease: "easeOut" as const,
    },
  }),
};

const headline = ["Cada viaje,", "un recuerdo", "eterno."];

const heroImages = [
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const globeY = useTransform(scrollYProgress, [0, 1], ["0%", "-42%"]);
  const globeOpacity = useTransform(scrollYProgress, [0, 0.6], [0.25, 0]);
  const bgBlobsY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const badgesY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 20;
      const y = ((e.clientY - top) / height - 0.5) * 20;
      el.style.setProperty("--mouse-x", `${x}px`);
      el.style.setProperty("--mouse-y", `${y}px`);
    };
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712]"
    >
      <Meteors count={14} className="opacity-45" />

      {/* Aurora gradient blobs */}
      <motion.div style={{ y: bgBlobsY }} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full opacity-20"
          style={{
            width: "clamp(280px, 55vw, 900px)",
            height: "clamp(280px, 55vw, 900px)",
            background: "radial-gradient(circle, #F97316 0%, transparent 70%)",
            top: "10%",
            left: "60%",
            transform: "translate(-50%, -50%)",
            animation: "aurora 25s linear infinite",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute rounded-full opacity-15"
          style={{
            width: "clamp(200px, 45vw, 700px)",
            height: "clamp(200px, 45vw, 700px)",
            background: "radial-gradient(circle, #0D9488 0%, transparent 70%)",
            top: "70%",
            left: "20%",
            transform: "translate(-50%, -50%)",
            animation: "aurora 30s linear infinite reverse",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: "clamp(160px, 30vw, 500px)",
            height: "clamp(160px, 30vw, 500px)",
            background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)",
            top: "30%",
            left: "10%",
            transform: "translate(-50%, -50%)",
            animation: "aurora 20s linear infinite",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Globe — positioned to the right, hidden on small screens */}
      <motion.div
        style={{ y: globeY, opacity: globeOpacity }}
        className="absolute right-[-5%] top-[5%] w-[90%] sm:w-[70%] lg:w-[55%] aspect-square pointer-events-none opacity-30 sm:opacity-60 lg:opacity-100"
      >
        <div className="relative w-full h-full">
          <Globe />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 pt-24 sm:pt-28 pb-20 grid lg:grid-cols-[1.08fr_0.92fr] gap-12 items-center"
      >
        <div className="relative">
          {/* Badge pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex"
          >
            <AuroraText>Agencia de Viajes de Confianza desde 2010</AuroraText>
          </motion.div>

          {/* Headline */}
          <div className="mb-6">
            {headline.map((line, lineIdx) => (
              <div key={lineIdx} className="overflow-hidden">
                <motion.div
                  custom={lineIdx}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className={
                    lineIdx === 1
                      ? "gradient-text-orange text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none block"
                      : "text-white text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none block"
                  }
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="text-white/62 text-sm sm:text-base lg:text-xl leading-relaxed max-w-lg mb-8 sm:mb-10"
          >
            Diseñamos experiencias de viaje únicas e irrepetibles. Desde el
            Caribe hasta Europa, cada destino se convierte en un capítulo de tu
            historia.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <a
              href="#cotizar"
              className="group flex items-center justify-center gap-2 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-1 active:translate-y-0 text-sm sm:text-base"
            >
              ✈️ Planear mi viaje
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </a>
            <a
              href="#servicios"
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
            >
              Ver servicios
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="flex items-center gap-6 mt-12"
          >
            {[
              { number: "2K+", label: "Clientes felices" },
              { number: "60+", label: "Destinos" },
              { number: "14", label: "Años de experiencia" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-white">
                  {stat.number}
                </div>
                <div className="text-white/40 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative hidden lg:block"
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-linear-to-br from-orange-500/20 via-transparent to-teal-500/15 blur-3xl" />

          <div className="relative ml-auto w-full max-w-155 aspect-4/5 rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/4 shadow-[0_40px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{ backgroundImage: `url(${heroImages[0]})` }}
            />
            <div className="absolute inset-0 bg-linear-to-tr from-[#030712] via-[#030712]/20 to-transparent" />

            <div className="absolute inset-x-6 top-6 flex items-center justify-between gap-4">
              <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-white/70 backdrop-blur-md">
                VIAJES CON ESTILO
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-200 backdrop-blur-md">
                4.9/5 opiniones
              </div>
            </div>

            <div className="absolute left-6 right-6 bottom-6 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#030712]/65 backdrop-blur-md">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${heroImages[1]})` }}
                />
                <div className="p-5">
                  <div className="text-white font-bold text-lg">
                    Cancún, México
                  </div>
                  <div className="mt-1 text-white/45 text-sm">
                    Playas, experiencias privadas y una atención que sí
                    acompaña.
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div
                  className="flex-1 rounded-[1.75rem] border border-white/10 bg-cover bg-center shadow-lg"
                  style={{ backgroundImage: `url(${heroImages[2]})` }}
                >
                  <div className="h-full rounded-[1.75rem] bg-linear-to-t from-[#030712] via-[#030712]/30 to-transparent p-5 flex items-end">
                    <div>
                      <div className="text-xs uppercase tracking-[0.24em] text-white/45">
                        Experiencia premium
                      </div>
                      <div className="mt-2 text-white font-bold text-base">
                        Itinerarios listos para disfrutar
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                  <div className="text-xs uppercase tracking-[0.24em] text-white/35">
                    Opinión reciente
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/72">
                    &ldquo;Nos atendieron con claridad, rapidez y buen gusto. El
                    viaje salió mejor de lo que imaginábamos.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating destination badges */}
      <motion.div style={{ y: badgesY }} className="absolute inset-0 pointer-events-none">
        {floatingBadges.map((badge) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{
              delay: 1.5 + badge.delay,
              duration: 0.5,
              ease: "backOut",
            }}
            className="absolute hidden xl:flex items-center gap-2 glass-card text-white text-xs font-medium px-3 py-2 rounded-full pointer-events-none"
            style={{
              left: badge.x,
              top: badge.y,
              animation: `float ${4 + badge.delay}s ease-in-out infinite`,
              animationDelay: `${badge.delay}s`,
            }}
          >
            <span>{badge.icon}</span>
            <span className="text-white/80">{badge.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">
          Descubre más
        </span>
        <div
          className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
          style={{ animation: "float 2s ease-in-out infinite" }}
        >
          <div className="w-1 h-1.5 rounded-full bg-orange-500" />
        </div>
      </motion.div>
    </section>
  );
}
