
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isArabic = language === 'ar';
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: isArabic ? "خطأ" : "Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        setSent(true);
        toast({
          title: isArabic ? "تم الإرسال" : "Email Sent",
          description: isArabic ? "تم إرسال رابط إعادة تعيين كلمة المرور" : "Password reset link has been sent"
        });
      }
    } catch (error) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "حدث خطأ غير متوقع" : "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl font-bold ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'استعادة كلمة المرور' : 'Reset Password'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className={isArabic ? 'font-arabic' : ''}>
                  {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
                  required
                  className={isArabic ? 'text-right' : ''}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                <Mail className="w-4 h-4 mr-2" />
                {loading 
                  ? (isArabic ? 'جاري الإرسال...' : 'Sending...') 
                  : (isArabic ? 'إرسال رابط الاستعادة' : 'Send Reset Link')
                }
              </Button>
            </form>
          ) : (
            <div className={`text-center space-y-4 ${isArabic ? 'font-arabic' : ''}`}>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-lg font-semibold">
                {isArabic ? 'تم إرسال البريد' : 'Email Sent'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {isArabic 
                  ? 'تحقق من بريدك الإلكتروني واتبع التعليمات لإعادة تعيين كلمة المرور'
                  : 'Check your email and follow the instructions to reset your password'
                }
              </p>
            </div>
          )}
          
          <div className={`mt-6 text-center ${isArabic ? 'font-arabic' : ''}`}>
            <Link 
              to="/auth" 
              className={`inline-flex items-center text-blue-600 hover:text-blue-800 ${isArabic ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className="w-4 h-4 mx-2" />
              {isArabic ? 'العودة لتسجيل الدخول' : 'Back to Login'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
