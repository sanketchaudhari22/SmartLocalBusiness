import { Check } from 'lucide-react';

interface Step {
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={index} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    isCompleted
                      ? 'bg-primary-500 text-white'
                      : isCurrent
                      ? 'bg-primary-500 text-white ring-4 ring-primary-100'
                      : 'bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    stepNumber
                  )}
                </div>

                <div className="mt-2 text-center">
                  <p
                    className={`text-sm font-medium ${
                      isCurrent || isCompleted
                        ? 'text-neutral-900'
                        : 'text-neutral-500'
                    }`}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-neutral-500 mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 transition-all ${
                    isCompleted ? 'bg-primary-500' : 'bg-neutral-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
