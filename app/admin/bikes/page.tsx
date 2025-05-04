'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Bike as BikeType } from '@/app/types/bike';
import { Bike, Edit, Trash2, Plus, ExternalLink } from 'lucide-react';

export default function AdminBikes() {
  const [bikes, setBikes] = useState<BikeType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bikes')
        .select('*')
        .order('name');

      if (error) throw error;
      setBikes(data || []);
    } catch (error) {
      console.error('Error fetching bikes:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBike = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bike?')) return;
    
    try {
      const { error } = await supabase
        .from('bikes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Refresh the bikes list
      fetchBikes();
    } catch (error) {
      console.error('Error deleting bike:', error);
  }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Bikes</h1>
              <Link
          href="/admin/bikes/new" 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
          <Plus className="h-4 w-4 mr-2" />
                Add New Bike
              </Link>
            </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading bikes...</p>
                  </div>
      ) : bikes.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Bike className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bikes found</h3>
          <p className="text-gray-500 mb-6">Start adding bikes to your inventory</p>
          <Link 
            href="/admin/bikes/new" 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-flex items-center"
                    >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Bike
          </Link>
                </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bike
                    </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                    </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                    </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
              {bikes.map((bike) => (
                <tr key={bike.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                          <div className="flex items-center">
                      {bike.images?.main && (
                        <div className="h-10 w-10 flex-shrink-0 mr-4">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={bike.images.main}
                            alt={bike.name}
                          />
                            </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{bike.name}</div>
                            </div>
                          </div>
                        </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">₹{bike.price.toLocaleString()}</div>
                    {bike.isElectric && bike.subsidyPrice && (
                      <div className="text-xs text-green-600">
                        After subsidy: ₹{bike.subsidyPrice.toLocaleString()}
                          </div>
                    )}
                        </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bike.isElectric ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {bike.isElectric ? 'Electric' : 'Petrol'}
                          </span>
                        </td>
                  <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                    <Link
                      href={`/bikes/${bike.id}`}
                      className="text-gray-600 hover:text-gray-900 inline-flex items-center"
                      target="_blank"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                            <Link
                              href={`/admin/bikes/edit/${bike.id}`}
                      className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                            >
                      <Edit className="h-4 w-4" />
                            </Link>
                            <button
                      onClick={() => deleteBike(bike.id)}
                      className="text-red-600 hover:text-red-900 inline-flex items-center"
                            >
                      <Trash2 className="h-4 w-4" />
                            </button>
                        </td>
                      </tr>
              ))}
                </tbody>
              </table>
              </div>
            )}
    </div>
  );
}
