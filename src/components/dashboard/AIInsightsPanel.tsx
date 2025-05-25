
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, AlertCircle, Lightbulb, RefreshCw, ChevronRight } from 'lucide-react';
import { aiAgentService, AIInsight, AgentContext } from '@/services/aiAgentService';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface AIInsightsPanelProps {
  className?: string;
}

const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const isArabic = language === 'ar';
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (user) {
      generateInsights();
    }
  }, [user]);

  const generateInsights = async () => {
    setLoading(true);
    try {
      const userContext: AgentContext = {
        userProfile: user,
        businessInfo: {
          industry: 'Digital Marketing',
          company_name: 'Your Business'
        },
        recentActivity: [
          { type: 'dashboard_view', timestamp: new Date() },
          { type: 'campaign_created', timestamp: new Date() }
        ],
        goals: ['Increase engagement', 'Grow audience', 'Improve ROI'],
        preferences: { language }
      };

      const newInsights = await aiAgentService.generateDailyInsights(userContext);
      setInsights(newInsights);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error generating insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'recommendation': return <Lightbulb className="h-4 w-4" />;
      case 'alert': return <AlertCircle className="h-4 w-4" />;
      case 'opportunity': return <TrendingUp className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Brain className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-lg">
              {t('ai.insights')}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={generateInsights}
            disabled={loading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        {lastUpdated && (
          <p className="text-xs text-gray-500">
            {t('ai.insights.lastUpdated')} {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : insights.length > 0 ? (
          insights.slice(0, 4).map((insight) => (
            <div
              key={insight.id}
              className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
            >
              <div className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0 mt-0.5">
                  {getInsightIcon(insight.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`flex items-center gap-2 mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <h4 className="font-medium text-sm truncate">{insight.title}</h4>
                    <Badge className={`text-xs ${getPriorityColor(insight.priority)}`}>
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {insight.description}
                  </p>
                  <div className={`flex items-center justify-between mt-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="text-xs text-purple-600 font-medium">
                      {insight.category.replace('_', ' ')}
                    </span>
                    <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              {t('ai.insights.noInsights')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsightsPanel;
