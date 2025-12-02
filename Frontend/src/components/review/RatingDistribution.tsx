import { Star } from 'lucide-react';

interface RatingDistributionProps {
  ratings: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  totalReviews: number;
  averageRating: number;
}

export const RatingDistribution = ({
  ratings,
  totalReviews,
  averageRating
}: RatingDistributionProps) => {
  const getPercentage = (count: number): number => {
    if (totalReviews === 0) return 0;
    return (count / totalReviews) * 100;
  };

  const ratingLevels = [5, 4, 3, 2, 1] as const;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <h3 className="text-h4 text-neutral-900 mb-6">Customer Reviews</h3>

      {/* Average Rating */}
      <div className="flex items-center gap-6 pb-6 border-b border-neutral-200">
        <div className="text-center">
          <div className="text-5xl font-bold text-neutral-900 mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center gap-1 mb-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-5 h-5 ${
                  index < Math.round(averageRating)
                    ? 'fill-warning text-warning'
                    : 'text-neutral-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-neutral-600">
            {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        <div className="flex-1 space-y-2">
          {ratingLevels.map((level) => {
            const count = ratings[level] || 0;
            const percentage = getPercentage(count);

            return (
              <div key={level} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm font-medium text-neutral-700">
                    {level}
                  </span>
                  <Star className="w-3 h-3 fill-warning text-warning" />
                </div>

                <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warning transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="text-sm text-neutral-600 w-12 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rating breakdown summary */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-success-50 rounded-lg p-4 border border-success-200">
          <div className="flex items-center gap-2 text-success-700 mb-1">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">Positive</span>
          </div>
          <div className="text-2xl font-bold text-success-900">
            {getPercentage((ratings[5] || 0) + (ratings[4] || 0)).toFixed(0)}%
          </div>
          <p className="text-xs text-success-600 mt-1">
            4-5 star ratings
          </p>
        </div>

        <div className="bg-error-50 rounded-lg p-4 border border-error-200">
          <div className="flex items-center gap-2 text-error-700 mb-1">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">Critical</span>
          </div>
          <div className="text-2xl font-bold text-error-900">
            {getPercentage((ratings[1] || 0) + (ratings[2] || 0)).toFixed(0)}%
          </div>
          <p className="text-xs text-error-600 mt-1">
            1-2 star ratings
          </p>
        </div>
      </div>
    </div>
  );
};
