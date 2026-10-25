// Ekranlar arasında ortak kullanılan küçük bileşenler
import { CheckCircle, Star } from 'lucide-react';
import { LANGS } from '../data/i18n';
import { STATUS_STYLE } from '../lib/store';

export function LangSwitch({ lang, setLang, variant = 'pill' }) {
  if (variant === 'large') {
    return (
      <div className="flex justify-center gap-2">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${lang === l.code ? 'bg-lilac text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            {l.label}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="flex bg-gray-100 p-1 rounded-full text-xs font-bold">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-2 py-0.5 rounded-full transition ${lang === l.code ? 'bg-white shadow text-ink' : 'text-gray-500'}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export function Toast({ text }) {
  if (!text) return null;
  return (
    <div className="animate-fade-up fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-ink text-white text-sm px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 w-max max-w-[90vw]">
      <CheckCircle size={16} className="text-sage shrink-0" /> {text}
    </div>
  );
}

export function Chip({ active, onClick, children, tone = 'lilac' }) {
  const activeCls = {
    lilac: 'bg-lilac text-white border-lilac',
    peach: 'bg-peach text-ink border-peach',
    sage: 'bg-sage text-ink border-sage',
    ink: 'bg-ink text-white border-ink',
  }[tone];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${active ? activeCls : 'bg-white text-gray-600 border-gray-200 hover:border-lilac'}`}
    >
      {children}
    </button>
  );
}

export function StatusPill({ status, label }) {
  return (
    <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[status]}`}>
      {label}
    </span>
  );
}

export function Stars({ value, size = 14, onChange }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const icon = <Star size={size} className={n <= value ? 'fill-peach text-peach' : 'text-gray-300'} />;
        return onChange
          ? <button key={n} type="button" onClick={() => onChange(n)} aria-label={`${n}`} className="p-0.5">{icon}</button>
          : <span key={n}>{icon}</span>;
      })}
    </div>
  );
}

export function ScreenTitle({ title, sub, right }) {
  return (
    <div className="flex justify-between items-start gap-3">
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
      </div>
      {right}
    </div>
  );
}
