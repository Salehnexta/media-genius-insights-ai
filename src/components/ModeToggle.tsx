
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModeToggleProps {
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ isDarkMode, toggleDarkMode }) => {
  const handleToggle = () => {
    if (toggleDarkMode) {
      toggleDarkMode();
    } else {
      // Fallback to document class toggle if no props provided
      document.documentElement.classList.toggle('dark');
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleToggle}>
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
