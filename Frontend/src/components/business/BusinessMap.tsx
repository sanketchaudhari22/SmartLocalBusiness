import { MapPin } from 'lucide-react';
import { Button } from '../common/Button';

interface BusinessMapProps {
  address: string;
  city?: string;
  state?: string;
  zipCode?: string;
  businessName: string;
  lat?: number;
  lng?: number;
}

export const BusinessMap = ({
  address,
  city,
  state,
  zipCode,
  businessName,
  lat,
  lng
}: BusinessMapProps) => {
  const fullAddress = `${address}${city ? `, ${city}` : ''}${state ? `, ${state}` : ''}${zipCode ? ` ${zipCode}` : ''}`;

  // Generate Google Maps URLs
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

  // Generate static map image URL (using Google Static Maps API)
  // Note: In production, you would need an API key
  const staticMapUrl = lat && lng
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=800x400&markers=color:red%7C${lat},${lng}&key=YOUR_API_KEY`
    : null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-200">
        <h3 className="text-h4 text-neutral-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary-600" />
          Location
        </h3>
      </div>

      {/* Map Container */}
      <div className="relative bg-neutral-100 h-80">
        {staticMapUrl ? (
          <img
            src={staticMapUrl}
            alt={`Map showing location of ${businessName}`}
            className="w-full h-full object-cover"
          />
        ) : (
          // Fallback: Show placeholder with embedded iframe
          <iframe
            title={`Location of ${businessName}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>

      {/* Address and Actions */}
      <div className="p-6 space-y-4">
        <div>
          <p className="text-sm font-medium text-neutral-900 mb-1">Address</p>
          <p className="text-neutral-700">{address}</p>
          {(city || state || zipCode) && (
            <p className="text-neutral-700">
              {city && city}
              {city && state && ', '}
              {state && state}
              {zipCode && ` ${zipCode}`}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            onClick={() => window.open(mapsDirectionsUrl, '_blank')}
            leftIcon={<MapPin className="w-4 h-4" />}
            className="flex-1"
          >
            Get Directions
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open(mapsSearchUrl, '_blank')}
            className="flex-1"
          >
            View on Google Maps
          </Button>
        </div>
      </div>
    </div>
  );
};
