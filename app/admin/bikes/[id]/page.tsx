'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bike } from '@/app/bikes/page';

export default function EditBike({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [bike, setBike] = useState<Bike | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBike = () => {
      try {
        const savedBikes = localStorage.getItem('bikes');
        if (savedBikes) {
          const bikes: Bike[] = JSON.parse(savedBikes);
          const foundBike = bikes.find(b => b.id === parseInt(params.id));
          if (foundBike) {
            setBike(foundBike);
          } else {
            setError('Bike not found');
          }
        }
      } catch (err) {
        setError('Failed to load bike');
      } finally {
        setIsLoading(false);
      }
    };

    loadBike();
  }, [params.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bike) return;

    try {
      const savedBikes = localStorage.getItem('bikes');
      if (savedBikes) {
        const bikes: Bike[] = JSON.parse(savedBikes);
        const updatedBikes = bikes.map(b => (b.id === bike.id ? bike : b));
        localStorage.setItem('bikes', JSON.stringify(updatedBikes));
        router.push('/admin/bikes');
      }
    } catch (err) {
      setError('Failed to save bike');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!bike) {
    return <div>Bike not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Bike</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={bike.name}
              onChange={e => setBike({ ...bike, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              value={bike.brand}
              onChange={e => setBike({ ...bike, brand: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={bike.category}
              onChange={e => setBike({ ...bike, category: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={bike.price}
              onChange={e => setBike({ ...bike, price: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Power</label>
            <input
              type="text"
              value={bike.power}
              onChange={e => setBike({ ...bike, power: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mileage</label>
            <input
              type="text"
              value={bike.mileage}
              onChange={e => setBike({ ...bike, mileage: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Warranty</label>
            <input
              type="text"
              value={bike.warranty}
              onChange={e => setBike({ ...bike, warranty: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={bike.rating}
              onChange={e => setBike({ ...bike, rating: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/bikes')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
