import { Home, Users, ClipboardList, FileText, LogOut, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: <Home size={20} />, text: 'Home', path: '/admin-dashboard' },
  { icon: <Home size={20} />, text: 'Add Nutritionist', path: '/addnutritionist' },
  { icon: <Users size={20} />, text: 'Clients', path: '/clients' },
  { icon: <ClipboardList size={20} />, text: 'Add Diet Plan', path: '/add-diet' },
  { icon: <FileText size={20} />, text: 'View Diet Plans', path: '/view-diets' },
];

export function AdminSidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside 
      className={`
        fixed lg:sticky top-0 left-0 h-screen
        w-[280px] min-w-[280px]
        bg-gradient-to-b from-red-900 to-black
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        border-r border-red-800/30 shadow-2xl z-50
      `}
    >
      <div className="h-full flex flex-col">
        <div className="h-16 px-6 border-b border-red-800/30 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <button onClick={onClose} className="lg:hidden text-white hover:text-red-400">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-900/50 text-gray-300 hover:text-white transition-all duration-200 group"
            >
              <span className="group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </span>
              <span className="font-medium">{item.text}</span>
            </a>
          ))}
        </div>

        <div className="p-4 border-t border-red-800/30">
          <button className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg bg-red-900/20 hover:bg-red-800/40 text-gray-300 hover:text-white transition-all duration-200 group">
            <span className="group-hover:scale-110 transition-transform duration-200">
              <LogOut size={20} />
            </span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}