
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Activity, Bot, CheckCircle, Clock } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'busy' | 'offline';
  description: string;
  capabilities: string[];
  tasksCompleted: number;
  currentTask?: string;
  lastActive: Date;
  performance: number;
}

interface AgentStatusDashboardProps {
  agents: Agent[];
}

const AgentStatusDashboard: React.FC<AgentStatusDashboardProps> = ({ agents }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const statusCounts = agents.reduce((acc, agent) => {
    acc[agent.status] = (acc[agent.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalTasks = agents.reduce((sum, agent) => sum + agent.tasksCompleted, 0);
  const averagePerformance = Math.round(
    agents.reduce((sum, agent) => sum + agent.performance, 0) / agents.length
  );

  const stats = [
    {
      title: isArabic ? 'إجمالي الوكلاء' : 'Total Agents',
      value: agents.length,
      icon: Bot,
      color: 'text-blue-600'
    },
    {
      title: isArabic ? 'الوكلاء النشطة' : 'Active Agents',
      value: statusCounts.active || 0,
      icon: Activity,
      color: 'text-green-600'
    },
    {
      title: isArabic ? 'المهام المنجزة' : 'Tasks Completed',
      value: totalTasks,
      icon: CheckCircle,
      color: 'text-purple-600'
    },
    {
      title: isArabic ? 'متوسط الأداء' : 'Avg Performance',
      value: `${averagePerformance}%`,
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {index === 1 && statusCounts.busy && (
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {statusCounts.busy} {isArabic ? 'مشغول' : 'Busy'}
                </Badge>
                {statusCounts.idle && (
                  <Badge variant="outline" className="text-xs">
                    {statusCounts.idle} {isArabic ? 'في انتظار' : 'Idle'}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AgentStatusDashboard;
