import { useState } from 'react';
import { QrCode, ShieldCheck } from 'lucide-react';
import { LangSwitch } from '../components/ui';

export default function Login({ tx, lang, setLang, onLogin, onStaff }) {
  const [room, setRoom] = useState('');
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const r = room.trim();
    if (!/^\d{1,4}$/.test(r)) {
      setError(true);
      return;
    }
    onLogin(r);
  };

  return (
    <div className="min-h-dvh bg-warm flex flex-col items-center justify-center p-6 text-ink">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-lilac/30 text-center">
        <div className="w-20 h-20 bg-linear-to-br from-lilac/40 to-pink/40 rounded-full flex items-center justify-center mx-auto mb-6">
          <QrCode size={40} />
        </div>
        <h1 className="text-2xl font-bold mb-1">{tx.login.title}</h1>
        <p className="text-gray-600 text-sm">{tx.login.sub}</p>
        <p className="text-gray-400 text-xs mt-2 mb-6">{tx.login.scan}</p>

        <div className="mb-6"><LangSwitch lang={lang} setLang={setLang} variant="large" /></div>

        <form onSubmit={submit}>
          <input
            type="text"
            inputMode="numeric"
            placeholder={tx.login.placeholder}
            value={room}
            onChange={(e) => { setRoom(e.target.value); setError(false); }}
            className={`w-full px-4 py-3 rounded-xl border mb-2 focus:outline-none focus:border-lilac ${error ? 'border-red-400' : 'border-gray-200'}`}
          />
          <p className={`text-xs text-red-500 mb-2 text-left min-h-4 ${error ? '' : 'invisible'}`}>{tx.login.error}</p>
          <button type="submit" className="w-full py-3 bg-ink text-white rounded-xl font-medium shadow-lg hover:bg-gray-800 transition">
            {tx.login.btn}
          </button>
        </form>
      </div>

      <button onClick={onStaff} className="mt-6 text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1">
        <ShieldCheck size={14} /> {tx.home.tiles.staff}
      </button>
    </div>
  );
}
