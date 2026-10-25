// =============================================================
//  ÖRNEK MİSAFİR YORUMLARI  (içerik: Üye 2)
//  Demo verisidir; uygulamada "örnek yorum" olarak etiketlenir.
//  topics: AI özetinin hangi konudan bahsettiğini anlaması için.
//    pozitif: 'location' | 'breakfast' | 'staff' | 'rooftop' | 'clean' | 'concierge'
//    negatif: 'noise' | 'smallRoom' | 'slowService'
// =============================================================

export const topicLabels = {
  location: { TR: 'konum', EN: 'location', EL: 'τοποθεσία', positive: true },
  breakfast: { TR: 'kahvaltı', EN: 'breakfast', EL: 'πρωινό', positive: true },
  staff: { TR: 'personel', EN: 'staff', EL: 'προσωπικό', positive: true },
  rooftop: { TR: 'çatı terası', EN: 'rooftop', EL: 'ταράτσα', positive: true },
  clean: { TR: 'temizlik', EN: 'cleanliness', EL: 'καθαριότητα', positive: true },
  concierge: { TR: 'AI asistan', EN: 'AI concierge', EL: 'AI θυρωρός', positive: true },
  noise: { TR: 'sokak gürültüsü', EN: 'street noise', EL: 'θόρυβος', positive: false },
  smallRoom: { TR: 'oda büyüklüğü', EN: 'room size', EL: 'μέγεθος δωματίου', positive: false },
  slowService: { TR: 'servis hızı', EN: 'service speed', EL: 'ταχύτητα σέρβις', positive: false },
};

export const sampleReviews = [
  { id: 1, name: 'Elif', country: '🇹🇷', rating: 5, lang: 'TR', date: '2026-10-12', topics: ['location', 'rooftop', 'staff'], text: 'Plaka’nın tam ortasında, terastan Akropolis manzarası inanılmaz. Personel çok ilgiliydi.' },
  { id: 2, name: 'James', country: '🇬🇧', rating: 5, lang: 'EN', date: '2026-10-10', topics: ['breakfast', 'concierge'], text: 'Best breakfast we had in Athens. The concierge app suggested a sunset route that was perfect.' },
  { id: 3, name: 'Maria', country: '🇬🇷', rating: 4, lang: 'EL', date: '2026-10-08', topics: ['clean', 'noise'], text: 'Πολύ καθαρό δωμάτιο, λίγος θόρυβος από τον δρόμο το βράδυ.' },
  { id: 4, name: 'Lukas', country: '🇩🇪', rating: 5, lang: 'EN', date: '2026-10-05', topics: ['location', 'staff', 'concierge'], text: 'Walking distance to everything. Ordering room service from the app was super easy.' },
  { id: 5, name: 'Ayşe', country: '🇹🇷', rating: 4, lang: 'TR', date: '2026-10-02', topics: ['breakfast', 'smallRoom'], text: 'Kahvaltı çok güzeldi, oda biraz küçüktü ama temiz ve şıktı.' },
  { id: 6, name: 'Sophie', country: '🇫🇷', rating: 5, lang: 'EN', date: '2026-09-28', topics: ['rooftop', 'breakfast'], text: 'The rooftop at sunset is magical. Greek yogurt with honey every morning!' },
  { id: 7, name: 'Nikos', country: '🇬🇷', rating: 3, lang: 'EL', date: '2026-09-25', topics: ['slowService', 'location'], text: 'Εξαιρετική τοποθεσία, αλλά το room service άργησε λίγο.' },
  { id: 8, name: 'Can', country: '🇹🇷', rating: 5, lang: 'TR', date: '2026-09-20', topics: ['concierge', 'clean', 'staff'], text: 'Temizlik talebini uygulamadan verdim, 20 dakikada geldiler. Çok pratik.' },
];
