import React from 'react';
import { cn } from '@/utils/utils';
import { Check } from 'lucide-react';

interface StepVerificationProps {
  steps: string[];
  className?: string;
  totalSteps: number;
  currentStep: number;
  component: React.ReactNode | ((children?: React.ReactNode) => React.ReactNode);
  children?: React.ReactNode;
}

export const Stepper: React.FC<StepVerificationProps> = ({
  currentStep,
  steps,
  component,
  className,
  children,
}) => {
  const renderedComponent = typeof component === 'function' ? component(children) : component;
  return (
    <div className={cn('flex flex-col', className)}>
      {/* Stepper Component */}
      <div className="flex flex-wrap justify-between items-center w-full gap-y-4">
        <div className="flex items-center bg-foreground-white border border-border-grey rounded-full overflow-hidden">
          {steps.map((stepLabel, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <div
                key={stepNumber}
                className={cn(
                  'relative flex items-center gap-2 sm:gap-3 px-2 sm:px-4 md:px-4 py-3 sm:py-4 flex-1 transition-all duration-200',
                  index === 0 ? 'rounded-l-full' : 'md:px-8',
                  index === steps.length - 1 ? 'rounded-r-full' : 'border-r border-border-grey',
                  index !== 0 && '-ml-[1px] '
                )}
              >
                <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 w-full">
                  {/* Step Circle */}
                  <div
                    className={cn(
                      'flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex-shrink-0 transition-colors',
                      isCompleted
                        ? 'bg-primary border-primary'
                        : isActive
                          ? 'bg-white border-primary'
                          : 'bg-white border-border-grey'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    ) : (
                      <span
                        className={cn(
                          'text-xs sm:text-sm md:text-base font-medium',
                          isActive ? 'text-primary' : 'text-mute-foreground'
                        )}
                      >
                        {String(stepNumber).padStart(2, '0')}
                      </span>
                    )}
                  </div>

                  {/* Step Label - Hidden on small screens */}
                  <span
                    className={cn(
                      'hidden sm:inline text-sm md:text-base px-2 font-medium whitespace-nowrap',
                      isActive || isCompleted ? 'text-primary' : 'text-mute-foreground'
                    )}
                  >
                    {stepLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div>{children}</div>
      </div>

      <div className="mt-4">{renderedComponent}</div>
    </div>
  );
};
