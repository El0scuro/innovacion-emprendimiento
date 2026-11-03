import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Turno } from '../../turno/entity/turno.entity.js';

@Entity({ name: 'TRANSACCION' })
export class Transaccion {
  @PrimaryGeneratedColumn({ name: 'id_transaccion', type: 'int' })
  idTransaccion!: number;

  @Column({ name: 'id_turno', type: 'int' })
  idTurno!: number;

  @ManyToOne(() => Turno, (turno) => turno.transacciones, { nullable: false })
  @JoinColumn({ name: 'id_turno', referencedColumnName: 'idTurno' })
  turno!: Turno;

  @Column({ name: 'monto_comision', type: 'int' })
  montoComision!: number;

  @Column({ type: 'datetime' })
  fecha!: Date;

  @Column({ type: 'varchar', length: 15 })
  estado!: string;
}
