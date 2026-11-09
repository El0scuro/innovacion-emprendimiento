'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { api, cuposLibres } from '@/lib/trabajador/api';
import { Badge, Cargando, Empty, Estrellas, btn, fecha, peso, useData } from '@/components/trabajador/ui';

export default function DetalleOferta() {
  const id = Number(useParams<{ id: string }>().id);
  const get = useCallback(async () => ({ o: await api.oferta(id), p: await api.postulaciones() }), [id]);
  const [data, reload] = useData(get);
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  if (!data) return <Cargando />;
  const { o, p } = data;
  if (!o) return <Empty texto="Esta oferta ya no está disponible." />;
  const mia = p.find((x) => x.oferta.idOferta === o.idOferta);

  const postular = async () => {
    setError(''); setEnviando(true);
    try { await api.postular(o.idOferta); await reload(); } catch (e) { setError((e as Error).message); }
    setEnviando(false);
  };
  const fila = (k: string, v: React.ReactNode) => (<div className="flex justify-between gap-4 py-3 border-b border-stone-100 text-xs"><dt className="text-stone-500">{k}</dt><dd className="font-medium text-right">{v}</dd></div>);

  return (
    <div className="max-w-2xl">
      <Link href="/dashboard/trabajador" className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 mb-5"><ArrowLeft className="w-3.5 h-3.5" />Volver a ofertas</Link>
      <h1 className="text-3xl font-serif text-stone-900">{o.titulo}</h1>
      <p className="text-xs text-stone-500 mt-1 mb-6">{o.empresa.razonSocial} · {o.empresa.rubro}</p>
      <dl className="bg-white rounded-2xl border border-stone-200/70 px-6 mb-4">
        {fila('Pago', <span className="font-bold">{peso(o.pagoOfrecido)}</span>)}
        {fila('Fecha', <span className="capitalize">{fecha(o.fechaTurno)}</span>)}
        {fila('Horario', `${o.horaInicio} – ${o.horaFin}`)}
        {fila('Dirección', o.empresa.direccion)}
        {fila('Tipo de trabajo', o.tipoTrabajo)}
        {fila('Calificación de la empresa', <Estrellas n={o.empresa.calificacionProm} total={o.empresa.totalResenas} />)}
        {fila('Cupos disponibles', cuposLibres(o))}
      </dl>
      {o.descripcion && <p className="text-xs text-stone-600 leading-relaxed mb-6">{o.descripcion}</p>}
      <div className="flex items-center gap-4">
        {mia ? <><Badge estado={mia.estado} /><span className="text-xs text-stone-500">Ya postulaste a esta oferta.</span></>
          : <button className={btn} disabled={enviando || cuposLibres(o) <= 0} onClick={postular}>{cuposLibres(o) <= 0 ? 'Sin cupos' : enviando ? 'Enviando…' : 'Postular'}</button>}
      </div>
      {error && <p role="alert" className="mt-3 text-xs text-red-700">{error}</p>}
    </div>
  );
}
