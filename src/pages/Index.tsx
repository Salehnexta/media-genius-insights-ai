
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardTabsNew from '@/components/dashboard/DashboardTabsNew';
import ChatSection from '@/components/dashboard/ChatSection';
import { Loader2 } from 'lucide-react';

const Index: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { data: onboardingData, loading: onboardingLoading, getOnboardingData } = useOnboardingData();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const isArabic = language === 'ar';

  useEffect(() => {
    console.log('=== INDEX USEEFFECT DEBUG ===');
    console.log('Auth loading:', authLoading);
    console.log('User exists:', !!user);
    console.log('User ID:', user?.id);
    console.log('Onboarding loading:', onboardingLoading);
    console.log('Has completed onboarding:', hasCompletedOnboarding);
    console.log('Onboarding data from hook:', onboardingData);
    
    if (!authLoading && !user) {
      console.log('No user found, redirecting to auth');
      navigate('/auth');
      return;
    }

    if (user && !onboardingLoading && checkingStatus) {
      console.log('User found and onboarding not loading, checking status...');
      checkOnboardingStatus();
    }
  }, [user, authLoading, onboardingLoading, navigate, checkingStatus]);

  const checkOnboardingStatus = async () => {
    if (!user) return;
    
    try {
      console.log('=== CHECKING ONBOARDING STATUS ===');
      setCheckingStatus(true);
      
      // Get raw data directly from database
      console.log('Fetching raw data from database...');
      const rawData = await getOnboardingData();
      console.log('Raw onboarding data from database:', rawData);
      
      if (rawData) {
        // Check if completed_at has any value (not null/undefined)
        const isCompleted = rawData.completed_at !== null && rawData.completed_at !== undefined;
        console.log('=== COMPLETION CHECK ===');
        console.log('completed_at value:', rawData.completed_at);
        console.log('completed_at is not null:', rawData.completed_at !== null);
        console.log('completed_at is not undefined:', rawData.completed_at !== undefined);
        console.log('Final isCompleted result:', isCompleted);
        
        setHasCompletedOnboarding(isCompleted);
        
        if (!isCompleted) {
          console.log('Onboarding not completed, redirecting to onboarding page');
          navigate('/onboarding');
        } else {
          console.log('Onboarding completed, staying on dashboard');
        }
      } else {
        console.log('No onboarding data found, redirecting to onboarding');
        setHasCompletedOnboarding(false);
        navigate('/onboarding');
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // If there's an error, assume onboarding not completed and redirect
      setHasCompletedOnboarding(false);
      navigate('/onboarding');
    } finally {
      setCheckingStatus(false);
    }
  };

  // Show loading while checking authentication or onboarding status
  if (authLoading || onboardingLoading || hasCompletedOnboarding === null || checkingStatus) {
    console.log('Showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-300">
            {isArabic ? 'جاري تحميل فريق التسويق الذكي...' : 'Loading your AI Marketing Team...'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Auth: {authLoading ? 'loading' : 'ready'} | 
            Onboarding: {onboardingLoading ? 'loading' : 'ready'} | 
            Status: {hasCompletedOnboarding === null ? 'checking' : hasCompletedOnboarding ? 'completed' : 'incomplete'} |
            Checking: {checkingStatus ? 'yes' : 'no'}
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
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <DashboardHeader />
      <div className={`flex ${isArabic ? 'flex-row-reverse' : ''}`}>
        {/* AI Assistant Sidebar - Left for English, Right for Arabic */}
        <aside className={`w-[35%] p-4 bg-white dark:bg-gray-900 ${isArabic ? 'border-l' : 'border-r'}`}>
          <div className="sticky top-6">
            <h2 className={`text-xl font-bold mb-4 ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'مدير التسويق الذكي' : 'AI Marketing Manager'}
            </h2>
            <ChatSection />
          </div>
        </aside>
        
        {/* Main Content Area - 65% */}
        <main className={`flex-1 w-[65%] px-4 py-6 ${isArabic ? 'pr-4 pl-4' : 'px-4'}`}>
          <DashboardTabsNew />
        </main>
      </div>
    </div>
  );
};

export default Index;
