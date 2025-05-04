export interface Showroom {
  id: number;
  name: string;
  address: {
    street: string;
    landmark: string;
    city: string;
    pincode: string;
    state: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  images: {
    main: string;
    gallery: string[];
  };
  brands: string[];
}

export const showrooms: Showroom[] = [
  {
    id: 2,
    name: 'Dhanlaxmi Automobiles',
    address: {
      street: 'X, 80 - More Chowk Rd, Bajaj Nagar, MIDC, Waluj',
      landmark: 'Near More Chowk',
      city: 'Chhatrapati Sambhaji Nagar',
      pincode: '431136',
      state: 'Maharashtra',
    },
    contact: {
      phone: '+91 8888876603',
      email: 'info@dhanlaxmiautomobiles.com',
    },
    hours: {
      weekdays: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 2:00 PM',
    },
    coordinates: {
      lat: 19.8500,
      lng: 75.3200,
    },
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.563043387377!2d75.3200!3d19.8500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeba0fc5f7d5d%3A0x8b3b5b5b5b5b5b5b!2sDhanlaxmi%20Automobiles!5e0!3m2!1sen!2sin!4v1629789456789!5m2!1sen!2sin',
    images: {
      main: 'https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/rVKRTtM.png',
      gallery: [
        'https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/rVKRTtM.png',
        'https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/rVKRTtM.png',
        'https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/rVKRTtM.png',
      ],
    },
    brands: ['Hero', 'Harley-Davidson'],
  },
  {
    id: 3,
    name: 'Dhanlaxmi Motors',
    address: {
      street: 'Plot No. 3, Beside Ira By Orchid Hotel, Opp to Master Cook Hotel',
      landmark: 'Near Jabinda Ground, Beed By Pass Road',
      city: 'Aurangabad',
      pincode: '431005',
      state: 'Maharashtra',
    },
    contact: {
      phone: '+91 8888876601',
      email: 'info@dhanlaxmimotors.com',
    },
    hours: {
      weekdays: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 2:00 PM',
    },
    coordinates: {
      lat: 19.8500,
      lng: 75.3200,
    },
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.563043387377!2d75.3200!3d19.8500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeba0fc5f7d5d%3A0x8b3b5b5b5b5b5b5b!2sDhanlaxmi%20Motors!5e0!3m2!1sen!2sin!4v1629789456789!5m2!1sen!2sin',
    images: {
      main: 'https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/QStzmfp.jpeg',
      gallery: [
        'https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/QStzmfp.jpeg',
        'https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/QStzmfp.jpeg',
        'https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/QStzmfp.jpeg',
      ],
    },
    brands: ['Hero', 'Harley-Davidson'],
  },
  {
    id: 1,
    name: 'Dhanlaxmi PREMIA',
    address: {
      street: 'Shop No 1/4, Skill Hub Complex, Jalna Road, Kranti Chowk',
      landmark: 'Near Kranti Chowk',
      city: 'Aurangabad',
      pincode: '431001',
      state: 'Maharashtra',
    },
    contact: {
      phone: '+91 93716 19191',
      email: 'info@dhanlaxmipremia.com',
    },
    hours: {
      weekdays: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: 'Closed',
    },
    coordinates: {
      lat: 20.0225445,
      lng: 73.7681646,
    },
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.563043387377!2d73.7681646!3d20.0225445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeba0fc5f7d5d%3A0x8b3b5b5b5b5b5b5b!2sDhanlaxmi%20Premia!5e0!3m2!1sen!2sin!4v1629789456789!5m2!1sen!2sin',
    images: {
      main: 'https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/IWGZMb3.jpeg',
      gallery: [
        'https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/IWGZMb3.jpeg',
        'https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/IWGZMb3.jpeg',
        'https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/IWGZMb3.jpeg',
      ],
    },
    brands: ['Hero', 'Harley-Davidson', 'Vida'],
  },
  {
    id: 4,
    name: 'Dhanlaxmi Petroleum',
    address: {
      street: 'Jai Bhavani Chowk, X385/A, Bajaj Nagar, MIDC, Waluj',
      landmark: 'Near Jai Bhavani Chowk',
      city: 'Chhatrapati Sambhaji Nagar',
      pincode: '431136',
      state: 'Maharashtra',
    },
    contact: {
      phone: '+91 88888766016',
      email: 'info@dhanlaxmipetroleum.com',
    },
    hours: {
      weekdays: '24/7',
      saturday: '24/7',
      sunday: '24/7',
    },
    coordinates: {
      lat: 19.8500,
      lng: 75.3200,
    },
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.563043387377!2d75.3200!3d19.8500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeba0fc5f7d5d%3A0x8b3b5b5b5b5b5b5b!2sDhanlaxmi%20Petroleum!5e0!3m2!1sen!2sin!4v1629789456789!5m2!1sen!2sin',
    images: {
      main: 'https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/ehFIyBd.jpeg',
      gallery: [
        'https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/ehFIyBd.jpeg',
        'https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/ehFIyBd.jpeg',
        'https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/ehFIyBd.jpeg',
      ],
    },
    brands: ['Hero', 'Harley-Davidson'],
  },
]; 