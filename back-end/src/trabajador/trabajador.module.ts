import { Module } from '@nestjs/common';
import { TrabajadorController } from './trabajador.controller.js';
import { TrabajadorService } from './trabajador.service.js';

@Module({
  controllers: [TrabajadorController],
  providers: [TrabajadorService],
})
export class TrabajadorModule {}
