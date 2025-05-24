
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Image, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Agent } from '../MarketingDashboard';

interface SocialCreatorWorkspaceProps {
  agent: Agent;
  isArabic: boolean;
}

const SocialCreatorWorkspace: React.FC<SocialCreatorWorkspaceProps> = ({ agent, isArabic }) => {
  const weekDays = isArabic 
    ? ['الأحد', 'السبت', 'الجمعة', 'الخميس', 'الأربعاء', 'الثلاثاء', 'الاثنين']
    : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const contentTypes = ['📸', '📹', '📝', '🎨', '📊', '🎉', '💡'];
  const contentLabels = isArabic 
    ? ['منشور', 'فيديو', 'اقتباس', 'نصيحة', 'رسم بياني', 'مرح', 'فكرة']
    : ['Post', 'Video', 'Quote', 'Tip', 'Chart', 'Fun', 'Idea'];

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
            {isArabic ? 'المحتوى والنشر' : 'Content & Publishing'}
          </p>
        </div>
      </div>

      {/* Content Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 'تقويم محتوى هذا الأسبوع' : 'This Week\'s Content Calendar'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-xs font-medium text-gray-600 mb-2">{day}</div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 min-h-[80px] space-y-1">
                  <div className="text-2xl">{index === 0 ? '✅' : '📅'}{contentTypes[index]}</div>
                  <div className="text-xs text-gray-600">{contentLabels[index]}</div>
                  <div className="text-xs text-gray-500">
                    {index === 0 ? '9AM' : index === 1 ? '12PM' : index === 2 ? '6PM' : '9AM'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`flex items-center gap-4 text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span>{isArabic ? 'المنصات:' : 'Platforms:'}</span>
            <div className={`flex gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Badge variant="secondary">IG✅</Badge>
              <Badge variant="secondary">FB✅</Badge>
              <Badge variant="secondary">TW✅</Badge>
              <Badge variant="secondary">LI✅</Badge>
              <Badge variant="outline">TT⏳</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance & Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'أداء المحتوى' : 'Content Performance'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{isArabic ? 'متوسط التفاعل:' : 'Avg Engagement:'}</span>
              </div>
              <span className="font-bold">4.2%</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Clock className="h-4 w-4 text-green-500" />
                <span className="text-sm">{isArabic ? 'أفضل وقت:' : 'Best Time:'}</span>
              </div>
              <span className="font-bold">6 PM</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Image className="h-4 w-4 text-purple-500" />
                <span className="text-sm">{isArabic ? 'أفضل منصة:' : 'Top Platform:'}</span>
              </div>
              <span className="font-bold">Instagram</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Users className="h-4 w-4 text-orange-500" />
                <span className="text-sm">{isArabic ? 'معدل النمو:' : 'Growth Rate:'}</span>
              </div>
              <div className={`flex items-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="font-bold text-green-600">+12%</span>
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'طابور النشر' : 'Publishing Queue'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">{isArabic ? 'جاهز:' : 'Ready:'}</span>
              </div>
              <span className="font-bold">8 {isArabic ? 'منشورات' : 'posts'}</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{isArabic ? 'مراجعة:' : 'Review:'}</span>
              </div>
              <span className="font-bold">3 {isArabic ? 'منشورات' : 'posts'}</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Image className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{isArabic ? 'مسودة:' : 'Draft:'}</span>
              </div>
              <span className="font-bold">12 {isArabic ? 'منشورات' : 'posts'}</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Calendar className="h-4 w-4 text-purple-500" />
                <span className="text-sm">{isArabic ? 'أفكار:' : 'Ideas:'}</span>
              </div>
              <span className="font-bold">25 {isArabic ? 'مفاهيم' : 'concepts'}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Projects */}
      <Card>
        <CardHeader>
          <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 'المشاريع الحالية' : 'Current Projects'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className={`flex items-center gap-2 mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-lg">🎨</span>
              <div className={isArabic ? 'text-right' : ''}>
                <h3 className="font-semibold">
                  {isArabic ? 'إنشاء: كاروسيل "5 نصائح تسويقية"' : 'Creating: "5 Marketing Tips" carousel'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isArabic ? 'المنصة: انستغرام | الجدولة: غداً 6 مساءً' : 'Platform: Instagram | Schedule: Tomorrow 6 PM'}
                </p>
              </div>
            </div>
            <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'التقدم:' : 'Progress:'}</span>
              <span className="text-sm font-bold">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className={`flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-lg">📝</span>
              <span className="text-sm">{isArabic ? 'التالي: مسودة مقال لينكد إن' : 'Next: LinkedIn article draft'}</span>
            </div>
            <div className={`flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-lg">🎥</span>
              <span className="text-sm">{isArabic ? 'الطابور: فيديو تريند تيك توك' : 'Queue: TikTok trend video'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialCreatorWorkspace;
