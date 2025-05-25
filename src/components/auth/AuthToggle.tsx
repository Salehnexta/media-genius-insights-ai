
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface AuthToggleProps {
  isLogin: boolean;
  isArabic: boolean;
  onToggle: () => void;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ isLogin, isArabic, onToggle }) => {
  return (
    <>
      <Separator />
      
      <div className="text-center">
        <span className="text-sm text-muted-foreground">
          {isLogin 
            ? (isArabic ? 'ليس لديك حساب؟' : "Don't have an account?")
            : (isArabic ? 'لديك حساب بالفعل؟' : 'Already have an account?')
          }
        </span>
        <Button
          variant="link"
          onClick={onToggle}
          className="text-blue-600 hover:text-blue-700 p-0 ml-1"
        >
          {isLogin 
            ? (isArabic ? 'إنشاء حساب جديد' : 'Sign up')
            : (isArabic ? 'تسجيل الدخول' : 'Sign in')
          }
        </Button>
      </div>
    </>
  );
};

export default AuthToggle;
