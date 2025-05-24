
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Database, Users, Eye, AlertTriangle, Clock, Bot } from 'lucide-react';

const PrivacyAr: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              سياسة الخصوصية
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
            </p>
          </div>

          <div className="space-y-8">
            {/* Information Collection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-green-600" />
                  المعلومات التي نجمعها
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">معلومات الأعمال</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>اسم الشركة والصناعة ورابط الموقع الإلكتروني</li>
                      <li>حسابات وسائل التواصل الاجتماعي والأهداف التسويقية</li>
                      <li>معلومات المنافسين وبيانات تحليل السوق</li>
                      <li>أداء الحملات والبيانات التحليلية</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">بيانات التفاعل مع الذكاء الاصطناعي</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>محادثات الدردشة مع وكلاء الذكاء الاصطناعي</li>
                      <li>طلبات إنشاء المحتوى والنتائج</li>
                      <li>توصيات ورؤى الذكاء الاصطناعي المعروضة</li>
                      <li>أنماط الاستخدام واستخدام الميزات</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  كيف نستخدم معلوماتك
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">رؤى مدعومة بالذكاء الاصطناعي</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">إنشاء استراتيجيات وتوصيات تسويقية مخصصة باستخدام تحليل الذكاء الاصطناعي المتقدم</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">إنشاء المحتوى</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">إنشاء محتوى تسويقي مخصص ونسخ وأصول مرئية باستخدام نماذج الذكاء الاصطناعي</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Data Processing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-purple-600" />
                  معالجة بيانات الذكاء الاصطناعي
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <h4 className="font-semibold text-green-900 dark:text-green-100">حماية البيانات</h4>
                  </div>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    جميع البيانات المرسلة إلى خدمات الذكاء الاصطناعي مشفرة ولا يتم تخزينها أو استخدامها لتدريب النماذج.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  مشاركة البيانات والأطراف الثالثة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-semibold mb-2">قد نشارك المعلومات مع:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>مقدمي خدمات الذكاء الاصطناعي (OpenAI، إلخ) للمعالجة والتحليل</li>
                    <li>مقدمي التحليلات لمراقبة أداء المنصة</li>
                    <li>معالجي المدفوعات لإدارة الاشتراكات</li>
                    <li>السلطات القانونية عند الطلب بموجب القانون</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* User Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-red-600" />
                  حقوقك والتحكم في البيانات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">الوصول والنقل</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>طلب الوصول إلى بياناتك</li>
                      <li>تصدير معلوماتك</li>
                      <li>عرض تاريخ تفاعل الذكاء الاصطناعي</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">الحذف والتصحيح</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>حذف حسابك وبياناتك</li>
                      <li>تصحيح المعلومات غير الدقيقة</li>
                      <li>إلغاء الاشتراك في معالجة الذكاء الاصطناعي</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-gray-50 dark:bg-gray-800/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-semibold mb-2">اتصل بنا حول الخصوصية</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    للاستفسارات المتعلقة بالخصوصية أو لممارسة حقوقك، اتصل بمسؤول حماية البيانات:
                  </p>
                  <div className="space-y-1 text-sm">
                    <p><strong>الشركة:</strong> نكستا المملكة العربية السعودية</p>
                    <p><strong>البريد الإلكتروني:</strong> info@nexta.sa</p>
                    <p><strong>العنوان:</strong> الدمام الخبر، المملكة العربية السعودية</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back to Landing Button */}
          <div className="flex justify-center mt-8">
            <Button 
              onClick={() => navigate('/landing-ar')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              العودة إلى الصفحة الرئيسية
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAr;
