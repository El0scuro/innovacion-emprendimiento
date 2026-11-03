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
import { Oferta } from '../../oferta/entity/oferta.entity.js';
import { Usuario } from '../../usuario/entity/usuario.entity.js';

@Entity({ name: 'EMPRESA' })
export class Empresa {
  @PrimaryGeneratedColumn({ name: 'id_empresa', type: 'int' })
  idEmpresa!: number;

  @Column({ name: 'id_usuario', type: 'int', unique: true })
  idUsuario!: number;

  @OneToOne(() => Usuario, (usuario) => usuario.empresa, { nullable: false })
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'idUsuario' })
  usuario!: Usuario;

  @Column({ name: 'id_comuna', type: 'int' })
  idComuna!: number;

  @ManyToOne(() => Comuna, (comuna) => comuna.empresas, { nullable: false })
  @JoinColumn({ name: 'id_comuna', referencedColumnName: 'idComuna' })
  comuna!: Comuna;

  @Column({ name: 'razon_social', type: 'varchar', length: 120 })
  razonSocial!: string;

  @Column({ type: 'varchar', length: 12, unique: true })
  rut!: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  rubro?: string | null;

  @Column({ type: 'varchar', length: 150, nullable: true })
  direccion?: string | null;

  @Column({ type: 'text', nullable: true })
  descripcion?: string | null;

  @OneToMany(() => Oferta, (oferta) => oferta.empresa)
  ofertas?: Oferta[];
}
