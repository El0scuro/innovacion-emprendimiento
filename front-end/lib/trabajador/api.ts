// Capa de datos. HOY devuelve datos de prueba; cuando el backend tenga endpoints,
// solo se reemplaza el cuerpo de estas funciones por fetch(...) y las pantallas no cambian.
import type { Disponibilidad, Oferta, Postulacion, Turno, Empresa } from './types';

export const DIAS = ['', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
export const COMUNA_TRABAJADOR = 'Valparaíso';

const iso = (n: number) => { const x = new Date(); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };
export const diaISO = (s: string) => { const g = new Date(s + 'T12:00:00').getDay(); return g === 0 ? 7 : g; };
const wait = () => new Promise((r) => setTimeout(r, 150));

const emp = (id: number, razonSocial: string, rubro: string, direccion: string, calificacionProm: number, totalResenas: number): Empresa =>
  ({ idEmpresa: id, razonSocial, rubro, direccion, calificacionProm, totalResenas });
const E1 = emp(1, 'Café Cordillera', 'Cafetería', 'Av. Pedro Montt 2145, Valparaíso', 4.7, 38);
const E2 = emp(2, 'Hotel Bruma', 'Hotelería', 'Av. San Martín 480, Viña del Mar', 4.5, 21);
const E3 = emp(3, 'Bodega Puerto', 'Logística', 'Errázuriz 1020, Valparaíso', 4.2, 12);

const of = (id: number, e: Empresa, comuna: string, tipo: string, titulo: string, dia: number, hi: string, hf: string, pago: number, cupos: number, ocup: number, descripcion: string): Oferta =>
  ({ idOferta: id, empresa: e, comuna, tipoTrabajo: tipo, titulo, descripcion, fechaTurno: iso(dia), horaInicio: hi, horaFin: hf, pagoOfrecido: pago, cupos, cuposOcupados: ocup });

const ofertas: Oferta[] = [
  of(1, E1, 'Valparaíso', 'Barista', 'Barista turno mañana', 1, '09:00', '15:00', 32000, 2, 0, 'Atención en barra y caja. Se valora experiencia con café de especialidad.'),
  of(2, E2, 'Viña del Mar', 'Recepción', 'Recepcionista de hotel', 2, '10:00', '16:00', 38000, 1, 0, 'Check-in, check-out y gestión de reservas.'),
  of(3, E1, 'Valparaíso', 'Garzón', 'Garzón turno noche', 3, '19:00', '23:00', 30000, 3, 1, 'Servicio en sala, viernes de alta demanda.'),
  of(4, E3, 'Valparaíso', 'Bodega', 'Apoyo de bodega', 4, '08:00', '14:00', 35000, 2, 0, 'Recepción y orden de mercadería.'),
  of(5, E2, 'Viña del Mar', 'Garzón', 'Garzón evento', 5, '12:00', '18:00', 36000, 4, 4, 'Evento corporativo (cupos completos).'),
];

let disponibilidad: Disponibilidad[] = [1, 2, 3, 4, 5].map((d) => ({ diaSemana: d, horaInicio: '08:00', horaFin: '18:00' }));
let postulaciones: Postulacion[] = [
  { idPostulacion: 1, oferta: ofertas[2], fechaPostulacion: iso(-1), estado: 'PENDIENTE' },
  { idPostulacion: 2, oferta: ofertas[3], fechaPostulacion: iso(-2), estado: 'RECHAZADA' },
];
let turnos: Turno[] = [
  { idTurno: 1, oferta: of(10, E1, 'Valparaíso', 'Barista', 'Barista turno tarde', 6, '14:00', '20:00', 32000, 1, 1, ''), estado: 'PROGRAMADO', resenaEnviada: false },
  { idTurno: 2, oferta: of(11, E3, 'Valparaíso', 'Bodega', 'Apoyo de bodega', -4, '08:00', '14:00', 35000, 1, 1, ''), estado: 'FINALIZADO', resenaEnviada: false },
  { idTurno: 3, oferta: of(12, E2, 'Viña del Mar', 'Recepción', 'Recepcionista', -9, '10:00', '16:00', 38000, 1, 1, ''), estado: 'FINALIZADO', resenaEnviada: true },
];

// ── HU-06: validación de bloques ──
const min = (h: string) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
export function validarDisponibilidad(b: Disponibilidad[]): string | null {
  if (b.length === 0) return 'Agrega al menos un bloque de disponibilidad.';
  if (b.some((x) => min(x.horaFin) <= min(x.horaInicio))) return 'En cada bloque, la hora de fin debe ser posterior a la de inicio.';
  for (let i = 0; i < b.length; i++) for (let j = i + 1; j < b.length; j++)
    if (b[i].diaSemana === b[j].diaSemana && min(b[i].horaInicio) < min(b[j].horaFin) && min(b[j].horaInicio) < min(b[i].horaFin))
      return `Los bloques del ${DIAS[b[i].diaSemana].toLowerCase()} se solapan. Corrígelos para guardar.`;
  return null;
}

// ── HU-07: la oferta calza si es de mi comuna y cabe dentro de un bloque ──
export const calza = (o: Oferta, d: Disponibilidad[]) =>
  o.comuna === COMUNA_TRABAJADOR &&
  d.some((b) => b.diaSemana === diaISO(o.fechaTurno) && min(b.horaInicio) <= min(o.horaInicio) && min(b.horaFin) >= min(o.horaFin));
export const cuposLibres = (o: Oferta) => o.cupos - o.cuposOcupados;

export const api = {
  async ofertas() { await wait(); return ofertas; },
  async oferta(id: number) { await wait(); return ofertas.find((o) => o.idOferta === id) ?? null; },
  async disponibilidad() { await wait(); return disponibilidad; },
  async guardarDisponibilidad(b: Disponibilidad[]) {
    await wait(); const err = validarDisponibilidad(b); if (err) throw new Error(err); disponibilidad = b;
  },
  async postulaciones() { await wait(); return postulaciones; },
  // HU-09: queda "pendiente"; no se permite postular dos veces ni sin cupos
  async postular(idOferta: number) {
    await wait();
    const o = ofertas.find((x) => x.idOferta === idOferta); if (!o) throw new Error('La oferta ya no existe.');
    if (postulaciones.some((p) => p.oferta.idOferta === idOferta)) throw new Error('Ya postulaste a esta oferta.');
    if (cuposLibres(o) <= 0) throw new Error('Esta oferta ya no tiene cupos.');
    postulaciones = [{ idPostulacion: Date.now(), oferta: o, fechaPostulacion: iso(0), estado: 'PENDIENTE' }, ...postulaciones];
  },
  async turnos() { await wait(); return turnos; },
  // HU-10: 1 a 5, comentario opcional, una sola vez por turno terminado
  async calificarNegocio(idTurno: number, puntuacion: number, comentario: string) {
    await wait();
    const t = turnos.find((x) => x.idTurno === idTurno);
    if (!t || t.estado !== 'FINALIZADO') throw new Error('Solo puedes calificar turnos terminados.');
    if (t.resenaEnviada) throw new Error('Ya calificaste este turno.');
    if (puntuacion < 1 || puntuacion > 5) throw new Error('Elige una puntuación de 1 a 5.');
    void comentario; t.resenaEnviada = true;
  },
};
