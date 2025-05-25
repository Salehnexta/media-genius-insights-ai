
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsAr: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 p-8 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={`${isArabic ? 'text-right' : ''}`}>
            <h1 className={`text-3xl font-bold ${isArabic ? 'font-arabic' : ''}`}>
              شروط الخدمة
            </h1>
            <p className={`text-gray-600 dark:text-gray-400 mt-2 ${isArabic ? 'font-arabic' : ''}`}>
              الشروط والأحكام لاستخدام منصة التسويق الذكي
            </p>
          </div>
          <FileText className="h-8 w-8 text-blue-600" />
        </div>

        {/* Back Button */}
        <Link 
          to="/landing-ar" 
          className={`inline-flex items-center text-blue-600 hover:text-blue-800 ${isArabic ? 'flex-row-reverse' : ''}`}
        >
          <ArrowLeft className="w-4 h-4 mx-2" />
          <span className={isArabic ? 'font-arabic' : ''}>
            العودة للصفحة الرئيسية
          </span>
        </Link>

        {/* Terms Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'font-arabic text-right' : ''}`}>
                1. القبول بالشروط
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${isArabic ? 'font-arabic text-right' : ''}`}>
                باستخدام منصة التسويق الذكي، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الخدمة.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'font-arabic text-right' : ''}`}>
                2. وصف الخدمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${isArabic ? 'font-arabic text-right' : ''}`}>
                منصة التسويق الذكي هي خدمة تقدم حلول تسويقية مدعومة بالذكاء الاصطناعي لمساعدة الشركات في إدارة حملاتها التسويقية وتحليل الأداء.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'font-arabic text-right' : ''}`}>
                3. حقوق والتزامات المستخدم
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`space-y-4 ${isArabic ? 'text-right' : ''}`}>
                <h4 className={`font-semibold ${isArabic ? 'font-arabic' : ''}`}>حقوقك:</h4>
                <ul className={`list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ${isArabic ? 'font-arabic' : ''}`}>
                  <li>الوصول إلى جميع ميزات الخدمة وفقاً لخطة الاشتراك</li>
                  <li>الحصول على الدعم الفني</li>
                  <li>حماية البيانات الشخصية</li>
                </ul>
                
                <h4 className={`font-semibold mt-6 ${isArabic ? 'font-arabic' : ''}`}>التزاماتك:</h4>
                <ul className={`list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ${isArabic ? 'font-arabic' : ''}`}>
                  <li>استخدام الخدمة بشكل قانوني وأخلاقي</li>
                  <li>عدم انتهاك حقوق الملكية الفكرية</li>
                  <li>دفع الرسوم المستحقة في الوقت المحدد</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'font-arabic text-right' : ''}`}>
                4. سياسة الدفع والاسترداد
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${isArabic ? 'font-arabic text-right' : ''}`}>
                يتم تحصيل الرسوم شهرياً أو سنوياً حسب الخطة المختارة. يمكن طلب استرداد الأموال خلال 14 يوماً من تاريخ الاشتراك بشروط معينة.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'font-arabic text-right' : ''}`}>
                5. إنهاء الخدمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${isArabic ? 'font-arabic text-right' : ''}`}>
                يحق لأي من الطرفين إنهاء الخدمة بإشعار مسبق. في حالة إنهاء الخدمة، ستبقى البيانات متاحة لمدة 30 يوماً قبل الحذف النهائي.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'font-arabic text-right' : ''}`}>
                6. تحديث الشروط
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${isArabic ? 'font-arabic text-right' : ''}`}>
                نحتفظ بالحق في تحديث هذه الشروط من وقت لآخر. سيتم إشعار المستخدمين بأي تغييرات جوهرية قبل دخولها حيز التنفيذ.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'font-arabic text-right' : ''}`}>
                7. التواصل معنا
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${isArabic ? 'font-arabic text-right' : ''}`}>
                لأي استفسارات حول هذه الشروط، يرجى التواصل معنا عبر:
              </p>
              <div className={`mt-4 space-y-2 ${isArabic ? 'text-right font-arabic' : ''}`}>
                <p>البريد الإلكتروني: support@smartmarketing.sa</p>
                <p>الهاتف: 966-11-123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className={`text-center py-8 ${isArabic ? 'font-arabic' : ''}`}>
          <p className="text-gray-600 dark:text-gray-400">
            آخر تحديث: يناير 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAr;
