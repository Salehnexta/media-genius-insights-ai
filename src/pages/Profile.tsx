
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import BreadcrumbNavigation from '@/components/layout/BreadcrumbNavigation';
import BackButton from '@/components/layout/BackButton';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import PersonalInfoSection from '@/components/profile/PersonalInfoSection';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 p-8 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto space-y-8">
        <BreadcrumbNavigation />
        <BackButton showHome />
        
        <ProfileHeader />
        
        <div className={`grid grid-cols-1 lg:grid-cols-4 gap-8 ${isArabic ? 'grid-cols-1 lg:grid-cols-4' : ''}`}>
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>
          <div className="lg:col-span-3">
            <PersonalInfoSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
