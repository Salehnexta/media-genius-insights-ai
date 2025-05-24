
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Target, DollarSign, Users, BarChart3, Lightbulb } from 'lucide-react';
import { Agent } from '../MarketingDashboard';

interface CampaignPerformanceWorkspaceProps {
  agent: Agent;
  isArabic: boolean;
}

const CampaignPerformanceWorkspace: React.FC<CampaignPerformanceWorkspaceProps> = ({ agent, isArabic }) => {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <span className="text-3xl">{agent.icon}</span>
        <div className={isArabic ? 'text-right' : ''}>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {agent.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isArabic ? 'التحليلات والحملات' : 'Analytics & Campaigns'}
          </p>
        </div>
      </div>

      {/* Campaign Performance & Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'أداء الحملات' : 'Campaign Performance'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Target className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{isArabic ? 'الحملات النشطة:' : 'Active Campaigns:'}</span>
              </div>
              <span className="font-bold">3</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'إجمالي الإنفاق:' : 'Total Spend:'}</span>
              <span className="font-bold">$12,456</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'الإيرادات المولدة:' : 'Revenue Generated:'}</span>
              <span className="font-bold text-green-600">$52,314</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'صافي الربح:' : 'Net Profit:'}</span>
              <span className="font-bold text-green-600">$39,858</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'المقاييس الرئيسية' : 'Key Metrics'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-sm">{isArabic ? 'عائد الاستثمار الإعلاني:' : 'ROAS:'}</span>
              </div>
              <div className={`flex items-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="font-bold text-green-600">4.2x</span>
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'تكلفة الاستحواذ:' : 'CPA:'}</span>
              <div className={`flex items-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="font-bold text-green-600">$45</span>
                <TrendingDown className="h-3 w-3 text-green-600" />
              </div>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'معدل النقر:' : 'CTR:'}</span>
              <div className={`flex items-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="font-bold text-green-600">3.4%</span>
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'معدل التحويل:' : 'Conversion:'}</span>
              <span className="font-bold">12%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 'الحملات النشطة' : 'Active Campaigns'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-lg p-4">
            <div className={`flex items-center justify-between mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-lg">🎯</span>
                <h3 className="font-semibold">
                  {isArabic ? 'الوعي بالعلامة التجارية للربع الأول' : 'Brand Awareness Q1'}
                </h3>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                ⭐ {isArabic ? '23% فوق الهدف' : '23% above target'}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'الميزانية: $5,000 | المنفق: $3,750' : 'Budget: $5,000 | Spent: $3,750'}</span>
                <span className="font-bold">(75%)</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className={`flex justify-between text-xs text-gray-600 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'جوجل ادز: $2,400' : 'Google Ads: $2,400'}</span>
                <span>{isArabic ? 'فيسبوك: $1,350' : 'Facebook: $1,350'}</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className={`flex items-center justify-between mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-lg">🚀</span>
                <h3 className="font-semibold">
                  {isArabic ? 'حملة إطلاق المنتج' : 'Product Launch Campaign'}
                </h3>
              </div>
              <Badge variant="outline">{isArabic ? 'التخطيط' : 'Planning'}</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'الميزانية:' : 'Budget:'}</span>
                <span>$3,000</span>
              </div>
              <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'تاريخ الإطلاق:' : 'Launch Date:'}</span>
                <span>{isArabic ? 'الاثنين القادم' : 'Next Monday'}</span>
              </div>
              <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'عائد الاستثمار المتوقع:' : 'Expected ROAS:'}</span>
                <span>3.5x</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className={`flex items-center justify-between mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-lg">📈</span>
                <h3 className="font-semibold">
                  {isArabic ? 'حملة جذب العملاء المحتملين' : 'Lead Generation Drive'}
                </h3>
              </div>
              <Badge variant="secondary">{isArabic ? 'التحسين' : 'Optimization'}</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'الميزانية: $2,000' : 'Budget: $2,000'}</span>
                <span>{isArabic ? 'الحالة: التحسين' : 'Status: Optimization'}</span>
              </div>
              <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{isArabic ? 'العملاء المحتملون: 156' : 'Leads: 156'}</span>
                <span>{isArabic ? 'التكلفة لكل عميل: $12.82' : 'Cost per Lead: $12.82'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Funnel & Optimization Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'قمع التحويل' : 'Conversion Funnel'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{isArabic ? 'الزيارات:' : 'Traffic:'}</span>
              </div>
              <span className="font-bold">10,000</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'النقرات:' : 'Clicks:'}</span>
              <span className="font-bold">2,400 <span className="text-gray-600">(24%)</span></span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'العملاء المحتملون:' : 'Leads:'}</span>
              <span className="font-bold">288 <span className="text-gray-600">(12%)</span></span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'المبيعات:' : 'Sales:'}</span>
              <span className="font-bold">36 <span className="text-gray-600">(12.5%)</span></span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'الإيرادات:' : 'Revenue:'}</span>
              <span className="font-bold text-green-600">$52,314</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'نصائح التحسين' : 'Optimization Tips'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className={`flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Lightbulb className="h-4 w-4 text-blue-500" />
              <span className="text-sm">
                {isArabic ? 'زيادة ميزانية الهواتف المحمولة' : 'Increase mobile budget'}
              </span>
            </div>
            <div className={`flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Lightbulb className="h-4 w-4 text-green-500" />
              <span className="text-sm">
                {isArabic ? 'اختبار إبداعات إعلانية جديدة' : 'Test new ad creative'}
              </span>
            </div>
            <div className={`flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Lightbulb className="h-4 w-4 text-purple-500" />
              <span className="text-sm">
                {isArabic ? 'توسيع الجمهور الرابح' : 'Expand winning audience'}
              </span>
            </div>
            <div className={`flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Lightbulb className="h-4 w-4 text-orange-500" />
              <span className="text-sm">
                {isArabic ? 'تحسين صفحة الهبوط' : 'Optimize landing page'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignPerformanceWorkspace;
