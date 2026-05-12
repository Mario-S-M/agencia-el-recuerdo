import { Module } from '@nestjs/common';
import { PaquetesController } from './paquetes.controller';
import { PaquetesService } from './paquetes.service';
import { PaquetesRepository } from './paquetes.repository';

@Module({
  controllers: [PaquetesController],
  providers: [PaquetesService, PaquetesRepository],
  exports: [PaquetesService, PaquetesRepository],
})
export class PaquetesModule {}
