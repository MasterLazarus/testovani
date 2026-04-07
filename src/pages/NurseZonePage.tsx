import { useState } from 'react';
import { orders, patients, serviceTypes, visits } from '../data/mockData';

export default function NurseZonePage() {
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);

  const currentVisit = visits[0];
  const order = orders.find((item) => item.id === currentVisit.orderId);
  const patient = patients.find((item) => item.id === order?.patientId);

  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="section-title">Moje dnešní návštěvy</h2>
        <p className="mt-2 text-sm">{new Date(currentVisit.scheduledAt).toLocaleString('cs-CZ')} • {serviceTypes.find((service) => service.id === order?.serviceTypeId)?.name}</p>
        <p className="text-sm text-slate-600">Pacient: {patient?.firstName} {patient?.lastName} (minimalizovaný náhled dat)</p>
        <div className="mt-4 flex gap-2">
          <button onClick={() => setStarted(true)} className="rounded-lg bg-brand-700 px-3 py-2 text-white">Zahájit návštěvu</button>
          <button onClick={() => setEnded(true)} className="rounded-lg border px-3 py-2">Ukončit návštěvu</button>
        </div>
        <p className="mt-2 text-sm text-slate-500">Stav: {started ? (ended ? 'Ukončeno' : 'Probíhá') : 'Plánováno'}</p>
      </section>

      <section className="card">
        <h3 className="section-title">Stručný záznam návštěvy</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <input className="rounded-lg border p-3" placeholder="Čas příjezdu" defaultValue="09:05" />
          <input className="rounded-lg border p-3" placeholder="Provedený úkon" defaultValue="Převaz" />
          <textarea className="rounded-lg border p-3 md:col-span-2" rows={3} placeholder="Poznámka" defaultValue="Rána klidná." />
          <textarea className="rounded-lg border p-3 md:col-span-2" rows={3} placeholder="Doporučení" defaultValue="Kontrola za 2 dny." />
          <select className="rounded-lg border p-3">
            <option>Dokončeno</option>
            <option>Nutná návaznost</option>
          </select>
        </div>
      </section>
    </div>
  );
}
