export interface Bike {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  features: string[];
  specifications: {
    engine: string;
    mileage: string;
    transmission: string;
    fuelCapacity: string;
    weight: string;
  };
  images: {
    main: string;
    gallery: string[];
  };
  category: string;
  power: string;
  isNewArrival: boolean;
  isPopular: boolean;
  rating: number;
  isElectric: boolean;
  subsidyPrice?: number;
}
 