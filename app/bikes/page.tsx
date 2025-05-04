'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Bike, 
  ChevronRight, 
  Fuel, 
  Gauge, 
  Search,
  Filter,
  Star,
  IndianRupee,
  ArrowRight,
  Zap,
  Shield,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike as BikeType } from '@/app/types/bike';
import { allBikes } from '@/app/data/bikes/index';
import { useLanguage } from '@/app/context/LanguageContext';

export default function BikesPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000]);
  const [currentSort, setCurrentSort] = useState<string>('none');
  const [activeTab, setActiveTab] = useState<'all' | 'petrol' | 'electric'>('all');

  // Memoized bike type getter
  const getBikeType = useCallback((bike: BikeType) => {
    if (bike.isElectric) return 'Electric';
    if (bike.category === 'cruiser') return 'Cruiser';
    if (bike.category === 'sports') return 'Sports';
    if (bike.category === 'adventure') return 'Adventure';
    if (bike.category === 'scooter') return 'Scooter';

    const engineSize = parseInt(bike.specifications.engine);
    if (!isNaN(engineSize)) {
      if (engineSize <= 110) return 'Economy';
      if (engineSize <= 125) return 'Commuter';
      if (engineSize <= 150) return 'Premium Commuter';
      if (engineSize <= 200) return 'Sports';
      if (engineSize <= 250) return 'Performance';
      return 'Premium';
    }

    return bike.category || 'Other';
  }, []);

  // Memoized bike collections
  const { electricBikes, petrolBikes } = useMemo(() => ({
    electricBikes: allBikes.filter(bike => bike.isElectric),
    petrolBikes: allBikes.filter(bike => !bike.isElectric),
  }), []);

  // Memoized unique brands and categories
  const { allBrands, allCategories } = useMemo(() => ({
    allBrands: Array.from(new Set(allBikes.map(bike => bike.brand))),
    allCategories: Array.from(new Set(allBikes.map(bike => getBikeType(bike)))),
  }), [getBikeType]);

  // Memoized price range
  const { minPrice, maxPrice } = useMemo(() => ({
    minPrice: Math.min(...allBikes.map(bike => bike.price)),
    maxPrice: Math.max(...allBikes.map(bike => bike.price)),
  }), []);

  // Memoized filtered bikes
  const filteredBikes = useMemo(() => {
    let initialBikes: BikeType[] = [];
    switch (activeTab) {
      case 'electric':
        initialBikes = [...electricBikes];
          break;
      case 'petrol':
        initialBikes = [...petrolBikes];
          break;
      default:
        initialBikes = [...allBikes];
    }

    let result = [...initialBikes];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        bike =>
          bike.name.toLowerCase().includes(term) ||
          bike.brand.toLowerCase().includes(term) ||
          bike.category.toLowerCase().includes(term)
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter(bike => selectedBrands.includes(bike.brand));
    }

    if (selectedCategories.length > 0) {
      result = result.filter(bike => selectedCategories.includes(getBikeType(bike)));
    }

    result = result.filter(bike => bike.price >= priceRange[0] && bike.price <= priceRange[1]);

    switch (currentSort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (a.isNewArrival === b.isNewArrival ? 0 : a.isNewArrival ? -1 : 1));
        break;
    }

    return result;
  }, [
    activeTab,
    electricBikes,
    petrolBikes,
    searchTerm,
    selectedBrands,
    selectedCategories,
    priceRange,
    currentSort,
    getBikeType,
  ]);

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
    setCurrentSort('none');
  }, [minPrice, maxPrice]);

  // Memoized bike card component
  const BikeCard = useCallback(({ bike }: { bike: BikeType }) => (
    <Link href={`/bikes/${bike.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full">
                <Image
                  src={bike.images.main}
                  alt={bike.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {bike.isNewArrival && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              {t('nav.new_arrivals')}
            </div>
          )}
          {bike.isElectric && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              {t('bikes.filter.vida')}
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900 truncate">{bike.name}</h3>
            <div className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-1 text-sm">{bike.rating}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-3 truncate">{getBikeType(bike)}</p>
          <div className="flex justify-between items-center">
            <div className="text-red-600 font-bold flex items-center">
              <IndianRupee className="h-3 w-3 mr-1" />
              {bike.price.toLocaleString()}
              {bike.isElectric && bike.subsidyPrice && (
                <span className="text-xs text-green-600 ml-1">{t('bikes.subsidy_applied')}</span>
              )}
            </div>
            <div className="text-sm text-red-600 flex items-center">
              {t('bikes.view_details')}
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  ), [getBikeType, t]);

  // Render bike cards
  const BikesGrid = ({ bikes }: { bikes: BikeType[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {bikes.map(bike => (
        <BikeCard key={bike.id} bike={bike} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('bikes.title')}</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Find the perfect bike that matches your style and needs from our comprehensive range of
            Hero motorcycles, scooters, and electric vehicles.
          </p>
        </div>
      </section>

      {/* Bike Type Tabs */}
      <div className="bg-white py-4 shadow-sm sticky top-[72px] z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('bikes.filter.all')} ({allBikes.length})
            </button>
            <button
              onClick={() => setActiveTab('petrol')}
              className={`px-6 py-2 rounded-md font-medium transition-colors flex items-center ${
                activeTab === 'petrol'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Fuel className="mr-2 h-4 w-4" />
              {t('bikes.filter.hero')} ({petrolBikes.length})
            </button>
            <button
              onClick={() => setActiveTab('electric')}
              className={`px-6 py-2 rounded-md font-medium transition-colors flex items-center ${
                activeTab === 'electric'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Zap className="mr-2 h-4 w-4" />
              {t('bikes.filter.vida')} ({electricBikes.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">{t('bikes.filters')}</h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  {t('bikes.reset_filters')}
                </button>
              </div>

              {/* Search */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('bikes.search')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('bikes.search_placeholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('bikes.brand')}
                </label>
                <div className="space-y-2">
                  {allBrands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBrands([...selectedBrands, brand]);
                          } else {
                            setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                          }
                        }}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                    </div>
                      </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('bikes.category')}
                </label>
                <div className="space-y-2">
                  {allCategories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, category]);
                          } else {
                            setSelectedCategories(
                              selectedCategories.filter((c) => c !== category)
                            );
                          }
                        }}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                      ))}
                    </div>
                  </div>

              {/* Price Range Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('bikes.price_range')}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value), priceRange[1]])
                    }
                    className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm"
                  />
                  <span className="text-gray-500">{t('bikes.to')}</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('bikes.sort_by')}
                </label>
                <select
                  value={currentSort}
                  onChange={(e) => setCurrentSort(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="none">{t('bikes.sort.default')}</option>
                  <option value="price-low">{t('bikes.sort.price_low')}</option>
                  <option value="price-high">{t('bikes.sort.price_high')}</option>
                  <option value="rating">{t('bikes.sort.rating')}</option>
                  <option value="newest">{t('bikes.sort.newest')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bike Grid */}
          <div className="flex-1">
            <BikesGrid bikes={filteredBikes} />
          </div>
        </div>
      </div>
    </div>
  );
} 
