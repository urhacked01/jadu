'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, MapPin, Calendar, Bike, ShieldCheck } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

// Sample featured bikes
const FEATURED_BIKES = [
  {
    id: 'mavrick-440-basic',
    name: 'Hero Mavrick 440',
    price: 239000,
    image: 'https://www.heromotocorp.com/content/dam/hero-aem-website/in/en-in/premia/acja/acja/bike-image/gallery-01.png',
    description: 'Most powerful Hero bike with 27 bhp power and premium features.',
    category: 'hero',
    specs: {
      engine: '440 cc',
      mileage: '35 kmpl',
      power: '27 bhp',
      weight: '190 kg',
    },
  },
  {
    id: 'vida-v2-pro',
    name: 'Vida V2 Pro',
    price: 145000,
    subsidyPrice: 140000,
    image: 'https://www.vidaworld.com/content/dam/vida2-0/product-detail-page/desktop/vida-2-0/v2-pro/pro-image-2.png',
    description: 'Premium electric scooter with advanced features and extended range.',
    category: 'vida',
    specs: {
      battery: '4.94 kWh',
      range: '120 km',
      power: '6.5 kW',
      weight: '125 kg',
    },
  },
];

// Sample testimonials
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rahul Sharma',
    location: 'Mumbai',
    rating: 5,
    comment:
      'Excellent service! I bought my Hero Splendor from Dhanlaxmi Motor and had a great experience. The staff was very helpful.',
  },
  {
    id: 2,
    name: 'Priya Patel',
    location: 'Pune',
    rating: 5,
    comment:
      "I've been dreaming of owning a Harley Davidson for years, and Dhanlaxmi Motor made it possible. Their financing options are flexible and the staff is knowledgeable.",
  },
];

// Sample locations
const LOCATIONS = [
  {
    id: 1,
    name: 'City Center',
    address: '123 Main Street, City Center',
    phone: '+91 9876543210',
    brands: ['Hero', 'Harley Davidson'],
  },
  {
    id: 2,
    name: 'Highway Branch',
    address: '456 Highway Road, Highway Plaza',
    phone: '+91 9876543211',
    brands: ['Hero'],
  },
  {
    id: 3,
    name: 'Suburb Outlet',
    address: '789 Suburb Avenue, Bike Town',
    phone: '+91 9876543212',
    brands: ['Hero', 'Harley Davidson'],
  },
];

const BIKE_IMAGES = [
  {
    image: 'https://www.heromotocorp.com/content/dam/hero-aem-website/in/homepage/banners/mavrick-feb-bike-web.png',
    alt: 'Hero Mavrick 440',
  },
  {
    image: 'https://www.vidaworld.com/content/dam/vida2-0/product-detail-page/desktop/vida-2-0/v2-pro/pro-image-4.png',
    alt: 'Vida V2 Pro',
  },
  {
    image: 'https://www.heromotocorp.com/en-in/blogs/a-list-of-the-top-features-and-specs-of-the-powerful-karizma-xmr/_jcr_content/root/container/container_1664460438/bootstraplayout_copy_1387943370/container-item0/image.coreimg.png/1730628853863/1-sep-sub.png',
    alt: 'Hero Karizma XMR',
  },
  {
    image: 'https://www.harley-davidson.com/content/dam/h-d/images/product-images/bikes/motorcycle/2024/2024-h-d-x-440/story/x440-mid-thd-2.jpg?impolicy=myresize&rw=2560',
    alt: 'Harley Davidson X440',
  },
];

export default function Home() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'hero' | 'harley'>('hero');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Memoized image carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % BIKE_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Memoized featured bike cards
  const FeaturedBikeCard = useCallback(({ bike }: { bike: typeof FEATURED_BIKES[0] }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64">
        <Image
          src={bike.image}
          alt={bike.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              bike.category === 'hero'
                ? 'bg-blue-100 text-blue-800'
                : bike.category === 'harley'
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-green-100 text-green-800'
            }`}
          >
            {bike.category === 'hero'
              ? 'Hero'
              : bike.category === 'harley'
                ? 'Harley-Davidson'
                : 'Vida'}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{bike.name}</h3>
        <p className="text-gray-600 mb-4">{bike.description}</p>
        <div className="flex justify-between items-center">
          <div>
          <span className="text-2xl font-bold">₹{bike.price.toLocaleString()}</span>
            {'subsidyPrice' in bike && bike.subsidyPrice && (
              <div className="text-sm text-green-600">
                After subsidy: ₹{bike.subsidyPrice.toLocaleString()}
              </div>
            )}
          </div>
          <Link href={`/bikes/${bike.id}`} className="btn-primary">
            {t('bikes.view_details')}
          </Link>
        </div>
      </div>
    </div>
  ), [t]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gray-900 text-white">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                  {t('home.hero.title')}
                </h1>
                <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8">
                  {t('home.hero.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                  <Link href="/bikes" className="btn-primary w-full sm:w-auto text-center">
                    {t('home.hero.cta')}
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-96 bg-gray-800 rounded-lg overflow-hidden">
                <Image
                  src={BIKE_IMAGES[currentImageIndex].image}
                  alt={BIKE_IMAGES[currentImageIndex].alt}
                  fill
                  className="object-cover transition-opacity duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bikes */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{t('home.featured_bikes')}</h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
              {t('home.featured_bikes.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {FEATURED_BIKES.map(bike => (
              <FeaturedBikeCard key={bike.id} bike={bike} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/bikes" className="btn-primary inline-flex items-center">
              {t('bikes.filter.all')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              {t('home.why_choose')}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto px-4">
              {t('home.why_choose.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <Bike className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.premium_bikes')}</h3>
              <p className="text-gray-600">
                {t('home.premium_bikes.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.expert_service')}</h3>
              <p className="text-gray-600">
                {t('home.expert_service.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.multiple_locations')}</h3>
              <p className="text-gray-600">
                {t('home.multiple_locations.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{t('home.testimonials')}</h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
              {t('home.testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {TESTIMONIALS.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{t('home.showrooms')}</h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
              {t('home.showrooms.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {LOCATIONS.map(location => (
              <div key={location.id} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">{location.name}</h3>
                <p className="text-gray-600 mb-4">{location.address}</p>
                <p className="text-gray-600 mb-4">{location.phone}</p>
                <div className="flex flex-wrap gap-2">
                  {location.brands.map(brand => (
                    <span
                      key={brand}
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                    >
                      {brand}
                    </span>
                  ))}
            </div>
          </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
