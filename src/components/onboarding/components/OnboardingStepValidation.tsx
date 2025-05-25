
import { OnboardingData } from '../OnboardingWizard';

export const validateStep = (currentStep: number, data: OnboardingData): boolean => {
  switch (currentStep) {
    case 0: // Skills
      return !!(data.skillLevel && data.experience);
    case 1: // Business
      return !!(data.businessName && data.industry);
    case 2: // Website
      return true; // Website is optional
    case 3: // Social
      return true; // Social media is optional
    case 4: // Competitors
      return true; // Competitors are optional
    case 5: // Strategy
      return !!(data.goals && data.goals.length > 0);
    default:
      return true;
  }
};
