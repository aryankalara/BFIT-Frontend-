import React from 'react';
import { Calendar, MapPin, Activity } from 'lucide-react';

interface PersonalDetailsProps {
  formData: {
    dob: string;
    location: string;
    activity_level: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function PersonalDetails({ formData, handleChange }: PersonalDetailsProps) {
  return (
    <div className="space-y-6 w-full max-w-md">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Details</h2>
        <p className="text-gray-600">Tell us more about your lifestyle</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"            required
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"            placeholder="Your location"
            required
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <select
            name="activity_level"
            value={formData.activity_level}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"            required
          >
            <option value="">Select activity level</option>
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Lightly active (light exercise 1-3 days/week)</option>
            <option value="moderate">Moderately active (moderate exercise 3-5 days/week)</option>
            <option value="very">Very active (hard exercise 6-7 days/week)</option>
            <option value="extra">Extra active (very hard exercise & physical job)</option>
          </select>
        </div>
      </div>
    </div>
  );
}