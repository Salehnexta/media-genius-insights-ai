
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
  const { data: onboardingData, loading: onboardingLoading, getOnboardingData } = useOnboardingData();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const isArabic = language === 'ar';

  useEffect(() => {
    console.log('Index useEffect triggered:', {
      authLoading,
      user: !!user,
      userId: user?.id,
      onboardingLoading,
      hasCompletedOnboarding,
      onboardingDataCompleted: onboardingData?.completed
    });
    
    if (!authLoading && !user) {
      console.log('No user found, redirecting to auth');
      navigate('/auth');
      return;
    }

    if (user && !onboardingLoading && hasCompletedOnboarding === null) {
      console.log('Checking onboarding status from database...');
      checkOnboardingStatus();
    }
  }, [user, authLoading, onboardingLoading, navigate, hasCompletedOnboarding]);

  const checkOnboardingStatus = async () => {
    if (!user) return;
    
    try {
      // Get raw data from database to check completed_at field
      const rawData = await getOnboardingData();
      console.log('Raw onboarding data from database:', rawData);
      
      // Check if completed_at field exists and is not null
      const isCompleted = rawData && rawData.completed_at !== null;
      console.log('Onboarding completed status (from completed_at):', isCompleted);
      
      setHasCompletedOnboarding(isCompleted);
      
      if (!isCompleted) {
        console.log('Onboarding not completed, redirecting to onboarding...');
        navigate('/onboarding');
      } else {
        console.log('Onboarding completed, staying on dashboard');
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // If there's an error, assume onboarding not completed
      setHasCompletedOnboarding(false);
      navigate('/onboarding');
    }
  };

  // Show loading while checking authentication or onboarding status
  if (authLoading || onboardingLoading || hasCompletedOnboarding === null) {
    console.log('Showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-300">
            {isArabic ? 'جاري التحميل...' : 'Loading dashboard...'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Auth: {authLoading ? 'loading' : 'ready'} | 
            Onboarding: {onboardingLoading ? 'loading' : 'ready'} | 
            Status: {hasCompletedOnboarding === null ? 'checking' : hasCompletedOnboarding ? 'completed' : 'incomplete'}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No user, returning null (should redirect)');
    return null;
  }

  // Only render dashboard if onboarding is completed
  if (!hasCompletedOnboarding) {
    console.log('Onboarding not completed, returning null (should redirect)');
    return null;
  }

  console.log('Rendering dashboard');
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
