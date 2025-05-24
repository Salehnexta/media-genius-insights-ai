
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, PieChart as PieChartIcon, Users, DollarSign } from 'lucide-react';

interface BusinessIntelligenceProps {
  refreshing?: boolean;
}

const BusinessIntelligence: React.FC<BusinessIntelligenceProps> = ({ refreshing }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const performanceData = [
    { 
      category: isArabic ? 'التسويق' : 'Marketing', 
      score: 85, 
      budget: 25000, 
      roi: 320 
    },
    { 
      category: isArabic ? 'المبيعات' : 'Sales', 
      score: 92, 
      budget: 35000, 
      roi: 450 
    },
    { 
      category: isArabic ? 'خدمة العملاء' : 'Customer Service', 
      score: 78, 
      budget: 15000, 
      roi: 210 
    },
    { 
      category: isArabic ? 'التطوير' : 'Development', 
      score: 88, 
      budget: 45000, 
      roi: 280 
    }
  ];

  const customerSegments = [
    { 
      name: isArabic ? 'عملاء جدد' : 'New Customers', 
      value: 35, 
      color: '#8884d8' 
    },
    { 
      name: isArabic ? 'عملاء مخلصون' : 'Loyal Customers', 
      value: 45, 
      color: '#82ca9d' 
    },
    { 
      name: isArabic ? 'عملاء محتملون' : 'Potential Customers', 
      value: 20, 
      color: '#ffc658' 
    }
  ];

  const kpis = [
    {
      title: isArabic ? 'العائد على الاستثمار' : 'Return on Investment',
      value: '324%',
      change: '+12%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: isArabic ? 'قيمة العميل مدى الحياة' : 'Customer Lifetime Value',
      value: '$2,450',
      change: '+8%',
      trend: 'up',
      icon: Users
    },
    {
      title: isArabic ? 'معدل الاحتفاظ' : 'Retention Rate',
      value: '87%',
      change: '+3%',
      trend: 'up',
      icon: BarChart3
    },
    {
      title: isArabic ? 'تكلفة اكتساب العميل' : 'Customer Acquisition Cost',
      value: '$45',
      change: '-5%',
      trend: 'down',
      icon: PieChartIcon
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className={`text-xs ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change} {isArabic ? 'من الشهر الماضي' : 'from last month'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <BarChart3 className="h-5 w-5 text-blue-600" />
              {isArabic ? 'تحليل الأداء حسب القسم' : 'Performance by Department'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#8884d8" name={isArabic ? 'النقاط' : 'Score'} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <PieChartIcon className="h-5 w-5 text-green-600" />
              {isArabic ? 'تقسيم العملاء' : 'Customer Segmentation'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance Details */}
      <Card>
        <CardHeader>
          <CardTitle>
            {isArabic ? 'تفاصيل أداء الأقسام' : 'Department Performance Details'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {performanceData.map((dept, index) => (
              <div key={index} className="space-y-3">
                <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {dept.category}
                  </h4>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {dept.score}/100
                  </Badge>
                </div>
                <Progress value={dept.score} className="h-2" />
                <div className={`grid grid-cols-2 gap-4 text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                  <div>
                    <span className="text-gray-600">
                      {isArabic ? 'الميزانية:' : 'Budget:'}
                    </span>
                    <span className="font-medium ml-2">
                      ${dept.budget.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {isArabic ? 'العائد على الاستثمار:' : 'ROI:'}
                    </span>
                    <span className="font-medium ml-2 text-green-600">
                      {dept.roi}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Business Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {isArabic ? 'رؤى الأعمال الرئيسية' : 'Key Business Insights'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                <h5 className="font-medium text-green-800 dark:text-green-400 mb-1">
                  {isArabic ? 'نمو قوي في المبيعات' : 'Strong Sales Growth'}
                </h5>
                <p className="text-sm text-green-700 dark:text-green-500">
                  {isArabic ? 'زيادة 23% في المبيعات مقارنة بالربع الماضي' : '23% increase in sales compared to last quarter'}
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                <h5 className="font-medium text-blue-800 dark:text-blue-400 mb-1">
                  {isArabic ? 'تحسن في رضا العملاء' : 'Improved Customer Satisfaction'}
                </h5>
                <p className="text-sm text-blue-700 dark:text-blue-500">
                  {isArabic ? 'ارتفاع درجة رضا العملاء إلى 4.8/5' : 'Customer satisfaction score increased to 4.8/5'}
                </p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                <h5 className="font-medium text-orange-800 dark:text-orange-400 mb-1">
                  {isArabic ? 'فرصة تحسين' : 'Optimization Opportunity'}
                </h5>
                <p className="text-sm text-orange-700 dark:text-orange-500">
                  {isArabic ? 'يمكن تحسين معدل التحويل بنسبة 15%' : 'Conversion rate can be improved by 15%'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {isArabic ? 'توصيات استراتيجية' : 'Strategic Recommendations'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                    {isArabic ? 'استثمار في التسويق الرقمي' : 'Invest in Digital Marketing'}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {isArabic ? 'زيادة الميزانية بنسبة 20% لتحسين الوصول' : 'Increase budget by 20% to improve reach'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                    {isArabic ? 'تحسين تجربة العميل' : 'Enhance Customer Experience'}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {isArabic ? 'تطوير برنامج ولاء العملاء' : 'Develop customer loyalty program'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                    {isArabic ? 'توسيع المنتجات' : 'Product Expansion'}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {isArabic ? 'استكشاف أسواق جديدة للنمو' : 'Explore new markets for growth'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessIntelligence;
