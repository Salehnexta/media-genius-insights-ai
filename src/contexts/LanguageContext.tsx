import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation object
const translations = {
  en: {
    'dashboard.title': 'Marketing Analytics Dashboard',
    'dashboard.subtitle': 'Track your marketing performance and insights',
    'time.today': 'Today',
    'time.yesterday': 'Yesterday',
    'time.7days': 'Last 7 days',
    'time.30days': 'Last 30 days',
    'time.90days': 'Last 90 days',
    'time.custom': 'Custom range',
    'export': 'Export',
    'chat.insights': 'AI Insights',
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.username': 'Username',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    'profile.title': 'Profile',
    'profile.personalInfo': 'Personal Information',
    'profile.companyInfo': 'Company Information',
    'campaigns.title': 'Campaigns',
    'campaigns.create': 'Create Campaign',
    'campaigns.name': 'Campaign Name',
    'campaigns.description': 'Description',
    'campaigns.budget': 'Budget',
    'campaigns.startDate': 'Start Date',
    'campaigns.endDate': 'End Date',
    'campaigns.status': 'Status',
    'campaigns.active': 'Active',
    'campaigns.paused': 'Paused',
    'campaigns.completed': 'Completed',
    'overview': 'Overview',
    'audience': 'Audience',
    'competitors': 'Competitors',
    'sentiment': 'Sentiment',
    'content.creator': 'Content Creator',
    // Chart translations
    'chart.market.share': 'Market Share',
    'chart.market.share.label': 'Market Share',
    'chart.performance.benchmark': 'Performance Benchmark',
    'chart.your.brand': 'Your Brand',
    'chart.competitor.a': 'Competitor A',
    'chart.competitor.b': 'Competitor B',
    'chart.competitor.c': 'Competitor C',
    'chart.market.evolution': 'Market Evolution',
    'chart.traffic.comparison': 'Traffic Comparison',
    'chart.brand.positioning': 'Brand Positioning',
    'chart.quality': 'Quality',
    'chart.price': 'Price',
    'chart.website.traffic': 'Website Traffic',
    'chart.social.media': 'Social Media',
    'chart.performance.trends': 'Performance Trends',
    'chart.positive': 'Positive',
    'chart.negative': 'Negative',
    'chart.neutral': 'Neutral',
    'chart.sentiment.analysis': 'Sentiment Analysis',
    'chart.share.voice': 'Share of Voice',
    'chart.media.mentions': 'Media Mentions',
    'chart.mentions.last.7.days': 'Mentions in last 7 days',
    'chart.increase.from.last.week': 'increase from last week',
    // Month translations
    'month.jan': 'Jan',
    'month.feb': 'Feb',
    'month.mar': 'Mar',
    'month.apr': 'Apr',
    'month.may': 'May',
    'month.jun': 'Jun',
    'month.jul': 'Jul',
    'month.aug': 'Aug',
    'month.sep': 'Sep',
    'month.oct': 'Oct',
    'month.nov': 'Nov',
    'month.dec': 'Dec',
    // Day translations
    'day.mon': 'Mon',
    'day.tue': 'Tue',
    'day.wed': 'Wed',
    'day.thu': 'Thu',
    'day.fri': 'Fri',
    'day.sat': 'Sat',
    'day.sun': 'Sun',
    // Metric translations
    'metric.market.share': 'Market Share',
    'metric.brand.awareness': 'Brand Awareness',
    'metric.customer.satisfaction': 'Customer Satisfaction',
    'metric.innovation.index': 'Innovation Index',
    'metric.price.competitiveness': 'Price Competitiveness',
    // Chat translations
    'chat.welcome': 'Welcome to your AI Marketing Assistant! I can help you analyze your campaigns, track performance, and provide insights.',
    'chat.alert': '🚨 Alert: Your latest campaign performance is down 12% from last week. Would you like me to analyze the causes?',
    'chat.placeholder': 'Ask me anything about your marketing data...',
    'chat.send': 'Send',
    'chat.example': 'Example: "Show me my best performing campaigns"',
    'chat.language.indicator': 'EN',
    'chat.suggestion.today': 'What can I help you with today?',
    'suggestion.campaign.title': 'Campaign Analysis',
    'suggestion.campaign.subtitle': 'Analyze your campaign performance',
    'suggestion.content.title': 'Content Optimization',
    'suggestion.content.subtitle': 'Get content recommendations',
    'suggestion.audience.title': 'Audience Insights',
    'suggestion.audience.subtitle': 'Understand your audience better',
    'suggestion.trend.title': 'Trend Analysis',
    'suggestion.trend.subtitle': 'Discover market trends',
    
    // Onboarding translations
    'onboarding.title': 'Welcome to Your AI Marketing Team',
    'onboarding.subtitle': 'Let\'s set up your personalized marketing dashboard in just a few steps',
    'onboarding.step': 'Step {{current}} of {{total}}',
    'onboarding.complete': 'Complete',
    'onboarding.next': 'Next',
    'onboarding.previous': 'Previous',
    
    // Skill Assessment
    'onboarding.skill.title': 'Skill Assessment',
    'onboarding.skill.question': 'What\'s your marketing experience level?',
    'onboarding.skill.beginner.title': 'Beginner',
    'onboarding.skill.beginner.description': 'New to digital marketing, need guidance on basics',
    'onboarding.skill.intermediate.title': 'Intermediate',
    'onboarding.skill.intermediate.description': 'Some experience, comfortable with common tools',
    'onboarding.skill.advanced.title': 'Advanced',
    'onboarding.skill.advanced.description': 'Experienced marketer, familiar with analytics and strategy',
    'onboarding.skill.expert.title': 'Expert',
    'onboarding.skill.expert.description': 'Marketing professional, leading teams and complex campaigns',
    'onboarding.skill.recommendations': 'Personalized Recommendations',
    'onboarding.skill.feature.tutorials': 'Guided Tutorials',
    'onboarding.skill.feature.templates': 'Industry Templates',
    'onboarding.skill.feature.guidance': 'AI Guidance',
    'onboarding.skill.feature.automation': 'Smart Automation',
    
    // Experience
    'onboarding.experience.question': 'How long have you been in marketing?',
    'onboarding.experience.none': 'Just starting out',
    'onboarding.experience.1-2years': '1-2 years',
    'onboarding.experience.3-5years': '3-5 years',
    'onboarding.experience.5+years': '5+ years',
    
    // Business Info
    'onboarding.business.title': 'Business Information',
    'onboarding.business.name': 'Business Name',
    'onboarding.business.name.placeholder': 'Enter your business name',
    'onboarding.business.industry': 'Industry',
    'onboarding.business.industry.placeholder': 'Select your industry',
    'onboarding.business.website': 'Website URL',
    'onboarding.business.website.placeholder': 'https://yourwebsite.com',
    'onboarding.business.website.help': 'We\'ll analyze your website for optimization opportunities',
    'onboarding.business.insights.title': 'Industry Insights Available',
    'onboarding.business.insights.templates': 'Industry-specific campaign templates',
    'onboarding.business.insights.benchmarks': 'Performance benchmarks',
    'onboarding.business.insights.competitors': 'Competitor analysis',
    'onboarding.business.insights.trends': 'Market trend insights',
    
    // Website Analysis
    'onboarding.website.title': 'Website Analysis',
    'onboarding.website.description': 'We\'ll analyze your website to provide personalized recommendations',
    
    // Social Media Setup
    'onboarding.social.title': 'Social Media Accounts',
    'onboarding.social.description': 'Connect your social media accounts for comprehensive analytics',
    'onboarding.social.insights.title': 'Social Media Features',
    'onboarding.social.feature.analytics': 'Cross-platform Analytics',
    'onboarding.social.feature.scheduling': 'Content Scheduling',
    'onboarding.social.feature.monitoring': 'Brand Monitoring',
    
    // Competitor Analysis
    'onboarding.competitors.title': 'Competitor Analysis',
    'onboarding.competitors.description': 'Add your main competitors to track their performance and strategies',
    'onboarding.competitors.add': 'Add Competitor',
    'onboarding.competitors.placeholder': 'Enter competitor name or website',
    'onboarding.competitors.list': 'Your Competitors',
    'onboarding.competitors.analysis.title': 'Competitor Intelligence',
    'onboarding.competitors.analysis.performance': 'Performance comparison',
    'onboarding.competitors.analysis.keywords': 'Keyword gap analysis',
    'onboarding.competitors.analysis.content': 'Content strategy insights',
    'onboarding.competitors.analysis.social': 'Social media benchmarking',
    
    // Strategy Setup
    'onboarding.strategy.title': 'Marketing Strategy',
    'onboarding.strategy.description': 'Define your marketing goals and budget to create a personalized strategy',
    'onboarding.strategy.goals.title': 'Marketing Goals',
    'onboarding.strategy.goals.brand-awareness': 'Increase Brand Awareness',
    'onboarding.strategy.goals.lead-generation': 'Generate More Leads',
    'onboarding.strategy.goals.sales-increase': 'Boost Sales',
    'onboarding.strategy.goals.customer-engagement': 'Improve Customer Engagement',
    'onboarding.strategy.goals.market-expansion': 'Expand to New Markets',
    'onboarding.strategy.goals.competitor-analysis': 'Monitor Competitors',
    'onboarding.strategy.budget.title': 'Monthly Marketing Budget',
    'onboarding.strategy.budget.placeholder': 'Select your budget range',
    'onboarding.strategy.budget.under-1k': 'Under $1,000',
    'onboarding.strategy.budget.1k-5k': '$1,000 - $5,000',
    'onboarding.strategy.budget.5k-10k': '$5,000 - $10,000',
    'onboarding.strategy.budget.10k-50k': '$10,000 - $50,000',
    'onboarding.strategy.budget.over-50k': 'Over $50,000',
    'onboarding.strategy.preview.title': 'Your Marketing Strategy',
    'onboarding.strategy.preview.goals': 'Selected Goals:',
    'onboarding.strategy.preview.campaigns': 'Recommended campaign types',
    'onboarding.strategy.preview.timeline': 'Suggested timeline and milestones',
    'onboarding.strategy.preview.metrics': 'Key performance indicators to track',
    
    // Industries
    'industry.technology': 'Technology',
    'industry.healthcare': 'Healthcare',
    'industry.finance': 'Finance',
    'industry.retail': 'Retail',
    'industry.education': 'Education',
    'industry.food': 'Food & Beverage',
    'industry.travel': 'Travel & Tourism',
    'industry.real-estate': 'Real Estate',
    'industry.consulting': 'Consulting',
    'industry.other': 'Other'
  },
  ar: {
    'dashboard.title': 'لوحة تحليلات التسويق',
    'dashboard.subtitle': 'تتبع أداء التسويق والرؤى الخاصة بك',
    'time.today': 'اليوم',
    'time.yesterday': 'أمس',
    'time.7days': 'آخر 7 أيام',
    'time.30days': 'آخر 30 يوم',
    'time.90days': 'آخر 90 يوم',
    'time.custom': 'فترة مخصصة',
    'export': 'تصدير',
    'chat.insights': 'رؤى الذكي الاصطناعي',
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'إنشاء حساب',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.fullName': 'الاسم الكامل',
    'auth.username': 'اسم المستخدم',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.hasAccount': 'لديك حساب بالفعل؟',
    'profile.title': 'الملف الشخصي',
    'profile.personalInfo': 'المعلومات الشخصية',
    'profile.companyInfo': 'معلومات الشركة',
    'campaigns.title': 'الحملات',
    'campaigns.create': 'إنشاء حملة',
    'campaigns.name': 'اسم الحملة',
    'campaigns.description': 'الوصف',
    'campaigns.budget': 'الميزانية',
    'campaigns.startDate': 'تاريخ البداية',
    'campaigns.endDate': 'تاريخ النهاية',
    'campaigns.status': 'الحالة',
    'campaigns.active': 'نشط',
    'campaigns.paused': 'متوقف',
    'campaigns.completed': 'مكتمل',
    'overview': 'نظرة عامة',
    'audience': 'الجمهور',
    'competitors': 'المنافسون',
    'sentiment': 'المشاعر',
    'content.creator': 'منشئ المحتوى',
    // Chart translations
    'chart.market.share': 'الحصة السوقية',
    'chart.market.share.label': 'الحصة السوقية',
    'chart.performance.benchmark': 'مقياس الأداء',
    'chart.your.brand': 'علامتك التجارية',
    'chart.competitor.a': 'المنافس أ',
    'chart.competitor.b': 'المنافس ب',
    'chart.competitor.c': 'المنافس ج',
    'chart.market.evolution': 'تطور السوق',
    'chart.traffic.comparison': 'مقارنة الحركة',
    'chart.brand.positioning': 'موقع العلامة التجارية',
    'chart.quality': 'الجودة',
    'chart.price': 'السعر',
    'chart.website.traffic': 'حركة الموقع',
    'chart.social.media': 'وسائل التواصل الاجتماعي',
    'chart.performance.trends': 'اتجاهات الأداء',
    'chart.positive': 'إيجابي',
    'chart.negative': 'سلبي',
    'chart.neutral': 'محايد',
    'chart.sentiment.analysis': 'تحليل المشاعر',
    'chart.share.voice': 'نصيب الصوت',
    'chart.media.mentions': 'الإشارات الإعلامية',
    'chart.mentions.last.7.days': 'الإشارات في آخر 7 أيام',
    'chart.increase.from.last.week': 'زيادة من الأسبوع الماضي',
    // Month translations
    'month.jan': 'يناير',
    'month.feb': 'فبراير',
    'month.mar': 'مارس',
    'month.apr': 'أبريل',
    'month.may': 'مايو',
    'month.jun': 'يونيو',
    'month.jul': 'يوليو',
    'month.aug': 'أغسطس',
    'month.sep': 'سبتمبر',
    'month.oct': 'أكتوبر',
    'month.nov': 'نوفمبر',
    'month.dec': 'ديسمبر',
    // Day translations
    'day.mon': 'الإثنين',
    'day.tue': 'الثلاثاء',
    'day.wed': 'الأربعاء',
    'day.thu': 'الخميس',
    'day.fri': 'الجمعة',
    'day.sat': 'السبت',
    'day.sun': 'الأحد',
    // Metric translations
    'metric.market.share': 'الحصة السوقية',
    'metric.brand.awareness': 'الوعي بالعلامة التجارية',
    'metric.customer.satisfaction': 'رضا العملاء',
    'metric.innovation.index': 'مؤشر الابتكار',
    'metric.price.competitiveness': 'التنافسية السعرية',
    // Chat translations
    'chat.welcome': 'مرحباً بك في مساعد التسويق الذكي! يمكنني مساعدتك في تحليل حملاتك وتتبع الأداء وتقديم الرؤى.',
    'chat.alert': '🚨 تنبيه: أداء حملتك الأخيرة انخفض بنسبة 12% من الأسبوع الماضي. هل تريد مني تحليل الأسباب؟',
    'chat.placeholder': 'اسألني أي شيء عن بيانات التسويق الخاصة بك...',
    'chat.send': 'إرسال',
    'chat.example': 'مثال: "أرني أفضل حملاتي أداءً"',
    'chat.language.indicator': 'ع',
    'chat.suggestion.today': 'كيف يمكنني مساعدتك اليوم؟',
    'suggestion.campaign.title': 'تحليل الحملات',
    'suggestion.campaign.subtitle': 'حلل أداء حملاتك',
    'suggestion.content.title': 'تحسين المحتوى',
    'suggestion.content.subtitle': 'احصل على توصيات المحتوى',
    'suggestion.audience.title': 'رؤى الجمهور',
    'suggestion.audience.subtitle': 'فهم جمهورك بشكل أفضل',
    'suggestion.trend.title': 'تحليل الاتجاهات',
    'suggestion.trend.subtitle': 'اكتشف اتجاهات السوق',
    
    // Onboarding translations (Arabic)
    'onboarding.title': 'مرحباً بك في فريق التسويق الذكي',
    'onboarding.subtitle': 'دعنا نقوم بإعداد لوحة التسويق الشخصية الخاصة بك في بضع خطوات فقط',
    'onboarding.step': 'الخطوة {{current}} من {{total}}',
    'onboarding.complete': 'إكمال',
    'onboarding.next': 'التالي',
    'onboarding.previous': 'السابق',
    
    // Skill Assessment (Arabic)
    'onboarding.skill.title': 'تقييم المهارات',
    'onboarding.skill.question': 'ما هو مستوى خبرتك في التسويق؟',
    'onboarding.skill.beginner.title': 'مبتدئ',
    'onboarding.skill.beginner.description': 'جديد في التسويق الرقمي، أحتاج إرشادات في الأساسيات',
    'onboarding.skill.intermediate.title': 'متوسط',
    'onboarding.skill.intermediate.description': 'لدي بعض الخبرة، مرتاح مع الأدوات الشائعة',
    'onboarding.skill.advanced.title': 'متقدم',
    'onboarding.skill.advanced.description': 'مسوق ذو خبرة، مألوف مع التحليلات والاستراتيجية',
    'onboarding.skill.expert.title': 'خبير',
    'onboarding.skill.expert.description': 'محترف تسويق، أقود فرق وحملات معقدة',
    'onboarding.skill.recommendations': 'توصيات شخصية',
    'onboarding.skill.feature.tutorials': 'دروس تعليمية',
    'onboarding.skill.feature.templates': 'قوالب الصناعة',
    'onboarding.skill.feature.guidance': 'إرشاد ذكي',
    'onboarding.skill.feature.automation': 'أتمتة ذكية',
    
    // Experience (Arabic)
    'onboarding.experience.question': 'كم من الوقت قضيت في التسويق؟',
    'onboarding.experience.none': 'بداية الطريق',
    'onboarding.experience.1-2years': '1-2 سنة',
    'onboarding.experience.3-5years': '3-5 سنوات',
    'onboarding.experience.5+years': '5+ سنوات',
    
    // Business Info (Arabic)
    'onboarding.business.title': 'معلومات الأعمال',
    'onboarding.business.name': 'اسم الشركة',
    'onboarding.business.name.placeholder': 'أدخل اسم شركتك',
    'onboarding.business.industry': 'الصناعة',
    'onboarding.business.industry.placeholder': 'اختر صناعتك',
    'onboarding.business.website': 'رابط الموقع',
    'onboarding.business.website.placeholder': 'https://yourwebsite.com',
    'onboarding.business.website.help': 'سنحلل موقعك لفرص التحسين',
    'onboarding.business.insights.title': 'رؤى الصناعة المتاحة',
    'onboarding.business.insights.templates': 'قوالب حملات خاصة بالصناعة',
    'onboarding.business.insights.benchmarks': 'معايير الأداء',
    'onboarding.business.insights.competitors': 'تحليل المنافسين',
    'onboarding.business.insights.trends': 'رؤى اتجاهات السوق',
    
    // Website Analysis (Arabic)
    'onboarding.website.title': 'تحليل الموقع',
    'onboarding.website.description': 'سنحلل موقعك لتقديم توصيات شخصية',
    
    // Social Media Setup (Arabic)
    'onboarding.social.title': 'حسابات وسائل التواصل',
    'onboarding.social.description': 'اربط حسابات وسائل التواصل للحصول على تحليلات شاملة',
    'onboarding.social.insights.title': 'ميزات وسائل التواصل',
    'onboarding.social.feature.analytics': 'تحليلات متعددة المنصات',
    'onboarding.social.feature.scheduling': 'جدولة المحتوى',
    'onboarding.social.feature.monitoring': 'مراقبة العلامة التجارية',
    
    // Competitor Analysis (Arabic)
    'onboarding.competitors.title': 'تحليل المنافسين',
    'onboarding.competitors.description': 'أضف منافسيك الرئيسيين لتتبع أدائهم واستراتيجياتهم',
    'onboarding.competitors.add': 'إضافة منافس',
    'onboarding.competitors.placeholder': 'أدخل اسم المنافس أو موقعه',
    'onboarding.competitors.list': 'منافسوك',
    'onboarding.competitors.analysis.title': 'ذكاء المنافسين',
    'onboarding.competitors.analysis.performance': 'مقارنة الأداء',
    'onboarding.competitors.analysis.keywords': 'تحليل فجوة الكلمات المفتاحية',
    'onboarding.competitors.analysis.content': 'رؤى استراتيجية المحتوى',
    'onboarding.competitors.analysis.social': 'معايير وسائل التواصل الاجتماعي',
    
    // Strategy Setup (Arabic)
    'onboarding.strategy.title': 'استراتيجية التسويق',
    'onboarding.strategy.description': 'حدد أهداف التسويق والميزانية لإنشاء استراتيجية شخصية',
    'onboarding.strategy.goals.title': 'أهداف التسويق',
    'onboarding.strategy.goals.brand-awareness': 'زيادة الوعي بالعلامة التجارية',
    'onboarding.strategy.goals.lead-generation': 'توليد المزيد من العملاء المحتملين',
    'onboarding.strategy.goals.sales-increase': 'زيادة المبيعات',
    'onboarding.strategy.goals.customer-engagement': 'تحسين مشاركة العملاء',
    'onboarding.strategy.goals.market-expansion': 'التوسع في أسواق جديدة',
    'onboarding.strategy.goals.competitor-analysis': 'مراقبة المنافسين',
    'onboarding.strategy.budget.title': 'ميزانية التسويق الشهرية',
    'onboarding.strategy.budget.placeholder': 'اختر نطاق ميزانيتك',
    'onboarding.strategy.budget.under-1k': 'أقل من $1,000',
    'onboarding.strategy.budget.1k-5k': '$1,000 - $5,000',
    'onboarding.strategy.budget.5k-10k': '$5,000 - $10,000',
    'onboarding.strategy.budget.10k-50k': '$10,000 - $50,000',
    'onboarding.strategy.budget.over-50k': 'أكثر من $50,000',
    'onboarding.strategy.preview.title': 'استراتيجيتك التسويقية',
    'onboarding.strategy.preview.goals': 'الأهداف المختارة:',
    'onboarding.strategy.preview.campaigns': 'أنواع الحملات الموصى بها',
    'onboarding.strategy.preview.timeline': 'الجدول الزمني والمعالم المقترحة',
    'onboarding.strategy.preview.metrics': 'مؤشرات الأداء الرئيسية للتتبع',
    
    // Industries (Arabic)
    'industry.technology': 'التكنولوجيا',
    'industry.healthcare': 'الرعاية الصحية',
    'industry.finance': 'المالية',
    'industry.retail': 'التجارة',
    'industry.education': 'التعليم',
    'industry.food': 'الطعام والمشروبات',
    'industry.travel': 'السفر والسياحة',
    'industry.real-estate': 'العقارات',
    'industry.consulting': 'الاستشارات',
    'industry.other': 'أخرى'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
