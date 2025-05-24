
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import AIInsightsPanel from '@/components/dashboard/AIInsightsPanel';
import PersonalizedRecommendations from '@/components/dashboard/PersonalizedRecommendations';
import PredictiveAnalytics from '@/components/insights/PredictiveAnalytics';
import BusinessIntelligence from '@/components/insights/BusinessIntelligence';
import MarketTrends from '@/components/insights/MarketTrends';
import CompetitorInsights from '@/components/insights/CompetitorInsights';
import PerformanceForecast from '@/components/insights/PerformanceForecast';
import InsightsOverview from '@/components/insights/InsightsOverview';
import { Brain, TrendingUp, Target, BarChart, Users, Zap, RefreshCw } from 'lucide-react';

const Insights = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const isArabic = language === 'ar';
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleRefreshInsights = async () => {
    setRefreshing(true);
    // Trigger insights refresh across all components
    setTimeout(() => setRefreshing(false), 2000);
  };

  const tabs = [
    {
      id: 'overview',
      label: isArabic ? 'نظرة عامة' : 'Overview',
      icon: Brain,
      component: InsightsOverview
    },
    {
      id: 'predictive',
      label: isArabic ? 'التحليل التنبؤي' : 'Predictive Analytics',
      icon: TrendingUp,
      component: PredictiveAnalytics
    },
    {
      id: 'business',
      label: isArabic ? 'ذكاء الأعمال' : 'Business Intelligence',
      icon: BarChart,
      component: BusinessIntelligence
    },
    {
      id: 'market',
      label: isArabic ? 'اتجاهات السوق' : 'Market Trends',
      icon: Zap,
      component: MarketTrends
    },
    {
      id: 'competitors',
      label: isArabic ? 'رؤى المنافسين' : 'Competitor Insights',
      icon: Users,
      component: CompetitorInsights
    },
    {
      id: 'forecast',
      label: isArabic ? 'توقعات الأداء' : 'Performance Forecast',
      icon: Target,
      component: PerformanceForecast
    }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header Section */}
        <div className={`flex items-center justify-between mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isArabic ? 'رؤى الذكاء الاصطناعي' : 'AI-Powered Insights'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isArabic ? 'تحليلات متقدمة وتوقعات ذكية لعملك' : 'Advanced analytics and intelligent predictions for your business'}
            </p>
          </div>
          <Button
            onClick={handleRefreshInsights}
            disabled={refreshing}
            className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {isArabic ? 'تحديث الرؤى' : 'Refresh Insights'}
          </Button>
        </div>

        {/* Quick Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <AIInsightsPanel className="h-fit" />
          <PersonalizedRecommendations maxItems={2} />
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <TrendingUp className="h-5 w-5 text-green-600" />
                {isArabic ? 'الأداء اليوم' : 'Today\'s Performance'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm text-gray-600">
                    {isArabic ? 'معدل التحويل' : 'Conversion Rate'}
                  </span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    +12%
                  </Badge>
                </div>
                <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm text-gray-600">
                    {isArabic ? 'الزوار الجدد' : 'New Visitors'}
                  </span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    +8%
                  </Badge>
                </div>
                <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm text-gray-600">
                    {isArabic ? 'التفاعل' : 'Engagement'}
                  </span>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    +15%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Insights Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <tab.component refreshing={refreshing} />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default Insights;
