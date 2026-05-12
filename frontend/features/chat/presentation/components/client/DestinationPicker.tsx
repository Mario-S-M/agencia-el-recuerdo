'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import type { Destination } from '../../../domain/entities/chat.types';

const DESTINATIONS: Destination[] = [
  { name: 'Cancún', country: 'México', region: 'Caribe', icon: '🏖️' },
  { name: 'Ixtapa', country: 'México', region: 'Pacífico', icon: '🌴' },
  { name: 'Puerto Vallarta', country: 'México', region: 'Pacífico', icon: '⛱️' },
  { name: 'Riviera Maya', country: 'México', region: 'Caribe', icon: '🌿' },
  { name: 'Los Cabos', country: 'México', region: 'Pacífico', icon: '🌅' },
  { name: 'Emporio Ixtapa', country: 'México', region: 'Hotel', icon: '🏨' },
  { name: 'Gran Azul', country: 'México', region: 'Hotel', icon: '🛎️' },
  { name: 'París', country: 'Francia', region: 'Europa', icon: '🗼' },
  { name: 'Francia Clásica', country: 'Francia', region: 'Europa', icon: '🇫🇷' },
  { name: 'Roma', country: 'Italia', region: 'Europa', icon: '🏛️' },
  { name: 'Madrid', country: 'España', region: 'Europa', icon: '🇪🇸' },
  { name: 'Barcelona', country: 'España', region: 'Europa', icon: '🌇' },
  { name: 'Londres', country: 'Reino Unido', region: 'Europa', icon: '🎡' },
  { name: 'Santorini', country: 'Grecia', region: 'Europa', icon: '💙' },
  { name: 'Europa Esencial', country: 'Europa', region: 'Tour', icon: '🚄' },
  { name: 'Caribe', country: 'Cruceros', region: 'Mar Caribe', icon: '🚢' },
  { name: 'Otro destino', country: '', region: '', icon: '✨' },
];

interface DestinationPickerProps {
  selected: string | null;
  onSelect: (destination: string | null) => void;
}

export function DestinationPicker({ selected, onSelect }: DestinationPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const current = DESTINATIONS.find((d) => d.name === selected);

  function handleSelect(dest: Destination): void {
    onSelect(dest.name === 'Otro destino' ? null : dest.name);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          'w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200',
          'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20',
          'text-white/70 hover:text-white',
        )}
      >
        <span className="text-base">{current?.icon ?? '🗺️'}</span>
        <span className="flex-1 text-left truncate">
          {selected ?? 'Selecciona un destino'}
        </span>
        <span
          className={cn(
            'text-white/40 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        >
          ▾
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute bottom-full mb-2 left-0 right-0 z-50',
              'bg-[#0E1628] border border-white/10 rounded-2xl shadow-2xl',
              'max-h-52 overflow-y-auto',
            )}
          >
            <div className="p-2 grid grid-cols-2 gap-1">
              {DESTINATIONS.map((dest) => (
                <button
                  key={dest.name}
                  type="button"
                  onClick={() => handleSelect(dest)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-left transition-all duration-150',
                    selected === dest.name
                      ? 'bg-orange-500/20 border border-orange-500/30 text-orange-300'
                      : 'hover:bg-white/8 text-white/70 hover:text-white border border-transparent',
                  )}
                >
                  <span>{dest.icon}</span>
                  <span className="truncate">{dest.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
