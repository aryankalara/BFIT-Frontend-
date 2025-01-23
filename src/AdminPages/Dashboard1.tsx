import React, { useState, useEffect } from 'react';
import { Users, UserCog, TrendingUp, Activity } from 'lucide-react';

// Component for individual stat cards
const StatCard = ({ icon: Icon, title, value, change }: any) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-black">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className="bg-red-100 p-3 rounded-full">
        <Icon className="text-red-600" size={24} />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      <TrendingUp className="text-green-500 mr-1" size={16} />
      <span className="text-green-500 text-sm">{change}% increase</span>
    </div>
  </div>
);

// Main dashboard component
const Dashboard1 = () => {
  const [stats, setStats] = useState<any>(null); // State for statistics
  const [recentActivity, setRecentActivity] = useState<any[]>([]); // State for recent activity

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('Fetching dashboard stats...');
        const response = await fetch('http://localhost:2025/admin/stats'); // Replace with your backend URL
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Dashboard data received:', data);
        setStats(data); // Set the received stats data
        setRecentActivity(data.recentActivity || []); // If recentActivity is part of the API response
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <p className="text-center text-black mt-10">Loading...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-black">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={Users}
          title="Total Users"
          value={stats.totalClients || 'N/A'} // Adjust key based on API response
          change={stats.totalUsersChange || '12'} // Placeholder value if not provided
        />
        <StatCard
          icon={UserCog}
          title="Total Nutritionists"
          value={stats.totalNutristionist || 'N/A'} // Adjust key based on API response
          change={stats.totalNutritionistsChange || '5'} // Placeholder value if not provided
        />
        <StatCard
          icon={Activity}
          title="Total Workouts"
          value={stats.totalWorkout || 'N/A'} // Adjust key based on API response
          change={stats.activeSessionsChange || '4'} // Placeholder value if not provided
        />
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Users className="text-red-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent activity.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;
