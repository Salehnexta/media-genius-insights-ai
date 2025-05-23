
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'app.title': 'MarketingGenius AI',
    'search.placeholder': 'Search dashboards...',
    'profile': 'Profile',
    'settings': 'Settings',
    'signout': 'Sign out',
    'chat.insights': 'Chat with Insights',
    'dashboard.title': 'Marketing Intelligence Dashboard',
    'dashboard.subtitle': 'Get comprehensive insights into your marketing performance',
    'time.today': 'Today',
    'time.yesterday': 'Yesterday',
    'time.7days': 'Last 7 days',
    'time.30days': 'Last 30 days',
    'time.90days': 'Last 90 days',
    'time.custom': 'Custom Range',
    'export': 'Export',
    
    // Chat Interface
    'chat.welcome': 'Welcome to MarketingGenius AI! I\'m your marketing assistant. What would you like help with today?',
    'chat.alert': 'I\'ve detected a 27% increase in negative sentiment around your new product launch. Would you like me to generate a report?',
    'chat.suggestion.today': 'Here we are again, what are we chatting about today? Ask me literally anything related to marketing.',
    'chat.placeholder': 'Ask me anything about your marketing...',
    'chat.send': 'Send',
    'chat.example': 'Try: "Generate sentiment report" or "Create social posts"',
    'chat.language.indicator': 'English ⟶ عربي',
    
    // Suggestion Cards
    'suggestion.campaign.title': 'Generate campaign analysis',
    'suggestion.campaign.subtitle': 'Analyze performance metrics',
    'suggestion.content.title': 'Create content strategy',
    'suggestion.content.subtitle': 'Build engaging content plans',
    'suggestion.audience.title': 'Audience insights',
    'suggestion.audience.subtitle': 'Understand your customers',
    'suggestion.trend.title': 'Trend analysis',
    'suggestion.trend.subtitle': 'Track market trends',
    
    // Dashboard Tabs
    'tab.overview': 'Overview',
    'tab.campaigns': 'Campaigns',
    'tab.audience': 'Audience',
    'tab.competitors': 'Competitors',
    'tab.sentiment': 'Sentiment',
    'tab.content.creator': 'Content Creator',
    
    // Content Creator
    'content.user.info': 'User Information',
    'content.user.label': 'Tell AI about yourself/brand',
    'content.user.placeholder': 'Describe your brand, target audience, tone of voice, and any specific requirements for content generation...',
    'content.image.generator': 'AI Image Generator',
    'content.image.description': 'Image Description',
    'content.image.placeholder': 'Describe the image you want to generate (e.g., \'A modern office space with people collaborating\')',
    'content.image.style': 'Style',
    'content.image.generate': 'Generate Image',
    'content.image.generating': 'Generating Image...',
    'content.image.alt': 'Generated social media image',
    'content.image.placeholder.text': 'Generated image will appear here',
    'content.calendar': 'Publishing Calendar',
    'content.calendar.date': 'Select Publishing Date',
    'content.calendar.pick': 'Pick a date',
    'content.calendar.schedule': 'Schedule Post',
    'content.calendar.scheduled': 'Scheduled Posts',
    'content.calendar.no.posts': 'No posts scheduled yet',
    
    // Image Styles
    'style.realistic': 'Realistic',
    'style.illustration': 'Illustration',
    'style.cartoon': 'Cartoon',
    'style.abstract': 'Abstract',
    'style.minimalist': 'Minimalist',
    
    // Alerts
    'alert.media.title': 'Latest Media Alerts',
    'alert.media.tech': 'TechCrunch published an article mentioning your latest product launch',
    'alert.media.competitor': 'Competitor B launched a new marketing campaign targeting your customer base',
    
    // Error Messages
    'error.date.content': 'Please select a date and generate content first',
    'error.image.description': 'Please enter a description for your image',
    
    // Success Messages
    'success.post.scheduled': 'Post Scheduled',
    'success.post.message': 'Your {platform} post has been scheduled for {date}',
    'success.image.generated': 'Image Generated',
    'success.image.message': 'Your AI image has been created with user context!',
    'success.downloaded': 'Downloaded!',
    'success.download.message': 'Image downloaded successfully'
  },
  ar: {
    'app.title': 'عبقري التسويق الذكي',
    'search.placeholder': 'البحث في لوحات المعلومات...',
    'profile': 'الملف الشخصي',
    'settings': 'الإعدادات',
    'signout': 'تسجيل الخروج',
    'chat.insights': 'الدردشة مع الرؤى',
    'dashboard.title': 'لوحة معلومات الذكاء التسويقي',
    'dashboard.subtitle': 'احصل على رؤى شاملة حول أداء التسويق الخاص بك',
    'time.today': 'اليوم',
    'time.yesterday': 'أمس',
    'time.7days': 'آخر 7 أيام',
    'time.30days': 'آخر 30 يوماً',
    'time.90days': 'آخر 90 يوماً',
    'time.custom': 'نطاق مخصص',
    'export': 'تصدير',
    
    // Chat Interface
    'chat.welcome': 'مرحباً بك في عبقري التسويق الذكي! أنا مساعدك التسويقي. كيف يمكنني مساعدتك اليوم؟',
    'chat.alert': 'لقد اكتشفت زيادة بنسبة 27% في المشاعر السلبية حول إطلاق منتجك الجديد. هل تريد مني إنشاء تقرير؟',
    'chat.suggestion.today': 'ها نحن مرة أخرى، عن ماذا سنتحدث اليوم؟ اسألني حرفياً أي شيء متعلق بالتسويق.',
    'chat.placeholder': 'اسألني أي شيء عن التسويق الخاص بك...',
    'chat.send': 'إرسال',
    'chat.example': 'جرب: "إنشاء تقرير المشاعر" أو "إنشاء منشورات اجتماعية"',
    'chat.language.indicator': 'عربي ⟶ English',
    
    // Suggestion Cards
    'suggestion.campaign.title': 'إنشاء تحليل الحملة',
    'suggestion.campaign.subtitle': 'تحليل مقاييس الأداء',
    'suggestion.content.title': 'إنشاء استراتيجية المحتوى',
    'suggestion.content.subtitle': 'بناء خطط محتوى جذابة',
    'suggestion.audience.title': 'رؤى الجمهور',
    'suggestion.audience.subtitle': 'فهم عملائك',
    'suggestion.trend.title': 'تحليل الاتجاهات',
    'suggestion.trend.subtitle': 'تتبع اتجاهات السوق',
    
    // Dashboard Tabs
    'tab.overview': 'نظرة عامة',
    'tab.campaigns': 'الحملات',
    'tab.audience': 'الجمهور',
    'tab.competitors': 'المنافسون',
    'tab.sentiment': 'المشاعر',
    'tab.content.creator': 'منشئ المحتوى',
    
    // Content Creator
    'content.user.info': 'معلومات المستخدم',
    'content.user.label': 'أخبر الذكاء الاصطناعي عن نفسك/علامتك التجارية',
    'content.user.placeholder': 'اوصف علامتك التجارية، الجمهور المستهدف، نبرة الصوت، وأي متطلبات محددة لإنشاء المحتوى...',
    'content.image.generator': 'مولد الصور بالذكاء الاصطناعي',
    'content.image.description': 'وصف الصورة',
    'content.image.placeholder': 'اوصف الصورة التي تريد إنشاءها (مثل، "مساحة مكتب حديثة مع أشخاص يتعاونون")',
    'content.image.style': 'النمط',
    'content.image.generate': 'إنشاء صورة',
    'content.image.generating': 'جاري إنشاء الصورة...',
    'content.image.alt': 'صورة وسائل التواصل الاجتماعي المُنشأة',
    'content.image.placeholder.text': 'ستظهر الصورة المُنشأة هنا',
    'content.calendar': 'تقويم النشر',
    'content.calendar.date': 'اختر تاريخ النشر',
    'content.calendar.pick': 'اختر تاريخاً',
    'content.calendar.schedule': 'جدولة المنشور',
    'content.calendar.scheduled': 'المنشورات المجدولة',
    'content.calendar.no.posts': 'لا توجد منشورات مجدولة بعد',
    
    // Image Styles
    'style.realistic': 'واقعي',
    'style.illustration': 'رسوم توضيحية',
    'style.cartoon': 'كرتوني',
    'style.abstract': 'مجرد',
    'style.minimalist': 'بسيط',
    
    // Alerts
    'alert.media.title': 'آخر تنبيهات الوسائط',
    'alert.media.tech': 'نشرت TechCrunch مقالاً يذكر إطلاق منتجك الأخير',
    'alert.media.competitor': 'أطلق المنافس ب حملة تسويقية جديدة تستهدف قاعدة عملائك',
    
    // Error Messages
    'error.date.content': 'يرجى اختيار تاريخ وإنشاء محتوى أولاً',
    'error.image.description': 'يرجى إدخال وصف للصورة',
    
    // Success Messages
    'success.post.scheduled': 'تم جدولة المنشور',
    'success.post.message': 'تم جدولة منشور {platform} الخاص بك لتاريخ {date}',
    'success.image.generated': 'تم إنشاء الصورة',
    'success.image.message': 'تم إنشاء صورتك بالذكاء الاصطناعي مع سياق المستخدم!',
    'success.downloaded': 'تم التحميل!',
    'success.download.message': 'تم تحميل الصورة بنجاح'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Add RTL class to body when Arabic is selected
  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.classList.remove('rtl');
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
