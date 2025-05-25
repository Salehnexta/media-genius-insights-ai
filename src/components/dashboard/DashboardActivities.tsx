
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

const DashboardActivities: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const activities = [
    {
      id: 1,
      type: 'success',
      title: isArabic ? 'تم نشر الحملة الجديدة' : 'New campaign published',
      time: isArabic ? 'منذ 5 دقائق' : '5 minutes ago',
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'warning',
      title: isArabic ? 'تحتاج الحملة إلى مراجعة' : 'Campaign needs review',
      time: isArabic ? 'منذ 15 دقيقة' : '15 minutes ago',
      icon: AlertCircle
    },
    {
      id: 3,
      type: 'info',
      title: isArabic ? 'تم تحديث إعدادات الجمهور' : 'Audience settings updated',
      time: isArabic ? 'منذ ساعة' : '1 hour ago',
      icon: Clock
    }
  ];

  return (
    <div className="dashboard-activities">
      <Card className="activities-card">
        <CardHeader>
          <CardTitle className={isArabic ? 'text-right' : 'text-left'}>
            {isArabic ? 'النشاطات الأخيرة' : 'Recent Activities'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="activities-list">
            {activities.map((activity) => (
              <div key={activity.id} className={`activity-item activity-${activity.type}`}>
                <div className="activity-icon">
                  <activity.icon className="icon" />
                </div>
                <div className="activity-content">
                  <div className="activity-title">{activity.title}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardActivities;
