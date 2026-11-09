'use client';
import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { api, DIAS, validarDisponibilidad } from '@/lib/trabajador/api';
import type { Disponibilidad } from '@/lib/trabajador/types';
import { Title, btn } from '@/components/trabajador/ui';

const campo = 'border border-stone-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#264e43]';

export default function DisponibilidadPage() {
  const [bloques, setBloques] = useState<Disponibilidad[] | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  useEffect(() => { api.disponibilidad().then(setBloques); }, []);
  if (!bloques) return <p className="text-xs text-stone-400">Cargando…</p>;

  const set = (i: number, c: Partial<Disponibilidad>) => { setMsg(null); setBloques(bloques.map((b, j) => (j === i ? { ...b, ...c } : b))); };
  const guardar = async () => {
    const err = validarDisponibilidad(bloques);
    if (err) return setMsg({ ok: false, t: err });
    await api.guardarDisponibilidad(bloques); setMsg({ ok: true, t: 'Disponibilidad guardada.' });
  };

  return (
    <div className="max-w-xl">
      <Title sub="Con esto te mostramos primero las ofertas que calzan contigo.">Mi disponibilidad</Title>
      <div className="space-y-3 mb-4">
        {bloques.map((b, i) => (
          <div key={i} className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-xl border border-stone-200/70">
            <select aria-label="Día" className={campo} value={b.diaSemana} onChange={(e) => set(i, { diaSemana: Number(e.target.value) })}>
              {DIAS.slice(1).map((d, k) => <option key={d} value={k + 1}>{d}</option>)}
            </select>
            <input aria-label="Desde" type="time" className={campo} value={b.horaInicio} onChange={(e) => set(i, { horaInicio: e.target.value })} />
            <span className="text-xs text-stone-400">a</span>
            <input aria-label="Hasta" type="time" className={campo} value={b.horaFin} onChange={(e) => set(i, { horaFin: e.target.value })} />
            <button aria-label="Quitar bloque" onClick={() => { setMsg(null); setBloques(bloques.filter((_, j) => j !== i)); }} className="ml-auto p-2 text-stone-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => { setMsg(null); setBloques([...bloques, { diaSemana: 6, horaInicio: '09:00', horaFin: '17:00' }]); }} className="text-xs px-4 py-2.5 rounded-xl border border-stone-300 bg-white inline-flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" />Agregar bloque</button>
        <button className={btn} onClick={guardar}>Guardar disponibilidad</button>
      </div>
      {msg && <p role="alert" className={`mt-3 text-xs ${msg.ok ? 'text-emerald-800' : 'text-red-700'}`}>{msg.t}</p>}
    </div>
  );
}
