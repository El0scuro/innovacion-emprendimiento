export class CreateTrabajadorDto {
  idUsuario!: number;
  idComuna!: number;
  fechaNacimiento?: string | null;
  descripcion?: string | null;
  calificacionProm?: string | null;
}
