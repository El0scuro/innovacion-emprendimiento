import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Oferta } from '../../oferta/entity/oferta.entity.js';
import { Trabajador } from '../../trabajador/entity/trabajador.entity.js';
import { Turno } from '../../turno/entity/turno.entity.js';

@Entity({ name: 'POSTULACION' })
export class Postulacion {
  @PrimaryGeneratedColumn({ name: 'id_postulacion', type: 'int' })
  idPostulacion!: number;

  @Column({ name: 'id_oferta', type: 'int' })
  idOferta!: number;

  @ManyToOne(() => Oferta, (oferta) => oferta.postulaciones, { nullable: false })
  @JoinColumn({ name: 'id_oferta', referencedColumnName: 'idOferta' })
  oferta!: Oferta;

  @Column({ name: 'id_trabajador', type: 'int' })
  idTrabajador!: number;

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.postulaciones, { nullable: false })
  @JoinColumn({ name: 'id_trabajador', referencedColumnName: 'idTrabajador' })
  trabajador!: Trabajador;

  @Column({ name: 'fecha_postulacion', type: 'datetime' })
  fechaPostulacion!: Date;

  @Column({ type: 'varchar', length: 15 })
  estado!: string;

  @OneToOne(() => Turno, (turno) => turno.postulacion)
  turno?: Turno;
}
