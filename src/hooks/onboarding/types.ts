
export interface OnboardingData {
  // البيانات الأساسية المطلوبة من العميل
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  business_name?: string;
  website?: string;
  monthly_budget?: number;
  
  // البيانات المستخرجة تلقائياً
  extracted_social_accounts?: {
    instagram?: {
      handle: string;
      followers: number;
      last_post: string;
      status: 'active' | 'inactive' | 'limited';
      url?: string;
    };
    facebook?: {
      name: string;
      likes: number;
      last_post: string;
      status: 'active' | 'inactive' | 'limited';
      url?: string;
    };
    twitter?: {
      handle: string;
      followers: number;
      status: 'active' | 'inactive' | 'not_found';
      url?: string;
    };
    youtube?: {
      channel: string;
      subscribers: number;
      status: 'active' | 'inactive' | 'not_found';
      url?: string;
    };
    tiktok?: {
      handle: string;
      followers: number;
      status: 'active' | 'inactive' | 'not_found';
      url?: string;
    };
    snapchat?: {
      handle: string;
      status: 'active' | 'inactive' | 'not_found';
      url?: string;
    };
    whatsapp_business?: {
      phone: string;
      status: 'verified' | 'unverified' | 'not_found';
    };
  };
  
  // اقتراحات الذكاء الاصطناعي
  ai_suggested_industry?: string;
  ai_suggested_business_type?: string;
  ai_suggested_target_age_range?: string;
  ai_suggested_target_gender?: 'male' | 'female' | 'both';
  ai_suggested_target_interests?: string[];
  ai_suggested_target_location?: string;
  ai_discovered_competitors?: Array<{
    name: string;
    url?: string;
    type: 'direct' | 'indirect' | 'alternative';
    strength: 'weak' | 'medium' | 'strong' | 'very_strong';
    description: string;
  }>;
  ai_suggested_marketing_goals?: Array<{
    goal: string;
    priority: 'high' | 'medium' | 'low';
    timeline: string;
    metrics: string[];
  }>;
  ai_suggested_channels?: {
    instagram?: { percentage: number; reason: string };
    facebook?: { percentage: number; reason: string };
    google_ads?: { percentage: number; reason: string };
    whatsapp?: { percentage: number; reason: string };
    youtube?: { percentage: number; reason: string };
    tiktok?: { percentage: number; reason: string };
  };
  ai_suggested_posting_times?: {
    lunch?: { start: string; end: string };
    dinner?: { start: string; end: string };
    weekend?: { start: string; end: string };
    optimal_days?: string[];
  };
  ai_suggested_content_types?: {
    food_photos?: number;
    videos?: number;
    offers?: number;
    customer_reviews?: number;
    behind_scenes?: number;
  };
  
  // تأكيدات المستخدم
  user_confirmations?: {
    industry_confirmed?: boolean;
    target_audience_confirmed?: boolean;
    competitors_confirmed?: boolean;
    goals_confirmed?: boolean;
    channels_confirmed?: boolean;
    posting_times_confirmed?: boolean;
    content_types_confirmed?: boolean;
  };
  
  // حالة الاستخراج
  ai_extraction_status?: 'pending' | 'processing' | 'completed' | 'failed';
  social_extraction_status?: 'pending' | 'processing' | 'completed' | 'failed';
  website_analysis_data?: {
    title?: string;
    description?: string;
    keywords?: string[];
    business_description?: string;
    services?: string[];
    products?: string[];
    contact_info?: {
      phone?: string;
      email?: string;
      address?: string;
    };
    technical_info?: {
      platform?: string;
      speed_score?: number;
      mobile_friendly?: boolean;
      ssl_enabled?: boolean;
    };
  };
  
  // البيانات القديمة للتوافق
  skillLevel?: string;
  experience?: string;
  industry?: string;
  socialAccounts?: { [key: string]: string };
  competitors?: string[];
  goals?: string[];
  budget?: string;
  completed?: boolean;
  completed_at?: string;
}

export const defaultOnboardingData: OnboardingData = {
  client_name: '',
  client_email: '',
  client_phone: '',
  business_name: '',
  website: '',
  monthly_budget: 0,
  extracted_social_accounts: {},
  ai_suggested_industry: '',
  ai_suggested_business_type: '',
  ai_suggested_target_age_range: '',
  ai_suggested_target_gender: 'both',
  ai_suggested_target_interests: [],
  ai_suggested_target_location: '',
  ai_discovered_competitors: [],
  ai_suggested_marketing_goals: [],
  ai_suggested_channels: {},
  ai_suggested_posting_times: {},
  ai_suggested_content_types: {},
  user_confirmations: {},
  ai_extraction_status: 'pending',
  social_extraction_status: 'pending',
  website_analysis_data: {},
  skillLevel: '',
  experience: '',
  industry: '',
  socialAccounts: {},
  competitors: [],
  goals: [],
  budget: '',
  completed: false
};

export interface AIExtractionProgress {
  id: string;
  user_id: string;
  onboarding_session_id?: string;
  extraction_type: 'website' | 'social_media' | 'competitors' | 'industry_analysis';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress_percentage: number;
  extracted_data: any;
  ai_confidence_score: number;
  user_confirmed: boolean;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface AISuggestion {
  id: string;
  user_id: string;
  onboarding_session_id?: string;
  suggestion_type: 'industry' | 'target_audience' | 'competitors' | 'goals' | 'channels' | 'content';
  suggestion_data: any;
  confidence_score: number;
  user_response?: 'accepted' | 'rejected' | 'modified';
  user_modifications?: any;
  created_at: string;
  updated_at: string;
}
