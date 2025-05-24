
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, DollarSign, Target, BarChart3 } from 'lucide-react';
import { Agent } from '../MarketingDashboard';

interface MarketingManagerWorkspaceProps {
  agent: Agent;
  isArabic: boolean;
}

const MarketingManagerWorkspace: React.FC<MarketingManagerWorkspaceProps> = ({ agent, isArabic }) => {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <span className="text-3xl">{agent.icon}</span>
        <div className={isArabic ? 'text-right' : ''}>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {agent.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isArabic ? 'الاستراتيجية وتنسيق الحملات' : 'Strategy & Campaign Coordination'}
          </p>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={isArabic ? 'text-right' : ''}>
                <p className="text-2xl font-bold text-green-600">456%</p>
                <p className="text-sm text-gray-600">{isArabic ? 'إجمالي العائد على الاستثمار' : 'Total ROI'}</p>
                <div className={`flex items-center text-xs text-green-600 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+23%</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={isArabic ? 'text-right' : ''}>
                <p className="text-2xl font-bold text-blue-600">$45,678</p>
                <p className="text-sm text-gray-600">{isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue'}</p>
                <div className={`flex items-center text-xs text-green-600 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+15%</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={isArabic ? 'text-right' : ''}>
                <p className="text-2xl font-bold text-purple-600">8</p>
                <p className="text-sm text-gray-600">{isArabic ? 'الحملات النشطة' : 'Active Campaigns'}</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {isArabic ? 'جميعها نشطة' : 'All Active'}
                </Badge>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={isArabic ? 'text-right' : ''}>
                <p className="text-2xl font-bold text-orange-600">73%</p>
                <p className="text-sm text-gray-600">{isArabic ? 'الميزانية المستخدمة' : 'Budget Used'}</p>
                <div className={`flex items-center text-xs text-green-600 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>{isArabic ? 'على المسار الصحيح' : 'On Track'}</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'نظرة عامة على أداء الفريق' : 'Team Performance Overview'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm font-medium">
                  {isArabic ? 'أخصائي المحتوى' : 'Content Specialist'}
                </span>
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm text-green-600 font-medium">96%</span>
                  <Badge variant="secondary" className="text-xs">
                    {isArabic ? 'ممتاز' : 'Excellent'}
                  </Badge>
                </div>
              </div>
              <Progress value={96} className="h-2" />
            </div>

            <div>
              <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm font-medium">
                  {isArabic ? 'منشئ المحتوى الاجتماعي' : 'Social Creator'}
                </span>
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm text-green-600 font-medium">92%</span>
                  <Badge variant="secondary" className="text-xs">
                    {isArabic ? 'جيد' : 'Good'}
                  </Badge>
                </div>
              </div>
              <Progress value={92} className="h-2" />
            </div>

            <div>
              <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm font-medium">
                  {isArabic ? 'مدير التجربة' : 'CX Manager'}
                </span>
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm text-green-600 font-medium">89%</span>
                  <Badge variant="secondary" className="text-xs">
                    {isArabic ? 'جيد' : 'Good'}
                  </Badge>
                </div>
              </div>
              <Progress value={89} className="h-2" />
            </div>

            <div>
              <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm font-medium">
                  {isArabic ? 'أخصائي الحملات' : 'Campaign Specialist'}
                </span>
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm text-green-600 font-medium">94%</span>
                  <Badge variant="secondary" className="text-xs">
                    {isArabic ? 'ممتاز' : 'Excellent'}
                  </Badge>
                </div>
              </div>
              <Progress value={94} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Budget Allocation */}
        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'توزيع الميزانية' : 'Budget Allocation'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm font-medium">
                  {isArabic ? 'المحتوى' : 'Content'}
                </span>
                <span className="text-sm font-bold">35%</span>
              </div>
              <Progress value={35} className="h-3" />
            </div>

            <div>
              <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm font-medium">
                  {isArabic ? 'وسائل التواصل' : 'Social Media'}
                </span>
                <span className="text-sm font-bold">25%</span>
              </div>
              <Progress value={25} className="h-3" />
            </div>

            <div>
              <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm font-medium">
                  {isArabic ? 'الإعلانات' : 'Advertising'}
                </span>
                <span className="text-sm font-bold">30%</span>
              </div>
              <Progress value={30} className="h-3" />
            </div>

            <div>
              <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm font-medium">
                  {isArabic ? 'الأدوات' : 'Tools'}
                </span>
                <span className="text-sm font-bold">10%</span>
              </div>
              <Progress value={10} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Strategic Initiatives */}
      <Card>
        <CardHeader>
          <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 'المبادرات الاستراتيجية الحالية' : 'Current Strategic Initiatives'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm font-medium">
                    {isArabic ? 'حملة العلامة التجارية للربع الأول' : 'Q1 Brand Campaign'}
                  </span>
                  <span className="text-sm font-bold">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div>
                <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm font-medium">
                    {isArabic ? 'توسيع المحتوى' : 'Content Scale-up'}
                  </span>
                  <span className="text-sm font-bold">90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>

              <div>
                <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm font-medium">
                    {isArabic ? 'تحسين وسائل التواصل' : 'Social Optimization'}
                  </span>
                  <span className="text-sm font-bold">40%</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>

              <div>
                <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm font-medium">
                    {isArabic ? 'تعزيز الأداء' : 'Performance Boost'}
                  </span>
                  <span className="text-sm font-bold">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingManagerWorkspace;
