
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Award, Calendar, MessageSquare, Target, TrendingUp } from 'lucide-react';

interface ActivitySectionProps {
  stats: any;
  isArabic: boolean;
}

const ActivitySection: React.FC<ActivitySectionProps> = ({
  stats,
  isArabic
}) => {
  const achievements = [
    {
      id: 1,
      title: isArabic ? 'مرحباً بك!' : 'Welcome Aboard!',
      description: isArabic ? 'أكملت إعداد ملفك الشخصي' : 'Completed your profile setup',
      icon: Award,
      color: 'text-blue-500',
      date: '2024-01-15',
      unlocked: true
    },
    {
      id: 2,
      title: isArabic ? 'منشئ المحتوى' : 'Content Creator',
      description: isArabic ? 'أنشأت 10 منشورات' : 'Created 10 posts',
      icon: MessageSquare,
      color: 'text-green-500',
      date: '2024-01-20',
      unlocked: true
    },
    {
      id: 3,
      title: isArabic ? 'خبير التسويق' : 'Marketing Expert',
      description: isArabic ? 'أنشأت 5 حملات تسويقية' : 'Created 5 marketing campaigns',
      icon: Target,
      color: 'text-purple-500',
      date: '2024-01-25',
      unlocked: true
    },
    {
      id: 4,
      title: isArabic ? 'محلل البيانات' : 'Data Analyst',
      description: isArabic ? 'حللت 100 تقرير' : 'Analyzed 100 reports',
      icon: TrendingUp,
      color: 'text-orange-500',
      date: null,
      unlocked: false
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: isArabic ? 'أنشأ حملة جديدة' : 'Created a new campaign',
      details: isArabic ? 'حملة الصيف 2024' : 'Summer 2024 Campaign',
      time: '2 hours ago',
      type: 'campaign'
    },
    {
      id: 2,
      action: isArabic ? 'نشر محتوى' : 'Published content',
      details: isArabic ? 'منشور عن التسويق الرقمي' : 'Digital Marketing Post',
      time: '5 hours ago',
      type: 'content'
    },
    {
      id: 3,
      action: isArabic ? 'حدث الملف الشخصي' : 'Updated profile',
      details: isArabic ? 'أضاف معلومات الشركة' : 'Added company information',
      time: '1 day ago',
      type: 'profile'
    },
    {
      id: 4,
      action: isArabic ? 'حلل التقارير' : 'Analyzed reports',
      details: isArabic ? 'تقرير الأداء الشهري' : 'Monthly Performance Report',
      time: '2 days ago',
      type: 'analysis'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'campaign': return Target;
      case 'content': return MessageSquare;
      case 'profile': return Activity;
      case 'analysis': return TrendingUp;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'campaign': return 'text-purple-500';
      case 'content': return 'text-blue-500';
      case 'profile': return 'text-green-500';
      case 'analysis': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div className={isArabic ? 'text-right' : ''}>
                <p className="text-2xl font-bold">{stats.postsCreated}</p>
                <p className="text-sm text-gray-600">{isArabic ? 'منشورات' : 'Posts'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <div className={isArabic ? 'text-right' : ''}>
                <p className="text-2xl font-bold">{stats.campaignsRun}</p>
                <p className="text-sm text-gray-600">{isArabic ? 'حملات' : 'Campaigns'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className={isArabic ? 'text-right' : ''}>
                <p className="text-2xl font-bold">{stats.apiCalls}</p>
                <p className="text-sm text-gray-600">{isArabic ? 'API استدعاءات' : 'API Calls'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Award className="h-5 w-5 text-orange-600" />
              </div>
              <div className={isArabic ? 'text-right' : ''}>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-600">{isArabic ? 'إنجازات' : 'Achievements'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
              <Activity className="h-5 w-5" />
              {isArabic ? 'النشاط الأخير' : 'Recent Activity'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${getActivityColor(activity.type)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className={`flex-1 ${isArabic ? 'text-right' : ''}`}>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
              <Award className="h-5 w-5" />
              {isArabic ? 'الإنجازات' : 'Achievements'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''} ${!achievement.unlocked ? 'opacity-50' : ''}`}>
                  <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-yellow-100 dark:bg-yellow-900/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
                    <achievement.icon className={`h-5 w-5 ${achievement.unlocked ? achievement.color : 'text-gray-400'}`} />
                  </div>
                  <div className={`flex-1 ${isArabic ? 'text-right' : ''}`}>
                    <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="text-xs">
                          {isArabic ? 'مُنجز' : 'Unlocked'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
                    {achievement.date && (
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    )}
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

export default ActivitySection;
