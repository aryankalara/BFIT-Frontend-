import React from 'react';
import { Target, AlertCircle } from 'lucide-react';

interface GoalsBarriersProps {
  formData: {
    goals: string[];
    barriers: string[];
  };
  handleMultiSelect: (field: 'goals' | 'barriers', value: string) => void;
}

export default function GoalsBarriers({ formData, handleMultiSelect }: GoalsBarriersProps) {
  const goalOptions = [
    'Weight Loss',
    'Muscle Gain',
    'Better Health',
    'Increased Energy',
    'Improved Fitness',
    'Better Sleep',
  ];

  const barrierOptions = [
    'Lack of Time',
    'Low Motivation',
    'Limited Knowledge',
    'Physical Limitations',
    'Stress',
    'Work Schedule',
  ];

  return (
    <div className="space-y-6 w-full max-w-md">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Goals & Challenges</h2>
        <p className="text-gray-600">Select what matters to you</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-lg font-medium text-gray-700 mb-3">
            <Target className="h-5 w-5" />
            Your Goals
          </label>
          <div className="grid grid-cols-2 gap-2">
            {goalOptions.map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => handleMultiSelect('goals', goal)}
                className={`p-2 rounded-lg text-sm text-left transition-colors ${
                  formData.goals.includes(goal)
                    ? 'bg-green-100 text-green-700 border-2 border-green-500'
                    : 'bg-yellow-100 text-yellow-700 border-2 border-transparent hover:bg-yellow-200'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-lg font-medium text-gray-700 mb-3">
            <AlertCircle className="h-5 w-5" />
            Your Challenges
          </label>
          <div className="grid grid-cols-2 gap-2">
            {barrierOptions.map((barrier) => (
              <button
                key={barrier}
                type="button"
                onClick={() => handleMultiSelect('barriers', barrier)}
                className={`p-2 rounded-lg text-sm text-left transition-colors ${
                  formData.barriers.includes(barrier)
                    ? 'bg-red-100 text-red-700 border-2 border-red-500'
                    : 'bg-blue-100 text-blue-700 border-2 border-transparent hover:bg-blue-200'
                }`}
              >
                {barrier}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
