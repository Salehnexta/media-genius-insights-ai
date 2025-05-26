
import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import LandingHero from '@/components/landing/LandingHero';
import { ArrowLeft } from 'lucide-react';

const LandingPageArContent: React.FC = () => {
  const { setLanguage } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    setLanguage('ar');
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, [setLanguage]);

  const handleAuthAction = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth-ar');
    }
  };

  return (
    <div className="rtl arabic-text min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      {/* Header Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-xl text-gray-900 font-arabic">
                Morvo.ai
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-arabic">
                المميزات
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 font-arabic">
                الأسعار
              </a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 font-arabic">
                من نحن
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 font-arabic">
                اتصل بنا
              </a>
            </nav>

            <Button
              onClick={handleAuthAction}
              className="bg-blue-600 hover:bg-blue-700 text-white font-arabic"
            >
              {user ? (
                <>
                  لوحة التحكم
                  <ArrowLeft className="w-4 h-4 mr-2 rotate-180" />
                </>
              ) : (
                <>
                  تسجيل الدخول
                  <ArrowLeft className="w-4 h-4 mr-2 rotate-180" />
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <LandingHero isArabic={true} />

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-arabic">
              لماذا تختار Morvo.ai؟
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-arabic">
              نقدم لك حلول تسويقية متكاملة بتقنية الذكاء الاصطناعي لضمان نمو أعمالك
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 font-arabic">وكلاء أذكياء</h3>
              <p className="text-gray-600 font-arabic">
                فريق من الوكلاء الأذكياء يعمل على مدار الساعة لإدارة حملاتك التسويقية
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 font-arabic">تحليلات متقدمة</h3>
              <p className="text-gray-600 font-arabic">
                احصل على رؤى عميقة حول أداء حملاتك واتخذ قرارات مدروسة
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 font-arabic">أتمتة ذكية</h3>
              <p className="text-gray-600 font-arabic">
                أتمت مهامك التسويقية ووفر وقتك للتركيز على استراتيجيات النمو
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-arabic">
            ابدأ رحلتك نحو النجاح اليوم
          </h2>
          <p className="text-xl mb-8 opacity-90 font-arabic">
            انضم إلى آلاف العملاء الذين يثقون في حلولنا لنمو أعمالهم
          </p>
          <Button
            onClick={handleAuthAction}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-arabic"
          >
            {user ? (
              <>
                انتقل إلى لوحة التحكم
                <ArrowLeft className="w-5 h-5 mr-2 rotate-180" />
              </>
            ) : (
              <>
                ابدأ التجربة المجانية
                <ArrowLeft className="w-5 h-5 mr-2 rotate-180" />
              </>
            )}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="font-bold text-xl font-arabic">Morvo.ai</span>
              </div>
              <p className="text-gray-400 font-arabic">
                نساعدك على النمو بذكاء باستخدام أحدث تقنيات الذكاء الاصطناعي
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 font-arabic">المنتج</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white font-arabic">المميزات</a></li>
                <li><a href="#" className="hover:text-white font-arabic">الأسعار</a></li>
                <li><a href="#" className="hover:text-white font-arabic">الدعم</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 font-arabic">الشركة</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white font-arabic">من نحن</a></li>
                <li><a href="#" className="hover:text-white font-arabic">المدونة</a></li>
                <li><a href="#" className="hover:text-white font-arabic">الوظائف</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 font-arabic">تواصل معنا</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="font-arabic">البريد الإلكتروني: info@morvo.ai</li>
                <li className="font-arabic">الهاتف: +966 50 123 4567</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p className="font-arabic">
              © 2024 Morvo.ai. جميع الحقوق محفوظة.
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
