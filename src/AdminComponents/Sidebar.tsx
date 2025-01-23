import { Home, Users, UserCog, LogOut, UserPlus,Salad } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };
  
  return (
    <div className="h-screen w-64 bg-black text-white flex flex-col fixed">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Nutrition Admin</h1>
      </div>
      
      <div className="flex-1 p-4">
        <Link
          to="/admin/admindashboard"
          className={`flex items-center space-x-3 p-3 rounded-lg mb-2 ${
            isActive('/admin') ? 'bg-red-700' : 'hover:bg-gray-800'
          }`}
        >
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
        
        <Link
          to="/admin/users"
          className={`flex items-center space-x-3 p-3 rounded-lg mb-2 ${
            isActive('/admin/users') ? 'bg-red-700' : 'hover:bg-gray-800'
          }`}
        >
          <Users size={20} />
          <span>Users</span>
        </Link>
        
        <Link
          to="/admin/nutritionists"
          className={`flex items-center space-x-3 p-3 rounded-lg mb-2 ${
            isActive('/admin/nutritionists') ? 'bg-red-700' : 'hover:bg-gray-800'
          }`}
        >
          <UserCog size={20} />
          <span>Nutritionists</span>
        </Link>

        <Link
          to="/admin/add-nutritionist"
          className={`flex items-center space-x-3 p-3 rounded-lg mb-2 ${
            isActive('/admin/add-nutritionist') ? 'bg-red-700' : 'hover:bg-gray-800'
          }`}
        >
          <UserPlus size={20} />
          <span>Add Nutritionist</span>
        </Link>

        <Link
          to="/admin/viewdietplans"
          className={`flex items-center space-x-3 p-3 rounded-lg mb-2 ${
            isActive('/admin/viewdietplans') ? 'bg-red-700' : 'hover:bg-gray-800'
          }`}
        >
          <Salad size={20} />
          <span>View Diet Plans</span>
        </Link>
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 p-3 rounded-lg w-full hover:bg-gray-800"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar1;