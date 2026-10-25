import { useEffect, useRef, useState } from 'react';
import { Bot, Send, Check, X, Clock, Footprints, Map } from 'lucide-react';
import { reply } from '../lib/concierge';
import { routes, mapsRouteUrl } from '../data/routes';
import { L, formatPrice, uid } from '../lib/utils';
import { findItem } from '../lib/records';

// messages / setMessages / flow App'te tutulur: sekme değişince sohbet kaybolmaz
export default function Concierge({ tx, lang, messages, setMessages, flow, setFlow, onCreateRecord, go }) {
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const lastPendingId = [...messages].reverse().find((m) => m.kind === 'confirm' && m.status === 'pending')?.id;

  const resolveConfirm = (id, ok) => {
    const msg = messages.find((m) => m.id === id);
    if (!msg || msg.status !== 'pending') return;
    if (ok) onCreateRecord(msg.record);
    setMessages((prev) => [
      ...prev.map((m) => (m.id === id ? { ...m, status: ok ? 'done' : 'cancelled' } : m)),
      { id: uid(), from: 'ai', kind: 'text', text: ok ? tx.ai.done : tx.ai.cancelled },
    ]);
    setFlow(null);
  };

  const send = (textIn) => {
    const text = textIn.trim();
    if (!text || typing) return;
    setMessages((prev) => [...prev, { id: uid(), from: 'user', kind: 'text', text }]);
    setInput('');
    const res = reply(text, lang, flow);

    if (res.action && lastPendingId) {
      setTimeout(() => resolveConfirm(lastPendingId, res.action === 'confirm'), 300);
      return;
    }
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        // yeni bir onay kartı gelirse eski bekleyen kartı iptal say
        ...prev.map((m) => (m.kind === 'confirm' && m.status === 'pending' && res.messages.some((x) => x.kind === 'confirm') ? { ...m, status: 'cancelled' } : m)),
        ...res.messages.map((m) => ({ ...m, id: uid(), from: 'ai' })),
      ]);
      setFlow(res.flow);
    }, 650);
  };

  const welcome = { id: 'welcome', from: 'ai', kind: 'text', text: tx.ai.welcome, chips: tx.ai.chips.map((c) => ({ label: c, value: c })) };
  const all = [welcome, ...messages];
  const lastId = all[all.length - 1].id;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 flex flex-col h-[calc(100dvh-10.5rem)] shadow-sm">
      <div className="p-3 border-b border-gray-100 bg-linear-to-r from-lilac/20 to-pink/20 rounded-t-2xl flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center"><Bot size={18} /></div>
        <div>
          <div className="font-bold text-sm">{tx.ai.title}</div>
          <div className="text-[10px] text-gray-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> TR · EN · ΕΛ</div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {all.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.from === 'user' ? 'items-end' : 'items-start'}`}>
            {m.kind === 'text' && <Bubble from={m.from}>{m.text}</Bubble>}

            {m.kind === 'confirm' && (
              <div className="max-w-[88%] w-full bg-white border border-lilac/60 rounded-2xl rounded-bl-none p-3 shadow-sm space-y-2">
                <div className="text-xs font-semibold">{m.text}</div>
                <ul className="text-xs text-gray-700 space-y-0.5">
                  {m.lines.map((l) => <li key={l}>{l}</li>)}
                </ul>
                {m.total != null && <div className="text-xs font-bold border-t border-gray-100 pt-1.5 flex justify-between"><span>{tx.total}</span><span>{formatPrice(m.total)}</span></div>}
                {m.note && <div className="text-[11px] text-muted-ink bg-muted/10 rounded-lg px-2 py-1">{m.note}</div>}
                {m.status === 'pending' ? (
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => resolveConfirm(m.id, true)} className="flex-1 bg-ink text-white text-xs font-semibold py-2 rounded-xl flex items-center justify-center gap-1"><Check size={14} />{tx.confirm}</button>
                    <button onClick={() => resolveConfirm(m.id, false)} className="flex-1 bg-gray-100 text-xs font-semibold py-2 rounded-xl flex items-center justify-center gap-1"><X size={14} />{tx.cancel}</button>
                  </div>
                ) : (
                  <div className={`text-[11px] font-semibold ${m.status === 'done' ? 'text-sage-ink' : 'text-gray-400'}`}>
                    {m.status === 'done' ? `✓ ${tx.confirm}` : `✕ ${tx.cancel}`}
                  </div>
                )}
              </div>
            )}

            {m.kind === 'route' && <RouteCard m={m} tx={tx} lang={lang} go={go} />}

            {m.kind === 'menu' && (
              <div className="max-w-[88%] w-full space-y-1.5">
                <Bubble from="ai">{m.text}</Bubble>
                {m.itemIds.map((id) => {
                  const it = findItem(id);
                  return (
                    <button key={id} onClick={() => send(`1 ${L(it.name, lang)}`)} className="w-full bg-white border border-gray-100 rounded-xl p-2 flex items-center gap-2 text-left hover:border-lilac">
                      <span className="text-xl">{it.image}</span>
                      <span className="flex-1 text-xs font-semibold">{L(it.name, lang)}</span>
                      <span className="text-xs text-lilac-ink font-bold">{formatPrice(it.price)}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Hızlı cevap butonları sadece son mesajda */}
            {m.chips && m.id === lastId && (
              <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                {m.chips.map((c) => (
                  <button key={c.label} onClick={() => send(c.value)} className="text-[11px] px-2.5 py-1 rounded-full border border-lilac/60 text-lilac-ink bg-lilac/10 hover:bg-lilac/20">
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {typing && <Bubble from="ai"><span className="text-gray-400">{tx.ai.typing}</span></Bubble>}
        <div ref={endRef} />
      </div>

      <form className="p-3 border-t border-gray-100 flex gap-2" onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <input
          type="text"
          placeholder={tx.ai.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-lilac"
        />
        <button type="submit" aria-label={tx.send} className="bg-ink text-white p-2.5 rounded-xl disabled:opacity-40" disabled={!input.trim() || typing}>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

function Bubble({ from, children }) {
  return (
    <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs whitespace-pre-line wrap-break-word ${from === 'user' ? 'bg-ink text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
      {children}
    </div>
  );
}

function RouteCard({ m, tx, lang, go }) {
  const r = routes.find((x) => x.id === m.routeId);
  return (
    <div className="max-w-[88%] w-full space-y-1.5">
      <Bubble from="ai">{m.text}</Bubble>
      <div className="bg-white border border-peach rounded-2xl p-3 space-y-2">
        <div className="font-bold text-sm">{L(r.title, lang)}</div>
        <div className="text-xs text-gray-600">{L(r.desc, lang)}</div>
        <div className="flex gap-2 text-[11px]">
          <span className="bg-peach/30 text-peach-ink px-2 py-0.5 rounded-full flex items-center gap-1"><Clock size={11} />{tx.hours(r.hours)}</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1"><Footprints size={11} />{tx.explore.walk(r.walkKm)}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => go('explore', { routeId: r.id })} className="flex-1 text-xs font-semibold bg-peach/30 py-1.5 rounded-xl">{tx.explore.title}</button>
          <a href={mapsRouteUrl(r.stops)} target="_blank" rel="noreferrer" className="flex-1 text-xs font-semibold bg-ink text-white py-1.5 rounded-xl flex items-center justify-center gap-1"><Map size={12} />Maps</a>
        </div>
      </div>
      <div className="text-[11px] text-gray-400 px-1">{tx.ai.routeMore}</div>
    </div>
  );
}
