import { Link } from 'react-router-dom';
import { serviceTypes } from '../data/mockData';

export default function LandingPage() {
  return (
    <div className="space-y-8">
      <section className="card">
        <p className="text-sm uppercase tracking-wide text-brand-700">Domácí zdravotní péče</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Profesionální sestry až domů v rámci jedné organizace</h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          Bez marketplace modelu. Všechny návštěvy zajišťuje interní tým zdravotních sester, dispečink a jednotná zdravotnická dokumentace.
        </p>
        <div className="mt-6 flex gap-3">
          <Link className="rounded-lg bg-brand-700 px-4 py-2 font-medium text-white" to="/order/new">
            Objednat návštěvu
          </Link>
          <Link className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700" to="/client">
            Klientská zóna
          </Link>
        </div>
      </section>
      <section className="card">
        <h3 className="section-title">Typy domácí péče</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {serviceTypes.map((service) => (
            <div key={service.id} className="rounded-lg border border-slate-200 p-4">
              <p className="font-medium">{service.name}</p>
              <p className="text-sm text-slate-500">Běžná délka: {service.durationMin} min</p>
            </div>
          ))}
        </div>
      </section>
      <section className="card bg-brand-50">
        <h3 className="section-title">Citlivé údaje & souhlasy</h3>
        <p className="mt-2 text-sm text-slate-700">
          Systém je navržen s minimalizací údajů v přehledech, role-based access a připravenou auditní stopou (záznam změn stavu a interních poznámek).
        </p>
      </section>
    </div>
  );
}
