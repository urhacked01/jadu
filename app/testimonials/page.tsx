'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, MapPin, Filter, Check } from 'lucide-react';
import { formatDate } from '../utils/dateFormatter';
import { withTranslateCompatibility, useGoogleTranslateEffect } from '../utils/translateHelper';

// Sample testimonial data
const TESTIMONIALS = [
  // Hero Bikes Section
  {
    id: 1,
    name: 'Rahul Sharma',
    location: 'Aurangabad',
    rating: 5,
    date: '2024-03-15',
    bikeModel: 'Hero Karizma XMR',
    category: 'hero',
    comment:
      "Excellent experience at Dhanlaxmi Motor! The staff was very helpful in explaining all features of the Karizma XMR. The bike's performance is outstanding.",
    image: '/images/testimonials/user1.jpg',
  },
  {
    id: 2,
    name: 'Priya Patel',
    location: 'Aurangabad',
    rating: 5,
    date: '2024-03-10',
    bikeModel: 'Hero Xtreme 160R 4V',
    category: 'hero',
    comment:
      'Bought my Xtreme 160R 4V last month. The service and support from Dhanlaxmi Motor has been exceptional. Highly recommended!',
    image: '/images/testimonials/user2.jpg',
  },
  {
    id: 3,
    name: 'Amit Deshmukh',
    location: 'Aurangabad',
    rating: 4,
    date: '2024-03-05',
    bikeModel: 'Hero XPulse 200 4V',
    category: 'hero',
    comment:
      'Great experience with the XPulse 200 4V. The bike handles well on both city roads and highways. Service center support is excellent.',
    image: '/images/testimonials/user3.jpg',
  },
  {
    id: 4,
    name: 'Neha Kulkarni',
    location: 'Aurangabad',
    rating: 5,
    date: '2024-02-28',
    bikeModel: 'Harley-Davidson X440',
    category: 'harley',
    comment:
      'Dream come true! The X440 is everything I wanted. Dhanlaxmi Motor made the purchase process smooth and hassle-free.',
    image: '/images/testimonials/user4.jpg',
  },
  {
    id: 5,
    name: 'Vikram Joshi',
    location: 'Aurangabad',
    rating: 5,
    date: '2024-02-20',
    bikeModel: 'Hero Karizma XMR',
    category: 'hero',
    comment:
      'The Karizma XMR is a beast! Perfect for long rides. The staff at Dhanlaxmi Motor provided excellent guidance throughout the purchase.',
    image: '/images/testimonials/user5.jpg',
  },
  {
    id: 6,
    name: 'Sneha Reddy',
    location: 'Aurangabad',
    rating: 4,
    date: '2024-02-15',
    bikeModel: 'Hero Xtreme 160S',
    category: 'hero',
    comment:
      'Love my new Xtreme 160S! The bike is perfect for daily commute. Service experience has been great so far.',
    image: '/images/testimonials/user6.jpg',
  },
  {
    id: 7,
    name: 'Rajesh Kumar',
    location: 'Aurangabad',
    rating: 5,
    date: '2024-02-10',
    bikeModel: 'Hero XPulse 200T 4V',
    category: 'hero',
    comment:
      'The XPulse 200T 4V is an amazing adventure bike. Dhanlaxmi Motor provided excellent after-sales support.',
    image: '/images/testimonials/user7.jpg',
  },
  {
    id: 8,
    name: 'Anjali Gupta',
    location: 'Aurangabad',
    rating: 5,
    date: '2024-02-05',
    bikeModel: 'Harley-Davidson X440',
    category: 'harley',
    comment:
      'The X440 is a perfect blend of power and comfort. The team at Dhanlaxmi Motor made my purchase experience memorable.',
    image: '/images/testimonials/user8.jpg',
  },
  {
    id: 9,
    name: 'Sachin Malhotra',
    location: 'Aurangabad',
    rating: 4,
    date: '2024-01-30',
    bikeModel: 'Hero Karizma XMR',
    category: 'hero',
    comment:
      'Great bike with excellent performance. The service team is very responsive and helpful.',
    image: '/images/testimonials/user9.jpg',
  },
  {
    id: 10,
    name: 'Meera Singh',
    location: 'Aurangabad',
    rating: 5,
    date: '2024-01-25',
    bikeModel: 'Hero Xtreme 160R 4V',
    category: 'hero',
    comment:
      'The Xtreme 160R 4V is perfect for city riding. Dhanlaxmi Motor provided great financing options.',
    image: '/images/testimonials/user10.jpg',
  },
  {
    id: 11,
    name: 'Arjun Mehta',
    location: 'Aurangabad',
    rating: 5,
    date: '2024-01-20',
    bikeModel: 'Hero XPulse 200 4V',
    category: 'hero',
    comment:
      'Amazing adventure bike! The team at Dhanlaxmi Motor provided excellent guidance on maintenance.',
    image: '/images/testimonials/user11.jpg',
  },
  {
    id: 12,
    name: 'Divya Sharma',
    location: 'Aurangabad',
    rating: 4,
    date: '2024-01-15',
    bikeModel: 'Harley-Davidson X440',
    category: 'harley',
    comment: 'The X440 is a dream machine! The purchase process was smooth and professional.',
    image: '/images/testimonials/user12.jpg',
  },
  {
    id: 13,
    name: 'Rohan Kapoor',
    location: 'Aurangabad',
    rating: 5,
    date: '2024-01-10',
    bikeModel: 'Hero Karizma XMR',
    category: 'hero',
    comment:
      'Excellent bike with great performance. The service team is very knowledgeable and helpful.',
    image: '/images/testimonials/user13.jpg',
  },
  {
    id: 14,
    name: 'Pooja Verma',
    location: 'Aurangabad',
    rating: 4,
    date: '2024-01-05',
    bikeModel: 'Hero Xtreme 160S',
    category: 'hero',
    comment: 'Love my new bike! The staff at Dhanlaxmi Motor made the purchase process very easy.',
    image: '/images/testimonials/user14.jpg',
  },
  {
    id: 15,
    name: 'Karan Patel',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-12-30',
    bikeModel: 'Hero XPulse 200T 4V',
    category: 'hero',
    comment:
      'The XPulse 200T 4V is perfect for my adventure trips. Great service and support from the team.',
    image: '/images/testimonials/user15.jpg',
  },
  {
    id: 16,
    name: 'Anita Desai',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-12-25',
    bikeModel: 'Harley-Davidson X440',
    category: 'harley',
    comment:
      'The X440 is everything I wanted in a bike. Dhanlaxmi Motor provided excellent customer service.',
    image: '/images/testimonials/user16.jpg',
  },
  {
    id: 17,
    name: 'Vivek Reddy',
    location: 'Aurangabad',
    rating: 4,
    date: '2023-12-20',
    bikeModel: 'Hero Karizma XMR',
    category: 'hero',
    comment:
      'Great bike with amazing performance. The service team is very professional and helpful.',
    image: '/images/testimonials/user17.jpg',
  },
  {
    id: 18,
    name: 'Shreya Malhotra',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-12-15',
    bikeModel: 'Hero Xtreme 160R 4V',
    category: 'hero',
    comment:
      'The Xtreme 160R 4V is perfect for my daily commute. Excellent service from Dhanlaxmi Motor.',
    image: '/images/testimonials/user18.jpg',
  },
  {
    id: 19,
    name: 'Aditya Joshi',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-12-10',
    bikeModel: 'Hero XPulse 200 4V',
    category: 'hero',
    comment: 'Amazing adventure bike! The team provided great guidance on maintenance and care.',
    image: '/images/testimonials/user19.jpg',
  },
  {
    id: 20,
    name: 'Tanvi Gupta',
    location: 'Aurangabad',
    rating: 4,
    date: '2023-12-05',
    bikeModel: 'Harley-Davidson X440',
    category: 'harley',
    comment: 'The X440 is a dream come true! The purchase process was smooth and professional.',
    image: '/images/testimonials/user20.jpg',
  },
  {
    id: 21,
    name: 'Rahul Verma',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-11-30',
    bikeModel: 'Hero Karizma XMR',
    category: 'hero',
    comment:
      'Excellent bike with great performance. The service team is very knowledgeable and helpful.',
    image: '/images/testimonials/user21.jpg',
  },
  {
    id: 22,
    name: 'Priyanka Kapoor',
    location: 'Aurangabad',
    rating: 4,
    date: '2023-11-25',
    bikeModel: 'Hero Xtreme 160S',
    category: 'hero',
    comment: 'Love my new bike! The staff made the purchase process very easy and comfortable.',
    image: '/images/testimonials/user22.jpg',
  },
  {
    id: 23,
    name: 'Amit Desai',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-11-20',
    bikeModel: 'Hero XPulse 200T 4V',
    category: 'hero',
    comment: 'The XPulse 200T 4V is perfect for my adventure trips. Great service and support.',
    image: '/images/testimonials/user23.jpg',
  },
  {
    id: 24,
    name: 'Neha Reddy',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-11-15',
    bikeModel: 'Harley-Davidson X440',
    category: 'harley',
    comment: 'The X440 is everything I wanted in a bike. Excellent customer service throughout.',
    image: '/images/testimonials/user24.jpg',
  },
  {
    id: 25,
    name: 'Vikram Sharma',
    location: 'Aurangabad',
    rating: 4,
    date: '2023-11-10',
    bikeModel: 'Hero Karizma XMR',
    category: 'hero',
    comment: 'Great bike with amazing performance. The service team is very professional.',
    image: '/images/testimonials/user25.jpg',
  },
  {
    id: 26,
    name: 'Sneha Patel',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-11-05',
    bikeModel: 'Hero Xtreme 160R 4V',
    category: 'hero',
    comment: 'The Xtreme 160R 4V is perfect for my daily commute. Excellent service experience.',
    image: '/images/testimonials/user26.jpg',
  },
  {
    id: 27,
    name: 'Rajesh Kumar',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-10-30',
    bikeModel: 'Hero XPulse 200 4V',
    category: 'hero',
    comment: 'Amazing adventure bike! The team provided great guidance on maintenance.',
    image: '/images/testimonials/user27.jpg',
  },
  {
    id: 28,
    name: 'Anjali Gupta',
    location: 'Aurangabad',
    rating: 4,
    date: '2023-10-25',
    bikeModel: 'Harley-Davidson X440',
    category: 'harley',
    comment: 'The X440 is a dream come true! Smooth purchase process and great service.',
    image: '/images/testimonials/user28.jpg',
  },
  {
    id: 29,
    name: 'Sachin Malhotra',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-10-20',
    bikeModel: 'Hero Karizma XMR',
    category: 'hero',
    comment: 'Excellent bike with great performance. Knowledgeable and helpful service team.',
    image: '/images/testimonials/user29.jpg',
  },
  {
    id: 30,
    name: 'Meera Singh',
    location: 'Aurangabad',
    rating: 4,
    date: '2023-10-15',
    bikeModel: 'Hero Xtreme 160S',
    category: 'hero',
    comment: 'Love my new bike! The staff made the purchase process very easy.',
    image: '/images/testimonials/user30.jpg',
  },
  {
    id: 31,
    name: 'Arjun Mehta',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-10-10',
    bikeModel: 'Hero XPulse 200T 4V',
    category: 'hero',
    comment: 'Perfect adventure bike! Great service and support from the team.',
    image: '/images/testimonials/user31.jpg',
  },
  {
    id: 32,
    name: 'Divya Sharma',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-10-05',
    bikeModel: 'Harley-Davidson X440',
    category: 'harley',
    comment: 'The X440 is everything I wanted. Excellent customer service throughout.',
    image: '/images/testimonials/user32.jpg',
  },
  {
    id: 33,
    name: 'Rohan Kapoor',
    location: 'Aurangabad',
    rating: 4,
    date: '2023-09-30',
    bikeModel: 'Hero Karizma XMR',
    category: 'hero',
    comment: 'Great bike with amazing performance. Professional service team.',
    image: '/images/testimonials/user33.jpg',
  },
  {
    id: 34,
    name: 'Pooja Verma',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-09-25',
    bikeModel: 'Hero Xtreme 160R 4V',
    category: 'hero',
    comment: 'Perfect for daily commute. Excellent service experience.',
    image: '/images/testimonials/user34.jpg',
  },
  {
    id: 35,
    name: 'Karan Patel',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-09-20',
    bikeModel: 'Hero XPulse 200 4V',
    category: 'hero',
    comment: 'Amazing adventure bike! Great maintenance guidance.',
    image: '/images/testimonials/user35.jpg',
  },
  {
    id: 36,
    name: 'Anita Desai',
    location: 'Aurangabad',
    rating: 4,
    date: '2023-09-15',
    bikeModel: 'Harley-Davidson X440',
    category: 'harley',
    comment: 'Dream bike! Smooth purchase process and great service.',
    image: '/images/testimonials/user36.jpg',
  },
  {
    id: 37,
    name: 'Vivek Reddy',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-09-10',
    bikeModel: 'Hero Karizma XMR',
    category: 'hero',
    comment: 'Excellent bike with great performance. Helpful service team.',
    image: '/images/testimonials/user37.jpg',
  },
  {
    id: 38,
    name: 'Shreya Malhotra',
    location: 'Aurangabad',
    rating: 4,
    date: '2023-09-05',
    bikeModel: 'Hero Xtreme 160S',
    category: 'hero',
    comment: 'Love my new bike! Easy purchase process.',
    image: '/images/testimonials/user38.jpg',
  },
  {
    id: 39,
    name: 'Aditya Joshi',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-08-30',
    bikeModel: 'Hero XPulse 200T 4V',
    category: 'hero',
    comment: 'Perfect adventure bike! Great service and support.',
    image: '/images/testimonials/user39.jpg',
  },
  {
    id: 40,
    name: 'Tanvi Gupta',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-08-25',
    bikeModel: 'Harley-Davidson X440',
    category: 'harley',
    comment: 'Everything I wanted in a bike. Excellent service.',
    image: '/images/testimonials/user40.jpg',
  },
  {
    id: 41,
    name: 'Rahul Verma',
    location: 'Aurangabad',
    rating: 4,
    date: '2023-08-20',
    bikeModel: 'Hero Karizma XMR',
    category: 'hero',
    comment: 'Great bike with amazing performance. Professional team.',
    image: '/images/testimonials/user41.jpg',
  },
  {
    id: 42,
    name: 'Priyanka Kapoor',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-08-15',
    bikeModel: 'Hero Xtreme 160R 4V',
    category: 'hero',
    comment: 'Perfect for daily commute. Excellent service.',
    image: '/images/testimonials/user42.jpg',
  },
  {
    id: 43,
    name: 'Amit Desai',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-08-10',
    bikeModel: 'Hero XPulse 200 4V',
    category: 'hero',
    comment: 'Amazing adventure bike! Great maintenance support.',
    image: '/images/testimonials/user43.jpg',
  },
  {
    id: 44,
    name: 'Neha Reddy',
    location: 'Aurangabad',
    rating: 4,
    date: '2023-08-05',
    bikeModel: 'Harley-Davidson X440',
    category: 'harley',
    comment: 'Dream bike! Smooth purchase process.',
    image: '/images/testimonials/user44.jpg',
  },
  {
    id: 45,
    name: 'Vikram Sharma',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-07-30',
    bikeModel: 'Hero Karizma XMR',
    category: 'hero',
    comment: 'Excellent bike with great performance. Helpful team.',
    image: '/images/testimonials/user45.jpg',
  },
  {
    id: 46,
    name: 'Sneha Patel',
    location: 'Aurangabad',
    rating: 4,
    date: '2023-07-25',
    bikeModel: 'Hero Xtreme 160S',
    category: 'hero',
    comment: 'Love my new bike! Easy purchase process.',
    image: '/images/testimonials/user46.jpg',
  },
  {
    id: 47,
    name: 'Rajesh Kumar',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-07-20',
    bikeModel: 'Hero XPulse 200T 4V',
    category: 'hero',
    comment: 'Perfect adventure bike! Great service.',
    image: '/images/testimonials/user47.jpg',
  },
  {
    id: 48,
    name: 'Anjali Gupta',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-07-15',
    bikeModel: 'Harley-Davidson X440',
    category: 'harley',
    comment: 'Everything I wanted in a bike. Excellent service.',
    image: '/images/testimonials/user48.jpg',
  },
  {
    id: 49,
    name: 'Sachin Malhotra',
    location: 'Aurangabad',
    rating: 4,
    date: '2023-07-10',
    bikeModel: 'Hero Karizma XMR',
    category: 'hero',
    comment: 'Great bike with amazing performance. Professional team.',
    image: '/images/testimonials/user49.jpg',
  },
  {
    id: 50,
    name: 'Meera Singh',
    location: 'Aurangabad',
    rating: 5,
    date: '2023-07-05',
    bikeModel: 'Hero Xtreme 160R 4V',
    category: 'hero',
    comment: 'Perfect for daily commute. Excellent service experience.',
    image: '/images/testimonials/user50.jpg',
  },
  {
    id: 51,
    name: 'Rahul Verma',
    location: 'Aurangabad',
    rating: 5,
    date: '2024-03-20',
    bikeModel: 'Vida Electric',
    category: 'vida',
    comment:
      'The Vida Electric bike is amazing! Perfect for daily commute with zero emissions. The battery life is impressive and the charging is convenient.',
    image: '/images/testimonials/user51.jpg',
  },
  {
    id: 52,
    name: 'Priyanka Kapoor',
    location: 'Aurangabad',
    rating: 4,
    date: '2024-03-18',
    bikeModel: 'Vida Electric',
    category: 'vida',
    comment:
      'Switched to Vida Electric and loving it! The silent ride and low maintenance are great advantages. Dhanlaxmi Motor provided excellent support.',
    image: '/images/testimonials/user52.jpg',
  },
  {
    id: 53,
    name: 'Amit Desai',
    location: 'Aurangabad',
    rating: 5,
    date: '2024-03-15',
    bikeModel: 'Vida Electric',
    category: 'vida',
    comment:
      'The future of mobility is here! Vida Electric bike is perfect for city commuting. The instant torque and smooth ride are impressive.',
    image: '/images/testimonials/user53.jpg',
  },
  {
    id: 54,
    name: 'Neha Reddy',
    location: 'Aurangabad',
    rating: 5,
    date: '2024-03-12',
    bikeModel: 'Vida Electric',
    category: 'vida',
    comment:
      'Best decision to go electric! The Vida bike is not just eco-friendly but also very stylish. The service support from Dhanlaxmi Motor is excellent.',
    image: '/images/testimonials/user54.jpg',
  },
  {
    id: 55,
    name: 'Vikram Sharma',
    location: 'Aurangabad',
    rating: 4,
    date: '2024-03-10',
    bikeModel: 'Vida Electric',
    category: 'vida',
    comment:
      'The Vida Electric bike has exceeded my expectations. The range is good for daily use and the charging infrastructure is well supported.',
    image: '/images/testimonials/user55.jpg',
  },
  {
    id: 56,
    name: 'Sneha Patel',
    location: 'Aurangabad',
    rating: 5,
    date: '2024-03-08',
    bikeModel: 'Vida Electric',
    category: 'vida',
    comment:
      'Perfect for my daily office commute! The Vida Electric bike is saving me a lot on fuel costs and maintenance.',
    image: '/images/testimonials/user56.jpg',
  },
  {
    id: 57,
    name: 'Rajesh Kumar',
    location: 'Aurangabad',
    rating: 5,
    date: '2024-03-05',
    bikeModel: 'Vida Electric',
    category: 'vida',
    comment:
      'The smart features of Vida Electric are amazing! The app integration and battery management system are top-notch.',
    image: '/images/testimonials/user57.jpg',
  },
  {
    id: 58,
    name: 'Anjali Gupta',
    location: 'Aurangabad',
    rating: 4,
    date: '2024-03-03',
    bikeModel: 'Vida Electric',
    category: 'vida',
    comment:
      'Love the eco-friendly aspect of Vida Electric. The bike is perfect for city traffic and parking is never an issue.',
    image: '/images/testimonials/user58.jpg',
  },
  {
    id: 59,
    name: 'Sachin Malhotra',
    location: 'Aurangabad',
    rating: 5,
    date: '2024-03-01',
    bikeModel: 'Vida Electric',
    category: 'vida',
    comment:
      'The charging network in Aurangabad is well established. Never had any range anxiety with my Vida Electric bike.',
    image: '/images/testimonials/user59.jpg',
  },
  {
    id: 60,
    name: 'Meera Singh',
    location: 'Aurangabad',
    rating: 5,
    date: '2024-02-28',
    bikeModel: 'Vida Electric',
    category: 'vida',
    comment:
      'The after-sales service for Vida Electric at Dhanlaxmi Motor is exceptional. They provide regular maintenance checks and updates.',
    image: '/images/testimonials/user60.jpg',
  },
];

function TestimonialsPageContent() {
  const [filters, setFilters] = useState({
    category: 'all',
    rating: 'all',
    bikeModel: 'all',
  });

  // Use the Google Translate effect to add helper classes
  useGoogleTranslateEffect();

  const handleFilterChange = (filterType: string, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'all',
      rating: 'all',
      bikeModel: 'all',
    });
  };

  // Filter testimonials based on selected filters
  const filteredTestimonials = TESTIMONIALS.filter(testimonial => {
    const categoryMatch = filters.category === 'all' || testimonial.category === filters.category;
    const ratingMatch = filters.rating === 'all' || testimonial.rating === Number(filters.rating);
    const modelMatch =
      filters.bikeModel === 'all' ||
      (filters.bikeModel === 'karizma' && testimonial.bikeModel.includes('Karizma')) ||
      (filters.bikeModel === 'xtreme' && testimonial.bikeModel.includes('Xtreme')) ||
      (filters.bikeModel === 'xpulse' && testimonial.bikeModel.includes('XPulse')) ||
      (filters.bikeModel === 'x440' && testimonial.bikeModel.includes('X440'));

    return categoryMatch && ratingMatch && modelMatch;
  });

  return (
    <main className="py-8 sm:py-12">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Customer Testimonials
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto px-4">
            Hear what our customers have to say about their experience with Dhanlaxmi Motor and our
            range of Hero and Harley Davidson motorcycles.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={e => handleFilterChange('category', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                <option value="all">All Categories</option>
                <option value="hero">Hero</option>
                <option value="harley">Harley Davidson</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <select
                value={filters.rating}
                onChange={e => handleFilterChange('rating', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Bike Model
              </label>
              <select
                value={filters.bikeModel}
                onChange={e => handleFilterChange('bikeModel', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                <option value="all">All Models</option>
                <option value="karizma">Karizma XMR</option>
                <option value="xtreme">Xtreme 160R 4V</option>
                <option value="xpulse">XPulse 200 4V</option>
                <option value="x440">Harley-Davidson X440</option>
              </select>
            </div>

            <div className="flex items-end">
              <button onClick={resetFilters} className="btn-outline text-sm sm:text-base">
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredTestimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="mb-4">
                <h3 className="text-sm sm:text-base font-semibold">{testimonial.name}</h3>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                  <MapPin className="h-3 sm:h-4 w-3 sm:w-4" />
                  <span>{testimonial.location}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 sm:h-4 w-3 sm:w-4 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs sm:text-sm font-medium text-gray-900">
                  {testimonial.bikeModel}
                </p>
                <p
                  className="text-xs sm:text-sm text-gray-600 date-display notranslate"
                  data-format="numeric"
                  data-date={formatDate(testimonial.date)}
                >
                  {formatDate(testimonial.date)}
                </p>
              </div>

              <p className="text-sm sm:text-base text-gray-600">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// Wrap the component with our translate compatibility wrapper
const TestimonialsPage = withTranslateCompatibility(TestimonialsPageContent);
export default TestimonialsPage;
