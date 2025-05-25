
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, ArrowUpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BillingSectionProps {
  subscription: any;
  getSubscriptionBadge: (planName: string) => React.ReactNode;
}

const BillingSection: React.FC<BillingSectionProps> = ({
  subscription,
  getSubscriptionBadge
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="space-y-6">
      {subscription && (
        <Card className="border-2 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              {isArabic ? 'اشتراكك الحالي' : 'Current Subscription'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {getSubscriptionBadge(subscription.subscription_plans.name)}
                  <span className="text-2xl font-bold">
                    {subscription.subscription_plans.price_sar} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                  <span className="text-gray-500">/{isArabic ? 'شهر' : 'month'}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isArabic ? 'ينتهي في:' : 'Expires on:'} {new Date(subscription.current_period_end).toLocaleDateString()}
                </p>
              </div>
              <Button variant="outline">
                {isArabic ? 'إدارة الاشتراك' : 'Manage Subscription'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-center">{isArabic ? 'أساسي' : 'Basic'}</CardTitle>
            <div className="text-center">
              <span className="text-3xl font-bold">99</span>
              <span className="text-gray-500"> {isArabic ? 'ريال/شهر' : 'SAR/month'}</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className={`space-y-2 text-sm ${isArabic ? 'text-right' : ''}`}>
              <li>✓ {isArabic ? '1000 رسالة شهريًا' : '1,000 messages/month'}</li>
              <li>✓ {isArabic ? 'تحليلات أساسية' : 'Basic analytics'}</li>
              <li>✓ {isArabic ? 'دعم بريد إلكتروني' : 'Email support'}</li>
            </ul>
            <Button className="w-full mt-4" variant="outline">
              {isArabic ? 'خطة حالية' : 'Current Plan'}
            </Button>
          </CardContent>
        </Card>

        <Card className="relative border-2 border-blue-500">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-blue-500">{isArabic ? 'الأكثر شعبية' : 'Most Popular'}</Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-center">{isArabic ? 'احترافي' : 'Professional'}</CardTitle>
            <div className="text-center">
              <span className="text-3xl font-bold">299</span>
              <span className="text-gray-500"> {isArabic ? 'ريال/شهر' : 'SAR/month'}</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className={`space-y-2 text-sm ${isArabic ? 'text-right' : ''}`}>
              <li>✓ {isArabic ? '10,000 رسالة شهريًا' : '10,000 messages/month'}</li>
              <li>✓ {isArabic ? 'تحليلات متقدمة' : 'Advanced analytics'}</li>
              <li>✓ {isArabic ? 'دعم أولوية' : 'Priority support'}</li>
              <li>✓ {isArabic ? 'تكامل API' : 'API integration'}</li>
            </ul>
            <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
              <ArrowUpCircle className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
              {isArabic ? 'ترقية الآن' : 'Upgrade Now'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">{isArabic ? 'مؤسسي' : 'Enterprise'}</CardTitle>
            <div className="text-center">
              <span className="text-3xl font-bold">999</span>
              <span className="text-gray-500"> {isArabic ? 'ريال/شهر' : 'SAR/month'}</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className={`space-y-2 text-sm ${isArabic ? 'text-right' : ''}`}>
              <li>✓ {isArabic ? 'رسائل غير محدودة' : 'Unlimited messages'}</li>
              <li>✓ {isArabic ? 'تحليلات مخصصة' : 'Custom analytics'}</li>
              <li>✓ {isArabic ? 'دعم مخصص 24/7' : 'Dedicated 24/7 support'}</li>
              <li>✓ {isArabic ? 'ميزات مؤسسية' : 'Enterprise features'}</li>
            </ul>
            <Button className="w-full mt-4" variant="outline">
              {isArabic ? 'تواصل معنا' : 'Contact Sales'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillingSection;
