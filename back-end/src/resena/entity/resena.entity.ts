import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Turno } from '../../turno/entity/turno.entity.js';
import { Usuario } from '../../usuario/entity/usuario.entity.js';

@Entity({ name: 'RESENA' })
export class Resena {
  @PrimaryGeneratedColumn({ name: 'id_resena', type: 'int' })
  idResena!: number;

  @Column({ name: 'id_turno', type: 'int' })
  idTurno!: number;

  @ManyToOne(() => Turno, (turno) => turno.resenas, { nullable: false })
  @JoinColumn({ name: 'id_turno', referencedColumnName: 'idTurno' })
  turno!: Turno;

  @Column({ name: 'id_autor', type: 'int' })
  idAutor!: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.resenasEscritas, { nullable: false })
  @JoinColumn({ name: 'id_autor', referencedColumnName: 'idUsuario' })
  autor!: Usuario;

  @Column({ name: 'id_destinatario', type: 'int' })
  idDestinatario!: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.resenasRecibidas, { nullable: false })
  @JoinColumn({ name: 'id_destinatario', referencedColumnName: 'idUsuario' })
  destinatario!: Usuario;

  @Column({ type: 'tinyint' })
  puntuacion!: number;

  @Column({ type: 'text', nullable: true })
  comentario?: string | null;

  @Column({ type: 'datetime' })
  fecha!: Date;
}
