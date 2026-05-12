import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Destino } from '../destinos/entities/destino.entity';
import { Servicio } from '../servicios/entities/servicio.entity';
import { Paquete } from '../paquetes/entities/paquete.entity';
import { FechaSalida } from '../fechas-salida/entities/fecha-salida.entity';
import { OpcionHotel } from '../fechas-salida/entities/opcion-hotel.entity';
import { TransporteAdicional } from '../fechas-salida/entities/transporte-adicional.entity';
import { Hotel } from '../hoteles/entities/hotel.entity';
import { TipoHabitacion } from '../hoteles/entities/tipo-habitacion.entity';
import { PeriodoHotel } from '../hoteles/entities/periodo-hotel.entity';
import { TarifaPeriodo } from '../hoteles/entities/tarifa-periodo.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || process.env.DATABASE_HOST || 'localhost',
  port: parseInt(
    process.env.POSTGRES_PORT || process.env.DATABASE_PORT || '5432',
  ),
  username:
    process.env.POSTGRES_USER || process.env.DATABASE_USERNAME || 'postgres',
  password:
    process.env.POSTGRES_PASSWORD ||
    process.env.DATABASE_PASSWORD ||
    'postgres',
  database:
    process.env.POSTGRES_DB || process.env.DATABASE_NAME || 'el_recuerdo',
  entities: [
    User,
    Destino,
    Servicio,
    Paquete,
    FechaSalida,
    OpcionHotel,
    TransporteAdicional,
    Hotel,
    TipoHabitacion,
    PeriodoHotel,
    TarifaPeriodo,
  ],
  synchronize: true,
  logging: false,
});
