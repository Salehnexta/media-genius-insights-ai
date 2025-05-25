
import SkillAssessment from '../steps/SkillAssessment';
import BusinessInfo from '../steps/BusinessInfo';
import WebsiteAnalysis from '../steps/WebsiteAnalysis';
import SocialMediaSetup from '../steps/SocialMediaSetup';
import CompetitorAnalysis from '../steps/CompetitorAnalysis';
import StrategySetup from '../steps/StrategySetup';

export const getOnboardingSteps = (isArabic: boolean) => [
  {
    id: 'skills',
    title: isArabic ? 'تقييم المهارات' : 'Skill Assessment',
    component: SkillAssessment
  },
  {
    id: 'business',
    title: isArabic ? 'معلومات العمل' : 'Business Information',
    component: BusinessInfo
  },
  {
    id: 'website',
    title: isArabic ? 'تحليل الموقع' : 'Website Analysis',
    component: WebsiteAnalysis
  },
  {
    id: 'social',
    title: isArabic ? 'وسائل التواصل' : 'Social Media',
    component: SocialMediaSetup
  },
  {
    id: 'competitors',
    title: isArabic ? 'تحليل المنافسين' : 'Competitor Analysis',
    component: CompetitorAnalysis
  },
  {
    id: 'strategy',
    title: isArabic ? 'إعداد الاستراتيجية' : 'Strategy Setup',
    component: StrategySetup
  }
];
