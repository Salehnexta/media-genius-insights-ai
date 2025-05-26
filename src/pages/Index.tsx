
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ChatSection from '@/components/dashboard/ChatSection';
import MarketingDashboardTabs from '@/components/dashboard/MarketingDashboardTabs';
import { Loader2 } from 'lucide-react';
import { useOnboardingData } from '@/hooks/useOnboardingData';

const Index: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const { getOnboardingData } = useOnboardingData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const isArabic = language === 'ar';

  useEffect(() => {
    console.log('Auth loading:', authLoading);
    console.log('User exists:', !!user);
    
    if (!authLoading && !user) {
      console.log('No user found, redirecting to auth');
      navigate('/auth');
      return;
    }

    if (!authLoading && user) {
      checkOnboardingStatus();
    }
  }, [user, authLoading, navigate]);

  const checkOnboardingStatus = async () => {
    if (!user) return;
    
    setCheckingOnboarding(true);
    try {
      const onboardingData = await getOnboardingData();
      console.log('Onboarding data:', onboardingData);
      
      // If user hasn't completed onboarding, redirect to wizard
      if (!onboardingData || !onboardingData.completed) {
        console.log('Onboarding not completed, redirecting to wizard');
        navigate('/onboarding');
        return;
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setLoading(false);
    } finally {
      setCheckingOnboarding(false);
    }
  };

  // Show loading while checking authentication or onboarding
  if (authLoading || loading || checkingOnboarding) {
    console.log('Showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-300">
            {checkingOnboarding 
              ? (isArabic ? 'جاري التحقق من الإعداد...' : 'Checking setup status...')
              : (isArabic ? 'جاري تحميل لوحة التحكم...' : 'Loading dashboard...')
            }
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
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col`} dir={isArabic ? 'rtl' : 'ltr'}>
      <DashboardHeader />
      
      {/* Mobile Layout - Chat at bottom */}
      <div className="md:hidden flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Section - Top on mobile */}
        <div className="flex-1 bg-white dark:bg-gray-900 overflow-y-auto">
          <MarketingDashboardTabs />
        </div>

        {/* Chat Section - Fixed at bottom on mobile */}
        <div className="h-64 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <ChatSection />
        </div>
      </div>

      {/* Desktop/Tablet Layout - Chat ALWAYS on left */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        {/* Chat Section - Always on the left (forced positioning) */}
        <div className="w-full md:w-2/5 lg:w-1/3 xl:w-3/10 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 order-1">
          <div className="h-full">
            <ChatSection />
          </div>
        </div>

        {/* Dashboard Section - Main content */}
        <div className="flex-1 bg-white dark:bg-gray-900 order-2">
          <div className="h-full overflow-y-auto">
            <MarketingDashboardTabs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
