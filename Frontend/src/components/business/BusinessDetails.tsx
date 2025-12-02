import { Business } from '@/types';
import { RatingStars } from './RatingStars';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  DollarSign,
  Calendar
} from 'lucide-react';
import { formatCurrency, formatPhoneNumber } from '@/utils/formatters';

interface BusinessDetailsProps {
  business: Business;
  onBookNow?: () => void;
  showBookButton?: boolean;
}

export const BusinessDetails = ({
  business,
  onBookNow,
  showBookButton = true
}: BusinessDetailsProps) => {
  const openingHours = business.openingHours || '9:00 AM - 6:00 PM';
  const website = business.website || null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      {/* Hero Image */}
      {business.imageUrl && (
        <div className="relative h-72 bg-neutral-100">
          <img
            src={business.imageUrl}
            alt={business.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge
              variant={business.isActive ? 'success' : 'secondary'}
              size="lg"
            >
              {business.isActive ? 'Open' : 'Closed'}
            </Badge>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h1 className="text-h2 text-neutral-900 mb-2">{business.name}</h1>
              <div className="flex items-center gap-2">
                <RatingStars rating={business.averageRating || 0} size="lg" />
                <span className="text-sm text-neutral-600">
                  ({business.reviewCount || 0} reviews)
                </span>
              </div>
            </div>
            {showBookButton && onBookNow && (
              <Button
                onClick={onBookNow}
                leftIcon={<Calendar className="w-5 h-5" />}
                size="lg"
              >
                Book Now
              </Button>
            )}
          </div>

          {business.category && (
            <Badge variant="primary" size="lg">
              {business.category}
            </Badge>
          )}
        </div>

        {/* Description */}
        {business.description && (
          <div>
            <h3 className="text-h4 text-neutral-900 mb-2">About</h3>
            <p className="text-body text-neutral-700 leading-relaxed">
              {business.description}
            </p>
          </div>
        )}

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="text-h4 text-neutral-900">Contact Information</h3>

            {business.phone && (
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-neutral-900">Phone</p>
                  <a
                    href={`tel:${business.phone}`}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    {formatPhoneNumber(business.phone)}
                  </a>
                </div>
              </div>
            )}

            {business.email && (
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-neutral-900">Email</p>
                  <a
                    href={`mailto:${business.email}`}
                    className="text-sm text-primary-600 hover:text-primary-700 break-all"
                  >
                    {business.email}
                  </a>
                </div>
              </div>
            )}

            {website && (
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-neutral-900">Website</p>
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-700 break-all"
                  >
                    {website}
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-h4 text-neutral-900">Location & Hours</h3>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-neutral-900">Address</p>
                <p className="text-sm text-neutral-600">
                  {business.address}
                  {business.city && `, ${business.city}`}
                  {business.state && `, ${business.state}`}
                  {business.zipCode && ` ${business.zipCode}`}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-neutral-900">Hours</p>
                <p className="text-sm text-neutral-600">{openingHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        {business.services && business.services.length > 0 && (
          <div>
            <h3 className="text-h4 text-neutral-900 mb-4">Services Offered</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {business.services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200"
                >
                  <div>
                    <p className="font-medium text-neutral-900">{service.name}</p>
                    {service.description && (
                      <p className="text-sm text-neutral-600 mt-1">
                        {service.description}
                      </p>
                    )}
                    {service.duration && (
                      <p className="text-xs text-neutral-500 mt-1">
                        Duration: {service.duration} mins
                      </p>
                    )}
                  </div>
                  {service.price && (
                    <div className="flex items-center gap-1 text-primary-600 font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span>{formatCurrency(service.price)}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
