import { Bike } from '@/app/types/bike';

// Harley-Davidson Bikes
export const harleyDavidsonBikes: Bike[] = [
  {
    id: 'harley-davidson-x-440',
    name: 'Harley-Davidson X 440',
    brand: 'Harley-Davidson',
    price: 239500,
    description: 'The Harley-Davidson X 440 is an entry-level Harley motorcycle designed specifically for the Indian market, combining American heritage with modern features.',
    features: [
      'H-D X 440 tuned engine',
      'Upside-down front forks',
      'Dual-channel ABS',
      'Digital-analog instrument cluster',
      'LED lighting all around',
      'Premium fit and finish',
    ],
    specifications: {
      engine: '440cc, Air-oil cooled, Single cylinder',
      mileage: '35 kmpl',
      transmission: '6-Speed',
      fuelCapacity: '13 liters',
      weight: '190kg',
    },
    images: {
      main: 'http://images.overdrive.in/wp-content/uploads/2023/07/2023-Harley-Davidson-X-440-1-900x506.jpg',
      gallery: [
        'http://images.overdrive.in/wp-content/uploads/2023/07/2023-Harley-Davidson-X-440-2-900x506.jpg',
        'http://images.overdrive.in/wp-content/uploads/2023/07/2023-Harley-Davidson-X-440-10-900x506.jpg',
        'http://images.overdrive.in/wp-content/uploads/2023/07/2023-Harley-Davidson-X-440-8-900x506.jpg',
      ],
    },
    category: 'cruiser',
    power: '27 bhp',
    isNewArrival: true,
    isPopular: true,
    rating: 4.7,
    isElectric: false,
  }
];

// Mavrick Series Bikes
export const mavrickBikes: Bike[] = [
  {
    id: 'mavrick-440-top',
    name: 'Mavrick 440 Top Model',
    brand: 'Hero',
    price: 274000,
    description: 'The Mavrick 440 Top Model is the flagship variant of Hero\'s premium 440cc motorcycle line, featuring top-of-the-line components and premium finishes.',
    features: [
      'Advanced riding modes',
      'Premium suspension setup',
      'Dual-channel ABS',
      'TFT display with Bluetooth connectivity',
      'LED lighting all around',
      'Premium alloy wheels',
    ],
    specifications: {
      engine: '440cc, Air-oil cooled, Single cylinder',
      mileage: '30 kmpl',
      transmission: '6-Speed',
      fuelCapacity: '13 liters',
      weight: '195kg',
    },
    images: {
      main: 'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/gallery-01.png',
      gallery: [
        'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/gallery-02.png',
        'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/gallery-03.png',
        'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/gallery-05.png',
      ],
    },
    category: 'roadster',
    power: '29 bhp',
    isNewArrival: true,
    isPopular: true,
    rating: 4.8,
    isElectric: false,
  },
  {
    id: 'mavrick-440-mid',
    name: 'Mavrick 440 Second Top',
    brand: 'Hero',
    price: 254000,
    description: 'The Mavrick 440 Second Top model offers an excellent balance of premium features and value in Hero\'s 440cc motorcycle lineup.',
    features: [
      'Multiple riding modes',
      'High-quality suspension',
      'Dual-channel ABS',
      'Digital-analog instrument cluster',
      'LED lighting',
      'Alloy wheels',
    ],
    specifications: {
      engine: '440cc, Air-oil cooled, Single cylinder',
      mileage: '32 kmpl',
      transmission: '6-Speed',
      fuelCapacity: '13 liters',
      weight: '193kg',
    },
    images: {
      main: 'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/gallery-05.png',
      gallery: [
        'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/gallery-06.png',
        'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/gallery-07.png',
        'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/updated-gallery-1.png',
      ],
    },
    category: 'roadster',
    power: '28 bhp',
    isNewArrival: true,
    isPopular: false,
    rating: 4.6,
    isElectric: false,
  },
  {
    id: 'mavrick-440-basic',
    name: 'Mavrick 440 Basic Model',
    brand: 'Hero',
    price: 239000,
    description: 'The Mavrick 440 Basic Model is the entry point to Hero\'s premium 440cc motorcycle lineup, offering essential features at a more accessible price point.',
    features: [
      'Standard riding mode',
      'Conventional telescopic forks',
      'Single-channel ABS',
      'Digital instrument cluster',
      'LED headlamp',
      'Spoke wheels',
    ],
    specifications: {
      engine: '440cc, Air-oil cooled, Single cylinder',
      mileage: '35 kmpl',
      transmission: '6-Speed',
      fuelCapacity: '13 liters',
      weight: '190kg',
    },
    images: {
      main: 'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/gallery-02.png',
      gallery: [
        'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/updated-gallery-1.png',
        'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/updated-gallery-2.png',
        'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/updated-gallery-4.png',
      ],
    },
    category: 'roadster',
    power: '27 bhp',
    isNewArrival: true,
    isPopular: false,
    rating: 4.5,
    isElectric: false,
  }
];

export const premiumBikes: Bike[] = [
  {
    id: 'mavrick-440-basic',
    name: 'Mavrick 440 Basic',
    brand: 'Hero',
    price: 199000,
    description: 'The Hero Mavrick 440 Basic is an entry-level premium motorcycle that combines style, performance, and comfort at an accessible price point.',
    features: [
      'LED headlamp and tail lamp',
      'Digital instrument cluster',
      'Single-channel ABS',
      'Tubeless tyres',
      'Comfortable ergonomics',
    ],
    specifications: {
      engine: '440cc, Air-cooled, Single cylinder',
      mileage: '35 kmpl',
      transmission: '6-Speed',
      fuelCapacity: '13.5 liters',
      weight: '187kg',
    },
    images: {
      main: 'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/gallery-03.png',
      gallery: [
        'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/updated-gallery-5.png',
        'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/gallery-05.png',
        'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/updated-gallery-2.png',
      ],
    },
    category: 'premium',
    power: '27 bhp',
    isNewArrival: true,
    isPopular: true,
    rating: 4.5,
    isElectric: false,
  },
];
 