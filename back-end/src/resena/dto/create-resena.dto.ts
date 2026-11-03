export class CreateResenaDto {
  idTurno!: number;
  idAutor!: number;
  idDestinatario!: number;
  puntuacion!: number;
  comentario?: string | null;
  fecha!: Date;
}
