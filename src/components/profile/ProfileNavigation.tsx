
import React from 'react';
import { User, Settings, Shield, Languages, Palette, HelpCircle, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProfileNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const ProfileNavigation: React.FC<ProfileNavigationProps> = ({
  activeSection,
  onSectionChange
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const menuItems = [
    {
      id: 'profile',
      label: isArabic ? 'الملف الشخصي' : 'Profile',
      icon: User
    },
    {
      id: 'account-settings',
      label: isArabic ? 'إعدادات الحساب' : 'Account Settings',
      icon: Settings
    },
    {
      id: 'security-privacy',
      label: isArabic ? 'الأمان والخصوصية' : 'Security & Privacy',
      icon: Shield
    },
    {
      id: 'language',
      label: isArabic ? 'تغيير اللغة' : 'Language Settings',
      icon: Languages
    },
    {
      id: 'interface',
      label: isArabic ? 'تخصيص الواجهة' : 'Interface Customization',
      icon: Palette
    },
    {
      id: 'help-support',
      label: isArabic ? 'المساعدة والدعم' : 'Help & Support',
      icon: HelpCircle
    },
    {
      id: 'terms',
      label: isArabic ? 'الشروط والأحكام' : 'Terms & Conditions',
      icon: FileText
    }
  ];

  return (
    <nav className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeSection === item.id 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            } ${isArabic ? 'flex-row-reverse text-right' : ''}`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
};

export default ProfileNavigation;
