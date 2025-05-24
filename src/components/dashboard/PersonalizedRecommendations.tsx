
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { aiAgentService, AIInsight, AgentContext } from '@/services/aiAgentService';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface PersonalizedRecommendationsProps {
  category?: string;
  maxItems?: number;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({ 
  category, 
  maxItems = 3 
}) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [recommendations, setRecommendations] = useState<AIInsight[]>([]);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadRecommendations();
    }
  }, [user, category]);

  const loadRecommendations = async () => {
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
          { type: 'content_created', timestamp: new Date() }
        ],
        goals: ['Increase engagement', 'Improve conversions', 'Expand reach'],
        preferences: { language }
      };

      const recs = await aiAgentService.getPersonalizedRecommendations(userContext, category);
      setRecommendations(recs.slice(0, maxItems));
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = (recommendationId: string) => {
    setCompletedActions(prev => new Set([...prev, recommendationId]));
  };

  const isCompleted = (recommendationId: string) => {
    return completedActions.has(recommendationId);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Target className="h-5 w-5 text-green-600" />
          <CardTitle className="text-lg">
            {isArabic ? 'توصيات شخصية' : 'Personalized Recommendations'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </div>
            ))}
          </div>
        ) : recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className={`p-4 border rounded-lg transition-all ${
                  isCompleted(rec.id) 
                    ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                <div className={`flex items-start justify-between mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-1">
                    <h4 className={`font-medium text-sm mb-1 ${isCompleted(rec.id) ? 'line-through text-gray-500' : ''}`}>
                      {rec.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {rec.description}
                    </p>
                  </div>
                  <Badge className={`ml-2 text-xs ${
                    rec.priority === 'high' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      : rec.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  }`}>
                    {rec.priority}
                  </Badge>
                </div>
                
                <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="text-xs text-purple-600 font-medium">
                    {rec.category.replace('_', ' ')}
                  </span>
                  
                  {rec.actionable && !isCompleted(rec.id) && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markAsCompleted(rec.id)}
                      className={`h-7 text-xs ${isArabic ? 'flex-row-reverse' : ''}`}
                    >
                      <ArrowRight className="h-3 w-3 mr-1" />
                      {isArabic ? 'تطبيق' : 'Apply'}
                    </Button>
                  )}
                  
                  {isCompleted(rec.id) && (
                    <div className={`flex items-center text-green-600 text-xs ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {isArabic ? 'مكتمل' : 'Completed'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              {isArabic ? 'لا توجد توصيات متاحة حالياً' : 'No recommendations available'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendations;
