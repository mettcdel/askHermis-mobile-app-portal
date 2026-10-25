import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { sampleReviews } from '../data/reviews';
import { summarize, detectTopics } from '../lib/reviewSummary';
import { Stars, ScreenTitle } from '../components/ui';

export default function Reviews({ tx, lang, room, userReviews, setUserReviews, showToast }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const all = [...userReviews, ...sampleReviews];
  const sum = summarize(all, lang, tx);

  const submit = (e) => {
    e.preventDefault();
    if (!rating) { setError(true); return; }
    const review = {
      id: `u-${Date.now()}`, user: true, room, name: `${tx.room} ${room}`, country: '', rating, lang,
      date: new Date().toISOString().slice(0, 10), text: text.trim(), topics: detectTopics(text),
    };
    setUserReviews((prev) => [review, ...prev]);
    setRating(0);
    setText('');
    showToast(tx.reviews.thanks);
  };

  return (
    <div className="space-y-4">
      <ScreenTitle title={tx.reviews.title} sub={tx.reviews.sub} />

      {/* Puan özeti + AI özet: lila → pembe */}
      <div className="bg-linear-to-br from-lilac/35 to-pink/30 rounded-3xl p-5 border border-lilac/20 space-y-3">
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold">{sum.avg.toFixed(1)}</span>
          <div className="pb-1">
            <Stars value={Math.round(sum.avg)} />
            <div className="text-[11px] text-gray-600 mt-0.5">{tx.reviews.count(sum.count)}</div>
          </div>
        </div>
        <div className="bg-white/70 rounded-2xl p-3">
          <div className="text-xs font-bold flex items-center gap-1"><Sparkles size={13} className="text-lilac-ink" /> {tx.reviews.aiTitle}</div>
          {sum.lines.map((l) => <p key={l} className="text-sm mt-1.5">{l}</p>)}
          <p className="text-[10px] text-gray-500 mt-2">{tx.reviews.aiNote}</p>
        </div>
      </div>

      {/* Yorum yaz */}
      <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
        <div className="text-sm font-bold">{tx.reviews.write}</div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{tx.reviews.rate}</span>
          <Stars value={rating} size={24} onChange={(n) => { setRating(n); setError(false); }} />
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder={tx.reviews.placeholder}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-lilac resize-none"
        />
        {error && <p className="text-xs text-red-500">{tx.reviews.needRating}</p>}
        <button type="submit" className="w-full py-2.5 bg-ink text-white font-bold rounded-xl text-sm">{tx.reviews.submit}</button>
      </form>

      {/* Yorum listesi */}
      <div className="space-y-2">
        {all.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-semibold">{r.country} {r.user ? tx.reviews.you : r.name}</div>
              <Stars value={r.rating} size={12} />
            </div>
            {r.text && <p className="text-xs text-gray-600 mt-1.5">{r.text}</p>}
            <div className="flex justify-between mt-2 text-[10px] text-gray-400">
              <span>{r.date}</span>
              {!r.user && <span className="bg-gray-100 px-1.5 py-0.5 rounded">{tx.reviews.sample}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
