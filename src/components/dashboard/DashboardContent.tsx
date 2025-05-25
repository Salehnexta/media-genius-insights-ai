
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardCharts from '@/components/dashboard/DashboardCharts';
import DashboardActivities from '@/components/dashboard/DashboardActivities';

const DashboardContent: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <main className="dashboard-content">
      <div className="dashboard-content-inner">
        {/* Page Title */}
        <div className="dashboard-title">
          <h1 className={`title-text ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? 'لوحة التحكم الرئيسية' : 'Main Dashboard'}
          </h1>
          <p className={`title-subtitle ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? 'مرحباً بك في نظام إدارة التسويق الذكي' : 'Welcome to your AI Marketing Management System'}
          </p>
        </div>

        {/* Stats Section */}
        <DashboardStats />

        {/* Charts and Analytics */}
        <DashboardCharts />

        {/* Recent Activities */}
        <DashboardActivities />
      </div>
    </main>
  );
};

export default DashboardContent;
