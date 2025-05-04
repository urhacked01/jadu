import { Bike } from '@/app/types/bike';

export const heroScooters: Bike[] = [
  {
    id: 'pleasure-plus-lx',
    name: 'Pleasure+ LX',
    brand: 'Hero',
    price: 71538,
    description: 'The lightweight scooter designed especially for women riders.',
    features: ['i3s Technology', 'Mobile Charging Port', 'Side Stand Indicator'],
    specifications: {
      engine: '110.9cc',
      mileage: '60 kmpl',
      transmission: 'Automatic',
      fuelCapacity: '5L',
      weight: '104kg',
    },
    images: {
      main: 'https://www.heromotocorp.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/pleasure-plus-xtec/assets/price-update-pleasure-connect.png',
      gallery: [
        'https://www.heromotocorp.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/pleasure-plus-xtec/assets/pleasure-right-web.png',
        'https://www.heromotocorp.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/pleasure-plus-xtec/assets/New-Specs-Elect-pleasure-plus-xtec.png',
        'https://www.heromotocorp.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/pleasure-plus-xtec/assets/New-Specs-Dimension-pleasure-plus-xtec.png',
      ],
    },
    category: 'Scooter',
    power: '8.1PS',
    isNewArrival: false,
    isPopular: false,
    rating: 4.2,
    isElectric: false,
  },
  {
    id: 'destini-prime-e20',
    name: 'Destini Prime E20',
    brand: 'Hero',
    price: 65768,
    description: 'The feature-rich family scooter with ample storage and comfort.',
    features: ['i3s Technology', 'Mobile Charging Port', 'Boot Light'],
    specifications: {
      engine: '124.6cc',
      mileage: '55 kmpl',
      transmission: 'Automatic',
      fuelCapacity: '5L',
      weight: '112kg',
    },
    images: {
      main: 'https://www.heromotocorp.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/destini-prime/assets/price_image.png',
      gallery: [
        'https://www.heromotocorp.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/destini-prime/assets/New-Specs-125cc-Scooter-Engine.png',
        'https://www.heromotocorp.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/destini-prime/assets/suspensionx.png',
        'https://www.heromotocorp.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/destini-prime/assets/New-Specs-Dimensions.png',
      ],
    },
    category: 'Scooter',
    power: '8.7PS',
    isNewArrival: false,
    isPopular: false,
    rating: 4.2,
    isElectric: false,
  },
];
 