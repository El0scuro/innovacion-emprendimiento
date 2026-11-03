export class CreateUsuarioDto {
  nombre!: string;
  correo!: string;
  telefono?: string | null;
  contrasenaHash!: string;
  tipoUsuario!: string;
  fechaRegistro!: Date;
  estado!: string;
}
