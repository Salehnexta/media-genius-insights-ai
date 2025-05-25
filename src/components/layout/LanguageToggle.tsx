
import React from 'react';
import { Button } from '@/components/ui/button';

interface LanguageToggleProps {
  isArabic: boolean;
  onToggle: () => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ isArabic, onToggle }) => {
  return (
    <Button variant="ghost" size="sm" onClick={onToggle}>
      {isArabic ? 'English' : 'عربي'}
    </Button>
  );
};

export default LanguageToggle;
