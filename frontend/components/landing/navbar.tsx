"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Destinos", href: "#destinos" },
  { label: "Calendario", href: "/calendario" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#050A18]/90 backdrop-blur-2xl border-b border-white/5 py-3 shadow-xl shadow-black/20"
          : "py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-orange-500/30 shadow-lg shadow-orange-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-teal-600 opacity-90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xs font-black tracking-tight">ER</span>
            </div>
          </div>
          <div className="leading-tight">
            <span className="text-white font-bold text-lg tracking-tight block">El Recuerdo</span>
            <span className="text-orange-400/60 text-[9px] tracking-[0.2em] uppercase block">Agencia de Viajes</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/50 hover:text-white text-sm font-medium transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="text-white/50 hover:text-white/90 text-sm font-medium px-4 py-2 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            Iniciar sesión
          </a>
          <a
            href="#cotizar"
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            ✈️ Cotizar Viaje
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/80 hover:text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <div className="w-6 space-y-1.5">
            <span
              className={cn(
                "block h-0.5 bg-current transition-all duration-300 origin-center",
                menuOpen ? "rotate-45 translate-y-2" : ""
              )}
            />
            <span
              className={cn(
                "block h-0.5 bg-current transition-all duration-300",
                menuOpen ? "opacity-0 scale-x-0" : ""
              )}
            />
            <span
              className={cn(
                "block h-0.5 bg-current transition-all duration-300 origin-center",
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#050A18]/98 backdrop-blur-2xl border-t border-white/5"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-white/70 hover:text-white text-lg font-medium py-1 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/login"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="text-white/60 hover:text-white font-medium px-6 py-3 rounded-full border border-white/10 text-center transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Iniciar sesión
              </motion.a>
              <motion.a
                href="#cotizar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-6 py-3 rounded-full text-center mt-2"
                onClick={() => setMenuOpen(false)}
              >
                ✈️ Cotizar Viaje
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
