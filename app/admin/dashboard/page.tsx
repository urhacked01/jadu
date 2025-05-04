'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Bike, ShoppingBag, Users, Settings } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBikes: 0,
    electricBikes: 0,
    petrolBikes: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total bikes
        const { count: totalBikes } = await supabase
          .from('bikes')
          .select('*', { count: 'exact', head: true });

        // Get electric bikes
        const { count: electricBikes } = await supabase
          .from('bikes')
          .select('*', { count: 'exact', head: true })
          .eq('isElectric', true);

        // Calculate petrol bikes
        const petrolBikes = (totalBikes || 0) - (electricBikes || 0);

        setStats({
          totalBikes: totalBikes || 0,
          electricBikes: electricBikes || 0,
          petrolBikes
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const adminLinks = [
    {
      title: 'Manage Bikes',
      description: 'Add, edit, or remove bikes from your inventory',
      icon: <Bike className="h-8 w-8 text-red-500" />,
      href: '/admin/bikes',
    },
    {
      title: 'Manage Locations',
      description: 'Update dealer locations and contact information',
      icon: <ShoppingBag className="h-8 w-8 text-red-500" />,
      href: '/admin/locations',
    },
    {
      title: 'User Settings',
      description: 'Manage admin users and permissions',
      icon: <Users className="h-8 w-8 text-red-500" />,
      href: '/admin/users',
    },
    {
      title: 'Site Settings',
      description: 'Update website configuration and content',
      icon: <Settings className="h-8 w-8 text-red-500" />,
      href: '/admin/settings',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 mr-4">
              <Bike className="h-6 w-6 text-red-600" />
            </div>
                <div>
              <p className="text-sm text-gray-500">Total Bikes</p>
              <p className="text-2xl font-semibold">{stats.totalBikes}</p>
            </div>
                </div>
              </div>
        
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <Bike className="h-6 w-6 text-green-600" />
            </div>
                <div>
              <p className="text-sm text-gray-500">Electric Bikes</p>
              <p className="text-2xl font-semibold">{stats.electricBikes}</p>
              </div>
            </div>
          </div>

        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <Bike className="h-6 w-6 text-blue-600" />
            </div>
                    <div>
              <p className="text-sm text-gray-500">Petrol Bikes</p>
              <p className="text-2xl font-semibold">{stats.petrolBikes}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Links */}
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminLinks.map((link, index) => (
          <Link 
            href={link.href} 
            key={index}
            className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col items-center text-center"
          >
            <div className="mb-2">{link.icon}</div>
            <h3 className="text-lg font-medium text-gray-900">{link.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
