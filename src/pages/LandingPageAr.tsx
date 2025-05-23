
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3, Brain, Target, TrendingUp, Users, Zap } from 'lucide-react';

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

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
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
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <div className="h-8 w-8 bg-marketing-gradient rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">عبقري التسويق الذكي</span>
          </div>
          <p className="text-gray-400">
            © 2024 عبقري التسويق الذكي. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageAr;
