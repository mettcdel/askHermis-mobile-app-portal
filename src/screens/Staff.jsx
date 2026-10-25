import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Utensils, ConciergeBell, RotateCcw, QrCode } from 'lucide-react';
import { LANGS } from '../data/i18n';
import { recordTitle, recordDetails } from '../lib/records';
import { nextStatus, seedRecords } from '../lib/store';
import { formatTime } from '../lib/utils';
import { Chip, StatusPill, ScreenTitle } from '../components/ui';

export default function Staff({ tx, lang, records, setRecords }) {
  const [tab, setTab] = useState('all');
  const [qrRoom, setQrRoom] = useState('302');
  const [qrUrl, setQrUrl] = useState('');
  const locale = LANGS.find((l) => l.code === lang).locale;

  const list = records
    .filter((r) => tab === 'all' || (tab === 'orders' ? r.type === 'order' : r.type === 'request'))
    .sort((a, b) => b.createdAt - a.createdAt);
  const openCount = records.filter((r) => r.status !== 'done').length;

  const link = `${window.location.origin}${window.location.pathname}?room=${encodeURIComponent(qrRoom)}&lang=${lang}`;
  const validRoom = /^\d{1,4}$/.test(qrRoom);
  useEffect(() => {
    if (!validRoom) return;
    QRCode.toDataURL(link, { margin: 1, width: 220, color: { dark: '#0A0A0A', light: '#FFFFFF' } }).then(setQrUrl).catch(() => setQrUrl(''));
  }, [link, validRoom]);

  const advance = (id) => setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, status: nextStatus(r) } : r)));

  return (
    <div className="space-y-4">
      <ScreenTitle
        title={tx.staff.title}
        sub={tx.staff.hint}
        right={<span className="shrink-0 text-[11px] font-semibold text-sage-ink bg-sage/40 px-2 py-1 rounded-full flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />{tx.staff.live}</span>}
      />

      <div className="flex items-center gap-2">
        {Object.entries(tx.staff.tabs).map(([k, v]) => <Chip key={k} tone="ink" active={tab === k} onClick={() => setTab(k)}>{v}</Chip>)}
        <span className="ml-auto text-xs font-semibold text-lilac-ink">{tx.staff.open(openCount)}</span>
      </div>

      <div className="space-y-2">
        {list.length === 0 && <p className="text-sm text-gray-500">{tx.staff.empty}</p>}
        {list.map((r) => {
          const Icon = r.type === 'order' ? Utensils : ConciergeBell;
          return (
            <button
              key={r.id}
              onClick={() => advance(r.id)}
              className={`w-full text-left bg-white p-3.5 rounded-2xl border shadow-sm flex gap-3 items-start transition hover:border-lilac ${r.status === 'new' ? 'border-lilac/70' : 'border-gray-100'} ${r.status === 'done' ? 'opacity-60' : ''}`}
            >
              <div className={`p-2 rounded-xl shrink-0 ${r.type === 'order' ? 'bg-peach/30' : 'bg-sage/40'}`}><Icon size={18} /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <span className="bg-lilac/20 text-ink px-1.5 py-0.5 rounded font-bold">{tx.room} {r.room}</span>
                  <span>{formatTime(r.createdAt, locale)}</span>
                </div>
                <div className="font-bold text-sm mt-1">{recordTitle(r, lang)}</div>
                <div className="text-xs text-gray-500 mt-0.5">{recordDetails(r, lang, tx)}</div>
              </div>
              <StatusPill status={r.status} label={tx.status[r.status]} />
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-gray-400">{tx.staff.syncNote}</p>
      <button onClick={() => setRecords(seedRecords())} className="text-xs text-gray-500 flex items-center gap-1 hover:text-ink">
        <RotateCcw size={12} /> {tx.staff.reset}
      </button>

      {/* Oda QR kodu üretici */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
        <div className="text-sm font-bold flex items-center gap-1.5"><QrCode size={16} /> {tx.staff.qrTitle}</div>
        <p className="text-xs text-gray-500">{tx.staff.qrDesc}</p>
        <label className="flex items-center gap-2 text-xs">
          {tx.staff.qrRoom}
          <input value={qrRoom} onChange={(e) => setQrRoom(e.target.value.trim())} inputMode="numeric" className="w-24 px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-lilac" />
        </label>
        {validRoom && qrUrl && (
          <div className="flex flex-col items-center gap-2">
            <img src={qrUrl} alt="QR" className="w-44 h-44" />
            <a href={link} target="_blank" rel="noreferrer" className="text-[10px] text-muted-ink break-all text-center">{link}</a>
          </div>
        )}
      </div>
    </div>
  );
}
