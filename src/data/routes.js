// =============================================================
//  ATİNA ROTALARI  (içerik: Üye 2)
//  - hours: toplam süre (saat), walkKm: yaklaşık yürüme mesafesi
//  - tags: kullanıcı tercih filtresi ve AI öneri için kullanılır
//      'history' | 'food' | 'sunset' | 'family' | 'easy' | 'culture' | 'nature'
//  - stops[].place: Google Haritalar'da aranacak isim (İngilizce yazın)
//  - stops[].minutes: o durakta önerilen süre
//  - Not: Süreler ve ipuçları demo amaçlı; sunumdan önce kontrol edin.
// =============================================================

export const routeTags = {
  history: { TR: 'Tarih', EN: 'History', EL: 'Ιστορία', emoji: '🏛️' },
  food: { TR: 'Yemek', EN: 'Food', EL: 'Φαγητό', emoji: '🍽️' },
  sunset: { TR: 'Gün batımı', EN: 'Sunset', EL: 'Ηλιοβασίλεμα', emoji: '🌅' },
  family: { TR: 'Aile', EN: 'Family', EL: 'Οικογένεια', emoji: '👨‍👩‍👧' },
  easy: { TR: 'Az yürüyüş', EN: 'Easy walk', EL: 'Λίγο περπάτημα', emoji: '🚶' },
  culture: { TR: 'Kültür & sanat', EN: 'Culture & art', EL: 'Πολιτισμός', emoji: '🎭' },
  nature: { TR: 'Doğa', EN: 'Nature', EL: 'Φύση', emoji: '🌿' },
};

export const routes = [
  {
    id: 'ancient-classics', hours: 3, walkKm: 3, tags: ['history', 'culture'], featured: true,
    title: { TR: 'Antik Atina Klasikleri', EN: 'Ancient Athens Classics', EL: 'Κλασικά της Αρχαίας Αθήνας' },
    desc: { TR: 'Akropolis, Akropolis Müzesi ve Dionysiou Areopagitou yürüyüşü.', EN: 'Acropolis, Acropolis Museum and the Dionysiou Areopagitou walk.', EL: 'Ακρόπολη, Μουσείο Ακρόπολης και Διονυσίου Αρεοπαγίτου.' },
    tip: { TR: 'Sıcak ve kalabalıktan kaçmak için Akropolis’e açılış saatinde gidin, su almayı unutmayın.', EN: 'Go to the Acropolis at opening time to avoid heat and crowds; bring water.', EL: 'Πηγαίνετε στην Ακρόπολη με το άνοιγμα για λιγότερο κόσμο· πάρτε νερό.' },
    stops: [
      { place: 'Acropolis of Athens', minutes: 90, name: { TR: 'Akropolis', EN: 'Acropolis', EL: 'Ακρόπολη' } },
      { place: 'Dionysiou Areopagitou, Athens', minutes: 20, name: { TR: 'Dionysiou Areopagitou Yürüyüşü', EN: 'Dionysiou Areopagitou Walk', EL: 'Διονυσίου Αρεοπαγίτου' } },
      { place: 'Acropolis Museum', minutes: 70, name: { TR: 'Akropolis Müzesi', EN: 'Acropolis Museum', EL: 'Μουσείο Ακρόπολης' } },
    ],
  },
  {
    id: 'plaka-streets', hours: 2.5, walkKm: 2.5, tags: ['history', 'easy', 'family'],
    title: { TR: 'Plaka’nın Tarihi Sokakları', EN: 'Historic Streets of Plaka', EL: 'Ιστορικά Σοκάκια της Πλάκας' },
    desc: { TR: 'Anafiotika evleri, Roma Agorası, Rüzgârlar Kulesi ve Monastiraki.', EN: 'Anafiotika houses, Roman Agora, Tower of the Winds and Monastiraki.', EL: 'Αναφιώτικα, Ρωμαϊκή Αγορά, Αέρηδες και Μοναστηράκι.' },
    tip: { TR: 'Otelimize yürüme mesafesinde. Anafiotika’nın dar merdivenlerinde rahat ayakkabı giyin.', EN: 'Walking distance from the hotel. Wear comfy shoes for Anafiotika’s narrow steps.', EL: 'Κοντά στο ξενοδοχείο. Φορέστε άνετα παπούτσια στα Αναφιώτικα.' },
    stops: [
      { place: 'Anafiotika, Athens', minutes: 30, name: { TR: 'Anafiotika', EN: 'Anafiotika', EL: 'Αναφιώτικα' } },
      { place: 'Roman Agora, Athens', minutes: 30, name: { TR: 'Roma Agorası & Rüzgârlar Kulesi', EN: 'Roman Agora & Tower of the Winds', EL: 'Ρωμαϊκή Αγορά & Αέρηδες' } },
      { place: 'Monastiraki Square', minutes: 40, name: { TR: 'Monastiraki Meydanı ve Bit Pazarı', EN: 'Monastiraki Square & Flea Market', EL: 'Πλατεία Μοναστηρακίου' } },
    ],
  },
  {
    id: 'food-markets', hours: 2, walkKm: 2, tags: ['food', 'culture'],
    title: { TR: 'Gastronomi ve Yerel Pazarlar', EN: 'Gastronomy & Local Markets', EL: 'Γαστρονομία και Αγορές' },
    desc: { TR: 'Varvakios Merkez Pazarı, baharatçılar ve Psirri sokak lezzetleri.', EN: 'Varvakios Central Market, spice shops and Psirri street food.', EL: 'Βαρβάκειος Αγορά, μπαχαράδικα και street food στου Ψυρρή.' },
    tip: { TR: 'Pazar sabahları en canlı halinde; pazar günü çoğu tezgâh kapalı olur.', EN: 'The market is liveliest in the morning; most stalls close on Sundays.', EL: 'Η αγορά είναι πιο ζωντανή το πρωί· Κυριακή είναι κλειστή.' },
    stops: [
      { place: 'Varvakios Agora, Athens', minutes: 40, name: { TR: 'Varvakios Merkez Pazarı', EN: 'Varvakios Central Market', EL: 'Βαρβάκειος Αγορά' } },
      { place: 'Evripidou Street, Athens', minutes: 25, name: { TR: 'Evripidou Baharat Sokağı', EN: 'Evripidou Spice Street', EL: 'Οδός Ευριπίδου' } },
      { place: 'Psyrri, Athens', minutes: 50, name: { TR: 'Psirri’de Meze ve Souvlaki', EN: 'Meze & Souvlaki in Psirri', EL: 'Μεζέδες στου Ψυρρή' } },
    ],
  },
  {
    id: 'lycabettus-sunset', hours: 2, walkKm: 1.5, tags: ['sunset', 'nature', 'easy'],
    title: { TR: 'Lycabettus Tepesi Gün Batımı', EN: 'Lycabettus Hill Sunset', EL: 'Ηλιοβασίλεμα στον Λυκαβηττό' },
    desc: { TR: 'Kolonaki’den füniküler ile tepeye çıkış ve 360° Atina manzarası.', EN: 'Funicular from Kolonaki to the top and a 360° view of Athens.', EL: 'Τελεφερίκ από το Κολωνάκι και θέα 360°.' },
    tip: { TR: 'Gün batımından 45 dakika önce yukarıda olun, en iyi yerler erken doluyor.', EN: 'Be at the top 45 minutes before sunset; the best spots fill up early.', EL: 'Ανεβείτε 45 λεπτά πριν τη δύση.' },
    stops: [
      { place: 'Kolonaki Square', minutes: 30, name: { TR: 'Kolonaki Meydanı', EN: 'Kolonaki Square', EL: 'Πλατεία Κολωνακίου' } },
      { place: 'Lycabettus Funicular', minutes: 15, name: { TR: 'Lycabettus Füniküleri', EN: 'Lycabettus Funicular', EL: 'Τελεφερίκ Λυκαβηττού' } },
      { place: 'Mount Lycabettus', minutes: 60, name: { TR: 'Tepe ve Agios Georgios Şapeli', EN: 'Summit & St. George Chapel', EL: 'Κορυφή & Άγιος Γεώργιος' } },
    ],
  },
  {
    id: 'agora-philopappos', hours: 3, walkKm: 4, tags: ['history', 'sunset', 'nature'],
    title: { TR: 'Antik Agora ve Filopappos Tepesi', EN: 'Ancient Agora & Philopappos Hill', EL: 'Αρχαία Αγορά & Φιλοπάππου' },
    desc: { TR: 'Hephaistos Tapınağı, Areopagus kayası ve Akropolis manzaralı tepe.', EN: 'Temple of Hephaestus, Areopagus rock and a hill facing the Acropolis.', EL: 'Ναός Ηφαίστου, Άρειος Πάγος και λόφος με θέα.' },
    tip: { TR: 'Areopagus kayası kaygan olabilir; Akropolis fotoğrafı için en iyi açı Filopappos’tan.', EN: 'Areopagus rock can be slippery; Philopappos gives the best Acropolis photo angle.', EL: 'Ο Άρειος Πάγος γλιστράει· η καλύτερη φωτογραφία είναι από τον Φιλοπάππου.' },
    stops: [
      { place: 'Ancient Agora of Athens', minutes: 75, name: { TR: 'Antik Agora & Hephaistos Tapınağı', EN: 'Ancient Agora & Temple of Hephaestus', EL: 'Αρχαία Αγορά & Ηφαίστειο' } },
      { place: 'Areopagus Hill', minutes: 20, name: { TR: 'Areopagus Kayası', EN: 'Areopagus Hill', EL: 'Άρειος Πάγος' } },
      { place: 'Philopappos Hill', minutes: 45, name: { TR: 'Filopappos Tepesi', EN: 'Philopappos Hill', EL: 'Λόφος Φιλοπάππου' } },
    ],
  },
  {
    id: 'syntagma-garden', hours: 2.5, walkKm: 3, tags: ['family', 'nature', 'easy', 'history'],
    title: { TR: 'Syntagma, Ulusal Bahçe ve Panathenaic Stadı', EN: 'Syntagma, National Garden & Panathenaic Stadium', EL: 'Σύνταγμα, Εθνικός Κήπος & Καλλιμάρμαρο' },
    desc: { TR: 'Evzon nöbet değişimi, gölgeli bahçe yürüyüşü ve ilk modern olimpiyat stadı.', EN: 'Evzones guard change, a shady garden walk and the first modern Olympic stadium.', EL: 'Αλλαγή φρουράς, βόλτα στον κήπο και το Καλλιμάρμαρο.' },
    tip: { TR: 'Nöbet değişimi her saat başı; pazar sabahı törensel versiyonu yapılır.', EN: 'The guard changes every hour on the hour, with a ceremonial version on Sunday mornings.', EL: 'Η αλλαγή φρουράς γίνεται κάθε ώρα· επίσημη την Κυριακή το πρωί.' },
    stops: [
      { place: 'Tomb of the Unknown Soldier, Athens', minutes: 20, name: { TR: 'Syntagma – Nöbet Değişimi', EN: 'Syntagma – Changing of the Guard', EL: 'Σύνταγμα – Αλλαγή Φρουράς' } },
      { place: 'National Garden, Athens', minutes: 45, name: { TR: 'Ulusal Bahçe & Zappeion', EN: 'National Garden & Zappeion', EL: 'Εθνικός Κήπος & Ζάππειο' } },
      { place: 'Panathenaic Stadium', minutes: 45, name: { TR: 'Panathenaic Stadı', EN: 'Panathenaic Stadium', EL: 'Καλλιμάρμαρο Στάδιο' } },
    ],
  },
  {
    id: 'snfcc-seaside', hours: 3, walkKm: 2, tags: ['culture', 'nature', 'family', 'sunset'],
    title: { TR: 'Stavros Niarchos Kültür Merkezi ve Sahil', EN: 'Stavros Niarchos Cultural Center & Seaside', EL: 'ΚΠΙΣΝ & Παραλία' },
    desc: { TR: 'Modern mimari, çatı manzarası, park ve Flisvos marinasında akşam yürüyüşü.', EN: 'Modern architecture, rooftop views, a park and an evening walk at Flisvos Marina.', EL: 'Σύγχρονη αρχιτεκτονική, πάρκο και βόλτα στο Φλοίσβο.' },
    tip: { TR: 'Merkeze ulaşım için resepsiyondan taksi veya transfer isteyebilirsiniz.', EN: 'Ask reception for a taxi or transfer to get there.', EL: 'Ζητήστε ταξί ή μεταφορά από τη ρεσεψιόν.' },
    stops: [
      { place: 'Stavros Niarchos Foundation Cultural Center', minutes: 90, name: { TR: 'SNFCC & Çatı Terası', EN: 'SNFCC & Lighthouse terrace', EL: 'ΚΠΙΣΝ & Φάρος' } },
      { place: 'Stavros Niarchos Park', minutes: 40, name: { TR: 'Stavros Niarchos Parkı', EN: 'Stavros Niarchos Park', EL: 'Πάρκο Σταύρος Νιάρχος' } },
      { place: 'Flisvos Marina', minutes: 40, name: { TR: 'Flisvos Marinası', EN: 'Flisvos Marina', EL: 'Μαρίνα Φλοίσβου' } },
    ],
  },
];

// Google Haritalar linkleri
export const mapsSearchUrl = (place) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;

export const mapsRouteUrl = (stops) => {
  const enc = (s) => encodeURIComponent(s.place);
  const origin = enc(stops[0]);
  const destination = enc(stops[stops.length - 1]);
  const waypoints = stops.slice(1, -1).map(enc).join('|');
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ''}&travelmode=walking`;
};
