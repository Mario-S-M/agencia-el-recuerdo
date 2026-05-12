import { AppDataSource } from '../config/database.config';
import { Destino } from '../destinos/entities/destino.entity';
import { Hotel } from '../hoteles/entities/hotel.entity';
import { Paquete } from '../paquetes/entities/paquete.entity';
import { FechaSalida } from '../fechas-salida/entities/fecha-salida.entity';
import {
  Servicio,
  TipoServicio,
  CategoriaServicio,
} from '../servicios/entities/servicio.entity';

const DESTINOS_SEED: Array<{ nombre: string; pais: string; descripcion: string; destacado: boolean; activo: boolean }> = [
  { nombre: 'Cancún', pais: 'México', descripcion: 'Paraíso caribeño con playas de arena blanca y mar turquesa.', destacado: true, activo: true },
  { nombre: 'Riviera Maya', pais: 'México', descripcion: 'Costera repleta de resorts, cenotes y ruinas mayas.', destacado: true, activo: true },
  { nombre: 'Ixtapa', pais: 'México', descripcion: 'Destino de playa en la costa del Pacífico con bahía en forma de media luna.', destacado: true, activo: true },
  { nombre: 'Puerto Vallarta', pais: 'México', descripcion: 'Ciudad costera con playas doradas, malecón y vida nocturna.', destacado: true, activo: true },
  { nombre: 'Los Cabos', pais: 'México', descripcion: 'Extremo sur de Baja California con el icónico Arco y avistamiento de ballenas.', destacado: true, activo: true },
  { nombre: 'Mazatlán', pais: 'México', descripcion: 'Puerto con playas extensas, centro histórico y el famoso Carnaval.', destacado: false, activo: true },
  { nombre: 'Huatulco', pais: 'México', descripcion: 'Bahías vírgenes en Oaxaca con ecoturismo y playas tranquilas.', destacado: false, activo: true },
  { nombre: 'Cozumel', pais: 'México', descripcion: 'Isla con los mejores arrecifes del Caribe para buceo y snorkel.', destacado: true, activo: true },
  { nombre: 'Acapulco', pais: 'México', descripcion: 'Clásico destino de playa con la Quebrada y bahía espectacular.', destacado: false, activo: true },
  { nombre: 'Manzanillo', pais: 'México', descripcion: 'Puerto de gran actividad pesquera y playas de arena dorada.', destacado: false, activo: true },
];

const HOTELES_SEED: Array<{ nombre: string; destinoNombre: string }> = [
  // Cancún
  { nombre: 'Grand Oasis Cancún', destinoNombre: 'Cancún' },
  { nombre: 'Hotel Riu Cancún', destinoNombre: 'Cancún' },
  { nombre: 'Krystal Cancún', destinoNombre: 'Cancún' },
  // Riviera Maya
  { nombre: 'Grand Palladium Riviera Maya', destinoNombre: 'Riviera Maya' },
  { nombre: 'Hotel Xcaret México', destinoNombre: 'Riviera Maya' },
  { nombre: 'Barceló Maya Palace', destinoNombre: 'Riviera Maya' },
  // Ixtapa
  { nombre: 'Hotel Emporio Ixtapa', destinoNombre: 'Ixtapa' },
  { nombre: 'Azul Ixtapa', destinoNombre: 'Ixtapa' },
  { nombre: 'Brisas Ixtapa', destinoNombre: 'Ixtapa' },
  // Puerto Vallarta
  { nombre: 'Hotel Mío Vallarta', destinoNombre: 'Puerto Vallarta' },
  { nombre: 'Marriott Puerto Vallarta', destinoNombre: 'Puerto Vallarta' },
  // Los Cabos
  { nombre: 'Hotel Riu Los Cabos', destinoNombre: 'Los Cabos' },
  { nombre: 'Marquis Los Cabos', destinoNombre: 'Los Cabos' },
  // Mazatlán
  { nombre: 'Hotel Riu Mazatlán', destinoNombre: 'Mazatlán' },
  { nombre: 'El Cid Resort Mazatlán', destinoNombre: 'Mazatlán' },
  // Huatulco
  { nombre: 'Quinta Real Huatulco', destinoNombre: 'Huatulco' },
  // Cozumel
  { nombre: 'Hotel Cozumel & Resort', destinoNombre: 'Cozumel' },
  // Acapulco
  { nombre: 'Hotel Acapulco Diamante', destinoNombre: 'Acapulco' },
  // Manzanillo
  { nombre: 'Hotel Sierra Manzanillo', destinoNombre: 'Manzanillo' },
];

const PAQUETES_SEED: Array<{
  nombre: string;
  destinoNombre: string;
  hotelNombre: string;
  servicioNombres: string[];
  descripcion: string;
  destacado: boolean;
  todoIncluido: boolean;
  incluye?: string[];
}> = [
  {
    nombre: 'Escapada Cancún 3 Noches',
    destinoNombre: 'Cancún',
    hotelNombre: 'Grand Oasis Cancún',
    servicioNombres: ['Vuelo redondo', 'Todo Incluido', 'Excursiones'],
    descripcion: 'Disfruta de 3 noches en Cancún con vuelo redondo y todo incluido.',
    destacado: true,
    todoIncluido: true,
    incluye: ['Vuelo redondo', 'Hospedaje 3 noches', 'Alimentos y bebidas', 'Excursión a Chichén Itzá'],
  },
  {
    nombre: 'Luna de Miel Riviera Maya 5 Noches',
    destinoNombre: 'Riviera Maya',
    hotelNombre: 'Hotel Xcaret México',
    servicioNombres: ['Vuelo redondo', 'Todo Incluido', 'Excursiones', 'Bodas y XV'],
    descripcion: 'Paquete romántico con acceso ilimitado a parques Xcaret y Xel-Há.',
    destacado: true,
    todoIncluido: true,
    incluye: ['Vuelo redondo', 'Hospedaje 5 noches', 'Acceso a parques Xcaret', 'Cena romántica', 'Tour en catamarán'],
  },
  {
    nombre: 'Ixtapa 4 Noches Todo Incluido',
    destinoNombre: 'Ixtapa',
    hotelNombre: 'Hotel Emporio Ixtapa',
    servicioNombres: ['Vuelo redondo', 'Transporte en Autobús', 'Todo Incluido'],
    descripcion: 'Relájate en Ixtapa con vuelo, traslados y hospedaje todo incluido.',
    destacado: true,
    todoIncluido: true,
    incluye: ['Vuelo redondo', 'Traslado aeropuerto-hotel', 'Hospedaje 4 noches', 'Alimentos y bebidas'],
  },
  {
    nombre: 'Aventura en Puerto Vallarta 3 Noches',
    destinoNombre: 'Puerto Vallarta',
    hotelNombre: 'Hotel Mío Vallarta',
    servicioNombres: ['Vuelo redondo', 'Transporte en Van', 'Media Pensión', 'Excursiones'],
    descripcion: 'Explora Puerto Vallarta con media pensión y tour de snorkel incluido.',
    destacado: false,
    todoIncluido: false,
    incluye: ['Vuelo redondo', 'Traslado aeropuerto', 'Hospedaje 3 noches', 'Desayuno y comida', 'Tour de snorkel en Los Arcos'],
  },
  {
    nombre: 'Los Cabos 5 Noches Premium',
    destinoNombre: 'Los Cabos',
    hotelNombre: 'Marquis Los Cabos',
    servicioNombres: ['Vuelo redondo', 'Todo Incluido', 'Excursiones', 'Paquetes al Mar'],
    descripcion: 'Vive el lujo en Los Cabos con tour en barco al Arco y avistamiento de ballenas.',
    destacado: true,
    todoIncluido: true,
    incluye: ['Vuelo redondo', 'Hospedaje 5 noches', 'Alimentos y bebidas premium', 'Tour al Arco de Cabo San Lucas', 'Avistamiento de ballenas'],
  },
  {
    nombre: 'Mazatlán Familiar 4 Noches',
    destinoNombre: 'Mazatlán',
    hotelNombre: 'El Cid Resort Mazatlán',
    servicioNombres: ['Vuelo redondo', 'Transporte en Autobús', 'Todo Incluido'],
    descripcion: 'Paquete familiar perfecto para disfrutar Mazatlán con los niños.',
    destacado: false,
    todoIncluido: true,
    incluye: ['Vuelo redondo', 'Traslado aeropuerto', 'Hospedaje 4 noches', 'Alimentos y bebidas', 'Club de niños'],
  },
  {
    nombre: 'Huatulco Ecológico 3 Noches',
    destinoNombre: 'Huatulco',
    hotelNombre: 'Quinta Real Huatulco',
    servicioNombres: ['Vuelo redondo', 'Transporte en Van', 'Solo Desayuno', 'Excursiones'],
    descripcion: 'Conecta con la naturaleza en las bahías vírgenes de Huatulco.',
    destacado: false,
    todoIncluido: false,
    incluye: ['Vuelo redondo', 'Traslado aeropuerto', 'Hospedaje 3 noches con desayuno', 'Tour de bahías en barco'],
  },
  {
    nombre: 'Cozumel Buceo 4 Noches',
    destinoNombre: 'Cozumel',
    hotelNombre: 'Hotel Cozumel & Resort',
    servicioNombres: ['Vuelo redondo', 'Transporte Marítimo', 'Media Pensión', 'Paquetes al Mar'],
    descripcion: 'Sumérgete en los mejores arrecifes del Caribe con equipo de buceo incluido.',
    destacado: true,
    todoIncluido: false,
    incluye: ['Vuelo redondo', 'Ferry Cancún-Cozumel', 'Hospedaje 4 noches con media pensión', '2 inmersiones de buceo', 'Equipo completo'],
  },
  {
    nombre: 'Acapulco Clásico 2 Noches',
    destinoNombre: 'Acapulco',
    hotelNombre: 'Hotel Acapulco Diamante',
    servicioNombres: ['Vuelo redondo', 'Transporte en Autobús', 'Todo Incluido'],
    descripcion: 'Revive la magia de Acapulco con vista a la bahía y espectáculo de la Quebrada.',
    destacado: false,
    todoIncluido: true,
    incluye: ['Vuelo redondo', 'Traslado aeropuerto', 'Hospedaje 2 noches', 'Alimentos y bebidas', 'Espectáculo La Quebrada'],
  },
  {
    nombre: 'Manzanillo Pesca Deportiva 3 Noches',
    destinoNombre: 'Manzanillo',
    hotelNombre: 'Hotel Sierra Manzanillo',
    servicioNombres: ['Vuelo redondo', 'Transporte en Van', 'Solo Desayuno', 'Paquetes al Mar'],
    descripcion: 'El mejor destino de pesca deportiva con tour de pesca incluido.',
    destacado: false,
    todoIncluido: false,
    incluye: ['Vuelo redondo', 'Traslado aeropuerto', 'Hospedaje 3 noches con desayuno', 'Tour de pesca deportiva', 'Cena de mariscos'],
  },
  {
    nombre: 'Riviera Maya 7 Noches Todo Incluido',
    destinoNombre: 'Riviera Maya',
    hotelNombre: 'Barceló Maya Palace',
    servicioNombres: ['Vuelo redondo', 'Transporte en Autobús', 'Todo Incluido', 'Excursiones'],
    descripcion: 'Una semana completa en la Riviera Maya con recorrido por Tulum y Cobá.',
    destacado: true,
    todoIncluido: true,
    incluye: ['Vuelo redondo', 'Traslado aeropuerto', 'Hospedaje 7 noches', 'Alimentos y bebidas ilimitados', 'Tour Tulum y Cobá', 'Nado en cenote'],
  },
  {
    nombre: 'Puerto Vallarta Golf 4 Noches',
    destinoNombre: 'Puerto Vallarta',
    hotelNombre: 'Marriott Puerto Vallarta',
    servicioNombres: ['Vuelo redondo', 'Transporte en Van', 'Solo Desayuno'],
    descripcion: 'Disfruta del golf en campos de clase mundial frente al mar.',
    destacado: false,
    todoIncluido: false,
    incluye: ['Vuelo redondo', 'Traslado aeropuerto', 'Hospedaje 4 noches con desayuno', '2 rondas de golf en campo Vista Vallarta'],
  },
  {
    nombre: 'Ixtapa 6 Noches con Crucero',
    destinoNombre: 'Ixtapa',
    hotelNombre: 'Brisas Ixtapa',
    servicioNombres: ['Vuelo redondo', 'Transporte en Autobús', 'Todo Incluido', 'Crucero'],
    descripcion: 'Combina hospedaje en Ixtapa con un crucero por la costa del Pacífico.',
    destacado: true,
    todoIncluido: true,
    incluye: ['Vuelo redondo', 'Traslado aeropuerto', 'Hospedaje 3 noches', 'Crucero 3 noches', 'Alimentos y bebidas'],
  },
  {
    nombre: 'Cancún Gastro 4 Noches',
    destinoNombre: 'Cancún',
    hotelNombre: 'Hotel Riu Cancún',
    servicioNombres: ['Vuelo redondo', 'Todo Incluido'],
    descripcion: 'Experiencia gastronómica con cenas en restaurantes exclusivos de Cancún.',
    destacado: false,
    todoIncluido: true,
    incluye: ['Vuelo redondo', 'Hospedaje 4 noches', 'Alimentos y bebidas premium', 'Cena en Puerto Mágico', 'Tour gastronómico'],
  },
];

const FECHAS_SALIDA_SEED: Array<{
  paqueteNombre: string;
  fechaSalida: string;
  fechaRegreso: string | null;
  cupoMaximo: number;
  cupoMinimo: number;
  cupoDisponible: number;
}> = [
  // ── Mayo 2026 ──
  { paqueteNombre: 'Escapada Cancún 3 Noches', fechaSalida: '2026-05-02', fechaRegreso: '2026-05-05', cupoMaximo: 30, cupoMinimo: 5, cupoDisponible: 15 },
  { paqueteNombre: 'Ixtapa 4 Noches Todo Incluido', fechaSalida: '2026-05-05', fechaRegreso: '2026-05-09', cupoMaximo: 25, cupoMinimo: 4, cupoDisponible: 8 },
  { paqueteNombre: 'Aventura en Puerto Vallarta 3 Noches', fechaSalida: '2026-05-10', fechaRegreso: '2026-05-13', cupoMaximo: 20, cupoMinimo: 3, cupoDisponible: 3 },
  { paqueteNombre: 'Los Cabos 5 Noches Premium', fechaSalida: '2026-05-12', fechaRegreso: '2026-05-17', cupoMaximo: 15, cupoMinimo: 3, cupoDisponible: 2 },
  { paqueteNombre: 'Mazatlán Familiar 4 Noches', fechaSalida: '2026-05-15', fechaRegreso: '2026-05-19', cupoMaximo: 30, cupoMinimo: 5, cupoDisponible: 20 },
  { paqueteNombre: 'Cancún Gastro 4 Noches', fechaSalida: '2026-05-15', fechaRegreso: '2026-05-19', cupoMaximo: 20, cupoMinimo: 4, cupoDisponible: 10 },
  { paqueteNombre: 'Huatulco Ecológico 3 Noches', fechaSalida: '2026-05-18', fechaRegreso: '2026-05-21', cupoMaximo: 15, cupoMinimo: 3, cupoDisponible: 5 },
  { paqueteNombre: 'Cozumel Buceo 4 Noches', fechaSalida: '2026-05-20', fechaRegreso: '2026-05-24', cupoMaximo: 12, cupoMinimo: 3, cupoDisponible: 0 },
  { paqueteNombre: 'Riviera Maya 7 Noches Todo Incluido', fechaSalida: '2026-05-22', fechaRegreso: '2026-05-29', cupoMaximo: 25, cupoMinimo: 5, cupoDisponible: 12 },
  { paqueteNombre: 'Ixtapa 6 Noches con Crucero', fechaSalida: '2026-05-25', fechaRegreso: '2026-05-31', cupoMaximo: 30, cupoMinimo: 6, cupoDisponible: 18 },
  { paqueteNombre: 'Acapulco Clásico 2 Noches', fechaSalida: '2026-05-28', fechaRegreso: '2026-05-30', cupoMaximo: 20, cupoMinimo: 3, cupoDisponible: 4 },
  { paqueteNombre: 'Manzanillo Pesca Deportiva 3 Noches', fechaSalida: '2026-05-30', fechaRegreso: '2026-06-02', cupoMaximo: 15, cupoMinimo: 3, cupoDisponible: 6 },
  // ── Junio 2026 ──
  { paqueteNombre: 'Escapada Cancún 3 Noches', fechaSalida: '2026-06-01', fechaRegreso: '2026-06-04', cupoMaximo: 30, cupoMinimo: 5, cupoDisponible: 25 },
  { paqueteNombre: 'Luna de Miel Riviera Maya 5 Noches', fechaSalida: '2026-06-05', fechaRegreso: '2026-06-10', cupoMaximo: 20, cupoMinimo: 4, cupoDisponible: 10 },
  { paqueteNombre: 'Cozumel Buceo 4 Noches', fechaSalida: '2026-06-05', fechaRegreso: '2026-06-09', cupoMaximo: 12, cupoMinimo: 3, cupoDisponible: 8 },
  { paqueteNombre: 'Puerto Vallarta Golf 4 Noches', fechaSalida: '2026-06-08', fechaRegreso: '2026-06-12', cupoMaximo: 18, cupoMinimo: 3, cupoDisponible: 7 },
  { paqueteNombre: 'Los Cabos 5 Noches Premium', fechaSalida: '2026-06-12', fechaRegreso: '2026-06-17', cupoMaximo: 15, cupoMinimo: 3, cupoDisponible: 3 },
  { paqueteNombre: 'Mazatlán Familiar 4 Noches', fechaSalida: '2026-06-15', fechaRegreso: '2026-06-19', cupoMaximo: 30, cupoMinimo: 5, cupoDisponible: 15 },
  { paqueteNombre: 'Ixtapa 4 Noches Todo Incluido', fechaSalida: '2026-06-19', fechaRegreso: '2026-06-23', cupoMaximo: 25, cupoMinimo: 4, cupoDisponible: 20 },
  { paqueteNombre: 'Cancún Gastro 4 Noches', fechaSalida: '2026-06-22', fechaRegreso: '2026-06-26', cupoMaximo: 20, cupoMinimo: 4, cupoDisponible: 5 },
  { paqueteNombre: 'Aventura en Puerto Vallarta 3 Noches', fechaSalida: '2026-06-26', fechaRegreso: '2026-06-29', cupoMaximo: 20, cupoMinimo: 3, cupoDisponible: 12 },
  { paqueteNombre: 'Huatulco Ecológico 3 Noches', fechaSalida: '2026-06-29', fechaRegreso: '2026-07-02', cupoMaximo: 15, cupoMinimo: 3, cupoDisponible: 2 },
  // ── Julio 2026 ──
  { paqueteNombre: 'Riviera Maya 7 Noches Todo Incluido', fechaSalida: '2026-07-03', fechaRegreso: '2026-07-10', cupoMaximo: 25, cupoMinimo: 5, cupoDisponible: 20 },
  { paqueteNombre: 'Escapada Cancún 3 Noches', fechaSalida: '2026-07-06', fechaRegreso: '2026-07-09', cupoMaximo: 30, cupoMinimo: 5, cupoDisponible: 28 },
  { paqueteNombre: 'Ixtapa 6 Noches con Crucero', fechaSalida: '2026-07-10', fechaRegreso: '2026-07-16', cupoMaximo: 30, cupoMinimo: 6, cupoDisponible: 15 },
  { paqueteNombre: 'Los Cabos 5 Noches Premium', fechaSalida: '2026-07-13', fechaRegreso: '2026-07-18', cupoMaximo: 15, cupoMinimo: 3, cupoDisponible: 10 },
  { paqueteNombre: 'Acapulco Clásico 2 Noches', fechaSalida: '2026-07-17', fechaRegreso: '2026-07-19', cupoMaximo: 20, cupoMinimo: 3, cupoDisponible: 0 },
  { paqueteNombre: 'Manzanillo Pesca Deportiva 3 Noches', fechaSalida: '2026-07-17', fechaRegreso: '2026-07-20', cupoMaximo: 15, cupoMinimo: 3, cupoDisponible: 8 },
  { paqueteNombre: 'Luna de Miel Riviera Maya 5 Noches', fechaSalida: '2026-07-20', fechaRegreso: '2026-07-25', cupoMaximo: 20, cupoMinimo: 4, cupoDisponible: 5 },
  { paqueteNombre: 'Cozumel Buceo 4 Noches', fechaSalida: '2026-07-24', fechaRegreso: '2026-07-28', cupoMaximo: 12, cupoMinimo: 3, cupoDisponible: 10 },
  { paqueteNombre: 'Puerto Vallarta Golf 4 Noches', fechaSalida: '2026-07-27', fechaRegreso: '2026-07-31', cupoMaximo: 18, cupoMinimo: 3, cupoDisponible: 4 },
  { paqueteNombre: 'Mazatlán Familiar 4 Noches', fechaSalida: '2026-07-31', fechaRegreso: '2026-08-04', cupoMaximo: 30, cupoMinimo: 5, cupoDisponible: 25 },
  // ── Agosto 2026 ──
  { paqueteNombre: 'Cancún Gastro 4 Noches', fechaSalida: '2026-08-03', fechaRegreso: '2026-08-07', cupoMaximo: 20, cupoMinimo: 4, cupoDisponible: 15 },
  { paqueteNombre: 'Escapada Cancún 3 Noches', fechaSalida: '2026-08-07', fechaRegreso: '2026-08-10', cupoMaximo: 30, cupoMinimo: 5, cupoDisponible: 20 },
  { paqueteNombre: 'Ixtapa 4 Noches Todo Incluido', fechaSalida: '2026-08-10', fechaRegreso: '2026-08-14', cupoMaximo: 25, cupoMinimo: 4, cupoDisponible: 10 },
  { paqueteNombre: 'Aventura en Puerto Vallarta 3 Noches', fechaSalida: '2026-08-14', fechaRegreso: '2026-08-17', cupoMaximo: 20, cupoMinimo: 3, cupoDisponible: 0 },
  { paqueteNombre: 'Huatulco Ecológico 3 Noches', fechaSalida: '2026-08-17', fechaRegreso: '2026-08-20', cupoMaximo: 15, cupoMinimo: 3, cupoDisponible: 10 },
  { paqueteNombre: 'Riviera Maya 7 Noches Todo Incluido', fechaSalida: '2026-08-21', fechaRegreso: '2026-08-28', cupoMaximo: 25, cupoMinimo: 5, cupoDisponible: 18 },
  { paqueteNombre: 'Los Cabos 5 Noches Premium', fechaSalida: '2026-08-24', fechaRegreso: '2026-08-29', cupoMaximo: 15, cupoMinimo: 3, cupoDisponible: 7 },
  { paqueteNombre: 'Manzanillo Pesca Deportiva 3 Noches', fechaSalida: '2026-08-28', fechaRegreso: '2026-08-31', cupoMaximo: 15, cupoMinimo: 3, cupoDisponible: 3 },
  { paqueteNombre: 'Cozumel Buceo 4 Noches', fechaSalida: '2026-08-31', fechaRegreso: '2026-09-04', cupoMaximo: 12, cupoMinimo: 3, cupoDisponible: 11 },
  // ── Septiembre 2026 ──
  { paqueteNombre: 'Escapada Cancún 3 Noches', fechaSalida: '2026-09-04', fechaRegreso: '2026-09-07', cupoMaximo: 30, cupoMinimo: 5, cupoDisponible: 18 },
  { paqueteNombre: 'Ixtapa 6 Noches con Crucero', fechaSalida: '2026-09-07', fechaRegreso: '2026-09-13', cupoMaximo: 30, cupoMinimo: 6, cupoDisponible: 25 },
  { paqueteNombre: 'Puerto Vallarta Golf 4 Noches', fechaSalida: '2026-09-11', fechaRegreso: '2026-09-15', cupoMaximo: 18, cupoMinimo: 3, cupoDisponible: 10 },
  { paqueteNombre: 'Acapulco Clásico 2 Noches', fechaSalida: '2026-09-14', fechaRegreso: '2026-09-16', cupoMaximo: 20, cupoMinimo: 3, cupoDisponible: 8 },
  { paqueteNombre: 'Mazatlán Familiar 4 Noches', fechaSalida: '2026-09-18', fechaRegreso: '2026-09-22', cupoMaximo: 30, cupoMinimo: 5, cupoDisponible: 10 },
];

export async function runSeed(): Promise<void> {
  const destinoRepo = AppDataSource.getRepository(Destino);
  const hotelRepo = AppDataSource.getRepository(Hotel);
  const servicioRepo = AppDataSource.getRepository(Servicio);
  const paqueteRepo = AppDataSource.getRepository(Paquete);

  const destinoMap = new Map<string, Destino>();
  for (const data of DESTINOS_SEED) {
    let destino = await destinoRepo.findOne({ where: { nombre: data.nombre } });
    if (!destino) {
      destino = await destinoRepo.save(destinoRepo.create(data));
      console.log(`Seed: Destino "${data.nombre}" creado`);
    }
    destinoMap.set(data.nombre, destino);
  }

  const hotelMap = new Map<string, Hotel>();
  for (const data of HOTELES_SEED) {
    let hotel = await hotelRepo.findOne({ where: { nombre: data.nombre } });
    if (!hotel) {
      const destino = destinoMap.get(data.destinoNombre);
      hotel = await hotelRepo.save(hotelRepo.create({
        nombre: data.nombre,
        activo: true,
        destinoId: destino?.id ?? null,
      }));
      console.log(`Seed: Hotel "${data.nombre}" creado`);
    }
    hotelMap.set(data.nombre, hotel);
  }

  const SERVICIOS_SEED: Array<{
    nombre: string;
    tipo: TipoServicio;
    categoria: CategoriaServicio;
    icono: string;
  }> = [
    { nombre: 'Vuelo redondo', tipo: TipoServicio.VUELO, categoria: CategoriaServicio.TRANSPORTE, icono: '✈️' },
    { nombre: 'Transporte en Van', tipo: TipoServicio.TRANSPORTE_VAN, categoria: CategoriaServicio.TRANSPORTE, icono: '🚐' },
    { nombre: 'Transporte en Autobús', tipo: TipoServicio.TRANSPORTE_AUTOBUS, categoria: CategoriaServicio.TRANSPORTE, icono: '🚌' },
    { nombre: 'Transporte Marítimo', tipo: TipoServicio.TRANSPORTE_MARITIMO, categoria: CategoriaServicio.TRANSPORTE, icono: '⛴️' },
    { nombre: 'Transporte Aéreo', tipo: TipoServicio.TRANSPORTE_AEREO, categoria: CategoriaServicio.TRANSPORTE, icono: '🛩️' },
    { nombre: 'Todo Incluido', tipo: TipoServicio.TODO_INCLUIDO, categoria: CategoriaServicio.ALIMENTACION, icono: '🍽️' },
    { nombre: 'Solo Almuerzo', tipo: TipoServicio.SOLO_ALUERZO, categoria: CategoriaServicio.ALIMENTACION, icono: '🥗' },
    { nombre: 'Media Pensión', tipo: TipoServicio.MEDIA_PENSION, categoria: CategoriaServicio.ALIMENTACION, icono: '🌅' },
    { nombre: 'Solo Desayuno', tipo: TipoServicio.SOLO_DESAYUNO, categoria: CategoriaServicio.ALIMENTACION, icono: '☕' },
    { nombre: 'Paquetes al Mar', tipo: TipoServicio.PAQUETE_MAR, categoria: CategoriaServicio.GENERAL, icono: '🌊' },
    { nombre: 'Excursiones', tipo: TipoServicio.EXCURSION, categoria: CategoriaServicio.GENERAL, icono: '🏔️' },
    { nombre: 'Crucero', tipo: TipoServicio.CRUCERO, categoria: CategoriaServicio.GENERAL, icono: '🚢' },
    { nombre: 'Bodas y XV', tipo: TipoServicio.BODA_XV, categoria: CategoriaServicio.GENERAL, icono: '💒' },
  ];

  const servicioMap = new Map<string, Servicio>();
  for (const data of SERVICIOS_SEED) {
    let servicio = await servicioRepo.findOne({ where: { nombre: data.nombre } });
    if (!servicio) {
      servicio = await servicioRepo.save(servicioRepo.create(data));
      console.log(`Seed: Servicio "${data.nombre}" creado`);
    }
    servicioMap.set(data.nombre, servicio);
  }

  for (const data of PAQUETES_SEED) {
    const exists = await paqueteRepo.findOne({ where: { nombre: data.nombre } });
    if (exists) continue;

    const destino = destinoMap.get(data.destinoNombre);
    const hotel = hotelMap.get(data.hotelNombre);
    const servicios = data.servicioNombres
      .map((n) => servicioMap.get(n))
      .filter((s): s is Servicio => !!s);

    if (!destino) {
      console.log(`Seed: Destino "${data.destinoNombre}" no encontrado para paquete "${data.nombre}", saltando`);
      continue;
    }

    await paqueteRepo.save(paqueteRepo.create({
      nombre: data.nombre,
      descripcion: data.descripcion,
      destinoId: destino.id,
      hotelId: hotel?.id ?? null,
      servicios,
      incluye: data.incluye ?? [],
      todoIncluido: data.todoIncluido,
      destacado: data.destacado,
      activo: true,
    }));
    console.log(`Seed: Paquete "${data.nombre}" creado`);
  }

  const paqueteMap = new Map<string, Paquete>();
  const allPaquetes = await paqueteRepo.find();
  for (const p of allPaquetes) {
    paqueteMap.set(p.nombre, p);
  }

  const fechaRepo = AppDataSource.getRepository(FechaSalida);
  for (const data of FECHAS_SALIDA_SEED) {
    const paquete = paqueteMap.get(data.paqueteNombre);
    if (!paquete) {
      console.log(`Seed: Paquete "${data.paqueteNombre}" no encontrado para fecha, saltando`);
      continue;
    }

    const exists = await fechaRepo.findOne({
      where: { paqueteId: paquete.id, fechaSalida: new Date(data.fechaSalida) as any },
    });
    if (exists) continue;

    await fechaRepo.save(fechaRepo.create({
      paqueteId: paquete.id,
      fechaSalida: new Date(data.fechaSalida),
      fechaRegreso: data.fechaRegreso ? new Date(data.fechaRegreso) : null,
      cupoMaximo: data.cupoMaximo,
      cupoMinimo: data.cupoMinimo,
      cupoDisponible: data.cupoDisponible,
      activo: true,
    }));
    console.log(`Seed: Fecha "${data.fechaSalida}" - "${data.paqueteNombre}" creada`);
  }

  console.log('Seed completado');
}
