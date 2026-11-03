import { Module } from '@nestjs/common';
import { PostulacionController } from './postulacion.controller.js';
import { PostulacionService } from './postulacion.service.js';

@Module({
  controllers: [PostulacionController],
  providers: [PostulacionService],
})
export class PostulacionModule {}
