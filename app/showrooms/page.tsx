'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { showrooms } from '../data/showrooms';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  hover: {
    y: -5,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export default function ShowroomsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Our Showroom Locations
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
            Visit any of our showrooms to explore our range of Hero, Harley-Davidson, and Vida
            Electric motorcycles.
          </p>
        </motion.div>

        {/* Showrooms Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {showrooms.map(showroom => (
            <motion.div
              key={showroom.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48 sm:h-56 w-full">
                <Image
                  src={showroom.images.main}
                  alt={showroom.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={showroom.id === 1}
                />
              </div>
              <div className="p-6">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl sm:text-2xl font-bold mb-4"
                >
                  {showroom.name}
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                    <p className="text-sm sm:text-base text-gray-600">
                      {showroom.address.street}, {showroom.address.landmark}, {showroom.address.city},{' '}
                      {showroom.address.state} - {showroom.address.pincode}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[var(--primary)]" />
                    <p className="text-sm sm:text-base text-gray-600">{showroom.contact.phone}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[var(--primary)]" />
                    <p className="text-sm sm:text-base text-gray-600">{showroom.contact.email}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                    <div className="text-sm sm:text-base text-gray-600">
                      <p>Weekdays: {showroom.hours.weekdays}</p>
                      <p>Saturday: {showroom.hours.saturday}</p>
                      <p>Sunday: {showroom.hours.sunday}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {showroom.brands.map(brand => (
                      <span
                        key={brand}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mt-6"
                >
                  <Link
                    href={showroom.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full"
                  >
                    Get Directions
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
