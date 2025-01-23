import React, { useEffect, useState } from 'react';
import { Save, User as UserIcon } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const navigate = useNavigate();
  // const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    goals: ['Weight Loss', 'Muscle Gain', 'Better Sleep'],
    barriers: ['Limited Time', 'Work Schedule'],
    activity_level: 'moderate',
    height: 165,
    actual_weight: 65,
    goal_weight: 60,
    gender: 'female',
    dob: '1990-06-15',
    location: 'San Francisco, CA'
  });

  // const [UserData,setUserData] = useState(null);
  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setFormData(parsedUserData)
    }
  }, []);


  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
    { value: 'light', label: 'Light (exercise 1-3 times/week)' },
    { value: 'moderate', label: 'Moderate (exercise 3-5 times/week)' },
    { value: 'active', label: 'Active (exercise 6-7 times/week)' },
    { value: 'very_active', label: 'Very Active (intense exercise daily)' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name } = e.target;
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, [name]: values }));
  };



  const handleSubmit = async (e) => 
    {
        e.preventDefault(); // to avoid page reloading
        try
        {
          const response = await axios.put('http://localhost:2025/user/updateuser', formData);
          navigate("/login")
          if (response.status === 200) 
            {
                // setMessage(response.data);
                // setFormData({
                //   name: '',
                //   email: '',
                //   goals: ['Weight Loss', 'Muscle Gain', 'Better Sleep'],
                //   barriers: ['Limited Time', 'Work Schedule'],
                //   activity_level: 'moderate',
                //   height: 165,
                //   actual_weight: 65,
                //   goal_weight: 60,
                //   gender: 'female',
                //   dob: '1990-06-15',
                //   location: 'San Francisco, CA'
                // });
                
                localStorage.setItem("user",JSON.stringify(response.data))
                

            }
        } 
        catch (error) 
        {
            console.log(error); // for debugging purpose
            // setMessage(error);
        }
    };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black to-red-950">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-red-500 rounded-full">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
            <p className="text-gray-400">Manage your personal information and preferences</p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information Section */}
            <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
              <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-red-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="w-full bg-black/30 border border-red-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-red-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-red-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Physical Information Section */}
            <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
              <h2 className="text-xl font-semibold text-white mb-4">Physical Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                 
                  <input
                    name="gender"
                    value={formData.gender}
                    className="w-full bg-black/30 border border-red-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-red-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Current Weight (kg)</label>
                    <input
                      type="number"
                      name="actual_weight"
                      value={formData.actual_weight}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-red-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Goal Weight (kg)</label>
                    <input
                      type="number"
                      name="goal_weight"
                      value={formData.goal_weight}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-red-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fitness Goals Section */}
          <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
            <h2 className="text-xl font-semibold text-white mb-4">Fitness Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Activity Level</label>
                <select
                  name="activity_level"
                  value={formData.activity_level}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-red-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {activityLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Fitness Goals</label>
                <select
                  multiple
                  name="goals"
                  value={formData.goals}
                  onChange={handleMultiSelect}
                  className="w-full bg-black/30 border border-red-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
                >
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Better Sleep">Better Sleep</option>
                  <option value="Increased Energy">Increased Energy</option>
                  <option value="Stress Reduction">Stress Reduction</option>
                  <option value="Improved Flexibility">Improved Flexibility</option>
                </select>
                <p className="text-sm text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple goals</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Barriers to Exercise</label>
                <select
                  multiple
                  name="barriers"
                  value={formData.barriers}
                  onChange={handleMultiSelect}
                  className="w-full bg-black/30 border border-red-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
                >
                  <option value="Limited Time">Limited Time</option>
                  <option value="Work Schedule">Work Schedule</option>
                  <option value="Lack of Motivation">Lack of Motivation</option>
                  <option value="Physical Limitations">Physical Limitations</option>
                  <option value="Facility Access">Facility Access</option>
                  <option value="Energy Levels">Energy Levels</option>
                </select>
                <p className="text-sm text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple barriers</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              // onClick={logout}
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;