
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OnboardingData } from '@/hooks/onboarding/types';
import { User, Mail, Phone, Building, Globe, DollarSign } from 'lucide-react';

interface BasicClientInfoProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const BasicClientInfo: React.FC<BasicClientInfoProps> = ({ data, updateData, isArabic }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <User className="w-5 h-5 text-blue-600" />
            {isArabic ? 'المعلومات الأساسية' : 'Basic Information'}
          </CardTitle>
          <CardDescription>
            {isArabic 
              ? 'نحتاج فقط هذه المعلومات الأساسية، وسيقوم الذكاء الاصطناعي باستخراج باقي البيانات تلقائياً'
              : 'We only need this basic information, AI will extract the rest automatically'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* اسم العميل */}
          <div className="space-y-2">
            <Label htmlFor="client_name" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <User className="w-4 h-4" />
              {isArabic ? 'الاسم الكامل' : 'Full Name'}
            </Label>
            <Input
              id="client_name"
              value={data.client_name || ''}
              onChange={(e) => updateData({ client_name: e.target.value })}
              placeholder={isArabic ? 'أدخل اسمك الكامل' : 'Enter your full name'}
              className={isArabic ? 'text-right' : ''}
            />
          </div>

          {/* البريد الإلكتروني */}
          <div className="space-y-2">
            <Label htmlFor="client_email" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Mail className="w-4 h-4" />
              {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
            </Label>
            <Input
              id="client_email"
              type="email"
              value={data.client_email || ''}
              onChange={(e) => updateData({ client_email: e.target.value })}
              placeholder={isArabic ? 'example@company.com' : 'example@company.com'}
              className={isArabic ? 'text-right' : ''}
            />
          </div>

          {/* رقم الهاتف */}
          <div className="space-y-2">
            <Label htmlFor="client_phone" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Phone className="w-4 h-4" />
              {isArabic ? 'رقم الهاتف' : 'Phone Number'}
            </Label>
            <Input
              id="client_phone"
              type="tel"
              value={data.client_phone || ''}
              onChange={(e) => updateData({ client_phone: e.target.value })}
              placeholder={isArabic ? '+966501234567' : '+966501234567'}
              className={isArabic ? 'text-right' : ''}
            />
          </div>

          {/* اسم النشاط التجاري */}
          <div className="space-y-2">
            <Label htmlFor="business_name" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Building className="w-4 h-4" />
              {isArabic ? 'اسم النشاط التجاري' : 'Business Name'}
            </Label>
            <Input
              id="business_name"
              value={data.business_name || ''}
              onChange={(e) => updateData({ business_name: e.target.value })}
              placeholder={isArabic ? 'مطعم البرجر الذهبي' : 'Golden Burger Restaurant'}
              className={isArabic ? 'text-right' : ''}
            />
          </div>

          {/* رابط الموقع الإلكتروني */}
          <div className="space-y-2">
            <Label htmlFor="website" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Globe className="w-4 h-4" />
              {isArabic ? 'رابط الموقع الإلكتروني (اختياري)' : 'Website URL (Optional)'}
            </Label>
            <Input
              id="website"
              type="url"
              value={data.website || ''}
              onChange={(e) => updateData({ website: e.target.value })}
              placeholder={isArabic ? 'https://www.yourwebsite.com' : 'https://www.yourwebsite.com'}
              className={isArabic ? 'text-right' : ''}
            />
            <p className="text-sm text-gray-500">
              {isArabic 
                ? 'سيساعدنا الموقع في استخراج المعلومات وحسابات التواصل الاجتماعي تلقائياً'
                : 'This will help us extract information and social media accounts automatically'
              }
            </p>
          </div>

          {/* الميزانية الشهرية */}
          <div className="space-y-2">
            <Label htmlFor="monthly_budget" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <DollarSign className="w-4 h-4" />
              {isArabic ? 'الميزانية الشهرية المفضلة للتسويق (ريال سعودي)' : 'Preferred Monthly Marketing Budget (SAR)'}
            </Label>
            <Input
              id="monthly_budget"
              type="number"
              value={data.monthly_budget || ''}
              onChange={(e) => updateData({ monthly_budget: Number(e.target.value) })}
              placeholder={isArabic ? '2000' : '2000'}
              min="0"
              step="100"
              className={isArabic ? 'text-right' : ''}
            />
            <p className="text-sm text-gray-500">
              {isArabic 
                ? 'ستساعدنا هذه المعلومة في اقتراح أفضل الاستراتيجيات التسويقية المناسبة لميزانيتك'
                : 'This will help us suggest the best marketing strategies suitable for your budget'
              }
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          {isArabic ? '🤖 ما سيحدث بعد ذلك؟' : '🤖 What happens next?'}
        </h3>
        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            {isArabic ? 'سيحلل الذكاء الاصطناعي موقعك ويستخرج المعلومات' : 'AI will analyze your website and extract information'}
          </li>
          <li className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            {isArabic ? 'سيكتشف حسابات التواصل الاجتماعي تلقائياً' : 'Will discover social media accounts automatically'}
          </li>
          <li className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            {isArabic ? 'سيقترح استراتيجية تسويقية مخصصة لنشاطك' : 'Will suggest a customized marketing strategy for your business'}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BasicClientInfo;
