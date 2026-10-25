import { useState } from 'react';
import { MapPin, Clock, Footprints, ExternalLink, ChevronRight, Lightbulb, Map } from 'lucide-react';
import { routes, routeTags, mapsRouteUrl, mapsSearchUrl } from '../data/routes';
import { L } from '../lib/utils';
import { Chip, ScreenTitle } from '../components/ui';

export default function Explore({ tx, lang, initialRouteId }) {
  const [tags, setTags] = useState([]);
  const [open, setOpen] = useState(initialRouteId || null);

  const toggle = (tg) => setTags((prev) => (prev.includes(tg) ? prev.filter((x) => x !== tg) : [...prev, tg]));

  // Seçili tercihlerin hepsini içeren rotalar; öne çıkan en üstte
  const list = routes
    .filter((r) => tags.every((tg) => r.tags.includes(tg)))
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  return (
    <div className="space-y-4">
      <ScreenTitle title={tx.explore.title} sub={tx.explore.sub} />

      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
        <Chip active={tags.length === 0} onClick={() => setTags([])} tone="peach">{tx.explore.filterAll}</Chip>
        {Object.entries(routeTags).map(([k, v]) => (
          <Chip key={k} active={tags.includes(k)} onClick={() => toggle(k)} tone="peach">{v.emoji} {L(v, lang)}</Chip>
        ))}
      </div>

      {list.length === 0 && <p className="text-sm text-gray-500">{tx.explore.none}</p>}

      <div className="space-y-3">
        {list.map((r) => {
          const isOpen = open === r.id;
          return (
            <div key={r.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition ${isOpen ? 'border-peach' : 'border-gray-100'}`}>
              <button onClick={() => setOpen(isOpen ? null : r.id)} className="w-full text-left p-4 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-sm flex items-center gap-1.5">
                    <MapPin size={16} className="text-peach-ink shrink-0" />{L(r.title, lang)}
                  </h3>
                  <ChevronRight size={18} className={`text-gray-300 shrink-0 transition ${isOpen ? 'rotate-90' : ''}`} />
                </div>
                <p className="text-xs text-gray-600">{L(r.desc, lang)}</p>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {r.featured && <span className="bg-deep text-white px-2 py-0.5 rounded-full font-semibold">{tx.explore.featured}</span>}
                  <span className="bg-peach/30 text-peach-ink px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"><Clock size={11} />{tx.hours(r.hours)}</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1"><Footprints size={11} />{tx.explore.walk(r.walkKm)}</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full">{tx.explore.stops(r.stops.length)}</span>
                  {r.tags.map((tg) => <span key={tg} className="px-1 py-0.5">{routeTags[tg].emoji}</span>)}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-3">
                  <ol className="relative border-l-2 border-peach/50 ml-2 space-y-3">
                    {r.stops.map((s, i) => (
                      <li key={s.place} className="ml-4">
                        <span className="absolute -left-[9px] w-4 h-4 rounded-full bg-peach text-[9px] font-bold flex items-center justify-center">{i + 1}</span>
                        <div className="flex justify-between items-center gap-2">
                          <div>
                            <div className="text-sm font-semibold">{L(s.name, lang)}</div>
                            <div className="text-[11px] text-gray-500">{tx.minutes(s.minutes)}</div>
                          </div>
                          <a href={mapsSearchUrl(s.place)} target="_blank" rel="noreferrer" className="text-[11px] text-muted-ink flex items-center gap-1 shrink-0">
                            {tx.explore.openStop} <ExternalLink size={11} />
                          </a>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="bg-peach/15 rounded-xl p-3 text-xs flex gap-2">
                    <Lightbulb size={14} className="text-peach-ink shrink-0 mt-0.5" />
                    <span><b>{tx.explore.tip}:</b> {L(r.tip, lang)}</span>
                  </div>
                  <a href={mapsRouteUrl(r.stops)} target="_blank" rel="noreferrer" className="w-full py-2.5 bg-ink text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                    <Map size={16} /> {tx.explore.openRoute}
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
