import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Postulacion } from '../../postulacion/entity/postulacion.entity.js';
import { Resena } from '../../resena/entity/resena.entity.js';
import { Transaccion } from '../../transaccion/entity/transaccion.entity.js';

@Entity({ name: 'TURNO' })
export class Turno {
  @PrimaryGeneratedColumn({ name: 'id_turno', type: 'int' })
  idTurno!: number;

  @Column({ name: 'id_postulacion', type: 'int', unique: true })
  idPostulacion!: number;

  @OneToOne(() => Postulacion, (postulacion) => postulacion.turno, { nullable: false })
  @JoinColumn({ name: 'id_postulacion', referencedColumnName: 'idPostulacion' })
  postulacion!: Postulacion;

  @Column({ name: 'hora_inicio_real', type: 'time', nullable: true })
  horaInicioReal?: string | null;

  @Column({ name: 'hora_fin_real', type: 'time', nullable: true })
  horaFinReal?: string | null;

  @Column({ type: 'varchar', length: 15 })
  estado!: string;

  @OneToMany(() => Transaccion, (transaccion) => transaccion.turno)
  transacciones?: Transaccion[];

  @OneToMany(() => Resena, (resena) => resena.turno)
  resenas?: Resena[];
}
