
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface RTLMetricCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: React.ReactNode;
  color: string;
  description?: string;
}

const RTLMetricCard: React.FC<RTLMetricCardProps> = ({
  title,
  value,
  trend,
  trendValue,
  icon,
  color,
  description
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return null;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <Card className={`hover:shadow-md transition-shadow ${isArabic ? 'rtl' : ''}`}>
      <CardContent className="p-6">
        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={`flex-1 ${isArabic ? 'text-right mr-4' : 'text-left ml-4'}`}>
            <p className={`text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 ${isArabic ? 'text-right' : ''}`}>
              {title}
            </p>
            <p className={`text-2xl font-bold text-gray-900 dark:text-white ${isArabic ? 'text-right font-arabic' : ''}`}>
              {value}
            </p>
            {trendValue && (
              <div className={`flex items-center mt-1 ${isArabic ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
                {getTrendIcon()}
                <span className={`text-sm ${getTrendColor()} ${isArabic ? 'mr-1' : 'ml-1'}`}>
                  {trendValue}
                </span>
              </div>
            )}
            {description && (
              <p className={`text-xs text-gray-500 mt-2 ${isArabic ? 'text-right leading-relaxed' : ''}`}>
                {description}
              </p>
            )}
          </div>
          <div className={`${color} text-white p-3 rounded-lg`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RTLMetricCard;
