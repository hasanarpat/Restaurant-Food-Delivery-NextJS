export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: 'recipes' | 'tips' | 'news' | 'team';
  tags: string[];
  image?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'evde-mukemmel-lahmacun-nasil-yapilir',
    title: 'Evde Mükemmel Lahmacun Nasıl Yapılır?',
    excerpt:
      'Uzmanlarımızdan öğrenin! Evde profesyonel lezzette lahmacun yapmanın sırları.',
    content: `Lahmacun, Türk mutfağının en sevilen lezzetlerinden biri. Evde profesyonel lezzette lahmacun yapmak için birkaç püf noktası var.

**Hamur İçin:**
- 500g un
- 1 su bardağı ılık su
- 1 çay kaşığı tuz
- 1 tatlı kaşığı şeker
- 1 paket instant maya
- 2 yemek kaşığı zeytinyağı

Hamuru yoğurun ve 1 saat dinlendirin. Bu süre hamura hava alması ve yumuşak olması için çok önemli.

**Üzeri İçin:**
- 500g kıyma
- 2 soğan (rendeli)
- 2 domates (rendeli)
- Maydanoz, biber salçası, baharatlar

Ingredients'leri karıştırın, hamurun üzerine yayın ve 250°C fırında 8-10 dakika pişirin. Üzerine limon sıkıp servis yapabilirsiniz!

**Püf Noktaları:**
✅ Hamur çok ince açılmalı
✅ Fırın çok sıcak olmalı
✅ Kıyma suyu çıkarmamalı (soğan suyunu sıkın)
✅ Servis anında taze olmalı`,
    author: 'Baş Aşçı Mehmet',
    date: '25 Ocak 2026',
    readTime: '8 dk',
    category: 'recipes',
    tags: ['Tarif', 'Lahmacun', 'Türk Mutfağı'],
  },
  {
    id: '2',
    slug: 'ekibimizden-tanisin-ascibasimiz-ile-roportaj',
    title: 'Ekibimizden Tanışın: Aşçıbaşımız ile Röportaj',
    excerpt:
      'Mutfağımızın lideri Mehmet Bey ile 20 yıllık kariyerini ve lezzet sırlarını konuştuk.',
    content: `**Mehmet Bey, bize kendinizden bahseder misiniz?**

Ben 20 yıldır bu işin içindeyim. Gaziantep'te doğdum, büyüdüm. Mutfak benim tutkum. Her yemek bir sanat eseri gibi hazırlanmalı.

**En sevdiğiniz yemek nedir?**

Kesinlikle kebap! Ateşle dans etmek gibi. Malzemenin kalitesi, baharatların dengesi, pişirme süresi... Her şey mükemmel olmalı.

**Ekibimize katılmak isteyenlere tavsiyeniz?**

Sabırlı olun, öğrenmeye açık olun. Mutfak bir okul. Her gün yeni bir şey öğreniyorsunuz. Biz burada bir aile gibiyiz, birbirimize destek oluyoruz.

**Gelecek planlarınız nedir?**

Yeni şubelerimizde de bu kaliteyi devam ettirmek istiyorum. Belki bir gün kendi tarif kitabımı çıkarırım! 😊`,
    author: 'Halkla İlişkiler Ekibi',
    date: '20 Ocak 2026',
    readTime: '5 dk',
    category: 'team',
    tags: ['Ekip', 'Röportaj', 'Aşçı'],
  },
  {
    id: '3',
    slug: '5-mutfak-ipucu-yemeklerinizi-daha-lezzetli-yapin',
    title: '5 Mutfak İpucu: Yemeklerinizi Daha Lezzetli Yapın',
    excerpt:
      'Profesyonel aşçılarımızdan aldığımız basit ama etkili mutfak ipuçları.',
    content: `Ev yemeklerinizi profesyonel lezzete taşımak için 5 altın kural:

**1. Taze Malzeme Kullanın 🥬**
En kaliteli sonuçlar için her zaman taze, mevsiminde malzemeler tercih edin. Özellikle sebze ve etlerde tazalık çok önemli.

**2. Tuzu Doğru Zamanda Atın 🧂**
Et pişirirken tuzu son anda atın. Erken tuz et suyunu çıkarır ve sertleşmesine neden olur.

**3. Baharatları Kavruyun 🌶️**
Baharatları yemeğe atmadan önce hafifçe kavurun. Bu aromalarını açığa çıkarır ve lezzeti katlayarak artırır.

**4. Dinlendirme Süresi 😴**
Özellikle hamur işleri ve et yemekleri için dinlendirme süresi çok önemli. Sabırlı olun!

**5. Sıcaklık Kontrolü 🔥**
Doğru sıcaklıkta pişirin. Her yemeğin ideal pişme sıcaklığı farklıdır.

Bu basit kuralları uygulayarak evde restoran lezzetine ulaşabilirsiniz!`,
    author: 'Mutfak Ekibi',
    date: '18 Ocak 2026',
    readTime: '6 dk',
    category: 'tips',
    tags: ['İpuçları', 'Mutfak', 'Pratik'],
  },
  {
    id: '4',
    slug: 'yeni-subemiz-bornovada-acildi',
    title: "Yeni Şubemiz Bornova'da Açıldı! 🎉",
    excerpt:
      "Antepli Mutfağı ailesi büyümeye devam ediyor. 5. şubemiz Bornova'da sizlerle!",
    content: `Harika bir haberimiz var! 🎊

Antepli Mutfağı ailesi olarak 5. şubemizi Bornova'da açmanın gururunu yaşıyoruz. 

**Şube Bilgileri:**
📍 Adres: Kazımdirik Mahallesi, Bornova/İzmir
📅 Açılış: 15 Ocak 2026
⏰ Çalışma Saatleri: 10:00 - 23:00

**Açılış Kampanyası:**
İlk ay boyunca tüm müşterilerimize %20 indirim!

**Özel Tasarım:**
Yeni şubemiz modern mimarisi ve geleneksel Türk dekoruyla göz alıcı bir atmosfer sunuyor. 200 metrekare alana yayılan şubemizde 80 kişilik oturma kapasitemiz var.

**Ekibimiz:**
Deneyimli aşçılarımız ve samimi servis ekibimiz sizleri en iyi şekilde ağırlamak için hazır!

Bornova'da olan tüm dostlarımızı bekliyoruz! ❤️`,
    author: 'Antepli Mutfağı Yönetimi',
    date: '15 Ocak 2026',
    readTime: '3 dk',
    category: 'news',
    tags: ['Haber', 'Yeni Şube', 'Bornova'],
  },
  {
    id: '5',
    slug: 'baklava-yapiminin-incelikleri',
    title: 'Baklava Yapımının İncelikleri',
    excerpt:
      'Geleneksel Türk tatlısı baklava yapımında dikkat edilmesi gereken noktalar.',
    content: `Baklava, Türk mutfağının en değerli tatlılarından. Yapımı ustalık ister.

**Malzemeler:**
- 1 paket yufka
- 200g tereyağı (eritilmiş)
- 2 su bardağı kırılmış ceviz/fıstık
- Şerbet için: 3 su bardağı şeker, 2.5 su bardağı su, limon suyu

**Yapılışı:**

1. **Yufkaları Yerleştirme:**
Tepsiye tereyağı sürün. 4-5 kat yufka koyun, her katı yağlayın.

2. **İç Malzeme:**
Ceviz/fıstık serpistirin. Tekrar yufka katlarına devam edin.

3. **Kesim:**
Baklavaları kesin (baklava kesimi önemli!)

4. **Pişirme:**
180°C fırında 40-45 dk, üzeri altın rengi olana kadar.

5. **Şerbet:**
Şerbeti soğuk baklavaya dökün (sıcak baklava - soğuk şerbet kuralı!)

**Altın Kurallar:**
✅ Yufkalar kat kat olmalı
✅ Bol tereyağı kullanın
✅ Şerbet kıvamı çok önemli
✅ Dinlendirme süresine dikkat

Afiyet olsun! 🍯`,
    author: 'Tatlı Şefi Ayşe',
    date: '10 Ocak 2026',
    readTime: '7 dk',
    category: 'recipes',
    tags: ['Tarif', 'Baklava', 'Tatlı'],
  },
  {
    id: '6',
    slug: 'ramazan-menumuz-hazir',
    title: 'Ramazan Menümüz Hazır!',
    excerpt:
      'Bu ramazan özel iftar menülerimizle sizlerleyiz. Geleneksel lezzetler, modern sunum.',
    content: `Ramazan ayına özel hazırladığımız iftar menümüzü sizlerle paylaşmaktan mutluluk duyuyoruz! 🌙

**İftar Menüsü:**

**Başlangıçlar:**
🥣 Mercimek Çorbası
🥗 Çoban Salata
🧀 Peynir Tabağı

**Ana Yemekler:**
🍖 Kuzu Tandır
🍗 Tavuk Şiş
🥘 Patlıcan Kebabı
🍚 Pilav

**Tatlılar:**
🍮 Kazandibi
🍯 Baklava
🥛 Sütlaç

**Fiyat:** 350₺/Kişi

**Rezervasyon:**
📞 0232 XXX XX XX
📧 info@anteplimutfagi.com

Ramazan ayınızı ailenizle birlikte bizimle paylaşın! 

**Özel Paketler:**
- 10+ kişilik gruplar için %15 indirim
- Kurumsal siparişler için özel fiyatlandırma

Hayırlı Ramazanlar! 🤲`,
    author: 'Antepli Mutfağı',
    date: '5 Ocak 2026',
    readTime: '4 dk',
    category: 'news',
    tags: ['Ramazan', 'İftar', 'Menü'],
  },
];
