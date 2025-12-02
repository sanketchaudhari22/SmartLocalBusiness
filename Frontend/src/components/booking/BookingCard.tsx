import { BookingDto } from '@/types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Calendar, Clock, MapPin, X } from 'lucide-react';
import { format } from 'date-fns';

interface BookingCardProps {
  booking: BookingDto;
  onCancel?: (bookingId: number) => void;
  onView?: (bookingId: number) => void;
  isCancelling?: boolean;
}

export const BookingCard = ({
  booking,
  onCancel,
  onView,
  isCancelling
}: BookingCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <span className="badge-success">Confirmed</span>;
      case 'pending':
        return <span className="badge-pending">Pending</span>;
      case 'cancelled':
        return <span className="badge-error">Cancelled</span>;
      case 'completed':
        return <span className="badge-info">Completed</span>;
      default:
        return <span className="badge-info">{status}</span>;
    }
  };

  const canCancel = booking.status.toLowerCase() === 'confirmed' ||
                    booking.status.toLowerCase() === 'pending';

  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-h4 mb-1">{booking.businessName}</h3>
          {booking.serviceName && (
            <p className="text-sm text-neutral-600">{booking.serviceName}</p>
          )}
        </div>
        {getStatusBadge(booking.status)}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-neutral-700">
          <Calendar className="w-4 h-4 mr-2 text-primary-500" />
          {format(new Date(booking.bookingDate), 'EEEE, MMMM dd, yyyy')}
        </div>

        {booking.bookingTime && (
          <div className="flex items-center text-sm text-neutral-700">
            <Clock className="w-4 h-4 mr-2 text-primary-500" />
            {booking.bookingTime}
          </div>
        )}

        {booking.businessCity && (
          <div className="flex items-center text-sm text-neutral-700">
            <MapPin className="w-4 h-4 mr-2 text-primary-500" />
            {booking.businessCity}
          </div>
        )}
      </div>

      {booking.notes && (
        <div className="bg-neutral-50 p-3 rounded-lg mb-4">
          <p className="text-sm text-neutral-700">
            <strong>Notes:</strong> {booking.notes}
          </p>
        </div>
      )}

      <div className="flex gap-2 pt-4 border-t border-neutral-200">
        {onView && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onView(booking.bookingId)}
            className="flex-1"
          >
            View Details
          </Button>
        )}
        {canCancel && onCancel && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onCancel(booking.bookingId)}
            isLoading={isCancelling}
            className="flex-1"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
        )}
      </div>
    </Card>
  );
};
