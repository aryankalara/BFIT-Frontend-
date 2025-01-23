import { LayoutDashboard, Utensils, Users, UserCircle, LogOut } from 'lucide-react';
import { GrResources } from 'react-icons/gr';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/nutritionist', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/nutritionist/diet-plans', icon: Utensils, label: 'Add Diet Plans' },
    { path: '/nutritionist/add-resource', icon: GrResources, label: 'Add Resource' },
    { path: '/nutritionist/users', icon: Users, label: 'View Users' },
    { path: '/nutritionist/profile', icon: UserCircle, label: 'Profile' },
  ];

  const handleLogout = () => {
    console.log('Logout clicked');
    navigate('/'); // Navigate to the root path
  };

  return (
    <div className="h-screen w-64 bg-black text-white fixed left-0 top-0 transition-all duration-300">
      <div className="p-6 border-b border-red-800">
        <h1 className="text-2xl font-bold text-red-500">NutriTrack</h1>
      </div>
      
      <div className="mt-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-300 hover:bg-red-900 hover:text-white transition-colors duration-200
                ${isActive ? 'bg-red-800 text-white' : ''}`}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        
        <button 
          className="flex items-center px-6 py-3 text-gray-300 hover:bg-red-900 hover:text-white transition-colors duration-200 w-full mt-auto"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
