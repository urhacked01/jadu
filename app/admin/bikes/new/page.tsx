'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function NewBike() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    subsidyPrice: '',
    description: '',
    isElectric: false,
    mainImage: '',
    galleryImages: ['', '', ''],
    features: [''],
    specifications: {
      engine: '',
    mileage: '',
      transmission: '',
      weight: ''
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSpecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      specifications: {
        ...formData.specifications,
        [name]: value
      }
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData({
      ...formData,
      features: updatedFeatures
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures.splice(index, 1);
    setFormData({
      ...formData,
      features: updatedFeatures
    });
  };

  const handleGalleryImageChange = (index: number, value: string) => {
    const updatedGalleryImages = [...formData.galleryImages];
    updatedGalleryImages[index] = value;
    setFormData({
      ...formData,
      galleryImages: updatedGalleryImages
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    
    try {
      // Process the data
      const bikeData = {
        name: formData.name,
        price: parseFloat(formData.price),
        subsidyPrice: formData.subsidyPrice ? parseFloat(formData.subsidyPrice) : null,
        description: formData.description,
        isElectric: formData.isElectric,
        images: {
          main: formData.mainImage,
          gallery: formData.galleryImages.filter(img => img.trim() !== '')
        },
        features: formData.features.filter(feature => feature.trim() !== ''),
        specifications: formData.specifications
      };
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('bikes')
        .insert(bikeData)
        .select();
      
      if (error) throw error;
      
      router.push('/admin/bikes');
    } catch (error) {
      console.error('Error adding bike:', error);
      alert('Failed to add bike. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/admin/bikes" 
          className="text-red-600 hover:text-red-800 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Bikes
        </Link>
        <h1 className="text-2xl font-bold mt-2">Add New Bike</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bike Name <span className="text-red-500">*</span>
                </label>
            <input
              type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
              required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
            <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
              required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>

              <div className="flex items-center space-x-2">
            <input
                  type="checkbox"
                  id="isElectric"
                  name="isElectric"
                  checked={formData.isElectric}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="isElectric" className="text-sm font-medium text-gray-700">
                  Is Electric Bike
                </label>
          </div>

              {formData.isElectric && (
          <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    After Subsidy Price (₹)
                  </label>
            <input
              type="number"
                    name="subsidyPrice"
                    value={formData.subsidyPrice}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
              ></textarea>
            </div>
          </div>

          {/* Images */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Images</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Main Image URL
              </label>
            <input
              type="text"
                name="mainImage"
                value={formData.mainImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gallery Images
              </label>
              {formData.galleryImages.map((image, index) => (
                <div key={index} className="flex items-center mb-2">
            <input
              type="text"
                    value={image}
                    onChange={(e) => handleGalleryImageChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="https://example.com/gallery-image.jpg"
            />
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Features</h2>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center mb-2">
            <input
              type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Feature description"
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Feature
            </button>
          </div>

          {/* Specifications */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Engine
                </label>
            <input
                  type="text"
                  name="engine"
                  value={formData.specifications.engine}
                  onChange={handleSpecChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g. 223cc Single Cylinder"
            />
          </div>

          <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mileage
                </label>
            <input
              type="text"
                  name="mileage"
                  value={formData.specifications.mileage}
                  onChange={handleSpecChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g. 40 kmpl"
            />
          </div>

          <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transmission
            </label>
            <input
              type="text"
                  name="transmission"
                  value={formData.specifications.transmission}
                  onChange={handleSpecChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g. 6-Speed Manual"
            />
          </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight
                </label>
            <input
                  type="text"
                  name="weight"
                  value={formData.specifications.weight}
                  onChange={handleSpecChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g. 164 kg"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Link 
              href="/admin/bikes"
              className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel
            </Link>
          <button
            type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
              {loading ? 'Saving...' : 'Save Bike'}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
