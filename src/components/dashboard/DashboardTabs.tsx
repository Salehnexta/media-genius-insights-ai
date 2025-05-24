
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, TrendingUp, MessageSquare, PenTool, Target } from 'lucide-react';
import ChatSection from './ChatSection';
import MockDataCards from './MockDataCards';

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
      id: 'chat',
      label: isArabic ? 'المساعد الذكي' : 'AI Assistant',
      icon: <MessageSquare className="h-4 w-4" />
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
          <MockDataCards />
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <BarChart3 className="h-5 w-5" />
                  {isArabic ? 'الأداء الأسبوعي' : 'Weekly Performance'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm text-gray-600">{isArabic ? 'المشاهدات' : 'Views'}</span>
                    <span className="font-semibold">342K</span>
                  </div>
                  <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm text-gray-600">{isArabic ? 'التفاعل' : 'Engagement'}</span>
                    <span className="font-semibold">8.4%</span>
                  </div>
                  <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm text-gray-600">{isArabic ? 'النمو' : 'Growth'}</span>
                    <span className="font-semibold text-green-600">+23%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Target className="h-5 w-5" />
                  {isArabic ? 'أفضل الحملات' : 'Top Campaigns'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm">{isArabic ? 'حملة الصيف 2024' : 'Summer Campaign 2024'}</span>
                    <span className="text-green-600 font-semibold">94% CTR</span>
                  </div>
                  <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm">{isArabic ? 'منتج جديد' : 'New Product Launch'}</span>
                    <span className="text-blue-600 font-semibold">87% CTR</span>
                  </div>
                  <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm">{isArabic ? 'عروض رمضان' : 'Ramadan Offers'}</span>
                    <span className="text-purple-600 font-semibold">92% CTR</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h2 className={`text-2xl font-bold mb-4 ${isArabic ? 'text-right' : ''}`}>
                {isArabic ? 'مساعد التسويق الذكي' : 'AI Marketing Assistant'}
              </h2>
              <p className={`text-gray-600 dark:text-gray-300 mb-6 ${isArabic ? 'text-right' : ''}`}>
                {isArabic ? 'تحدث مع مساعدك الذكي للحصول على رؤى تسويقية وتوصيات مخصصة' : 'Chat with your AI assistant for marketing insights and personalized recommendations'}
              </p>
            </div>
            <ChatSection />
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? 'إدارة الحملات' : 'Campaign Management'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`border rounded-lg p-4 ${isArabic ? 'text-right' : ''}`}>
                  <h3 className="font-semibold mb-2">{isArabic ? 'حملة الصيف 2024' : 'Summer Campaign 2024'}</h3>
                  <p className="text-sm text-gray-600 mb-2">{isArabic ? 'حالة: نشطة | الميزانية: 15,000 ريال' : 'Status: Active | Budget: $4,000'}</p>
                  <div className="flex gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{isArabic ? 'نشطة' : 'Active'}</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{isArabic ? 'وسائل التواصل' : 'Social Media'}</span>
                  </div>
                </div>
                
                <div className={`border rounded-lg p-4 ${isArabic ? 'text-right' : ''}`}>
                  <h3 className="font-semibold mb-2">{isArabic ? 'منتج جديد' : 'New Product Launch'}</h3>
                  <p className="text-sm text-gray-600 mb-2">{isArabic ? 'حالة: مجدولة | الميزانية: 8,000 ريال' : 'Status: Scheduled | Budget: $2,200'}</p>
                  <div className="flex gap-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">{isArabic ? 'مجدولة' : 'Scheduled'}</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">{isArabic ? 'متعدد القنوات' : 'Multi-channel'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? 'تحليل الجمهور' : 'Audience Analytics'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`font-semibold mb-3 ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'التوزيع العمري' : 'Age Distribution'}</h3>
                  <div className="space-y-2">
                    <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span>18-24</span><span className="font-semibold">28%</span>
                    </div>
                    <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span>25-34</span><span className="font-semibold">35%</span>
                    </div>
                    <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span>35-44</span><span className="font-semibold">23%</span>
                    </div>
                    <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span>45+</span><span className="font-semibold">14%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className={`font-semibold mb-3 ${isArabic ? 'text-right' : ''}`}>{isArabic ? 'أفضل المواقع' : 'Top Locations'}</h3>
                  <div className="space-y-2">
                    <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span>{isArabic ? 'الرياض' : 'Riyadh'}</span><span className="font-semibold">32%</span>
                    </div>
                    <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span>{isArabic ? 'جدة' : 'Jeddah'}</span><span className="font-semibold">24%</span>
                    </div>
                    <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span>{isArabic ? 'الدمام' : 'Dammam'}</span><span className="font-semibold">18%</span>
                    </div>
                    <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span>{isArabic ? 'أخرى' : 'Others'}</span><span className="font-semibold">26%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? 'التحليلات المتقدمة' : 'Advanced Analytics'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-semibold">{isArabic ? 'نمو الشهر' : 'Monthly Growth'}</h3>
                  <p className="text-2xl font-bold text-green-600">+18.4%</p>
                </div>
                <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold">{isArabic ? 'عملاء جدد' : 'New Customers'}</h3>
                  <p className="text-2xl font-bold text-blue-600">2,347</p>
                </div>
                <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
                  <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold">{isArabic ? 'معدل التحويل' : 'Conversion Rate'}</h3>
                  <p className="text-2xl font-bold text-purple-600">4.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
