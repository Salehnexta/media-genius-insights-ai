
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Auth from './Auth';

const RegisterAr: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="rtl">
        <Auth />
      </div>
    </LanguageProvider>
  );
};

export default RegisterAr;
