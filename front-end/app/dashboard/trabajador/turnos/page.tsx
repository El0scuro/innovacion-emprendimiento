'use client';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { api } from '@/lib/trabajador/api';
import type { Turno } from '@/lib/trabajador/types';
import { Badge, Cargando, Empty, Title, btn, fecha, peso, useData } from '@/components/trabajador/ui';

function Calificar({ t, onDone }: { t: Turno; onDone: () => void }) {
  const [n, setN] = useState(0);
  const [txt, setTxt] = useState('');
  const [err, setErr] = useState('');
  const enviar = async () => { try { await api.calificarNegocio(t.idTurno, n, txt); onDone(); } catch (e) { setErr((e as Error).message); } };
  return (
    <div className="mt-4 pt-4 border-t border-stone-100">
      <p className="text-xs font-semibold mb-2">¿Cómo fue tu experiencia en {t.oferta.empresa.razonSocial}?</p>
      <div className="flex gap-1 mb-3" role="radiogroup" aria-label="Puntuación">
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} type="button" role="radio" aria-checked={n === i} aria-label={`${i} de 5`} onClick={() => setN(i)}>
            <Star className={`w-6 h-6 ${i <= n ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
          </button>
        ))}
      </div>
      <textarea value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Comentario (opcional)" rows={2} className="w-full text-xs border border-stone-200 rounded-lg p-3 mb-3 focus:outline-none focus:border-[#264e43]" />
      <button className={btn} onClick={enviar} disabled={n === 0}>Enviar calificación</button>
      {err && <p role="alert" className="mt-2 text-xs text-red-700">{err}</p>}
    </div>
  );
}

export default function Turnos() {
  const [data, reload] = useData(api.turnos);
  if (!data) return <Cargando />;
  return (
    <>
      <Title sub="Tus turnos confirmados y los que ya terminaron.">Mis turnos</Title>
      {data.length === 0 ? <Empty texto="Aún no tienes turnos. Aparecen cuando una empresa acepta tu postulación." /> : (
        <div className="space-y-4">
          {data.map((t) => (
            <div key={t.idTurno} className="bg-white rounded-2xl p-6 border border-stone-200/70">
              <div className="flex justify-between gap-4 items-start">
                <div><h3 className="font-bold">{t.oferta.titulo}</h3><p className="text-xs text-stone-500">{t.oferta.empresa.razonSocial} · {t.oferta.empresa.direccion}</p></div>
                <Badge estado={t.estado} />
              </div>
              <p className="text-xs text-stone-600 mt-3 capitalize">{fecha(t.oferta.fechaTurno)} · <span className="normal-case">{t.oferta.horaInicio} – {t.oferta.horaFin} · {peso(t.oferta.pagoOfrecido)}</span></p>
              {t.estado === 'FINALIZADO' && (t.resenaEnviada ? <p className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-500">Ya calificaste este turno.</p> : <Calificar t={t} onDone={reload} />)}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
