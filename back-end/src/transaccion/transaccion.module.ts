import { Module } from '@nestjs/common';
import { TransaccionController } from './transaccion.controller.js';
import { TransaccionService } from './transaccion.service.js';

@Module({
  controllers: [TransaccionController],
  providers: [TransaccionService],
})
export class TransaccionModule {}
