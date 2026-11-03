import { Module } from '@nestjs/common';
import { TrabajadorTipoController } from './trabajador-tipo.controller.js';
import { TrabajadorTipoService } from './trabajador-tipo.service.js';

@Module({
  controllers: [TrabajadorTipoController],
  providers: [TrabajadorTipoService],
})
export class TrabajadorTipoModule {}
