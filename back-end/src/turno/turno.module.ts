import { Module } from '@nestjs/common';
import { TurnoController } from './turno.controller.js';
import { TurnoService } from './turno.service.js';

@Module({
  controllers: [TurnoController],
  providers: [TurnoService],
})
export class TurnoModule {}
