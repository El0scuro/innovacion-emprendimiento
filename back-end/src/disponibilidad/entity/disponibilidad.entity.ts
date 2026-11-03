import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Trabajador } from '../../trabajador/entity/trabajador.entity.js';

@Entity({ name: 'DISPONIBILIDAD' })
export class Disponibilidad {
  @PrimaryGeneratedColumn({ name: 'id_disponibilidad', type: 'int' })
  idDisponibilidad!: number;

  @Column({ name: 'id_trabajador', type: 'int' })
  idTrabajador!: number;

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.disponibilidades, { nullable: false })
  @JoinColumn({ name: 'id_trabajador', referencedColumnName: 'idTrabajador' })
  trabajador!: Trabajador;

  @Column({ name: 'dia_semana', type: 'tinyint' })
  diaSemana!: number;

  @Column({ name: 'hora_inicio', type: 'time' })
  horaInicio!: string;

  @Column({ name: 'hora_fin', type: 'time' })
  horaFin!: string;
}
