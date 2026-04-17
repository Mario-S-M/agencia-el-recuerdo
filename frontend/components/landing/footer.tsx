"use client"

import { motion } from "motion/react"

const services = [
  { label: "Paquetes al Mar", icon: "🏖️" },
  { label: "Vuelos", icon: "✈️" },
  { label: "Excursiones", icon: "🧭" },
  { label: "Transporte", icon: "🚌" },
  { label: "Cruceros", icon: "🛳️" },
  { label: "Bodas y XV Años", icon: "💍" },
]

const quickLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Destinos", href: "#destinos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Cotizar", href: "#cotizar" },
]

const destinations = [
  "Cancún", "Los Cabos", "Puerto Vallarta",
  "París", "Roma", "Barcelona",
  "Bali", "New York", "Punta Cana",
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#020608]">
      {/* Top gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      {/* Background glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(ellipse, #F97316 0%, #0D9488 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* ── Newsletter CTA ─────────────────────────────── */}
      <div className="relative border-b border-white/[0.04] py-14">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl px-8 py-10 lg:flex lg:items-center lg:justify-between lg:px-14"
            style={{
              background:
                "linear-gradient(120deg, rgba(249,115,22,0.12) 0%, rgba(13,148,136,0.08) 60%, rgba(2,6,8,0.6) 100%)",
              border: "1px solid rgba(249,115,22,0.12)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Decorative ring */}
            <div
              className="pointer-events-none absolute right-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 translate-x-1/2 rounded-full opacity-30"
              style={{
                background: "radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 65%)",
              }}
            />

            <div className="relative mb-8 lg:mb-0">
              <p className="mb-1 text-xs font-semibold tracking-[0.2em] text-orange-400/70 uppercase">
                Próximas escapadas
              </p>
              <h3 className="text-2xl font-black text-white lg:text-3xl">
                No te pierdas las mejores ofertas
              </h3>
              <p className="mt-1 text-sm text-white/35">
                Paquetes exclusivos, destinos nuevos y promociones especiales.
              </p>
            </div>

            <div className="relative flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-orange-500/40 focus:bg-white/8 sm:w-72"
              />
              <button className="group relative flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30">
                <span className="relative z-10">Suscribirme →</span>
                <span className="absolute inset-0 -translate-x-full skew-x-12 bg-white/10 transition-transform duration-500 group-hover:translate-x-full" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main footer grid ───────────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 mb-16">

          {/* Brand — 4 cols */}
          <div className="lg:col-span-4">
            <div className="mb-6 flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl font-black text-white text-sm"
                style={{
                  background: "linear-gradient(135deg, #F97316, #0D9488)",
                  boxShadow: "0 4px 20px rgba(249,115,22,0.3)",
                }}
              >
                ER
              </div>
              <div>
                <span className="block text-lg font-black leading-tight text-white">
                  El Recuerdo
                </span>
                <span className="text-[9px] font-semibold tracking-[0.22em] text-orange-400/50 uppercase">
                  Agencia de Viajes
                </span>
              </div>
            </div>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/30">
              Más de 14 años convirtiendo sueños en destinos y destinos en
              recuerdos que duran toda la vida.
            </p>

            {/* Popular destinations pills */}
            <div className="mb-8 flex flex-wrap gap-2">
              {destinations.slice(0, 6).map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs text-white/35"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              {[
                { icon: "f", label: "Facebook", color: "#1877F2" },
                { icon: "ig", label: "Instagram", color: "#E1306C" },
                { icon: "yt", label: "YouTube", color: "#FF0000" },
                { icon: "wa", label: "WhatsApp", color: "#25D366" },
              ].map((social) => (
                <motion.button
                  key={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/8 bg-white/[0.04] text-[10px] font-bold text-white/40 transition-all duration-200 hover:border-white/20 hover:text-white/80"
                >
                  {social.icon}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Spacer — 1 col */}
          <div className="hidden lg:col-span-1 lg:block" />

          {/* Services — 3 cols */}
          <div className="lg:col-span-3">
            <h4 className="mb-6 text-xs font-semibold tracking-[0.22em] text-white/60 uppercase">
              Servicios
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href="#servicios"
                    className="group flex items-center gap-2.5 text-sm text-white/30 transition-colors duration-200 hover:text-orange-400"
                  >
                    <span className="text-base opacity-60 transition-opacity group-hover:opacity-100">
                      {service.icon}
                    </span>
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation — 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-xs font-semibold tracking-[0.22em] text-white/60 uppercase">
              Navegación
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/30 transition-colors duration-200 hover:text-white/80"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-xs font-semibold tracking-[0.22em] text-white/60 uppercase">
              Contacto
            </h4>
            <ul className="space-y-4">
              {[
                { icon: "📱", label: "WhatsApp", value: "+52 (55) 0000-0000", href: "https://wa.me/1234567890" },
                { icon: "📧", label: "Email", value: "hola@elrecuerdo.mx", href: "mailto:hola@elrecuerdo.mx" },
                { icon: "📍", label: "Ubicación", value: "Ciudad de México", href: "#" },
                { icon: "🕐", label: "Horario", value: "Lun–Sáb 9–19 h", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-start gap-3 transition-colors duration-200 hover:text-orange-400"
                  >
                    <span className="mt-0.5 text-sm opacity-60 transition-opacity group-hover:opacity-100">
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-[10px] font-medium tracking-wider text-white/20 uppercase">
                        {item.label}
                      </div>
                      <div className="text-sm text-white/45 group-hover:text-orange-400/80 transition-colors duration-200">
                        {item.value}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────── */}
        <div className="relative border-t border-white/[0.04] pt-8">
          {/* Thin gradient line above divider */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-white/20">
              © {new Date().getFullYear()} El Recuerdo Agencia de Viajes.
              Todos los derechos reservados.
            </p>

            <div className="flex items-center gap-1 text-xs text-white/15">
              <span>Hecho con</span>
              <span className="text-orange-400/60">♥</span>
              <span>en México</span>
            </div>

            <div className="flex items-center gap-5">
              {["Privacidad", "Términos", "Cookies"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-white/20 transition-colors duration-200 hover:text-white/50"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
