
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ChatSection from '@/components/dashboard/ChatSection';
import MarketingDashboardTabs from '@/components/dashboard/MarketingDashboardTabs';
import DashboardLayoutWrapper from '@/components/dashboard/DashboardLayoutWrapper';
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
    console.log('=== INDEX PAGE DEBUG ===');
    console.log('Auth loading:', authLoading);
    console.log('User exists:', !!user);
    console.log('Current path:', window.location.pathname);
    
    if (!authLoading && !user) {
      console.log('No user found, redirecting to Arabic landing page');
      navigate('/landing-ar');
      return;
    }

    if (!authLoading && user) {
      checkOnboardingStatus();
    }
  }, [user, authLoading, navigate]);

  const checkOnboardingStatus = async () => {
    if (!user) return;
    
    console.log('=== CHECKING ONBOARDING STATUS ===');
    setCheckingOnboarding(true);
    
    try {
      const onboardingData = await getOnboardingData();
      console.log('Onboarding data received:', onboardingData);
      
      // التحقق من حالة الإكمال بطرق متعددة للتأكد
      const isCompleted = onboardingData && (
        onboardingData.completed_at !== null || 
        onboardingData.completed === true ||
        (onboardingData.business_name && onboardingData.industry)
      );
      
      console.log('Onboarding completion status:', isCompleted);
      
      if (!isCompleted) {
        console.log('Onboarding not completed, redirecting to wizard');
        navigate('/onboarding');
        return;
      }
      
      console.log('Onboarding completed, showing dashboard');
      setLoading(false);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // في حالة الخطأ، نوجه للـ onboarding للتأكد
      navigate('/onboarding');
    } finally {
      setCheckingOnboarding(false);
    }
  };

  // عرض حالة التحميل أثناء التحقق من المصادقة أو الـ onboarding
  if (authLoading || loading || checkingOnboarding) {
    console.log('Showing loading state');
    return (
      <DashboardLayoutWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <div className={`text-center ${isArabic ? 'arabic-text' : ''}`}>
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600 dark:text-gray-300">
              {checkingOnboarding 
                ? (isArabic ? 'جاري التحقق من حالة الإعداد...' : 'Checking setup status...')
                : authLoading
                ? (isArabic ? 'جاري التحقق من الهوية...' : 'Checking authentication...')
                : (isArabic ? 'جاري تحميل لوحة التحكم...' : 'Loading dashboard...')
              }
            </p>
          </div>
        </div>
      </DashboardLayoutWrapper>
    );
  }

  if (!user) {
    console.log('No user after loading, this should not happen');
    return null;
  }

  return (
    <DashboardLayoutWrapper>
      <DashboardHeader />
      
      {/* Mobile Layout - Chat at bottom */}
      <div className="md:hidden flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 bg-white dark:bg-gray-900 overflow-y-auto">
          <MarketingDashboardTabs />
        </div>

        <div className="h-64 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <ChatSection />
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden md:flex flex-1 overflow-hidden desktop-layout">
        <div className={`w-full md:w-2/5 lg:w-1/3 xl:w-3/10 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 desktop-chat-left ${
          isArabic ? 'border-l' : 'border-r'
        }`}>
          <div className="h-full">
            <ChatSection />
          </div>
        </div>

        <div className="flex-1 bg-white dark:bg-gray-900 desktop-content-right">
          <div className="h-full overflow-y-auto">
            <MarketingDashboardTabs />
          </div>
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
};

export default Index;
