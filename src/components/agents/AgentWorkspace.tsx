
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, BarChart3, Settings, Play, Pause, CheckCircle, Clock, Target } from 'lucide-react';
import AgentTaskBoard from './AgentTaskBoard';
import AgentAnalytics from './AgentAnalytics';
import AgentSettings from './AgentSettings';

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  status: string;
  currentTask: string;
  completedTasks: number;
  bgColor: string;
  expertise: string;
  capabilities: string[];
  progress: number;
  specialization: string;
}

interface AgentWorkspaceProps {
  agent: Agent;
  onClose: () => void;
  isArabic: boolean;
}

const AgentWorkspace: React.FC<AgentWorkspaceProps> = ({ agent, onClose, isArabic }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [agentStatus, setAgentStatus] = useState(agent.status);

  const toggleAgentStatus = () => {
    setAgentStatus(prev => prev === 'active' ? 'paused' : 'active');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'working': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'paused': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return isArabic ? 'نشط' : 'Active';
      case 'working': return isArabic ? 'يعمل' : 'Working';
      case 'paused': return isArabic ? 'متوقف' : 'Paused';
      default: return isArabic ? 'غير متاح' : 'Offline';
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b shadow-sm">
        <div className="max-w-full mx-auto px-4 py-4">
          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Button variant="ghost" onClick={onClose} size="sm">
                <ArrowLeft className="h-4 w-4" />
                {isArabic ? 'العودة' : 'Back'}
              </Button>
              
              <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`p-3 rounded-lg ${agent.bgColor} text-white`}>
                  {agent.icon}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">{agent.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">{agent.role}</p>
                </div>
              </div>
            </div>

            <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Badge className={getStatusColor(agentStatus)}>
                {getStatusText(agentStatus)}
              </Badge>
              
              <Button
                onClick={toggleAgentStatus}
                variant={agentStatus === 'active' ? 'destructive' : 'default'}
                size="sm"
              >
                {agentStatus === 'active' ? (
                  <>
                    <Pause className="h-4 w-4 mr-1" />
                    {isArabic ? 'إيقاف' : 'Pause'}
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-1" />
                    {isArabic ? 'تشغيل' : 'Start'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Stats */}
      <div className="max-w-full mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{agent.completedTasks}</p>
                  <p className="text-sm text-gray-600">{isArabic ? 'مهام منجزة' : 'Tasks Completed'}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className="text-2xl font-bold text-green-600">{agent.progress}%</p>
                  <p className="text-sm text-gray-600">{isArabic ? 'معدل الأداء' : 'Performance'}</p>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className="text-2xl font-bold text-purple-600">5</p>
                  <p className="text-sm text-gray-600">{isArabic ? 'مهام نشطة' : 'Active Tasks'}</p>
                </div>
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className="text-2xl font-bold text-orange-600">98%</p>
                  <p className="text-sm text-gray-600">{isArabic ? 'معدل النجاح' : 'Success Rate'}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Task */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div>
                <h3 className="font-semibold mb-1">{isArabic ? 'المهمة الحالية' : 'Current Task'}</h3>
                <p className="text-gray-600">{agent.currentTask}</p>
              </div>
              <div className="w-32">
                <Progress value={agent.progress} className="h-2" />
                <p className="text-sm text-gray-600 mt-1">{agent.progress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workspace Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <BarChart3 className="h-4 w-4" />
              {isArabic ? 'لوحة التحكم' : 'Dashboard'}
            </TabsTrigger>
            <TabsTrigger value="tasks" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Calendar className="h-4 w-4" />
              {isArabic ? 'المهام' : 'Tasks'}
            </TabsTrigger>
            <TabsTrigger value="settings" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Settings className="h-4 w-4" />
              {isArabic ? 'الإعدادات' : 'Settings'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <AgentAnalytics agent={agent} isArabic={isArabic} />
          </TabsContent>

          <TabsContent value="tasks" className="mt-6">
            <AgentTaskBoard agent={agent} isArabic={isArabic} />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <AgentSettings agent={agent} isArabic={isArabic} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentWorkspace;
