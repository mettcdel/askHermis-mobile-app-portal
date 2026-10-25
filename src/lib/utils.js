// Küçük yardımcı fonksiyonlar

// Çok dilli alanı seçili dilde döndürür: L({TR:'a', EN:'b'}, 'EN') → 'b'
export const L = (obj, lang) => (obj ? obj[lang] ?? obj.EN ?? obj.TR ?? '' : '');

export const formatPrice = (n) => `${n.toFixed(2)} €`;

export const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// Metni karşılaştırma için sadeleştirir: küçük harf, Türkçe/Yunanca aksanlar kaldırılır.
export const normalize = (s) => s
  .toLocaleLowerCase('tr')
  .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c')
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/ς/g, 'σ')
  .replace(/[^\p{L}\p{N}:.\s-]/gu, ' ')
  .replace(/\s+/g, ' ')
  .trim();

export const timeOfDay = (d = new Date()) => {
  const h = d.getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
};

export const formatTime = (ts, locale) =>
  new Date(ts).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
