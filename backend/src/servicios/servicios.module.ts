import { Module } from '@nestjs/common';
import { ServiciosController } from './servicios.controller';
import { ServiciosService } from './servicios.service';
import { ServiciosRepository } from './servicios.repository';

@Module({
  controllers: [ServiciosController],
  providers: [ServiciosService, ServiciosRepository],
  exports: [ServiciosService, ServiciosRepository],
})
export class ServiciosModule {}
