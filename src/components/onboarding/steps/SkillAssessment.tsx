
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Brain, Target, TrendingUp, Users } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';

interface SkillAssessmentProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const SkillAssessment: React.FC<SkillAssessmentProps> = ({ data, updateData, isArabic }) => {
  const { t } = useLanguage();

  const skillLevels = [
    {
      id: 'beginner',
      title: t('onboarding.skill.beginner.title'),
      description: t('onboarding.skill.beginner.description'),
      icon: <Brain className="w-6 h-6" />,
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    },
    {
      id: 'intermediate',
      title: t('onboarding.skill.intermediate.title'),
      description: t('onboarding.skill.intermediate.description'),
      icon: <Target className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    },
    {
      id: 'advanced',
      title: t('onboarding.skill.advanced.title'),
      description: t('onboarding.skill.advanced.description'),
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    },
    {
      id: 'expert',
      title: t('onboarding.skill.expert.title'),
      description: t('onboarding.skill.expert.description'),
      icon: <Users className="w-6 h-6" />,
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
    }
  ];

  const experienceOptions = [
    { id: 'none', label: t('onboarding.experience.none') },
    { id: '1-2years', label: t('onboarding.experience.1-2years') },
    { id: '3-5years', label: t('onboarding.experience.3-5years') },
    { id: '5+years', label: t('onboarding.experience.5+years') }
  ];

  return (
    <div className="space-y-8">
      {/* Skill Level Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('onboarding.skill.question')}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {skillLevels.map((level) => (
            <Card
              key={level.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                data.skillLevel === level.id
                  ? 'ring-2 ring-blue-500 border-blue-500'
                  : 'hover:border-gray-300'
              }`}
              onClick={() => updateData({ skillLevel: level.id })}
            >
              <CardContent className="p-6">
                <div className={`flex items-start ${isArabic ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                  <div className={`p-2 rounded-lg ${level.color}`}>
                    {level.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {level.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {level.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Experience Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('onboarding.experience.question')}
        </h3>
        <RadioGroup
          value={data.experience}
          onValueChange={(value) => updateData({ experience: value })}
          className="space-y-3"
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          {experienceOptions.map((option) => (
            <div key={option.id} className={`flex items-center ${isArabic ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'}`}>
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="font-medium cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Personalized Recommendations Preview */}
      {data.skillLevel && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            {t('onboarding.skill.recommendations')}
          </h4>
          <div className={`flex flex-wrap gap-2 ${isArabic ? 'justify-end' : ''}`}>
            <Badge variant="secondary">{t('onboarding.skill.feature.tutorials')}</Badge>
            <Badge variant="secondary">{t('onboarding.skill.feature.templates')}</Badge>
            <Badge variant="secondary">{t('onboarding.skill.feature.guidance')}</Badge>
            <Badge variant="secondary">{t('onboarding.skill.feature.automation')}</Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillAssessment;
