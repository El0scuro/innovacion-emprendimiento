import { Module } from '@nestjs/common';
import { TipoTrabajoController } from './tipo-trabajo.controller.js';
import { TipoTrabajoService } from './tipo-trabajo.service.js';

@Module({
  controllers: [TipoTrabajoController],
  providers: [TipoTrabajoService],
})
export class TipoTrabajoModule {}
