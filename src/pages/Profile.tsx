
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { ProfileProvider, useProfile } from '@/contexts/ProfileContext';
import ProfileHeader from '@/components/profile/ProfileHeader';
import EnhancedProfileSidebar from '@/components/profile/EnhancedProfileSidebar';
import ProfileSectionRenderer from '@/components/profile/ProfileSectionRenderer';
import DashboardLayoutWrapper from '@/components/dashboard/DashboardLayoutWrapper';
import { useEffect } from 'react';

const ProfileContent: React.FC = () => {
  const { profile, stats, loading, saving, activeSection, handleProfileSave } = useProfile();
  const { user, signOut } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isArabic = language === 'ar';

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getSectionTitle = (sectionId: string) => {
    const titles = {
      'profile': isArabic ? 'الملف الشخصي' : 'Profile',
      'account-settings': isArabic ? 'إعدادات الحساب' : 'Account Settings',
      'security-privacy': isArabic ? 'الأمان والخصوصية' : 'Security & Privacy',
      'language': isArabic ? 'تغيير اللغة' : 'Language Settings',
      'interface': isArabic ? 'تخصيص الواجهة' : 'Interface Customization',
      'help-support': isArabic ? 'المساعدة والدعم' : 'Help & Support',
      'terms': isArabic ? 'الشروط والأحكام' : 'Terms & Conditions'
    };
    return titles[sectionId as keyof typeof titles] || titles.profile;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'جاري تحميل الملف الشخصي...' : 'Loading profile...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl">
      {/* Profile Header */}
      <div className="mb-6 sm:mb-8">
        <ProfileHeader
          profile={profile}
          stats={stats}
          isArabic={isArabic}
          onSave={handleProfileSave}
          loading={saving}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
        {/* Enhanced Sidebar */}
        <div className="xl:col-span-1">
          <div className="lg:sticky lg:top-8">
            <EnhancedProfileSidebar onSignOut={handleSignOut} />
          </div>
        </div>

        {/* Main Content */}
        <div className="xl:col-span-3">
          <Card className="shadow-sm lg:shadow-lg border-0 bg-white dark:bg-gray-900">
            <CardHeader className="border-b p-4 sm:p-6">
              <CardTitle className={`text-xl sm:text-2xl font-bold ${isArabic ? 'text-right font-arabic' : ''}`}>
                {getSectionTitle(activeSection)}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <ProfileSectionRenderer />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Profile: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <DashboardLayoutWrapper showErrorBoundary={true}>
      <ProfileProvider>
        <ProfileContent />
      </ProfileProvider>
    </DashboardLayoutWrapper>
  );
};

export default Profile;
