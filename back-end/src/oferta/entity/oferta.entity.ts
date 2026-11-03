import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Empresa } from '../../empresa/entity/empresa.entity.js';
import { Postulacion } from '../../postulacion/entity/postulacion.entity.js';
import { TipoTrabajo } from '../../tipo-trabajo/entity/tipo-trabajo.entity.js';

@Entity({ name: 'OFERTA' })
export class Oferta {
  @PrimaryGeneratedColumn({ name: 'id_oferta', type: 'int' })
  idOferta!: number;

  @Column({ name: 'id_empresa', type: 'int' })
  idEmpresa!: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.ofertas, { nullable: false })
  @JoinColumn({ name: 'id_empresa', referencedColumnName: 'idEmpresa' })
  empresa!: Empresa;

  @Column({ name: 'id_tipo', type: 'int' })
  idTipo!: number;

  @ManyToOne(() => TipoTrabajo, (tipoTrabajo) => tipoTrabajo.ofertas, { nullable: false })
  @JoinColumn({ name: 'id_tipo', referencedColumnName: 'idTipo' })
  tipoTrabajo!: TipoTrabajo;

  @Column({ type: 'varchar', length: 100 })
  titulo!: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string | null;

  @Column({ name: 'fecha_turno', type: 'date' })
  fechaTurno!: string;

  @Column({ name: 'hora_inicio', type: 'time' })
  horaInicio!: string;

  @Column({ name: 'hora_fin', type: 'time' })
  horaFin!: string;

  @Column({ name: 'pago_ofrecido', type: 'int' })
  pagoOfrecido!: number;

  @Column({ type: 'int' })
  cupos!: number;

  @Column({ type: 'boolean', default: false })
  destacada!: boolean;

  @Column({ type: 'varchar', length: 15 })
  estado!: string;

  @Column({ name: 'fecha_publicacion', type: 'datetime' })
  fechaPublicacion!: Date;

  @OneToMany(() => Postulacion, (postulacion) => postulacion.oferta)
  postulaciones?: Postulacion[];
}
