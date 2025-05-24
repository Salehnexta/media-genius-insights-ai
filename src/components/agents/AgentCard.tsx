
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { MoreVertical, Play, Pause, Settings } from 'lucide-react';

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

interface AgentCardProps {
  agent: Agent;
  getAgentIcon: (type: string) => React.ElementType;
  getStatusColor: (status: string) => string;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, getAgentIcon, getStatusColor }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const IconComponent = getAgentIcon(agent.type);

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return isArabic ? 'نشط الآن' : 'Active now';
    if (diffMins < 60) return isArabic ? `منذ ${diffMins} دقيقة` : `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    return isArabic ? `منذ ${diffHours} ساعة` : `${diffHours}h ago`;
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return isArabic ? 'نشط' : 'Active';
      case 'busy': return isArabic ? 'مشغول' : 'Busy';
      case 'idle': return isArabic ? 'في انتظار' : 'Idle';
      case 'offline': return isArabic ? 'غير متصل' : 'Offline';
      default: return status;
    }
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <IconComponent className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{agent.name}</CardTitle>
              <div className={`flex items-center gap-2 mt-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                <span className="text-sm text-gray-500">{getStatusText(agent.status)}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">{agent.description}</p>

        {/* Current Task */}
        {agent.currentTask && (
          <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p className="text-sm font-medium text-orange-800 dark:text-orange-200 mb-1">
              {isArabic ? 'المهمة الحالية:' : 'Current Task:'}
            </p>
            <p className="text-sm text-orange-700 dark:text-orange-300">{agent.currentTask}</p>
          </div>
        )}

        {/* Performance */}
        <div>
          <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm font-medium">
              {isArabic ? 'الأداء' : 'Performance'}
            </span>
            <span className="text-sm text-gray-500">{agent.performance}%</span>
          </div>
          <Progress value={agent.performance} className="h-2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{agent.tasksCompleted}</p>
            <p className="text-xs text-gray-500">
              {isArabic ? 'المهام المنجزة' : 'Tasks Completed'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {formatLastActive(agent.lastActive)}
            </p>
            <p className="text-xs text-gray-500">
              {isArabic ? 'آخر نشاط' : 'Last Active'}
            </p>
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <p className="text-sm font-medium mb-2">
            {isArabic ? 'القدرات:' : 'Capabilities:'}
          </p>
          <div className="flex flex-wrap gap-1">
            {agent.capabilities.slice(0, 3).map((capability, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {capability}
              </Badge>
            ))}
            {agent.capabilities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{agent.capabilities.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className={`flex gap-2 pt-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Button size="sm" variant="outline" className="flex-1">
            {agent.status === 'active' ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
            {agent.status === 'active' ? (isArabic ? 'إيقاف' : 'Pause') : (isArabic ? 'تشغيل' : 'Start')}
          </Button>
          <Button size="sm" variant="outline">
            <Settings className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
