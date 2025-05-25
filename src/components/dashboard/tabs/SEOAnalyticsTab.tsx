
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, BarChart3, Users, Globe, MousePointer } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const SEOAnalyticsTab: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Mock data for SEO analytics
  const keywordRankingData = [
    { keyword: isArabic ? 'تسويق رقمي' : 'Digital Marketing', currentRank: 3, previousRank: 5, searchVolume: 12000, clicks: 850 },
    { keyword: isArabic ? 'تحسين محركات البحث' : 'SEO Optimization', currentRank: 1, previousRank: 2, searchVolume: 8500, clicks: 1200 },
    { keyword: isArabic ? 'وسائل التواصل الاجتماعي' : 'Social Media Marketing', currentRank: 7, previousRank: 8, searchVolume: 15000, clicks: 420 },
    { keyword: isArabic ? 'تحليل البيانات' : 'Data Analytics', currentRank: 4, previousRank: 6, searchVolume: 6800, clicks: 680 },
    { keyword: isArabic ? 'التجارة الإلكترونية' : 'E-commerce', currentRank: 2, previousRank: 3, searchVolume: 9200, clicks: 980 }
  ];

  const organicTrafficData = [
    { month: isArabic ? 'يناير' : 'Jan', organic: 12500, paid: 8200 },
    { month: isArabic ? 'فبراير' : 'Feb', organic: 13800, paid: 7800 },
    { month: isArabic ? 'مارس' : 'Mar', organic: 15200, paid: 8500 },
    { month: isArabic ? 'أبريل' : 'Apr', organic: 16800, paid: 9200 },
    { month: isArabic ? 'مايو' : 'May', organic: 18500, paid: 8900 },
    { month: isArabic ? 'يونيو' : 'Jun', organic: 20200, paid: 9800 }
  ];

  const trafficSourcesData = [
    { source: isArabic ? 'البحث العضوي' : 'Organic Search', visits: 45, color: '#10b981' },
    { source: isArabic ? 'الإعلانات المدفوعة' : 'Paid Ads', visits: 25, color: '#3b82f6' },
    { source: isArabic ? 'وسائل التواصل' : 'Social Media', visits: 20, color: '#8b5cf6' },
    { source: isArabic ? 'المراجع' : 'Referrals', visits: 10, color: '#f59e0b' }
  ];

  const pagePerformanceData = [
    { page: isArabic ? 'الصفحة الرئيسية' : 'Homepage', visits: 15200, bounceRate: 35, avgTime: 240 },
    { page: isArabic ? 'صفحة المنتجات' : 'Products Page', visits: 12800, bounceRate: 42, avgTime: 180 },
    { page: isArabic ? 'المدونة' : 'Blog', visits: 9500, bounceRate: 28, avgTime: 320 },
    { page: isArabic ? 'من نحن' : 'About Us', visits: 6200, bounceRate: 48, avgTime: 150 },
    { page: isArabic ? 'اتصل بنا' : 'Contact', visits: 4800, bounceRate: 52, avgTime: 120 }
  ];

  const conversionFunnelData = [
    { stage: isArabic ? 'الزوار' : 'Visitors', count: 10000, percentage: 100 },
    { stage: isArabic ? 'مشاهدة المنتج' : 'Product Views', count: 6500, percentage: 65 },
    { stage: isArabic ? 'إضافة للسلة' : 'Add to Cart', count: 2800, percentage: 28 },
    { stage: isArabic ? 'بدء الدفع' : 'Checkout', count: 1200, percentage: 12 },
    { stage: isArabic ? 'إتمام الشراء' : 'Purchase', count: 850, percentage: 8.5 }
  ];

  const searchQueries = [
    { query: isArabic ? 'أفضل شركة تسويق' : 'Best marketing company', impressions: 28500, clicks: 1250, ctr: 4.4 },
    { query: isArabic ? 'خدمات تحسين محركات البحث' : 'SEO services', impressions: 18200, clicks: 980, ctr: 5.4 },
    { query: isArabic ? 'استراتيجية التسويق الرقمي' : 'Digital marketing strategy', impressions: 15600, clicks: 720, ctr: 4.6 },
    { query: isArabic ? 'تحليل مواقع الويب' : 'Website analytics', impressions: 12800, clicks: 580, ctr: 4.5 },
    { query: isArabic ? 'أدوات التسويق' : 'Marketing tools', impressions: 9800, clicks: 420, ctr: 4.3 }
  ];

  return (
    <div className={`p-6 h-full overflow-y-auto ${isArabic ? 'rtl' : ''}`}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className={`text-2xl font-bold mb-4 ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? 'لوحة تحكم تحسين محركات البحث وتحليلات البيانات' : 'SEO & Data Analytics Dashboard'}
          </h2>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Search className="h-5 w-5 text-blue-600" />
                <Badge variant="secondary">Organic</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'الزيارات العضوية' : 'Organic Traffic'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">20.2K</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '+15% هذا الشهر' : '+15% this month'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <TrendingUp className="h-5 w-5 text-green-600" />
                <Badge variant="secondary">Keywords</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'متوسط ترتيب الكلمات' : 'Avg Keyword Ranking'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">3.4</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? 'تحسن بـ 1.2 مراكز' : '+1.2 positions improvement'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <MousePointer className="h-5 w-5 text-purple-600" />
                <Badge variant="secondary">CTR</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'معدل النقر العضوي' : 'Organic Click Rate'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">4.7%</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '+0.8% تحسن' : '+0.8% improvement'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <BarChart3 className="h-5 w-5 text-orange-600" />
                <Badge variant="secondary">Bounce</Badge>
              </div>
              <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'معدل الارتداد' : 'Bounce Rate'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">38%</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic ? '-5% انخفاض' : '-5% decrease'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Keyword Rankings Table */}
        <Card>
          <CardHeader>
            <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'ترتيب الكلمات الرئيسية' : 'Keyword Rankings'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className={`py-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'الكلمة الرئيسية' : 'Keyword'}
                    </th>
                    <th className={`py-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'الترتيب الحالي' : 'Current Rank'}
                    </th>
                    <th className={`py-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'التغيير' : 'Change'}
                    </th>
                    <th className={`py-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'حجم البحث' : 'Search Volume'}
                    </th>
                    <th className={`py-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'النقرات' : 'Clicks'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {keywordRankingData.map((keyword, index) => (
                    <tr key={index} className="border-b">
                      <td className={`py-3 font-medium ${isArabic ? 'text-right' : 'text-left'}`}>
                        {keyword.keyword}
                      </td>
                      <td className={`py-3 ${isArabic ? 'text-right' : 'text-left'}`}>
                        <Badge variant="outline">#{keyword.currentRank}</Badge>
                      </td>
                      <td className={`py-3 ${isArabic ? 'text-right' : 'text-left'}`}>
                        <div className={`flex items-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                          {keyword.currentRank < keyword.previousRank ? (
                            <>
                              <TrendingUp className="h-4 w-4 text-green-600" />
                              <span className="text-green-600">+{keyword.previousRank - keyword.currentRank}</span>
                            </>
                          ) : keyword.currentRank > keyword.previousRank ? (
                            <>
                              <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
                              <span className="text-red-600">-{keyword.currentRank - keyword.previousRank}</span>
                            </>
                          ) : (
                            <span className="text-gray-600">-</span>
                          )}
                        </div>
                      </td>
                      <td className={`py-3 ${isArabic ? 'text-right' : 'text-left'}`}>
                        {keyword.searchVolume.toLocaleString()}
                      </td>
                      <td className={`py-3 ${isArabic ? 'text-right' : 'text-left'}`}>
                        {keyword.clicks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Organic vs Paid Traffic */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'الزيارات العضوية مقابل المدفوعة' : 'Organic vs Paid Traffic'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={organicTrafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="organic" fill="#10b981" />
                  <Bar dataKey="paid" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'مصادر حركة المرور' : 'Traffic Sources'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trafficSourcesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ source, visits }) => `${source} ${visits}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="visits"
                  >
                    {trafficSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Page Performance */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'أداء صفحات الموقع' : 'Page Performance'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pagePerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="page" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visits" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'مسار تحويل المستخدمين' : 'User Conversion Funnel'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {conversionFunnelData.map((stage, index) => (
                  <div key={index} className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="font-medium">{stage.stage}</span>
                    <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full" 
                          style={{ width: `${stage.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">{stage.count.toLocaleString()}</span>
                      <span className="text-sm text-gray-600">({stage.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Queries Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'تحليل عبارات البحث المستخدمة' : 'Search Queries Analysis'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchQueries.map((query, index) => (
                <div key={index} className={`p-4 border rounded-lg ${isArabic ? 'text-right' : 'text-left'}`}>
                  <h4 className="font-semibold mb-2">{query.query}</h4>
                  <div className={`grid grid-cols-3 gap-4 text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                    <div>
                      <p className="text-gray-600">{isArabic ? 'الظهور' : 'Impressions'}</p>
                      <p className="font-semibold">{query.impressions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{isArabic ? 'النقرات' : 'Clicks'}</p>
                      <p className="font-semibold">{query.clicks}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">CTR</p>
                      <p className="font-semibold">{query.ctr}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SEOAnalyticsTab;
