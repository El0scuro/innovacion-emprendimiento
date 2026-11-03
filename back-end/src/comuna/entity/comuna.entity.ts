import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Empresa } from '../../empresa/entity/empresa.entity.js';
import { Trabajador } from '../../trabajador/entity/trabajador.entity.js';

@Entity({ name: 'COMUNA' })
export class Comuna {
  @PrimaryGeneratedColumn({ name: 'id_comuna', type: 'int' })
  idComuna!: number;

  @Column({ type: 'varchar', length: 60 })
  nombre!: string;

  @Column({ type: 'varchar', length: 60 })
  region!: string;

  @OneToMany(() => Empresa, (empresa) => empresa.comuna)
  empresas?: Empresa[];

  @OneToMany(() => Trabajador, (trabajador) => trabajador.comuna)
  trabajadores?: Trabajador[];
}
