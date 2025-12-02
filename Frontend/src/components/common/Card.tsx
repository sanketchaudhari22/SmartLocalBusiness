import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'hover' | 'bordered';
  className?: string;
  onClick?: () => void;
}

export const Card = ({
  children,
  variant = 'default',
  className = '',
  onClick,
}: CardProps) => {
  const variants = {
    default: 'card',
    hover: 'card-hover cursor-pointer',
    bordered: 'card-bordered',
  };

  return (
    <div className={`${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
