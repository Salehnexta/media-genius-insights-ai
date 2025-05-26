
import BasicClientInfo from '../steps/BasicClientInfo';
import SocialMediaExtraction from '../steps/SocialMediaExtraction';
import AIRecommendations from '../steps/AIRecommendations';

export const getOnboardingSteps = (isArabic: boolean) => [
  {
    id: 'basic_info',
    title: isArabic ? 'المعلومات الأساسية' : 'Basic Information',
    description: isArabic ? 'معلوماتك الأساسية لبدء التحليل' : 'Your basic information to start analysis',
    component: BasicClientInfo,
    validation: (data: any) => {
      return !!(
        data.client_name?.trim() &&
        data.client_email?.trim() &&
        data.client_phone?.trim() &&
        data.business_name?.trim() &&
        data.monthly_budget > 0
      );
    }
  },
  {
    id: 'social_extraction',
    title: isArabic ? 'حسابات التواصل الاجتماعي' : 'Social Media Accounts',
    description: isArabic ? 'استخراج وتأكيد حسابات التواصل' : 'Extract and confirm social accounts',
    component: SocialMediaExtraction,
    validation: (data: any) => {
      return data.social_extraction_status === 'completed';
    }
  },
  {
    id: 'ai_recommendations',
    title: isArabic ? 'التوصيات الذكية' : 'AI Recommendations',
    description: isArabic ? 'مراجعة وتأكيد اقتراحات الذكاء الاصطناعي' : 'Review and confirm AI suggestions',
    component: AIRecommendations,
    validation: (data: any) => {
      const confirmations = data.user_confirmations || {};
      return !!(
        confirmations.industry_confirmed &&
        confirmations.target_audience_confirmed &&
        confirmations.goals_confirmed
      );
    }
  }
];
