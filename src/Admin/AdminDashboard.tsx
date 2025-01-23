import React, { useState, useEffect } from 'react';
import { Users, ClipboardList, FileText, Activity } from 'lucide-react';

export function AdminDashboard() {
  const [stats, setStats] = useState([]); // Initialize with an empty array

  useEffect(() => {
    // Fetch statistics from the backend
    fetch('http://localhost:2025/admin/stats')
      .then((response) => response.json())
      .then((data) => {
        setStats([
          { icon: <Users size={24} />, label: 'Total Clients', value: data.totalClients || 'N/A' },
          { icon: <ClipboardList size={24} />, label: 'Active Diet Plans', value: data.activeDietPlans || 'N/A' },
          { icon: <FileText size={24} />, label: 'Total Plans Created', value: data.totalPlansCreated || 'N/A' },
          { icon: <Activity size={24} />, label: 'Success Rate', value: `${data.successRate || 'N/A'}%` },
        ]);
      })
      .catch((error) => console.error('Error fetching stats:', error));
  }, []);

  return (
    <main className="p-6 bg-gradient-to-br from-neutral-900 to-black min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.length === 0 ? (
            <p className="text-center text-white col-span-4">Loading statistics...</p>
          ) : (
            stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-red-900/20 to-black/40 rounded-xl p-6 border border-red-900/20 shadow-2xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-red-600 rounded-full text-white">{stat.icon}</div>
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
