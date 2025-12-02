import { forwardRef, InputHTMLAttributes } from 'react';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="flex items-center space-x-3 cursor-pointer">
          <div className="relative">
            <input
              ref={ref}
              type="radio"
              className="sr-only peer"
              {...props}
            />
            <div className="w-5 h-5 border-2 border-neutral-300 rounded-full peer-checked:border-primary-500 peer-focus:ring-2 peer-focus:ring-primary-200 transition-all">
              <div className="w-3 h-3 bg-primary-500 rounded-full m-0.5 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
            </div>
          </div>
          {label && <span className="text-sm text-neutral-700">{label}</span>}
        </label>
        {error && <p className="error-text mt-1">{error}</p>}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
