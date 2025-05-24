
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, ArrowRight } from 'lucide-react';

const RegisterAr = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 rtl">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/ar" className="inline-flex items-center space-x-2 space-x-reverse mb-8">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              عبقري التسويق الذكي
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            إنشاء حساب جديد
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            انضم إلى آلاف المسوقين الذكيين
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">التسجيل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل</Label>
              <Input id="name" type="text" placeholder="أدخل اسمك الكامل" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input id="email" type="email" placeholder="أدخل بريدك الإلكتروني" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input id="password" type="password" placeholder="أدخل كلمة المرور" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
              <Input id="confirmPassword" type="password" placeholder="أعد إدخال كلمة المرور" />
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              إنشاء الحساب
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                لديك حساب بالفعل؟{' '}
                <Link to="/ar/auth" className="text-blue-600 hover:text-blue-500">
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/ar" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterAr;
