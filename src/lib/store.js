// =============================================================
//  CANLI SENKRON DEPOSU
//  Siparişler, talepler ve yorumlar tarayıcının localStorage'ında tutulur.
//  Aynı tarayıcıda açık olan diğer sekmeler değişikliği anında görür
//  (misafir sekmesi → personel sekmesi demosu).
//  Farklı cihazlar arası gerçek senkron için bu dosya ileride
//  Firebase / Supabase ile değiştirilebilir; ekranlar aynı kalır.
// =============================================================
import { useCallback, useEffect, useState } from 'react';

const PREFIX = 'askhermis:';

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // depolama kapalıysa uygulama yine de bellekte çalışır
  }
};

export function useSyncedState(key, initial) {
  const [value, setValue] = useState(() => read(key, typeof initial === 'function' ? initial() : initial));

  // Diğer sekmelerden gelen değişiklikleri dinle
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === PREFIX + key) setValue(e.newValue ? JSON.parse(e.newValue) : (typeof initial === 'function' ? initial() : initial));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key, initial]);

  const update = useCallback((next) => {
    setValue((prev) => {
      const v = typeof next === 'function' ? next(prev) : next;
      write(key, v);
      return v;
    });
  }, [key]);

  return [value, update];
}

// Demo başlangıç kayıtları (personel paneli boş görünmesin)
export const seedRecords = () => {
  const now = Date.now();
  return [
    { id: 'seed-1', type: 'order', room: '302', createdAt: now - 18 * 60000, status: 'preparing', items: [{ id: 1, qty: 1 }, { id: 14, qty: 2 }] },
    { id: 'seed-2', type: 'request', service: 'cleaning', room: '305', createdAt: now - 9 * 60000, status: 'new', details: { slot: '11:00 – 13:00' } },
    { id: 'seed-3', type: 'request', service: 'transfer', room: '201', createdAt: now - 40 * 60000, status: 'onTheWay', details: { destination: 'airport', datetime: '', people: 2 } },
  ];
};

export const STATUS_FLOW = {
  order: ['new', 'preparing', 'onTheWay', 'done'],
  request: ['new', 'pending', 'onTheWay', 'done'],
};

export const nextStatus = (record) => {
  const flow = STATUS_FLOW[record.type];
  return flow[(flow.indexOf(record.status) + 1) % flow.length];
};

export const STATUS_STYLE = {
  new: 'bg-lilac/25 text-lilac-ink',
  pending: 'bg-muted/20 text-muted-ink',
  preparing: 'bg-peach/35 text-peach-ink',
  onTheWay: 'bg-deep/15 text-deep',
  done: 'bg-sage/50 text-sage-ink',
};
