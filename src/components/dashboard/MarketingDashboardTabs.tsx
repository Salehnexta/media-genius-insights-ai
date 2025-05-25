
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Users, Target, BarChart3, Search } from 'lucide-react';
import PerformanceOverviewTab from './tabs/PerformanceOverviewTab';
import BudgetAllocationTab from './tabs/BudgetAllocationTab';
import StrategicInitiativesTab from './tabs/StrategicInitiativesTab';
import ExecutiveDashboardTab from './tabs/ExecutiveDashboardTab';
import CompetitorAnalysisTab from './tabs/CompetitorAnalysisTab';

const MarketingDashboardTabs: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const tabs = [
    {
      id: 'performance-overview',
      label: isArabic ? 'مدير التسويق' : 'Marketing Manager',
      icon: <Brain className="h-4 w-4" />
    },
    {
      id: 'budget-allocation',
      label: isArabic ? 'موظف السوشال ميديا والتجربة' : 'Social Media & Experience',
      icon: <Users className="h-4 w-4" />
    },
    {
      id: 'strategic-initiatives',
      label: isArabic ? 'موظف حملات التسويق والأداء' : 'Marketing Campaigns & Performance',
      icon: <Target className="h-4 w-4" />
    },
    {
      id: 'executive-dashboard',
      label: isArabic ? 'موظف إنشاء المحتوى والاستراتيجية' : 'Content Creation & Strategy',
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      id: 'competitor-analysis',
      label: isArabic ? 'موظف تحسين محركات البحث وتحليلات البيانات' : 'SEO & Data Analytics',
      icon: <Search className="h-4 w-4" />
    }
  ];

  return (
    <div className={`w-full h-full ${isArabic ? 'rtl' : ''}`}>
      <Tabs defaultValue="performance-overview" className="w-full h-full flex flex-col">
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 pt-4">
          <TabsList className="grid w-full grid-cols-5 bg-gray-100 dark:bg-gray-800">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className={`flex items-center gap-2 text-xs ${isArabic ? 'flex-row-reverse' : ''}`}
              >
                {tab.icon}
                <span className="hidden lg:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="performance-overview" className="h-full m-0">
            <PerformanceOverviewTab />
          </TabsContent>

          <TabsContent value="budget-allocation" className="h-full m-0">
            <BudgetAllocationTab />
          </TabsContent>

          <TabsContent value="strategic-initiatives" className="h-full m-0">
            <StrategicInitiativesTab />
          </TabsContent>

          <TabsContent value="executive-dashboard" className="h-full m-0">
            <ExecutiveDashboardTab />
          </TabsContent>

          <TabsContent value="competitor-analysis" className="h-full m-0">
            <CompetitorAnalysisTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MarketingDashboardTabs;
