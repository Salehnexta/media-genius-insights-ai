
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DynamicPricingCards from '@/components/pricing/DynamicPricingCards';
import Header from '@/components/layout/Header';

const Pricing: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
      <Header isDarkMode={false} toggleDarkMode={() => {}} />
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
                {isArabic ? 'هل تقدمون فترة تجريبية مجانية؟' : 'Do you offer a free trial?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isArabic 
                  ? 'نعم، نقدم فترة تجريبية مجانية لمدة 7 أيام مع جميع الميزات.'
                  : 'Yes, we offer a 7-day free trial with full access to all features.'
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
