
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, MessageCircle, AlertTriangle, Star, Heart, Frown } from 'lucide-react';
import { Agent } from '../MarketingDashboard';

interface SocialCXWorkspaceProps {
  agent: Agent;
  isArabic: boolean;
}

const SocialCXWorkspace: React.FC<SocialCXWorkspaceProps> = ({ agent, isArabic }) => {
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
            {isArabic ? 'المراقبة وتجربة العملاء' : 'Monitoring & Customer Experience'}
          </p>
        </div>
      </div>

      {/* Real-Time Monitoring & Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'المراقبة المباشرة' : 'Real-Time Monitoring'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <MessageCircle className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{isArabic ? 'إشارات العلامة التجارية:' : 'Brand Mentions:'}</span>
              </div>
              <span className="font-bold">47 {isArabic ? 'اليوم' : 'today'}</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'معدل الاستجابة:' : 'Response Rate:'}</span>
              <span className="font-bold text-green-600">96%</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'متوسط الاستجابة:' : 'Avg Response:'}</span>
              <span className="font-bold">12 {isArabic ? 'دقيقة' : 'minutes'}</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'مستوى الأزمة:' : 'Crisis Level:'}</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                🟢 {isArabic ? 'منخفض' : 'Low'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'تحليل المشاعر' : 'Sentiment Analysis'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Heart className="h-4 w-4 text-green-500" />
                <span className="text-sm">{isArabic ? 'إيجابي:' : 'Positive:'}</span>
              </div>
              <span className="font-bold text-green-600">78%</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <MessageCircle className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{isArabic ? 'محايد:' : 'Neutral:'}</span>
              </div>
              <span className="font-bold text-gray-600">18%</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Frown className="h-4 w-4 text-red-500" />
                <span className="text-sm">{isArabic ? 'سلبي:' : 'Negative:'}</span>
              </div>
              <span className="font-bold text-red-600">4%</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'الاتجاه:' : 'Trend:'}</span>
              <div className={`flex items-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="font-bold text-green-600">{isArabic ? 'تحسن' : 'Improving'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Social Feed */}
      <Card>
        <CardHeader>
          <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 'التغذية الاجتماعية المباشرة' : 'Live Social Feed'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
            <div className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium">@sarah_k: {isArabic ? '"أحب الميزات الجديدة! 🙌"' : '"Love the new features! 🙌"'}</p>
                <div className={`flex items-center gap-4 mt-2 text-sm text-gray-600 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span>{isArabic ? 'المنصة: تويتر' : 'Platform: Twitter'}</span>
                  <span>{isArabic ? 'المشاعر: إيجابي' : 'Sentiment: Positive'}</span>
                </div>
                <div className={`flex gap-2 mt-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Button size="sm" variant="outline">{isArabic ? 'رد' : 'Respond'}</Button>
                  <Button size="sm" variant="outline">{isArabic ? 'إعجاب' : 'Like'}</Button>
                  <Button size="sm" variant="outline">{isArabic ? 'مشاركة' : 'Share'}</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20">
            <div className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium">@business_user: {isArabic ? '"أواجه مشاكل في تسجيل الدخول"' : '"Having login issues"'}</p>
                <div className={`flex items-center gap-4 mt-2 text-sm text-gray-600 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span>{isArabic ? 'المنصة: فيسبوك' : 'Platform: Facebook'}</span>
                  <span>{isArabic ? 'المشاعر: محايد' : 'Sentiment: Neutral'}</span>
                </div>
                <div className={`flex gap-2 mt-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Button size="sm" variant="outline">{isArabic ? 'رد' : 'Respond'}</Button>
                  <Button size="sm" variant="destructive">{isArabic ? 'تصعيد' : 'Escalate'}</Button>
                  <Button size="sm" variant="outline">{isArabic ? 'مساعدة' : 'Help'}</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
            <div className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium">@happy_customer: {isArabic ? '"أفضل أداة على الإطلاق!"' : '"Best tool ever!"'}</p>
                <div className={`flex items-center gap-4 mt-2 text-sm text-gray-600 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span>{isArabic ? 'المنصة: لينكد إن' : 'Platform: LinkedIn'}</span>
                  <span>{isArabic ? 'المشاعر: إيجابي' : 'Sentiment: Positive'}</span>
                </div>
                <div className={`flex gap-2 mt-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Button size="sm" variant="outline">{isArabic ? 'شكر' : 'Thank'}</Button>
                  <Button size="sm" variant="outline">{isArabic ? 'مشاركة' : 'Share'}</Button>
                  <Button size="sm" variant="outline">{isArabic ? 'إبراز' : 'Feature'}</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Experience & Competitor Watch */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'تجربة العملاء' : 'Customer Experience'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{isArabic ? 'نقاط رضا العملاء:' : 'CSAT Score:'}</span>
              </div>
              <span className="font-bold">4.7/5 ⭐</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'وقت الاستجابة:' : 'Response Time:'}</span>
              <span className="font-bold text-green-600">8 {isArabic ? 'دقائق' : 'min'}</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'معدل الحل:' : 'Resolution Rate:'}</span>
              <span className="font-bold text-green-600">94%</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'التصعيدات:' : 'Escalations:'}</span>
              <span className="font-bold">2 {isArabic ? 'اليوم' : 'today'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${isArabic ? 'text-right' : ''}`}>
              {isArabic ? 'مراقبة المنافسين' : 'Competitor Watch'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'علامتنا التجارية:' : 'Our Brand:'}</span>
              <span className="font-bold text-green-600">78% {isArabic ? 'إيجابي' : 'positive'}</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'المنافس أ:' : 'Competitor A:'}</span>
              <span className="font-bold text-yellow-600">67%</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'المنافس ب:' : 'Competitor B:'}</span>
              <span className="font-bold text-red-600">45%</span>
            </div>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm">{isArabic ? 'موقعنا في السوق:' : 'Market Position:'}</span>
              <div className={`flex items-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="font-bold text-green-600">#1</span>
                <span className="text-lg">🏆</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialCXWorkspace;
