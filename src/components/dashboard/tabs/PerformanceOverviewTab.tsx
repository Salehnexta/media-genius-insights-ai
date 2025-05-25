
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Users, AlertTriangle, Activity } from 'lucide-react';
import { getChartConfig, getOverviewData, getSentimentData, getShareOfVoiceData } from '../ChartConfig';
import PerformanceTrendsChart from '../charts/PerformanceTrendsChart';
import SentimentAnalysisChart from '../charts/SentimentAnalysisChart';
import ShareOfVoiceChart from '../charts/ShareOfVoiceChart';

const PerformanceOverviewTab: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const chartConfig = getChartConfig();
  const overviewData = getOverviewData();
  const sentimentData = getSentimentData();
  const shareOfVoiceData = getShareOfVoiceData();

  const agents = [
    {
      name: isArabic ? 'مدير التسويق الذكي' : 'AI Marketing Manager',
      status: 'active',
      kpi: '92%',
      description: isArabic ? 'إدارة الحملات والاستراتيجية' : 'Campaign & Strategy Management'
    },
    {
      name: isArabic ? 'أخصائي المحتوى' : 'Content Specialist',
      status: 'active',
      kpi: '87%',
      description: isArabic ? 'إنشاء وتحسين المحتوى' : 'Content Creation & Optimization'
    },
    {
      name: isArabic ? 'محلل البيانات' : 'Data Analyst',
      status: 'busy',
      kpi: '95%',
      description: isArabic ? 'تحليل الأداء والرؤى' : 'Performance Analysis & Insights'
    },
    {
      name: isArabic ? 'مدير وسائل التواصل' : 'Social Media Manager',
      status: 'active',
      kpi: '89%',
      description: isArabic ? 'إدارة المنصات الاجتماعية' : 'Social Platform Management'
    }
  ];

  return (
    <div className={`p-6 h-full overflow-y-auto ${isArabic ? 'rtl' : ''}`}>
      <div className="space-y-6">
        {/* AI Agents Performance Cards */}
        <div>
          <h2 className={`text-2xl font-bold mb-4 ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? 'وكلاء التسويق الذكي' : 'AI Marketing Agents'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map((agent, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Brain className="h-5 w-5 text-blue-600" />
                    <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                      {agent.status === 'active' 
                        ? (isArabic ? 'نشط' : 'Active')
                        : (isArabic ? 'مشغول' : 'Busy')
                      }
                    </Badge>
                  </div>
                  <CardTitle className={`text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                    {agent.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`space-y-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                    <div className="text-2xl font-bold text-green-600">{agent.kpi}</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {agent.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <PerformanceTrendsChart 
              data={overviewData} 
              chartConfig={chartConfig} 
            />
            <ShareOfVoiceChart 
              data={shareOfVoiceData} 
              chartConfig={chartConfig} 
            />
          </div>
          
          <div className="space-y-6">
            <SentimentAnalysisChart 
              data={sentimentData} 
              chartConfig={chartConfig} 
            />
            
            {/* Emerging Trends & Real-time Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                  <TrendingUp className="h-5 w-5" />
                  {isArabic ? 'الاتجاهات الناشئة والتنبيهات' : 'Emerging Trends & Alerts'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className={`flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                    <Activity className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">
                        {isArabic ? 'زيادة في المشاركة بنسبة 15%' : '15% increase in engagement'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {isArabic ? 'خلال الأسبوع الماضي' : 'Over the past week'}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium">
                        {isArabic ? 'انخفاض طفيف في التحويلات' : 'Slight decrease in conversions'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {isArabic ? 'يتطلب المراجعة' : 'Requires review'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceOverviewTab;
