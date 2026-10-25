import { useState } from 'react';
import {
  Utensils, Compass, Bot, ConciergeBell, Heart, ShieldCheck, Wifi, Coffee, Clock, Phone, ChevronRight, Sparkles,
} from 'lucide-react';
import { hotel, campaign } from '../data/hotel';
import { menuItems } from '../data/menu';
import { routes } from '../data/routes';
import { L, timeOfDay } from '../lib/utils';
import { recordTitle } from '../lib/records';
import { StatusPill } from '../components/ui';

export default function Home({ tx, lang, room, records, go }) {
  const [now] = useState(() => new Date());
  const tod = timeOfDay(now);
  const hour = now.getHours();
  const mine = records.filter((r) => r.room === room && r.status !== 'done').slice(0, 3);

  // Günün saatine göre kişisel öneriler
  const recs = [];
  if (hour >= 7 && hour < 11) {
    const b = menuItems.find((m) => m.category === 'breakfast');
    recs.push({ label: tx.home.recBreakfast, title: L(b.name, lang), emoji: b.image, onClick: () => go('menu', { category: 'breakfast' }), tone: 'bg-peach/25' });
  }
  if (hour >= 16 && hour < 21) {
    const s = routes.find((r) => r.tags.includes('sunset'));
    recs.push({ label: tx.home.recSunset, title: L(s.title, lang), emoji: '🌅', onClick: () => go('explore', { routeId: s.id }), tone: 'bg-pink/25' });
  } else {
    const f = routes.find((r) => r.featured) || routes[0];
    recs.push({ label: tx.home.recRoute, title: L(f.title, lang), emoji: '🏛️', onClick: () => go('explore', { routeId: f.id }), tone: 'bg-lilac/20' });
  }
  if (hour >= 17) {
    const c = menuItems.find((m) => m.tags.includes('chef'));
    recs.push({ label: tx.home.recDinner, title: L(c.name, lang), emoji: c.image, onClick: () => go('menu', { category: c.category }), tone: 'bg-peach/25' });
  }

  const tiles = [
    { tab: 'menu', icon: Utensils, bg: 'bg-peach/25' },
    { tab: 'explore', icon: Compass, bg: 'bg-lilac/25' },
    { tab: 'ai', icon: Bot, bg: 'bg-pink/25' },
    { tab: 'services', icon: ConciergeBell, bg: 'bg-sage/40' },
    { tab: 'reviews', icon: Heart, bg: 'bg-pink/20' },
    { tab: 'staff', icon: ShieldCheck, bg: 'bg-muted/20' },
  ];

  return (
    <div className="space-y-5">
      {/* Hero: Soft Lilac → Dusty Pink */}
      <div className="bg-linear-to-br from-lilac/40 to-pink/35 p-6 rounded-3xl border border-lilac/20">
        <span className="text-[11px] uppercase tracking-wider font-bold text-lilac-ink bg-white/60 px-3 py-1 rounded-full">{L(hotel.area, lang)}</span>
        <p className="text-sm text-gray-700 mt-4">{tx.home.greeting[tod]} 👋</p>
        <h2 className="text-xl font-bold mt-0.5">{tx.home.welcome}</h2>
        <p className="text-sm text-gray-700 mt-1">{tx.home.subWelcome}</p>
      </div>

      {/* Aktif sipariş ve talepler (personel durum değiştirince canlı güncellenir) */}
      {mine.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          {mine.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="text-sm font-medium truncate">{recordTitle(r, lang)}</span>
              <StatusPill status={r.status} label={tx.status[r.status]} />
            </div>
          ))}
        </div>
      )}

      {/* Özel kampanya: Deep Blue */}
      <div className="bg-deep text-white rounded-3xl p-5 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10" />
        <span className="text-[11px] uppercase tracking-wider font-bold text-white/70 flex items-center gap-1"><Sparkles size={12} /> {tx.home.campaign}</span>
        <h3 className="font-bold text-lg mt-1">{L(campaign.title, lang)}</h3>
        <p className="text-sm text-white/80 mt-1">{L(campaign.desc, lang)}</p>
        <button onClick={() => go('services', { service: 'table', venue: 'rooftop' })} className="mt-3 bg-white text-deep text-xs font-bold px-4 py-2 rounded-xl">
          {L(campaign.cta, lang)}
        </button>
      </div>

      {/* Kişisel öneriler */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold">{tx.home.forYou}</h3>
        {recs.map((r) => (
          <button key={r.label} onClick={r.onClick} className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-3 flex items-center gap-3 text-left hover:border-lilac transition">
            <span className={`w-11 h-11 rounded-xl ${r.tone} flex items-center justify-center text-xl shrink-0`}>{r.emoji}</span>
            <span className="flex-1 min-w-0">
              <span className="block text-[11px] text-gray-500">{r.label}</span>
              <span className="block text-sm font-semibold truncate">{r.title}</span>
            </span>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
        ))}
      </div>

      {/* Hızlı erişim */}
      <div className="grid grid-cols-3 gap-2.5">
        {tiles.map(({ tab, icon: Icon, bg }) => (
          <button key={tab} onClick={() => go(tab)} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start gap-2 hover:border-lilac transition text-left">
            <div className={`p-2.5 ${bg} rounded-xl`}><Icon size={20} /></div>
            <span className="font-semibold text-xs leading-tight">{tx.home.tiles[tab]}</span>
          </button>
        ))}
      </div>

      {/* Otel bilgileri */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="text-sm font-bold mb-3">{tx.home.info}</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <Info icon={Wifi} label={tx.home.wifi} value={`${hotel.wifi.name} · ${hotel.wifi.password}`} />
          <Info icon={Coffee} label={tx.home.breakfast} value={hotel.breakfast} />
          <Info icon={Clock} label={tx.home.checkout} value={hotel.checkOut} />
          <Info icon={Phone} label={tx.home.reception} value={L(hotel.reception, lang)} />
        </div>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-2">
      <Icon size={16} className="text-muted shrink-0 mt-0.5" />
      <div className="min-w-0">
        <div className="text-gray-500">{label}</div>
        <div className="font-semibold break-words">{value}</div>
      </div>
    </div>
  );
}
