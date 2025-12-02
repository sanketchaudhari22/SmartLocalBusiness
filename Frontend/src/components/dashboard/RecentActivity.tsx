import { ReactNode } from 'react';
import { formatDistanceToNow } from '@/utils/formatters';
import { Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'booking' | 'review' | 'business' | 'user' | 'other';
  title: string;
  description: string;
  timestamp: Date | string;
  icon?: ReactNode;
  link?: string;
}

interface RecentActivityProps {
  activities: Activity[];
  maxItems?: number;
  onViewAll?: () => void;
}

export const RecentActivity = ({
  activities,
  maxItems = 5,
  onViewAll
}: RecentActivityProps) => {
  const displayedActivities = activities.slice(0, maxItems);

  const getActivityIcon = (activity: Activity) => {
    if (activity.icon) return activity.icon;

    // Default icons based on type
    return <Clock className="w-4 h-4" />;
  };

  const getActivityColor = (type: Activity['type']) => {
    const colors = {
      booking: 'bg-primary-50 text-primary-600',
      review: 'bg-warning-50 text-warning-600',
      business: 'bg-success-50 text-success-600',
      user: 'bg-secondary-50 text-secondary-600',
      other: 'bg-neutral-50 text-neutral-600'
    };
    return colors[type];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-h4 text-neutral-900">Recent Activity</h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View All
          </button>
        )}
      </div>

      {displayedActivities.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <p className="text-neutral-600">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity)}
              </div>

              <div className="flex-1 min-w-0">
                {activity.link ? (
                  <a
                    href={activity.link}
                    className="font-medium text-neutral-900 hover:text-primary-600 block mb-1"
                  >
                    {activity.title}
                  </a>
                ) : (
                  <p className="font-medium text-neutral-900 mb-1">
                    {activity.title}
                  </p>
                )}
                <p className="text-sm text-neutral-600 mb-2">
                  {activity.description}
                </p>
                <p className="text-xs text-neutral-500">
                  {formatDistanceToNow(new Date(activity.timestamp))}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
