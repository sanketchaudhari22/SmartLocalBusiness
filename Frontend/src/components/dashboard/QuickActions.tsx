import { ReactNode } from 'react';
import { Button } from '../common/Button';

interface QuickAction {
  id: string;
  label: string;
  icon: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  disabled?: boolean;
}

interface QuickActionsProps {
  actions: QuickAction[];
  columns?: 2 | 3 | 4;
}

export const QuickActions = ({ actions, columns = 3 }: QuickActionsProps) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <h3 className="text-h4 text-neutral-900 mb-6">Quick Actions</h3>

      <div className={`grid ${gridCols[columns]} gap-4`}>
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant || 'outline'}
            onClick={action.onClick}
            disabled={action.disabled}
            leftIcon={action.icon}
            className="h-auto py-4 justify-start"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
