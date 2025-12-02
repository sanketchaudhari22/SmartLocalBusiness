import { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface LocationFilterProps {
  selectedLocation?: string;
  popularLocations?: Array<{ name: string; count?: number }>;
  onSelectLocation: (location: string) => void;
  onUseCurrentLocation?: () => void;
}

export const LocationFilter = ({
  selectedLocation = '',
  popularLocations = [],
  onSelectLocation,
  onUseCurrentLocation
}: LocationFilterProps) => {
  const [locationInput, setLocationInput] = useState(selectedLocation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectLocation(locationInput.trim());
  };

  const handleLocationClick = (location: string) => {
    setLocationInput(location);
    onSelectLocation(location);
  };

  const handleClear = () => {
    setLocationInput('');
    onSelectLocation('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <h3 className="text-h4 text-neutral-900 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary-600" />
        Location
      </h3>

      {/* Location Input */}
      <form onSubmit={handleSubmit} className="mb-4">
        <Input
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          placeholder="Enter city or ZIP code"
          leftIcon={<MapPin className="w-5 h-5" />}
        />
        <div className="flex gap-2 mt-3">
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="flex-1"
          >
            Apply
          </Button>
          {locationInput && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClear}
            >
              Clear
            </Button>
          )}
        </div>
      </form>

      {/* Current Location */}
      {onUseCurrentLocation && (
        <Button
          variant="outline"
          size="sm"
          onClick={onUseCurrentLocation}
          leftIcon={<Navigation className="w-4 h-4" />}
          className="w-full mb-4"
        >
          Use Current Location
        </Button>
      )}

      {/* Popular Locations */}
      {popularLocations.length > 0 && (
        <div>
          <p className="text-sm font-medium text-neutral-700 mb-3">
            Popular Locations
          </p>
          <div className="space-y-2">
            {popularLocations.map((location, index) => (
              <button
                key={index}
                onClick={() => handleLocationClick(location.name)}
                className={`
                  w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors
                  ${selectedLocation === location.name
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'hover:bg-neutral-50 text-neutral-700'
                  }
                `}
              >
                <span>{location.name}</span>
                {location.count !== undefined && (
                  <Badge
                    variant={selectedLocation === location.name ? 'primary' : 'secondary'}
                    size="sm"
                  >
                    {location.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
