import { nurses } from '../data/mockData';

export default function StaffAdminPage() {
  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="section-title">Administrace personálu</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-slate-500"><tr><th>Sestra</th><th>Odbornost</th><th>Region</th><th>Dostupnost</th><th>Kapacita</th><th>Stav</th></tr></thead>
            <tbody>
              {nurses.map((nurse) => (
                <tr className="border-t" key={nurse.id}>
                  <td>{nurse.name}</td>
                  <td>{nurse.expertise.join(', ')}</td>
                  <td>{nurse.region}</td>
                  <td>{nurse.availability}</td>
                  <td>{nurse.capacityPerDay} / den</td>
                  <td>{nurse.active ? 'Aktivní' : 'Neaktivní'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <h3 className="section-title">Detail profilu sestry</h3>
        <p className="mt-2 text-sm"><b>Jméno:</b> {nurses[0].name}</p>
        <p className="text-sm"><b>Odbornost:</b> {nurses[0].expertise.join(', ')}</p>
        <p className="text-sm"><b>Region:</b> {nurses[0].region}</p>
      </section>
    </div>
  );
}
