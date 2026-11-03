import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Empresa } from '../../empresa/entity/empresa.entity.js';
import { Resena } from '../../resena/entity/resena.entity.js';
import { Trabajador } from '../../trabajador/entity/trabajador.entity.js';

@Entity({ name: 'USUARIO' })
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario', type: 'int' })
  idUsuario!: number;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  correo!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono?: string | null;

  @Column({ name: 'contrasena_hash', type: 'varchar', length: 255 })
  contrasenaHash!: string;

  @Column({ name: 'tipo_usuario', type: 'varchar', length: 10 })
  tipoUsuario!: string;

  @Column({ name: 'fecha_registro', type: 'datetime' })
  fechaRegistro!: Date;

  @Column({ type: 'varchar', length: 15 })
  estado!: string;

  @OneToOne(() => Empresa, (empresa) => empresa.usuario)
  empresa?: Empresa;

  @OneToOne(() => Trabajador, (trabajador) => trabajador.usuario)
  trabajador?: Trabajador;

  @OneToMany(() => Resena, (resena) => resena.autor)
  resenasEscritas?: Resena[];

  @OneToMany(() => Resena, (resena) => resena.destinatario)
  resenasRecibidas?: Resena[];
}
