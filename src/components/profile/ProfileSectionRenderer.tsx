
import React from 'react';
import { useProfile } from '@/contexts/ProfileContext';
import { useLanguage } from '@/contexts/LanguageContext';
import PersonalInfoSection from './PersonalInfoSection';
import AccountSettingsSection from './AccountSettingsSection';
import SecurityPrivacySection from './SecurityPrivacySection';
import LanguageSection from './LanguageSection';
import InterfaceCustomizationSection from './InterfaceCustomizationSection';
import HelpSupportSection from './HelpSupportSection';
import TermsConditionsSection from './TermsConditionsSection';
import ProfileDashboardSection from './ProfileDashboardSection';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileSectionRenderer: React.FC = () => {
  const {
    profile,
    settings,
    socialLinks,
    activeSection,
    setSettings,
    setSocialLinks,
    handleProfileSave,
    saving
  } = useProfile();
  
  const { language, toggleLanguage } = useLanguage();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const isArabic = language === 'ar';

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  switch (activeSection) {
    case 'profile':
      return (
        <PersonalInfoSection
          profile={profile}
          socialLinks={socialLinks}
          isArabic={isArabic}
          onSave={handleProfileSave}
          onSocialLinksChange={setSocialLinks}
          loading={saving}
        />
      );
    case 'dashboard':
      return (
        <ProfileDashboardSection
          isArabic={isArabic}
        />
      );
    case 'account-settings':
      return (
        <AccountSettingsSection
          settings={settings}
          isArabic={isArabic}
          onSettingsChange={setSettings}
          onSignOut={handleSignOut}
          loading={saving}
        />
      );
    case 'security-privacy':
      return (
        <SecurityPrivacySection
          settings={settings}
          isArabic={isArabic}
          onSettingsChange={setSettings}
          loading={saving}
        />
      );
    case 'language':
      return (
        <LanguageSection
          currentLanguage={language}
          isArabic={isArabic}
          onLanguageChange={toggleLanguage}
        />
      );
    case 'interface':
      return (
        <InterfaceCustomizationSection
          settings={settings}
          isArabic={isArabic}
          onSettingsChange={setSettings}
          loading={saving}
        />
      );
    case 'help-support':
      return (
        <HelpSupportSection
          isArabic={isArabic}
        />
      );
    case 'terms':
      return (
        <TermsConditionsSection
          isArabic={isArabic}
        />
      );
    default:
      return null;
  }
};

export default ProfileSectionRenderer;
