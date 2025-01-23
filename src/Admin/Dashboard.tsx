import React, { useState } from 'react';
import { User } from 'lucide-react';

export function Dashboard() {
  const [formData, setFormData] = useState({
    fullName: 'Aryan kalara',
    email: 'aryankalara08@gmail.com',
    location: 'vijayawada',
    gender: 'male',
    height: '170',
    currentWeight: '60',
    goalWeight: '55',
    activityLevel: 'Light (exercise 1-3 times/week)',
    fitnessGoals: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);
  };

  return (
    <main className="p-6 bg-gradient-to-br from-neutral-900 to-black min-h-[calc(100vh-4rem)]">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-red-600 rounded-full">
            <User size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
            <p className="text-gray-400">Manage your personal information and preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-red-900/20 to-black/40 rounded-xl shadow-2xl p-6 border border-red-900/20">
            <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-red-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-red-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-red-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/20 to-black/40 rounded-xl shadow-2xl p-6 border border-red-900/20">
            <h2 className="text-xl font-semibold text-white mb-4">Physical Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Gender</label>
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-red-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Height (cm)</label>
                <input 
                  type="number" 
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-red-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Current Weight (kg)</label>
                  <input 
                    type="number" 
                    name="currentWeight"
                    value={formData.currentWeight}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-red-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Goal Weight (kg)</label>
                  <input 
                    type="number" 
                    name="goalWeight"
                    value={formData.goalWeight}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-red-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/20 to-black/40 rounded-xl shadow-2xl p-6 border border-red-900/20 lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4">Fitness Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Activity Level</label>
                <select 
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-red-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                >
                  <option>Light (exercise 1-3 times/week)</option>
                  <option>Moderate (exercise 3-5 times/week)</option>
                  <option>Active (exercise 6-7 times/week)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Fitness Goals</label>
                <textarea 
                  name="fitnessGoals"
                  value={formData.fitnessGoals}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-red-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 h-24"
                  placeholder="Enter your fitness goals..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}