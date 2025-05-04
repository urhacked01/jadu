export interface Location {
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
}

export const locations: Location[] = [
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
    googleMapsUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.563043387377!2d73.7681646!3d20.0225445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeba0fc5f7d5d%3A0x8b3b5b5b5b5b5b5b!2sDhanlaxmi%20Premia!5e0!3m2!1sen!2sin!4v1629789456789!5m2!1sen!2sin',
  },
];
