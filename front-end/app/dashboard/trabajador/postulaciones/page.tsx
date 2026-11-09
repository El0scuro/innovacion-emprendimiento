'use client';
import Link from 'next/link';
import { useState } from 'react';
import { api } from '@/lib/trabajador/api';
import type { EstadoPostulacion } from '@/lib/trabajador/types';
import { Badge, Cargando, Empty, Title, fecha, peso, useData } from '@/components/trabajador/ui';

const TABS: { k: EstadoPostulacion | 'TODAS'; n: string }[] = [
  { k: 'TODAS', n: 'Todas' }, { k: 'PENDIENTE', n: 'Pendientes' }, { k: 'ACEPTADA', n: 'Aceptadas' }, { k: 'RECHAZADA', n: 'Rechazadas' },
];

export default function Postulaciones() {
  const [data] = useData(api.postulaciones);
  const [tab, setTab] = useState<EstadoPostulacion | 'TODAS'>('TODAS');
  if (!data) return <Cargando />;
  const lista = data.filter((p) => tab === 'TODAS' || p.estado === tab);
  return (
    <>
      <Title sub="Revisa si te eligieron.">Mis postulaciones</Title>
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((t) => (
          <button key={t.k} onClick={() => setTab(t.k)} className={`text-xs px-4 py-2 rounded-full font-medium ${tab === t.k ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>
            {t.n} ({t.k === 'TODAS' ? data.length : data.filter((p) => p.estado === t.k).length})
          </button>
        ))}
      </div>
      {lista.length === 0 ? <Empty texto="No tienes postulaciones en este estado."><Link href="/dashboard/trabajador" className="underline text-[#264e43]">Buscar ofertas</Link></Empty> : (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500"><tr><th className="p-4">Oferta</th><th className="p-4">Fecha del turno</th><th className="p-4">Pago</th><th className="p-4">Estado</th></tr></thead>
            <tbody className="divide-y divide-stone-100">
              {lista.map((p) => (
                <tr key={p.idPostulacion}>
                  <td className="p-4"><Link href={`/dashboard/trabajador/ofertas/${p.oferta.idOferta}`} className="font-bold hover:underline">{p.oferta.titulo}</Link><br /><span className="text-stone-500">{p.oferta.empresa.razonSocial}</span></td>
                  <td className="p-4 capitalize">{fecha(p.oferta.fechaTurno)}<br /><span className="text-stone-500 normal-case">{p.oferta.horaInicio} – {p.oferta.horaFin}</span></td>
                  <td className="p-4">{peso(p.oferta.pagoOfrecido)}</td>
                  <td className="p-4"><Badge estado={p.estado} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
