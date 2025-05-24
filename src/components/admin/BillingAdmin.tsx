
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, CreditCard, TrendingUp, Users } from 'lucide-react';

const BillingAdmin: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`space-y-6 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div>
        <h1 className={`text-2xl font-bold text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
          {isArabic ? 'إدارة الفواتير والاشتراكات' : 'Billing & Subscriptions'}
        </h1>
        <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
          {isArabic ? 'مراقبة الإيرادات وإدارة اشتراكات المستخدمين' : 'Monitor revenue and manage user subscriptions'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">45,250</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'الإيرادات الشهرية (ريال)' : 'Monthly Revenue (SAR)'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">234</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'المشتركون النشطون' : 'Active Subscribers'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'المنتظرون للدفع' : 'Pending Payments'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">96.5%</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'معدل الاحتفاظ' : 'Retention Rate'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className={`${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'تفاصيل الاشتراكات' : 'Subscription Details'}
          </CardTitle>
          <CardDescription className={`${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'معلومات مفصلة عن خطط الاشتراك والمدفوعات' : 'Detailed subscription plans and payment information'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`text-center py-8 text-gray-500 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'سيتم إضافة تفاصيل الفواتير هنا' : 'Billing details will be implemented here'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingAdmin;
