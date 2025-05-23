
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3, Brain, Target, TrendingUp, Users, Zap, CheckCircle, Star, Globe, Shield } from 'lucide-react';

const LandingPageAr = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rtl">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="h-8 w-8 bg-marketing-gradient rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-marketing-gradient bg-clip-text text-transparent">
              عبقري التسويق الذكي
            </span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              English
            </Link>
            <Link to="/dashboard">
              <Button>
                <ArrowLeft className="ml-2 h-4 w-4" />
                الذهاب إلى لوحة المعلومات
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            ثورة في التسويق مع 
            <span className="bg-marketing-gradient bg-clip-text text-transparent"> الذكاء الاصطناعي</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            حوّل استراتيجية التسويق الخاصة بك مع التحليلات الشاملة والرؤى المدعومة بالذكاء الاصطناعي 
            وتتبع الأداء في الوقت الفعلي. اتخذ قرارات مبنية على البيانات تحقق النمو.
          </p>
          <div className="flex items-center justify-center space-x-4 space-x-reverse">
            <Link to="/dashboard">
              <Button size="lg" className="bg-marketing-gradient hover:opacity-90">
                <ArrowLeft className="ml-2 h-5 w-5" />
                ابدأ رحلتك
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              شاهد العرض التوضيحي
            </Button>
          </div>
        </div>
      </section>

      {/* About Section with Image */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="/lovable-uploads/f69bc471-c52a-4ed9-bdfe-f26e2923002b.png" 
                alt="محترفة تستخدم منصة التسويق"
                className="rounded-lg shadow-xl max-w-md w-full mx-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                تمكين المسوقين العصريين حول العالم
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                تساعد منصتنا المدعومة بالذكاء الاصطناعي آلاف المحترفين في مجال التسويق حول العالم 
                على اتخاذ قرارات أذكى وتحسين الحملات وتحقيق عائد استثمار أفضل من خلال التحليلات المتقدمة والرؤى الذكية.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">تحسين الحملات في الوقت الفعلي</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">استهداف متقدم للجمهور</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">تحليلات تنبؤية وتوقعات</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              ميزات قوية للمسوقين العصريين
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              كل ما تحتاجه لفهم وتحسين وتوسيع جهودك التسويقية
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-blue-500 mb-2" />
                <CardTitle>تحليلات الأداء</CardTitle>
                <CardDescription>
                  تتبع وتحليل أداء التسويق الخاص بك مع لوحات معلومات شاملة ومقاييس في الوقت الفعلي
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Brain className="h-10 w-10 text-purple-500 mb-2" />
                <CardTitle>رؤى مدعومة بالذكاء الاصطناعي</CardTitle>
                <CardDescription>
                  احصل على توصيات ذكية وتحليلات تنبؤية لتحسين استراتيجية التسويق الخاصة بك
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Target className="h-10 w-10 text-green-500 mb-2" />
                <CardTitle>ذكاء الجمهور</CardTitle>
                <CardDescription>
                  افهم عملاءك بشكل أفضل مع رؤى مفصلة للجمهور وتحليل السلوك
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-red-500 mb-2" />
                <CardTitle>تحليل المنافسين</CardTitle>
                <CardDescription>
                  ابق متقدماً على المنافسة مع ذكاء السوق الشامل والمقارنات المرجعية
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="h-10 w-10 text-yellow-500 mb-2" />
                <CardTitle>إدارة الحملات</CardTitle>
                <CardDescription>
                  خطط ونفذ وحسن حملاتك التسويقية مع رؤى مبنية على البيانات
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Zap className="h-10 w-10 text-indigo-500 mb-2" />
                <CardTitle>إنشاء المحتوى</CardTitle>
                <CardDescription>
                  أنشئ محتوى جذاب بمساعدة الذكاء الاصطناعي وجدوله عبر منصات متعددة
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            موثوق به من قادة التسويق في جميع أنحاء العالم
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">٥٠ ألف+</div>
              <div className="text-gray-600 dark:text-gray-300">مستخدم نشط</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">٢ مليون+</div>
              <div className="text-gray-600 dark:text-gray-300">حملة تم تحليلها</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">٩٥٪</div>
              <div className="text-gray-600 dark:text-gray-300">رضا العملاء</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">٤٠٪</div>
              <div className="text-gray-600 dark:text-gray-300">متوسط زيادة العائد على الاستثمار</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              ماذا يقول عملاؤنا
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "لقد غيّر عبقري التسويق الذكي تماماً طريقة تعاملنا مع حملاتنا التسويقية. 
                  الرؤى دقيقة بشكل لا يصدق وقابلة للتطبيق."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    س
                  </div>
                  <div className="mr-3">
                    <div className="font-semibold text-gray-900 dark:text-white">سارة أحمد</div>
                    <div className="text-sm text-gray-500">مديرة التسويق</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "ساعدتنا التوصيات المدعومة بالذكاء الاصطناعي على زيادة معدلات التحويل بنسبة ٦٠٪. 
                  إنه مثل وجود خبير تسويق في فريقنا على مدار الساعة."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    م
                  </div>
                  <div className="mr-3">
                    <div className="font-semibold text-gray-900 dark:text-white">محمد علي</div>
                    <div className="text-sm text-gray-500">الرئيس التنفيذي، تك ستارت</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "منصة ممتازة! ميزة تحليل المنافسين وحدها وفرت علينا ساعات لا تحصى من البحث 
                  وساعدتنا على البقاء في المقدمة في السوق."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    ع
                  </div>
                  <div className="mr-3">
                    <div className="font-semibold text-gray-900 dark:text-white">عائشة محمد</div>
                    <div className="text-sm text-gray-500">مديرة النمو</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            أمان وموثوقية على مستوى المؤسسات
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                أمان على مستوى البنوك
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                بياناتك محمية بتشفير وبروتوكولات أمان على مستوى المؤسسات
              </p>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                بنية تحتية عالمية
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                وقت تشغيل ٩٩.٩٪ مع خوادم عبر مناطق متعددة للأداء الأمثل
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                متوافق مع قانون حماية البيانات العامة
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                متوافق بالكامل مع لوائح حماية البيانات الدولية
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-marketing-gradient">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            هل أنت مستعد لتحويل تسويقك؟
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف المسوقين الذين يستخدمون عبقري التسويق الذكي بالفعل لتحقيق نتائج أفضل
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              <ArrowLeft className="ml-2 h-5 w-5" />
              ابدأ الآن
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <div className="h-8 w-8 bg-marketing-gradient rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">عبقري التسويق الذكي</span>
              </div>
              <p className="text-gray-400">
                تحويل التسويق بالرؤى والتحليلات المدعومة بالذكاء الاصطناعي.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">المنتج</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">الميزات</a></li>
                <li><a href="#" className="hover:text-white">الأسعار</a></li>
                <li><a href="#" className="hover:text-white">واجهة برمجة التطبيقات</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">الشركة</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">نبذة عنا</a></li>
                <li><a href="#" className="hover:text-white">الوظائف</a></li>
                <li><a href="#" className="hover:text-white">اتصل بنا</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">الدعم</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-white">التوثيق</a></li>
                <li><a href="#" className="hover:text-white">المجتمع</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-400">
              © 2024 عبقري التسويق الذكي. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageAr;
