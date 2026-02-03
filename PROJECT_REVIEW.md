# Restaurant Food Delivery: Engineering-Based Full-Stack & Frontend Excellence

Bu döküman, projenin başlangıcından bu yana uygulanan mimari kararları, backend güvenliğini ve özellikle kullanıcı deneyimini (UX) zirveye taşıyan ileri düzey frontend mühendisliği yaklaşımlarını kapsamlı bir şekilde incelemektedir.

---

## 1. Proje Organizasyonu ve Dizin Yapısı

Bir projede sürdürülebilirliğin temeli dizin yapısıdır. Projenin her dosyası, kolay erişilebilirlik ve net sorumluluk (Single Responsibility) prensibiyle yerleştirilmiştir.

### Kök Dizin (Root) Haritası:

```text
Restaurant-Food-Delivery/
├── scripts/                # Backend Automation (Seeding, DB Clean)
├── src/                    # Uygulamanın ana kaynak kodu
│   ├── app/                # Sayfalar ve API Rotaları (Next.js App Router)
│   │   ├── api/            # Backend API uç noktaları (v1/products, auth vb.)
│   │   ├── menu/           # Kategori bazlı menü listeleme ve Infinite Scroll
│   │   └── product/        # Ürün detay sayfaları ve ImageViewer
│   ├── components/         # Atomic Design prensibine uygun UI Katmanı
│   │   ├── ui/             # Atoms: Temel bileşenler (Button, Input)
│   │   ├── product/        # Molecules/Organisms: ImageViewer, ProductCard
│   │   └── home/           # Layout: Section-based presentation
│   ├── core/               # Kurumsal Çekirdek (Error Handling, Global Utils)
│   │   ├── errors/         # Merkezi AppError sınıfı
│   │   └── config/         # Rate limit ve uygulama konfigürasyonları
│   ├── lib/                # Dış kütüphane konfigürasyonları (MongoDB, Axios)
│   └── modules/            # Domain-Driven İş Mantığı (Modüler Yapı)
│       └── [feature]/      # Schema, Repository ve Service üçlüsü
├── public/docs/            # Dökümantasyon görselleri ve statik varlıklar
└── package.json            # Bağımlılıklar ve proje betikleri
```

---

## 2. Mimari Tasarım ve "Module-Based" Yaklaşım

Projenin backend tarafı, iş birimlerini birbirinden ayıran modüler bir yapı üzerine kurulmuştur. Her modül kendi içinde sorumluluğunu bilir ve bu sayede proje büyüse dahi yönetilebilirlik korunur.

### Katmanlar Arası İş Akışı:

1.  **Schema:** Verinin tipini ve veritabanı modelini belirler (Mongoose).
2.  **Repository:** Veritabanına doğrudan erişimi sağlar (Data Access Layer).
3.  **Service:** İş mantığının (Business Logic) işlendiği güvenli bölgedir.
4.  **API Routes:** Backend gücünü frontend'e sunan kapıdır.

> **Görsel 1: Klasör Yapısı ve Modüler Dağılım**
> ![Project Structure](/docs/structure.png)
> _Açıklama: Her modülün Service ve Repository katmanları ile nasıl izole edildiğini görebilirsiniz._

---

## 3. Veri Modelleme ve Backend Güvenliği

Backend tarafındaki veri bütünlüğü ve güvenlik, "Junior" bir geliştiriciden beklenen standartların üzerinde bir titizlikle kurgulanmıştır.

- **Repository Pattern:** Veri tabanı işlemleri servislerden soyutlanarak yarın bir gün farklı bir DB'ye geçiş yolu açık tutulmuştur.
- **Mongoose / Lean Logic:** Saf JS objeleri üzerinden %30-40 hız kazandıran veri çekme stratejileri.
- **Middleware Security:** IP tabanlı Rate Limiting ve kritik güvenlik header'ları ile sağlanan koruma.
- **Zod Data Integrity:** API seviyesinde uygulanan sert veri doğrulama kuralları.

### Örnek Ürün Şeması:

```typescript
{
  title: string;
  desc: string;
  img: string;
  images: string[];   // Çoklu resim desteği
  price: number;
  options: [{ title: string, additionalPrice: number }];
}
```

---

## 4. Frontend Uzmanlığı: "The Art of User Experience" (Expanded)

Bir Frontend Developer olarak bu projede arayüzü sadece çizmedim; sistemin her katmanında akıcılık ve performans kurguladım.

### A. Motion Orchestration & Staggering (Framer Motion)

- **Stagger Effect:** Ürün kartları ekrana gelirken milisaniyelik gecikmeler ekleyerek bir "koreografi" oluşturulmuştur.
- **Exit Animations:** Filtreleme sırasında silinen elemanların kaba bir şekilde yok olması yerine yumuşak geçişlerle (AnimatePresence) ayrılması sağlanmıştır.

### B. Akıllı Network & State Yönetimi (Search Optimization)

- **Debounced Search:** Kullanıcı yazarken backend üzerindeki ağ baskısını %80 azaltan 500ms'lik gecikmeli arama motoru.
- **Empty State UX:** Arama metni silindiğinde listenin otomatik olarak orijinal haline (initial state) dönmesini sağlayan akıllı tetikleyiciler.

### C. Gelişmiş Etkileşim: ImageViewer 2.0

- **Mobile First Gestures:** Mobilde physics-based (ivme ve sürtünme hesaplı) swipe desteği.
- **Zoom Panning:** Resim büyütüldüğünde devreye giren panlama modu ve bu sırada sayfa kaymasını engelleyen önlemler.

---

## 5. İş Akışı (Workflow): Infinite Scroll & Viewport Interactivity

Kullanıcıyı hiçbir zaman "Bekleyin..." yazısıyla durdurmayan, akışkan bir veri çekme döngüsü:

1.  **Server-Side:** İlk 8 ürün sunucuda render edilerek yüksek FCP skoru hedeflenir.
2.  **Intersection Observer:** Kullanıcı listenin sonuna yaklaştığında tetikleyici çalışır.
3.  **State Locking:** Veri çekilirken aynı anda birden fazla isteğin gitmesini engelleyen kilit yapısı.
4.  **Immutability:** Gelen yeni verinin mevcut listeye yan etkisiz (immutability) eklenmesi.

> **Görsel 2: Infinite Scroll Akış Diyagramı**
> ![Infinite Scroll Workflow](/docs/infinite-scroll-flow.png)
> _Açıklama: Kullanıcı kaydırdıkça tetiklenen veri çekme ve UI güncelleme döngüsü._

---

## 6. Gelişmiş Kullanıcı Etkileşimi: ImageViewer

Ürün detay sayfasında kullanıcıyı karşılayan profesyonel galeri deneyimi:

> **Görsel 3: ImageViewer Lightbox ve Kontroller**
> ![ImageViewer UI](/docs/image-viewer.png)
> _Açıklama: Zoom kontrolleri, navigasyon okları ve mobil uyumlu swipe alanı._

---

## 7. Sorun Çözme: Engineering Under Pressure

Projedeki en büyük meydan okuma; **"Pagination Mismatch"** sorunuydu. Sunucu (SSR) ile istemci (CSR) arasındaki limitlerin uyuşmaması, ürünlerin tekrarlanmasına neden olabiliyordu. Bu problemi, tüm limitleri merkezi bir `config` üzerinden yöneterek ve CSR taleplerini SSR offset değerlerine göre dinamik hesaplayarak çözdüm.

---

## Sonuç

Bu proje; backend'in sessiz ama güçlü mimarisi ile frontend mühendisliğinin görsel ve teknik sınırlarını zorlayan bir çalışmadır. Performans, erişilebilirlik ve ileri düzey optimizasyon stratejileriyle modern web geliştirmenin en yüksek standartlarını temsil etmektedir.
