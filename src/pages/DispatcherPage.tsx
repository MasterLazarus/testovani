import { internalNotes, nurses, orders, patients, serviceTypes } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

const widgets = [
  { label: 'Nové objednávky', value: 4 },
  { label: 'Čeká na přiřazení', value: 3 },
  { label: 'Dnešní návštěvy', value: 9 },
  { label: 'Dokončené návštěvy', value: 27 },
  { label: 'Zrušené objednávky', value: 2 }
];

export default function DispatcherPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
        {widgets.map((widget) => (
          <article key={widget.label} className="card p-4">
            <p className="text-sm text-slate-500">{widget.label}</p>
            <p className="mt-1 text-2xl font-semibold">{widget.value}</p>
          </article>
        ))}
      </section>

      <section className="card">
        <h2 className="section-title">Tabulka objednávek</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-slate-500">
              <tr><th>ID</th><th>Pacient</th><th>Typ služby</th><th>Lokalita</th><th>Termín</th><th>Priorita</th><th>Stav</th><th>Sestra</th><th>Akce</th></tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t align-top">
                  <td>{order.id}</td>
                  <td>{patients.find((patient) => patient.id === order.patientId)?.lastName ?? '—'}</td>
                  <td>{serviceTypes.find((service) => service.id === order.serviceTypeId)?.name}</td>
                  <td>{order.location}</td>
                  <td>{new Date(order.preferredDate).toLocaleString('cs-CZ')}</td>
                  <td>{order.priority}</td>
                  <td><StatusBadge status={order.status} /></td>
                  <td>{nurses.find((nurse) => nurse.id === order.nurseId)?.name ?? 'Nepřiřazeno'}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      <button className="rounded border px-2 py-1">Detail</button>
                      <button className="rounded border px-2 py-1">Změnit stav</button>
                      <button className="rounded border px-2 py-1">Přiřadit</button>
                      <button className="rounded border px-2 py-1">Přesunout</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <h3 className="section-title">Interní poznámky (audit koncept)</h3>
        {internalNotes.map((note) => (
          <div key={note.id} className="mt-3 rounded-lg border border-slate-200 p-3 text-sm">
            <p>{note.text}</p>
            <p className="text-slate-500">{note.authorRole} • {new Date(note.createdAt).toLocaleString('cs-CZ')}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
