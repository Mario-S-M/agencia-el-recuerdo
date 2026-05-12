import { Module } from '@nestjs/common';
import { FechasSalidaController } from './fechas-salida.controller';
import { FechasSalidaService } from './fechas-salida.service';
import { FechasSalidaRepository } from './fechas-salida.repository';

@Module({
  controllers: [FechasSalidaController],
  providers: [FechasSalidaService, FechasSalidaRepository],
  exports: [FechasSalidaService, FechasSalidaRepository],
})
export class FechasSalidaModule {}
