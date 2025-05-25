
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsAr: React.FC = () => {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    setLanguage('ar');
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, [setLanguage]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/landing-ar">
            <Button variant="ghost" className="flex items-center gap-2 font-arabic">
              <ArrowLeft className="h-4 w-4" />
              العودة للصفحة الرئيسية
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-right">
            <CardTitle className="text-3xl font-bold font-arabic">
              شروط الخدمة
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400 font-arabic">
              التشرويط والأحكام لاستخدام منصة التسويق الذكي
            </p>
          </CardHeader>
          <CardContent className="space-y-6 text-right">
            <div className="font-arabic">
              <h2 className="text-xl font-semibold mb-3">1. القبول بالشروط</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                باستخدام منصة التسويق الذكي، فإنك تقر بأنك لا توافق على أن تكون ملتزماً بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الخدمة.
              </p>
            </div>

            <div className="font-arabic">
              <h2 className="text-xl font-semibold mb-3">2. وصف الخدمة</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                منصة التسويق الذكي هي خدمة تخدم بتخليص المدونات بتخليص المثرورة والتحليلات التسويقية لتحليل الأداء.
              </p>
            </div>

            <div className="font-arabic">
              <h2 className="text-xl font-semibold mb-3">3. حقوق والتزامات المستخدم</h2>
              <ul className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
                <li>• الوصول إلى جميع مرايا الخدمة وفقاً لعضميات الحدمة</li>
                <li>• الحصول على الدعم الفني</li>
                <li>• حفظ البيانات الشخصية</li>
              </ul>
            </div>

            <div className="font-arabic">
              <h2 className="text-xl font-semibold mb-3">4. سياسة الدفع والاسترداد</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                يتم تحصيل الرسوم شهرياً حسب الخطة المختارة. يمكن طلب الاسترداد خلال 14 يوماً من تاريخ الاشتراك بشروط معينة.
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2 font-arabic text-right">
                إشعار مهم:
              </h3>
              <p className="text-yellow-700 dark:text-yellow-400 font-arabic text-right">
                استخدامك المستمر للخدمة يعني موافقتك على جميع الشروط والأحكام المذكورة أعلاه.
              </p>
            </div>

            <div className="text-center pt-6">
              <p className="text-gray-600 dark:text-gray-400 font-arabic">
                آخر تحديث: 15 يناير 2024
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsAr;
