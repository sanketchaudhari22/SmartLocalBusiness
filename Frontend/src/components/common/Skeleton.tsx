interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  count?: number;
}

export const Skeleton = ({
  className = '',
  variant = 'text',
  width,
  height,
  count = 1
}: SkeletonProps) => {
  const baseClasses = 'animate-pulse bg-neutral-200';

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  const skeletonStyle = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined
  };

  const items = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={skeletonStyle}
    />
  ));

  return count > 1 ? <div className="space-y-3">{items}</div> : items[0];
};
