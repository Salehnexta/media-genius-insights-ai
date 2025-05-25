
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Users, Target, MessageSquare } from 'lucide-react';

const DashboardStats: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const stats = [
    {
      id: 'campaigns',
      title: isArabic ? 'الحملات النشطة' : 'Active Campaigns',
      value: '12',
      change: '+8%',
      icon: Target,
      color: 'blue'
    },
    {
      id: 'reach',
      title: isArabic ? 'الوصول الشهري' : 'Monthly Reach',
      value: '24.5K',
      change: '+12%',
      icon: TrendingUp,
      color: 'green'
    },
    {
      id: 'audience',
      title: isArabic ? 'الجمهور المستهدف' : 'Target Audience',
      value: '8.2K',
      change: '+5%',
      icon: Users,
      color: 'purple'
    },
    {
      id: 'engagement',
      title: isArabic ? 'معدل التفاعل' : 'Engagement Rate',
      value: '4.8%',
      change: '+2.1%',
      icon: MessageSquare,
      color: 'orange'
    }
  ];

  return (
    <div className="dashboard-stats">
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className={`stat-card stat-card-${stat.color}`}>
            <div className="stat-header">
              <div className="stat-icon-wrapper">
                <stat.icon className="stat-icon" />
              </div>
              <div className="stat-change positive">
                {stat.change}
              </div>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-title">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;
