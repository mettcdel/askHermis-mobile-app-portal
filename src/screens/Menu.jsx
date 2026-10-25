import { useRef, useState } from 'react';
import { Minus, Plus, Clock } from 'lucide-react';
import { menuCategories, menuItems, tagLabels, allergenLabels } from '../data/menu';
import { L, formatPrice } from '../lib/utils';
import { findItem, orderTotal } from '../lib/records';
import { Chip, ScreenTitle } from '../components/ui';

const DIET_FILTERS = ['vegan', 'vegetarian', 'glutenFree'];

export default function Menu({ tx, lang, cart, setCart, cartNote, setCartNote, onCheckout, initialCategory }) {
  const [category, setCategory] = useState(initialCategory || 'all');
  const [diet, setDiet] = useState(null);
  const cartRef = useRef(null);

  const items = menuItems.filter((i) =>
    (category === 'all' || i.category === category) && (!diet || i.tags.includes(diet)));

  const qtyOf = (id) => cart.find((c) => c.id === id)?.qty ?? 0;
  const change = (id, delta) => setCart((prev) => {
    const exists = prev.find((c) => c.id === id);
    if (!exists) return delta > 0 ? [...prev, { id, qty: 1 }] : prev;
    return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c)).filter((c) => c.qty > 0);
  });

  const count = cart.reduce((s, c) => s + c.qty, 0);
  const total = orderTotal(cart);

  return (
    <div className="space-y-4">
      <ScreenTitle title={tx.menu.title} sub={<span className="flex items-center gap-1"><Clock size={12} /> {tx.menu.eta}</span>} />

      {/* Kategoriler */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
        <Chip active={category === 'all'} onClick={() => setCategory('all')} tone="ink">{tx.menu.all}</Chip>
        {menuCategories.map((c) => (
          <Chip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)} tone="ink">{L(c.name, lang)}</Chip>
        ))}
      </div>
      {/* Diyet filtreleri */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
        {DIET_FILTERS.map((d) => (
          <Chip key={d} active={diet === d} onClick={() => setDiet(diet === d ? null : d)} tone="sage">
            {tagLabels[d].emoji} {L(tagLabels[d], lang)}
          </Chip>
        ))}
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const q = qtyOf(item.id);
          return (
            <div key={item.id} className="bg-white p-3 rounded-2xl border border-gray-100 flex gap-3 shadow-sm">
              <div className="w-16 h-16 rounded-xl bg-peach/25 flex items-center justify-center text-3xl shrink-0">
                {item.image?.startsWith('/') ? <img src={item.image} alt="" className="w-full h-full object-cover rounded-xl" /> : item.image}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1">
                  <h3 className="font-bold text-sm mr-1">{L(item.name, lang)}</h3>
                  {item.tags.map((tg) => (
                    <span key={tg} title={L(tagLabels[tg], lang)} className="text-[10px] bg-sage/40 text-sage-ink px-1.5 py-0.5 rounded-full font-semibold">
                      {tagLabels[tg].emoji} {L(tagLabels[tg], lang)}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{L(item.desc, lang)}</p>
                {item.allergens.length > 0 && (
                  <p className="text-[10px] text-gray-400 mt-1">{tx.menu.allergens}: {item.allergens.map((a) => L(allergenLabels[a], lang)).join(', ')}</p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-lilac-ink">{formatPrice(item.price)}</span>
                  {q === 0 ? (
                    <button onClick={() => change(item.id, 1)} className="bg-ink text-white px-3 py-1.5 rounded-xl text-xs font-medium hover:bg-gray-800 active:scale-95 transition">
                      {tx.menu.add}
                    </button>
                  ) : (
                    <Stepper qty={q} onMinus={() => change(item.id, -1)} onPlus={() => change(item.id, 1)} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {cart.length > 0 && (
        <div ref={cartRef} className="bg-white p-4 rounded-2xl border border-lilac/50 shadow-md space-y-3 scroll-mt-20">
          <h3 className="font-bold text-sm">{tx.menu.cartTitle}</h3>
          <div className="space-y-2">
            {cart.map((c) => {
              const item = findItem(c.id);
              return (
                <div key={c.id} className="flex justify-between items-center text-xs gap-2">
                  <span className="flex-1 text-gray-700">{L(item.name, lang)}</span>
                  <Stepper qty={c.qty} onMinus={() => change(c.id, -1)} onPlus={() => change(c.id, 1)} small />
                  <span className="w-16 text-right font-medium">{formatPrice(item.price * c.qty)}</span>
                </div>
              );
            })}
          </div>
          <input
            value={cartNote}
            onChange={(e) => setCartNote(e.target.value)}
            placeholder={tx.menu.notePlaceholder}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-lilac"
          />
          <div className="flex justify-between text-sm font-bold border-t border-gray-100 pt-2">
            <span>{tx.total}</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button onClick={onCheckout} className="w-full py-2.5 bg-lilac text-white font-bold rounded-xl text-sm shadow hover:brightness-95 transition">
            {tx.menu.confirmOrder}
          </button>
        </div>
      )}

      {/* Sepet çubuğu: sepete gitmek için */}
      {count > 0 && (
        <button
          onClick={() => cartRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[calc(28rem-2rem)] z-30 bg-ink text-white rounded-2xl px-4 py-3 flex justify-between items-center shadow-xl text-sm"
        >
          <span className="font-semibold">{tx.menu.cartBadge(count)}</span>
          <span className="flex items-center gap-2">{formatPrice(total)} <span className="text-xs bg-white/15 px-2 py-0.5 rounded-lg">{tx.menu.viewCart}</span></span>
        </button>
      )}
      {count > 0 && <div className="h-12" />}
    </div>
  );
}

function Stepper({ qty, onMinus, onPlus, small }) {
  const s = small ? 'w-6 h-6' : 'w-7 h-7';
  return (
    <div className="flex items-center gap-2">
      <button onClick={onMinus} aria-label="-" className={`${s} rounded-full bg-gray-100 flex items-center justify-center`}><Minus size={14} /></button>
      <span className="text-sm font-bold w-4 text-center">{qty}</span>
      <button onClick={onPlus} aria-label="+" className={`${s} rounded-full bg-ink text-white flex items-center justify-center`}><Plus size={14} /></button>
    </div>
  );
}
