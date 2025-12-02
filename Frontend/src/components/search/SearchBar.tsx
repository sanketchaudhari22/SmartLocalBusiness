import { useState } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
  initialQuery?: string;
  initialLocation?: string;
  placeholder?: string;
  locationPlaceholder?: string;
  size?: 'sm' | 'md' | 'lg';
  showLocation?: boolean;
}

export const SearchBar = ({
  onSearch,
  initialQuery = '',
  initialLocation = '',
  placeholder = 'Search for services, businesses...',
  locationPlaceholder = 'City or ZIP code',
  size = 'md',
  showLocation = true
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim(), location.trim());
  };

  const handleClear = () => {
    setQuery('');
    setLocation('');
    onSearch('', '');
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`
        flex flex-col md:flex-row gap-3
        ${sizeClasses[size]}
      `}>
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className={`
                w-full pl-10 pr-10 py-3 rounded-lg border border-neutral-300
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                ${sizeClasses[size]}
              `}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Location Input */}
        {showLocation && (
          <div className="md:w-64 relative">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={locationPlaceholder}
                className={`
                  w-full pl-10 pr-10 py-3 rounded-lg border border-neutral-300
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                  ${sizeClasses[size]}
                `}
              />
              {location && (
                <button
                  type="button"
                  onClick={() => setLocation('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Search Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          leftIcon={<Search className="w-5 h-5" />}
          className="md:w-auto"
        >
          Search
        </Button>

        {/* Clear Button */}
        {(query || location) && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleClear}
            className="md:w-auto"
          >
            Clear
          </Button>
        )}
      </div>
    </form>
  );
};
