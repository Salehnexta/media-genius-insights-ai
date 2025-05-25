
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardContent from '@/components/dashboard/DashboardContent';

const DashboardLayout: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`dashboard-container ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <DashboardHeader />
      
      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Content */}
        <DashboardContent />
      </div>
    </div>
  );
};

export default DashboardLayout;
