import type { ReactNode } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface AlertProps {
  children: ReactNode;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose?: () => void;
  className?: string;
}

export const Alert = ({
  children,
  type = 'info',
  onClose,
  className = '',
}: AlertProps) => {
  const styles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
  };

  return (
    <div
      className={`flex items-start p-4 rounded-lg border ${styles[type]} ${className}`}
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <div className="ml-3 flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-4 hover:opacity-70"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
