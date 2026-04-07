export type OrderStatus =
  | 'nová'
  | 'čeká na kontrolu'
  | 'čeká na přiřazení'
  | 'potvrzená'
  | 'sestra na cestě'
  | 'probíhá návštěva'
  | 'dokončeno'
  | 'vyžaduje návaznost'
  | 'zrušeno';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  email: string;
}

export interface ContactPerson {
  id: string;
  name: string;
  relation: string;
  phone: string;
  consentGiven: boolean;
}

export interface ServiceType {
  id: string;
  name: string;
  durationMin: number;
  priorityDefault: 'nízká' | 'střední' | 'vysoká';
}

export interface Nurse {
  id: string;
  name: string;
  expertise: string[];
  region: string;
  availability: string;
  capacityPerDay: number;
  active: boolean;
}

export interface InternalNote {
  id: string;
  orderId: string;
  authorRole: 'koordinátor' | 'administrátor';
  text: string;
  createdAt: string;
}

export interface VisitReport {
  id: string;
  visitId: string;
  arrivalTime: string;
  performedAction: string;
  note: string;
  recommendation: string;
  outcome: 'dokončeno' | 'nutná návaznost';
}

export interface Visit {
  id: string;
  orderId: string;
  nurseId: string;
  scheduledAt: string;
  status: 'plánováno' | 'probíhá' | 'hotovo';
  reportId?: string;
}

export interface Order {
  id: string;
  patientId: string;
  contactPersonId?: string;
  serviceTypeId: string;
  location: string;
  preferredDate: string;
  healthNote: string;
  priority: 'nízká' | 'střední' | 'vysoká';
  status: OrderStatus;
  nurseId?: string;
  createdAt: string;
  auditReady: boolean;
}
