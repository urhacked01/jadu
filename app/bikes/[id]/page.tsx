'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Gauge,
  Fuel,
  Star,
  Bike,
  Battery,
  Weight,
  Clock,
  Shield,
  Info,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import { Bike as BikeType } from '@/app/types/bike';
import { allBikes } from '@/app/data/bikes';
import { supabase } from '@/lib/supabase';

export default function BikeDetail() {
  const params = useParams();
  const [bike, setBike] = useState<BikeType | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        // Try to get bike from Supabase
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          const { data, error } = await supabase
            .from('bikes')
            .select('*')
            .eq('id', params.id)
            .single();

          if (error) {
            console.error('Supabase error:', error);
            // Fall back to static data
            fallbackToStaticData();
            return;
          }
          
          if (data) {
            setBike(data);
            setSelectedImage(data.images.main);
            setLoading(false);
            return;
          }
        }
        
        // If Supabase fetch fails or is not configured, fall back to static data
        fallbackToStaticData();
      } catch (error) {
        console.error('Error fetching bike:', error);
        // Fall back to static data
        fallbackToStaticData();
      }
    };
    
    const fallbackToStaticData = () => {
      // Find the bike by ID in our static data
    const foundBike = allBikes.find(b => b.id === params.id);
    if (foundBike) {
      setBike(foundBike);
      setSelectedImage(foundBike.images.main);
    }
      setLoading(false);
    };

    fetchBike();
  }, [params.id]);

  // Image fallback handling
  const getImageWithFallback = (imageUrl: string, bikeName: string) => {
    // If imageUrl is empty or undefined, return placeholder
    if (!imageUrl) {
      return `https://placehold.co/600x400/red/white?text=${encodeURIComponent(bikeName)}`;
    }
    return imageUrl;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Bike not found</h1>
            <Link
              href="/bikes"
              className="mt-4 inline-flex items-center text-red-600 hover:text-red-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Bikes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link
          href="/bikes"
          className="inline-flex items-center text-red-600 hover:text-red-800 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Bikes
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
              <Image
                src={getImageWithFallback(selectedImage || bike.images.main, bike.name)}
                alt={bike.name}
                fill
                className="object-cover"
                priority
                onError={(e: any) => {
                  e.target.src = `https://placehold.co/600x400/red/white?text=${encodeURIComponent(bike.name)}`;
                }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {bike.images.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className="relative h-20 rounded-lg overflow-hidden"
                >
                  <Image
                    src={getImageWithFallback(image, `${bike.name} - View ${index + 1}`)}
                    alt={`${bike.name} - View ${index + 1}`}
                    fill
                    className="object-cover"
                    onError={(e: any) => {
                      e.target.src = `https://placehold.co/200x200/red/white?text=Image+${index + 1}`;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Bike Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{bike.name}</h1>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">₹{bike.price.toLocaleString()}</span>
                {bike.isElectric && bike.subsidyPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ₹{bike.subsidyPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {bike.isElectric && bike.subsidyPrice && (
                <div className="mt-1 text-sm text-green-600">*After FAME II Subsidy</div>
              )}
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600">{bike.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="grid grid-cols-2 gap-2">
                {bike.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Gauge className="h-5 w-5 text-red-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Engine</p>
                    <p className="font-medium">{bike.specifications.engine}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Fuel className="h-5 w-5 text-red-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Mileage</p>
                    <p className="font-medium">{bike.specifications.mileage}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bike className="h-5 w-5 text-red-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Transmission</p>
                    <p className="font-medium">{bike.specifications.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Weight className="h-5 w-5 text-red-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium">{bike.specifications.weight}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <Link
                href={`/contact?bike=${bike.id}`}
                className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium flex-1 text-center"
              >
                Contact Dealer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
