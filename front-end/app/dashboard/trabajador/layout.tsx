'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, CheckSquare, Clock, Calendar, LogOut } from 'lucide-react';

const NAV = [
  { href: '/dashboard/trabajador', label: 'Ofertas', icon: Briefcase },
  { href: '/dashboard/trabajador/postulaciones', label: 'Mis postulaciones', icon: CheckSquare },
  { href: '/dashboard/trabajador/turnos', label: 'Mis turnos', icon: Clock },
  { href: '/dashboard/trabajador/disponibilidad', label: 'Disponibilidad', icon: Calendar },
];

export default function TrabajadorLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const activo = (href: string) => (href === NAV[0].href ? path === href || path.startsWith(href + '/ofertas') : path.startsWith(href));
  return (
    <div className="min-h-screen bg-[#f4f3ef] text-stone-800 flex flex-col">
      <header className="border-b border-stone-200/60 px-6 py-4 flex items-center gap-4 sticky top-0 z-20 bg-[#f4f3ef]/90 backdrop-blur">
        <span className="text-2xl font-serif font-bold text-stone-900">Matilogo</span>
        <span className="border-l border-stone-300 pl-4 text-xs text-stone-500">Espacio trabajador</span>
      </header>
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto">
        <main className="flex-1 p-6 sm:p-10 min-w-0">{children}</main>
        <aside className="w-full lg:w-72 bg-white border-l border-stone-200/80 p-6 flex flex-col justify-between shrink-0">
          <div>
            <div className="flex items-center gap-3 pb-6 border-b border-stone-100 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-serif font-bold text-sm">LM</div>
              <div><p className="text-xs font-bold text-stone-900">Lucía Martínez</p><p className="text-[11px] text-stone-500">Valparaíso</p></div>
            </div>
            <nav className="space-y-1.5">
              {NAV.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className={`px-4 py-3 rounded-xl text-xs font-medium flex items-center gap-3 transition-colors ${activo(href) ? 'bg-[#264e43] text-white font-semibold' : 'text-stone-600 hover:bg-stone-100'}`}>
                  <Icon className="w-4 h-4" />{label}
                </Link>
              ))}
            </nav>
          </div>
          <Link href="/login" className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500 hover:text-red-600"><LogOut className="w-4 h-4" />Cerrar sesión</Link>
        </aside>
      </div>
    </div>
  );
}
