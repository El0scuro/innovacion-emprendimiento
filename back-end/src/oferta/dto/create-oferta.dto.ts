export class CreateOfertaDto {
  idEmpresa!: number;
  idTipo!: number;
  titulo!: string;
  descripcion?: string | null;
  fechaTurno!: string;
  horaInicio!: string;
  horaFin!: string;
  pagoOfrecido!: number;
  cupos!: number;
  destacada?: boolean;
  estado!: string;
  fechaPublicacion!: Date;
}
