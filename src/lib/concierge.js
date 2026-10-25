// =============================================================
//  AI CONCIERGE BEYNİ (kural tabanlı, internet / API gerektirmez)
//
//  Davranış kuralları (Üye 2'nin AI davranış dokümanıyla aynı olmalı):
//   1. Sipariş ve hizmet taleplerini personele göndermeden ÖNCE onay ister.
//   2. Fiyatı sadece menüden alır; transfer gibi fiyatı belli olmayan
//      hizmetlerde fiyat uydurmaz ("resepsiyon onaylar" der).
//   3. Eksik bilgi varsa (saat, kişi sayısı, varış yeri) tek tek sorar.
//   4. Anlamadığında tahmin yürütmez, seçenek sunar.
//   5. Yazım hatalarını (1 harf) ve Türkçe/Yunanca aksansız yazımı tolere eder.
//   6. Rota önerisini kullanıcının tercih kelimelerine göre yapar.
//
//  Gerçek bir LLM bağlanacaksa: reply() fonksiyonunun yerine API çağrısı
//  konur, bu kurallar da sistem talimatı olarak verilir.
// =============================================================
import { menuItems } from '../data/menu';
import { faq, services } from '../data/hotel';
import { routes, routeTags } from '../data/routes';
import { t } from '../data/i18n';
import { L, normalize, formatPrice } from './utils';
import { recordDetails, findItem } from './records';

// ---------- metin eşleştirme ----------
const lev = (a, b) => {
  if (Math.abs(a.length - b.length) > 1) return 2;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return dp[a.length][b.length];
};

const tokenize = (norm) => norm.split(' ').filter(Boolean);

// Mesajda anahtar kelime geçiyor mu? Geçiyorsa kelimenin sırasını döndürür, yoksa -1.
const findKeyword = (norm, tokens, kw) => {
  const k = normalize(kw);
  if (!k) return -1;
  if (k.includes(' ')) {
    const idx = norm.indexOf(k);
    return idx === -1 ? -1 : norm.slice(0, idx).split(' ').filter(Boolean).length;
  }
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (k.length < 4) { if (tok === k) return i; continue; } // kısa kelimeler birebir eşleşmeli
    if (tok.startsWith(k)) return i;
    if (k.length >= 6 && tok.startsWith(k.slice(0, -1))) return i; // ek / ünsüz yumuşaması
    if (k.length >= 5 && tok.length >= 5 && lev(tok, k) <= 1) return i; // 1 harf yazım hatası
  }
  return -1;
};

const hasAny = (norm, tokens, list) => list.some((kw) => findKeyword(norm, tokens, kw) !== -1);

const NUM_WORDS = {
  bir: 1, one: 1, a: 1, an: 1, ενα: 1, μια: 1, iki: 2, two: 2, δυο: 2, δυο2: 2, uc: 3, three: 3, τρια: 3,
  dort: 4, four: 4, τεσσερα: 4, bes: 5, five: 5, πεντε: 5,
};
const numAt = (tok) => (tok && /^\d{1,2}$/.test(tok) ? Number(tok) : NUM_WORDS[tok]);

// ---------- kelime listeleri ----------
const W = {
  yes: ['evet', 'tamam', 'onayla', 'onayliyorum', 'olur', 'yes', 'yep', 'ok', 'okay', 'sure', 'confirm', 'ναι', 'ενταξει', 'βεβαια'],
  no: ['hayir', 'iptal', 'vazgec', 'istemiyorum', 'no', 'nope', 'cancel', 'οχι', 'ακυρο', 'ακυρωσ'],
  greet: ['merhaba', 'selam', 'hello', 'hi', 'hey', 'γεια', 'καλημερα', 'καλησπερα'],
  thanks: ['tesekkur', 'sagol', 'thanks', 'thank', 'ευχαριστ'],
  order: ['siparis', 'order', 'getir', 'istiyorum', 'want', 'like', 'yemek', 'food', 'acim', 'hungry', 'παραγγελ', 'φαγητο', 'θελω', 'πειναω'],
  menu: ['menu', 'menü', 'ne var', 'what do you have', 'μενου'],
  vegan: ['vegan'],
  vegetarian: ['vejetaryen', 'vegetarian', 'χορτοφαγ'],
  glutenFree: ['glutensiz', 'gluten free', 'gluten-free', 'χωρις γλουτενη'],
  dessert: ['tatli', 'dessert', 'sweet', 'γλυκο', 'γλυκα'],
  drinks: ['icecek', 'drink', 'ποτο', 'ποτα'],
  route: ['rota', 'route', 'gezi', 'gezmek', 'gezilecek', 'gezelim', 'tour', 'sightsee', 'visit', 'things to do', 'what to do', 'nereye', 'διαδρομ', 'βολτα', 'αξιοθεατ'],
  price: ['fiyat', 'ucret', 'kac para', 'ne kadar', 'price', 'cost', 'how much', 'τιμη', 'ποσο κοστιζει'],
  tomorrow: ['yarin', 'tomorrow', 'αυριο'],
};

const TAG_WORDS = {
  history: ['tarih', 'antik', 'history', 'historic', 'ancient', 'akropolis', 'acropolis', 'ιστορ', 'αρχαι', 'ακροπολ'],
  food: ['yerel lezzet', 'street food', 'pazar', 'market', 'gastronomi', 'αγορα', 'γαστρονομ'],
  sunset: ['gun batimi', 'gunbatimi', 'sunset', 'manzara', 'view', 'ηλιοβασιλ', 'θεα'],
  family: ['aile', 'cocuk', 'family', 'kids', 'child', 'οικογεν', 'παιδι'],
  easy: ['az yuru', 'kisa', 'yorulmadan', 'easy', 'short', 'λιγο περπατ', 'ευκολ'],
  culture: ['muze', 'museum', 'sanat', 'art', 'kultur', 'culture', 'μουσει', 'πολιτισ', 'τεχνη'],
  nature: ['doga', 'nature', 'park', 'bahce', 'garden', 'φυση', 'παρκο', 'κηπο'],
};

const OPTION_WORDS = {
  destinations: {
    airport: ['havalimani', 'havaalani', 'airport', 'ucak', 'αεροδρομ'],
    piraeus: ['pire', 'piraeus', 'liman', 'port', 'feribot', 'ferry', 'πειραια', 'λιμαν'],
    city: ['sehir', 'city', 'merkez', 'center', 'centre', 'πολη', 'κεντρο'],
  },
  venues: {
    rooftop: ['teras', 'rooftop', 'roof', 'cati', 'ταρατσα'],
    restaurant: ['restoran', 'restaurant', 'εστιατοριο'],
  },
  items: {
    towel: ['havlu', 'towel', 'πετσετ'],
    pillow: ['yastik', 'pillow', 'μαξιλαρ'],
    blanket: ['battaniye', 'blanket', 'κουβερτ'],
    toiletries: ['banyo', 'sampuan', 'shampoo', 'toiletr', 'soap', 'sabun', 'σαπουν', 'σαμπουαν'],
  },
};

// Hangi hizmette hangi bilgiler sırayla sorulur
const FLOW_FIELDS = {
  cleaning: ['slot'],
  amenities: ['items'],
  transfer: ['destination', 'time', 'people'],
  table: ['venue', 'time', 'people'],
};

// ---------- ayrıştırıcılar ----------
const parseTime = (norm, bareNumberAllowed) => {
  let m = norm.match(/\b(\d{1,2})[:.](\d{2})\b/);
  if (m && Number(m[1]) < 24) return `${m[1].padStart(2, '0')}:${m[2]}`;
  m = norm.match(/\b(\d{1,2})\s*(am|pm)\b/);
  if (m) {
    let h = Number(m[1]) % 12;
    if (m[2] === 'pm') h += 12;
    return `${String(h).padStart(2, '0')}:00`;
  }
  m = norm.match(/\b(?:saat|at|στισ)\s*(\d{1,2})\b/);
  if (m && Number(m[1]) < 24) return `${m[1].padStart(2, '0')}:00`;
  if (bareNumberAllowed) {
    m = norm.match(/^(\d{1,2})$/);
    if (m && Number(m[1]) < 24) return `${m[1].padStart(2, '0')}:00`;
  }
  return null;
};

const parsePeople = (norm, bareNumberAllowed) => {
  let m = norm.match(/\b(\d{1,2})\s*(kisi|kisilik|people|person|persons|pax|guests|ατομα|ατομο)/);
  if (m) return Number(m[1]);
  m = norm.match(/\bfor\s*(\d{1,2})\b/);
  if (m) return Number(m[1]);
  if (bareNumberAllowed) {
    m = norm.match(/^(\d{1,2})$/);
    if (m) return Number(m[1]);
  }
  return null;
};

const matchOption = (norm, tokens, group) => {
  const entries = Object.entries(OPTION_WORDS[group]);
  const hit = entries.find(([, words]) => hasAny(norm, tokens, words));
  return hit ? hit[0] : null;
};

const dateStr = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// Mesajdan hizmet bilgilerini çıkarır (eksik olanları doldurur)
const fillFields = (serviceId, data, norm, tokens, asking) => {
  const next = { ...data };
  const s = services.find((x) => x.id === serviceId);
  if (serviceId === 'cleaning' && !next.slot) {
    const h = norm.match(/\b(\d{1,2})(?::\d{2})?\b/);
    if (h) {
      const hour = Number(h[1]);
      const slot = s.slots.find((sl) => {
        const [a, b] = sl.match(/\d{2}/g).filter((_, i) => i % 2 === 0).map(Number);
        return hour >= a && hour < b;
      });
      if (slot) next.slot = slot;
    }
  }
  if (serviceId === 'amenities') {
    const found = Object.entries(OPTION_WORDS.items).filter(([, w]) => hasAny(norm, tokens, w)).map(([id]) => id);
    if (found.length) next.items = [...new Set([...(next.items || []), ...found])];
  }
  if (serviceId === 'transfer' && !next.destination) next.destination = matchOption(norm, tokens, 'destinations');
  if (serviceId === 'table' && !next.venue) next.venue = matchOption(norm, tokens, 'venues');
  if ((serviceId === 'transfer' || serviceId === 'table')) {
    if (!next.time) next.time = parseTime(norm, asking === 'time');
    if (!next.people) next.people = parsePeople(norm, asking === 'people');
    if (hasAny(norm, tokens, W.tomorrow)) next.day = 1;
  }
  return next;
};

const missingField = (serviceId, data) =>
  FLOW_FIELDS[serviceId].find((f) => (f === 'items' ? !data.items?.length : !data[f]));

// ---------- mesaj oluşturucular ----------
const text = (txt, chips) => ({ kind: 'text', text: txt, chips });

const askFor = (serviceId, field, lang) => {
  const tx = t[lang].ai;
  const s = services.find((x) => x.id === serviceId);
  switch (field) {
    case 'slot': return text(tx.cleaningSlot, s.slots.map((v) => ({ label: v, value: v })));
    case 'items': return text(tx.amenitiesWhich, s.items.map((i) => ({ label: L(i.name, lang), value: L(i.name, lang) })));
    case 'destination': return text(tx.transferWhere, s.destinations.map((d) => ({ label: L(d.name, lang), value: L(d.name, lang) })));
    case 'venue': return text(tx.tableWhere, s.venues.map((v) => ({ label: L(v.name, lang), value: L(v.name, lang) })));
    case 'time': return text(tx.whatTime, (serviceId === 'table' ? ['19:00', '20:00', '21:00'] : ['08:00', '12:00', '18:00']).map((v) => ({ label: v, value: v })));
    case 'people': return text(tx.howMany, ['1', '2', '3', '4'].map((v) => ({ label: v, value: v })));
    default: return text(tx.fallback);
  }
};

const buildRequestRecord = (serviceId, data) => {
  const details = {};
  if (data.slot) details.slot = data.slot;
  if (data.items) details.items = data.items;
  if (data.destination) details.destination = data.destination;
  if (data.venue) details.venue = data.venue;
  if (data.time) details.datetime = `${dateStr(data.day || 0)} ${data.time}`;
  if (data.people) details.people = data.people;
  return { type: 'request', service: serviceId, details };
};

const confirmCard = (record, lang) => {
  const tx = t[lang];
  if (record.type === 'order') {
    const lines = record.items.map((i) => {
      const it = findItem(i.id);
      return `${i.qty}× ${L(it.name, lang)} — ${formatPrice(it.price * i.qty)}`;
    });
    const total = record.items.reduce((s, i) => s + findItem(i.id).price * i.qty, 0);
    return { kind: 'confirm', text: tx.ai.confirmOrder, lines, total, record, status: 'pending' };
  }
  const s = services.find((x) => x.id === record.service);
  const lines = [L(s.name, lang), recordDetails(record, lang, tx)].filter(Boolean);
  const note = s.price === null ? tx.ai.priceRule : null;
  return { kind: 'confirm', text: tx.ai.confirmRequest, lines, note, record, status: 'pending' };
};

const continueService = (serviceId, data, lang) => {
  const missing = missingField(serviceId, data);
  if (missing) return { messages: [askFor(serviceId, missing, lang)], flow: { service: serviceId, data, asking: missing } };
  const record = buildRequestRecord(serviceId, data);
  return { messages: [confirmCard(record, lang)], flow: { confirming: true } };
};

const menuPicks = (lang, filter) => {
  let items = menuItems;
  if (filter?.tag) items = items.filter((i) => i.tags.includes(filter.tag));
  if (filter?.category) items = items.filter((i) => i.category === filter.category);
  if (!filter) items = items.filter((i) => i.tags.includes('chef')).concat(menuItems.filter((i) => !i.tags.includes('chef'))).slice(0, 4);
  return { kind: 'menu', text: t[lang].ai.menuHint, itemIds: items.slice(0, 5).map((i) => i.id) };
};

// Kullanıcının tercihlerine göre en uygun rotayı seçer
export const recommendRoute = (prefTags) => {
  if (!prefTags.length) return routes.find((r) => r.featured) || routes[0];
  const scored = routes.map((r) => ({ r, score: prefTags.filter((tg) => r.tags.includes(tg)).length }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0].r;
};

// ---------- ANA FONKSİYON ----------
// flow: önceki adımdan kalan durum (eksik bilgi soruluyor ya da onay bekleniyor)
export function reply(input, lang, flow) {
  const tx = t[lang].ai;
  const norm = normalize(input);
  const tokens = tokenize(norm);
  const fallbackChips = tx.chips.map((c) => ({ label: c, value: c }));

  // 1) Onay bekleniyorsa evet / hayır
  if (flow?.confirming) {
    if (hasAny(norm, tokens, W.yes)) return { action: 'confirm', messages: [], flow: null };
    if (hasAny(norm, tokens, W.no)) return { action: 'cancel', messages: [], flow: null };
  }
  if (flow?.service && hasAny(norm, tokens, W.no) && tokens.length <= 2) {
    return { messages: [text(tx.cancelled)], flow: null };
  }

  // 2) Eksik bilgi soruluyorsa cevabı o alana yerleştir
  if (flow?.service) {
    const filled = fillFields(flow.service, flow.data, norm, tokens, flow.asking);
    if (JSON.stringify(filled) !== JSON.stringify(flow.data)) return continueService(flow.service, filled, lang);
  }

  // 3) Hizmet talepleri (transfer önce: "book a taxi" masa değil)
  const serviceOrder = ['transfer', 'cleaning', 'amenities', 'table'];
  const svc = serviceOrder.map((id) => services.find((s) => s.id === id)).find((s) => hasAny(norm, tokens, s.keywords));
  if (svc && !(svc.id === 'table' && hasAny(norm, tokens, W.route))) {
    if (svc.id === 'transfer' && hasAny(norm, tokens, W.price) && tokens.length < 6) {
      return { messages: [text(tx.priceRule)], flow: null };
    }
    const data = fillFields(svc.id, {}, norm, tokens, null);
    return continueService(svc.id, data, lang);
  }

  // 4) Sık sorulan sorular (Wi-Fi, kahvaltı saati, check-out...)
  const f = faq.find((q) => hasAny(norm, tokens, q.keywords));
  if (f) return { messages: [text(L(f.answer, lang))], flow: null };

  // 5) Yemek siparişi: menüdeki ürünleri ve adetleri bul
  const found = [];
  for (const item of menuItems) {
    const kwList = [...item.keywords, ...Object.values(item.name)];
    for (const kw of kwList) {
      const idx = findKeyword(norm, tokens, kw);
      if (idx !== -1) {
        const qty = numAt(tokens[idx - 1]) ?? (/^(tane|adet|porsiyon)$/.test(tokens[idx + 2] || '') ? numAt(tokens[idx + 1]) : null) ?? 1;
        if (!found.some((x) => x.id === item.id)) found.push({ id: item.id, qty: Math.min(qty, 20) });
        break;
      }
    }
  }
  if (found.length) {
    const record = { type: 'order', items: found };
    return { messages: [confirmCard(record, lang)], flow: { confirming: true } };
  }

  // 6) Menü / diyet soruları
  if (hasAny(norm, tokens, W.vegan)) return { messages: [menuPicks(lang, { tag: 'vegan' })], flow: null };
  if (hasAny(norm, tokens, W.glutenFree)) return { messages: [menuPicks(lang, { tag: 'glutenFree' })], flow: null };
  if (hasAny(norm, tokens, W.vegetarian)) return { messages: [menuPicks(lang, { tag: 'vegetarian' })], flow: null };
  if (hasAny(norm, tokens, W.dessert)) return { messages: [menuPicks(lang, { category: 'desserts' })], flow: null };
  if (hasAny(norm, tokens, W.drinks)) return { messages: [menuPicks(lang, { category: 'drinks' })], flow: null };

  // 7) Rota önerisi
  const prefTags = Object.entries(TAG_WORDS).filter(([, w]) => hasAny(norm, tokens, w)).map(([tag]) => tag);
  if (hasAny(norm, tokens, W.route) || prefTags.length) {
    const r = recommendRoute(prefTags);
    const tagChips = Object.entries(routeTags).filter(([k]) => !prefTags.includes(k)).slice(0, 3)
      .map(([, v]) => ({ label: `${v.emoji} ${L(v, lang)}`, value: `${L(v, lang)} ${lang === 'TR' ? 'rotası' : lang === 'EN' ? 'route' : 'διαδρομή'}` }));
    return { messages: [{ kind: 'route', text: tx.routeIntro, routeId: r.id, chips: tagChips }], flow: null };
  }

  // 8) Genel sipariş isteği ama ürün yok
  if (hasAny(norm, tokens, W.order) || hasAny(norm, tokens, W.menu)) {
    const msg = /\d/.test(norm) ? tx.unknownItem : tx.orderNeedsItem;
    return { messages: [text(msg), menuPicks(lang)], flow: null };
  }

  // 9) Selam / teşekkür
  if (hasAny(norm, tokens, W.thanks)) return { messages: [text(tx.thanks)], flow: null };
  if (hasAny(norm, tokens, W.greet)) return { messages: [text(tx.greeting, fallbackChips)], flow: null };

  // 10) Anlaşılamadı: tahmin etme, seçenek sun
  return { messages: [text(tx.fallback, fallbackChips)], flow: flow?.service ? flow : null };
}
