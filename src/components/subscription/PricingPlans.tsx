
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users } from 'lucide-react';

interface PricingPlansProps {
  plans: Array<{
    id: string;
    name: string;
    price_sar: number;
    monthly_message_limit: number;
    overage_price_sar: number;
    features: any;
  }>;
  currentPlan: any;
  onUpgrade: (planId: string) => void;
  isArabic: boolean;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ plans, currentPlan, onUpgrade, isArabic }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isArabic ? 'خطط الاشتراك المتاحة' : 'Available Subscription Plans'}
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan?.id === plan.id;
          const features = plan.features || {};
          
          return (
            <Card key={plan.id} className={`relative ${isCurrentPlan ? 'ring-2 ring-blue-500' : ''}`}>
              {isCurrentPlan && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                  {isArabic ? 'الخطة الحالية' : 'Current Plan'}
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-blue-600">
                  {plan.price_sar} {isArabic ? 'ريال' : 'SAR'}
                  <span className="text-sm font-normal text-gray-600">
                    /{isArabic ? 'شهر' : 'month'}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {plan.monthly_message_limit.toLocaleString()} {isArabic ? 'رسائل ذكية' : 'AI Messages'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {isArabic ? 'إنتاج محتوى ذكي' : 'AI Content Generation'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {isArabic ? 'تحليلات متقدمة' : 'Advanced Analytics'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {isArabic ? 'نظام ذكي متعدد الوكلاء' : 'Multi-Agent AI System'}
                    </span>
                  </div>

                  {features.priority_support && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">
                        {isArabic ? 'دعم ذو أولوية' : 'Priority Support'}
                      </span>
                    </div>
                  )}

                  {features.team_collaboration && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">
                        {isArabic ? 'تعاون الفريق' : 'Team Collaboration'}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => onUpgrade(plan.id)}
                  disabled={isCurrentPlan}
                  className="w-full"
                  variant={isCurrentPlan ? "outline" : "default"}
                >
                  {isCurrentPlan 
                    ? (isArabic ? 'الخطة الحالية' : 'Current Plan')
                    : (isArabic ? 'ترقية' : 'Upgrade')
                  }
                </Button>

                {plan.overage_price_sar > 0 && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {isArabic ? 'إضافي:' : 'Overage:'} {plan.overage_price_sar} {isArabic ? 'ريال لكل 100 رسالة إضافية' : 'SAR per additional 100 messages'}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PricingPlans;
