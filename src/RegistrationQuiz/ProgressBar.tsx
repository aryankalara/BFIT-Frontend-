import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="relative">
        {/* Progress bar background */}
        <div className="h-2 bg-gray-200 rounded-full" />
        
        {/* Active progress */}
        <div
          className="absolute top-0 h-2 bg-red-600 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
        
        {/* Step indicators */}
        <div className="absolute top-0 left-0 w-full flex justify-between transform -translate-y-1/2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                index < currentStep
                  ? 'bg-red-600 text-white'
                  : index === currentStep
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-xs">{index + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}