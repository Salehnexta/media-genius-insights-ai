
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  MessageSquare, 
  Share2,
  Target,
  Award,
  Clock,
  BarChart3
} from 'lucide-react';

interface StatItem {
  id: string;
  label: string;
  value: number;
  target?: number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend: number[];
}

interface InteractiveProfileStatsProps {
  isArabic: boolean;
}

const InteractiveProfileStats: React.FC<InteractiveProfileStatsProps> = ({ isArabic }) => {
  const [stats, setStats] = useState<StatItem[]>([
    {
      id: 'profile_views',
      label: isArabic ? 'مشاهدات الملف' : 'Profile Views',
      value: 1247,
      target: 1500,
      change: 12.5,
      changeType: 'increase',
      icon: Eye,
      color: 'text-blue-500',
      trend: [820, 950, 1100, 1180, 1247]
    },
    {
      id: 'engagement',
      label: isArabic ? 'معدل التفاعل' : 'Engagement Rate',
      value: 8.4,
      target: 10,
      change: 2.1,
      changeType: 'increase',
      icon: Heart,
      color: 'text-red-500',
      trend: [6.2, 7.1, 7.8, 8.1, 8.4]
    },
    {
      id: 'connections',
      label: isArabic ? 'الاتصالات' : 'Connections',
      value: 342,
      target: 400,
      change: 8.7,
      changeType: 'increase',
      icon: Users,
      color: 'text-green-500',
      trend: [298, 315, 328, 335, 342]
    },
    {
      id: 'shares',
      label: isArabic ? 'المشاركات' : 'Profile Shares',
      value: 89,
      change: -2.3,
      changeType: 'decrease',
      icon: Share2,
      color: 'text-purple-500',
      trend: [95, 92, 88, 91, 89]
    }
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [isAnimating, setIsAnimating] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => ({
        ...stat,
        value: stat.value + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3),
        trend: [...stat.trend.slice(1), stat.value + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5)]
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const periods = [
    { value: '7d', label: isArabic ? '7 أيام' : '7 Days' },
    { value: '30d', label: isArabic ? '30 يوم' : '30 Days' },
    { value: '90d', label: isArabic ? '90 يوم' : '90 Days' }
  ];

  const animateStats = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const getProgressPercentage = (value: number, target?: number) => {
    if (!target) return 0;
    return Math.min((value / target) * 100, 100);
  };

  const renderMiniChart = (trend: number[], color: string) => {
    const max = Math.max(...trend);
    const min = Math.min(...trend);
    const range = max - min || 1;

    return (
      <div className="flex items-end h-8 gap-1">
        {trend.map((value, index) => {
          const height = ((value - min) / range) * 100;
          return (
            <div
              key={index}
              className={`w-1 bg-current rounded-t opacity-60 ${color}`}
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className={`flex gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
        {periods.map(period => (
          <Button
            key={period.value}
            variant={selectedPeriod === period.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod(period.value as any)}
            className={isArabic ? 'font-arabic' : ''}
          >
            {period.label}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={animateStats}
          className={`ml-auto ${isArabic ? 'mr-auto ml-0 font-arabic' : ''}`}
        >
          <BarChart3 className="h-4 w-4 mr-1" />
          {isArabic ? 'تحديث' : 'Refresh'}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const progressPercentage = getProgressPercentage(stat.value, stat.target);
          
          return (
            <Card key={stat.id} className={`transition-all duration-500 ${isAnimating ? 'scale-105' : ''}`}>
              <CardHeader className="pb-3">
                <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <CardTitle className={`text-sm font-medium ${isArabic ? 'font-arabic' : ''}`}>
                      {stat.label}
                    </CardTitle>
                  </div>
                  
                  <Badge 
                    variant={stat.changeType === 'increase' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {stat.changeType === 'increase' ? '+' : ''}{stat.change}%
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className={`flex items-end justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={isArabic ? 'text-right' : ''}>
                    <div className={`text-2xl font-bold ${isAnimating ? 'animate-pulse' : ''}`}>
                      {stat.value.toLocaleString()}
                    </div>
                    {stat.target && (
                      <div className="text-xs text-gray-500">
                        {isArabic ? 'الهدف:' : 'Goal:'} {stat.target.toLocaleString()}
                      </div>
                    )}
                  </div>
                  
                  <div className="w-16">
                    {renderMiniChart(stat.trend, stat.color)}
                  </div>
                </div>
                
                {stat.target && (
                  <div className="space-y-1">
                    <div className={`flex justify-between text-xs ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className={isArabic ? 'font-arabic' : ''}>
                        {isArabic ? 'التقدم' : 'Progress'}
                      </span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                )}
                
                <div className={`flex items-center gap-1 text-xs text-gray-500 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Clock className="h-3 w-3" />
                  <span className={isArabic ? 'font-arabic' : ''}>
                    {isArabic ? 'آخر تحديث منذ دقائق' : 'Updated minutes ago'}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievement Section */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
            <Award className="h-5 w-5 text-yellow-500" />
            {isArabic ? 'الإنجازات الأخيرة' : 'Recent Achievements'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg ${isArabic ? 'font-arabic' : ''}`}>
              <Target className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
              <h4 className="font-medium">{isArabic ? 'هدف الشهر' : 'Monthly Goal'}</h4>
              <p className="text-sm text-gray-600 mt-1">
                {isArabic ? 'تم تحقيق 83% من الهدف' : '83% of goal achieved'}
              </p>
            </div>
            
            <div className={`text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg ${isArabic ? 'font-arabic' : ''}`}>
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h4 className="font-medium">{isArabic ? 'نمو متسارع' : 'Rapid Growth'}</h4>
              <p className="text-sm text-gray-600 mt-1">
                {isArabic ? 'زيادة 25% هذا الأسبوع' : '25% increase this week'}
              </p>
            </div>
            
            <div className={`text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg ${isArabic ? 'font-arabic' : ''}`}>
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h4 className="font-medium">{isArabic ? 'شبكة متنامية' : 'Growing Network'}</h4>
              <p className="text-sm text-gray-600 mt-1">
                {isArabic ? '50+ اتصال جديد' : '50+ new connections'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveProfileStats;
