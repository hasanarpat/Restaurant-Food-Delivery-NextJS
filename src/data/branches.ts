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
  },
];
