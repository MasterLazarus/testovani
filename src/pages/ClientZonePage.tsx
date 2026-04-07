import { contacts, nurses, orders, patients, serviceTypes, visits } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

export default function ClientZonePage() {
  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="section-title">Přehled objednávek</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-slate-500"><tr><th>ID</th><th>Služba</th><th>Stav</th><th>Termín</th><th>Sestra</th></tr></thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td>{order.id}</td>
                  <td>{serviceTypes.find((service) => service.id === order.serviceTypeId)?.name}</td>
                  <td><StatusBadge status={order.status} /></td>
                  <td>{new Date(order.preferredDate).toLocaleString('cs-CZ')}</td>
                  <td>{nurses.find((nurse) => nurse.id === order.nurseId)?.name ?? 'Nepřiřazeno'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <h3 className="section-title">Detail objednávky</h3>
        <p className="mt-3 text-sm"><b>Pacient:</b> {patients[0].firstName} {patients[0].lastName}</p>
        <p className="text-sm"><b>Kontaktní osoba:</b> {contacts[0].name} ({contacts[0].relation})</p>
        <p className="text-sm"><b>Historie návštěv:</b> {visits.length} záznam</p>
        <div className="mt-4 flex gap-3">
          <button className="rounded-lg border px-3 py-2">Změnit požadavek</button>
          <button className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-rose-700">Zrušit požadavek</button>
        </div>
      </section>
    </div>
  );
}
