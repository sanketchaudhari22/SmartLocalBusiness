import { Booking } from '@/types';
import { BookingCard } from './BookingCard';
import { EmptyState } from '../shared/EmptyState';
import { Skeleton } from '../common/Skeleton';
import { Calendar } from 'lucide-react';

interface BookingListProps {
  bookings: Booking[];
  loading?: boolean;
  error?: string | null;
  onCancelBooking?: (bookingId: string) => Promise<void>;
  onViewDetails?: (booking: Booking) => void;
  emptyMessage?: string;
  emptyDescription?: string;
}

export const BookingList = ({
  bookings,
  loading = false,
  error = null,
  onCancelBooking,
  onViewDetails,
  emptyMessage = 'No bookings found',
  emptyDescription = 'You haven\'t made any bookings yet'
}: BookingListProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <Skeleton variant="text" className="h-6 w-1/3" />
                <Skeleton variant="text" className="h-4 w-1/2" />
                <Skeleton variant="text" className="h-4 w-2/3" />
              </div>
              <Skeleton variant="rectangular" className="h-8 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-50 border border-error-200 rounded-lg p-4">
        <p className="text-error-700 text-sm">{error}</p>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <EmptyState
        icon={<Calendar className="w-12 h-12" />}
        title={emptyMessage}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onCancel={onCancelBooking}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};
