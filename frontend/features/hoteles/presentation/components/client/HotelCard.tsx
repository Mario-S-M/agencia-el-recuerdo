'use client';

import { Bed, Calendar, ImageIcon, MapPin, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Hotel } from '../../../domain/entities/hotel.types';

interface HotelCardProps {
  hotel: Hotel;
  onManage: (hotel: Hotel) => void;
  onEdit: (hotel: Hotel) => void;
  onDelete: (hotel: Hotel) => void;
}

export function HotelCard({ hotel, onManage, onEdit, onDelete }: HotelCardProps): React.ReactElement {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col gap-3 hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{hotel.nombre}</h3>
          {hotel.direccion && <p className="text-xs text-white/40 mt-0.5 truncate">{hotel.direccion}</p>}
        </div>
        <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full ${hotel.activo ? 'bg-green-500/15 text-green-400' : 'bg-white/10 text-white/40'}`}>
          {hotel.activo ? 'Activo' : 'Inactivo'}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
        <span className="flex items-center gap-1">
          <Bed className="h-3.5 w-3.5" /> {hotel.tiposHabitacion?.length ?? 0} tipo{(hotel.tiposHabitacion?.length ?? 0) !== 1 ? 's' : ''}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" /> {hotel.periodos?.length ?? 0} periodo{(hotel.periodos?.length ?? 0) !== 1 ? 's' : ''}
        </span>
        {hotel.fotos?.length > 0 && (
          <span className="flex items-center gap-1">
            <ImageIcon className="h-3.5 w-3.5" /> {hotel.fotos.length} foto{hotel.fotos.length !== 1 ? 's' : ''}
          </span>
        )}
        {hotel.googleMapsUrl && (
          <a
            href={hotel.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <MapPin className="h-3.5 w-3.5" /> Maps
          </a>
        )}
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-white/10">
        <Button size="sm" variant="ghost" onClick={() => onManage(hotel)}
          className="flex-1 text-white/60 hover:text-white hover:bg-white/10 text-xs h-7">
          Gestionar
        </Button>
        <button onClick={() => onEdit(hotel)} className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-md">
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button onClick={() => onDelete(hotel)} className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-md">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
