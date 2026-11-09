'use client';
import { useCallback, useEffect, useState } from 'react';
import { Star } from 'lucide-react';

export const peso = (n: number) => '$' + n.toLocaleString('es-CL');
export const fecha = (s: string) => new Date(s + 'T12:00:00').toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });
export const btn = 'bg-[#264e43] hover:bg-[#1e3e35] disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-xs font-medium px-5 py-2.5 rounded-xl transition-colors';

const COLORES: Record<string, string> = {
  PENDIENTE: 'bg-amber-100 text-amber-800', ACEPTADA: 'bg-emerald-100 text-emerald-800', RECHAZADA: 'bg-stone-200 text-stone-600',
  PROGRAMADO: 'bg-sky-100 text-sky-800', FINALIZADO: 'bg-stone-200 text-stone-700', CALZA: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
};
const NOMBRES: Record<string, string> = { CALZA: 'Calza con tu horario', PENDIENTE: 'Pendiente', ACEPTADA: 'Aceptada', RECHAZADA: 'Rechazada', PROGRAMADO: 'Programado', FINALIZADO: 'Finalizado' };
export const Badge = ({ estado }: { estado: string }) => (
  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${COLORES[estado]}`}>{NOMBRES[estado]}</span>
);

export const Title = ({ children, sub }: { children: React.ReactNode; sub?: string }) => (
  <div className="mb-6"><h1 className="text-3xl font-serif text-stone-900">{children}</h1>{sub && <p className="text-xs text-stone-500 mt-1">{sub}</p>}</div>
);
export const Empty = ({ texto, children }: { texto: string; children?: React.ReactNode }) => (
  <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-10 text-center text-xs text-stone-500 space-y-3"><p>{texto}</p>{children}</div>
);
export const Cargando = () => <p className="text-xs text-stone-400">Cargando…</p>;

export const Estrellas = ({ n, total }: { n: number; total?: number }) => (
  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700">
    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{n.toFixed(1)}{total !== undefined && <span className="font-normal text-stone-400">({total})</span>}
  </span>
);

export function useData<T>(fn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const load = useCallback(() => fn().then(setData), [fn]);
  useEffect(() => { load(); }, [load]);
  return [data, load] as const;
}
