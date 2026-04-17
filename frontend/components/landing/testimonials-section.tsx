"use client";

import { motion } from "motion/react";
import { AuroraText } from "@/components/ui/aurora-text";
import { Marquee } from "@/components/ui/marquee";
import { Meteors } from "@/components/ui/meteors";
import { VideoText } from "@/components/ui/video-text";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Mariana & Luis",
    city: "Cancún",
    quote:
      "Nos resolvieron todo en una tarde. El hotel, los traslados y hasta el restaurante para la cena especial.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Fernanda R.",
    city: "París",
    quote:
      "Sentimos acompañamiento real antes y durante el viaje. Se nota que sí cuidan la experiencia.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Grupo Mendoza",
    city: "Riviera Maya",
    quote:
      "El paquete familiar salió perfecto. Puntuales, claros y con opciones para todos los gustos.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Carlos V.",
    city: "Roma",
    quote:
      "La atención fue cercana y rápida. Me dieron una propuesta que realmente valía la pena.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Sofía y Andrés",
    city: "Los Cabos",
    quote:
      "Nos encantó que nos enviaran opciones visuales y recomendaciones de verdad útiles. Todo se sintió premium.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
  },
];


function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "group relative flex h-full min-w-[320px] max-w-90 flex-col overflow-hidden rounded-[2rem] border border-white/10",
        "bg-white/4 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl",
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${testimonial.image})` }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#050A18]/20 via-[#050A18]/70 to-[#050A18]/95" />
      <div className="relative flex h-full flex-col justify-between p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-white font-bold text-lg">
              {testimonial.name}
            </div>
            <div className="text-white/45 text-sm">{testimonial.city}</div>
          </div>
          <div className="rounded-full border border-amber-400/20 bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-200">
            {"★".repeat(testimonial.rating)}
          </div>
        </div>

        <div className="mt-20">
          <p className="text-white/86 text-base leading-relaxed">
            “{testimonial.quote}”
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs tracking-[0.24em] uppercase text-white/38">
            <span className="h-px flex-1 bg-white/15" />
            Opinión verificada
            <span className="h-px flex-1 bg-white/15" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id="opiniones"
      className="relative overflow-hidden py-32 travel-surface"
    >
      <Meteors className="opacity-55" count={16} />

      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(249,115,22,0.12), transparent 0 28%), radial-gradient(circle at 80% 30%, rgba(13,148,136,0.12), transparent 0 26%), radial-gradient(circle at 50% 80%, rgba(59,130,246,0.08), transparent 0 30%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <AuroraText className="mb-6">opiniones positivas</AuroraText>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Viajes que se sienten
              <br />
              <VideoText
                className="mt-3 inline-flex text-4xl sm:text-5xl lg:text-6xl"
                videoSrc="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-tropical-beach-43196-large.mp4"
              >
                memorables desde el primer clic
              </VideoText>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/55">
              Reseñas reales, imágenes de viaje y una atmósfera más cálida para
              que la agencia se sienta viva, confiable y con ganas de salir de
              la pantalla.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/4 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-55"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80)",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-tr from-[#050A18] via-[#050A18]/30 to-transparent" />
            <div className="relative rounded-[1.7rem] border border-white/10 bg-[#050A18]/55 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/35">
                    Confianza que se nota
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-white">
                    Marquee Copy Page
                  </h3>
                </div>
                <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  4.9/5
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { value: "+2K", label: "reseñas positivas" },
                  { value: "98%", label: "recomienda el servicio" },
                  { value: "24/7", label: "asesoría y seguimiento" },
                  { value: "60+", label: "destinos activos" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="text-2xl font-black text-white">
                      {item.value}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative mt-16 overflow-hidden">
          <Marquee pauseOnHover className="[--duration:40s] py-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover className="[--duration:40s] py-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={`rev-${testimonial.name}`}
                testimonial={testimonial}
              />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-linear-to-r from-[#050A18] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-linear-to-l from-[#050A18] to-transparent" />
        </div>
      </div>
    </section>
  );
}
