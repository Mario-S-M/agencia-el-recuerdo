import { Module } from '@nestjs/common';
import { HotelesController } from './hoteles.controller';
import { HotelesService } from './hoteles.service';
import { HotelesRepository } from './hoteles.repository';

@Module({
  controllers: [HotelesController],
  providers: [HotelesService, HotelesRepository],
  exports: [HotelesService, HotelesRepository],
})
export class HotelesModule {}
