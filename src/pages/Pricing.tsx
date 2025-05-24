
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DynamicPricingCards from '@/components/pricing/DynamicPricingCards';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Globe } from 'lucide-react';
import LanguageToggle from '@/components/layout/LanguageToggle';

const Pricing: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const isArabic = language === 'ar';

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
              {isArabic ? 'منصة التسويق الذكي' : 'AI Marketing Platform'}
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

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isArabic ? 'خطط الأسعار' : 'Pricing Plans'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {isArabic 
              ? 'اختر الخطة المناسبة لاحتياجاتك التسويقية مع إمكانيات الذكاء الاصطناعي المتقدمة'
              : 'Choose the perfect plan for your marketing needs with advanced AI capabilities'
            }
          </p>
        </div>

        {/* Pricing Cards */}
        <DynamicPricingCards />

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">
                {isArabic ? 'هل يمكنني تغيير خطتي في أي وقت؟' : 'Can I change my plan anytime?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isArabic 
                  ? 'نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت. التغييرات ستسري في دورة الفوترة التالية.'
                  : 'Yes, you can upgrade or downgrade your plan anytime. Changes will take effect in the next billing cycle.'
                }
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">
                {isArabic ? 'ماذا يحدث إذا تجاوزت حد الرسائل؟' : 'What happens if I exceed my message limit?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isArabic 
                  ? 'ستتم محاسبتك على الاستخدام الإضافي حسب أسعار كل خطة. ستتلقى إشعارات عند اقتراب الحد.'
                  : 'You\'ll be charged for overage usage according to your plan rates. You\'ll receive notifications when approaching limits.'
                }
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">
                {isArabic ? 'هل بياناتي آمنة؟' : 'Is my data secure?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isArabic 
                  ? 'نستخدم تشفير من الدرجة العسكرية ونلتزم بمعايير GDPR لحماية بياناتك.'
                  : 'We use military-grade encryption and comply with GDPR standards to protect your data.'
                }
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">
                {isArabic ? 'كيف يتم احتساب الرسائل؟' : 'How are messages calculated?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isArabic 
                  ? 'كل تفاعل مع الذكاء الاصطناعي يُحتسب كرسالة واحدة. يتم إعادة تعيين العداد شهرياً.'
                  : 'Each AI interaction counts as one message. The counter resets monthly with your billing cycle.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA Section */}
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
    </div>
  );
};

export default Pricing;
