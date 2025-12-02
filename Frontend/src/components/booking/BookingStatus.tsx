import { Badge } from '../common/Badge';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

type BookingStatusType = 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';

interface BookingStatusProps {
  status: BookingStatusType;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const BookingStatus = ({
  status,
  size = 'md',
  showIcon = true
}: BookingStatusProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'Confirmed':
        return {
          variant: 'success' as const,
          icon: <CheckCircle className="w-4 h-4" />,
          label: 'Confirmed'
        };
      case 'Pending':
        return {
          variant: 'warning' as const,
          icon: <Clock className="w-4 h-4" />,
          label: 'Pending'
        };
      case 'Cancelled':
        return {
          variant: 'error' as const,
          icon: <XCircle className="w-4 h-4" />,
          label: 'Cancelled'
        };
      case 'Completed':
        return {
          variant: 'secondary' as const,
          icon: <CheckCircle className="w-4 h-4" />,
          label: 'Completed'
        };
      default:
        return {
          variant: 'secondary' as const,
          icon: <AlertCircle className="w-4 h-4" />,
          label: status
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge variant={config.variant} size={size}>
      <div className="flex items-center gap-1.5">
        {showIcon && config.icon}
        <span>{config.label}</span>
      </div>
    </Badge>
  );
};
