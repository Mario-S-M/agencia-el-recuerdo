"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/features/chat/store/useChatStore";

const destinations = [
  {
    name: "Cancún",
    country: "México",
    region: "Caribe",
    tag: "El más visitado",
    gradient: "from-cyan-500/80 via-blue-600/60 to-teal-800",
    image:
      "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=1400&q=80",
    description: "Playas de arena blanca, aguas turquesa y vida nocturna incomparable.",
    icon: "🏖️",
  },
  {
    name: "Ixtapa",
    country: "México",
    region: "Pacífico",
    tag: "Playa favorita",
    gradient: "from-sky-500/75 via-cyan-700/55 to-blue-900",
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1400&q=80",
    description: "Atardeceres dorados, mar tranquilo y resorts ideales para descansar.",
    icon: "🌴",
  },
  {
    name: "Puerto Vallarta",
    country: "México",
    region: "Pacífico",
    tag: "Todo incluido",
    gradient: "from-amber-500/75 via-orange-700/55 to-rose-900",
    image:
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1400&q=80",
    description: "Malecón vibrante, playa y gastronomía para una escapada completa.",
    icon: "⛱️",
  },
  {
    name: "Emporio Ixtapa",
    country: "México",
    region: "Hotelería",
    tag: "Hotel destacado",
    gradient: "from-cyan-500/70 via-blue-700/50 to-slate-900",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=80",
    description: "Hotel frente al mar con piscina panorámica y experiencia premium.",
    icon: "🏨",
  },
  {
    name: "Gran Azul",
    country: "México",
    region: "Hotelería",
    tag: "Recomendado",
    gradient: "from-blue-500/75 via-indigo-700/55 to-slate-950",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
    description: "Instalaciones modernas y vista al mar para disfrutar al máximo.",
    icon: "🛎️",
  },
  {
    name: "París",
    country: "Francia",
    region: "Europa",
    tag: "Romántico",
    gradient: "from-rose-500/70 via-pink-700/50 to-slate-800",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80",
    description: "La ciudad del amor, el arte y la gastronomía más exquisita del mundo.",
    icon: "🗼",
  },
  {
    name: "Francia Clásica",
    country: "Francia",
    region: "Europa",
    tag: null,
    gradient: "from-fuchsia-500/70 via-pink-700/50 to-violet-900",
    image:
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=1400&q=80",
    description: "Ruta por París, castillos y pueblos encantadores.",
    icon: "🇫🇷",
  },
  {
    name: "Riviera Maya",
    country: "México",
    region: "Caribe",
    tag: null,
    gradient: "from-emerald-500/70 via-green-700/50 to-teal-900",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80",
    description: "Cenotes, ruinas mayas y el arrecife de coral más grande de América.",
    icon: "🌿",
  },
  {
    name: "Europa Esencial",
    country: "Europa",
    region: "Multidestino",
    tag: "Tour guiado",
    gradient: "from-indigo-500/70 via-violet-700/50 to-slate-950",
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1400&q=80",
    description: "París, Madrid, Roma y más ciudades top en un itinerario completo.",
    icon: "🚄",
  },
  {
    name: "Roma",
    country: "Italia",
    region: "Europa",
    tag: "Historia viva",
    gradient: "from-amber-500/70 via-orange-700/50 to-red-900",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1400&q=80",
    description: "El Coliseo, la Fontana di Trevi y la auténtica pasta italiana.",
    icon: "🏛️",
  },
  {
    name: "Madrid",
    country: "España",
    region: "Europa",
    tag: null,
    gradient: "from-red-500/70 via-orange-700/50 to-zinc-900",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1400&q=80",
    description: "Museos, plazas y vida nocturna vibrante para una experiencia completa.",
    icon: "🇪🇸",
  },
  {
    name: "Barcelona",
    country: "España",
    region: "Europa",
    tag: null,
    gradient: "from-amber-500/70 via-yellow-700/50 to-orange-950",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1400&q=80",
    description: "Arquitectura icónica, playa urbana y gastronomía mediterránea.",
    icon: "🌇",
  },
  {
    name: "Caribe",
    country: "Cruceros",
    region: "Mar Caribe",
    tag: "Cruceros",
    gradient: "from-blue-500/70 via-indigo-700/50 to-slate-900",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    description: "Islas paradisíacas, puertos vibrantes y el lujo de navegar el Caribe.",
    icon: "🚢",
  },
  {
    name: "Los Cabos",
    country: "México",
    region: "Pacífico",
    tag: null,
    gradient: "from-orange-500/70 via-red-700/50 to-amber-900",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
    description: "El arco de piedra, desierto y océano en el extremo sur de Baja.",
    icon: "🌅",
  },
  {
    name: "Londres",
    country: "Reino Unido",
    region: "Europa",
    tag: null,
    gradient: "from-slate-500/70 via-slate-700/50 to-zinc-950",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=80",
    description: "Historia, cultura y modernidad en una ciudad para toda la familia.",
    icon: "🎡",
  },
  {
    name: "Santorini",
    country: "Grecia",
    region: "Europa",
    tag: "Luna de miel",
    gradient: "from-sky-500/70 via-blue-700/50 to-indigo-950",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=80",
    description: "Cúpulas azules, mar Egeo y atardeceres increíbles para una experiencia romántica.",
    icon: "💙",
  },
];

const destinationGroups = [
  {
    label: "Caribe & Pacífico",
    tag: "México",
    description:
      "Las playas más hermosas de México te esperan. Arena blanca, aguas cristalinas y atardeceres que no olvidarás.",
    image:
      "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=1800&q=80",
    accent: "#06B6D4",
    glow: "rgba(6,182,212,0.18)",
    indices: [0, 1, 2, 7],
  },
  {
    label: "Pacífico & Resorts",
    tag: "Hotelería Premium",
    description:
      "Resorts boutique, hoteles frente al mar y el lujo del Pacífico mexicano. Experiencias diseñadas para recordar.",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1800&q=80",
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.18)",
    indices: [13, 3, 4, 12],
  },
  {
    label: "Europa del Sur",
    tag: "Europa",
    description:
      "París, Roma, Madrid y las rutas más románticas del continente. Arte, gastronomía y arquitectura milenaria.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1800&q=80",
    accent: "#F43F5E",
    glow: "rgba(244,63,94,0.18)",
    indices: [5, 6, 9, 10],
  },
  {
    label: "Europa & Mediterráneo",
    tag: "Multidestino",
    description:
      "Barcelona, Londres, Santorini y tours europeos completos. Cada ciudad, una historia diferente esperándote.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1800&q=80",
    accent: "#6366F1",
    glow: "rgba(99,102,241,0.18)",
    indices: [8, 11, 14, 15],
  },
];

function DestCard({
  dest,
  accent,
  onCotizar,
}: {
  dest: (typeof destinations)[0];
  accent: string;
  onCotizar: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      style={{ aspectRatio: "4/3" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${dest.image})` }}
      />
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-br transition-opacity duration-500",
          dest.gradient
        )}
        style={{ opacity: 0.6 }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#030712]/90 via-[#030712]/40 to-transparent" />

      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-2xl">{dest.icon}</span>
          {dest.tag && (
            <span className="bg-black/30 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold px-2.5 py-1 rounded-full">
              {dest.tag}
            </span>
          )}
        </div>

        <div>
          <div className="text-white/40 text-[10px] font-semibold tracking-widest uppercase mb-0.5">
            {dest.region} · {dest.country}
          </div>
          <h4 className="text-white font-black text-xl tracking-tight leading-none mb-2">
            {dest.name}
          </h4>

          <AnimatePresence>
            {hovered && (
              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18 }}
                onClick={onCotizar}
                className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 hover:bg-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-150"
                style={{ borderColor: `${accent}40` }}
              >
                Cotizar →
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function DestinationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const openChat = useChatStore((s) => s.openChat);
  const stepVh = 68;
  const totalVh = destinationGroups.length * stepVh + 140;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(
      destinationGroups.length - 1,
      Math.floor(value * destinationGroups.length)
    );
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  const activeGroup = destinationGroups[activeIndex];

  return (
    <section id="destinos" className="relative bg-[#050A18]">
      <div
        ref={sectionRef}
        className="relative hidden lg:block"
        style={{ height: `${totalVh}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Backgrounds */}
          {destinationGroups.map((group, index) => (
            <motion.div
              key={`bg-${group.label}`}
              initial={false}
              animate={{ opacity: activeIndex === index ? 1 : 0 }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center scale-105"
                style={{ backgroundImage: `url(${group.image})` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#030712]/96 via-[#030712]/60 to-[#030712]/28" />
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 30% 60%, ${group.glow} 0%, transparent 55%)`,
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
                  DESTINOS SOÑADOS
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs text-white/70">
                  <span>Región</span>
                  <span className="text-white/35">
                    {activeIndex + 1}/{destinationGroups.length}
                  </span>
                </div>
              </div>

              {/* Group content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGroup.label}
                  initial={{ opacity: 0, y: 55, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -45, filter: "blur(10px)" }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
                >
                  {/* Left: group info */}
                  <div className="rounded-[2rem] border border-white/15 bg-black/30 p-7 backdrop-blur-lg md:p-10">
                    <span
                      className="rounded-full border px-3 py-1 text-xs font-bold tracking-wide"
                      style={{
                        borderColor: `${activeGroup.accent}50`,
                        color: activeGroup.accent,
                        background: `${activeGroup.accent}18`,
                      }}
                    >
                      {activeGroup.tag}
                    </span>

                    <h3 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                      {activeGroup.label}
                    </h3>

                    <div
                      className="my-5 h-px w-16"
                      style={{
                        background: `linear-gradient(to right, ${activeGroup.accent}, transparent)`,
                      }}
                    />

                    <p className="text-sm leading-relaxed text-white/65 md:text-base">
                      {activeGroup.description}
                    </p>

                    <div className="mt-6 space-y-2">
                      {activeGroup.indices.map((i) => (
                        <div
                          key={destinations[i].name}
                          className="flex items-center gap-2 text-white/50 text-sm"
                        >
                          <span
                            className="h-1 w-1 shrink-0 rounded-full"
                            style={{ background: activeGroup.accent }}
                          />
                          <span>{destinations[i].icon}</span>
                          <span>{destinations[i].name}</span>
                          <span className="text-white/25">·</span>
                          <span className="text-white/30 text-xs">
                            {destinations[i].region}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => openChat()}
                      className="mt-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white"
                    >
                      💬 Cotizar esta región →
                    </button>
                  </div>

                  {/* Right: 2x2 destination cards */}
                  <div className="grid grid-cols-2 gap-3">
                    {activeGroup.indices.map((destIdx, cardIdx) => (
                      <motion.div
                        key={`${activeGroup.label}-${destinations[destIdx].name}`}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{
                          duration: 0.45,
                          ease: "easeOut",
                          delay: cardIdx * 0.07,
                        }}
                      >
                        <DestCard
                          dest={destinations[destIdx]}
                          accent={activeGroup.accent}
                          onCotizar={() => openChat(destinations[destIdx].name)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress */}
              <div className="mt-8 grid grid-cols-4 gap-2">
                {destinationGroups.map((group, index) => (
                  <button
                    key={`progress-${group.label}`}
                    type="button"
                    aria-label={`Ir a ${group.label}`}
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
                        destinationGroups.length === 1
                          ? 0
                          : index / (destinationGroups.length - 1);
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
                            ? activeGroup.accent
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

      <div className="grid gap-6 px-5 pb-12 md:px-8 lg:hidden">
        {destinationGroups.map((group, groupIndex) => (
          <motion.article
            key={`mobile-${group.label}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: groupIndex * 0.05 }}
            className="relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-black/35"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${group.image})` }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#030712]/95 via-[#030712]/62 to-[#030712]/22" />
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 25% 65%, ${group.glow} 0%, transparent 58%)`,
              }}
            />

            <div className="relative z-10 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span
                  className="rounded-full border px-3 py-1 text-[10px] font-bold tracking-wide"
                  style={{
                    borderColor: `${group.accent}50`,
                    color: group.accent,
                    background: `${group.accent}18`,
                  }}
                >
                  {group.tag}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                  Región {String(groupIndex + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-2xl font-black leading-tight tracking-tight text-white">
                {group.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/68">{group.description}</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {group.indices.map((destIdx) => (
                  <div key={`mobile-card-${group.label}-${destinations[destIdx].name}`}>
                    <DestCard
                      dest={destinations[destIdx]}
                      accent={group.accent}
                      onCotizar={() => openChat(destinations[destIdx].name)}
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => openChat()}
                className="mt-5 flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-2.5 text-sm font-semibold text-white/75 transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                💬 Cotizar esta región →
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Footer link */}
      <div className="relative z-10 py-8 text-center bg-[#050A18]">
        <a
          href="#cotizar"
          className="inline-flex items-center gap-2 text-white/40 hover:text-orange-400 text-sm font-medium transition-colors duration-200"
        >
          ¿No ves tu destino soñado? Consúltanos →
        </a>
      </div>
    </section>
  );
}
