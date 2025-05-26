
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlayCircle, CheckCircle } from 'lucide-react';

interface LandingHeroProps {
  isArabic?: boolean;
}

const LandingHero: React.FC<LandingHeroProps> = ({ isArabic = false }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleMainAction = () => {
    if (user) {
      // المستخدم مسجل دخول - توجيه للوحة التحكم
      navigate('/dashboard');
    } else {
      // المستخدم غير مسجل - توجيه لصفحة التسجيل
      navigate(isArabic ? '/auth-ar' : '/auth');
    }
  };

  const handleSecondaryAction = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/pricing-ar');
    }
  };

  return (
    <section className={`py-20 px-4 ${isArabic ? 'text-right' : 'text-left'}`}>
      <div className="container mx-auto max-w-6xl">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isArabic ? 'lg:grid-flow-col-dense' : ''}`}>
          <div className={`space-y-8 ${isArabic ? 'lg:order-2' : ''}`}>
            <div className="space-y-4">
              <h1 className={`text-4xl lg:text-6xl font-bold leading-tight ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'فريق التسويق الذكي' : 'Your AI Marketing Team'}
                <span className="block text-blue-600">
                  {isArabic ? 'في خدمتك دائماً' : 'Always at Your Service'}
                </span>
              </h1>
              
              <p className={`text-xl text-gray-600 leading-relaxed ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic 
                  ? 'اكتشف قوة الذكاء الاصطناعي في التسويق. فريق متكامل من الوكلاء الأذكياء يعمل على مدار الساعة لنمو أعمالك وزيادة مبيعاتك.'
                  : 'Discover the power of AI in marketing. A complete team of intelligent agents working 24/7 to grow your business and increase your sales.'
                }
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
              <Button
                onClick={handleMainAction}
                size="lg"
                className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg ${isArabic ? 'font-arabic' : ''}`}
              >
                {user ? (
                  <>
                    {isArabic ? (
                      <>
                        لوحة التحكم
                        <ArrowLeft className="w-5 h-5 mr-2 rotate-180" />
                      </>
                    ) : (
                      <>
                        <ArrowLeft className="w-5 h-5 ml-2" />
                        Go to Dashboard
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {isArabic ? (
                      <>
                        ابدأ الآن مجاناً
                        <ArrowLeft className="w-5 h-5 mr-2 rotate-180" />
                      </>
                    ) : (
                      <>
                        <ArrowLeft className="w-5 h-5 ml-2" />
                        Start Free Now
                      </>
                    )}
                  </>
                )}
              </Button>

              <Button
                onClick={handleSecondaryAction}
                variant="outline"
                size="lg"
                className={`px-8 py-4 text-lg ${isArabic ? 'font-arabic' : ''}`}
              >
                {user ? (
                  <>
                    {isArabic ? (
                      <>
                        <CheckCircle className="w-5 h-5 ml-2" />
                        الملف الشخصي
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        My Profile
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {isArabic ? (
                      <>
                        <PlayCircle className="w-5 h-5 ml-2" />
                        شاهد العرض التوضيحي
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-5 h-5 mr-2" />
                        Watch Demo
                      </>
                    )}
                  </>
                )}
              </Button>
            </div>

            {!user && (
              <div className={`flex items-center gap-4 text-sm text-gray-500 ${isArabic ? 'justify-end' : ''}`}>
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className={isArabic ? 'font-arabic' : ''}>
                    {isArabic ? 'تجربة مجانية 14 يوم' : '14-day free trial'}
                  </span>
                </div>
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className={isArabic ? 'font-arabic' : ''}>
                    {isArabic ? 'بدون بطاقة ائتمان' : 'No credit card required'}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className={`relative ${isArabic ? 'lg:order-1' : ''}`}>
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className={`text-sm font-medium ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'نشط الآن' : 'Live Now'}
                  </span>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <h3 className={`font-semibold mb-2 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    {isArabic ? 'تقرير أداء اليوم' : "Today's Performance"}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className={isArabic ? 'text-right' : ''}>
                      <div className="text-gray-600">
                        {isArabic ? 'زيارات الموقع' : 'Website Visits'}
                      </div>
                      <div className="font-bold text-blue-600">+24%</div>
                    </div>
                    <div className={isArabic ? 'text-right' : ''}>
                      <div className="text-gray-600">
                        {isArabic ? 'معدل التحويل' : 'Conversion Rate'}
                      </div>
                      <div className="font-bold text-green-600">+18%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform rotate-6 opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
