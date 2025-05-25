
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MessageSquare, Image, BarChart3 } from 'lucide-react';

interface UsageTrackingCardProps {
  usage: {
    message_count: number;
    content_generation_count: number;
    api_calls_count: number;
  };
  plan: {
    monthly_message_limit: number;
  };
  isArabic: boolean;
}

const UsageTrackingCard: React.FC<UsageTrackingCardProps> = ({ usage, plan, isArabic }) => {
  const getUsagePercentage = (current: number, limit: number) => {
    return Math.min((current / limit) * 100, 100);
  };

  const usageItems = [
    {
      icon: MessageSquare,
      label: isArabic ? 'الرسائل الذكية' : 'AI Messages',
      current: usage.message_count,
      limit: plan.monthly_message_limit,
      color: 'text-blue-600'
    },
    {
      icon: Image,
      label: isArabic ? 'إنتاج المحتوى' : 'Content Generation',
      current: usage.content_generation_count,
      limit: 100,
      color: 'text-purple-600'
    },
    {
      icon: BarChart3,
      label: isArabic ? 'استدعاءات API' : 'API Calls',
      current: usage.api_calls_count,
      limit: 1000,
      color: 'text-green-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isArabic ? 'استخدام الشهر الحالي' : 'Current Month Usage'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {usageItems.map((item, index) => (
            <div key={index}>
              <div className="flex items-center gap-2 mb-2">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <Progress 
                value={getUsagePercentage(item.current, item.limit)} 
                className="h-2 mb-1"
              />
              <p className="text-sm text-gray-600">
                {item.current.toLocaleString()} / {item.limit.toLocaleString()} 
                {isArabic && item.label.includes('Messages') && ' رسائل'}
                {isArabic && item.label.includes('Content') && ' قطعة'}
                {isArabic && item.label.includes('API') && ' استدعاء'}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageTrackingCard;
