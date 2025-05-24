
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, CheckCircle, ArrowLeft, Star } from 'lucide-react';

const PricingAr = () => {
  const plans = [
    {
      name: "الخطة الأساسية",
      price: "99",
      features: [
        "1,000 رسالة ذكية شهرياً",
        "تحليلات أساسية",
        "دعم عبر البريد الإلكتروني",
        "لوحة تحكم شخصية"
      ],
      popular: false
    },
    {
      name: "الخطة المتقدمة",
      price: "299",
      features: [
        "5,000 رسالة ذكية شهرياً",
        "تحليلات متقدمة",
        "دعم ذو أولوية",
        "تعاون الفريق",
        "تقارير مخصصة"
      ],
      popular: true
    },
    {
      name: "خطة المؤسسات",
      price: "799",
      features: [
        "رسائل ذكية غير محدودة",
        "تحليلات شاملة",
        "دعم مخصص 24/7",
        "إدارة متقدمة للفريق",
        "تكامل مخصص",
        "مدير حساب مخصص"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 rtl">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-md dark:bg-gray-900/95 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/ar" className="flex items-center space-x-2 space-x-reverse">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              عبقري التسويق الذكي
            </span>
          </Link>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              English
            </Link>
            <Link to="/ar/auth">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <ArrowLeft className="ml-2 h-4 w-4" />
                تسجيل الدخول
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            خطط الأسعار
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            اختر الخطة التي تناسب احتياجاتك وابدأ في تحويل استراتيجية التسويق الخاصة بك اليوم
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                    الأكثر شعبية
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl mb-4">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {plan.price} ريال
                    <span className="text-lg font-normal text-gray-600">/شهر</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 space-x-reverse">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/ar/register">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                          : 'bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                      }`}
                    >
                      ابدأ الآن
                      <ArrowLeft className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-16">
            لماذا تختار عبقري التسويق الذكي؟
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">جودة عالية</h3>
              <p className="text-gray-600 dark:text-gray-400">أدوات متقدمة وذكية لضمان أفضل النتائج</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">موثوق</h3>
              <p className="text-gray-600 dark:text-gray-400">يثق بنا آلاف المسوقين حول العالم</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ذكي</h3>
              <p className="text-gray-600 dark:text-gray-400">مدعوم بأحدث تقنيات الذكاء الاصطناعي</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <Link to="/ar" className="inline-flex items-center space-x-3 space-x-reverse mb-8">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">عبقري التسويق الذكي</span>
          </Link>
          <p className="text-gray-400 mb-8">
            © 2024 عبقري التسويق الذكي. جميع الحقوق محفوظة.
          </p>
          <div className="flex justify-center space-x-4 space-x-reverse">
            <Link to="/" className="text-gray-400 hover:text-white">English</Link>
            <Link to="/ar/auth" className="text-blue-400 hover:text-blue-300">تسجيل الدخول</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingAr;
