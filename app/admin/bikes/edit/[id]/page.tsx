'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function EditBike() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    const fetchBike = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('bikes')
          .select('*')
          .eq('id', params.id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setFormData({
            name: data.name || '',
            price: data.price?.toString() || '',
            subsidyPrice: data.subsidyPrice?.toString() || '',
            description: data.description || '',
            isElectric: data.isElectric || false,
            mainImage: data.images?.main || '',
            galleryImages: data.images?.gallery?.length ? 
              [...data.images.gallery, '', '', ''].slice(0, 3) : 
              ['', '', ''],
            features: data.features?.length ? 
              [...data.features] : 
              [''],
            specifications: {
              engine: data.specifications?.engine || '',
              mileage: data.specifications?.mileage || '',
              transmission: data.specifications?.transmission || '',
              weight: data.specifications?.weight || ''
            }
          });
        } else {
          setError('Bike not found');
        }
      } catch (error: any) {
        console.error('Error fetching bike:', error);
        setError(error.message || 'Failed to load bike');
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
  }, [params.id]);

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
    
    setSaving(true);
    setError(null);
    
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
      
      // Update in Supabase
      const { error } = await supabase
        .from('bikes')
        .update(bikeData)
        .eq('id', params.id);
      
      if (error) throw error;
      
      router.push('/admin/bikes');
    } catch (error: any) {
      console.error('Error updating bike:', error);
      setError(error.message || 'Failed to update bike. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
        <p className="ml-2">Loading bike data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
        <Link 
          href="/admin/bikes" 
          className="text-red-600 hover:text-red-800 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Bikes
        </Link>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold mt-2">Edit Bike</h1>
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
              {formData.mainImage && (
                <div className="mt-2 h-24 w-24 relative">
                  <img 
                    src={formData.mainImage} 
                    alt="Main image preview" 
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
              )}
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
                  {image && (
                    <div className="ml-2 h-10 w-10 relative flex-shrink-0">
                      <img 
                        src={image} 
                        alt={`Gallery image ${index + 1}`} 
                        className="h-full w-full object-cover rounded-md"
                      />
                    </div>
                  )}
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
              disabled={saving}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {saving ? 'Saving...' : 'Update Bike'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 