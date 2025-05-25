
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Settings, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const ZapierSettings: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const isArabic = language === 'ar';

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        // Check if user has admin role
        const { data: userRoles, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking admin access:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(!!userRoles);
        }
      } catch (error) {
        console.error('Error checking admin access:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [user, navigate]);

  // Show loading while checking admin status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            {isArabic ? 'جاري التحقق من الصلاحيات...' : 'Checking permissions...'}
          </p>
        </div>
      </div>
    );
  }

  // Redirect non-admin users
  if (isAdmin === false) {
    return (
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
        <DashboardHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {isArabic ? 'غير مصرح بالوصول' : 'Access Denied'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {isArabic ? 'هذه الصفحة متاحة للمديرين فقط' : 'This page is only available to administrators'}
                  </p>
                  <Button onClick={() => navigate('/')} className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    {isArabic ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Admin content
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className={`flex items-center gap-2 mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-blue-600 font-medium">
                {isArabic ? 'لوحة الإدارة' : 'Admin Panel'}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isArabic ? 'إعدادات Zapier' : 'Zapier Settings'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isArabic ? 'اربط منصتك مع تطبيقاتك المفضلة عبر Zapier' : 'Connect your platform with your favorite apps via Zapier'}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Zap className="h-5 w-5" />
                {isArabic ? 'تكامل Zapier' : 'Zapier Integration'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {isArabic ? 'قريباً' : 'Coming Soon'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {isArabic ? 'سيتم تفعيل تكامل Zapier قريباً' : 'Zapier integration will be available soon'}
                </p>
                <Button disabled className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Settings className="h-4 w-4" />
                  {isArabic ? 'إعداد التكامل' : 'Setup Integration'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ZapierSettings;
