import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, TrendingUp, Users, Globe, Zap, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import LanguageToggle from '@/components/layout/LanguageToggle';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import IntegrationsSection from '@/components/landing/IntegrationsSection';
import FAQSection from '@/components/landing/FAQSection';
import DemoRequestForm from '@/components/landing/DemoRequestForm';
import NewsletterSection from '@/components/landing/NewsletterSection';
import PricingOverviewSection from '@/components/landing/PricingOverviewSection';

const LandingPage: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const isArabic = language === 'ar';

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: isArabic ? 'ذكاء اصطناعي متقدم' : 'Advanced AI',
      description: isArabic 
        ? 'تقنيات ذكاء اصطناعي متطورة لتحليل وتحسين حملاتك التسويقية'
        : 'Advanced AI technology to analyze and optimize your marketing campaigns'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: isArabic ? 'استهداف دقيق' : 'Precise Targeting',
      description: isArabic 
        ? 'استهدف جمهورك المثالي بدقة عالية لتحقيق أفضل النتائج'
        : 'Target your ideal audience with high precision for optimal results'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: isArabic ? 'تحليلات شاملة' : 'Comprehensive Analytics',
      description: isArabic 
        ? 'تقارير مفصلة ورؤى عميقة لقياس أداء حملاتك'
        : 'Detailed reports and deep insights to measure campaign performance'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: isArabic ? 'أتمتة ذكية' : 'Smart Automation',
      description: isArabic 
        ? 'أتمت مهامك التسويقية ووفر الوقت والجهد'
        : 'Automate your marketing tasks and save time and effort'
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${isArabic ? 'rtl' : ''}`}>
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">MG</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {isArabic ? 'فريق التسويق' : 'AI Marketing Platform'}
            </span>
          </div>
          
          <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <LanguageToggle isArabic={isArabic} onToggle={toggleLanguage} />
            <Button 
              variant="outline" 
              onClick={() => navigate('/auth')}
            >
              {isArabic ? 'تسجيل الدخول' : 'Sign In'}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge variant="secondary" className="mb-6">
          <Globe className="w-4 h-4 mr-2" />
          {isArabic ? 'فريق التسويق' : 'AI Marketing Platform'}
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          {isArabic ? 'مستقبل التسويق الرقمي' : 'The Future of Digital Marketing'}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {isArabic ? 'مدعوم بالذكاء الاصطناعي' : 'Powered by AI'}
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          {isArabic 
            ? 'حول أفكارك التسويقية إلى حملات ناجحة باستخدام قوة الذكاء الاصطناعي. حلل، تحسن، واحصل على نتائج استثنائية.'
            : 'Transform your marketing ideas into successful campaigns using the power of AI. Analyze, optimize, and achieve exceptional results.'
          }
        </p>
        
        <div className={`flex gap-4 justify-center ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Button 
            size="lg" 
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isArabic ? 'ابدأ مجاناً' : 'Start Free'}
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/pricing')}
          >
            {isArabic ? 'خطط الأسعار' : 'View Pricing'}
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {isArabic ? 'ميزات متقدمة' : 'Advanced Features'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {isArabic 
              ? 'اكتشف مجموعة شاملة من الأدوات المدعومة بالذكاء الاصطناعي'
              : 'Discover a comprehensive suite of AI-powered marketing tools'
            }
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Integrations Section */}
      <IntegrationsSection isArabic={isArabic} />

      {/* Pricing Overview Section */}
      <PricingOverviewSection isArabic={isArabic} />

      {/* Testimonials Section */}
      <TestimonialsSection isArabic={isArabic} />

      {/* Demo Request Section */}
      <DemoRequestForm isArabic={isArabic} />

      {/* FAQ Section */}
      <FAQSection isArabic={isArabic} />

      {/* Newsletter Section */}
      <NewsletterSection isArabic={isArabic} />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isArabic ? 'جاهز للبدء؟' : 'Ready to Get Started?'}
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              {isArabic 
                ? 'انضم إلى آلاف المسوقين الذين يحققون نتائج استثنائية مع منصتنا'
                : 'Join thousands of marketers achieving exceptional results with our platform'
              }
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/auth')}
            >
              {isArabic ? 'ابدأ رحلتك اليوم' : 'Start Your Journey Today'}
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className={`text-center ${isArabic ? 'md:text-right' : 'md:text-left'}`}>
              <div className={`flex items-center ${isArabic ? 'justify-center md:justify-end' : 'justify-center md:justify-start'} gap-3 mb-4`}>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">MG</span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {isArabic ? 'فريق التسويق' : 'AI Marketing Platform'}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {isArabic 
                  ? 'مستقبل التسويق الرقمي مدعوم بالذكاء الاصطناعي'
                  : 'The future of digital marketing powered by AI'
                }
              </p>
            </div>

            {/* Quick Links */}
            <div className={`text-center ${isArabic ? 'md:text-right' : 'md:text-left'}`}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {isArabic ? 'روابط سريعة' : 'Quick Links'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Button variant="link" onClick={() => navigate('/pricing')} className="text-gray-600 dark:text-gray-300 p-0 h-auto">
                    {isArabic ? 'الأسعار' : 'Pricing'}
                  </Button>
                </li>
                <li>
                  <Button variant="link" onClick={() => navigate('/auth')} className="text-gray-600 dark:text-gray-300 p-0 h-auto">
                    {isArabic ? 'تسجيل الدخول' : 'Sign In'}
                  </Button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className={`text-center ${isArabic ? 'md:text-right' : 'md:text-left'}`}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {isArabic ? 'قانوني' : 'Legal'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Button variant="link" onClick={() => navigate('/privacy')} className="text-gray-600 dark:text-gray-300 p-0 h-auto">
                    {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
                  </Button>
                </li>
                <li>
                  <Button variant="link" onClick={() => navigate('/terms')} className="text-gray-600 dark:text-gray-300 p-0 h-auto">
                    {isArabic ? 'شروط الخدمة' : 'Terms of Service'}
                  </Button>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className={`text-center ${isArabic ? 'md:text-right' : 'md:text-left'}`}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {isArabic ? 'تابعنا' : 'Follow Us'}
              </h3>
              <div className={`flex ${isArabic ? 'justify-center md:justify-end' : 'justify-center md:justify-start'} gap-4`}>
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {isArabic 
                ? '© 2024 فريق التسويق. جميع الحقوق محفوظة.'
                : '© 2024 AI Marketing Platform. All rights reserved.'
              }
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
