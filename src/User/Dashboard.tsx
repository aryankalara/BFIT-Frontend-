import { Apple, Droplet, Flame, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      try {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
          // If user data is present in localStorage, parse it
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
        } else {
          // Validate session with the backend
          const response = await fetch('/user/checksession', {
            method: 'GET',
            credentials: 'include', // Ensure cookies are sent with the request
          });

          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            // If the session is invalid, redirect to login
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Error validating session:', error);
        navigate('/login'); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    navigate('/login');
    return null;
  }


  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-black to-red-950 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome back, {userData.name}!</h1>
          <p className="text-gray-400">Here's your nutrition summary for today</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[{ icon: Flame, label: 'Calories', value: '1,200', target: '2,000', color: 'text-orange-500' },
            { icon: Apple, label: 'Proteins', value: '60g', target: '80g', color: 'text-green-500' },
            { icon: Timer, label: 'Carbs', value: '130g', target: '200g', color: 'text-blue-500' },
            { icon: Droplet, label: 'Water', value: '1.5L', target: '2.5L', color: 'text-cyan-500' },
          ].map((stat, index) => (
            <div key={index} className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-2 rounded-lg ${stat.color} bg-white/10`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-lg font-medium text-white">{stat.label}</span>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">Target: {stat.target}</div>
                <div className="w-full bg-black/50 rounded-full h-2">
                  <div className={`${stat.color} h-2 rounded-full`} style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          ))}

        </div>
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
            <h2 className="text-xl font-bold text-white mb-4">Today's Meals</h2>
            <div className="space-y-4">
              {[{ time: 'Breakfast', meal: 'Oatmeal with berries', calories: 320 },
                { time: 'Lunch', meal: 'Grilled chicken salad', calories: 420 },
                { time: 'Snack', meal: 'Greek yogurt with honey', calories: 180 },
                { time: 'Dinner', meal: 'Salmon with quinoa', calories: 450 },
              ].map((meal, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-400">{meal.time}</p>
                    <p className="text-white">{meal.meal}</p>
                  </div>
                  <div className="text-red-400">{meal.calories} kcal</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
            <h2 className="text-xl font-bold text-white mb-4">Nutrition Tips</h2>
            <div className="space-y-4">
              {[
                "Stay hydrated! Aim to drink water throughout the day",
                "Include protein in every meal to maintain muscle mass",
                "Eat colorful vegetables for varied nutrients",
                "Avoid processed foods and added sugars"
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                  <div className="p-1 bg-red-500 rounded-full mt-1">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <p className="text-gray-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
