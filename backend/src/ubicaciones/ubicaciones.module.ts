import { Module } from '@nestjs/common';
import { UbicacionesController } from './ubicaciones.controller';
import { UbicacionesService } from './ubicaciones.service';
import {
  PaisesRepository,
  EstadosRepository,
  MunicipiosRepository,
} from './ubicaciones.repository';

@Module({
  controllers: [UbicacionesController],
  providers: [
    UbicacionesService,
    PaisesRepository,
    EstadosRepository,
    MunicipiosRepository,
  ],
  exports: [
    UbicacionesService,
    PaisesRepository,
    EstadosRepository,
    MunicipiosRepository,
  ],
})
export class UbicacionesModule {}
