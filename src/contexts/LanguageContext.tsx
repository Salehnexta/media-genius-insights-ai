
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
    'suggestion.trend.subtitle': 'Discover market trends'
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
    'suggestion.trend.subtitle': 'اكتشف اتجاهات السوق'
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
