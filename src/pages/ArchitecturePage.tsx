export default function ArchitecturePage() {
  const screens = [
    'Landing + vysvětlení služby',
    'Objednávkový wizard (8 kroků)',
    'Klientská zóna (seznam + detail objednávky)',
    'Dispečerský dashboard + tabulka objednávek',
    'Zóna sestry (dnešní/budoucí návštěvy + report)',
    'Administrace personálu'
  ];

  const components = [
    'Layout + navigace',
    'StatusBadge',
    'Widget cards',
    'Objednávkový multi-step formulář',
    'Tabulky pro jednotlivé role',
    'Report formulář návštěvy'
  ];

  const v2 = [
    'Napojení na API (auth, orders, scheduling)',
    'RBAC přes OIDC + audit log per field',
    'Kalendářové plánování s optimalizací trasy',
    'Notifikace SMS/e-mail',
    'Export dokumentace a napojení na IS zdravotnictví'
  ];

  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="section-title">Informační architektura</h2>
        <p className="mt-2 text-sm text-slate-600">Veřejná část → Objednávka → Interní operativa (dispečink/sestra/admin) → Historie a reporty.</p>
      </section>
      <section className="card">
        <h3 className="section-title">Seznam obrazovek</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{screens.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section className="card">
        <h3 className="section-title">Seznam komponent</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{components.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section className="card">
        <h3 className="section-title">Doporučení pro V2</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{v2.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
    </div>
  );
}
