// =============================================================
//  OTEL BİLGİLERİ VE HİZMETLER  (içerik: Üye 2)
//  Demo otel bilgileridir. AI asistan SADECE buradaki bilgileri kullanır;
//  burada olmayan fiyat / müsaitlik bilgisini uydurmaz.
// =============================================================

export const hotel = {
  name: 'Hermis Boutique Hotel',
  area: { TR: 'Plaka, Atina', EN: 'Plaka, Athens', EL: 'Πλάκα, Αθήνα' },
  checkIn: '14:00',
  checkOut: '11:00',
  breakfast: '07:30 – 10:30',
  restaurant: '12:00 – 23:00',
  roomService: '07:00 – 23:00',
  rooftop: '17:00 – 00:00',
  wifi: { name: 'Hermis-Guest', password: 'athens2026' },
  reception: { TR: '7/24 açık · Odadan 9’u tuşlayın', EN: 'Open 24/7 · Dial 9 from your room', EL: 'Ανοιχτή 24/7 · Καλέστε 9' },
};

// AI asistanın cevaplayabildiği sık sorulan sorular.
// keywords: mesajda bu kelimelerden biri geçerse cevap verilir (TR/EN/EL + yazım hataları)
export const faq = [
  {
    id: 'wifi',
    keywords: ['wifi', 'wi-fi', 'wi fi', 'internet', 'sifre', 'şifre', 'password', 'κωδικο', 'ιντερνετ'],
    answer: {
      TR: `Wi-Fi ağı: ${hotel.wifi.name} · Şifre: ${hotel.wifi.password}`,
      EN: `Wi-Fi network: ${hotel.wifi.name} · Password: ${hotel.wifi.password}`,
      EL: `Δίκτυο Wi-Fi: ${hotel.wifi.name} · Κωδικός: ${hotel.wifi.password}`,
    },
  },
  {
    id: 'breakfast',
    keywords: ['kahvalti saat', 'kahvaltı saat', 'kahvalti ne zaman', 'breakfast time', 'breakfast hours', 'when is breakfast', 'πρωινο ωρα', 'τι ωρα πρωινο'],
    answer: {
      TR: `Kahvaltı her gün ${hotel.breakfast} arası restoranımızda servis edilir.`,
      EN: `Breakfast is served daily ${hotel.breakfast} in our restaurant.`,
      EL: `Το πρωινό σερβίρεται καθημερινά ${hotel.breakfast}.`,
    },
  },
  {
    id: 'checkout',
    keywords: ['check out', 'checkout', 'cikis saat', 'çıkış saat', 'gec cikis', 'geç çıkış', 'late checkout', 'αναχωρηση'],
    answer: {
      TR: `Check-out saati ${hotel.checkOut}. Geç çıkış müsaitliğe bağlıdır; isterseniz resepsiyona talep iletebilirim.`,
      EN: `Check-out is at ${hotel.checkOut}. Late check-out depends on availability; I can forward a request to reception.`,
      EL: `Η αναχώρηση είναι στις ${hotel.checkOut}. Η καθυστερημένη αναχώρηση εξαρτάται από τη διαθεσιμότητα.`,
    },
  },
  {
    id: 'checkin',
    keywords: ['check in', 'checkin', 'giris saat', 'giriş saat', 'αφιξη'],
    answer: {
      TR: `Check-in saati ${hotel.checkIn}.`,
      EN: `Check-in is from ${hotel.checkIn}.`,
      EL: `Η άφιξη είναι από τις ${hotel.checkIn}.`,
    },
  },
  {
    id: 'rooftop',
    keywords: ['teras', 'rooftop', 'roof', 'bar', 'ταρατσα', 'μπαρ'],
    answer: {
      TR: `Çatı terasımız ${hotel.rooftop} arası açık ve Akropolis manzaralı. Masa ayırtmak ister misiniz?`,
      EN: `Our rooftop is open ${hotel.rooftop} with an Acropolis view. Would you like to book a table?`,
      EL: `Η ταράτσα μας είναι ανοιχτή ${hotel.rooftop} με θέα την Ακρόπολη.`,
    },
  },
  {
    id: 'luggage',
    keywords: ['bavul', 'valiz', 'esya', 'eşya', 'luggage', 'bags', 'αποσκευ', 'βαλιτσ'],
    answer: {
      TR: 'Check-out sonrası bavullarınızı resepsiyonda ücretsiz saklayabiliriz.',
      EN: 'We can store your luggage at reception free of charge after check-out.',
      EL: 'Φυλάσσουμε δωρεάν τις αποσκευές σας στη ρεσεψιόν.',
    },
  },
];

// Otel hizmetleri (Otel Hizmetleri ekranı + AI asistan)
// Fiyatı belli olmayan hizmetlerde price: null → "Fiyat resepsiyon tarafından onaylanır" yazılır.
export const services = [
  {
    id: 'cleaning', icon: 'Sparkles', price: 0,
    name: { TR: 'Oda Temizliği', EN: 'Room Cleaning', EL: 'Καθαρισμός Δωματίου' },
    desc: { TR: 'Size uygun saati seçin, kat görevlimiz gelsin.', EN: 'Pick a time and housekeeping will come by.', EL: 'Επιλέξτε ώρα για καθαρισμό.' },
    fields: ['slot', 'note'],
    slots: ['09:00 – 11:00', '11:00 – 13:00', '13:00 – 15:00', '15:00 – 17:00'],
    keywords: ['temizlik', 'temizle', 'temzlik', 'clean', 'cleaning', 'housekeeping', 'καθαρισ'],
  },
  {
    id: 'amenities', icon: 'BedDouble', price: 0,
    name: { TR: 'Havlu & Malzeme', EN: 'Towels & Amenities', EL: 'Πετσέτες & Είδη' },
    desc: { TR: 'Ekstra havlu, yastık, battaniye veya banyo malzemesi.', EN: 'Extra towels, pillows, blankets or toiletries.', EL: 'Επιπλέον πετσέτες, μαξιλάρια ή είδη μπάνιου.' },
    fields: ['items', 'note'],
    items: [
      { id: 'towel', name: { TR: 'Havlu', EN: 'Towels', EL: 'Πετσέτες' } },
      { id: 'pillow', name: { TR: 'Yastık', EN: 'Pillow', EL: 'Μαξιλάρι' } },
      { id: 'blanket', name: { TR: 'Battaniye', EN: 'Blanket', EL: 'Κουβέρτα' } },
      { id: 'toiletries', name: { TR: 'Banyo seti', EN: 'Toiletries', EL: 'Είδη μπάνιου' } },
    ],
    keywords: ['havlu', 'yastik', 'yastık', 'battaniye', 'towel', 'pillow', 'blanket', 'πετσετ', 'μαξιλαρ'],
  },
  {
    id: 'transfer', icon: 'Car', price: null,
    name: { TR: 'Transfer', EN: 'Transfer', EL: 'Μεταφορά' },
    desc: { TR: 'Havalimanı, Pire limanı veya şehir içi transfer.', EN: 'Airport, Piraeus port or city transfer.', EL: 'Αεροδρόμιο, λιμάνι Πειραιά ή πόλη.' },
    fields: ['destination', 'datetime', 'people', 'note'],
    destinations: [
      { id: 'airport', name: { TR: 'Atina Havalimanı', EN: 'Athens Airport', EL: 'Αεροδρόμιο Αθηνών' } },
      { id: 'piraeus', name: { TR: 'Pire Limanı', EN: 'Piraeus Port', EL: 'Λιμάνι Πειραιά' } },
      { id: 'city', name: { TR: 'Şehir içi', EN: 'City', EL: 'Εντός πόλης' } },
    ],
    keywords: ['transfer', 'taksi', 'taxi', 'havalimani', 'havalimanı', 'airport', 'liman', 'port', 'pire', 'piraeus', 'ταξι', 'αεροδρομ', 'μεταφορ'],
  },
  {
    id: 'table', icon: 'UtensilsCrossed', price: 0,
    name: { TR: 'Masa Rezervasyonu', EN: 'Table Booking', EL: 'Κράτηση Τραπεζιού' },
    desc: { TR: 'Restoran veya Akropolis manzaralı çatı terası.', EN: 'Restaurant or the Acropolis-view rooftop.', EL: 'Εστιατόριο ή ταράτσα με θέα.' },
    fields: ['venue', 'datetime', 'people', 'note'],
    venues: [
      { id: 'restaurant', name: { TR: 'Restoran', EN: 'Restaurant', EL: 'Εστιατόριο' } },
      { id: 'rooftop', name: { TR: 'Çatı Terası', EN: 'Rooftop', EL: 'Ταράτσα' } },
    ],
    keywords: ['masa', 'rezervasyon', 'rezerv', 'table', 'book', 'reservation', 'τραπεζι', 'κρατηση'],
  },
];

// Ana ekrandaki özel kampanya (Deep Blue)
export const campaign = {
  title: { TR: 'Terasta Gün Batımı Saati', EN: 'Rooftop Sunset Hour', EL: 'Ώρα Ηλιοβασιλέματος στην Ταράτσα' },
  desc: {
    TR: 'Her akşam 18:00 – 20:00 arası Akropolis manzarasıyla ikinci kokteyl bizden.',
    EN: 'Every evening 18:00 – 20:00, your second cocktail is on us with an Acropolis view.',
    EL: 'Κάθε βράδυ 18:00 – 20:00, το δεύτερο κοκτέιλ κερασμένο.',
  },
  cta: { TR: 'Masa ayırt', EN: 'Book a table', EL: 'Κράτηση' },
};
