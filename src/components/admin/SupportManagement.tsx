
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HeadphonesIcon, MessageSquare, Clock, CheckCircle } from 'lucide-react';

const SupportManagement: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`space-y-6 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div>
        <h1 className={`text-2xl font-bold text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
          {isArabic ? 'إدارة الدعم' : 'Support Management'}
        </h1>
        <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
          {isArabic ? 'إدارة تذاكر الدعم والتواصل مع المستخدمين' : 'Manage support tickets and user communications'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">12</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'تذاكر مفتوحة' : 'Open Tickets'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">8</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'قيد المعالجة' : 'In Progress'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">156</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'تم الحل' : 'Resolved'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">2.5h</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'متوسط وقت الاستجابة' : 'Avg Response Time'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className={`${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'التذاكر الحديثة' : 'Recent Tickets'}
          </CardTitle>
          <CardDescription className={`${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'آخر طلبات الدعم المستلمة' : 'Latest support requests received'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((ticket) => (
              <div key={ticket} className={`flex items-center justify-between p-4 border rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">
                      {isArabic ? `تذكرة دعم #${ticket}` : `Support Ticket #${ticket}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {isArabic ? 'مشكلة في الدخول للحساب' : 'Login issue with account'}
                    </p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {isArabic ? 'مفتوح' : 'Open'}
                  </Badge>
                  <span className="text-sm text-gray-500">2h ago</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportManagement;
