import { OrderStatus } from '../types/models';

const colorMap: Record<OrderStatus, string> = {
  'nová': 'bg-blue-100 text-blue-700',
  'čeká na kontrolu': 'bg-indigo-100 text-indigo-700',
  'čeká na přiřazení': 'bg-amber-100 text-amber-700',
  'potvrzená': 'bg-emerald-100 text-emerald-700',
  'sestra na cestě': 'bg-cyan-100 text-cyan-700',
  'probíhá návštěva': 'bg-violet-100 text-violet-700',
  'dokončeno': 'bg-green-100 text-green-700',
  'vyžaduje návaznost': 'bg-orange-100 text-orange-700',
  'zrušeno': 'bg-rose-100 text-rose-700'
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  return <span className={`rounded-full px-2 py-1 text-xs font-medium ${colorMap[status]}`}>{status}</span>;
}
