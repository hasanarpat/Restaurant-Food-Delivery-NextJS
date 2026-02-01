export interface Review {
  id: string;
  user: string;
  comment: string;
  rating: number;
  date: string;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  district: string;
  address: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  workingHours: {
    weekday: string;
    weekend: string;
  };
  manager: string;
  rating: number;
  reviews: Review[];
}

export const BRANCHES: Branch[] = [
  {
    id: '1',
    name: 'Alsancak Şubesi',
    city: 'İzmir',
    district: 'Alsancak',
    address: 'Kıbrıs Şehitleri Cad. No: 140, Alsancak, Konak/İzmir',
    phone: '0232 464 50 00',
    coordinates: {
      lat: 38.4366,
      lng: 27.1469,
    },
    workingHours: {
      weekday: '10:00 - 23:00',
      weekend: '10:00 - 00:00',
    },
    manager: 'Ahmet Yılmaz',
    rating: 4.9,
    reviews: [
      {
        id: 'r1',
        user: 'Zeynep K.',
        comment:
          'Lahmacunları harika, servis çok hızlı ve personel güler yüzlü!',
        rating: 5,
        date: '15 Ocak 2026',
      },
      {
        id: 'r2',
        user: 'Mehmet A.',
        comment: 'Kebaplar lezzetli ama bazen biraz kalabalık oluyor.',
        rating: 4,
        date: '10 Ocak 2026',
      },
      {
        id: 'r3',
        user: 'Ayşe D.',
        comment: 'Atmosfer çok güzel, ailemle sık sık geliyoruz.',
        rating: 5,
        date: '5 Ocak 2026',
      },
    ],
  },
  {
    id: '2',
    name: 'Karşıyaka Şubesi',
    city: 'İzmir',
    district: 'Karşıyaka',
    address: 'Atatürk Bulvarı No: 256, Karşıyaka/İzmir',
    phone: '0232 369 80 00',
    coordinates: {
      lat: 38.4599,
      lng: 27.1114,
    },
    workingHours: {
      weekday: '10:00 - 23:00',
      weekend: '10:00 - 00:00',
    },
    manager: 'Mehmet Demir',
    rating: 4.7,
    reviews: [
      {
        id: 'r4',
        user: 'Can B.',
        comment: 'Sahil manzarası eşliğinde yemek yemek harika!',
        rating: 5,
        date: '20 Ocak 2026',
      },
      {
        id: 'r5',
        user: 'Elif T.',
        comment: 'Porsiyonlar doyurucu ve fiyatlar uygun.',
        rating: 4,
        date: '18 Ocak 2026',
      },
    ],
  },
  {
    id: '3',
    name: 'Bornova Şubesi',
    city: 'İzmir',
    district: 'Bornova',
    address:
      'Kazımdirik Mahallesi, Ege Üniversitesi Bulvarı No: 12, Bornova/İzmir',
    phone: '0232 388 20 00',
    coordinates: {
      lat: 38.4647,
      lng: 27.2136,
    },
    workingHours: {
      weekday: '10:00 - 23:00',
      weekend: '10:00 - 00:00',
    },
    manager: 'Ayşe Kaya',
    rating: 4.8,
    reviews: [
      {
        id: 'r6',
        user: 'Selin Y.',
        comment: 'Öğrenci dostu fiyatlar ve lezzetli yemekler!',
        rating: 5,
        date: '22 Ocak 2026',
      },
      {
        id: 'r7',
        user: 'Burak K.',
        comment: 'Kampüse çok yakın, her gün geliyorum.',
        rating: 5,
        date: '19 Ocak 2026',
      },
      {
        id: 'r8',
        user: 'Deniz M.',
        comment: 'Çok güzel ama bazen bekleme süresi uzuyor.',
        rating: 4,
        date: '12 Ocak 2026',
      },
    ],
  },
  {
    id: '4',
    name: 'Konak Şubesi',
    city: 'İzmir',
    district: 'Konak',
    address: 'Cumhuriyet Bulvarı No: 89, Konak/İzmir',
    phone: '0232 489 30 00',
    coordinates: {
      lat: 38.4127,
      lng: 27.1384,
    },
    workingHours: {
      weekday: '10:00 - 23:00',
      weekend: '10:00 - 00:00',
    },
    manager: 'Fatma Özkan',
    rating: 4.6,
    reviews: [
      {
        id: 'r9',
        user: 'Ali R.',
        comment: 'Merkezi konumu çok iyi, işten çıkınca uğruyorum.',
        rating: 5,
        date: '25 Ocak 2026',
      },
      {
        id: 'r10',
        user: 'Merve S.',
        comment: 'Lezzetler güzel ama otopark sorunu var.',
        rating: 4,
        date: '16 Ocak 2026',
      },
    ],
  },
  {
    id: '5',
    name: 'Buca Şubesi',
    city: 'İzmir',
    district: 'Buca',
    address: 'Şirinyer Mahallesi, İzmir Caddesi No: 45, Buca/İzmir',
    phone: '0232 434 70 00',
    coordinates: {
      lat: 38.3886,
      lng: 27.1773,
    },
    workingHours: {
      weekday: '10:00 - 23:00',
      weekend: '10:00 - 00:00',
    },
    manager: 'Mustafa Çelik',
    rating: 4.9,
    reviews: [
      {
        id: 'r11',
        user: 'Cem T.',
        comment: 'En iyi şube! Yemekler her zaman taze ve sıcak.',
        rating: 5,
        date: '28 Ocak 2026',
      },
      {
        id: 'r12',
        user: 'Gizem P.',
        comment: 'Aile ortamı harika, çocuklarla rahat geliyoruz.',
        rating: 5,
        date: '23 Ocak 2026',
      },
      {
        id: 'r13',
        user: 'Kemal L.',
        comment: 'Baklavaları muhteşem!',
        rating: 5,
        date: '14 Ocak 2026',
      },
    ],
  },
];
