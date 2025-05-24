
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  isArabic: boolean;
  onToggle: () => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ isArabic, onToggle }) => {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={onToggle}
      className="h-10 px-3 gap-2 touch-manipulation font-medium"
      style={{ minHeight: '44px', minWidth: '44px' }}
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">
        {isArabic ? 'English' : 'عربي'}
      </span>
    </Button>
  );
};

export default LanguageToggle;
