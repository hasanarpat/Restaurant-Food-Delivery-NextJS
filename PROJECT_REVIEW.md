# Restaurant Food Delivery: Geliştirme Süreci ve Teknik İnceleme

Bu döküman, projenin başlangıcından son eklenen gelişmiş özelliklere kadar geçen süreci, karşılaşılan zorlukları ve uygulanan çözümleri detaylı bir şekilde ele almaktadır. Bu proje, modern bir Next.js Full-Stack mimarisi üzerine inşa edilmiş, hem frontend hem de backend taraflarını öğrenme ve uygulanabilirliği artırma amacıyla organize edilmiştir. Projenin her katmanı; sürdürülebilirlik, okunabilirlik ve performans odaklı tasarlanmıştır.

---

## 1. Proje Organizasyonu ve Dizin Yapısı

Bir projenin kalitesi, dizin yapısından belli olur. Bu projede, karmaşayı önlemek ve her dosyanın bir "evi" olmasını sağlamak için standart bir kök dizin (root) yapısı kurguladım.

### Kök Dizin (Root) Haritası:

```text
Restaurant-Food-Delivery/
├── .next/                  # Next.js derleme çıktıları
├── public/                 # Statik varlıklar (resimler, fontlar, favicon)
├── scripts/                # Veritabanı seeding ve yardımcı otomasyon betikleri
├── src/                    # Uygulamanın ana kaynak kodu
│   ├── app/                # Sayfalar ve API Rotaları (Next.js App Router)
│   │   ├── api/            # Backend API uç noktaları (v1/products, auth vb.)
│   │   ├── (auth)/         # Kimlik doğrulama sayfaları (Login/Register)
│   │   ├── cart/           # Sepet sayfası ve işlemleri
│   │   ├── menu/           # Kategori bazlı menü listeleme
│   │   ├── product/        # Ürün detay sayfaları
│   │   └── profile/        # Kullanıcı profil yönetimi
│   ├── components/         # Reusable (yeniden kullanılabilir) UI bileşenleri
│   │   ├── common/         # Navbar, Footer, Notifications gibi ortak yapılar
│   │   ├── product/        # ProductCard, Price, ImageViewer gibi ürüne özel bileşenler
│   │   └── home/           # Slider, Featured, Offer gibi ana sayfa bölümleri
│   ├── core/               # Sistemin çekirdek mantığı
│   │   ├── errors/         # AppError ve global hata sınıfları
│   │   ├── utils/          # Response formatter, encryption, auth-guard araçları
│   │   └── config/         # Rate limit ve uygulama konfigürasyonları
│   ├── lib/                # Dış kütüphane bağlantıları
│   │   ├── mongodb.ts      # Veritabanı bağlantı havuzu yönetimi
│   │   ├── axios.ts        # API istekleri için ön yapılandırılmış istemci
│   │   └── auth-token.ts   # JWT ve session yönetimi araçları
│   └── modules/            # Veritabanı odaklı iş mantığı (Modüler Yapı)
│       ├── product/        # Ürün şeması, repository ve servisleri
│       ├── order/          # Sipariş yönetimi ve durum takibi
│       ├── category/       # Menü kategorileri ve hiyerarşi
│       └── auth/           # Login, Session ve kullanıcı yetkilendirme
├── .env.local              # Veritabanı URI ve gizli anahtarlar
├── package.json            # Bağımlılıklar ve proje betikleri
└── tsconfig.json           # TypeScript kural seti
```

Bu yapı sayesinde, yeni bir özellik eklemek istediğimde (örneğin "Yorumlar" sistemi), nereye bakmam ve nereyi modifiye etmem gerektiğini saniyeler içinde anlayabiliyorum.

---

## 2. Mimari Tasarım ve "Module-Based" Yaklaşım

Proje ilerledikçe kodun karışmasını önlemek için **Modüler Mimari** yapısını tercih ettim. Her iş birimi (örneğin `product`, `category`, `order`) kendi klasörü içinde bağımsız bir dünya gibi kurgulandı.

### Katmanlar Arası İş Akışı:

1.  **Schema:** Verinin nasıl görüneceğini belirler (Mongoose).
2.  **Repository:** Veritabanına "Sadece senden sorulur" dediğimiz katman.
3.  **Service:** İş mantığının (business logic) döndüğü yer. Örneğin "Ürün ekle ama kategorisi yoksa hata ver" gibi kurallar burada yazılır.
4.  **API Routes:** Dış dünyayla iletişimi sağlar.

> **Görsel 1: Klasör Yapısı ve Modüler Dağılım**
> ![Project Structure](/docs/structure.png)
> _Açıklama: Her modülün kendi içinde Service ve Repository katmanlarına ayrıldığını görebilirsiniz._

---

## 3. Veri Modelleme: Esneklik ve Performans

Veritabanı tarafında **MongoDB**'nin esnekliğinden yararlandım. Özellikle ürünlerin değişen opsiyonları (boyut, ek malzeme vb.) için `options` dizisi kullandım.

### Örnek Ürün Şeması:

```typescript
{
  title: string;
  desc: string;
  img: string;
  images: string[]; // Çoklu resim desteği için sonradan eklendi
  price: number;
  options: [{ title: string, additionalPrice: number }];
}
```

**Performans Notu:** Listeleme işlemlerinde `.lean()` kullanarak veritabanından gelen veriyi "pure object" haline getirdim. Bu, Next.js'in veriyi daha hızlı işlemesini ve memory kullanımının düşmesini sağlıyor.

---

## 4. Akış (Workflow): Sonsuz Kaydırma (Infinite Scroll)

Kullanıcı deneyimini artıran en önemli özelliklerden biri olan **Infinite Scroll** mekanizmasını şu şekilde kurguladım:

### İş Akışı Şeması:

1.  **Server-Side:** Sayfa ilk açıldığında ilk 8 ürün sunucuda render edilir.
2.  **Intersection Observer:** Kullanıcı sayfanın sonuna yaklaştığında (Framer Motion `onViewportEnter`) bir sinyal gönderilir.
3.  **Client-Side Fetch:** Tarayıcı tarafında `/api/v1/products?page=2&limit=8` isteği atılır.
4.  **State Update:** Gelen yeni ürünler mevcut listeye eklenir.

> **Görsel 2: Infinite Scroll Akış Diyagramı**
> ![Infinite Scroll Workflow](/docs/infinite-scroll-flow.png)
> _Açıklama: Kullanıcı kaydırdıkça tetiklenen veri çekme ve UI güncelleme döngüsü._

---

## 5. Kullanıcı Etkileşimi: Gelişmiş ImageViewer

Ürün detay sayfasında statik bir resim yerine, kullanıcının resimler arasında gezinebileceği interaktif bir **ImageViewer** tasarladım.

### Teknik Detaylar:

- **Zoom & Pan:** `framer-motion` ile `scale` durumunu yöneterek hem butonlarla hem de klavye (+/-) ile yakınlaştırma sağladım.
- **Mobile Swipe:** Mobilde kullanıcı alışkanlıklarına uygun olarak sağa/sola kaydırma (swipe) özelliğini ekledim.
- **Keyboard Support:** Masaüstünde Ok tuşları ile resimler arası geçiş ve `ESC` ile galeriyi kapatma desteği sundum.

> **Görsel 3: ImageViewer Lightbox ve Kontroller**
> ![ImageViewer UI](/docs/image-viewer.png)
> _Açıklama: Zoom kontrolleri, navigasyon okları ve mobil uyumlu swipe alanı._

---

## 6. Güvenlik ve Hata Yönetimi: "Sessiz Kalkanlar"

API rotalarımızı korumak için `middleware.ts` seviyesinde bir koruma katmanı oluşturdum.

### Uygulanan Güvenlik Katmanları:

- **Rate Limit:** Aynı IP adresinden belirli bir süre içinde gelen isteklere limit koyarak DDoS riskini azalttım. (Örn: Dakikada 60 istek).
- **Zod Validation:** Frontend'den gelen her verinin doğruluğundan emin olmak için Zod şemaları kullandım. Yanlış veri gelirse API "Doğrulama Hatası" döner.
- **AppError:** Uygulama genelinde standart bir hata yapısı kurdum. Böylece bir hata oluştuğunda sistem çökmez, kullanıcıya açıklayıcı (ve güvenliği tehlikeye atmayan) bir mesaj döner.

---

## 7. Karşılaşılan Zorluklar ve Çözümler

Geliştirme sürecinde gerçek hayat problemlerinden biriyle karşılaştım: **Pagination Mismatch.**
Sunucu tarafında (SSR) belirlenen ürün limiti ile istemci tarafında (CSR) `loadMore` yaparken gönderilen limitin farklı olması, sayfa geçişlerinde bazı ürünlerin atlanmasına veya tekrarlanmasına neden oluyordu. Bu sorunu, limiti merkezi bir değişkenden çekip her iki tarafa da senkronize ederek çözdüm.

---

## Sonuç

Bu proje, bir Junior geliştirici olarak modern web geliştirme dünyasındaki "best practice"leri anlama ve uygulama çabamın bir ürünüdür. Her satır kodda performansı, güvenliği ve en önemlisi son kullanıcının o "akıcı" hissi yaşamasını hedefledim. Geliştirmeye ve öğrenmeye devam ediyorum!
