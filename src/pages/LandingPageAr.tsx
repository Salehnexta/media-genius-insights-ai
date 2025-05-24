
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3, Brain, Target, TrendingUp, Users, Zap, CheckCircle, Star, Globe, Shield, Play } from 'lucide-react';

const LandingPageAr = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 rtl">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-md dark:bg-gray-900/95 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              عبقري التسويق الذكي
            </span>
          </div>
          <div className="flex items-center space-x-6 space-x-reverse">
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">الميزات</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">نبذة عنا</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">آراء العملاء</a>
            </nav>
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
              English
            </Link>
            <Link to="/dashboard">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <ArrowLeft className="ml-2 h-4 w-4" />
                ابدأ الآن
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
              🚀 ذكاء التسويق المدعوم بالذكاء الاصطناعي
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            حوّل استراتيجية
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              التسويق الخاصة بك
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            استفد من قوة الذكاء الاصطناعي لفهم جمهورك وتحسين الحملات وتحقيق نمو غير مسبوق. 
            انضم إلى آلاف المسوقين الذين يتخذون قرارات مبنية على البيانات.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 space-x-reverse">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                <ArrowLeft className="ml-2 h-5 w-5" />
                ابدأ الفترة التجريبية المجانية
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              <Play className="mr-2 h-5 w-5" />
              شاهد العرض التوضيحي
            </Button>
          </div>
          
          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-1">
              <img 
                src="/lovable-uploads/f69bc471-c52a-4ed9-bdfe-f26e2923002b.png" 
                alt="لوحة معلومات عبقري التسويق الذكي"
                className="w-full rounded-xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">٥٠ ألف+</div>
              <div className="text-gray-600 dark:text-gray-400">مستخدم نشط</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">٢ مليون+</div>
              <div className="text-gray-600 dark:text-gray-400">حملة تم تحليلها</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">٩٥٪</div>
              <div className="text-gray-600 dark:text-gray-400">رضا العملاء</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">٤٠٪</div>
              <div className="text-gray-600 dark:text-gray-400">متوسط زيادة العائد على الاستثمار</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8">
                  <img 
                    src="/lovable-uploads/f69bc471-c52a-4ed9-bdfe-f26e2923002b.png" 
                    alt="محترفة تستخدم منصة التسويق"
                    className="w-full rounded-xl shadow-2xl"
                  />
                </div>
                <div className="absolute -z-10 -top-8 -right-8 w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl"></div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-4">
                <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  لماذا تختارنا
                </span>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                  تمكين المسوقين العصريين حول العالم
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  تساعد منصتنا المدعومة بالذكاء الاصطناعي آلاف المحترفين في مجال التسويق حول العالم 
                  على اتخاذ قرارات أذكى وتحسين الحملات وتحقيق عائد استثمار أفضل من خلال التحليلات المتقدمة والرؤى الذكية.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">تحسين الحملات في الوقت الفعلي</h3>
                    <p className="text-gray-600 dark:text-gray-300">راقب واضبط حملاتك فوراً مع التوصيات المدعومة بالذكاء الاصطناعي</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">استهداف متقدم للجمهور</h3>
                    <p className="text-gray-600 dark:text-gray-300">اصل إلى الأشخاص المناسبين في الوقت المناسب مع الاستهداف الدقيق</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">تحليلات تنبؤية</h3>
                    <p className="text-gray-600 dark:text-gray-300">توقع الاتجاهات واتخذ قرارات استباقية مع رؤى الذكاء الاصطناعي</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
              الميزات
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              كل ما تحتاجه للنجاح
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              أدوات ورؤى شاملة لتحويل استراتيجية التسويق الخاصة بك
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "تحليلات الأداء",
                description: "تتبع وتحليل أداء التسويق الخاص بك مع لوحات معلومات شاملة ومقاييس في الوقت الفعلي",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                icon: <Brain className="h-8 w-8" />,
                title: "رؤى مدعومة بالذكاء الاصطناعي",
                description: "احصل على توصيات ذكية وتحليلات تنبؤية لتحسين استراتيجية التسويق الخاصة بك",
                gradient: "from-purple-500 to-purple-600"
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "ذكاء الجمهور",
                description: "افهم عملاءك بشكل أفضل مع رؤى مفصلة للجمهور وتحليل السلوك",
                gradient: "from-green-500 to-green-600"
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "تحليل المنافسين",
                description: "ابق متقدماً على المنافسة مع ذكاء السوق الشامل والمقارنات المرجعية",
                gradient: "from-red-500 to-red-600"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "إدارة الحملات",
                description: "خطط ونفذ وحسن حملاتك التسويقية مع رؤى مبنية على البيانات",
                gradient: "from-yellow-500 to-yellow-600"
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "إنشاء المحتوى",
                description: "أنشئ محتوى جذاب بمساعدة الذكاء الاصطناعي وجدوله عبر منصات متعددة",
                gradient: "from-indigo-500 to-indigo-600"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader className="space-y-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
              آراء العملاء
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              محبوب من فرق التسويق في جميع أنحاء العالم
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "سارة أحمد",
                role: "مديرة التسويق",
                company: "تك كورب",
                avatar: "س",
                gradient: "from-blue-500 to-blue-600",
                content: "لقد غيّر عبقري التسويق الذكي تماماً طريقة تعاملنا مع حملاتنا التسويقية. الرؤى دقيقة بشكل لا يصدق وقابلة للتطبيق."
              },
              {
                name: "محمد علي",
                role: "الرئيس التنفيذي",
                company: "تك ستارت",
                avatar: "م",
                gradient: "from-green-500 to-green-600",
                content: "ساعدتنا التوصيات المدعومة بالذكاء الاصطناعي على زيادة معدلات التحويل بنسبة ٦٠٪. إنه مثل وجود خبير تسويق في فريقنا على مدار الساعة."
              },
              {
                name: "عائشة محمد",
                role: "مديرة النمو",
                company: "سكيل أب",
                avatar: "ع",
                gradient: "from-purple-500 to-purple-600",
                content: "منصة ممتازة! ميزة تحليل المنافسين وحدها وفرت علينا ساعات لا تحصى من البحث وساعدتنا على البقاء في المقدمة في السوق."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="flex space-x-1 space-x-reverse">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}، {testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto text-center">
          <div className="space-y-4 mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
              الأمان والثقة
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              أمان وموثوقية على مستوى المؤسسات
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Shield className="h-12 w-12" />,
                title: "أمان على مستوى البنوك",
                description: "بياناتك محمية بتشفير وبروتوكولات أمان على مستوى المؤسسات",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                icon: <Globe className="h-12 w-12" />,
                title: "بنية تحتية عالمية",
                description: "وقت تشغيل ٩٩.٩٪ مع خوادم عبر مناطق متعددة للأداء الأمثل",
                gradient: "from-green-500 to-green-600"
              },
              {
                icon: <CheckCircle className="h-12 w-12" />,
                title: "متوافق مع قانون حماية البيانات العامة",
                description: "متوافق بالكامل مع لوائح حماية البيانات الدولية",
                gradient: "from-purple-500 to-purple-600"
              }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className={`w-20 h-20 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center text-white mx-auto`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <div className="space-y-8 max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-white">
              هل أنت مستعد لتحويل تسويقك؟
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              انضم إلى آلاف المسوقين الذين يستخدمون عبقري التسويق الذكي بالفعل لتحقيق نتائج أفضل. 
              ابدأ الفترة التجريبية المجانية اليوم وشاهد الفرق الذي يمكن أن يحدثه الذكاء الاصطناعي.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 space-x-reverse">
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
                  <ArrowLeft className="ml-2 h-5 w-5" />
                  ابدأ الفترة التجريبية المجانية
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                جدولة عرض توضيحي
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">عبقري التسويق الذكي</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                تحويل التسويق بالرؤى والتحليلات المدعومة بالذكاء الاصطناعي. 
                انضم إلى آلاف المسوقين الذين يتخذون قرارات مبنية على البيانات.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">المنتج</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">الميزات</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الأسعار</a></li>
                <li><a href="#" className="hover:text-white transition-colors">واجهة برمجة التطبيقات</a></li>
                <li><a href="#" className="hover:text-white transition-colors">التكاملات</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">الشركة</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">نبذة عنا</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الوظائف</a></li>
                <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
                <li><a href="#" className="hover:text-white transition-colors">المدونة</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">الدعم</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">التوثيق</a></li>
                <li><a href="#" className="hover:text-white transition-colors">المجتمع</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الحالة</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center">
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
