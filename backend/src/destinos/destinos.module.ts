import { Module } from '@nestjs/common';
import { DestinosController } from './destinos.controller';
import { DestinosService } from './destinos.service';
import { DestinosRepository } from './destinos.repository';

@Module({
  controllers: [DestinosController],
  providers: [DestinosService, DestinosRepository],
  exports: [DestinosService, DestinosRepository],
})
export class DestinosModule {}
