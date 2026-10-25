// =============================================================
//  askHermis Misafir Portalı – ana dosya
//  Burada sadece uygulama durumu (dil, oda, sepet, kayıtlar) ve
//  ekranlar arası geçiş var. Ekranlar src/screens/, içerikler src/data/.
// =============================================================
import { useCallback, useEffect, useState } from 'react';
import { Home as HomeIcon, Utensils, Compass, Bot, ConciergeBell, LogOut, ArrowLeft } from 'lucide-react';
import { t, LANGS } from './data/i18n';
import { useSyncedState, seedRecords } from './lib/store';
import { uid } from './lib/utils';
import { LangSwitch, Toast } from './components/ui';
import Login from './screens/Login';
import Home from './screens/Home';
import Menu from './screens/Menu';
import Explore from './screens/Explore';
import Concierge from './screens/Concierge';
import Services from './screens/Services';
import Reviews from './screens/Reviews';
import Staff from './screens/Staff';

const params = new URLSearchParams(window.location.search);
const urlRoom = params.get('room');
const urlLang = params.get('lang')?.toUpperCase();
const urlStaff = params.has('staff');

const readSession = () => {
  try { return sessionStorage.getItem('askhermis:room') || ''; } catch { return ''; }
};
const writeSession = (room) => {
  try { if (room) sessionStorage.setItem('askhermis:room', room); else sessionStorage.removeItem('askhermis:room'); } catch { /* yok say */ }
};

const NAV = [
  { key: 'home', icon: HomeIcon },
  { key: 'menu', icon: Utensils },
  { key: 'explore', icon: Compass },
  { key: 'ai', icon: Bot },
  { key: 'services', icon: ConciergeBell },
];

export default function App() {
  const [lang, setLang] = useState(LANGS.some((l) => l.code === urlLang) ? urlLang : 'TR');
  // QR kodla gelindiyse (?room=302) doğrudan giriş yapılır
  const [room, setRoom] = useState(() => (urlRoom && /^\d{1,4}$/.test(urlRoom) ? urlRoom : readSession()));
  const [mode, setMode] = useState(urlStaff ? 'staff' : 'guest');
  const [nav, setNav] = useState({ tab: 'home', params: {} });

  const [cart, setCart] = useState([]);
  const [cartNote, setCartNote] = useState('');
  const [chat, setChat] = useState([]);
  const [chatFlow, setChatFlow] = useState(null);
  const [toast, setToast] = useState('');

  // Sekmeler arası canlı senkron kayıtlar
  const [records, setRecords] = useSyncedState('records', seedRecords);
  const [userReviews, setUserReviews] = useSyncedState('reviews', []);

  const tx = t[lang];

  useEffect(() => { writeSession(room); }, [room]);

  useEffect(() => {
    document.documentElement.lang = LANGS.find((l) => l.code === lang).html;
  }, [lang]);

  // QR parametrelerini adres çubuğundan temizle (yenileyince tekrar tetiklenmesin)
  useEffect(() => {
    if (urlRoom || urlLang || urlStaff) window.history.replaceState(null, '', window.location.pathname);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(''), 2500);
    return () => clearTimeout(id);
  }, [toast]);

  const go = useCallback((tab, p = {}) => {
    setNav({ tab, params: p });
    window.scrollTo({ top: 0 });
  }, []);

  const createRecord = useCallback((rec, toastText) => {
    setRecords((prev) => [{ ...rec, id: uid(), room, createdAt: Date.now(), status: 'new' }, ...prev]);
    if (toastText) setToast(toastText);
  }, [room, setRecords]);

  const checkout = () => {
    if (!cart.length) return;
    createRecord({ type: 'order', items: cart, note: cartNote.trim() || undefined }, tx.menu.successOrder);
    setCart([]);
    setCartNote('');
  };

  const logout = () => {
    setRoom('');
    setCart([]);
    setChat([]);
    setChatFlow(null);
    go('home');
  };

  // ---------- Personel modu (?staff=1) ----------
  if (mode === 'staff') {
    return (
      <Shell>
        <header className="bg-white px-4 py-3 flex justify-between items-center border-b border-gray-100 sticky top-0 z-40">
          <button onClick={() => setMode('guest')} className="flex items-center gap-1 text-sm font-semibold"><ArrowLeft size={18} /> Hermis</button>
          <LangSwitch lang={lang} setLang={setLang} />
        </header>
        <main className="p-4"><Staff tx={tx} lang={lang} records={records} setRecords={setRecords} /></main>
      </Shell>
    );
  }

  if (!room) {
    return <Login tx={tx} lang={lang} setLang={setLang} onLogin={(r) => { setRoom(r); go('home'); }} onStaff={() => setMode('staff')} />;
  }

  const { tab, params: p } = nav;
  const screenKey = `${tab}-${JSON.stringify(p)}`;

  return (
    <Shell padBottom>
      <header className="bg-white px-4 py-3 flex justify-between items-center border-b border-gray-100 sticky top-0 z-40">
        <button onClick={() => go('home')} className="font-bold text-lg flex items-center gap-1.5">
          Hermis <span className="text-lilac-ink text-xs px-2 py-0.5 rounded-full bg-lilac/20">{tx.room} {room}</span>
        </button>
        <div className="flex items-center gap-1.5">
          <LangSwitch lang={lang} setLang={setLang} />
          <button onClick={logout} aria-label={tx.logout} title={tx.logout} className="p-1.5 text-gray-400 hover:text-gray-700"><LogOut size={18} /></button>
        </div>
      </header>

      <main className="p-4" key={screenKey}>
        {tab === 'home' && <Home tx={tx} lang={lang} room={room} records={records} go={go} />}
        {tab === 'menu' && (
          <Menu tx={tx} lang={lang} cart={cart} setCart={setCart} cartNote={cartNote} setCartNote={setCartNote} onCheckout={checkout} initialCategory={p.category} />
        )}
        {tab === 'explore' && <Explore tx={tx} lang={lang} initialRouteId={p.routeId} />}
        {tab === 'ai' && (
          <Concierge tx={tx} lang={lang} messages={chat} setMessages={setChat} flow={chatFlow} setFlow={setChatFlow} onCreateRecord={createRecord} go={go} />
        )}
        {tab === 'services' && <Services tx={tx} lang={lang} onCreateRecord={createRecord} initial={p} />}
        {tab === 'reviews' && <Reviews tx={tx} lang={lang} room={room} userReviews={userReviews} setUserReviews={setUserReviews} showToast={setToast} />}
        {tab === 'staff' && <Staff tx={tx} lang={lang} records={records} setRecords={setRecords} />}
      </main>

      <Toast text={toast} />

      {/* Alt menü: ekranın altına sabit */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 pt-2.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] px-1 flex justify-around items-center z-40">
        {NAV.map(({ key, icon: Icon }) => {
          const active = tab === key;
          return (
            <button key={key} onClick={() => go(key)} className={`flex flex-col items-center flex-1 ${active ? 'text-ink font-bold' : 'text-gray-400'}`}>
              <span className={`px-3 py-0.5 rounded-full ${active ? 'bg-lilac/25' : ''}`}><Icon size={20} /></span>
              <span className="text-[10px] mt-0.5">{tx.nav[key]}</span>
            </button>
          );
        })}
      </nav>
    </Shell>
  );
}

function Shell({ children, padBottom }) {
  return (
    <div className={`min-h-dvh bg-warm text-ink max-w-md mx-auto relative shadow-2xl border-x border-gray-200 ${padBottom ? 'pb-24' : ''}`}>
      {children}
    </div>
  );
}
