
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import { Loader2 } from 'lucide-react';

const Index: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { getOnboardingData, loading: onboardingLoading } = useOnboardingData();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const isArabic = language === 'ar';

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }

    if (user && !onboardingLoading) {
      checkOnboardingStatus();
    }
  }, [user, authLoading, onboardingLoading, navigate]);

  const checkOnboardingStatus = async () => {
    try {
      console.log('Checking onboarding status...');
      const onboardingData = await getOnboardingData();
      console.log('Onboarding data result:', onboardingData);
      
      // If no data exists, user hasn't completed onboarding
      const completed = onboardingData && onboardingData.completed_at !== null;
      console.log('Onboarding completed status:', completed);
      
      setHasCompletedOnboarding(completed);
      
      if (!completed) {
        console.log('Redirecting to onboarding...');
        navigate('/onboarding');
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // If there's an error, assume onboarding is not completed
      setHasCompletedOnboarding(false);
      navigate('/onboarding');
    }
  };

  if (authLoading || onboardingLoading || hasCompletedOnboarding === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-300">
            {isArabic ? 'جاري التحميل...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <DashboardTabs />
      </main>
    </div>
  );
};

export default Index;
