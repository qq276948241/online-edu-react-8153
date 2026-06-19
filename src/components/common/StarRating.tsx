import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

export default function StarRating({ rating, size = 'md', showValue = false, className = '' }: StarRatingProps) {
  const sizeMap = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };
  const textMap = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const fill = rating >= star ? 1 : rating >= star - 0.5 ? 0.5 : 0;
          return (
            <div key={star} className="relative">
              <Star
                className={`${sizeMap[size]} text-navy-700/15`}
                strokeWidth={1.5}
              />
              {fill > 0 && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fill * 100}%` }}
                >
                  <Star
                    className={`${sizeMap[size]} text-accent-gold fill-accent-gold`}
                    strokeWidth={0}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showValue && (
        <span className={`${textMap[size]} font-semibold text-navy-900 ml-0.5`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
