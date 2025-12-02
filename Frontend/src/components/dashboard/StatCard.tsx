import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  color?: 'primary' | 'success' | 'warning' | 'error' | 'secondary';
}

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  description,
  color = 'primary'
}: StatCardProps) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    error: 'bg-error-50 text-error-600',
    secondary: 'bg-neutral-50 text-neutral-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-neutral-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-neutral-900 mb-3">{value}</p>

          {trend && (
            <div className="flex items-center gap-2">
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4 text-success-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-error-600" />
              )}
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-success-600' : 'text-error-600'
                }`}
              >
                {trend.value > 0 ? '+' : ''}
                {trend.value}%
              </span>
              {description && (
                <span className="text-sm text-neutral-500">{description}</span>
              )}
            </div>
          )}

          {!trend && description && (
            <p className="text-sm text-neutral-500">{description}</p>
          )}
        </div>

        {icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
