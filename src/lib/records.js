// Sipariş / talep kayıtlarını okunabilir metne çeviren yardımcılar
import { menuItems } from '../data/menu';
import { services } from '../data/hotel';
import { L, formatPrice } from './utils';

export const findItem = (id) => menuItems.find((m) => m.id === id);
export const findService = (id) => services.find((s) => s.id === id);

export const orderTotal = (items) =>
  items.reduce((s, i) => s + (findItem(i.id)?.price ?? 0) * i.qty, 0);

export const recordTitle = (r, lang) => {
  if (r.type === 'order') {
    return r.items.map((i) => `${i.qty}× ${L(findItem(i.id)?.name, lang)}`).join(', ');
  }
  return L(findService(r.service)?.name, lang);
};

// Talebin detay satırı: "11:00 – 13:00", "Atina Havalimanı · 2 kişi · 20:00" gibi
export const recordDetails = (r, lang, tx) => {
  if (r.type === 'order') return `${tx.total}: ${formatPrice(orderTotal(r.items))}${r.note ? ` · “${r.note}”` : ''}`;
  const s = findService(r.service);
  const d = r.details || {};
  const parts = [];
  if (d.slot) parts.push(d.slot);
  if (d.items?.length) parts.push(d.items.map((id) => L(s.items.find((x) => x.id === id)?.name, lang)).join(', '));
  if (d.destination) parts.push(L(s.destinations.find((x) => x.id === d.destination)?.name, lang));
  if (d.venue) parts.push(L(s.venues.find((x) => x.id === d.venue)?.name, lang));
  if (d.datetime) parts.push(d.datetime.replace('T', ' '));
  if (d.people) parts.push(`${d.people} 👤`);
  if (d.note) parts.push(`“${d.note}”`);
  return parts.join(' · ');
};
