import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 bg-gradient-to-r from-red-900 to-black shadow-xl px-4 flex items-center justify-between lg:justify-end sticky top-0 z-40">
      <button onClick={onMenuClick} className="lg:hidden text-white hover:text-red-400">
        <Menu size={24} />
      </button>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-300">Welcome, Admin</span>
        <div className="h-10 w-10 rounded-full bg-red-800 text-white flex items-center justify-center shadow-lg border-2 border-red-700">
          A
        </div>
      </div>
    </header>
  );
}