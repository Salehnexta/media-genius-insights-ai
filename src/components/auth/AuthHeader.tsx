
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface AuthHeaderProps {
  isLogin: boolean;
  isArabic: boolean;
  onBackToHome: () => void;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ isLogin, isArabic, onBackToHome }) => {
  return (
    <>
      <Button
        variant="ghost"
        onClick={onBackToHome}
        className={`mb-6 ${isArabic ? 'mr-auto' : 'ml-0'}`}
      >
        <ArrowLeft className={`h-4 w-4 ${isArabic ? 'ml-2 rotate-180' : 'mr-2'}`} />
        {isArabic ? 'العودة للرئيسية' : 'Back to Home'}
      </Button>

      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">MG</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {isLogin 
            ? (isArabic ? 'تسجيل الدخول' : 'Sign In')
            : (isArabic ? 'إنشاء حساب جديد' : 'Create Account')
          }
        </CardTitle>
        <p className="text-muted-foreground">
          {isLogin 
            ? (isArabic ? 'ادخل بياناتك للوصول إلى حسابك' : 'Enter your credentials to access your account')
            : (isArabic ? 'أنشئ حساباً جديداً للبدء' : 'Create a new account to get started')
          }
        </p>
      </CardHeader>
    </>
  );
};

export default AuthHeader;
