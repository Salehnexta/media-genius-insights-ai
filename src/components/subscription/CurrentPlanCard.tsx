
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Clock } from 'lucide-react';

interface CurrentPlanCardProps {
  plan: {
    id: string;
    name: string;
    price_sar: number;
    monthly_message_limit: number;
    features: any;
  };
  subscription: {
    id: string;
    current_period_start: string;
    current_period_end: string;
  };
  isArabic: boolean;
}

const CurrentPlanCard: React.FC<CurrentPlanCardProps> = ({ plan, subscription, isArabic }) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-600" />
          {isArabic ? 'خطتك الحالية' : 'Current Plan'}: {plan.name}
          <Badge variant="secondary">{isArabic ? 'نشط' : 'Active'}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-3xl font-bold text-blue-600">
              {plan.price_sar} {isArabic ? 'ريال' : 'SAR'}
              <span className="text-sm font-normal text-gray-600">
                /{isArabic ? 'شهر' : 'month'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {plan.monthly_message_limit.toLocaleString()} {isArabic ? 'رسائل ذكية شهرياً' : 'AI messages monthly'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>
              {isArabic ? 'دورة الفوترة' : 'Billing period'}: {' '}
              {new Date(subscription.current_period_start).toLocaleDateString()} - {' '}
              {new Date(subscription.current_period_end).toLocaleDateString()}
            </span>
          </div>

          <Button variant="outline" className="w-full">
            {isArabic ? 'إدارة الاشتراك' : 'Manage Subscription'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentPlanCard;
