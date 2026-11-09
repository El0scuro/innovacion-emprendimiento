// Tipos alineados con las entidades del backend (Oferta, Postulacion, Turno, Disponibilidad).
export type EstadoPostulacion = 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA';
export type EstadoTurno = 'PROGRAMADO' | 'FINALIZADO';

export interface Empresa { idEmpresa: number; razonSocial: string; rubro: string; direccion: string; calificacionProm: number; totalResenas: number }
export interface Oferta {
  idOferta: number; empresa: Empresa; comuna: string; tipoTrabajo: string; titulo: string; descripcion: string;
  fechaTurno: string; horaInicio: string; horaFin: string; pagoOfrecido: number; cupos: number; cuposOcupados: number;
}
export interface Postulacion { idPostulacion: number; oferta: Oferta; fechaPostulacion: string; estado: EstadoPostulacion }
export interface Turno { idTurno: number; oferta: Oferta; estado: EstadoTurno; resenaEnviada: boolean }
// diaSemana: 1 = lunes ... 7 = domingo (confirmar convención con backend)
export interface Disponibilidad { diaSemana: number; horaInicio: string; horaFin: string }
