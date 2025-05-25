
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Target, Users, BarChart3, Calendar, Palette, Zap } from 'lucide-react';
import AIMarketingTeam from './AIMarketingTeam';
import MarketingEcosystemOverview from './MarketingEcosystemOverview';

const DashboardTabsNew: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const tabs = [
    {
      id: 'ecosystem',
      label: isArabic ? 'النظام التسويقي' : 'Marketing Ecosystem',
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      id: 'team',
      label: isArabic ? 'فريق التسويق الذكي' : 'AI Marketing Team',
      icon: <Brain className="h-4 w-4" />
    },
    {
      id: 'calendar',
      label: isArabic ? 'التقويم التسويقي' : 'Marketing Calendar',
      icon: <Calendar className="h-4 w-4" />
    },
    {
      id: 'brand-center',
      label: isArabic ? 'مركز العلامة التجارية' : 'Brand Center',
      icon: <Palette className="h-4 w-4" />
    },
    {
      id: 'content-studio',
      label: isArabic ? 'استوديو المحتوى' : 'Content Studio',
      icon: <Zap className="h-4 w-4" />
    }
  ];

  return (
    <div className={`w-full ${isArabic ? 'rtl' : ''}`}>
      <Tabs defaultValue="ecosystem" className="w-full">
        <TabsList className={`grid w-full grid-cols-5 ${isArabic ? 'grid-flow-col-reverse' : ''}`}>
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
            >
              {tab.icon}
              <span className="hidden sm:inline text-xs">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="ecosystem" className="mt-6">
          <MarketingEcosystemOverview />
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <AIMarketingTeam />
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {isArabic ? 'التقويم التسويقي الموحد' : 'Unified Marketing Calendar'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {isArabic ? 'قريباً - التقويم الموحد لجميع الأنشطة التسويقية' : 'Coming Soon - Unified calendar for all marketing activities'}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="brand-center" className="mt-6">
          <div className="text-center py-12">
            <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {isArabic ? 'مركز العلامة التجارية' : 'Brand Center'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {isArabic ? 'قريباً - إدارة هوية العلامة التجارية والأصول المرئية' : 'Coming Soon - Manage brand identity and visual assets'}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="content-studio" className="mt-6">
          <div className="text-center py-12">
            <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {isArabic ? 'استوديو المحتوى' : 'Content Studio'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {isArabic ? 'قريباً - إنشاء وتحرير وجدولة المحتوى' : 'Coming Soon - Create, edit, and schedule content'}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabsNew;
