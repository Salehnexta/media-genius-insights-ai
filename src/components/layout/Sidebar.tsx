
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LineChart, 
  MessageSquare, 
  PenSquare, 
  Activity, 
  Users, 
  Globe, 
  Heart, 
  LayoutDashboard, 
  Settings, 
  BarChart 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  isActive = false,
  isCollapsed = false
}) => {
  return (
    <Link 
      to="/"
      className={cn(
        "flex items-center space-x-2 px-4 py-3 rounded-md transition-all",
        isActive 
          ? "bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-300" 
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <div 
      className={cn(
        "h-screen bg-sidebar dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all",
        isCollapsed ? "w-16" : "w-60"
      )}
    >
      <div className="p-4 flex justify-between items-center">
        {!isCollapsed && (
          <span className="text-lg font-bold bg-marketing-gradient bg-clip-text text-transparent">
            MGAI
          </span>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>
      
      <div className="flex flex-col space-y-1 p-2 flex-1">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" isActive isCollapsed={isCollapsed} />
        <SidebarItem icon={BarChart} label="Campaigns" isCollapsed={isCollapsed} />
        <SidebarItem icon={Users} label="Audience" isCollapsed={isCollapsed} />
        <SidebarItem icon={LineChart} label="Competitors" isCollapsed={isCollapsed} />
        <SidebarItem icon={Heart} label="Social Listening" isCollapsed={isCollapsed} />
        <SidebarItem icon={PenSquare} label="Content Studio" isCollapsed={isCollapsed} />
        <SidebarItem icon={Activity} label="Strategy" isCollapsed={isCollapsed} />
      </div>
      
      <div className="p-2">
        <SidebarItem icon={Settings} label="Settings" isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default Sidebar;
