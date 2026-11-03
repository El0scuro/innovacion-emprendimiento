import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Oferta } from '../../oferta/entity/oferta.entity.js';
import { TrabajadorTipo } from '../../trabajador-tipo/entity/trabajador-tipo.entity.js';

@Entity({ name: 'TIPO_TRABAJO' })
export class TipoTrabajo {
  @PrimaryGeneratedColumn({ name: 'id_tipo', type: 'int' })
  idTipo!: number;

  @Column({ type: 'varchar', length: 60 })
  nombre!: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string | null;

  @OneToMany(() => Oferta, (oferta) => oferta.tipoTrabajo)
  ofertas?: Oferta[];

  @OneToMany(() => TrabajadorTipo, (trabajadorTipo) => trabajadorTipo.tipoTrabajo)
  trabajadoresTipos?: TrabajadorTipo[];
}
