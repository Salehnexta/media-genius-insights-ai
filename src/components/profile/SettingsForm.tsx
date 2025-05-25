
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Bell, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SettingsFormProps {
  settings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
    twoFactorAuth: boolean;
    profileVisibility: string;
  };
  onSettingsChange: (settings: any) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  settings,
  onSettingsChange
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5" />
          {isArabic ? 'إعدادات الإشعارات' : 'Notification Settings'}
        </h3>
        
        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={isArabic ? 'text-right' : ''}>
            <Label>{isArabic ? 'إشعارات البريد الإلكتروني' : 'Email Notifications'}</Label>
            <p className="text-sm text-gray-500">{isArabic ? 'تلقي التحديثات عبر البريد الإلكتروني' : 'Receive updates via email'}</p>
          </div>
          <Switch 
            checked={settings.emailNotifications}
            onCheckedChange={(checked) => onSettingsChange({...settings, emailNotifications: checked})}
          />
        </div>

        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={isArabic ? 'text-right' : ''}>
            <Label>{isArabic ? 'إشعارات المتصفح' : 'Push Notifications'}</Label>
            <p className="text-sm text-gray-500">{isArabic ? 'إشعارات فورية في المتصفح' : 'Instant browser notifications'}</p>
          </div>
          <Switch 
            checked={settings.pushNotifications}
            onCheckedChange={(checked) => onSettingsChange({...settings, pushNotifications: checked})}
          />
        </div>

        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={isArabic ? 'text-right' : ''}>
            <Label>{isArabic ? 'رسائل تسويقية' : 'Marketing Emails'}</Label>
            <p className="text-sm text-gray-500">{isArabic ? 'تلقي العروض والأخبار' : 'Receive offers and news'}</p>
          </div>
          <Switch 
            checked={settings.marketingEmails}
            onCheckedChange={(checked) => onSettingsChange({...settings, marketingEmails: checked})}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {isArabic ? 'الأمان والخصوصية' : 'Security & Privacy'}
        </h3>
        
        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={isArabic ? 'text-right' : ''}>
            <Label>{isArabic ? 'المصادقة الثنائية' : 'Two-Factor Authentication'}</Label>
            <p className="text-sm text-gray-500">{isArabic ? 'حماية إضافية لحسابك' : 'Extra security for your account'}</p>
          </div>
          <Switch 
            checked={settings.twoFactorAuth}
            onCheckedChange={(checked) => onSettingsChange({...settings, twoFactorAuth: checked})}
          />
        </div>

        <div className="space-y-2">
          <Label>{isArabic ? 'رؤية الملف الشخصي' : 'Profile Visibility'}</Label>
          <select 
            value={settings.profileVisibility}
            onChange={(e) => onSettingsChange({...settings, profileVisibility: e.target.value})}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 ${isArabic ? 'text-right' : ''}`}
          >
            <option value="public">{isArabic ? 'عام' : 'Public'}</option>
            <option value="private">{isArabic ? 'خاص' : 'Private'}</option>
            <option value="friends">{isArabic ? 'الأصدقاء فقط' : 'Friends Only'}</option>
          </select>
        </div>
      </div>

      <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
        {isArabic ? 'حفظ الإعدادات' : 'Save Settings'}
      </Button>
    </div>
  );
};

export default SettingsForm;
