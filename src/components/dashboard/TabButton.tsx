
import React from 'react';

interface TabButtonProps {
  label: string;
  icon?: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  isMobile?: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({ 
  label, 
  icon, 
  isActive, 
  onClick,
  isMobile = false
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${isMobile 
          ? 'px-3 py-2 min-w-[40px] flex justify-center' 
          : 'px-4 py-2 min-w-[100px]'}
        ${isActive 
          ? 'text-primary border-b-2 border-primary font-medium' 
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}
        flex items-center gap-2 transition-colors
      `}
    >
      {icon}
      {(!isMobile || label.length === 0) && label}
      {isMobile && label.length > 0 && (
        <span className="sr-only">{label}</span>
      )}
    </button>
  );
};

export default TabButton;
