import React from 'react';
import { Ruler, Weight, UserCircle2 } from 'lucide-react';

interface PhysicalInfoProps {
  formData: {
    height: string;
    actual_weight: string;
    goal_weight: string;
    gender: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function PhysicalInfo({ formData, handleChange }: PhysicalInfoProps) {
  return (
    <div className="space-y-6 w-full max-w-md">
      <div>
        <h2 className="text-2xl font-bold text-black mb-2">Physical Details</h2>
        <p className="text-black">Help us understand your physical characteristics</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Ruler className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
           className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            placeholder="Height (cm)"
            required
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Weight className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            name="actual_weight"
            value={formData.actual_weight}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"            placeholder="Current weight (kg)"
            required
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Weight className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            name="goal_weight"
            value={formData.goal_weight}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"            placeholder="Goal weight (kg)"
            required
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserCircle2 className="h-5 w-5 text-gray-400" />
          </div>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}
