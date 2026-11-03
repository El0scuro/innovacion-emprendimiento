import { Module } from '@nestjs/common';
import { OfertaController } from './oferta.controller.js';
import { OfertaService } from './oferta.service.js';

@Module({
  controllers: [OfertaController],
  providers: [OfertaService],
})
export class OfertaModule {}
