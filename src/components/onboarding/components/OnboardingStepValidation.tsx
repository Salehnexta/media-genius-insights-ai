
import { OnboardingData } from '@/hooks/onboarding/types';

export const validateStep = (stepIndex: number, data: OnboardingData): boolean => {
  console.log('=== VALIDATING STEP ===');
  console.log('Step index:', stepIndex);
  console.log('Data for validation:', data);

  switch (stepIndex) {
    case 0: // Basic Client Info
      const basicInfoValid = !!(
        data.client_name?.trim() &&
        data.client_email?.trim() &&
        data.client_phone?.trim() &&
        data.business_name?.trim() &&
        data.monthly_budget && data.monthly_budget > 0
      );
      console.log('Basic info validation result:', basicInfoValid);
      return basicInfoValid;

    case 1: // Social Media Extraction
      const socialExtractionValid = data.social_extraction_status === 'completed';
      console.log('Social extraction validation result:', socialExtractionValid);
      return socialExtractionValid;

    case 2: // AI Recommendations
      const confirmations = data.user_confirmations || {};
      const aiRecommendationsValid = !!(
        confirmations.industry_confirmed &&
        confirmations.target_audience_confirmed &&
        confirmations.goals_confirmed
      );
      console.log('AI recommendations validation result:', aiRecommendationsValid);
      console.log('Confirmations:', confirmations);
      return aiRecommendationsValid;

    default:
      console.log('Unknown step, defaulting to false');
      return false;
  }
};

export default validateStep;
