import { ReactNode } from 'react';
import { TrendingUp } from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  title: string;
  data: ChartData[];
  type?: 'bar' | 'line';
  height?: number;
  icon?: ReactNode;
}

export const Chart = ({
  title,
  data,
  type = 'bar',
  height = 300,
  icon
}: ChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-h4 text-neutral-900">{title}</h3>
        {icon && (
          <div className="p-2 rounded-lg bg-primary-50 text-primary-600">
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-4" style={{ height }}>
        {type === 'bar' && (
          <div className="h-full flex items-end justify-between gap-2">
            {data.map((item, index) => {
              const heightPercentage = (item.value / maxValue) * 100;
              const color = item.color || '#3b82f6';

              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="relative w-full flex flex-col items-center">
                    <span className="text-xs font-medium text-neutral-600 mb-1">
                      {item.value}
                    </span>
                    <div
                      className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80"
                      style={{
                        height: `${heightPercentage}%`,
                        backgroundColor: color,
                        minHeight: item.value > 0 ? '20px' : '0'
                      }}
                    />
                  </div>
                  <span className="text-xs text-neutral-600 text-center">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {type === 'line' && (
          <div className="h-full relative">
            <svg
              width="100%"
              height="100%"
              className="overflow-visible"
              viewBox={`0 0 ${data.length * 100} ${height}`}
              preserveAspectRatio="none"
            >
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                points={data
                  .map((item, index) => {
                    const x = (index / (data.length - 1)) * (data.length * 100);
                    const y = height - (item.value / maxValue) * height;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />
              {data.map((item, index) => {
                const x = (index / (data.length - 1)) * (data.length * 100);
                const y = height - (item.value / maxValue) * height;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="5"
                    fill="#3b82f6"
                    className="hover:r-7 transition-all"
                  />
                );
              })}
            </svg>
            <div className="flex justify-between mt-4">
              {data.map((item, index) => (
                <span key={index} className="text-xs text-neutral-600">
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
