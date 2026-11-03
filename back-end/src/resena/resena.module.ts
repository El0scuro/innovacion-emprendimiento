import { Module } from '@nestjs/common';
import { ResenaController } from './resena.controller.js';
import { ResenaService } from './resena.service.js';

@Module({
  controllers: [ResenaController],
  providers: [ResenaService],
})
export class ResenaModule {}
