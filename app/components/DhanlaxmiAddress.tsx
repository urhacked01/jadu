import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { locations } from '../data/locations';

interface AddressProps {
  className?: string;
  showMap?: boolean;
  locationId?: number;
}

export default function DhanlaxmiAddress({
  className = '',
  showMap = false,
  locationId = 1,
}: AddressProps) {
  const location = locations.find(loc => loc.id === locationId) || locations[0];
  const { address, contact, hours } = location;

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <h3 className="text-xl font-semibold mb-4">{location.name}</h3>

      <div className="space-y-3">
        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
          <div>
            <p className="text-gray-800">
              {location.name}, {address.landmark},
              <br />
              {address.street},
              <br />
              {address.city} - {address.pincode}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-primary flex-shrink-0" />
          <div>
            <a href={`tel:${contact.phone}`} className="text-gray-800 hover:text-primary">
              {contact.phone}
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-primary flex-shrink-0" />
          <div>
            <a href={`mailto:${contact.email}`} className="text-gray-800 hover:text-primary">
              {contact.email}
            </a>
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
          <div>
            <p className="text-gray-800">
              Monday - Saturday: {hours.weekdays}
              <br />
              Sunday: {hours.sunday}
            </p>
          </div>
        </div>
      </div>

      {showMap && (
        <div className="mt-6">
          <iframe
            src={location.googleMapsUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>
        </div>
      )}
    </div>
  );
}
