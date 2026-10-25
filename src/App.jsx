import { useEffect, useRef, useState } from 'react';
import {
  QrCode, Home, Utensils, Compass, Bot, ShieldCheck, Send, MapPin,
  CheckCircle, Trash2, LogOut,
} from 'lucide-react';

// Çeviri Sözlüğü
const t = {
  TR: {
    welcome: 'Atina’nın kalbine hoş geldiniz!',
    subWelcome: 'Hermis Boutique Hotel Misafir Portalı',
    menu: 'Restoran Menüsü',
    aiConcierge: 'AI Asistan',
    explore: 'Rota Keşfi',
    services: 'Otel Hizmetleri',
    staffPanel: 'Personel Paneli',
    reviews: 'Deneyim & Yorum',
    loginTitle: 'QR Kod ile Giriş Yapın',
    loginBtn: 'Oturum Aç',
    roomPlaceholder: 'Oda Numaranız (Örn: 302)',
    roomError: 'Lütfen geçerli bir oda numarası girin.',
    room: 'Oda',
    orderBtn: 'Sepete Ekle',
    cartTitle: 'Sipariş Sepeti',
    cartBadge: (n) => `Sepet: ${n} Ürün`,
    total: 'Toplam',
    confirmOrder: 'Siparişi Onayla',
    successOrder: 'Siparişiniz personele iletildi!',
    chatPlaceholder: 'Asistana bir şey sorun...',
    chatWelcome: 'Merhaba! Hermis AI Concierge’e hoş geldiniz. Size Atina’da veya otelimizde nasıl yardımcı olabilirim?',
    replyDefault: 'Harika bir soru! Talebinizi otelimizin resepsiyonuna ilettim.',
    replyFood: 'Restoranımızdan geleneksel Musakka veya Souvlaki sipariş edebilirsiniz! Menü sekmesine göz atın.',
    replyRoute: (n) => `Atina için hazırladığımız ${n} özel rotadan "Antik Atina Klasikleri"ni kesinlikle öneririm!`,
    liveSync: 'Canlı Senkron',
    staffHint: 'Durumu değiştirmek için siparişe dokunun.',
    noOrders: 'Henüz sipariş yok.',
    logout: 'Çıkış',
    nav: { home: 'Ana Ekran', menu: 'Menü', explore: 'Keşif', ai: 'AI Asistan', staff: 'Personel' },
    status: { new: 'Yeni Sipariş', pending: 'Beklemede', preparing: 'Hazırlanıyor', done: 'Teslim Edildi' },
  },
  EN: {
    welcome: 'Welcome to the heart of Athens!',
    subWelcome: 'Hermis Boutique Hotel Guest Portal',
    menu: 'Restaurant Menu',
    aiConcierge: 'AI Concierge',
    explore: 'Route Discovery',
    services: 'Hotel Services',
    staffPanel: 'Staff Panel',
    reviews: 'Guest Reviews',
    loginTitle: 'Scan QR Code to Login',
    loginBtn: 'Sign In',
    roomPlaceholder: 'Your Room Number (e.g. 302)',
    roomError: 'Please enter a valid room number.',
    room: 'Room',
    orderBtn: 'Add to Cart',
    cartTitle: 'Order Cart',
    cartBadge: (n) => `Cart: ${n} item${n === 1 ? '' : 's'}`,
    total: 'Total',
    confirmOrder: 'Confirm Order',
    successOrder: 'Your order has been sent to staff!',
    chatPlaceholder: 'Ask the concierge anything...',
    chatWelcome: 'Hello! Welcome to Hermis AI Concierge. How can I help you in Athens or at our hotel?',
    replyDefault: 'Great question! I have forwarded your request to our reception.',
    replyFood: 'You can order our traditional Moussaka or Souvlaki! Take a look at the Menu tab.',
    replyRoute: (n) => `Of our ${n} curated Athens routes, I definitely recommend "Ancient Athens Classics"!`,
    liveSync: 'Live Sync',
    staffHint: 'Tap an order to change its status.',
    noOrders: 'No orders yet.',
    logout: 'Logout',
    nav: { home: 'Home', menu: 'Menu', explore: 'Explore', ai: 'AI Concierge', staff: 'Staff' },
    status: { new: 'New Order', pending: 'Pending', preparing: 'Preparing', done: 'Delivered' },
  },
  EL: {
    welcome: 'Καλώς ορίσατε στην καρδιά της Αθήνας!',
    subWelcome: 'Πύλη Επισκεπτών Hermis Boutique Hotel',
    menu: 'Μενού Εστιατορίου',
    aiConcierge: 'AI Θυρωρός',
    explore: 'Ανακαλύψτε Διαδρομές',
    services: 'Υπηρεσίες Ξενοδοχείου',
    staffPanel: 'Πίνακας Προσωπικού',
    reviews: 'Κριτικές',
    loginTitle: 'Σύνδεση με QR Code',
    loginBtn: 'Σύνδεση',
    roomPlaceholder: 'Αριθμός Δωματίου (π.χ. 302)',
    roomError: 'Εισάγετε έγκυρο αριθμό δωματίου.',
    room: 'Δωμάτιο',
    orderBtn: 'Προσθήκη',
    cartTitle: 'Καλάθι Παραγγελίας',
    cartBadge: (n) => `Καλάθι: ${n}`,
    total: 'Σύνολο',
    confirmOrder: 'Επιβεβαίωση',
    successOrder: 'Η παραγγελία σας εστάλη!',
    chatPlaceholder: 'Ρωτήστε τον θυρωρό...',
    chatWelcome: 'Γεια σας! Καλώς ήρθατε στο Hermis AI Concierge. Πώς μπορώ να σας βοηθήσω;',
    replyDefault: 'Εξαιρετική ερώτηση! Προώθησα το αίτημά σας στη ρεσεψιόν.',
    replyFood: 'Μπορείτε να παραγγείλετε παραδοσιακό Μουσακά ή Σουβλάκι! Δείτε το Μενού.',
    replyRoute: (n) => `Από τις ${n} διαδρομές μας, προτείνω οπωσδήποτε τα «Κλασικά της Αρχαίας Αθήνας»!`,
    liveSync: 'Ζωντανός Συγχρονισμός',
    staffHint: 'Πατήστε μια παραγγελία για αλλαγή κατάστασης.',
    noOrders: 'Δεν υπάρχουν παραγγελίες.',
    logout: 'Έξοδος',
    nav: { home: 'Αρχική', menu: 'Μενού', explore: 'Εξερεύνηση', ai: 'AI Θυρωρός', staff: 'Προσωπικό' },
    status: { new: 'Νέα', pending: 'Σε αναμονή', preparing: 'Ετοιμάζεται', done: 'Παραδόθηκε' },
  },
};

const LANGS = [
  { code: 'TR', label: 'TR', html: 'tr' },
  { code: 'EN', label: 'EN', html: 'en' },
  { code: 'EL', label: 'ΕΛ', html: 'el' },
];

// Restoran Menüsü Verisi (fiyatlar sayı olarak, toplam hesaplanabilsin diye)
const menuItems = [
  {
    id: 1, price: 16.5,
    name: { TR: 'Geleneksel Musakka', EN: 'Traditional Moussaka', EL: 'Παραδοσιακός Μουσακάς' },
    desc: { TR: 'Fırınlanmış patlıcan, kıymalı sos ve beşamel.', EN: 'Baked eggplant, minced meat sauce and béchamel.', EL: 'Ψητή μελιτζάνα, κιμάς και μπεσαμέλ.' },
  },
  {
    id: 2, price: 9,
    name: { TR: 'Yunan Salatası (Horiatiki)', EN: 'Greek Salad (Horiatiki)', EL: 'Χωριάτικη Σαλάτα' },
    desc: { TR: 'Taze domates, salatalık, feta peyniri ve zeytinyağı.', EN: 'Fresh tomato, cucumber, feta cheese and olive oil.', EL: 'Φρέσκια ντομάτα, αγγούρι, φέτα και ελαιόλαδο.' },
  },
  {
    id: 3, price: 14,
    name: { TR: 'Souvlaki Tabağı', EN: 'Souvlaki Plate', EL: 'Πιάτο Σουβλάκι' },
    desc: { TR: 'Marine edilmiş domuz/tavuk şiş, pita ekmeği ve tzatziki.', EN: 'Marinated pork/chicken skewers, pita bread and tzatziki.', EL: 'Μαριναρισμένο χοιρινό/κοτόπουλο, πίτα και τζατζίκι.' },
  },
  {
    id: 4, price: 7.5,
    name: { TR: 'Loukoumades', EN: 'Loukoumades', EL: 'Λουκουμάδες' },
    desc: { TR: 'Bal şerbeti ve tarçınlı çıtır lokma tatlısı.', EN: 'Crispy honey puffs with cinnamon.', EL: 'Τραγανοί λουκουμάδες με μέλι και κανέλα.' },
  },
];

// Atina Rotaları
const routes = [
  {
    hours: 3,
    title: { TR: 'Antik Atina Klasikleri', EN: 'Ancient Athens Classics', EL: 'Κλασικά της Αρχαίας Αθήνας' },
    desc: { TR: 'Akropolis, Akropolis Müzesi ve Dionysou Yürüyüşü.', EN: 'Acropolis, Acropolis Museum and Dionysiou Areopagitou walk.', EL: 'Ακρόπολη, Μουσείο Ακρόπολης και Διονυσίου Αρεοπαγίτου.' },
  },
  {
    hours: 2.5,
    title: { TR: 'Plaka’nın Tarihi Sokakları', EN: 'Historic Streets of Plaka', EL: 'Ιστορικά Σοκάκια της Πλάκας' },
    desc: { TR: 'Anafiotika Evleri, Roma Agorası ve Monastiraki.', EN: 'Anafiotika houses, Roman Agora and Monastiraki.', EL: 'Αναφιώτικα, Ρωμαϊκή Αγορά και Μοναστηράκι.' },
  },
  {
    hours: 2,
    title: { TR: 'Gastronomi ve Yerel Pazarlar', EN: 'Gastronomy & Local Markets', EL: 'Γαστρονομία και Τοπικές Αγορές' },
    desc: { TR: 'Varvakios Merkez Pazarı ve Psirri sokak lezzetleri.', EN: 'Varvakios Central Market and Psirri street food.', EL: 'Βαρβάκειος Αγορά και street food στου Ψυρρή.' },
  },
  {
    hours: 2,
    title: { TR: 'Lycabettus Tepesi Gün Batımı', EN: 'Lycabettus Hill Sunset', EL: 'Ηλιοβασίλεμα στον Λυκαβηττό' },
    desc: { TR: 'Füniküler ile tepeye çıkış ve eşsiz Atina manzarası.', EN: 'Funicular ride to the top and a unique view of Athens.', EL: 'Τελεφερίκ στην κορυφή και μοναδική θέα της Αθήνας.' },
  },
];

const hoursLabel = (h, lang) => {
  const n = String(h).replace('.', lang === 'EN' ? '.' : ',');
  return lang === 'TR' ? `${n} Saat` : lang === 'EN' ? `${n} h` : `${n} ώρες`;
};

const formatPrice = (n) => `${n.toFixed(2)} €`;

const STATUS_FLOW = ['new', 'pending', 'preparing', 'done'];
const STATUS_STYLE = {
  new: 'bg-purple-50 text-purple-800',
  pending: 'bg-gray-100 text-gray-700',
  preparing: 'bg-amber-50 text-amber-700',
  done: 'bg-green-50 text-green-700',
};

function LangSwitch({ compact, lang, setLang }) {
  return (
    <div className={compact ? 'flex bg-gray-100 p-1 rounded-full text-xs font-bold' : 'flex justify-center gap-2 mb-6'}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={compact
            ? `px-2 py-0.5 rounded-full ${lang === l.code ? 'bg-white shadow' : ''}`
            : `px-3 py-1 rounded-full text-xs font-bold ${lang === l.code ? 'bg-[#B4A5DC] text-white' : 'bg-gray-100'}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState('TR');
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([
    { id: 101, room: '302', items: [{ id: 1, qty: 1 }], label: null, status: 'preparing' },
    { id: 102, room: '302', items: [], label: { TR: 'Oda Temizliği', EN: 'Room Cleaning', EL: 'Καθαρισμός Δωματίου' }, status: 'pending' },
  ]);
  // Karşılama mesajı her zaman seçili dilde gösterilir, bu yüzden state'te sadece sonraki mesajlar tutulur
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roomNo, setRoomNo] = useState('');
  const [roomError, setRoomError] = useState(false);
  const [toast, setToast] = useState(false);
  const chatEndRef = useRef(null);

  const texts = t[lang];

  useEffect(() => {
    document.documentElement.lang = LANGS.find((l) => l.code === lang).html;
  }, [lang]);

  // Yeni mesaj gelince sohbeti en alta kaydır
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, activeTab]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(false), 2500);
    return () => clearTimeout(id);
  }, [toast]);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + c.qty * menuItems.find((m) => m.id === c.id).price, 0);

  const handleLogin = () => {
    const room = roomNo.trim();
    if (!/^\d{1,4}$/.test(room)) {
      setRoomError(true);
      return;
    }
    setRoomNo(room);
    setRoomError(false);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
    setCart([]);
  };

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((c) => c.id === item.id);
      if (found) return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { id: item.id, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev
      .map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c))
      .filter((c) => c.qty > 0));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newOrder = { id: Date.now(), room: roomNo, items: cart, label: null, status: 'new' };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setToast(true);
  };

  const advanceStatus = (id) => {
    setOrders((prev) => prev.map((o) => {
      if (o.id !== id) return o;
      const next = STATUS_FLOW[(STATUS_FLOW.indexOf(o.status) + 1) % STATUS_FLOW.length];
      return { ...o, status: next };
    }));
  };

  const orderTitle = (order) => order.label
    ? order.label[lang]
    : order.items.map((i) => {
      const name = menuItems.find((m) => m.id === i.id).name[lang];
      return i.qty > 1 ? `${i.qty}× ${name}` : name;
    }).join(', ');

  const handleSendMessage = () => {
    const text = inputMessage.trim();
    if (!text) return;
    setChatMessages((prev) => [...prev, { sender: 'user', text }]);
    setInputMessage('');

    const q = text.toLocaleLowerCase(lang === 'TR' ? 'tr' : undefined);
    const replyLang = lang;
    setTimeout(() => {
      const tx = t[replyLang];
      let aiReply = tx.replyDefault;
      if (/(yemek|food|menü|menu|φαγητ|μενού)/.test(q)) aiReply = tx.replyFood;
      else if (/(rota|route|gez|tur|tour|διαδρομ)/.test(q)) aiReply = tx.replyRoute(routes.length);
      setChatMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
    }, 1000);
  };


  if (!isLoggedIn) {
    return (
      <div className="min-h-dvh bg-[#F7F6F4] flex flex-col items-center justify-center p-6 text-[#0A0A0A]">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-[#B4A5DC]/30 text-center">
          <div className="w-20 h-20 bg-[#B4A5DC]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0A0A0A]">
            <QrCode size={40} />
          </div>
          <h1 className="text-2xl font-bold mb-2">askHermis Portal</h1>
          <p className="text-gray-600 mb-1 text-sm">Hermis Boutique Hotel Athens</p>
          <p className="text-gray-400 mb-6 text-xs">{texts.loginTitle}</p>

          <LangSwitch lang={lang} setLang={setLang} />

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <input
              type="text"
              inputMode="numeric"
              placeholder={texts.roomPlaceholder}
              value={roomNo}
              onChange={(e) => { setRoomNo(e.target.value); setRoomError(false); }}
              className={`w-full px-4 py-3 rounded-xl border mb-2 focus:outline-none focus:border-[#B4A5DC] ${roomError ? 'border-red-400' : 'border-gray-200'}`}
            />
            <p className={`text-xs text-red-500 mb-2 text-left min-h-4 ${roomError ? '' : 'invisible'}`}>{texts.roomError}</p>

            <button
              type="submit"
              className="w-full py-3 bg-[#0A0A0A] text-white rounded-xl font-medium shadow-lg hover:bg-gray-800 transition"
            >
              {texts.loginBtn}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { key: 'home', icon: Home },
    { key: 'menu', icon: Utensils },
    { key: 'explore', icon: Compass },
    { key: 'ai', icon: Bot },
    { key: 'staff', icon: ShieldCheck },
  ];

  const allMessages = [{ sender: 'ai', text: texts.chatWelcome }, ...chatMessages];

  return (
    <div className="min-h-dvh bg-[#F7F6F4] text-[#0A0A0A] pb-24 max-w-md mx-auto relative shadow-2xl border-x border-gray-200">

      {/* Üst Bar */}
      <header className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-100 sticky top-0 z-40">
        <h1 className="font-bold text-lg flex items-center gap-1">
          Hermis <span className="text-[#7B6BB0] text-xs px-2 py-0.5 rounded-full bg-[#B4A5DC]/15">{texts.room} {roomNo}</span>
        </h1>
        <div className="flex items-center gap-2">
          <LangSwitch compact lang={lang} setLang={setLang} />
          <button onClick={handleLogout} aria-label={texts.logout} title={texts.logout} className="p-1.5 text-gray-400 hover:text-gray-700">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* İçerik Alanı */}
      <main className="p-4 space-y-6">

        {/* ANA EKRAN */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            <div className="bg-linear-to-br from-[#B4A5DC]/30 to-[#E5BFA8]/30 p-6 rounded-3xl border border-[#B4A5DC]/20">
              <span className="text-xs uppercase tracking-wider font-bold text-purple-900 bg-white/60 px-3 py-1 rounded-full">Atina / Plaka</span>
              <h2 className="text-xl font-bold mt-3">{texts.welcome}</h2>
              <p className="text-sm text-gray-700 mt-1">{texts.subWelcome}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { tab: 'menu', icon: Utensils, label: texts.menu, bg: 'bg-[#E5BFA8]/20' },
                { tab: 'explore', icon: Compass, label: texts.explore, bg: 'bg-[#B4A5DC]/20' },
                { tab: 'ai', icon: Bot, label: texts.aiConcierge, bg: 'bg-[#C5D1C5]/30' },
                { tab: 'staff', icon: ShieldCheck, label: texts.staffPanel, bg: 'bg-[#7B92BC]/20' },
              ].map(({ tab, icon: Icon, label, bg }) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start gap-2 hover:border-[#B4A5DC] transition text-left">
                  <div className={`p-3 ${bg} rounded-xl text-[#0A0A0A]`}><Icon size={22} /></div>
                  <span className="font-semibold text-sm">{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MENÜ & SEPET */}
        {activeTab === 'menu' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{texts.menu}</h2>
              {cartCount > 0 && (
                <span className="bg-[#0A0A0A] text-white text-xs px-3 py-1 rounded-full font-bold">
                  {texts.cartBadge(cartCount)}
                </span>
              )}
            </div>

            <div className="space-y-3">
              {menuItems.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex justify-between items-center gap-3 shadow-sm">
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm">{item.name[lang]}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc[lang]}</p>
                    <span className="text-sm font-semibold text-purple-900 mt-2 block">{formatPrice(item.price)}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="shrink-0 bg-[#0A0A0A] text-white px-3 py-2 rounded-xl text-xs font-medium hover:bg-gray-800 active:scale-95 transition"
                  >
                    {texts.orderBtn}
                  </button>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="bg-white p-4 rounded-2xl border border-purple-200 shadow-md space-y-3">
                <h3 className="font-bold text-sm">{texts.cartTitle}</h3>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {cart.map((c) => {
                    const item = menuItems.find((m) => m.id === c.id);
                    return (
                      <div key={c.id} className="flex justify-between items-center text-xs text-gray-600 gap-2">
                        <span className="flex-1">{c.qty}× {item.name[lang]}</span>
                        <span>{formatPrice(item.price * c.qty)}</span>
                        <button onClick={() => handleRemoveFromCart(c.id)} aria-label="remove" className="p-1 text-gray-400 hover:text-red-500">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-gray-100 pt-2">
                  <span>{texts.total}</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-2.5 bg-[#B4A5DC] text-white font-bold rounded-xl text-sm shadow hover:bg-[#9F8ED0] transition"
                >
                  {texts.confirmOrder}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ROTA KEŞFİ */}
        {activeTab === 'explore' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">{texts.explore}</h2>
            <div className="space-y-3">
              {routes.map((route, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-sm flex items-center gap-1.5"><MapPin size={16} className="text-[#B4A5DC] shrink-0" />{route.title[lang]}</h3>
                    <span className="shrink-0 text-xs bg-gray-100 px-2.5 py-1 rounded-full font-medium">{hoursLabel(route.hours, lang)}</span>
                  </div>
                  <p className="text-xs text-gray-600">{route.desc[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI CONCIERGE */}
        {activeTab === 'ai' && (
          <div className="bg-white rounded-2xl border border-gray-100 flex flex-col h-[calc(100dvh-10.5rem)] shadow-sm">
            <div className="p-3 border-b border-gray-100 bg-[#B4A5DC]/10 rounded-t-2xl flex items-center gap-2">
              <Bot size={20} className="text-[#0A0A0A]" />
              <span className="font-bold text-sm">askHermis {texts.aiConcierge}</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {allMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs wrap-break-word ${msg.sender === 'user' ? 'bg-[#0A0A0A] text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form className="p-3 border-t border-gray-100 flex gap-2" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
              <input
                type="text"
                placeholder={texts.chatPlaceholder}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#B4A5DC]"
              />
              <button type="submit" aria-label="send" className="bg-[#0A0A0A] text-white p-2 rounded-xl disabled:opacity-40" disabled={!inputMessage.trim()}>
                <Send size={16} />
              </button>
            </form>
          </div>
        )}

        {/* PERSONEL PANELİ */}
        {activeTab === 'staff' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold">{texts.staffPanel} <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full align-middle">● {texts.liveSync}</span></h2>
              <p className="text-xs text-gray-500 mt-1">{texts.staffHint}</p>
            </div>
            <div className="space-y-2">
              {orders.length === 0 && <p className="text-sm text-gray-500">{texts.noOrders}</p>}
              {orders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => advanceStatus(order.id)}
                  className="w-full text-left bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center gap-3 hover:border-[#B4A5DC] transition"
                >
                  <div className="min-w-0">
                    <span className="text-xs bg-[#B4A5DC]/20 px-2 py-0.5 rounded font-bold">{texts.room} {order.room}</span>
                    <h4 className="font-bold text-sm mt-1">{orderTitle(order)}</h4>
                  </div>
                  <span className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLE[order.status]}`}>
                    {texts.status[order.status]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Bildirim (alert yerine) */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#0A0A0A] text-white text-sm px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 w-max max-w-[90vw]">
          <CheckCircle size={16} className="text-green-400 shrink-0" /> {texts.successOrder}
        </div>
      )}

      {/* Alt Navigasyon Barı: ekranın altına sabit */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] px-2 flex justify-around items-center z-40">
        {navItems.map(({ key, icon: Icon }) => (
          <button key={key} onClick={() => setActiveTab(key)} className={`flex flex-col items-center flex-1 ${activeTab === key ? 'text-[#0A0A0A] font-bold' : 'text-gray-400'}`}>
            <Icon size={20} />
            <span className="text-[10px] mt-1">{texts.nav[key]}</span>
          </button>
        ))}
      </nav>

    </div>
  );
}
