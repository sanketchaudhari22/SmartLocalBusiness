import { BusinessDto } from '@/types';
import { Card } from '@/components/common/Card';
import { Star, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BusinessCardProps {
  business: BusinessDto;
}

export const BusinessCard = ({ business }: BusinessCardProps) => {
  return (
    <Card variant="hover" className="h-full">
      <Link to={`/businesses/${business.businessId}`} className="block">
        <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-4xl font-bold text-primary-600">
            {business.businessName.charAt(0)}
          </span>
        </div>

        <h3 className="text-h4 mb-2 line-clamp-1">{business.businessName}</h3>

        <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
          {business.description || 'No description available'}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">
              {business.rating?.toFixed(1) || '0.0'}
            </span>
            <span className="text-sm text-neutral-500">
              ({business.totalReviews || 0})
            </span>
          </div>

          <div className="flex items-center text-sm text-neutral-600">
            <MapPin className="w-4 h-4 mr-1" />
            {business.city}
          </div>
        </div>

        {business.phone && (
          <div className="flex items-center text-sm text-neutral-600 mb-3">
            <Phone className="w-4 h-4 mr-2" />
            {business.phone}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="badge-info">{business.categoryName}</span>
          {business.isActive ? (
            <span className="badge-success">Open</span>
          ) : (
            <span className="badge-error">Closed</span>
          )}
        </div>
      </Link>
    </Card>
  );
};
