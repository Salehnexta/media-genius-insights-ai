
import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, TrendingUp, Zap, Globe, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import LanguageToggle from '@/components/layout/LanguageToggle';

const LandingPageArContent: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'ذكاء اصطناعي متقدم',
      description: 'تقنيات ذكاء اصطناعي متطورة لتحليل وتحسين حملاتك التسويقية'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'استهداف دقيق',
      description: 'استهدف جمهورك المثالي بدقة عالية لتحقيق أفضل النتائج'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'تحليلات شاملة',
      description: 'تقارير مفصلة ورؤى عميقة لقياس أداء حملاتك'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'أتمتة ذكية',
      description: 'أتمت مهامك التسويقية ووفر الوقت والجهد'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rtl">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <LanguageToggle isArabic={true} onToggle={() => navigate('/landing')} />
            <Button 
              variant="outline" 
              onClick={() => navigate('/auth-ar')}
            >
              تسجيل الدخول
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              فريق التسويق
            </span>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">MG</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge variant="secondary" className="mb-6">
          <Globe className="w-4 h-4 ml-2" />
          فريق التسويق
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          مستقبل التسويق الرقمي
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            مدعوم بالذكاء الاصطناعي
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          حول أفكارك التسويقية إلى حملات ناجحة باستخدام قوة الذكاء الاصطناعي. حلل، تحسن، واحصل على نتائج استثنائية.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => navigate('/register-ar')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            ابدأ مجاناً
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/pricing-ar')}
          >
            خطط الأسعار
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ميزات متقدمة
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            اكتشف مجموعة شاملة من الأدوات المدعومة بالذكاء الاصطناعي
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

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              جاهز للبدء؟
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              انضم إلى آلاف المسوقين الذين يحققون نتائج استثنائية مع منصتنا
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/register-ar')}
            >
              ابدأ رحلتك اليوم
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end gap-3 mb-4">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  فريق التسويق
                </span>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">MG</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                مستقبل التسويق الرقمي مدعوم بالذكاء الاصطناعي
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-right">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">روابط سريعة</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Button variant="link" onClick={() => navigate('/pricing-ar')} className="text-gray-600 dark:text-gray-300 p-0 h-auto">
                    الأسعار
                  </Button>
                </li>
                <li>
                  <Button variant="link" onClick={() => navigate('/auth-ar')} className="text-gray-600 dark:text-gray-300 p-0 h-auto">
                    تسجيل الدخول
                  </Button>
                </li>
                <li>
                  <Button variant="link" onClick={() => navigate('/register-ar')} className="text-gray-600 dark:text-gray-300 p-0 h-auto">
                    إنشاء حساب
                  </Button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="text-center md:text-right">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">قانوني</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Button variant="link" onClick={() => navigate('/privacy')} className="text-gray-600 dark:text-gray-300 p-0 h-auto">
                    سياسة الخصوصية
                  </Button>
                </li>
                <li>
                  <Button variant="link" onClick={() => navigate('/terms')} className="text-gray-600 dark:text-gray-300 p-0 h-auto">
                    شروط الخدمة
                  </Button>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="text-center md:text-right">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">تابعنا</h3>
              <div className="flex justify-center md:justify-end gap-4">
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
              © 2024 فريق التسويق. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const LandingPageAr: React.FC = () => {
  return (
    <LanguageProvider>
      <LandingPageArContent />
    </LanguageProvider>
  );
};

export default LandingPageAr;
