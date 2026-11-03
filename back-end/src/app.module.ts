import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ComunaModule } from './comuna/comuna.module.js';
import { DisponibilidadModule } from './disponibilidad/disponibilidad.module.js';
import { EmpresaModule } from './empresa/empresa.module.js';
import { OfertaModule } from './oferta/oferta.module.js';
import { PostulacionModule } from './postulacion/postulacion.module.js';
import { ResenaModule } from './resena/resena.module.js';
import { TipoTrabajoModule } from './tipo-trabajo/tipo-trabajo.module.js';
import { TrabajadorModule } from './trabajador/trabajador.module.js';
import { TrabajadorTipoModule } from './trabajador-tipo/trabajador-tipo.module.js';
import { TransaccionModule } from './transaccion/transaccion.module.js';
import { TurnoModule } from './turno/turno.module.js';
import { UsuarioModule } from './usuario/usuario.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ComunaModule,
    DisponibilidadModule,
    EmpresaModule,
    OfertaModule,
    PostulacionModule,
    ResenaModule,
    TipoTrabajoModule,
    TrabajadorModule,
    TrabajadorTipoModule,
    TransaccionModule,
    TurnoModule,
    UsuarioModule,
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'back-end',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
