
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Users, Target, BarChart3, Search } from 'lucide-react';
import MarketingManagerTab from './tabs/MarketingManagerTab';
import SocialMediaTab from './tabs/SocialMediaTab';
import CampaignsPerformanceTab from './tabs/CampaignsPerformanceTab';
import ContentStrategyTab from './tabs/ContentStrategyTab';
import SEOAnalyticsTab from './tabs/SEOAnalyticsTab';

const MarketingDashboardTabs: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const tabs = [
    {
      id: 'marketing-manager',
      label: isArabic ? 'مدير التسويق' : 'Marketing Manager',
      icon: <Brain className="h-4 w-4" />
    },
    {
      id: 'social-media',
      label: isArabic ? 'موظف السوشال ميديا والتجربة' : 'Social Media & Experience',
      icon: <Users className="h-4 w-4" />
    },
    {
      id: 'campaigns-performance',
      label: isArabic ? 'موظف حملات التسويق والأداء' : 'Marketing Campaigns & Performance',
      icon: <Target className="h-4 w-4" />
    },
    {
      id: 'content-strategy',
      label: isArabic ? 'موظف إنشاء المحتوى والاستراتيجية' : 'Content Creation & Strategy',
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      id: 'seo-analytics',
      label: isArabic ? 'موظف تحسين محركات البحث وتحليلات البيانات' : 'SEO & Data Analytics',
      icon: <Search className="h-4 w-4" />
    }
  ];

  return (
    <div className={`w-full h-full dashboard-tabs ${isArabic ? 'rtl arabic-text' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <Tabs defaultValue="marketing-manager" className="w-full h-full flex flex-col">
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 pt-4">
          <TabsList className={`grid w-full grid-cols-5 bg-gray-100 dark:bg-gray-800`}>
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className={`flex items-center gap-2 text-xs ${isArabic ? 'flex-row-reverse arabic-text' : ''}`}
              >
                {tab.icon}
                <span className="hidden lg:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="marketing-manager" className="h-full m-0 tab-content">
            <MarketingManagerTab />
          </TabsContent>

          <TabsContent value="social-media" className="h-full m-0 tab-content">
            <SocialMediaTab />
          </TabsContent>

          <TabsContent value="campaigns-performance" className="h-full m-0 tab-content">
            <CampaignsPerformanceTab />
          </TabsContent>

          <TabsContent value="content-strategy" className="h-full m-0 tab-content">
            <ContentStrategyTab />
          </TabsContent>

          <TabsContent value="seo-analytics" className="h-full m-0 tab-content">
            <SEOAnalyticsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MarketingDashboardTabs;
