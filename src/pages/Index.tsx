
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
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isArabic ? 'مرحباً بك في لوحة التحكم' : 'Welcome to Your Dashboard'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isArabic 
                ? 'إدارة حسابك وإعداداتك من هنا'
                : 'Manage your account and settings from here'
              }
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {isArabic ? 'الحالة' : 'Status'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {isArabic ? 'نشط' : 'Active'}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {isArabic ? 'البريد الإلكتروني' : 'Email'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-medium text-gray-900 dark:text-white truncate">
                  {user.email}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {isArabic ? 'تاريخ الانضمام' : 'Member Since'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US') : 'N/A'}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Charts Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Performance Trends and Sentiment Analysis */}
              <div className="grid lg:grid-cols-2 gap-6">
                <PerformanceTrendsChart 
                  data={overviewData} 
                  chartConfig={chartConfig} 
                />
                <SentimentAnalysisChart 
                  data={sentimentData} 
                  chartConfig={chartConfig} 
                />
              </div>

              {/* Share of Voice and Media Mentions */}
              <div className="grid lg:grid-cols-2 gap-6">
                <ShareOfVoiceChart 
                  data={shareOfVoiceData} 
                  chartConfig={chartConfig} 
                />
                <MediaMentionsStats />
              </div>
            </div>

            {/* Chat Section */}
            <div className="lg:col-span-1">
              <ChatSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
