import { Module } from '@nestjs/common';
import { ComunaController } from './comuna.controller.js';
import { ComunaService } from './comuna.service.js';

@Module({
  controllers: [ComunaController],
  providers: [ComunaService],
})
export class ComunaModule {}
