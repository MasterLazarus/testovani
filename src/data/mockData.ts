import { ContactPerson, Nurse, Order, Patient, ServiceType, Visit, VisitReport, InternalNote } from '../types/models';

export const serviceTypes: ServiceType[] = [
  { id: 'svc-1', name: 'Převaz', durationMin: 45, priorityDefault: 'střední' },
  { id: 'svc-2', name: 'Aplikace injekce', durationMin: 30, priorityDefault: 'střední' },
  { id: 'svc-3', name: 'Odběr', durationMin: 35, priorityDefault: 'nízká' },
  { id: 'svc-4', name: 'Kontrolní návštěva', durationMin: 40, priorityDefault: 'nízká' },
  { id: 'svc-5', name: 'Domácí ošetřovatelská péče', durationMin: 60, priorityDefault: 'vysoká' }
];

export const nurses: Nurse[] = [
  {
    id: 'n-1',
    name: 'Bc. Jana Novotná',
    expertise: ['Převazy', 'Chronické rány'],
    region: 'Praha 4',
    availability: 'Po–Pá 07:00–15:00',
    capacityPerDay: 8,
    active: true
  },
  {
    id: 'n-2',
    name: 'Mgr. Petra Vlčková',
    expertise: ['Injekce', 'Domácí péče'],
    region: 'Praha 6',
    availability: 'Po–Pá 08:00–16:00',
    capacityPerDay: 6,
    active: true
  }
];

export const patients: Patient[] = [
  {
    id: 'p-1',
    firstName: 'Karel',
    lastName: 'Dvořák',
    birthDate: '1948-03-12',
    phone: '+420777111222',
    email: 'karel.dvorak@email.cz'
  }
];

export const contacts: ContactPerson[] = [
  {
    id: 'c-1',
    name: 'Lucie Dvořáková',
    relation: 'dcera',
    phone: '+420777888999',
    consentGiven: true
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-2026-001',
    patientId: 'p-1',
    contactPersonId: 'c-1',
    serviceTypeId: 'svc-1',
    location: 'Na Pankráci 12, Praha 4',
    preferredDate: '2026-04-08T09:00:00',
    healthNote: 'Pooperační rána, převaz 3x týdně.',
    priority: 'střední',
    status: 'čeká na přiřazení',
    createdAt: '2026-04-07T08:15:00',
    auditReady: true
  }
];

export const visits: Visit[] = [
  {
    id: 'v-1',
    orderId: 'ORD-2026-001',
    nurseId: 'n-1',
    scheduledAt: '2026-04-08T09:00:00',
    status: 'plánováno'
  }
];

export const visitReports: VisitReport[] = [
  {
    id: 'rep-1',
    visitId: 'v-1',
    arrivalTime: '09:05',
    performedAction: 'Sterilní převaz operační rány',
    note: 'Rána klidná, bez sekrece.',
    recommendation: 'Pokračovat v převazu po 48 hodinách.',
    outcome: 'dokončeno'
  }
];

export const internalNotes: InternalNote[] = [
  {
    id: 'note-1',
    orderId: 'ORD-2026-001',
    authorRole: 'koordinátor',
    text: 'Pacient preferuje dopolední čas.',
    createdAt: '2026-04-07T09:00:00'
  }
];
