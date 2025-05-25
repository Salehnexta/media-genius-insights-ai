
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const Dashboard: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isArabic = language === 'ar';

  useEffect(() => {
    console.log('Auth loading:', authLoading);
    console.log('User exists:', !!user);
    
    if (!authLoading && !user) {
      console.log('No user found, redirecting to auth');
      navigate('/auth');
      return;
    }

    if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading, navigate]);

  // Show loading while checking authentication
  if (authLoading || loading) {
    console.log('Showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-300">
            {isArabic ? 'جاري تحميل لوحة التحكم...' : 'Loading dashboard...'}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No user, returning null (should redirect)');
    return null;
  }

  return <DashboardLayout />;
};

export default Dashboard;
