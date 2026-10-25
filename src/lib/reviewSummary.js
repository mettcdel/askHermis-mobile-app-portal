// =============================================================
//  AI YORUM ÖZETİ
//  Yorumlardaki konuları sayar, en çok övülen ve şikâyet edilen
//  konulardan kısa bir özet cümlesi kurar. Kural tabanlıdır; uydurma
//  bilgi eklemez, sadece yorumlarda geçen konuları kullanır.
// =============================================================
import { topicLabels } from '../data/reviews';
import { L, normalize } from './utils';

// Kullanıcının yazdığı yorumdan konu çıkarmak için kelimeler
const TOPIC_WORDS = {
  location: ['konum', 'merkez', 'yakin', 'location', 'central', 'walking distance', 'τοποθεσια', 'κοντα'],
  breakfast: ['kahvalti', 'breakfast', 'πρωινο'],
  staff: ['personel', 'calisan', 'ilgili', 'staff', 'friendly', 'helpful', 'προσωπικο', 'ευγενικ'],
  rooftop: ['teras', 'rooftop', 'manzara', 'view', 'ταρατσα', 'θεα'],
  clean: ['temiz', 'clean', 'καθαρ'],
  concierge: ['uygulama', 'asistan', 'app', 'concierge', 'εφαρμογη'],
  noise: ['gurultu', 'noise', 'noisy', 'loud', 'θορυβ'],
  smallRoom: ['kucuk', 'dar', 'small', 'tiny', 'μικρ'],
  slowService: ['gec geldi', 'yavas', 'bekledik', 'slow', 'late', 'αργησ', 'αργο'],
};

export const detectTopics = (text) => {
  const n = normalize(text);
  return Object.entries(TOPIC_WORDS).filter(([, words]) => words.some((w) => n.includes(normalize(w)))).map(([k]) => k);
};

const joinList = (arr, and) => (arr.length <= 1 ? arr.join('') : `${arr.slice(0, -1).join(', ')} ${and} ${arr[arr.length - 1]}`);

export function summarize(reviews, lang, tx) {
  const counts = {};
  reviews.forEach((r) => r.topics.forEach((tp) => { counts[tp] = (counts[tp] || 0) + 1; }));
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const pos = sorted.filter(([k]) => topicLabels[k]?.positive).slice(0, 3).map(([k]) => L(topicLabels[k], lang));
  const neg = sorted.filter(([k, c]) => topicLabels[k] && !topicLabels[k].positive && c >= 1).slice(0, 2).map(([k]) => L(topicLabels[k], lang));
  const lines = [];
  if (pos.length) lines.push(tx.reviews.praise(joinList(pos, tx.reviews.and)));
  if (neg.length) lines.push(tx.reviews.complain(joinList(neg, tx.reviews.and)));
  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  return { lines, avg, count: reviews.length, topTopics: sorted.slice(0, 5) };
}
