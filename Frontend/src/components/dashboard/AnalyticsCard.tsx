import { ReactNode } from 'react';
import { Skeleton } from '../common/Skeleton';

interface AnalyticsCardProps {
  title: string;
  metrics: Array<{
    label: string;
    value: string | number;
    trend?: {
      value: number;
      isPositive: boolean;
    };
  }>;
  icon?: ReactNode;
  loading?: boolean;
  footer?: ReactNode;
}

export const AnalyticsCard = ({
  title,
  metrics,
  icon,
  loading = false,
  footer
}: AnalyticsCardProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <Skeleton variant="text" className="h-6 w-1/3 mb-6" />
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index}>
              <Skeleton variant="text" className="h-4 w-1/2 mb-2" />
              <Skeleton variant="text" className="h-8 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-h4 text-neutral-900">{title}</h3>
          {icon && (
            <div className="p-2 rounded-lg bg-primary-50 text-primary-600">
              {icon}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {metrics.map((metric, index) => (
            <div key={index}>
              <p className="text-sm text-neutral-600 mb-2">{metric.label}</p>
              <div className="flex items-end gap-3">
                <p className="text-2xl font-bold text-neutral-900">
                  {metric.value}
                </p>
                {metric.trend && (
                  <div
                    className={`flex items-center gap-1 text-sm font-medium pb-1 ${
                      metric.trend.isPositive
                        ? 'text-success-600'
                        : 'text-error-600'
                    }`}
                  >
                    <span>
                      {metric.trend.value > 0 ? '+' : ''}
                      {metric.trend.value}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {footer && (
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
          {footer}
        </div>
      )}
    </div>
  );
};
