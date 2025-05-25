
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, DollarSign, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const CampaignsPerformanceTab: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Mock data for campaigns
  const activeCampaigns = [
    { 
      name: isArabic ? 'حملة الصيف 2024' : 'Summer 2024 Campaign',
      budget: 50000,
      spent: 32000,
      clicks: 15240,
      conversions: 1280,
      roas: 3.2,
      status: 'active'
    },
    {
      name: isArabic ? 'حملة المنتج الجديد' : 'New Product Launch',
      budget: 75000,
      spent: 68000,
      clicks: 22100,
      conversions: 1890,
      roas: 2.8,
      status: 'active'
    },
    {
      name: isArabic ? 'حملة العلامة التجارية' : 'Brand Awareness',
      budget: 30000,
      spent: 28500,
      clicks: 18500,
      conversions: 920,
      roas: 2.1,
      status: 'ending'
    }
  ];

  const adPerformanceData = [
    { ad: isArabic ? 'إعلان أ' : 'Ad A', clicks: 3200, conversions: 280, ctr: 3.5, cost: 1200 },
    { ad: isArabic ? 'إعلان ب' : 'Ad B', clicks: 2800, conversions: 240, ctr: 4.1, cost: 980 },
    { ad: isArabic ? 'إعلان ج' : 'Ad C', clicks: 4100, conversions: 380, ctr: 3.8, cost: 1450 },
    { ad: isArabic ? 'إعلان د' : 'Ad D', clicks: 2200, conversions: 190, ctr: 2.9, cost: 850 }
  ];

  const conversionTrendData = [
    { date: isArabic ? 'الأسبوع 1' : 'Week 1', conversions: 320, clicks: 4200 },
    { date: isArabic ? 'الأسبوع 2' : 'Week 2', conversions: 380, clicks: 4800 },
    { date: isArabic ? 'الأسبوع 3' : 'Week 3', conversions: 450, clicks: 5200 },
    { date: isArabic ? 'الأسبوع 4' : 'Week 4', conversions: 520, clicks: 5800 }
  ];

  const budgetDistribution = [
    { channel: isArabic ? 'جوجل' : 'Google Ads', budget: 45, color: '#4285f4' },
    { channel: isArabic ? 'فيسبوك' : 'Facebook', budget: 30, color: '#1877f2' },
    { channel: isArabic ? 'إنستغرام' : 'Instagram', budget: 15, color: '#e4405f' },
    { channel: isArabic ? 'لينكدإن' : 'LinkedIn', budget: 10, color: '#0077b5' }
  ];

  const abTestResults = [
    {
      test: isArabic ? 'اختبار العنوان' : 'Headline Test',
      variantA: { conversions: 280, rate: 3.2 },
      variantB: { conversions: 340, rate: 3.8 },
      winner: 'B',
      confidence: 95
    },
    {
      test: isArabic ? 'اختبار الصورة' : 'Image Test',
      variantA: { conversions: 220, rate: 2.8 },
      variantB: { conversions: 190, rate: 2.4 },
      winner: 'A',
      confidence: 88
    }
  ];

  return (
    <div className={`p-6 h-full overflow-y-auto ${isArabic ? 'rtl' : ''}`}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className={`text-2xl font-bold mb-4 ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? 'لوحة تحكم حملات التسويق والأداء' : 'Marketing Campaigns & Performance Dashboard'}
          </h2>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <DollarSign className="h-5 w-5 text-green-600" />
                <Badge variant="secondary">ROAS</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'عائد الإنفاق الإعلاني' : 'Return on Ad Spend'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">2.8x</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '+0.3x من الشهر الماضي' : '+0.3x from last month'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Target className="h-5 w-5 text-blue-600" />
                <Badge variant="secondary">CTR</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'معدل النقر' : 'Click Through Rate'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">3.6%</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '+0.4% تحسن' : '+0.4% improvement'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <Badge variant="secondary">CVR</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'معدل التحويل' : 'Conversion Rate'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">8.7%</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '+1.2% هذا الشهر' : '+1.2% this month'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <BarChart3 className="h-5 w-5 text-orange-600" />
                <Badge variant="secondary">CPC</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'تكلفة النقرة' : 'Cost Per Click'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">$1.85</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '-$0.23 انخفاض' : '-$0.23 decrease'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Active Campaigns Overview */}
        <Card>
          <CardHeader>
            <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'نظرة عامة على الحملات النشطة' : 'Active Campaigns Overview'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeCampaigns.map((campaign, index) => (
                <div key={index} className={`p-4 border rounded-lg ${isArabic ? 'text-right' : 'text-left'}`}>
                  <div className={`flex justify-between items-start mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <h4 className="font-semibold">{campaign.name}</h4>
                    <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                      {campaign.status === 'active' ? (isArabic ? 'نشطة' : 'Active') : (isArabic ? 'تنتهي قريباً' : 'Ending Soon')}
                    </Badge>
                  </div>
                  <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                    <div>
                      <p className="text-gray-600">{isArabic ? 'الميزانية' : 'Budget'}</p>
                      <p className="font-semibold">${campaign.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{isArabic ? 'المنفق' : 'Spent'}</p>
                      <p className="font-semibold">${campaign.spent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{isArabic ? 'النقرات' : 'Clicks'}</p>
                      <p className="font-semibold">{campaign.clicks.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{isArabic ? 'التحويلات' : 'Conversions'}</p>
                      <p className="font-semibold">{campaign.conversions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">ROAS</p>
                      <p className="font-semibold text-green-600">{campaign.roas}x</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ad Performance Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'مقارنة أداء الإعلانات' : 'Ad Performance Comparison'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={adPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ad" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="conversions" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Conversion Trend */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'اتجاه التحويلات والنقرات' : 'Conversion & Click Trends'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={conversionTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="conversions" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="clicks" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Budget Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'توزيع الميزانية الإعلانية' : 'Ad Budget Distribution'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={budgetDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ channel, budget }) => `${channel} ${budget}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="budget"
                  >
                    {budgetDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* A/B Test Results */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'نتائج اختبارات A/B' : 'A/B Test Results'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {abTestResults.map((test, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${isArabic ? 'text-right' : 'text-left'}`}>
                    <h4 className="font-semibold mb-2">{test.test}</h4>
                    <div className={`grid grid-cols-2 gap-4 text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                      <div className={`p-2 rounded ${test.winner === 'A' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}>
                        <p className="font-medium">{isArabic ? 'النسخة أ' : 'Variant A'}</p>
                        <p>{isArabic ? 'التحويلات:' : 'Conversions:'} {test.variantA.conversions}</p>
                        <p>{isArabic ? 'المعدل:' : 'Rate:'} {test.variantA.rate}%</p>
                      </div>
                      <div className={`p-2 rounded ${test.winner === 'B' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}>
                        <p className="font-medium">{isArabic ? 'النسخة ب' : 'Variant B'}</p>
                        <p>{isArabic ? 'التحويلات:' : 'Conversions:'} {test.variantB.conversions}</p>
                        <p>{isArabic ? 'المعدل:' : 'Rate:'} {test.variantB.rate}%</p>
                      </div>
                    </div>
                    <div className={`mt-2 flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <Badge variant="default">
                        {isArabic ? 'الفائز:' : 'Winner:'} {isArabic ? 'النسخة' : 'Variant'} {test.winner}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {isArabic ? 'مستوى الثقة:' : 'Confidence:'} {test.confidence}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampaignsPerformanceTab;
