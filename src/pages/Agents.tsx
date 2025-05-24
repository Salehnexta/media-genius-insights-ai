
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import AgentCard from '@/components/agents/AgentCard';
import AgentStatusDashboard from '@/components/agents/AgentStatusDashboard';
import AgentTaskManager from '@/components/agents/AgentTaskManager';
import CreateAgentDialog from '@/components/agents/CreateAgentDialog';
import { Bot, Plus, Activity, Users, BarChart, Search, PenTool, TrendingUp } from 'lucide-react';

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

const Agents = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const isArabic = language === 'ar';
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    initializeDefaultAgents();
    // Initialize specialized agents
    import('@/services/specializedAgents').then(({ initializeSpecializedAgents }) => {
      initializeSpecializedAgents();
    });
  }, [user]);

  const initializeDefaultAgents = async () => {
    // Initialize with default AI agents
    const defaultAgents: Agent[] = [
      {
        id: 'strategy-agent',
        name: isArabic ? 'وكيل الاستراتيجية' : 'Strategy Agent',
        type: 'strategy',
        status: 'active',
        description: isArabic 
          ? 'متخصص في تحليل الأعمال والتخطيط الاستراتيجي'
          : 'Specialized in business analysis and strategic planning',
        capabilities: ['Market Analysis', 'Business Strategy', 'Growth Planning', 'Competitive Intelligence'],
        tasksCompleted: 124,
        currentTask: isArabic ? 'تحليل السوق المحلي' : 'Analyzing local market trends',
        lastActive: new Date(),
        performance: 94
      },
      {
        id: 'content-agent',
        name: isArabic ? 'وكيل المحتوى' : 'Content Agent',
        type: 'content',
        status: 'busy',
        description: isArabic 
          ? 'إنشاء وتحسين المحتوى التسويقي'
          : 'Creating and optimizing marketing content',
        capabilities: ['Content Writing', 'Social Media Posts', 'SEO Optimization', 'Visual Content'],
        tasksCompleted: 89,
        currentTask: isArabic ? 'كتابة منشورات وسائل التواصل' : 'Writing social media posts',
        lastActive: new Date(),
        performance: 91
      },
      {
        id: 'analytics-agent',
        name: isArabic ? 'وكيل التحليلات' : 'Analytics Agent',
        type: 'analytics',
        status: 'idle',
        description: isArabic 
          ? 'تحليل البيانات وإنشاء التقارير'
          : 'Data analysis and report generation',
        capabilities: ['Data Analysis', 'Performance Reports', 'Trend Identification', 'Forecasting'],
        tasksCompleted: 67,
        lastActive: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        performance: 88
      },
      {
        id: 'competitor-agent',
        name: isArabic ? 'وكيل المنافسين' : 'Competitor Agent',
        type: 'competitor',
        status: 'active',
        description: isArabic 
          ? 'مراقبة وتحليل المنافسين'
          : 'Monitoring and analyzing competitors',
        capabilities: ['Competitor Tracking', 'Market Intelligence', 'Pricing Analysis', 'Feature Comparison'],
        tasksCompleted: 45,
        currentTask: isArabic ? 'مراقبة أسعار المنافسين' : 'Monitoring competitor pricing',
        lastActive: new Date(),
        performance: 85
      },
      {
        id: 'seo-agent',
        name: isArabic ? 'وكيل السيو' : 'SEO Agent',
        type: 'seo',
        status: 'idle',
        description: isArabic 
          ? 'تحسين محركات البحث والأداء'
          : 'Search engine optimization and performance',
        capabilities: ['Keyword Research', 'Technical SEO', 'Content Optimization', 'Link Building'],
        tasksCompleted: 32,
        lastActive: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        performance: 92
      }
    ];

    setAgents(defaultAgents);
    setLoading(false);
  };

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'strategy': return TrendingUp;
      case 'content': return PenTool;
      case 'analytics': return BarChart;
      case 'competitor': return Search;
      case 'seo': return Activity;
      default: return Bot;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'busy': return 'bg-orange-500';
      case 'idle': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'}`}>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading agents...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header Section */}
        <div className={`flex items-center justify-between mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isArabic ? 'إدارة الوكلاء الذكيين' : 'AI Agent Management'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isArabic ? 'إدارة ومراقبة الوكلاء الذكيين المتخصصين والمهام' : 'Manage and monitor your specialized AI agents and tasks'}
            </p>
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
          >
            <Plus className="h-4 w-4" />
            {isArabic ? 'إنشاء وكيل جديد' : 'Create New Agent'}
          </Button>
        </div>

        {/* Agent Status Dashboard */}
        <AgentStatusDashboard agents={agents} />

        {/* Agent Communication & Task Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {isArabic ? 'مدير المهام الإجمالي' : 'Global Task Manager'}
            </h2>
            <AgentTaskManager showAllAgents={true} />
          </div>
          
          {selectedAgent && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {isArabic ? 'مهام الوكيل المحدد' : 'Selected Agent Tasks'}
              </h2>
              <AgentTaskManager agentId={selectedAgent} />
            </div>
          )}
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {agents.map((agent) => (
            <div key={agent.id} onClick={() => setSelectedAgent(agent.id)} className="cursor-pointer">
              <AgentCard 
                agent={agent} 
                getAgentIcon={getAgentIcon}
                getStatusColor={getStatusColor}
              />
            </div>
          ))}
        </div>

        {/* Create Agent Dialog */}
        <CreateAgentDialog 
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onAgentCreated={(newAgent) => {
            setAgents([...agents, newAgent]);
            setIsCreateDialogOpen(false);
          }}
        />
      </main>
    </div>
  );
};

export default Agents;
