
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  to?: string;
  label?: string;
  showHome?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  to, 
  label, 
  showHome = false 
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  const backLabel = label || (isArabic ? 'العودة' : 'Back');
  const homeLabel = isArabic ? 'الرئيسية' : 'Home';

  return (
    <div className={`flex items-center gap-4 mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
      <Button
        variant="ghost"
        onClick={handleBack}
        className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
      >
        <ArrowLeft className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
        <span className={isArabic ? 'font-arabic' : ''}>
          {backLabel}
        </span>
      </Button>

      {showHome && (
        <Link
          to="/dashboard"
          className={`flex items-center gap-2 text-blue-600 hover:text-blue-800 ${isArabic ? 'flex-row-reverse' : ''}`}
        >
          <Home className="h-4 w-4" />
          <span className={isArabic ? 'font-arabic' : ''}>
            {homeLabel}
          </span>
        </Link>
      )}
    </div>
  );
};

export default BackButton;
