
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, TrendingUp, MessageSquare, PenTool, Target } from 'lucide-react';

const DashboardTabs: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const tabs = [
    {
      id: 'overview',
      label: isArabic ? 'نظرة عامة' : 'Overview',
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      id: 'campaigns',
      label: isArabic ? 'الحملات' : 'Campaigns',
      icon: <Target className="h-4 w-4" />
    },
    {
      id: 'audience',
      label: isArabic ? 'الجمهور' : 'Audience',
      icon: <Users className="h-4 w-4" />
    },
    {
      id: 'analytics',
      label: isArabic ? 'التحليلات' : 'Analytics',
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      id: 'content',
      label: isArabic ? 'المحتوى' : 'Content',
      icon: <PenTool className="h-4 w-4" />
    }
  ];

  return (
    <div className={`w-full ${isArabic ? 'rtl' : ''}`}>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className={`grid w-full grid-cols-5 ${isArabic ? 'grid-flow-col-reverse' : ''}`}>
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <BarChart3 className="h-5 h-5" />
                  {isArabic ? 'إحصائيات عامة' : 'Overview Stats'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {isArabic ? 'مرحباً بك في لوحة التحكم الرئيسية' : 'Welcome to your main dashboard'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Target className="h-5 w-5" />
                  {isArabic ? 'الحملات النشطة' : 'Active Campaigns'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isArabic ? 'حملة نشطة' : 'Active campaigns'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Users className="h-5 w-5" />
                  {isArabic ? 'الجمهور المستهدف' : 'Target Audience'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isArabic ? 'شخص مستهدف' : 'People reached'}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? 'إدارة الحملات' : 'Campaign Management'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                {isArabic ? 'قم بإنشاء وإدارة حملاتك التسويقية هنا' : 'Create and manage your marketing campaigns here'}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? 'تحليل الجمهور' : 'Audience Analytics'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                {isArabic ? 'احصل على رؤى عميقة حول جمهورك المستهدف' : 'Get deep insights about your target audience'}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? 'التحليلات المتقدمة' : 'Advanced Analytics'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                {isArabic ? 'تقارير مفصلة وتحليلات متقدمة لأدائك' : 'Detailed reports and advanced analytics for your performance'}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? 'إنشاء المحتوى' : 'Content Creation'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                {isArabic ? 'أنشئ محتوى رقمي مميز بمساعدة الذكاء الاصطناعي' : 'Create outstanding digital content with AI assistance'}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
