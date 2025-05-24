
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, Clock, CheckCircle, BarChart3 } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  specialization: string;
}

interface AgentAnalyticsProps {
  agent: Agent;
  isArabic: boolean;
}

const AgentAnalytics: React.FC<AgentAnalyticsProps> = ({ agent, isArabic }) => {
  const performanceData = [
    { metric: isArabic ? 'معدل إنجاز المهام' : 'Task Completion Rate', value: 94, trend: 'up', change: '+12%' },
    { metric: isArabic ? 'وقت الاستجابة' : 'Response Time', value: 85, trend: 'up', change: '+5%' },
    { metric: isArabic ? 'رضا المستخدم' : 'User Satisfaction', value: 98, trend: 'up', change: '+8%' },
    { metric: isArabic ? 'دقة النتائج' : 'Accuracy Rate', value: 96, trend: 'down', change: '-2%' }
  ];

  const weeklyStats = [
    { day: isArabic ? 'الاثنين' : 'Monday', tasks: 12, completed: 11 },
    { day: isArabic ? 'الثلاثاء' : 'Tuesday', tasks: 15, completed: 14 },
    { day: isArabic ? 'الأربعاء' : 'Wednesday', tasks: 10, completed: 9 },
    { day: isArabic ? 'الخميس' : 'Thursday', tasks: 18, completed: 17 },
    { day: isArabic ? 'الجمعة' : 'Friday', tasks: 14, completed: 13 },
    { day: isArabic ? 'السبت' : 'Saturday', tasks: 8, completed: 8 },
    { day: isArabic ? 'الأحد' : 'Sunday', tasks: 6, completed: 6 }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {isArabic ? 'نظرة عامة على الأداء' : 'Performance Overview'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceData.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className={`flex items-center justify-between mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm font-medium">{item.metric}</span>
                  <div className={`flex items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                    {item.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-xs ml-1 ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold mb-2">{item.value}%</div>
                <Progress value={item.value} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Weekly Performance */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <BarChart3 className="h-5 w-5" />
            {isArabic ? 'الأداء الأسبوعي' : 'Weekly Performance'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyStats.map((day, index) => (
              <div key={index} className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className={`flex items-center justify-between mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm font-medium">{day.day}</span>
                    <span className="text-sm text-gray-600">{day.completed}/{day.tasks}</span>
                  </div>
                  <Progress value={(day.completed / day.tasks) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">247</div>
            <div className="text-sm text-gray-600">{isArabic ? 'مهام مكتملة' : 'Tasks Completed'}</div>
            <div className="text-xs text-green-600 mt-1">+15% {isArabic ? 'من الأسبوع الماضي' : 'from last week'}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">2.3s</div>
            <div className="text-sm text-gray-600">{isArabic ? 'متوسط وقت الاستجابة' : 'Avg Response Time'}</div>
            <div className="text-xs text-green-600 mt-1">-0.5s {isArabic ? 'تحسن' : 'improvement'}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">98.5%</div>
            <div className="text-sm text-gray-600">{isArabic ? 'معدل الدقة' : 'Accuracy Rate'}</div>
            <div className="text-xs text-green-600 mt-1">+2.1% {isArabic ? 'تحسن' : 'improvement'}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentAnalytics;
