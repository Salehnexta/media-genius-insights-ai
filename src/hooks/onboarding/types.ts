
export interface OnboardingData {
  skillLevel: string;
  experience: string;
  businessName: string;
  industry: string;
  website: string;
  socialAccounts: Record<string, string>;
  competitors: string[];
  goals: string[];
  budget: string;
  completed?: boolean;
}

export const defaultOnboardingData: OnboardingData = {
  skillLevel: '',
  experience: '',
  businessName: '',
  industry: '',
  website: '',
  socialAccounts: {},
  competitors: [],
  goals: [],
  budget: '',
  completed: false
};
