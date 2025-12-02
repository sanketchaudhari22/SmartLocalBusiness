import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}: BadgeProps) => {
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-700 border-primary-200',
    secondary: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    success: 'bg-success-100 text-success-700 border-success-200',
    error: 'bg-error-100 text-error-700 border-error-200',
    warning: 'bg-warning-100 text-warning-700 border-warning-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
    default: 'bg-neutral-100 text-neutral-700 border-neutral-200'
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};
