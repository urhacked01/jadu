'use client';

import { useState } from 'react';
import { Calendar, Clock, Wrench, CheckCircle, AlertCircle } from 'lucide-react';

const serviceTypes = [
  {
    id: 'regular',
    name: 'Regular Service',
    description: 'Basic maintenance and check-up',
    duration: '1-2 hours',
    price: '₹500',
    includes: ['Oil change', 'Filter replacement', 'Basic inspection', 'Chain lubrication'],
  },
  {
    id: 'premium',
    name: 'Premium Service',
    description: 'Comprehensive maintenance package',
    duration: '3-4 hours',
    price: '₹1500',
    includes: [
      'All regular service items',
      'Brake inspection & adjustment',
      'Electrical system check',
      'Tyre pressure & condition check',
      'Battery check',
    ],
  },
  {
    id: 'repair',
    name: 'Repair Service',
    description: 'Diagnostic and repair service',
    duration: 'Varies',
    price: 'Contact for quote',
    includes: [
      'Detailed diagnostic',
      'Parts replacement',
      'System repair',
      'Test ride after repair',
    ],
  },
];

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bikeDetails, setBikeDetails] = useState({
    model: '',
    registration: '',
    year: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the booking details to your backend
    console.log({
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      bikeDetails,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Book a Service</h1>
            <p className="text-gray-600">
              Schedule a service appointment for your bike at Dhanlaxmi Motor. Choose from our range
              of service packages and select a convenient time slot.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Service Type Selection */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Select Service Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {serviceTypes.map(service => (
                  <div
                    key={service.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedService === service.id
                        ? 'border-[var(--primary)] bg-[var(--primary-light)]'
                        : 'border-gray-200 hover:border-[var(--primary)]'
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{service.name}</h3>
                      <Wrench className="h-5 w-5 text-[var(--primary)]" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {service.duration}
                      </span>
                      <span className="font-medium">{service.price}</span>
                    </div>
                    <ul className="mt-3 space-y-1">
                      {service.includes.map((item, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bike Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Bike Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bike Model</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={bikeDetails.model}
                    onChange={e => setBikeDetails({ ...bikeDetails, model: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={bikeDetails.registration}
                    onChange={e => setBikeDetails({ ...bikeDetails, registration: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year of Manufacture
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={bikeDetails.year}
                    onChange={e => setBikeDetails({ ...bikeDetails, year: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Date and Time Selection */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={selectedTime}
                    onChange={e => setSelectedTime(e.target.value)}
                    required
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn-primary px-8 py-3"
                disabled={!selectedService || !selectedDate || !selectedTime}
              >
                Book Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
