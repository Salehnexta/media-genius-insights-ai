
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ChatSection from '@/components/dashboard/ChatSection';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getChartConfig, getOverviewData, getSentimentData, getShareOfVoiceData } from '@/components/dashboard/ChartConfig';
import PerformanceTrendsChart from '@/components/dashboard/charts/PerformanceTrendsChart';
import SentimentAnalysisChart from '@/components/dashboard/charts/SentimentAnalysisChart';
import ShareOfVoiceChart from '@/components/dashboard/charts/ShareOfVoiceChart';
import MediaMentionsStats from '@/components/dashboard/charts/MediaMentionsStats';

const Index: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isArabic = language === 'ar';

  const chartConfig = getChartConfig();
  const overviewData = getOverviewData();
  const sentimentData = getSentimentData();
  const shareOfVoiceData = getShareOfVoiceData();

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
    <div className={`h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'} flex flex-col`} dir={isArabic ? 'rtl' : 'ltr'}>
      <DashboardHeader />
      
      {/* Main Content - Split Layout like Lovable */}
      <div className="flex-1 flex overflow-hidden">
        {/* Preview/Dashboard Section - Left Side (70%) */}
        <div className={`w-7/10 bg-white dark:bg-gray-900 ${isArabic ? 'border-l border-r-0' : 'border-r'} border-gray-200 dark:border-gray-700`} style={{width: '70%'}}>
          <div className="h-full overflow-y-auto p-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {isArabic ? 'الحالة' : 'Status'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                    {isArabic ? 'نشط' : 'Active'}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-green-600 dark:text-green-400">
                    {isArabic ? 'البريد الإلكتروني' : 'Email'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-medium text-green-700 dark:text-green-300 truncate">
                    {user?.email || 'user@example.com'}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-purple-600 dark:text-purple-400">
                    {isArabic ? 'تاريخ الانضمام' : 'Member Since'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US') : 'N/A'}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Grid */}
            <div className="space-y-4">
              {/* Performance and Sentiment */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="min-h-[250px]">
                  <PerformanceTrendsChart 
                    data={overviewData} 
                    chartConfig={chartConfig} 
                  />
                </div>
                <div className="min-h-[250px]">
                  <SentimentAnalysisChart 
                    data={sentimentData} 
                    chartConfig={chartConfig} 
                  />
                </div>
              </div>

              {/* Share of Voice and Media Mentions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="min-h-[250px]">
                  <ShareOfVoiceChart 
                    data={shareOfVoiceData} 
                    chartConfig={chartConfig} 
                  />
                </div>
                <div className="min-h-[250px]">
                  <MediaMentionsStats />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Section - Right Side (30%) */}
        <div className={`${isArabic ? 'border-r border-l-0' : 'border-l'} border-gray-200 dark:border-gray-700`} style={{width: '30%'}}>
          <div className="h-full">
            <ChatSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
