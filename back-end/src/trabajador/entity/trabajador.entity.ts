import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comuna } from '../../comuna/entity/comuna.entity.js';
import { Disponibilidad } from '../../disponibilidad/entity/disponibilidad.entity.js';
import { Postulacion } from '../../postulacion/entity/postulacion.entity.js';
import { TrabajadorTipo } from '../../trabajador-tipo/entity/trabajador-tipo.entity.js';
import { Usuario } from '../../usuario/entity/usuario.entity.js';

@Entity({ name: 'TRABAJADOR' })
export class Trabajador {
  @PrimaryGeneratedColumn({ name: 'id_trabajador', type: 'int' })
  idTrabajador!: number;

  @Column({ name: 'id_usuario', type: 'int', unique: true })
  idUsuario!: number;

  @OneToOne(() => Usuario, (usuario) => usuario.trabajador, { nullable: false })
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'idUsuario' })
  usuario!: Usuario;

  @Column({ name: 'id_comuna', type: 'int' })
  idComuna!: number;

  @ManyToOne(() => Comuna, (comuna) => comuna.trabajadores, { nullable: false })
  @JoinColumn({ name: 'id_comuna', referencedColumnName: 'idComuna' })
  comuna!: Comuna;

  @Column({ name: 'fecha_nacimiento', type: 'date', nullable: true })
  fechaNacimiento?: string | null;

  @Column({ type: 'text', nullable: true })
  descripcion?: string | null;

  @Column({ name: 'calificacion_prom', type: 'decimal', precision: 3, scale: 2, nullable: true })
  calificacionProm?: string | null;

  @OneToMany(() => Postulacion, (postulacion) => postulacion.trabajador)
  postulaciones?: Postulacion[];

  @OneToMany(() => Disponibilidad, (disponibilidad) => disponibilidad.trabajador)
  disponibilidades?: Disponibilidad[];

  @OneToMany(() => TrabajadorTipo, (trabajadorTipo) => trabajadorTipo.trabajador)
  tiposTrabajo?: TrabajadorTipo[];
}
