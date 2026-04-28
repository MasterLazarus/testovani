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

type FormState = {
  serviceTypeId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  preferredDate: string;
  healthNote: string;
  contactName: string;
  contactPhone: string;
  consentMedical: boolean;
  consentData: boolean;
};

export default function OrderWizardPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [stepError, setStepError] = useState('');
  const [form, setForm] = useState<FormState>({
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

  const getStepError = (currentStep: number): string => {
    if (currentStep === 1 && (!form.firstName.trim() || !form.lastName.trim() || !form.birthDate || !form.phone.trim())) {
      return 'Vyplňte prosím jméno, příjmení, datum narození a telefon pacienta.';
    }

    if (currentStep === 2 && !form.address.trim()) {
      return 'Vyplňte prosím adresu návštěvy.';
    }

    if (currentStep === 3 && !form.preferredDate) {
      return 'Vyberte prosím preferovaný termín návštěvy.';
    }

    if (currentStep === 6 && (!form.consentMedical || !form.consentData)) {
      return 'Pro pokračování je nutné potvrdit oba souhlasy.';
    }

    return '';
  };

  const next = () => {
    const validationError = getStepError(step);
    if (validationError) {
      setStepError(validationError);
      return;
    }

    setStepError('');
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prev = () => {
    setStepError('');
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validationError = getStepError(6);
    if (validationError) {
      setStepError(validationError);
      return;
    }

    setStepError('');
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
          <input className="rounded-lg border p-3" placeholder="Jméno" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
          <input className="rounded-lg border p-3" placeholder="Příjmení" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
          <input className="rounded-lg border p-3" type="date" value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} />
          <input className="rounded-lg border p-3" type="tel" placeholder="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input className="rounded-lg border p-3 md:col-span-2" type="email" placeholder="E-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
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

      {stepError && <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{stepError}</p>}

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
