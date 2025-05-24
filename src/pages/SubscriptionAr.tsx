
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, CreditCard, CheckCircle, ArrowLeft, Zap } from 'lucide-react';

const SubscriptionAr = () => {
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
            <Link to="/subscription" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              إدارة الاشتراك
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              إدارة خطة الاشتراك والدفع الخاصة بك
            </p>
          </div>

          {/* Current Plan Card */}
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                خطتك الحالية: الخطة المتقدمة
                <Badge variant="secondary">نشط</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    299 ريال
                    <span className="text-sm font-normal text-gray-600">/شهر</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    5,000 رسالة ذكية شهرياً
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">تحليلات متقدمة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">دعم ذو أولوية</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">تعاون الفريق</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">دورة الفوترة الحالية</p>
                      <p className="font-medium">1 ديسمبر 2024 - 31 ديسمبر 2024</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">الاستخدام هذا الشهر</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-sm">3,000 / 5,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                طريقة الدفع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">تنتهي في 12/25</p>
                  </div>
                </div>
                <Button variant="outline">تحديث البطاقة</Button>
              </div>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>تاريخ الفواتير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">فاتورة نوفمبر 2024</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">1 نوفمبر 2024</p>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">299 ريال</p>
                    <Badge variant="secondary" className="text-xs">مدفوعة</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">فاتورة أكتوبر 2024</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">1 أكتوبر 2024</p>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">299 ريال</p>
                    <Badge variant="secondary" className="text-xs">مدفوعة</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/ar/pricing">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                ترقية الخطة
                <ArrowLeft className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline">
              إلغاء الاشتراك
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAr;
