
import React from 'react';
import { Agent } from '../../pages/Agents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, DollarSign, Eye, MousePointer, Share2, Star, Percent, Brain, Target, BarChart3, Zap } from 'lucide-react';
import MarketingManagerWorkspace from './workspaces/MarketingManagerWorkspace';
import ContentSEOWorkspace from './workspaces/ContentSEOWorkspace';
import SocialCreatorWorkspace from './workspaces/SocialCreatorWorkspace';
import SocialCXWorkspace from './workspaces/SocialCXWorkspace';
import CampaignPerformanceWorkspace from './workspaces/CampaignPerformanceWorkspace';

interface AgentWorkspaceAreaProps {
  selectedAgent: Agent | null;
  isArabic: boolean;
}

const AgentWorkspaceArea: React.FC<AgentWorkspaceAreaProps> = ({ selectedAgent, isArabic }) => {
  const renderWorkspace = () => {
    if (!selectedAgent) {
      return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
          <div className={`max-w-7xl mx-auto p-8 ${isArabic ? 'text-right' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
            {/* Welcome Section */}
            <div className="text-center mb-16">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <h1 className={`text-4xl font-bold text-gray-900 dark:text-white mb-4 ${isArabic ? 'font-arabic leading-relaxed' : ''}`}>
                {isArabic ? 'اختر وكيلاً ذكياً للبدء' : 'Select an AI Agent to Get Started'}
              </h1>
              <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${isArabic ? 'leading-relaxed' : ''}`}>
                {isArabic 
                  ? 'اختر أحد الوكلاء الأذكياء من الشريط الجانبي لبدء العمل معهم'
                  : 'Choose one of the intelligent agents from the sidebar to start working with them'
                }
              </p>
            </div>

            {/* Dashboard Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Total Users */}
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={isArabic ? 'text-right' : ''}>
                      <p className="text-sm opacity-90">{isArabic ? 'إجمالي المستخدمين' : 'Total Users'}</p>
                      <p className="text-3xl font-bold">24,567</p>
                      <p className="text-sm opacity-75">+12% {isArabic ? 'هذا الشهر' : 'this month'}</p>
                    </div>
                    <Users className="h-10 w-10 opacity-75" />
                  </div>
                </CardContent>
              </Card>

              {/* Conversion Rate */}
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={isArabic ? 'text-right' : ''}>
                      <p className="text-sm opacity-90">{isArabic ? 'معدل التحويل' : 'Conversion Rate'}</p>
                      <p className="text-3xl font-bold">3.24%</p>
                      <p className="text-sm opacity-75">+0.4% {isArabic ? 'من الأسبوع الماضي' : 'from last week'}</p>
                    </div>
                    <TrendingUp className="h-10 w-10 opacity-75" />
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Revenue */}
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={isArabic ? 'text-right' : ''}>
                      <p className="text-sm opacity-90">{isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue'}</p>
                      <p className="text-3xl font-bold">$123K</p>
                      <p className="text-sm opacity-75">+8.2% {isArabic ? 'شهرياً' : 'monthly'}</p>
                    </div>
                    <DollarSign className="h-10 w-10 opacity-75" />
                  </div>
                </CardContent>
              </Card>

              {/* Performance Score */}
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={isArabic ? 'text-right' : ''}>
                      <p className="text-sm opacity-90">{isArabic ? 'تقييم الأداء' : 'Performance Score'}</p>
                      <p className="text-3xl font-bold">92/100</p>
                      <p className="text-sm opacity-75">+5 {isArabic ? 'نقاط' : 'points'}</p>
                    </div>
                    <Star className="h-10 w-10 opacity-75" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Getting Started Section */}
            <div className={`text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white ${isArabic ? 'font-arabic' : ''}`}>
              <h2 className={`text-3xl font-bold mb-4 ${isArabic ? 'leading-relaxed' : ''}`}>
                {isArabic ? 'ابدأ العمل مع الوكلاء الأذكياء' : 'Start Working with AI Agents'}
              </h2>
              <p className={`text-xl mb-8 opacity-90 ${isArabic ? 'leading-relaxed' : ''}`}>
                {isArabic 
                  ? 'اختر وكيلاً ذكياً من الشريط الجانبي لتجربة مساحة العمل المخصصة'
                  : 'Choose an intelligent agent from the sidebar to experience their specialized workspace'
                }
              </p>
              <div className="flex items-center justify-center">
                <div className="text-6xl mb-4">🤖</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (selectedAgent.specialization) {
      case 'marketing-manager':
        return <MarketingManagerWorkspace agent={selectedAgent} isArabic={isArabic} />;
      case 'content-seo':
        return <ContentSEOWorkspace agent={selectedAgent} isArabic={isArabic} />;
      case 'social-creator':
        return <SocialCreatorWorkspace agent={selectedAgent} isArabic={isArabic} />;
      case 'social-cx':
        return <SocialCXWorkspace agent={selectedAgent} isArabic={isArabic} />;
      case 'campaign-performance':
        return <CampaignPerformanceWorkspace agent={selectedAgent} isArabic={isArabic} />;
      default:
        return <MarketingManagerWorkspace agent={selectedAgent} isArabic={isArabic} />;
    }
  };

  return (
    <div className="h-full" dir={isArabic ? 'rtl' : 'ltr'}>
      {renderWorkspace()}
    </div>
  );
};

export default AgentWorkspaceArea;
