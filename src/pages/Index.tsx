
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
  const [isChecking, setIsChecking] = useState(false);
  const isArabic = language === 'ar';

  useEffect(() => {
    console.log('Index useEffect triggered:', {
      authLoading,
      user: !!user,
      userId: user?.id,
      onboardingLoading,
      hasCompletedOnboarding,
      isChecking
    });
    
    if (!authLoading && !user) {
      console.log('No user found, redirecting to auth');
      navigate('/auth');
      return;
    }

    if (user && !onboardingLoading && !isChecking && hasCompletedOnboarding === null) {
      console.log('Checking onboarding status...');
      checkOnboardingStatus();
    }
  }, [user, authLoading, onboardingLoading, navigate, isChecking, hasCompletedOnboarding]);

  const checkOnboardingStatus = async () => {
    if (isChecking || !user) {
      console.log('Skipping onboarding check - already checking or no user');
      return;
    }

    setIsChecking(true);
    
    try {
      console.log('Fetching onboarding data for user:', user.id);
      const onboardingData = await getOnboardingData();
      console.log('Onboarding data result:', onboardingData);
      
      // Check if onboarding is completed
      const isCompleted = onboardingData && onboardingData.completed_at !== null;
      console.log('Onboarding completed status:', isCompleted);
      
      setHasCompletedOnboarding(isCompleted);
      
      if (!isCompleted) {
        console.log('Onboarding not completed, redirecting to onboarding...');
        navigate('/onboarding');
      } else {
        console.log('Onboarding completed, staying on dashboard');
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // On error, assume onboarding is not completed
      setHasCompletedOnboarding(false);
      navigate('/onboarding');
    } finally {
      setIsChecking(false);
    }
  };

  // Show loading while checking authentication or onboarding status
  if (authLoading || onboardingLoading || hasCompletedOnboarding === null || isChecking) {
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
