# askHermis – Misafir Portalı

Hermis Boutique Hotel (Atina) için mobil uyumlu, telefona yüklenebilir (PWA) misafir uygulaması.
React + Vite + Tailwind CSS v4.

## Çalıştırma

```bash
npm install      # ilk seferde ve yeni paket eklenince
npm run dev      # geliştirme: http://localhost:5173
npm run build    # yayın için dist/ klasörü
```

`npm run dev` aynı zamanda bir **Network** adresi gösterir (ör. `http://192.168.1.20:5173`).
Telefon aynı Wi-Fi'deyse bu adresle uygulamayı telefonda açabilirsiniz.

## Özellikler

| Ekran | Ne yapıyor |
|---|---|
| QR Giriş | `?room=302` linkiyle doğrudan odaya giriş; `&lang=EN` ile dil seçimi |
| Ana Ekran | Saate göre kişisel öneriler, aktif sipariş durumları (canlı), Deep Blue kampanya, otel bilgileri |
| Menü | Kategoriler, vegan / vejetaryen / glutensiz filtre, alerjenler, adet, mutfak notu, toplam |
| Rota Keşfi | 7 Atina rotası, tercih filtresi, duraklar, yerel ipucu, Google Haritalar linkleri |
| AI Asistan | TR/EN/EL; sipariş ve talepten önce **onay ister**, eksik bilgiyi sorar, fiyat uydurmaz, yazım hatalarını tolere eder |
| Otel Hizmetleri | Oda temizliği, havlu & malzeme, transfer, masa rezervasyonu |
| Deneyim & Yorum | Puan + yorum, yorumlardan **AI özeti** |
| Personel Paneli | Tüm sipariş/talepler, dokununca durum ilerler, oda QR kodu üretici |

### Canlı senkron demosu
1. Bir sekmede misafir ekranını açın (`/?room=305`).
2. Başka bir sekmede personel panelini açın (`/?staff=1`).
3. Misafir sipariş verince personel ekranında anında görünür; personel durumu değiştirince misafirin ana ekranı güncellenir.

> Şu an kayıtlar tarayıcının `localStorage`'ında tutulur (aynı tarayıcıdaki sekmeler arası senkron).
> Farklı telefonlar arası senkron için `src/lib/store.js` Firebase/Supabase ile değiştirilebilir.

## Klasör yapısı

```
src/
  data/            ← İÇERİK (Üye 2 burayı düzenler)
    i18n.js        tüm buton, başlık, onay ve hata mesajları (TR/EN/EL)
    menu.js        menü kategorileri, ürünler, fiyat, etiket, alerjen
    routes.js      Atina rotaları, duraklar, süreler, ipuçları
    hotel.js       otel bilgileri, SSS, hizmetler, kampanya
    reviews.js     örnek misafir yorumları
  lib/
    concierge.js   AI asistan kuralları ve konuşma akışları
    reviewSummary.js  AI yorum özeti
    store.js       canlı senkron deposu, sipariş durumları
    records.js     sipariş/talep metinleri
    utils.js       yardımcılar
  screens/         ekranlar (Login, Home, Menu, Explore, Concierge, Services, Reviews, Staff)
  components/ui.jsx  ortak bileşenler
  index.css        renk paleti (@theme)
public/
  manifest.webmanifest, sw.js, icons/   ← PWA
```

## İçerik nasıl düzenlenir?

- **Yeni ürün:** `src/data/menu.js` → `menuItems` listesine yeni bir obje ekleyin. `id` benzersiz olmalı.
- **Yeni rota:** `src/data/routes.js` → `routes` listesine ekleyin. `stops[].place` Google Haritalar'da aranacak isimdir.
- **Metin / çeviri:** `src/data/i18n.js` içinde üç dilde de güncelleyin.
- **Asistanın tanıdığı kelimeler:** ürünlerde `keywords`, hizmetlerde `keywords`, SSS'de `faq[].keywords`.
- **Görsel:** fotoğrafı `public/menu/` içine koyup ürünün `image` alanına `'/menu/dosya.jpg'` yazın.

## Renk paleti

`src/index.css` içinde tanımlı; kodda `bg-lilac`, `text-ink`, `border-sage` gibi kullanılır.

| İsim | Kod | Kullanım |
|---|---|---|
| warm | #F7F6F4 | ana zemin |
| lilac | #B4A5DC | keşif, hero |
| pink | #DEACD1 | lila geçişleri |
| peach | #E5BFA8 | rota / aktivite kartları |
| sage | #C5D1C5 | otel hizmetleri |
| muted | #7B92BC | ikincil vurgular |
| ink | #0A0A0A | yazı ve butonlar |
| deep | #3C4C7F | özel kampanyalar |
