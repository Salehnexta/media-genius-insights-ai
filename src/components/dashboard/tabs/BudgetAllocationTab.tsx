
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Target, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BudgetAllocationTab: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const budgetData = [
    { name: isArabic ? 'الإعلانات المدفوعة' : 'Paid Ads', value: 45, amount: 45000, roi: '3.2x' },
    { name: isArabic ? 'وسائل التواصل' : 'Social Media', value: 25, amount: 25000, roi: '2.8x' },
    { name: isArabic ? 'تسويق المحتوى' : 'Content Marketing', value: 20, amount: 20000, roi: '4.1x' },
    { name: isArabic ? 'SEO' : 'SEO', value: 10, amount: 10000, roi: '5.2x' }
  ];

  const roiData = [
    { channel: isArabic ? 'الإعلانات المدفوعة' : 'Paid Ads', roi: 320, cost: 45000 },
    { channel: isArabic ? 'وسائل التواصل' : 'Social Media', roi: 280, cost: 25000 },
    { channel: isArabic ? 'تسويق المحتوى' : 'Content Marketing', roi: 410, cost: 20000 },
    { channel: 'SEO', roi: 520, cost: 10000 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className={`p-6 h-full overflow-y-auto ${isArabic ? 'rtl' : ''}`}>
      <div className="space-y-6">
        {/* Budget Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardHeader className="pb-2">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <DollarSign className="h-5 w-5 text-blue-600" />
                <Badge variant="secondary">
                  {isArabic ? 'شهري' : 'Monthly'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
                <div className="text-2xl font-bold text-blue-700">$100K</div>
                <p className="text-sm text-blue-600">
                  {isArabic ? 'إجمالي الميزانية' : 'Total Budget'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardHeader className="pb-2">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <TrendingUp className="h-5 w-5 text-green-600" />
                <Badge variant="default">
                  {isArabic ? 'متوسط' : 'Average'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
                <div className="text-2xl font-bold text-green-700">3.5x</div>
                <p className="text-sm text-green-600">
                  {isArabic ? 'متوسط العائد على الاستثمار' : 'Average ROI'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardHeader className="pb-2">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Target className="h-5 w-5 text-purple-600" />
                <Badge variant="outline">
                  {isArabic ? 'مستهدف' : 'Target'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
                <div className="text-2xl font-bold text-purple-700">4.0x</div>
                <p className="text-sm text-purple-600">
                  {isArabic ? 'الهدف المطلوب' : 'Target ROI'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
            <CardHeader className="pb-2">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Zap className="h-5 w-5 text-orange-600" />
                <Badge variant="destructive">
                  {isArabic ? 'تحسين' : 'Optimize'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
                <div className="text-2xl font-bold text-orange-700">+15%</div>
                <p className="text-sm text-orange-600">
                  {isArabic ? 'إمكانية التحسين' : 'Optimization Potential'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Budget Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'توزيع الميزانية التفاعلي' : 'Interactive Budget Distribution'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* ROI Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'تحليل العائد على الاستثمار حسب القناة' : 'ROI Analysis by Channel'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={roiData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="channel" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="roi" fill="#3B82F6" name={isArabic ? 'العائد %' : 'ROI %'} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Budget Optimization Tools */}
        <Card>
          <CardHeader>
            <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'أدوات تحسين الميزانية (مدعومة بتحليلات Brandwatch)' : 'Budget Optimization Tools (Powered by Brandwatch Analytics)'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {budgetData.map((item, index) => (
                <div key={index} className={`p-4 border rounded-lg ${isArabic ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`font-semibold ${isArabic ? 'order-2' : 'order-1'}`}>{item.name}</div>
                    <div className={`text-sm font-bold text-green-600 ${isArabic ? 'order-1' : 'order-2'}`}>{item.roi}</div>
                  </div>
                  <div className="text-lg font-bold">${item.amount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{item.value}% {isArabic ? 'من الميزانية' : 'of budget'}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetAllocationTab;
