
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isArabic = language === 'ar';

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleBackToHome = () => {
    if (isArabic) {
      navigate('/landing-ar');
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
          // The useEffect will handle the redirect when user state updates
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
          // The useEffect will handle the redirect when user state updates
        }
      }
    } catch (error: any) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 ${isArabic ? 'rtl' : ''}`}>
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={handleBackToHome}
          className={`mb-6 ${isArabic ? 'mr-auto' : 'ml-0'}`}
        >
          <ArrowLeft className={`h-4 w-4 ${isArabic ? 'ml-2 rotate-180' : 'mr-2'}`} />
          {isArabic ? 'العودة للرئيسية' : 'Back to Home'}
        </Button>

        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
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
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    {isArabic ? 'الاسم الكامل' : 'Full Name'}
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                    className="bg-white dark:bg-gray-800"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">
                  {isArabic ? 'البريد الإلكتروني' : 'Email'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white dark:bg-gray-800"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">
                  {isArabic ? 'كلمة المرور' : 'Password'}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white dark:bg-gray-800 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-white dark:bg-gray-800"
                  />
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={loading}
              >
                {loading 
                  ? (isArabic ? 'جاري المعالجة...' : 'Processing...')
                  : isLogin 
                    ? (isArabic ? 'تسجيل الدخول' : 'Sign In')
                    : (isArabic ? 'إنشاء الحساب' : 'Create Account')
                }
              </Button>
            </form>
            
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
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 p-0 ml-1"
              >
                {isLogin 
                  ? (isArabic ? 'إنشاء حساب جديد' : 'Sign up')
                  : (isArabic ? 'تسجيل الدخول' : 'Sign in')
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
