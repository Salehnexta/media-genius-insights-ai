
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target, TrendingUp, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const StrategicInitiativesTab: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const initiatives = [
    {
      title: isArabic ? 'حملة إطلاق المنتج الجديد' : 'New Product Launch Campaign',
      status: 'active',
      progress: 75,
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      budget: 50000,
      impact: 'high'
    },
    {
      title: isArabic ? 'استراتيجية التسويق الرقمي Q2' : 'Q2 Digital Marketing Strategy',
      status: 'planning',
      progress: 30,
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      budget: 75000,
      impact: 'high'
    },
    {
      title: isArabic ? 'تحسين تجربة العملاء' : 'Customer Experience Optimization',
      status: 'completed',
      progress: 100,
      startDate: '2023-11-01',
      endDate: '2024-01-31',
      budget: 25000,
      impact: 'medium'
    }
  ];

  const influencerData = [
    {
      name: 'Sarah Ahmed',
      platform: 'Instagram',
      followers: '250K',
      engagement: '4.2%',
      category: isArabic ? 'نمط الحياة' : 'Lifestyle',
      status: 'active'
    },
    {
      name: 'Mohamed Ali',
      platform: 'YouTube',
      followers: '180K',
      engagement: '6.8%',
      category: isArabic ? 'التكنولوجيا' : 'Technology',
      status: 'pending'
    },
    {
      name: 'Fatima Hassan',
      platform: 'TikTok',
      followers: '320K',
      engagement: '8.1%',
      category: isArabic ? 'الأزياء' : 'Fashion',
      status: 'active'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'active':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'planning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return isArabic ? 'مكتمل' : 'Completed';
      case 'active':
        return isArabic ? 'نشط' : 'Active';
      case 'planning':
        return isArabic ? 'قيد التخطيط' : 'Planning';
      default:
        return status;
    }
  };

  return (
    <div className={`p-6 h-full overflow-y-auto ${isArabic ? 'rtl' : ''}`}>
      <div className="space-y-6">
        {/* Initiatives Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
              <Calendar className="h-5 w-5" />
              {isArabic ? 'الجدول الزمني للمبادرات' : 'Initiatives Timeline'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {initiatives.map((initiative, index) => (
                <div key={index} className={`p-4 border rounded-lg ${isArabic ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-center justify-between mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <h3 className="font-semibold">{initiative.title}</h3>
                      {getStatusIcon(initiative.status)}
                    </div>
                    <Badge variant={initiative.status === 'completed' ? 'default' : 'secondary'}>
                      {getStatusText(initiative.status)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">
                        {isArabic ? 'التقدم' : 'Progress'}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${initiative.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold">{initiative.progress}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">
                        {isArabic ? 'تاريخ البداية' : 'Start Date'}
                      </p>
                      <p className="text-sm font-semibold">
                        {new Date(initiative.startDate).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">
                        {isArabic ? 'تاريخ الانتهاء' : 'End Date'}
                      </p>
                      <p className="text-sm font-semibold">
                        {new Date(initiative.endDate).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">
                        {isArabic ? 'الميزانية' : 'Budget'}
                      </p>
                      <p className="text-sm font-semibold">${initiative.budget.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Campaign Impact Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                <TrendingUp className="h-5 w-5" />
                {isArabic ? 'تتبع تأثير الحملات' : 'Campaign Impact Tracking'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                  <div>
                    <p className="font-semibold">{isArabic ? 'زيادة الوعي بالعلامة التجارية' : 'Brand Awareness Increase'}</p>
                    <p className="text-sm text-gray-600">{isArabic ? 'خلال الشهر الماضي' : 'Over past month'}</p>
                  </div>
                  <div className="text-2xl font-bold text-green-600">+23%</div>
                </div>
                
                <div className={`flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                  <div>
                    <p className="font-semibold">{isArabic ? 'معدل التحويل' : 'Conversion Rate'}</p>
                    <p className="text-sm text-gray-600">{isArabic ? 'متوسط الحملات النشطة' : 'Active campaigns average'}</p>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">4.8%</div>
                </div>
                
                <div className={`flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                  <div>
                    <p className="font-semibold">{isArabic ? 'تكلفة اكتساب العميل' : 'Customer Acquisition Cost'}</p>
                    <p className="text-sm text-gray-600">{isArabic ? 'انخفاض من الشهر السابق' : 'Decreased from last month'}</p>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">$45</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Influencer Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                <Users className="h-5 w-5" />
                {isArabic ? 'تحليل المؤثرين من Brandwatch' : 'Influencer Analysis from Brandwatch'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {influencerData.map((influencer, index) => (
                  <div key={index} className={`p-3 border rounded-lg ${isArabic ? 'text-right' : 'text-left'}`}>
                    <div className={`flex items-center justify-between mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div>
                        <p className="font-semibold">{influencer.name}</p>
                        <p className="text-sm text-gray-600">{influencer.platform}</p>
                      </div>
                      <Badge variant={influencer.status === 'active' ? 'default' : 'secondary'}>
                        {influencer.status === 'active' 
                          ? (isArabic ? 'نشط' : 'Active')
                          : (isArabic ? 'في الانتظار' : 'Pending')
                        }
                      </Badge>
                    </div>
                    
                    <div className={`grid grid-cols-3 gap-2 text-sm ${isArabic ? 'text-right' : 'text-left'}`}>
                      <div>
                        <span className="text-gray-600">{isArabic ? 'المتابعون:' : 'Followers:'}</span>
                        <br />
                        <span className="font-semibold">{influencer.followers}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">{isArabic ? 'المشاركة:' : 'Engagement:'}</span>
                        <br />
                        <span className="font-semibold">{influencer.engagement}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">{isArabic ? 'الفئة:' : 'Category:'}</span>
                        <br />
                        <span className="font-semibold">{influencer.category}</span>
                      </div>
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

export default StrategicInitiativesTab;
