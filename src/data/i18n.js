// =============================================================
//  ARAYÜZ METİNLERİ  (içerik: Üye 2)
//  Uygulamadaki tüm buton, başlık, onay ve hata mesajları burada.
//  Yeni bir metin eklerken üç dile birden ekleyin.
//  Fonksiyon olan metinler ( (n) => ... ) içine sayı/isim alır.
// =============================================================

export const LANGS = [
  { code: 'TR', label: 'TR', html: 'tr', locale: 'tr-TR' },
  { code: 'EN', label: 'EN', html: 'en', locale: 'en-GB' },
  { code: 'EL', label: 'ΕΛ', html: 'el', locale: 'el-GR' },
];

export const t = {
  TR: {
    room: 'Oda', total: 'Toplam', cancel: 'İptal', confirm: 'Onayla', send: 'Gönder', back: 'Geri',
    logout: 'Çıkış', demo: 'Demo', hours: (n) => `${String(n).replace('.', ',')} saat`, minutes: (n) => `${n} dk`,

    login: {
      title: 'askHermis Portal', sub: 'Hermis Boutique Hotel Athens',
      scan: 'Odanızdaki QR kodu okutun ya da oda numaranızı girin',
      placeholder: 'Oda Numaranız (Örn: 302)', error: 'Lütfen geçerli bir oda numarası girin.',
      btn: 'Oturum Aç',
    },

    nav: { home: 'Ana Ekran', menu: 'Menü', explore: 'Keşif', ai: 'Asistan', services: 'Hizmetler' },

    home: {
      welcome: 'Atina’nın kalbine hoş geldiniz!', subWelcome: 'Hermis Boutique Hotel Misafir Portalı',
      greeting: { morning: 'Günaydın', afternoon: 'İyi günler', evening: 'İyi akşamlar' },
      forYou: 'Sizin için öneriler',
      recBreakfast: 'Kahvaltı saati: odanıza kahvaltı tabağı söyleyin',
      recRoute: 'Bugün için rota önerisi',
      recSunset: 'Gün batımı yaklaşıyor: Lycabettus veya terasımız',
      recDinner: 'Akşam yemeği için şefin önerisi',
      campaign: 'Özel Kampanya',
      info: 'Otel Bilgileri', wifi: 'Wi-Fi', breakfast: 'Kahvaltı', checkout: 'Check-out', reception: 'Resepsiyon',
      tiles: { menu: 'Restoran Menüsü', explore: 'Rota Keşfi', ai: 'AI Asistan', services: 'Otel Hizmetleri', reviews: 'Deneyim & Yorum', staff: 'Personel Paneli' },
    },

    menu: {
      title: 'Restoran Menüsü', all: 'Tümü', add: 'Sepete Ekle', added: 'Eklendi',
      cartTitle: 'Sipariş Sepeti', cartBadge: (n) => `Sepet: ${n} ürün`,
      confirmOrder: 'Siparişi Onayla', successOrder: 'Siparişiniz personele iletildi!',
      allergens: 'Alerjen', eta: 'Tahmini oda servisi süresi: 25–35 dk', notePlaceholder: 'Mutfağa not (alerji, tercih...)',
      viewCart: 'Sepeti gör',
    },

    explore: {
      title: 'Rota Keşfi', sub: 'Atina’yı otelimizin önerdiği rotalarla keşfedin.',
      filterAll: 'Tümü', stops: (n) => `${n} durak`, walk: (n) => `${String(n).replace('.', ',')} km yürüyüş`,
      openRoute: 'Rotayı haritada aç', openStop: 'Haritada aç', tip: 'Yerel ipucu', featured: 'Öne çıkan',
      none: 'Bu tercihlere uygun rota yok.', askAI: 'Asistana sor',
    },

    ai: {
      title: 'askHermis AI Asistan', placeholder: 'Asistana bir şey sorun...', typing: 'Yazıyor…',
      welcome: 'Merhaba! Ben Hermis AI Asistan. Yemek siparişi, oda temizliği, transfer, masa rezervasyonu veya Atina rotaları için yardımcı olabilirim.',
      chips: ['2 musakka sipariş et', 'Oda temizliği istiyorum', 'Havalimanı transferi', 'Gün batımı rotası öner', 'Wi-Fi şifresi'],
      confirmTitle: 'Onayınızı bekliyorum',
      confirmOrder: 'Bu siparişi oluşturayım mı?',
      confirmRequest: 'Bu talebi personele ileteyim mi?',
      done: 'Tamamdır! Talebiniz personele iletildi. Durumunu Personel Panelinden takip edebilirsiniz.',
      cancelled: 'İptal ettim. Başka bir şey ister misiniz?',
      fallback: 'Bunu tam anlayamadım. Şunlardan birini mi istiyorsunuz?',
      unknownItem: 'Menümüzde bu ürünü bulamadım. Menüdeki ürünlerden birini seçebilir misiniz?',
      orderNeedsItem: 'Ne sipariş etmek istersiniz? Örneğin: "1 musakka ve 2 limonata".',
      priceRule: 'Transfer ücreti resepsiyon tarafından onaylanır; tahmini bir fiyat veremiyorum.',
      routeIntro: 'Size şu rotayı öneririm:',
      routeMore: 'Tüm rotalar için Keşif sekmesine bakabilirsiniz.',
      cleaningSlot: 'Hangi saat aralığı uygun?',
      transferWhere: 'Nereye transfer istersiniz?',
      tableWhere: 'Restoran mı, çatı terası mı?',
      howMany: 'Kaç kişi olacaksınız?',
      whatTime: 'Saat kaçta? (Örn: 20:00)',
      amenitiesWhich: 'Ne getirelim?',
      menuHint: 'Menüden birkaç öneri:',
      greeting: 'Merhaba! Size nasıl yardımcı olabilirim?',
      thanks: 'Rica ederim, iyi tatiller! 😊',
    },

    services: {
      title: 'Otel Hizmetleri', sub: 'Talebinizi gönderin, personelimiz hemen ilgilensin.',
      request: 'Talep Gönder', sent: 'Talebiniz personele iletildi!',
      slot: 'Saat aralığı', items: 'İstenenler', destination: 'Varış noktası', venue: 'Mekân',
      datetime: 'Tarih ve saat', people: 'Kişi sayısı', note: 'Not (isteğe bağlı)',
      free: 'Ücretsiz', onRequest: 'Fiyat resepsiyon tarafından onaylanır',
      required: 'Lütfen gerekli alanları doldurun.',
    },

    reviews: {
      title: 'Deneyim & Yorum', sub: 'Konaklamanızı değerlendirin.',
      average: 'Ortalama puan', count: (n) => `${n} yorum`,
      aiTitle: 'AI Yorum Özeti', aiNote: 'Yorumlardan otomatik özetlendi',
      praise: (list) => `Misafirler en çok ${list} konusunu övüyor.`,
      complain: (list) => `Geliştirilebilecek alan: ${list}.`,
      write: 'Yorumunuzu yazın', rate: 'Puanınız', placeholder: 'Deneyiminizi birkaç cümleyle anlatın…',
      submit: 'Yorumu Gönder', thanks: 'Teşekkürler! Yorumunuz kaydedildi.', needRating: 'Lütfen puan verin.',
      sample: 'Örnek yorum', you: 'Siz',
      and: 've',
    },

    staff: {
      title: 'Personel Paneli', live: 'Canlı Senkron', hint: 'Durumu ilerletmek için bir kayda dokunun.',
      tabs: { all: 'Tümü', orders: 'Siparişler', requests: 'Talepler' },
      empty: 'Kayıt yok.', open: (n) => `${n} açık`, reset: 'Demoyu sıfırla',
      qrTitle: 'Oda QR Kodu', qrDesc: 'Misafir bu kodu okutunca doğrudan odasıyla giriş yapar.',
      qrRoom: 'Oda no',
      syncNote: 'Misafir ekranını başka bir sekmede açın: siparişler burada anında görünür.',
    },

    status: { new: 'Yeni', pending: 'Beklemede', preparing: 'Hazırlanıyor', onTheWay: 'Yolda', done: 'Tamamlandı' },
  },

  EN: {
    room: 'Room', total: 'Total', cancel: 'Cancel', confirm: 'Confirm', send: 'Send', back: 'Back',
    logout: 'Logout', demo: 'Demo', hours: (n) => `${n} h`, minutes: (n) => `${n} min`,

    login: {
      title: 'askHermis Portal', sub: 'Hermis Boutique Hotel Athens',
      scan: 'Scan the QR code in your room or enter your room number',
      placeholder: 'Your Room Number (e.g. 302)', error: 'Please enter a valid room number.',
      btn: 'Sign In',
    },

    nav: { home: 'Home', menu: 'Menu', explore: 'Explore', ai: 'Concierge', services: 'Services' },

    home: {
      welcome: 'Welcome to the heart of Athens!', subWelcome: 'Hermis Boutique Hotel Guest Portal',
      greeting: { morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening' },
      forYou: 'For you',
      recBreakfast: 'Breakfast time: order a breakfast plate to your room',
      recRoute: 'Route idea for today',
      recSunset: 'Sunset is coming: Lycabettus or our rooftop',
      recDinner: 'Chef’s pick for dinner',
      campaign: 'Special Offer',
      info: 'Hotel Info', wifi: 'Wi-Fi', breakfast: 'Breakfast', checkout: 'Check-out', reception: 'Reception',
      tiles: { menu: 'Restaurant Menu', explore: 'Route Discovery', ai: 'AI Concierge', services: 'Hotel Services', reviews: 'Guest Reviews', staff: 'Staff Panel' },
    },

    menu: {
      title: 'Restaurant Menu', all: 'All', add: 'Add to Cart', added: 'Added',
      cartTitle: 'Order Cart', cartBadge: (n) => `Cart: ${n} item${n === 1 ? '' : 's'}`,
      confirmOrder: 'Confirm Order', successOrder: 'Your order has been sent to staff!',
      allergens: 'Allergens', eta: 'Estimated room service time: 25–35 min', notePlaceholder: 'Note for the kitchen (allergy, preference...)',
      viewCart: 'View cart',
    },

    explore: {
      title: 'Route Discovery', sub: 'Explore Athens with routes curated by our hotel.',
      filterAll: 'All', stops: (n) => `${n} stops`, walk: (n) => `${n} km walk`,
      openRoute: 'Open route in Maps', openStop: 'Open in Maps', tip: 'Local tip', featured: 'Featured',
      none: 'No routes match these preferences.', askAI: 'Ask concierge',
    },

    ai: {
      title: 'askHermis AI Concierge', placeholder: 'Ask the concierge anything...', typing: 'Typing…',
      welcome: 'Hello! I’m Hermis AI Concierge. I can help with food orders, room cleaning, transfers, table bookings or Athens routes.',
      chips: ['Order 2 moussaka', 'I need room cleaning', 'Airport transfer', 'Suggest a sunset route', 'Wi-Fi password'],
      confirmTitle: 'Waiting for your confirmation',
      confirmOrder: 'Shall I place this order?',
      confirmRequest: 'Shall I send this request to staff?',
      done: 'Done! Your request was sent to staff. You can follow it in the Staff Panel.',
      cancelled: 'Cancelled. Anything else I can do?',
      fallback: 'I didn’t quite get that. Did you mean one of these?',
      unknownItem: 'I couldn’t find that on our menu. Could you pick something from the menu?',
      orderNeedsItem: 'What would you like to order? For example: "1 moussaka and 2 lemonades".',
      priceRule: 'The transfer fee is confirmed by reception; I can’t give an estimated price.',
      routeIntro: 'I recommend this route:',
      routeMore: 'See the Explore tab for all routes.',
      cleaningSlot: 'Which time slot works for you?',
      transferWhere: 'Where would you like to go?',
      tableWhere: 'Restaurant or rooftop?',
      howMany: 'How many people?',
      whatTime: 'What time? (e.g. 20:00)',
      amenitiesWhich: 'What should we bring?',
      menuHint: 'A few picks from the menu:',
      greeting: 'Hello! How can I help you?',
      thanks: 'You’re welcome, enjoy your stay! 😊',
    },

    services: {
      title: 'Hotel Services', sub: 'Send a request and our staff will take care of it.',
      request: 'Send Request', sent: 'Your request was sent to staff!',
      slot: 'Time slot', items: 'Items', destination: 'Destination', venue: 'Venue',
      datetime: 'Date & time', people: 'People', note: 'Note (optional)',
      free: 'Free', onRequest: 'Price confirmed by reception',
      required: 'Please fill in the required fields.',
    },

    reviews: {
      title: 'Guest Reviews', sub: 'Rate your stay.',
      average: 'Average rating', count: (n) => `${n} reviews`,
      aiTitle: 'AI Review Summary', aiNote: 'Automatically summarised from reviews',
      praise: (list) => `Guests praise the ${list} the most.`,
      complain: (list) => `Room for improvement: ${list}.`,
      write: 'Write a review', rate: 'Your rating', placeholder: 'Tell us about your stay in a few sentences…',
      submit: 'Submit Review', thanks: 'Thank you! Your review was saved.', needRating: 'Please give a rating.',
      sample: 'Sample review', you: 'You',
      and: 'and',
    },

    staff: {
      title: 'Staff Panel', live: 'Live Sync', hint: 'Tap a record to advance its status.',
      tabs: { all: 'All', orders: 'Orders', requests: 'Requests' },
      empty: 'No records.', open: (n) => `${n} open`, reset: 'Reset demo',
      qrTitle: 'Room QR Code', qrDesc: 'Guests scan this code to sign in directly with their room.',
      qrRoom: 'Room no',
      syncNote: 'Open the guest screen in another tab: orders appear here instantly.',
    },

    status: { new: 'New', pending: 'Pending', preparing: 'Preparing', onTheWay: 'On the way', done: 'Done' },
  },

  EL: {
    room: 'Δωμάτιο', total: 'Σύνολο', cancel: 'Ακύρωση', confirm: 'Επιβεβαίωση', send: 'Αποστολή', back: 'Πίσω',
    logout: 'Έξοδος', demo: 'Demo', hours: (n) => `${String(n).replace('.', ',')} ώρες`, minutes: (n) => `${n} λεπτά`,

    login: {
      title: 'askHermis Portal', sub: 'Hermis Boutique Hotel Athens',
      scan: 'Σαρώστε το QR στο δωμάτιο ή εισάγετε τον αριθμό δωματίου',
      placeholder: 'Αριθμός Δωματίου (π.χ. 302)', error: 'Εισάγετε έγκυρο αριθμό δωματίου.',
      btn: 'Σύνδεση',
    },

    nav: { home: 'Αρχική', menu: 'Μενού', explore: 'Εξερεύνηση', ai: 'Θυρωρός', services: 'Υπηρεσίες' },

    home: {
      welcome: 'Καλώς ορίσατε στην καρδιά της Αθήνας!', subWelcome: 'Πύλη Επισκεπτών Hermis Boutique Hotel',
      greeting: { morning: 'Καλημέρα', afternoon: 'Καλό απόγευμα', evening: 'Καλησπέρα' },
      forYou: 'Για εσάς',
      recBreakfast: 'Ώρα για πρωινό: παραγγείλτε στο δωμάτιο',
      recRoute: 'Πρόταση διαδρομής για σήμερα',
      recSunset: 'Πλησιάζει το ηλιοβασίλεμα: Λυκαβηττός ή η ταράτσα μας',
      recDinner: 'Πρόταση του σεφ για δείπνο',
      campaign: 'Ειδική Προσφορά',
      info: 'Πληροφορίες', wifi: 'Wi-Fi', breakfast: 'Πρωινό', checkout: 'Αναχώρηση', reception: 'Ρεσεψιόν',
      tiles: { menu: 'Μενού Εστιατορίου', explore: 'Διαδρομές', ai: 'AI Θυρωρός', services: 'Υπηρεσίες', reviews: 'Κριτικές', staff: 'Πίνακας Προσωπικού' },
    },

    menu: {
      title: 'Μενού Εστιατορίου', all: 'Όλα', add: 'Προσθήκη', added: 'Προστέθηκε',
      cartTitle: 'Καλάθι Παραγγελίας', cartBadge: (n) => `Καλάθι: ${n}`,
      confirmOrder: 'Επιβεβαίωση', successOrder: 'Η παραγγελία σας εστάλη!',
      allergens: 'Αλλεργιογόνα', eta: 'Εκτιμώμενος χρόνος: 25–35 λεπτά', notePlaceholder: 'Σημείωση για την κουζίνα…',
      viewCart: 'Καλάθι',
    },

    explore: {
      title: 'Ανακαλύψτε Διαδρομές', sub: 'Εξερευνήστε την Αθήνα με τις προτάσεις μας.',
      filterAll: 'Όλα', stops: (n) => `${n} στάσεις`, walk: (n) => `${String(n).replace('.', ',')} km περπάτημα`,
      openRoute: 'Άνοιγμα στους Χάρτες', openStop: 'Χάρτης', tip: 'Τοπική συμβουλή', featured: 'Προτεινόμενο',
      none: 'Καμία διαδρομή για αυτές τις προτιμήσεις.', askAI: 'Ρωτήστε τον θυρωρό',
    },

    ai: {
      title: 'askHermis AI Θυρωρός', placeholder: 'Ρωτήστε τον θυρωρό...', typing: 'Πληκτρολογεί…',
      welcome: 'Γεια σας! Είμαι ο Hermis AI Θυρωρός. Μπορώ να βοηθήσω με παραγγελίες, καθαρισμό, μεταφορές, κρατήσεις ή διαδρομές στην Αθήνα.',
      chips: ['2 μουσακάδες', 'Καθαρισμός δωματίου', 'Μεταφορά στο αεροδρόμιο', 'Διαδρομή για ηλιοβασίλεμα', 'Κωδικός Wi-Fi'],
      confirmTitle: 'Περιμένω την επιβεβαίωσή σας',
      confirmOrder: 'Να καταχωρήσω την παραγγελία;',
      confirmRequest: 'Να στείλω το αίτημα στο προσωπικό;',
      done: 'Έγινε! Το αίτημά σας στάλθηκε στο προσωπικό.',
      cancelled: 'Ακυρώθηκε. Θέλετε κάτι άλλο;',
      fallback: 'Δεν κατάλαβα ακριβώς. Μήπως εννοείτε κάποιο από αυτά;',
      unknownItem: 'Δεν βρήκα αυτό στο μενού. Διαλέξτε κάτι από το μενού.',
      orderNeedsItem: 'Τι θα θέλατε να παραγγείλετε; π.χ. «1 μουσακάς και 2 λεμονάδες».',
      priceRule: 'Η τιμή της μεταφοράς επιβεβαιώνεται από τη ρεσεψιόν.',
      routeIntro: 'Σας προτείνω αυτή τη διαδρομή:',
      routeMore: 'Δείτε όλες τις διαδρομές στην Εξερεύνηση.',
      cleaningSlot: 'Ποια ώρα σας βολεύει;',
      transferWhere: 'Πού θέλετε να πάτε;',
      tableWhere: 'Εστιατόριο ή ταράτσα;',
      howMany: 'Πόσα άτομα;',
      whatTime: 'Τι ώρα; (π.χ. 20:00)',
      amenitiesWhich: 'Τι να σας φέρουμε;',
      menuHint: 'Μερικές προτάσεις από το μενού:',
      greeting: 'Γεια σας! Πώς μπορώ να βοηθήσω;',
      thanks: 'Παρακαλώ, καλή διαμονή! 😊',
    },

    services: {
      title: 'Υπηρεσίες Ξενοδοχείου', sub: 'Στείλτε αίτημα και το προσωπικό θα φροντίσει.',
      request: 'Αποστολή', sent: 'Το αίτημά σας στάλθηκε!',
      slot: 'Ώρα', items: 'Είδη', destination: 'Προορισμός', venue: 'Χώρος',
      datetime: 'Ημερομηνία & ώρα', people: 'Άτομα', note: 'Σημείωση (προαιρετικό)',
      free: 'Δωρεάν', onRequest: 'Η τιμή επιβεβαιώνεται από τη ρεσεψιόν',
      required: 'Συμπληρώστε τα απαιτούμενα πεδία.',
    },

    reviews: {
      title: 'Κριτικές', sub: 'Αξιολογήστε τη διαμονή σας.',
      average: 'Μέση βαθμολογία', count: (n) => `${n} κριτικές`,
      aiTitle: 'Σύνοψη Κριτικών AI', aiNote: 'Αυτόματη σύνοψη από κριτικές',
      praise: (list) => `Οι επισκέπτες επαινούν κυρίως: ${list}.`,
      complain: (list) => `Προς βελτίωση: ${list}.`,
      write: 'Γράψτε κριτική', rate: 'Βαθμολογία', placeholder: 'Πείτε μας για τη διαμονή σας…',
      submit: 'Υποβολή', thanks: 'Ευχαριστούμε! Η κριτική σας αποθηκεύτηκε.', needRating: 'Δώστε βαθμολογία.',
      sample: 'Δείγμα κριτικής', you: 'Εσείς',
      and: 'και',
    },

    staff: {
      title: 'Πίνακας Προσωπικού', live: 'Ζωντανά', hint: 'Πατήστε μια εγγραφή για αλλαγή κατάστασης.',
      tabs: { all: 'Όλα', orders: 'Παραγγελίες', requests: 'Αιτήματα' },
      empty: 'Καμία εγγραφή.', open: (n) => `${n} ανοιχτά`, reset: 'Επαναφορά demo',
      qrTitle: 'QR Δωματίου', qrDesc: 'Ο επισκέπτης σαρώνει και συνδέεται απευθείας.',
      qrRoom: 'Δωμάτιο',
      syncNote: 'Ανοίξτε την οθόνη επισκέπτη σε άλλη καρτέλα: οι παραγγελίες εμφανίζονται αμέσως.',
    },

    status: { new: 'Νέο', pending: 'Σε αναμονή', preparing: 'Ετοιμάζεται', onTheWay: 'Καθ’ οδόν', done: 'Ολοκληρώθηκε' },
  },
};
