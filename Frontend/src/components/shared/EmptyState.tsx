import { ReactNode } from 'react';
import { Button } from '@/components/common/Button';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {icon && <div className="text-6xl mb-4">{icon}</div>}
      <h3 className="text-h3 text-neutral-900 mb-2">{title}</h3>
      <p className="text-body text-neutral-600 text-center max-w-md mb-6">
        {description}
      </p>
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};
