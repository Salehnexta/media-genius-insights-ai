
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  User, 
  Settings, 
  Eye, 
  Edit, 
  Save, 
  Upload,
  RefreshCw,
  Clock,
  TrendingUp
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'profile_update' | 'settings_change' | 'login' | 'file_upload' | 'view' | 'save';
  title: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

interface RealTimeActivityFeedProps {
  isArabic: boolean;
}

const RealTimeActivityFeed: React.FC<RealTimeActivityFeedProps> = ({ isArabic }) => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'profile_update',
      title: isArabic ? 'تم تحديث الملف الشخصي' : 'Profile Updated',
      description: isArabic ? 'تم تحديث الصورة الشخصية والسيرة الذاتية' : 'Avatar and bio updated',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      metadata: { section: 'profile' }
    },
    {
      id: '2',
      type: 'settings_change',
      title: isArabic ? 'تم تغيير الإعدادات' : 'Settings Changed',
      description: isArabic ? 'تم تفعيل الإشعارات الفورية' : 'Push notifications enabled',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      metadata: { setting: 'notifications' }
    },
    {
      id: '3',
      type: 'login',
      title: isArabic ? 'تسجيل دخول جديد' : 'New Login',
      description: isArabic ? 'تم تسجيل الدخول من جهاز جديد' : 'Logged in from a new device',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      metadata: { device: 'Mobile' }
    },
    {
      id: '4',
      type: 'view',
      title: isArabic ? 'عرض الملف الشخصي' : 'Profile Viewed',
      description: isArabic ? 'تم عرض ملفك الشخصي من قبل مستخدم آخر' : 'Your profile was viewed by another user',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      metadata: { viewer: 'anonymous' }
    }
  ]);
  
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Simulate random activity updates
      if (Math.random() > 0.7) {
        const newActivity: ActivityItem = {
          id: Date.now().toString(),
          type: 'view',
          title: isArabic ? 'نشاط جديد' : 'New Activity',
          description: isArabic ? 'تفاعل جديد مع ملفك الشخصي' : 'New interaction with your profile',
          timestamp: new Date(),
          metadata: { auto: true }
        };
        
        setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
        setLastUpdate(new Date());
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [isLive, isArabic]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'profile_update': return User;
      case 'settings_change': return Settings;
      case 'login': return Activity;
      case 'file_upload': return Upload;
      case 'view': return Eye;
      case 'save': return Save;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'profile_update': return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
      case 'settings_change': return 'text-purple-500 bg-purple-100 dark:bg-purple-900/20';
      case 'login': return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case 'file_upload': return 'text-orange-500 bg-orange-100 dark:bg-orange-900/20';
      case 'view': return 'text-gray-500 bg-gray-100 dark:bg-gray-800';
      case 'save': return 'text-teal-500 bg-teal-100 dark:bg-teal-900/20';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-800';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 1) {
      return isArabic ? 'الآن' : 'Just now';
    } else if (minutes < 60) {
      return isArabic ? `منذ ${minutes} دقيقة` : `${minutes}m ago`;
    } else {
      return isArabic ? `منذ ${hours} ساعة` : `${hours}h ago`;
    }
  };

  const refreshFeed = () => {
    setLastUpdate(new Date());
    // In a real app, this would fetch fresh data
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
            <Activity className="h-5 w-5" />
            {isArabic ? 'النشاط المباشر' : 'Live Activity'}
            {isLive && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600">
                  {isArabic ? 'مباشر' : 'Live'}
                </span>
              </div>
            )}
          </CardTitle>
          
          <div className={`flex gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshFeed}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant={isLive ? "default" : "outline"}
              size="sm"
              onClick={() => setIsLive(!isLive)}
              className={`h-8 ${isArabic ? 'font-arabic' : ''}`}
            >
              {isLive ? (isArabic ? 'إيقاف' : 'Pause') : (isArabic ? 'تشغيل' : 'Resume')}
            </Button>
          </div>
        </div>
        
        <div className={`text-xs text-gray-500 flex items-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Clock className="h-3 w-3" />
          {isArabic ? 'آخر تحديث:' : 'Last updated:'} {formatTime(lastUpdate)}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-96">
          {activities.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className={isArabic ? 'font-arabic' : ''}>
                {isArabic ? 'لا يوجد نشاط حديث' : 'No recent activity'}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {activities.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                const colors = getActivityColor(activity.type);
                
                return (
                  <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className={`p-2 rounded-full ${colors}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      
                      <div className={`flex-1 min-w-0 ${isArabic ? 'text-right' : ''}`}>
                        <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
                          <h4 className={`font-medium text-sm ${isArabic ? 'font-arabic' : ''}`}>
                            {activity.title}
                          </h4>
                          
                          {activity.metadata?.auto && (
                            <Badge variant="outline" className="text-xs">
                              {isArabic ? 'تلقائي' : 'Auto'}
                            </Badge>
                          )}
                        </div>
                        
                        <p className={`text-sm text-gray-600 mt-1 ${isArabic ? 'font-arabic' : ''}`}>
                          {activity.description}
                        </p>
                        
                        <span className="text-xs text-gray-500 mt-2 block">
                          {formatTime(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RealTimeActivityFeed;
