
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Calendar } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const Profile: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isArabic ? 'الملف الشخصي' : 'Profile'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isArabic ? 'إدارة معلوماتك الشخصية وإعدادات الحساب' : 'Manage your personal information and account settings'}
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <User className="h-5 w-5" />
                  {isArabic ? 'المعلومات الشخصية' : 'Personal Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Mail className="h-4 w-4" />
                    {isArabic ? 'البريد الإلكتروني' : 'Email'}
                  </Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className={isArabic ? 'text-right' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="created" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Calendar className="h-4 w-4" />
                    {isArabic ? 'تاريخ إنشاء الحساب' : 'Account Created'}
                  </Label>
                  <Input
                    id="created"
                    value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : ''}
                    disabled
                    className={isArabic ? 'text-right' : ''}
                  />
                </div>

                <div className={`flex gap-4 ${isArabic ? 'justify-start' : 'justify-end'}`}>
                  <Button variant="outline">
                    {isArabic ? 'إلغاء' : 'Cancel'}
                  </Button>
                  <Button>
                    {isArabic ? 'حفظ التغييرات' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
