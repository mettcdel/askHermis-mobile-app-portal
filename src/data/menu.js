// =============================================================
//  RESTORAN MENÜSÜ  (içerik: Üye 2)
//  - Her metin TR / EN / EL olarak yazılır.
//  - price: sayı (€). Toplam ve AI asistan bu fiyatı kullanır.
//  - category: aşağıdaki menuCategories içindeki id'lerden biri.
//  - tags: 'vegan' | 'vegetarian' | 'glutenFree' | 'spicy' | 'chef'
//  - allergens: 'gluten' | 'dairy' | 'nuts' | 'egg' | 'sesame' | 'fish'
//  - image: şimdilik emoji. Gerçek foto için public/menu/ içine koyup
//    image: '/menu/musakka.jpg' yazabilirsiniz.
//  - keywords: AI asistanın ürünü tanıması için ek kelimeler (yazım hataları dahil).
// =============================================================

export const menuCategories = [
  { id: 'breakfast', name: { TR: 'Kahvaltı', EN: 'Breakfast', EL: 'Πρωινό' } },
  { id: 'starters', name: { TR: 'Başlangıç & Salata', EN: 'Starters & Salads', EL: 'Ορεκτικά & Σαλάτες' } },
  { id: 'mains', name: { TR: 'Ana Yemek', EN: 'Mains', EL: 'Κυρίως' } },
  { id: 'desserts', name: { TR: 'Tatlılar', EN: 'Desserts', EL: 'Γλυκά' } },
  { id: 'drinks', name: { TR: 'İçecekler', EN: 'Drinks', EL: 'Ποτά' } },
];

export const menuItems = [
  {
    id: 1, category: 'mains', price: 16.5, image: '🍆', tags: ['chef'], allergens: ['gluten', 'dairy', 'egg'],
    name: { TR: 'Geleneksel Musakka', EN: 'Traditional Moussaka', EL: 'Παραδοσιακός Μουσακάς' },
    desc: { TR: 'Fırınlanmış patlıcan, kıymalı sos ve beşamel.', EN: 'Baked eggplant, minced meat sauce and béchamel.', EL: 'Ψητή μελιτζάνα, κιμάς και μπεσαμέλ.' },
    keywords: ['musakka', 'mousaka', 'moussaka', 'musaka', 'μουσακα'],
  },
  {
    id: 2, category: 'starters', price: 9, image: '🥗', tags: ['vegetarian', 'glutenFree'], allergens: ['dairy'],
    name: { TR: 'Yunan Salatası (Horiatiki)', EN: 'Greek Salad (Horiatiki)', EL: 'Χωριάτικη Σαλάτα' },
    desc: { TR: 'Domates, salatalık, kırmızı soğan, feta ve Kalamata zeytini.', EN: 'Tomato, cucumber, red onion, feta and Kalamata olives.', EL: 'Ντομάτα, αγγούρι, κρεμμύδι, φέτα και ελιές Καλαμών.' },
    keywords: ['salata', 'salad', 'horiatiki', 'choriatiki', 'σαλατα', 'χωριατικη'],
  },
  {
    id: 3, category: 'mains', price: 14, image: '🍢', tags: [], allergens: ['gluten', 'dairy'],
    name: { TR: 'Souvlaki Tabağı', EN: 'Souvlaki Plate', EL: 'Πιάτο Σουβλάκι' },
    desc: { TR: 'Marine edilmiş tavuk şiş, pita ekmeği, patates ve tzatziki.', EN: 'Marinated chicken skewers, pita, fries and tzatziki.', EL: 'Μαριναρισμένο κοτόπουλο, πίτα, πατάτες και τζατζίκι.' },
    keywords: ['souvlaki', 'suvlaki', 'sufleki', 'souvlakı', 'σουβλακ'],
  },
  {
    id: 4, category: 'desserts', price: 7.5, image: '🍯', tags: ['vegetarian'], allergens: ['gluten', 'nuts'],
    name: { TR: 'Loukoumades', EN: 'Loukoumades', EL: 'Λουκουμάδες' },
    desc: { TR: 'Bal şerbeti, tarçın ve ceviz ile çıtır lokma.', EN: 'Crispy honey puffs with cinnamon and walnuts.', EL: 'Τραγανοί λουκουμάδες με μέλι, κανέλα και καρύδι.' },
    keywords: ['loukoumades', 'lukumades', 'lokma', 'λουκουμαδες'],
  },
  {
    id: 5, category: 'breakfast', price: 12, image: '🍳', tags: ['vegetarian'], allergens: ['gluten', 'dairy', 'egg'],
    name: { TR: 'Hermis Kahvaltı Tabağı', EN: 'Hermis Breakfast Plate', EL: 'Πιάτο Πρωινού Hermis' },
    desc: { TR: 'Yumurta, feta, zeytin, domates, bal ve taze ekmek.', EN: 'Eggs, feta, olives, tomato, honey and fresh bread.', EL: 'Αυγά, φέτα, ελιές, ντομάτα, μέλι και φρέσκο ψωμί.' },
    keywords: ['kahvalti', 'kahvaltı', 'breakfast', 'πρωινο'],
  },
  {
    id: 6, category: 'breakfast', price: 8, image: '🥣', tags: ['vegetarian', 'glutenFree'], allergens: ['dairy', 'nuts'],
    name: { TR: 'Yoğurt, Bal ve Ceviz', EN: 'Greek Yogurt with Honey & Walnuts', EL: 'Γιαούρτι με Μέλι και Καρύδια' },
    desc: { TR: 'Süzme Yunan yoğurdu, Girit balı ve ceviz.', EN: 'Strained Greek yogurt, Cretan honey and walnuts.', EL: 'Στραγγιστό γιαούρτι, κρητικό μέλι και καρύδια.' },
    keywords: ['yogurt', 'yoğurt', 'yoghurt', 'γιαουρτι'],
  },
  {
    id: 7, category: 'starters', price: 6.5, image: '🫓', tags: ['vegetarian'], allergens: ['gluten', 'dairy'],
    name: { TR: 'Tzatziki ve Pita', EN: 'Tzatziki & Pita', EL: 'Τζατζίκι με Πίτα' },
    desc: { TR: 'Yoğurt, salatalık, sarımsak ve ızgara pita.', EN: 'Yogurt, cucumber, garlic and grilled pita.', EL: 'Γιαούρτι, αγγούρι, σκόρδο και ψητή πίτα.' },
    keywords: ['tzatziki', 'cacik', 'caciki', 'τζατζικι'],
  },
  {
    id: 8, category: 'starters', price: 8.5, image: '🥬', tags: ['vegan', 'glutenFree'], allergens: [],
    name: { TR: 'Dolmadakia', EN: 'Dolmadakia', EL: 'Ντολμαδάκια' },
    desc: { TR: 'Pirinçli ve otlu asma yaprağı sarması, limon ile.', EN: 'Vine leaves stuffed with rice and herbs, with lemon.', EL: 'Αμπελόφυλλα γεμιστά με ρύζι και μυρωδικά.' },
    keywords: ['sarma', 'yaprak sarma', 'dolmades', 'dolmadakia', 'ντολμαδ'],
  },
  {
    id: 9, category: 'mains', price: 19, image: '🐟', tags: ['glutenFree'], allergens: ['fish'],
    name: { TR: 'Izgara Levrek', EN: 'Grilled Sea Bass', EL: 'Λαβράκι Σχάρας' },
    desc: { TR: 'Zeytinyağı-limon sos ve mevsim yeşillikleri.', EN: 'Olive oil–lemon sauce and seasonal greens.', EL: 'Λαδολέμονο και χόρτα εποχής.' },
    keywords: ['levrek', 'balik', 'balık', 'fish', 'sea bass', 'λαβρακι', 'ψαρι'],
  },
  {
    id: 10, category: 'mains', price: 13, image: '🫘', tags: ['vegan', 'glutenFree'], allergens: [],
    name: { TR: 'Gemista (Dolma Sebze)', EN: 'Gemista (Stuffed Vegetables)', EL: 'Γεμιστά' },
    desc: { TR: 'Pirinç ve otlarla doldurulmuş fırın domates ve biber.', EN: 'Oven-baked tomatoes and peppers stuffed with rice and herbs.', EL: 'Ντομάτες και πιπεριές γεμιστές με ρύζι.' },
    keywords: ['gemista', 'yemista', 'biber dolma', 'sebze dolma', 'stuffed', 'γεμιστ'],
  },
  {
    id: 11, category: 'desserts', price: 6, image: '🥮', tags: ['vegetarian'], allergens: ['gluten', 'nuts'],
    name: { TR: 'Baklava', EN: 'Baklava', EL: 'Μπακλαβάς' },
    desc: { TR: 'Ceviz ve ballı şerbetli ince yufka.', EN: 'Thin filo with walnuts and honey syrup.', EL: 'Φύλλο με καρύδια και σιρόπι μελιού.' },
    keywords: ['baklava', 'μπακλαβας'],
  },
  {
    id: 12, category: 'drinks', price: 3.5, image: '☕', tags: ['vegan', 'glutenFree'], allergens: [],
    name: { TR: 'Yunan Kahvesi', EN: 'Greek Coffee', EL: 'Ελληνικός Καφές' },
    desc: { TR: 'Geleneksel cezvede pişirilmiş kahve.', EN: 'Traditional briki-brewed coffee.', EL: 'Παραδοσιακός καφές στο μπρίκι.' },
    keywords: ['kahve', 'coffee', 'καφε', 'καφες'],
  },
  {
    id: 13, category: 'drinks', price: 5, image: '🧋', tags: ['vegetarian', 'glutenFree'], allergens: ['dairy'],
    name: { TR: 'Freddo Cappuccino', EN: 'Freddo Cappuccino', EL: 'Freddo Cappuccino' },
    desc: { TR: 'Yunanistan’ın meşhur soğuk kahvesi, süt köpüklü.', EN: 'Greece’s famous iced coffee with milk foam.', EL: 'Ο διάσημος κρύος καφές με αφρόγαλα.' },
    keywords: ['freddo', 'frappe', 'soğuk kahve', 'iced coffee', 'φρεντο'],
  },
  {
    id: 14, category: 'drinks', price: 4, image: '🍋', tags: ['vegan', 'glutenFree'], allergens: [],
    name: { TR: 'Ev Yapımı Limonata', EN: 'Homemade Lemonade', EL: 'Σπιτική Λεμονάδα' },
    desc: { TR: 'Taze limon ve nane.', EN: 'Fresh lemon and mint.', EL: 'Φρέσκο λεμόνι και δυόσμος.' },
    keywords: ['limonata', 'lemonade', 'λεμοναδα'],
  },
];

export const tagLabels = {
  vegan: { TR: 'Vegan', EN: 'Vegan', EL: 'Vegan', emoji: '🌱' },
  vegetarian: { TR: 'Vejetaryen', EN: 'Vegetarian', EL: 'Χορτοφαγικό', emoji: '🥕' },
  glutenFree: { TR: 'Glutensiz', EN: 'Gluten-free', EL: 'Χωρίς γλουτένη', emoji: '🌾' },
  spicy: { TR: 'Acılı', EN: 'Spicy', EL: 'Πικάντικο', emoji: '🌶️' },
  chef: { TR: 'Şefin Önerisi', EN: 'Chef’s pick', EL: 'Πρόταση σεφ', emoji: '⭐' },
};

export const allergenLabels = {
  gluten: { TR: 'Gluten', EN: 'Gluten', EL: 'Γλουτένη' },
  dairy: { TR: 'Süt', EN: 'Dairy', EL: 'Γαλακτοκομικά' },
  nuts: { TR: 'Kuruyemiş', EN: 'Nuts', EL: 'Ξηροί καρποί' },
  egg: { TR: 'Yumurta', EN: 'Egg', EL: 'Αυγό' },
  sesame: { TR: 'Susam', EN: 'Sesame', EL: 'Σουσάμι' },
  fish: { TR: 'Balık', EN: 'Fish', EL: 'Ψάρι' },
};
