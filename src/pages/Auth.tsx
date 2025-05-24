
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthForm from '@/components/auth/AuthForm';
import AuthToggle from '@/components/auth/AuthToggle';

const Auth = () => {
  const location = useLocation();
  const isRegisterAr = location.pathname === '/register-ar';
  const isAuthAr = location.pathname === '/auth-ar';
  
  const [isLogin, setIsLogin] = useState(!isRegisterAr);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signIn, signUp, user, loading } = useAuth();
  const { toast } = useToast();
  const { setLanguage, language } = useLanguage();
  const navigate = useNavigate();
  
  // Set language based on route
  useEffect(() => {
    if (isRegisterAr || isAuthAr) {
      setLanguage('ar');
    }
  }, [isRegisterAr, isAuthAr, setLanguage]);
  
  const isArabic = language === 'ar' || isRegisterAr || isAuthAr;
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user && !loading) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  const handleBackToHome = () => {
    if (isArabic) {
      navigate('/landing-ar');
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent double submission
    
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: isArabic ? 'خطأ في تسجيل الدخول' : 'Login Error',
            description: error.message,
            variant: 'destructive'
          });
        } else {
          toast({
            title: isArabic ? 'مرحباً بك' : 'Welcome back',
            description: isArabic ? 'تم تسجيل الدخول بنجاح' : 'Successfully signed in'
          });
        }
      } else {
        if (password !== confirmPassword) {
          toast({
            title: isArabic ? 'خطأ' : 'Error',
            description: isArabic ? 'كلمات المرور غير متطابقة' : 'Passwords do not match',
            variant: 'destructive'
          });
          return;
        }

        const { error } = await signUp(email, password, { full_name: fullName });
        if (error) {
          toast({
            title: isArabic ? 'خطأ في التسجيل' : 'Signup Error',
            description: error.message,
            variant: 'destructive'
          });
        } else {
          toast({
            title: isArabic ? 'تم إنشاء الحساب' : 'Account Created',
            description: isArabic ? 'تم إنشاء حسابك بنجاح. جاري تسجيل الدخول...' : 'Your account has been created successfully. Signing you in...'
          });
        }
      }
    } catch (error: any) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleMode = () => {
    if (isArabic) {
      if (isLogin) {
        navigate('/register-ar');
      } else {
        navigate('/auth-ar');
      }
    } else {
      setIsLogin(!isLogin);
    }
  };

  // Show loading only on initial load
  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 ${isArabic ? 'rtl' : ''}`}>
      <div className="w-full max-w-md">
        <AuthHeader 
          isLogin={isLogin}
          isArabic={isArabic}
          onBackToHome={handleBackToHome}
        />

        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="space-y-4">
            <AuthForm
              isLogin={isLogin}
              isArabic={isArabic}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              fullName={fullName}
              showPassword={showPassword}
              loading={isSubmitting}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onConfirmPasswordChange={setConfirmPassword}
              onFullNameChange={setFullName}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onSubmit={handleSubmit}
            />
            
            <AuthToggle
              isLogin={isLogin}
              isArabic={isArabic}
              onToggle={handleToggleMode}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
