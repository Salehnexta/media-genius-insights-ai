
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
    console.log('=== INDEX USEEFFECT DEBUG ===');
    console.log('Auth loading:', authLoading);
    console.log('User exists:', !!user);
    console.log('User ID:', user?.id);
    console.log('Onboarding loading:', onboardingLoading);
    console.log('Has completed onboarding:', hasCompletedOnboarding);
    console.log('Onboarding data from hook:', onboardingData);
    console.log('Onboarding data completed field:', onboardingData?.completed);
    
    if (!authLoading && !user) {
      console.log('No user found, redirecting to auth');
      navigate('/auth');
      return;
    }

    if (user && !onboardingLoading && hasCompletedOnboarding === null) {
      console.log('Checking onboarding status...');
      checkOnboardingStatus();
    }
  }, [user, authLoading, onboardingLoading, navigate, hasCompletedOnboarding, onboardingData]);

  const checkOnboardingStatus = async () => {
    if (!user) return;
    
    try {
      console.log('=== CHECKING ONBOARDING STATUS ===');
      
      // First check the hook data which should be already processed
      if (onboardingData) {
        console.log('Using hook data for completion check');
        console.log('Hook data completed status:', onboardingData.completed);
        
        const isCompleted = onboardingData.completed === true;
        console.log('Final completion status from hook:', isCompleted);
        
        setHasCompletedOnboarding(isCompleted);
        
        if (!isCompleted) {
          console.log('Onboarding not completed, staying on onboarding page');
          // Don't redirect if we're already on onboarding page
          if (window.location.pathname !== '/onboarding') {
            navigate('/onboarding');
          }
        } else {
          console.log('Onboarding completed, staying on dashboard');
        }
        return;
      }
      
      // Fallback: Get raw data from database if hook data not available
      console.log('Hook data not available, fetching from database...');
      const rawData = await getOnboardingData();
      console.log('Raw onboarding data from database:', rawData);
      
      if (rawData) {
        // Check completion status from raw database data
        const isCompleted = rawData.completed_at !== null && rawData.completed_at !== undefined;
        console.log('=== RAW DATA COMPLETION CHECK ===');
        console.log('completed_at value:', rawData.completed_at);
        console.log('completed_at is null:', rawData.completed_at === null);
        console.log('Final isCompleted result from raw data:', isCompleted);
        
        setHasCompletedOnboarding(isCompleted);
        
        if (!isCompleted) {
          console.log('Onboarding not completed, staying on onboarding page');
          if (window.location.pathname !== '/onboarding') {
            navigate('/onboarding');
          }
        } else {
          console.log('Onboarding completed, staying on dashboard');
        }
      } else {
        console.log('No onboarding data found, redirecting to onboarding');
        setHasCompletedOnboarding(false);
        if (window.location.pathname !== '/onboarding') {
          navigate('/onboarding');
        }
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // If there's an error, assume onboarding not completed
      setHasCompletedOnboarding(false);
      if (window.location.pathname !== '/onboarding') {
        navigate('/onboarding');
      }
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
