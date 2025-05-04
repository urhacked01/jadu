import { Bike } from '@/app/types/bike';
import { heroMotorcycles } from './hero-motorcycles';
import { heroScooters } from './hero-scooters';
import { vidaElectric } from './vida-electric';
import { harleyDavidsonBikes, mavrickBikes } from './premium-bikes';

// Combine all bike data
export const allBikes: Bike[] = [
  ...heroMotorcycles,
  ...heroScooters,
  ...vidaElectric,
  ...harleyDavidsonBikes,
  ...mavrickBikes,
];
