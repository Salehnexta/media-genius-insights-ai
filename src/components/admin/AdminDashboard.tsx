
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  MessageSquare, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  aiInteractions: number;
  pendingTickets: number;
  systemHealth: 'good' | 'warning' | 'critical';
}

const AdminDashboard: React.FC = () => {
  const { language } = useLanguage();
  const { adminUser } = useAdmin();
  const isArabic = language === 'ar';
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    aiInteractions: 0,
    pendingTickets: 0,
    systemHealth: 'good'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch user stats
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch onboarding completion stats (approximate active users)
      const { count: activeUsers } = await supabase
        .from('onboarding_data')
        .select('*', { count: 'exact', head: true })
        .not('completed_at', 'is', null);

      // Fetch AI usage stats
      const { count: aiInteractions } = await supabase
        .from('ai_usage_logs')
        .select('*', { count: 'exact', head: true });

      // Fetch support tickets
      const { count: pendingTickets } = await supabase
        .from('support_tickets')
        .select('*', { count: 'exact', head: true })
        .in('status', ['open', 'in_progress']);

      setStats({
        totalUsers: totalUsers || 0,
        activeUsers: activeUsers || 0,
        totalRevenue: 45250, // Mock data
        aiInteractions: aiInteractions || 0,
        pendingTickets: pendingTickets || 0,
        systemHealth: 'good'
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: isArabic ? 'إجمالي المستخدمين' : 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: isArabic ? 'المستخدمون النشطون' : 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900',
      change: '+8%',
      changeType: 'positive' as const
    },
    {
      title: isArabic ? 'الإيرادات (ريال)' : 'Revenue (SAR)',
      value: `${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900',
      change: '+23%',
      changeType: 'positive' as const
    },
    {
      title: isArabic ? 'تفاعلات الذكاء الاصطناعي' : 'AI Interactions',
      value: stats.aiInteractions.toLocaleString(),
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900',
      change: '+45%',
      changeType: 'positive' as const
    }
  ];

  const getSystemHealthIcon = () => {
    switch (stats.systemHealth) {
      case 'good': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-600" />;
    }
  };

  const getSystemHealthColor = () => {
    switch (stats.systemHealth) {
      case 'good': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900';
    }
  };

  return (
    <div className={`space-y-6 ${isArabic ? 'rtl' : 'ltr'}`}>
      
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-600 to-purple-600 rounded-xl p-6 text-white">
        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div>
            <h1 className={`text-2xl font-bold mb-2 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'مرحباً بك في لوحة الإدارة' : 'Welcome to Admin Dashboard'}
            </h1>
            <p className={`text-red-100 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 
                `مرحباً ${adminUser?.email} - ${adminUser?.role.replace('_', ' ').toUpperCase()}` :
                `Hello ${adminUser?.email} - ${adminUser?.role.replace('_', ' ').toUpperCase()}`
              }
            </p>
          </div>
          <BarChart3 className="h-16 w-16 text-red-200" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className={`text-sm font-medium text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {loading ? '...' : stat.value}
              </div>
              <div className={`flex items-center gap-1 text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">{stat.change}</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {isArabic ? 'من الشهر الماضي' : 'from last month'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Status and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
              {getSystemHealthIcon()}
              {isArabic ? 'حالة النظام' : 'System Health'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'الحالة العامة' : 'Overall Status'}
              </span>
              <Badge className={getSystemHealthColor()}>
                {stats.systemHealth.toUpperCase()}
              </Badge>
            </div>
            
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'التذاكر المعلقة' : 'Pending Tickets'}
              </span>
              <span className="font-medium">
                {loading ? '...' : stats.pendingTickets}
              </span>
            </div>
            
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'آخر فحص' : 'Last Check'}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date().toLocaleTimeString(isArabic ? 'ar-SA' : 'en-US')}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className={`${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'الإجراءات السريعة' : 'Quick Actions'}
            </CardTitle>
            <CardDescription className={`${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'المهام الشائعة للإدارة' : 'Common admin tasks'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className={`flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Clock className="h-4 w-4 text-gray-600" />
                <span className={`text-sm ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? 'مراجعة التذاكر الجديدة' : 'Review new tickets'}
                </span>
              </div>
              
              <div className={`flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Users className="h-4 w-4 text-gray-600" />
                <span className={`text-sm ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? 'إدارة المستخدمين الجدد' : 'Manage new users'}
                </span>
              </div>
              
              <div className={`flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Activity className="h-4 w-4 text-gray-600" />
                <span className={`text-sm ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? 'مراقبة الأداء' : 'Monitor performance'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
