import { NavLink, Outlet } from 'react-router-dom';

const links = [
  ['/', 'Veřejná část'],
  ['/order/new', 'Objednávka'],
  ['/client', 'Klientská zóna'],
  ['/dispatcher', 'Dispečink'],
  ['/nurse', 'Zóna sestry'],
  ['/staff', 'Personál'],
  ['/architecture', 'IA & V2']
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-sm text-brand-700">Interní systém poskytovatele</p>
            <h1 className="text-lg font-semibold">Domácí péče — MVP</h1>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm">
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 ${isActive ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-700'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
