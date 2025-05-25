
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
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <h1 className={`text-4xl font-bold text-gray-900 dark:text-white mb-4 ${isArabic ? 'font-arabic leading-relaxed' : ''}`}>
                {isArabic ? 'مرحباً بك في منصة التسويق الذكي' : 'Welcome to Smart Marketing Platform'}
              </h1>
              <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${isArabic ? 'leading-relaxed' : ''}`}>
                {isArabic 
                  ? 'اختر أحد الوكلاء الأذكياء من الشريط الجانبي لبدء رحلة التسويق الرقمي المتطورة'
                  : 'Select one of our intelligent agents from the sidebar to begin your advanced digital marketing journey'
                }
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className={`text-xl font-semibold mb-4 text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? 'ذكاء اصطناعي متقدم' : 'Advanced AI Intelligence'}
                </h3>
                <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'leading-relaxed' : ''}`}>
                  {isArabic 
                    ? 'تقنيات ذكية تحلل السوق وتوجه قراراتك التسويقية'
                    : 'Smart technologies that analyze markets and guide your marketing decisions'
                  }
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className={`text-xl font-semibold mb-4 text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? 'استهداف دقيق' : 'Precise Targeting'}
                </h3>
                <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'leading-relaxed' : ''}`}>
                  {isArabic 
                    ? 'استهدف جمهورك المثالي بدقة عالية لتحقيق أفضل النتائج'
                    : 'Target your ideal audience with high precision for optimal results'
                  }
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className={`text-xl font-semibold mb-4 text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? 'تحليلات شاملة' : 'Comprehensive Analytics'}
                </h3>
                <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'leading-relaxed' : ''}`}>
                  {isArabic 
                    ? 'تقارير مفصلة وتحليلات متقدمة لقياس أداء حملاتك'
                    : 'Detailed reports and advanced analytics to measure campaign performance'
                  }
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
                <div className="w-16 h-16 mx-auto mb-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className={`text-xl font-semibold mb-4 text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? 'أتمتة ذكية' : 'Intelligent Automation'}
                </h3>
                <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'leading-relaxed' : ''}`}>
                  {isArabic 
                    ? 'أتمت مهامك التسويقية ووفر الوقت والجهد'
                    : 'Automate your marketing tasks and save time and effort'
                  }
                </p>
              </Card>
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

            {/* Call to Action */}
            <div className={`text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white ${isArabic ? 'font-arabic' : ''}`}>
              <h2 className={`text-3xl font-bold mb-4 ${isArabic ? 'leading-relaxed' : ''}`}>
                {isArabic ? 'ابدأ رحلتك مع الذكاء الاصطناعي' : 'Start Your AI-Powered Journey'}
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
