'use client';
import Link from 'next/link';
import { useState } from 'react';
import { api, calza, cuposLibres } from '@/lib/trabajador/api';
import { Badge, Cargando, Empty, Estrellas, Title, btn, fecha, peso, useData } from '@/components/trabajador/ui';

const getAll = async () => ({ ofertas: await api.ofertas(), disp: await api.disponibilidad() });

export default function OfertasPage() {
  const [data] = useData(getAll);
  const [todas, setTodas] = useState(false);
  if (!data) return <Cargando />;
  const compatibles = data.ofertas.filter((o) => calza(o, data.disp));
  const lista = todas ? [...data.ofertas].sort((a, b) => Number(calza(b, data.disp)) - Number(calza(a, data.disp))) : compatibles;

  return (
    <>
      <Title sub="Primero las que calzan con tu horario y tu comuna.">Ofertas para ti</Title>
      <div className="flex gap-2 mb-6">
        {[false, true].map((v) => (
          <button key={String(v)} onClick={() => setTodas(v)} className={`text-xs px-4 py-2 rounded-full font-medium ${todas === v ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>
            {v ? `Todas (${data.ofertas.length})` : `Compatibles (${compatibles.length})`}
          </button>
        ))}
      </div>
      {lista.length === 0 ? (
        <Empty texto="Ninguna oferta calza con tu horario y comuna por ahora.">
          <button className={btn} onClick={() => setTodas(true)}>Ver todas las ofertas</button>
        </Empty>
      ) : (
        <div className="space-y-4">
          {lista.map((o) => (
            <Link key={o.idOferta} href={`/dashboard/trabajador/ofertas/${o.idOferta}`} className="block bg-white rounded-2xl p-6 border border-stone-200/70 shadow-sm hover:border-[#264e43]/40 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-stone-900">{o.titulo}</h3>
                  <p className="text-xs text-stone-500">{o.empresa.razonSocial} · {o.comuna}</p>
                </div>
                {calza(o, data.disp) && <Badge estado="CALZA" />}
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mt-4 text-xs text-stone-600">
                <span className="font-bold text-stone-900">{peso(o.pagoOfrecido)}</span>
                <span className="capitalize">{fecha(o.fechaTurno)}</span>
                <span>{o.horaInicio} – {o.horaFin}</span>
                <span>{cuposLibres(o) > 0 ? `${cuposLibres(o)} cupos` : 'Sin cupos'}</span>
                <Estrellas n={o.empresa.calificacionProm} total={o.empresa.totalResenas} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
