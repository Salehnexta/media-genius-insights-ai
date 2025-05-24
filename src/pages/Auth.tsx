
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    email: '', 
    password: '', 
    fullName: '', 
    companyName: '' 
  });
  
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();
  
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signIn(loginData.email, loginData.password);
      
      if (error) {
        toast({
          title: language === 'ar' ? 'خطأ في تسجيل الدخول' : 'Login Error',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: language === 'ar' ? 'مرحباً بك!' : 'Welcome back!',
          description: language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Successfully logged in'
        });
      }
    } catch (error: any) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signUp(signupData.email, signupData.password, {
        full_name: signupData.fullName,
        company_name: signupData.companyName
      });
      
      if (error) {
        toast({
          title: language === 'ar' ? 'خطأ في إنشاء الحساب' : 'Signup Error',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: language === 'ar' ? 'تم إنشاء الحساب!' : 'Account Created!',
          description: language === 'ar' ? 'مرحباً بك في عبقري التسويق الذكي' : 'Welcome to MarketingGenius AI'
        });
      }
    } catch (error: any) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4 ${isArabic ? 'rtl' : ''}`}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to={isArabic ? '/ar' : '/'} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors mb-4">
            <ArrowLeft className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
            {isArabic ? 'العودة للصفحة الرئيسية' : 'Back to Home'}
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {isArabic ? 'عبقري التسويق الذكي' : 'MarketingGenius AI'}
            </span>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {isArabic ? 'مرحباً بك' : 'Welcome'}
            </CardTitle>
            <CardDescription>
              {isArabic ? 'سجل دخولك أو أنشئ حساباً جديداً للبدء' : 'Sign in to your account or create a new one to get started'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">
                  {isArabic ? 'تسجيل الدخول' : 'Sign In'}
                </TabsTrigger>
                <TabsTrigger value="signup">
                  {isArabic ? 'إنشاء حساب' : 'Sign Up'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {isArabic ? 'البريد الإلكتروني' : 'Email'}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      {isArabic ? 'كلمة المرور' : 'Password'}
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder={isArabic ? 'أدخل كلمة المرور' : 'Enter your password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isArabic ? 'جاري تسجيل الدخول...' : 'Signing in...'}
                      </>
                    ) : (
                      isArabic ? 'تسجيل الدخول' : 'Sign In'
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      {isArabic ? 'الاسم الكامل' : 'Full Name'}
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={isArabic ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">
                      {isArabic ? 'اسم الشركة (اختياري)' : 'Company Name (Optional)'}
                    </Label>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder={isArabic ? 'أدخل اسم شركتك' : 'Enter your company name'}
                      value={signupData.companyName}
                      onChange={(e) => setSignupData({ ...signupData, companyName: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">
                      {isArabic ? 'البريد الإلكتروني' : 'Email'}
                    </Label>
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">
                      {isArabic ? 'كلمة المرور' : 'Password'}
                    </Label>
                    <Input
                      id="signupPassword"
                      type="password"
                      placeholder={isArabic ? 'أدخل كلمة مرور قوية' : 'Enter a strong password'}
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isArabic ? 'جاري إنشاء الحساب...' : 'Creating account...'}
                      </>
                    ) : (
                      isArabic ? 'إنشاء حساب' : 'Create Account'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
