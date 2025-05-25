
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, CreditCard, Calendar, TrendingUp, Database, MessageSquare } from 'lucide-react';
import CurrentPlanCard from '@/components/subscription/CurrentPlanCard';

interface SubscriptionSectionProps {
  subscription: any;
  stats: any;
  isArabic: boolean;
}

const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({
  subscription,
  stats,
  isArabic
}) => {
  const mockBillingHistory = [
    {
      id: 1,
      date: '2024-01-15',
      amount: 299,
      status: 'paid',
      invoice: 'INV-001'
    },
    {
      id: 2,
      date: '2023-12-15',
      amount: 299,
      status: 'paid',
      invoice: 'INV-002'
    },
    {
      id: 3,
      date: '2023-11-15',
      amount: 299,
      status: 'paid',
      invoice: 'INV-003'
    }
  ];

  const usageStats = [
    {
      title: isArabic ? 'رسائل الذكي الاصطناعي' : 'AI Messages',
      used: 850,
      total: 1000,
      icon: MessageSquare,
      color: 'bg-blue-500'
    },
    {
      title: isArabic ? 'مساحة التخزين' : 'Storage Space',
      used: stats.storageUsed,
      total: 100,
      icon: Database,
      color: 'bg-green-500',
      unit: isArabic ? 'جيجا' : 'GB'
    },
    {
      title: isArabic ? 'استدعاءات API' : 'API Calls',
      used: stats.apiCalls,
      total: 5000,
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  if (!subscription) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">
              {isArabic ? 'لا يوجد اشتراك نشط' : 'No Active Subscription'}
            </h3>
            <p className="text-sm">
              {isArabic ? 'اشترك في إحدى خططنا للوصول إلى جميع الميزات' : 'Subscribe to one of our plans to access all features'}
            </p>
          </div>
          <Button>
            {isArabic ? 'اختيار خطة' : 'Choose a Plan'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <CurrentPlanCard 
        plan={subscription.subscription_plans}
        subscription={subscription}
        isArabic={isArabic}
      />

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
            <TrendingUp className="h-5 w-5" />
            {isArabic ? 'إحصائيات الاستخدام' : 'Usage Statistics'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {usageStats.map((stat, index) => (
              <div key={index} className="space-y-3">
                <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-2 rounded-lg ${stat.color} bg-opacity-20`}>
                    <stat.icon className={`h-5 w-5 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div className={isArabic ? 'text-right' : ''}>
                    <h4 className="font-medium text-sm">{stat.title}</h4>
                    <p className="text-xs text-gray-500">
                      {stat.used.toLocaleString()} / {stat.total.toLocaleString()} {stat.unit || ''}
                    </p>
                  </div>
                </div>
                <Progress value={(stat.used / stat.total) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
            <CreditCard className="h-5 w-5" />
            {isArabic ? 'تاريخ الفوترة' : 'Billing History'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockBillingHistory.map((bill) => (
              <div key={bill.id} className={`flex items-center justify-between p-4 border rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">
                      {new Date(bill.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="text-lg font-bold">
                      {bill.amount} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                    <Badge variant={bill.status === 'paid' ? 'default' : 'destructive'}>
                      {bill.status === 'paid' ? (isArabic ? 'مدفوع' : 'Paid') : (isArabic ? 'معلق' : 'Pending')}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {isArabic ? 'تحميل الفاتورة' : 'Download Invoice'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plan Management */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
            <Zap className="h-5 w-5" />
            {isArabic ? 'إدارة الخطة' : 'Plan Management'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`flex gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Button variant="outline">
              {isArabic ? 'ترقية الخطة' : 'Upgrade Plan'}
            </Button>
            <Button variant="outline">
              {isArabic ? 'تحديث طريقة الدفع' : 'Update Payment Method'}
            </Button>
            <Button variant="outline">
              {isArabic ? 'إلغاء الاشتراك' : 'Cancel Subscription'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionSection;
