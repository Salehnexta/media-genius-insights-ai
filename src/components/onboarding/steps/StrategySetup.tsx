
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { Target, DollarSign, Calendar, Users } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';

interface StrategySetupProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const StrategySetup: React.FC<StrategySetupProps> = ({ data, updateData, isArabic }) => {
  const { t } = useLanguage();

  const goals = [
    { id: 'brand-awareness', label: t('onboarding.strategy.goals.brand-awareness') },
    { id: 'lead-generation', label: t('onboarding.strategy.goals.lead-generation') },
    { id: 'sales-increase', label: t('onboarding.strategy.goals.sales-increase') },
    { id: 'customer-engagement', label: t('onboarding.strategy.goals.customer-engagement') },
    { id: 'market-expansion', label: t('onboarding.strategy.goals.market-expansion') },
    { id: 'competitor-analysis', label: t('onboarding.strategy.goals.competitor-analysis') }
  ];

  const budgetRanges = [
    { id: 'under-1k', label: t('onboarding.strategy.budget.under-1k') },
    { id: '1k-5k', label: t('onboarding.strategy.budget.1k-5k') },
    { id: '5k-10k', label: t('onboarding.strategy.budget.5k-10k') },
    { id: '10k-50k', label: t('onboarding.strategy.budget.10k-50k') },
    { id: 'over-50k', label: t('onboarding.strategy.budget.over-50k') }
  ];

  const handleGoalChange = (goalId: string, checked: boolean) => {
    const newGoals = checked
      ? [...data.goals, goalId]
      : data.goals.filter(g => g !== goalId);
    
    updateData({ goals: newGoals });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600 dark:text-gray-300">
          {t('onboarding.strategy.description')}
        </p>
      </div>

      {/* Marketing Goals */}
      <div className="space-y-4">
        <Label className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
          <Target className="w-4 h-4" />
          {t('onboarding.strategy.goals.title')}
        </Label>
        <div className="grid md:grid-cols-2 gap-3">
          {goals.map((goal) => (
            <div key={goal.id} className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <Checkbox
                id={goal.id}
                checked={data.goals.includes(goal.id)}
                onCheckedChange={(checked) => handleGoalChange(goal.id, checked as boolean)}
              />
              <Label htmlFor={goal.id} className="text-sm font-normal">
                {goal.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Range */}
      <div className="space-y-2">
        <Label className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
          <DollarSign className="w-4 h-4" />
          {t('onboarding.strategy.budget.title')}
        </Label>
        <Select value={data.budget} onValueChange={(value) => updateData({ budget: value })}>
          <SelectTrigger>
            <SelectValue placeholder={t('onboarding.strategy.budget.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            {budgetRanges.map((range) => (
              <SelectItem key={range.id} value={range.id}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Strategy Preview */}
      {(data.goals.length > 0 || data.budget) && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className={`flex items-center mb-3 ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <Calendar className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                {t('onboarding.strategy.preview.title')}
              </h4>
            </div>
            
            {data.goals.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  {t('onboarding.strategy.preview.goals')}
                </p>
                <div className={`flex flex-wrap gap-2 ${isArabic ? 'justify-end' : ''}`}>
                  {data.goals.map((goalId) => {
                    const goal = goals.find(g => g.id === goalId);
                    return goal ? (
                      <Badge key={goalId} variant="secondary">
                        {goal.label}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <p>• {t('onboarding.strategy.preview.campaigns')}</p>
              <p>• {t('onboarding.strategy.preview.timeline')}</p>
              <p>• {t('onboarding.strategy.preview.metrics')}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StrategySetup;
