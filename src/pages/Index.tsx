
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
    console.log('=== INDEX DEBUG ===');
    console.log('Auth loading:', authLoading);
    console.log('User exists:', !!user);
    console.log('User ID:', user?.id);
    console.log('Onboarding loading:', onboardingLoading);
    console.log('Has completed onboarding:', hasCompletedOnboarding);
    console.log('Is checking:', isChecking);
    
    if (!authLoading && !user) {
      console.log('No user found, redirecting to auth');
      navigate('/auth');
      return;
    }

    if (user && !onboardingLoading && !isChecking && hasCompletedOnboarding === null) {
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
      console.log('Checking onboarding status for user:', user.id);
      const onboardingData = await getOnboardingData();
      console.log('Raw onboarding data:', onboardingData);
      
      // Check both completed_at field and completed field for backward compatibility
      const isCompleted = onboardingData && (
        onboardingData.completed_at !== null || 
        onboardingData.completed === true
      );
      
      console.log('Is onboarding completed?', isCompleted);
      console.log('completed_at:', onboardingData?.completed_at);
      console.log('completed field:', onboardingData?.completed);
      
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
