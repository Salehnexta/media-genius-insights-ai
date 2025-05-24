
import React from 'react';
import { Agent } from '../../pages/Agents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, DollarSign, Eye, MousePointer, Share2, Star, Percent } from 'lucide-react';
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
  if (!selectedAgent) {
    return (
      <div className="h-full overflow-y-auto p-8">
        <div className={`max-w-7xl mx-auto ${isArabic ? 'text-right' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'مرحباً بك في لوحة التحكم' : 'Welcome to Your Dashboard'}
            </h1>
            <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'leading-relaxed' : ''}`}>
              {isArabic ? 'إليك نظرة شاملة على أداء منصتك التسويقية' : 'Here\'s a comprehensive overview of your marketing platform performance'}
            </p>
          </div>

          {/* Dashboard Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Users */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    +12%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <h3 className={`font-semibold text-sm mb-2 ${isArabic ? 'text-right' : ''}`}>
                  {isArabic ? 'إجمالي المستخدمين' : 'Total Users'}
                </h3>
                <div className={`text-2xl font-bold mb-1 ${isArabic ? 'text-right metric-numbers' : ''}`}>
                  24,567
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {isArabic ? '+12% هذا الشهر' : '+12% this month'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isArabic ? 'زيادة مستمرة في قاعدة المستخدمين' : 'Steady growth in user base'}
                </p>
              </CardContent>
            </Card>

            {/* Conversion Rate */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    +0.4%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <h3 className={`font-semibold text-sm mb-2 ${isArabic ? 'text-right' : ''}`}>
                  {isArabic ? 'معدل التحويل' : 'Conversion Rate'}
                </h3>
                <div className={`text-2xl font-bold mb-1 ${isArabic ? 'text-right metric-numbers' : ''}`}>
                  3.24%
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {isArabic ? '+0.4% من الأسبوع الماضي' : '+0.4% from last week'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isArabic ? 'تحسن ملحوظ في معدل التحويل' : 'Notable improvement in conversion'}
                </p>
              </CardContent>
            </Card>

            {/* Monthly Revenue */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    +8.2%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <h3 className={`font-semibold text-sm mb-2 ${isArabic ? 'text-right' : ''}`}>
                  {isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue'}
                </h3>
                <div className={`text-2xl font-bold mb-1 ${isArabic ? 'text-right metric-numbers' : ''}`}>
                  {isArabic ? '١٢٣,٤٥٦ ر.س' : '$123,456'}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {isArabic ? '+8.2% شهرياً' : '+8.2% monthly'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isArabic ? 'نمو مستدام في الإيرادات' : 'Sustainable revenue growth'}
                </p>
              </CardContent>
            </Card>

            {/* Page Views */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                    <Eye className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    +15%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <h3 className={`font-semibold text-sm mb-2 ${isArabic ? 'text-right' : ''}`}>
                  {isArabic ? 'مشاهدات الصفحة' : 'Page Views'}
                </h3>
                <div className={`text-2xl font-bold mb-1 ${isArabic ? 'text-right metric-numbers' : ''}`}>
                  {isArabic ? '٨٩٧,٦٥٤' : '897,654'}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {isArabic ? '+15% اليوم' : '+15% today'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isArabic ? 'زيادة في حركة الزوار' : 'Increased visitor traffic'}
                </p>
              </CardContent>
            </Card>

            {/* Click Rate */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="p-2 rounded-lg bg-pink-100 dark:bg-pink-900/30">
                    <MousePointer className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    +2.1%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <h3 className={`font-semibold text-sm mb-2 ${isArabic ? 'text-right' : ''}`}>
                  {isArabic ? 'معدل النقر' : 'Click Rate'}
                </h3>
                <div className={`text-2xl font-bold mb-1 ${isArabic ? 'text-right metric-numbers' : ''}`}>
                  5.67%
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {isArabic ? '+2.1% هذا الأسبوع' : '+2.1% this week'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isArabic ? 'تفاعل أفضل مع المحتوى' : 'Better content engagement'}
                </p>
              </CardContent>
            </Card>

            {/* Social Shares */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                    <Share2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    +22%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <h3 className={`font-semibold text-sm mb-2 ${isArabic ? 'text-right' : ''}`}>
                  {isArabic ? 'المشاركات الاجتماعية' : 'Social Shares'}
                </h3>
                <div className={`text-2xl font-bold mb-1 ${isArabic ? 'text-right metric-numbers' : ''}`}>
                  {isArabic ? '٤٥,٢٣١' : '45,231'}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {isArabic ? '+22% هذا الشهر' : '+22% this month'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isArabic ? 'نمو قوي في التفاعل الاجتماعي' : 'Strong social engagement growth'}
                </p>
              </CardContent>
            </Card>

            {/* Performance Score */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                    <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    +5
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <h3 className={`font-semibold text-sm mb-2 ${isArabic ? 'text-right' : ''}`}>
                  {isArabic ? 'تقييم الأداء' : 'Performance Score'}
                </h3>
                <div className={`text-2xl font-bold mb-1 ${isArabic ? 'text-right metric-numbers' : ''}`}>
                  {isArabic ? '٩٢/١٠٠' : '92/100'}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {isArabic ? '+5 نقاط' : '+5 points'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isArabic ? 'أداء ممتاز عبر جميع المقاييس' : 'Excellent performance across metrics'}
                </p>
              </CardContent>
            </Card>

            {/* Retention Rate */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/30">
                    <Percent className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    +3.2%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <h3 className={`font-semibold text-sm mb-2 ${isArabic ? 'text-right' : ''}`}>
                  {isArabic ? 'معدل الاحتفاظ' : 'Retention Rate'}
                </h3>
                <div className={`text-2xl font-bold mb-1 ${isArabic ? 'text-right metric-numbers' : ''}`}>
                  89.3%
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {isArabic ? '+3.2% شهرياً' : '+3.2% monthly'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isArabic ? 'احتفاظ ممتاز بالعملاء' : 'Excellent customer retention'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Agent Selection Prompt */}
          <div className={`text-center max-w-md mx-auto ${isArabic ? 'text-right' : ''}`}>
            <div className="text-6xl mb-4">🤖</div>
            <h3 className={`text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2 ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'اختر وكيلاً للبدء' : 'Select an Agent to Start'}
            </h3>
            <p className={`text-gray-500 ${isArabic ? 'text-right leading-relaxed' : ''}`}>
              {isArabic 
                ? 'اختر وكيلاً من الشريط الجانبي الأيسر لعرض مساحة العمل المخصصة والتفاعل معه.'
                : 'Choose an agent from the left sidebar to view their specialized workspace and interact with them.'
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderWorkspace = () => {
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
