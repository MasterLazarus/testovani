import { FormEvent, useMemo, useState } from 'react';
import { serviceTypes } from '../data/mockData';

const steps = [
  'Typ služby',
  'Pacient',
  'Adresa návštěvy',
  'Preferovaný termín',
  'Zdravotní poznámka',
  'Kontaktní osoba',
  'Souhlasy',
  'Rekapitulace'
];

export default function OrderWizardPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    serviceTypeId: 'svc-1',
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    email: '',
    address: '',
    preferredDate: '',
    healthNote: '',
    contactName: '',
    contactPhone: '',
    consentMedical: false,
    consentData: false
  });

  const serviceLabel = useMemo(
    () => serviceTypes.find((service) => service.id === form.serviceTypeId)?.name ?? '',
    [form.serviceTypeId]
  );

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prev = () => setStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card">
        <h2 className="section-title">Objednávka odeslána</h2>
        <p className="mt-2 text-slate-600">Poptávka byla založena pod ID ORD-2026-00X a čeká na kontrolu koordinátorem.</p>
      </div>
    );
  }

  return (
    <form className="card space-y-6" onSubmit={onSubmit}>
      <div>
        <p className="text-sm text-slate-500">Krok {step + 1} z {steps.length}</p>
        <h2 className="section-title">{steps[step]}</h2>
      </div>

      {step === 0 && (
        <select className="w-full rounded-lg border p-3" value={form.serviceTypeId} onChange={(e) => setForm({ ...form, serviceTypeId: e.target.value })}>
          {serviceTypes.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}
        </select>
      )}

      {step === 1 && (
        <div className="grid gap-3 md:grid-cols-2">
          {['firstName', 'lastName', 'birthDate', 'phone', 'email'].map((field) => (
            <input
              key={field}
              className="rounded-lg border p-3"
              placeholder={field}
              type={field === 'birthDate' ? 'date' : 'text'}
              value={form[field as keyof typeof form] as string}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          ))}
        </div>
      )}

      {step === 2 && <input className="w-full rounded-lg border p-3" placeholder="Adresa návštěvy" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />}
      {step === 3 && <input className="w-full rounded-lg border p-3" type="datetime-local" value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} />}
      {step === 4 && <textarea className="w-full rounded-lg border p-3" rows={4} placeholder="Stručný zdravotní popis" value={form.healthNote} onChange={(e) => setForm({ ...form, healthNote: e.target.value })} />}
      {step === 5 && (
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-lg border p-3" placeholder="Jméno kontaktní osoby" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} />
          <input className="rounded-lg border p-3" placeholder="Telefon kontaktní osoby" value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} />
        </div>
      )}
      {step === 6 && (
        <div className="space-y-3 text-sm">
          <label className="flex gap-2"><input type="checkbox" checked={form.consentMedical} onChange={(e) => setForm({ ...form, consentMedical: e.target.checked })} /> Souhlas se zpracováním zdravotních údajů</label>
          <label className="flex gap-2"><input type="checkbox" checked={form.consentData} onChange={(e) => setForm({ ...form, consentData: e.target.checked })} /> Souhlas se zpracováním osobních údajů</label>
        </div>
      )}
      {step === 7 && (
        <div className="rounded-lg bg-slate-50 p-4 text-sm">
          <p><b>Typ služby:</b> {serviceLabel}</p>
          <p><b>Pacient:</b> {form.firstName} {form.lastName}</p>
          <p><b>Termín:</b> {form.preferredDate || 'neuvedeno'}</p>
          <p><b>Adresa:</b> {form.address || 'neuvedeno'}</p>
          <p><b>Poznámka:</b> {form.healthNote || 'bez poznámky'}</p>
        </div>
      )}

      <div className="flex justify-between">
        <button type="button" onClick={prev} className="rounded-lg border px-4 py-2" disabled={step === 0}>Zpět</button>
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className="rounded-lg bg-brand-700 px-4 py-2 text-white">Další</button>
        ) : (
          <button type="submit" className="rounded-lg bg-brand-700 px-4 py-2 text-white">Odeslat objednávku</button>
        )}
      </div>
    </form>
  );
}
