import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BikeImageSliderProps {
  images: string[];
  bikeName: string;
}

export default function BikeImageSlider({ images, bikeName }: BikeImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
      {/* Main Image */}
      <div className="relative w-full h-full">
        {images[currentImageIndex] ? (
          <Image
            src={images[currentImageIndex]}
            alt={`${bikeName} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={currentImageIndex === 0}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400 font-bold text-center p-4">
              <div className="text-4xl mb-2">🏍️</div>
              <div className="text-sm">{bikeName}</div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
