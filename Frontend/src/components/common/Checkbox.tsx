import { forwardRef, InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="flex items-center space-x-3 cursor-pointer">
          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              className="sr-only peer"
              {...props}
            />
            <div className="w-5 h-5 border-2 border-neutral-300 rounded peer-checked:border-primary-500 peer-checked:bg-primary-500 peer-focus:ring-2 peer-focus:ring-primary-200 transition-all">
              <Check className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100" />
            </div>
          </div>
          {label && <span className="text-sm text-neutral-700">{label}</span>}
        </label>
        {error && <p className="error-text mt-1">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
