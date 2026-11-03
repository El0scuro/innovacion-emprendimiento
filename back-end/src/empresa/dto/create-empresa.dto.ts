export class CreateEmpresaDto {
  idUsuario!: number;
  idComuna!: number;
  razonSocial!: string;
  rut!: string;
  rubro?: string | null;
  direccion?: string | null;
  descripcion?: string | null;
}
