import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { TipoTrabajo } from '../../tipo-trabajo/entity/tipo-trabajo.entity.js';
import { Trabajador } from '../../trabajador/entity/trabajador.entity.js';

@Entity({ name: 'TRABAJADOR_TIPO' })
export class TrabajadorTipo {
  @PrimaryColumn({ name: 'id_trabajador', type: 'int' })
  idTrabajador!: number;

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.tiposTrabajo, { nullable: false })
  @JoinColumn({ name: 'id_trabajador', referencedColumnName: 'idTrabajador' })
  trabajador!: Trabajador;

  @PrimaryColumn({ name: 'id_tipo', type: 'int' })
  idTipo!: number;

  @ManyToOne(() => TipoTrabajo, (tipoTrabajo) => tipoTrabajo.trabajadoresTipos, { nullable: false })
  @JoinColumn({ name: 'id_tipo', referencedColumnName: 'idTipo' })
  tipoTrabajo!: TipoTrabajo;
}
