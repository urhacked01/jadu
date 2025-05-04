'use client';

import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Bike3DViewerProps {
  modelUrl: string;
  className?: string;
  bikeImage?: string;
}

export default function Bike3DViewer({ modelUrl, className = '', bikeImage }: Bike3DViewerProps) {
  // Hero MotoCorp configurator URLs for different models
  const hero3DViewers = {
    'karizma-xmr': 'https://www.heromotocorp.com/en-in/motorcycles/KarizmaXMR/configurator.html',
    'xtreme-160r-4v':
      'https://www.heromotocorp.com/en-in/motorcycles/Xtreme160R4V/configurator.html',
    'xpulse-200t-4v':
      'https://www.heromotocorp.com/en-in/motorcycles/XPulse200T4V/configurator.html',
    'xpulse-200-4v': 'https://www.heromotocorp.com/en-in/motorcycles/XPulse2004V/configurator.html',
    'xtreme-160s': 'https://www.heromotocorp.com/en-in/motorcycles/Xtreme160S/configurator.html',
  };

  // Get the appropriate 3D viewer URL based on the bike model
  const viewerUrl = hero3DViewers[modelUrl as keyof typeof hero3DViewers] || '';

  return (
    <div
      className={`w-full h-[500px] rounded-lg overflow-hidden bg-gray-100 flex flex-col items-center justify-center ${className}`}
    >
      <div className="text-center p-6">
        <div className="mb-4 relative w-full max-w-md mx-auto h-64">
          {bikeImage ? (
            <Image
              src={bikeImage}
              alt="Bike Image"
              fill
              className="object-contain rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
        </div>
        {viewerUrl ? (
          <>
            <a
              href={viewerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
            >
              <span className="mr-2">Customize & View in 3D</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <p className="mt-4 text-sm text-gray-600">
              Opens Hero MotoCorp's official 3D configurator in a new tab
            </p>
          </>
        ) : (
          <p className="text-gray-500">3D configurator not available for this model</p>
        )}
      </div>
    </div>
  );
}
