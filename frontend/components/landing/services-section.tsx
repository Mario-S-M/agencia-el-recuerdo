"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { cn } from "@/lib/utils";

const hexagonPatternSvg = `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.45" stroke="#FFFFFF" stroke-opacity="0.22" stroke-width="1.2"><path d="M40 5L61.65 17.5V42.5L40 55L18.35 42.5V17.5L40 5Z"/><path d="M0 55L21.65 67.5V92.5L0 105L-21.65 92.5V67.5L0 55Z" transform="translate(19 -12)"/><path d="M40 35L61.65 47.5V72.5L40 85L18.35 72.5V47.5L40 35Z" transform="translate(0 10)"/></g></svg>`;

const hexagonPattern = `url("data:image/svg+xml,${encodeURIComponent(hexagonPatternSvg)}")`;

const services = [
  {
    icon: "🌊",
    title: "Paquetes al Mar",
    subtitle: "Escape a playas premium",
    description:
      "Escápate a las playas más paradisíacas del mundo. Cancún, Los Cabos, Riviera Maya y destinos internacionales de ensueño.",
    color: "from-blue-500/25 to-teal-500/15",
    glow: "group-hover:shadow-blue-500/20",
    border: "group-hover:border-blue-500/30",
    tag: "El más popular",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1800&q=80",
    imageA:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=900&q=80",
    imageB:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    destinations: ["Cancún", "Ixtapa", "Puerto Vallarta", "Riviera Maya"],
  },
  {
    icon: "✈️",
    title: "Vuelos",
    subtitle: "Conexiones nacionales e internacionales",
    description:
      "Los mejores vuelos nacionales e internacionales con las tarifas más competitivas. Tu aventura comienza desde el despegue.",
    color: "from-orange-500/25 to-amber-500/15",
    glow: "group-hover:shadow-orange-500/20",
    border: "group-hover:border-orange-500/30",
    tag: null,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=80",
    imageA:
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=900&q=80",
    imageB:
      "https://images.unsplash.com/photo-1540339832862-474599807836?auto=format&fit=crop&w=900&q=80",
    destinations: ["CDMX", "París", "Roma", "Madrid"],
  },
  {
    icon: "🗺️",
    title: "Excursiones",
    subtitle: "Experiencias guiadas y culturales",
    description:
      "Recorridos nacionales e internacionales guiados. Historia, cultura, aventura y naturaleza en una sola experiencia.",
    color: "from-emerald-500/25 to-green-500/15",
    glow: "group-hover:shadow-emerald-500/20",
    border: "group-hover:border-emerald-500/30",
    tag: null,
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1800&q=80",
    imageA:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=900&q=80",
    imageB:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=900&q=80",
    destinations: ["Europa Esencial", "Roma", "Barcelona", "Londres"],
  },
  {
    icon: "🚌",
    title: "Transporte",
    subtitle: "Traslados puntuales y cómodos",
    description:
      "Traslados cómodos y puntuales. Aeropuertos, hoteles, sitios turísticos. Tu comodidad es nuestra prioridad.",
    color: "from-violet-500/25 to-purple-500/15",
    glow: "group-hover:shadow-violet-500/20",
    border: "group-hover:border-violet-500/30",
    tag: null,
    image:
      "https://images.unsplash.com/photo-1464219222984-216ebffaaf85?auto=format&fit=crop&w=1800&q=80",
    imageA:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80",
    imageB:
      "https://images.unsplash.com/photo-1506671753197-8d137cc5d53c?auto=format&fit=crop&w=900&q=80",
    destinations: ["Aeropuerto", "Hoteles", "Tours", "Terminales"],
  },
  {
    icon: "🚢",
    title: "Cruceros",
    subtitle: "Rutas por Caribe y Europa",
    description:
      "Navega el Caribe, el Mediterráneo y Alaska con las mejores líneas de cruceros. Lujo flotante en cada destino.",
    color: "from-cyan-500/25 to-blue-500/15",
    glow: "group-hover:shadow-cyan-500/20",
    border: "group-hover:border-cyan-500/30",
    tag: "Nuevo",
    image:
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1800&q=80",
    imageA:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80",
    imageB:
      "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=900&q=80",
    destinations: ["Caribe", "Mediterráneo", "Francia", "Roma"],
  },
  {
    icon: "💍",
    title: "Bodas & XV Años",
    subtitle: "Eventos destino inolvidables",
    description:
      "El evento de tu vida merece el escenario perfecto. Destinos de playa, haciendas coloniales y resorts boutique.",
    color: "from-rose-500/25 to-pink-500/15",
    glow: "group-hover:shadow-rose-500/20",
    border: "group-hover:border-rose-500/30",
    tag: "Especial",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1800&q=80",
    imageA:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=80",
    imageB:
      "https://images.unsplash.com/photo-1511795409834-432f7b1728f2?auto=format&fit=crop&w=900&q=80",
    destinations: ["Puerto Vallarta", "Ixtapa", "Cancún", "Riviera Maya"],
  },
];

export function ServicesSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const stepVh = 42;
  const timelineVh = services.length * stepVh + 140;

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(
      services.length - 1,
      Math.floor(value * services.length),
    );
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  const activeService = services[activeIndex];

  return (
    <section id="servicios" className="relative bg-[#050A18]">
      <div className="absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-orange-500/40 to-transparent" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: hexagonPattern,
          backgroundRepeat: "repeat",
          backgroundSize: "96px 96px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(13,148,136,0.10),transparent_30%)]" />

      <div className="relative mx-auto w-full max-w-none px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 pt-20 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-xs font-semibold text-orange-400">
            ✦ Nuestros Servicios
          </div>
          <h2 className="mb-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Todo lo que necesitas
            <br />
            <span className="gradient-text-orange">para tu aventura.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/40">
            Desde una escapada de fin de semana hasta el viaje de bodas de tus
            sueños, tenemos el servicio perfecto para cada ocasión.
          </p>
        </motion.div>

        <div
          ref={timelineRef}
          className="relative hidden lg:block"
          style={{ height: `${timelineVh}vh` }}
        >
          <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-hidden rounded-[2rem] border border-white/10 bg-black/30">
            {services.map((service, index) => (
              <motion.div
                key={`bg-${service.title}`}
                initial={false}
                animate={{ opacity: activeIndex === index ? 1 : 0 }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-linear-to-br",
                    service.color,
                  )}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#030712]/94 via-[#030712]/45 to-[#030712]/22" />
              </motion.div>
            ))}

            <div className="relative z-10 flex h-full w-full items-center justify-center px-6 py-8 md:px-10">
              <div className="w-full max-w-6xl">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-white/70">
                    EXPERIENCIA PARALLAX
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs text-white/70">
                    <span>Intercambio de información</span>
                    <span className="text-white/35">
                      {activeIndex + 1}/{services.length}
                    </span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.title}
                    initial={{ opacity: 0, y: 55, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -45, filter: "blur(10px)" }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end"
                  >
                    <div className="rounded-[2rem] border border-white/15 bg-black/30 p-7 backdrop-blur-lg md:p-10">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="text-4xl">{activeService.icon}</span>
                        {activeService.tag && (
                          <span className="rounded-full border border-orange-300/35 bg-orange-400/20 px-3 py-1 text-xs font-bold tracking-wide text-orange-100">
                            {activeService.tag}
                          </span>
                        )}
                      </div>

                      <div className="text-xs uppercase tracking-[0.28em] text-white/55">
                        Servicio {String(activeIndex + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-3 text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
                        {activeService.title}
                      </h3>
                      <p className="mt-3 text-base font-semibold text-white/82 md:text-xl">
                        {activeService.subtitle}
                      </p>
                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
                        {activeService.description}
                      </p>

                      <div className="mt-7 flex flex-wrap gap-2">
                        {activeService.destinations.map((destination) => (
                          <span
                            key={`${activeService.title}-${destination}`}
                            className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs font-semibold tracking-wide text-white/85"
                          >
                            {destination}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                      <motion.div
                        key={`${activeService.title}-a`}
                        initial={{ opacity: 0, x: 40, scale: 0.92 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -40, scale: 0.92 }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="h-44 rounded-[1.5rem] border border-white/20 bg-cover bg-center shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:h-52"
                        style={{
                          backgroundImage: `url(${activeService.imageA})`,
                        }}
                      />
                      <motion.div
                        key={`${activeService.title}-b`}
                        initial={{ opacity: 0, x: 40, scale: 0.92 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -40, scale: 0.92 }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                          delay: 0.04,
                        }}
                        className="h-44 rounded-[1.5rem] border border-white/20 bg-cover bg-center shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:h-52"
                        style={{
                          backgroundImage: `url(${activeService.imageB})`,
                        }}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                  {services.map((service, index) => {
                    const isActive = activeIndex === index;
                    return (
                      <button
                        key={`progress-${service.title}`}
                        type="button"
                        aria-label={`Ir a ${service.title}`}
                        onClick={() => {
                          const timeline = timelineRef.current;
                          if (!timeline) return;
                          const rect = timeline.getBoundingClientRect();
                          const sectionTop = window.scrollY + rect.top;
                          const scrollable = Math.max(
                            1,
                            timeline.offsetHeight - window.innerHeight,
                          );
                          const ratio =
                            services.length === 1
                              ? 0
                              : index / (services.length - 1);
                          window.scrollTo({
                            top: sectionTop + scrollable * ratio,
                            behavior: "smooth",
                          });
                        }}
                        className="relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300"
                        style={{
                          background: isActive
                            ? "rgba(255,255,255,0.10)"
                            : "rgba(255,255,255,0.03)",
                          border: isActive
                            ? "1px solid rgba(255,255,255,0.22)"
                            : "1px solid rgba(255,255,255,0.07)",
                          color: isActive
                            ? "rgba(255,255,255,0.95)"
                            : "rgba(255,255,255,0.30)",
                        }}
                      >
                        <span
                          className="text-base leading-none transition-all duration-300"
                          style={{ opacity: isActive ? 1 : 0.5 }}
                        >
                          {service.icon}
                        </span>
                        <span className="hidden sm:inline">{service.title}</span>
                        {isActive && (
                          <motion.span
                            layoutId="service-pill-active"
                            className="absolute inset-0 rounded-full"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(249,115,22,0.18), rgba(13,148,136,0.12))",
                              border: "1px solid rgba(249,115,22,0.3)",
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 pb-14 lg:hidden">
          {services.map((service, index) => (
            <motion.article
              key={`mobile-${service.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-black/35"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              <div
                className={cn(
                  "absolute inset-0 bg-linear-to-br",
                  service.color,
                )}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#030712]/95 via-[#030712]/58 to-[#030712]/20" />

              <div className="relative z-10 p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl leading-none">{service.icon}</span>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.24em] text-white/55">
                        Servicio {String(index + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-1 text-2xl font-black tracking-tight text-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  {service.tag && (
                    <span className="rounded-full border border-orange-300/35 bg-orange-400/20 px-3 py-1 text-[10px] font-bold tracking-wide text-orange-100">
                      {service.tag}
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-white/82">{service.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/68">
                  {service.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {service.destinations.map((destination) => (
                    <span
                      key={`mobile-${service.title}-${destination}`}
                      className="rounded-full border border-white/18 bg-black/35 px-3 py-1 text-[11px] font-semibold text-white/85"
                    >
                      {destination}
                    </span>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div
                    className="aspect-4/3 rounded-2xl border border-white/20 bg-cover bg-center shadow-[0_16px_36px_rgba(0,0,0,0.35)]"
                    style={{ backgroundImage: `url(${service.imageA})` }}
                  />
                  <div
                    className="aspect-4/3 rounded-2xl border border-white/20 bg-cover bg-center shadow-[0_16px_36px_rgba(0,0,0,0.35)]"
                    style={{ backgroundImage: `url(${service.imageB})` }}
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
