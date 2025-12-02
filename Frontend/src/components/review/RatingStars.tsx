import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export const RatingStars = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange
}: RatingStarsProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleClick = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= Math.floor(rating);
        const isHalfFilled = starValue === Math.ceil(rating) && rating % 1 !== 0;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(starValue)}
            disabled={!interactive}
            className={`${
              interactive
                ? 'cursor-pointer hover:scale-110 transition-transform'
                : 'cursor-default'
            }`}
          >
            {isHalfFilled ? (
              <div className="relative">
                <Star className={`${sizeClasses[size]} text-neutral-300`} />
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star
                    className={`${sizeClasses[size]} text-yellow-400 fill-yellow-400`}
                  />
                </div>
              </div>
            ) : (
              <Star
                className={`${sizeClasses[size]} ${
                  isFilled
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-neutral-300'
                }`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
