
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Search, FileText, Eye, Clock } from 'lucide-react';
import { Agent } from '../MarketingDashboard';

interface ContentSEOWorkspaceProps {
  agent: Agent;
  isArabic: boolean;
}

const ContentSEOWorkspace: React.FC<ContentSEOWorkspaceProps> = ({ agent, isArabic }) => {
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
            {isArabic ? 'إنشاء المحتوى واستراتيجية السيو' : 'Content Creation & SEO Strategy'}
          </p>
        </div>
      </div>

      {/* Content Performance & SEO Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'أداء المحتوى' : 'Content Performance'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Eye className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{isArabic ? 'زوار المدونة:' : 'Blog Traffic:'}</span>
              </div>
              <span className="font-bold">12,456</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Clock className="h-4 w-4 text-green-500" />
                <span className="text-sm">{isArabic ? 'متوسط التفاعل:' : 'Engagement:'}</span>
              </div>
              <span className="font-bold">4.2 min</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span className="text-sm">{isArabic ? 'معدل التحويل:' : 'Conversion:'}</span>
              </div>
              <span className="font-bold">8.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'مقاييس السيو' : 'SEO Metrics'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Search className="h-4 w-4 text-orange-500" />
                <span className="text-sm">{isArabic ? 'الكلمات المفتاحية:' : 'Keywords:'}</span>
              </div>
              <span className="font-bold">156</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'متوسط الترتيب:' : 'Avg Position:'}</span>
              <span className="font-bold">3.4</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'الزيارات العضوية:' : 'Organic Traffic:'}</span>
              <div className={`flex items-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="font-bold text-green-600">+23%</span>
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 'مسار المحتوى' : 'Content Pipeline'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 mb-2">
                <FileText className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">{isArabic ? 'أفكار' : 'Ideas'}</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4 mb-2">
                <FileText className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
                <div className="text-2xl font-bold text-yellow-600">5</div>
                <div className="text-sm text-gray-600">{isArabic ? 'مسودات' : 'Drafts'}</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-4 mb-2">
                <FileText className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                <div className="text-2xl font-bold text-orange-600">3</div>
                <div className="text-sm text-gray-600">{isArabic ? 'مراجعة' : 'Review'}</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 mb-2">
                <FileText className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <div className="text-2xl font-bold text-green-600">2</div>
                <div className="text-sm text-gray-600">{isArabic ? 'منشور' : 'Live'}</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className={`font-semibold ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'العمل الحالي:' : 'Currently Working On:'}
            </h3>
            
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className={`flex items-center justify-between mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="font-medium">✏️ {isArabic ? '"دليل التسويق بالذكاء الاصطناعي"' : '"AI Marketing Guide"'}</span>
                  <Badge variant="secondary">85% {isArabic ? 'مكتمل' : 'complete'}</Badge>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div className="border rounded-lg p-3">
                <div className={`flex items-center justify-between mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="font-medium">📅 {isArabic ? '"نصائح وسائل التواصل"' : '"Social Media Tips"'}</span>
                  <Badge variant="outline">{isArabic ? 'المخطط جاهز' : 'Outline ready'}</Badge>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <div className={`flex items-center justify-between mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="font-medium">🔍 {isArabic ? '"قائمة فحص السيو"' : '"SEO Checklist"'}</span>
                  <Badge variant="outline">{isArabic ? 'مرحلة البحث' : 'Research phase'}</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Content & SEO Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'أفضل المحتوى أداءً' : 'Top Performing Content'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm font-medium">
                {isArabic ? '"أتمتة التسويق"' : '"Marketing Automation"'}
              </span>
              <span className="text-sm text-gray-600">5,432 {isArabic ? 'مشاهدة' : 'views'}</span>
            </div>
            <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm font-medium">
                {isArabic ? '"عائد الاستثمار لوسائل التواصل"' : '"Social Media ROI"'}
              </span>
              <span className="text-sm text-gray-600">3,221 {isArabic ? 'مشاهدة' : 'views'}</span>
            </div>
            <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm font-medium">
                {isArabic ? '"استراتيجية المحتوى"' : '"Content Strategy"'}
              </span>
              <span className="text-sm text-gray-600">2,876 {isArabic ? 'مشاهدة' : 'views'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'فرص السيو' : 'SEO Opportunities'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className={`flex justify-between items-center mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm font-medium">{isArabic ? 'الهدف:' : 'Target:'}</span>
                <span className="text-sm">{isArabic ? '"التسويق بالذكاء الاصطناعي"' : '"AI marketing"'}</span>
              </div>
              <div className={`flex justify-between items-center mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-xs text-gray-600">{isArabic ? 'الحجم:' : 'Volume:'}</span>
                <span className="text-xs">2,400/{isArabic ? 'شهر' : 'month'}</span>
              </div>
              <div className={`flex justify-between items-center mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-xs text-gray-600">{isArabic ? 'الصعوبة:' : 'Difficulty:'}</span>
                <Badge variant="secondary" className="text-xs">{isArabic ? 'متوسط' : 'Medium'}</Badge>
              </div>
              <div className={`flex justify-between items-center mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-xs text-gray-600">{isArabic ? 'الترتيب الحالي:' : 'Current Rank:'}</span>
                <span className="text-xs">#8</span>
              </div>
              <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-xs text-gray-600">{isArabic ? 'الفرصة:' : 'Opportunity:'}</span>
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  {isArabic ? 'عالية' : 'High'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentSEOWorkspace;
