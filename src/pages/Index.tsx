
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ChatSection from '@/components/dashboard/ChatSection';
import MarketingDashboardTabs from '@/components/dashboard/MarketingDashboardTabs';
import { Loader2 } from 'lucide-react';

const Index: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isArabic = language === 'ar';

  useEffect(() => {
    console.log('Auth loading:', authLoading);
    console.log('User exists:', !!user);
    
    if (!authLoading && !user) {
      console.log('No user found, redirecting to auth');
      navigate('/auth');
      return;
    }

    if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading, navigate]);

  // Show loading while checking authentication
  if (authLoading || loading) {
    console.log('Showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-300">
            {isArabic ? 'جاري تحميل لوحة التحكم...' : 'Loading dashboard...'}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No user, returning null (should redirect)');
    return null;
  }

  return (
    <div className={`h-screen bg-gray-50 dark:bg-gray-950 flex flex-col`} dir={isArabic ? 'rtl' : 'ltr'}>
      <DashboardHeader />
      
      {/* Main Content - Chat always on left regardless of language */}
      <div className="flex-1 flex overflow-hidden" style={{ direction: 'ltr' }}>
        {/* Chat Section - Always on Left (30%) */}
        <div className="w-3/10 border-r border-gray-200 dark:border-gray-700" style={{width: '30%'}}>
          <div className="h-full" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            <ChatSection />
          </div>
        </div>

        {/* Dashboard Section - Right Side (70%) */}
        <div className="flex-1 bg-white dark:bg-gray-900" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          <div className="h-full overflow-y-auto">
            <MarketingDashboardTabs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
