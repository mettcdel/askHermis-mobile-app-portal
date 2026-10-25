import { useState } from 'react';
import { Sparkles, BedDouble, Car, UtensilsCrossed, ChevronRight } from 'lucide-react';
import { services } from '../data/hotel';
import { L } from '../lib/utils';
import { Chip, ScreenTitle } from '../components/ui';

const ICONS = { Sparkles, BedDouble, Car, UtensilsCrossed };

export default function Services({ tx, lang, onCreateRecord, initial }) {
  const [open, setOpen] = useState(initial?.service || null);

  return (
    <div className="space-y-4">
      <ScreenTitle title={tx.services.title} sub={tx.services.sub} />
      <div className="space-y-3">
        {services.map((s) => {
          const Icon = ICONS[s.icon];
          const isOpen = open === s.id;
          return (
            <div key={s.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${isOpen ? 'border-sage' : 'border-gray-100'}`}>
              <button onClick={() => setOpen(isOpen ? null : s.id)} className="w-full p-4 flex items-center gap-3 text-left">
                <div className="p-3 bg-sage/40 rounded-xl shrink-0"><Icon size={20} /></div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm">{L(s.name, lang)}</div>
                  <div className="text-xs text-gray-500">{L(s.desc, lang)}</div>
                  <div className="text-[11px] mt-1 font-semibold text-sage-ink">{s.price === null ? tx.services.onRequest : tx.services.free}</div>
                </div>
                <ChevronRight size={18} className={`text-gray-300 transition ${isOpen ? 'rotate-90' : ''}`} />
              </button>
              {isOpen && (
                <ServiceForm
                  key={s.id}
                  s={s}
                  tx={tx}
                  lang={lang}
                  initial={initial?.service === s.id ? initial : null}
                  onSubmit={(details) => { onCreateRecord({ type: 'request', service: s.id, details }, tx.services.sent); setOpen(null); }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ServiceForm({ s, tx, lang, initial, onSubmit }) {
  const [d, setD] = useState({ slot: '', items: [], destination: '', venue: initial?.venue || '', datetime: '', people: 2, note: '' });
  const [error, setError] = useState(false);
  const set = (k, v) => { setD((p) => ({ ...p, [k]: v })); setError(false); };
  const has = (f) => s.fields.includes(f);

  const submit = (e) => {
    e.preventDefault();
    const missing = (has('slot') && !d.slot) || (has('items') && !d.items.length) || (has('destination') && !d.destination)
      || (has('venue') && !d.venue) || (has('datetime') && !d.datetime);
    if (missing) { setError(true); return; }
    const details = {};
    s.fields.forEach((f) => { if (d[f] !== '' && d[f] != null) details[f] = d[f]; });
    if (details.datetime) details.datetime = details.datetime.replace('T', ' ');
    onSubmit(details);
  };

  const label = (txt) => <div className="text-xs font-semibold text-gray-600 mb-1.5">{txt}</div>;

  return (
    <form onSubmit={submit} className="px-4 pb-4 space-y-3 border-t border-gray-50 pt-3">
      {has('slot') && (
        <div>{label(tx.services.slot)}
          <div className="flex flex-wrap gap-2">{s.slots.map((v) => <Chip key={v} tone="sage" active={d.slot === v} onClick={() => set('slot', v)}>{v}</Chip>)}</div>
        </div>
      )}
      {has('items') && (
        <div>{label(tx.services.items)}
          <div className="flex flex-wrap gap-2">{s.items.map((i) => (
            <Chip key={i.id} tone="sage" active={d.items.includes(i.id)} onClick={() => set('items', d.items.includes(i.id) ? d.items.filter((x) => x !== i.id) : [...d.items, i.id])}>{L(i.name, lang)}</Chip>
          ))}</div>
        </div>
      )}
      {has('destination') && (
        <div>{label(tx.services.destination)}
          <div className="flex flex-wrap gap-2">{s.destinations.map((x) => <Chip key={x.id} tone="sage" active={d.destination === x.id} onClick={() => set('destination', x.id)}>{L(x.name, lang)}</Chip>)}</div>
        </div>
      )}
      {has('venue') && (
        <div>{label(tx.services.venue)}
          <div className="flex flex-wrap gap-2">{s.venues.map((x) => <Chip key={x.id} tone="sage" active={d.venue === x.id} onClick={() => set('venue', x.id)}>{L(x.name, lang)}</Chip>)}</div>
        </div>
      )}
      {has('datetime') && (
        <label className="block">{label(tx.services.datetime)}
          <input type="datetime-local" value={d.datetime} onChange={(e) => set('datetime', e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-sage" />
        </label>
      )}
      {has('people') && (
        <div>{label(tx.services.people)}
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => set('people', Math.max(1, d.people - 1))} className="w-8 h-8 rounded-full bg-gray-100 font-bold">−</button>
            <span className="font-bold w-6 text-center">{d.people}</span>
            <button type="button" onClick={() => set('people', Math.min(20, d.people + 1))} className="w-8 h-8 rounded-full bg-ink text-white font-bold">+</button>
          </div>
        </div>
      )}
      <label className="block">{label(tx.services.note)}
        <input value={d.note} onChange={(e) => set('note', e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-sage" />
      </label>
      {s.price === null && <p className="text-[11px] text-muted-ink bg-muted/10 rounded-lg px-2 py-1">{tx.services.onRequest}</p>}
      {error && <p className="text-xs text-red-500">{tx.services.required}</p>}
      <button type="submit" className="w-full py-2.5 bg-ink text-white font-bold rounded-xl text-sm">{tx.services.request}</button>
    </form>
  );
}
