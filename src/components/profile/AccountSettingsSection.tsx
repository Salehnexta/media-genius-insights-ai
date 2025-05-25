
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Bell, Trash2, Key, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AccountSettingsSectionProps {
  settings: any;
  isArabic: boolean;
  onSettingsChange: (settings: any) => void;
  onSignOut: () => void;
  loading: boolean;
}

const AccountSettingsSection: React.FC<AccountSettingsSectionProps> = ({
  settings,
  isArabic,
  onSettingsChange,
  onSignOut,
  loading
}) => {
  const { toast } = useToast();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "كلمات المرور الجديدة غير متطابقة" : "New passwords don't match",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل" : "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }

    // Here you would implement password change logic
    toast({
      title: isArabic ? "تم تغيير كلمة المرور" : "Password Changed",
      description: isArabic ? "تم تغيير كلمة المرور بنجاح" : "Your password has been updated successfully",
    });

    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleDeleteAccount = async () => {
    // Here you would implement account deletion logic
    toast({
      title: isArabic ? "تم حذف الحساب" : "Account Deleted",
      description: isArabic ? "تم حذف حسابك بنجاح" : "Your account has been deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
            <Key className="h-5 w-5" />
            {isArabic ? 'تغيير كلمة المرور' : 'Change Password'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className={isArabic ? 'text-right' : ''}>
              {isArabic ? 'كلمة المرور الحالية' : 'Current Password'}
            </Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPasswords.current ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                className={isArabic ? 'text-right pr-10' : 'pr-10'}
                placeholder={isArabic ? 'كلمة المرور الحالية' : 'Current password'}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`absolute top-0 h-full px-3 py-2 hover:bg-transparent ${isArabic ? 'left-0' : 'right-0'}`}
                onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
              >
                {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className={isArabic ? 'text-right' : ''}>
                {isArabic ? 'كلمة المرور الجديدة' : 'New Password'}
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className={isArabic ? 'text-right pr-10' : 'pr-10'}
                  placeholder={isArabic ? 'كلمة المرور الجديدة' : 'New password'}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={`absolute top-0 h-full px-3 py-2 hover:bg-transparent ${isArabic ? 'left-0' : 'right-0'}`}
                  onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                >
                  {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className={isArabic ? 'text-right' : ''}>
                {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className={isArabic ? 'text-right pr-10' : 'pr-10'}
                  placeholder={isArabic ? 'تأكيد كلمة المرور' : 'Confirm password'}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={`absolute top-0 h-full px-3 py-2 hover:bg-transparent ${isArabic ? 'left-0' : 'right-0'}`}
                  onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                >
                  {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <Button onClick={handlePasswordChange} disabled={loading}>
            {isArabic ? 'تغيير كلمة المرور' : 'Change Password'}
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
            <Bell className="h-5 w-5" />
            {isArabic ? 'إعدادات الإشعارات' : 'Notification Settings'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
            <Shield className="h-5 w-5" />
            {isArabic ? 'الأمان والخصوصية' : 'Security & Privacy'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <Select 
              value={settings.profileVisibility}
              onValueChange={(value) => onSettingsChange({...settings, profileVisibility: value})}
            >
              <SelectTrigger className={isArabic ? 'text-right' : ''}>
                <SelectValue placeholder={isArabic ? 'اختر رؤية الملف' : 'Select visibility'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">{isArabic ? 'عام' : 'Public'}</SelectItem>
                <SelectItem value="private">{isArabic ? 'خاص' : 'Private'}</SelectItem>
                <SelectItem value="friends">{isArabic ? 'الأصدقاء فقط' : 'Friends Only'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className={isArabic ? 'text-right' : ''}>
              <Label>{isArabic ? 'مشاركة البيانات' : 'Data Sharing'}</Label>
              <p className="text-sm text-gray-500">{isArabic ? 'السماح بمشاركة البيانات للتحسين' : 'Allow data sharing for improvements'}</p>
            </div>
            <Switch 
              checked={settings.dataSharing}
              onCheckedChange={(checked) => onSettingsChange({...settings, dataSharing: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 text-red-600 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
            <Trash2 className="h-5 w-5" />
            {isArabic ? 'منطقة الخطر' : 'Danger Zone'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className={isArabic ? 'text-right' : ''}>
              <Label className="text-red-600">{isArabic ? 'حذف الحساب' : 'Delete Account'}</Label>
              <p className="text-sm text-gray-500">{isArabic ? 'حذف حسابك نهائياً مع جميع البيانات' : 'Permanently delete your account and all data'}</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  {isArabic ? 'حذف الحساب' : 'Delete Account'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className={isArabic ? 'text-right' : ''}>
                <AlertDialogHeader>
                  <AlertDialogTitle className={isArabic ? 'text-right' : ''}>
                    {isArabic ? 'هل أنت متأكد؟' : 'Are you absolutely sure?'}
                  </AlertDialogTitle>
                  <AlertDialogDescription className={isArabic ? 'text-right' : ''}>
                    {isArabic 
                      ? 'هذا الإجراء لا يمكن التراجع عنه. سيتم حذف حسابك نهائياً مع جميع البيانات المرتبطة به.'
                      : 'This action cannot be undone. This will permanently delete your account and remove all associated data.'
                    }
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className={isArabic ? 'flex-row-reverse' : ''}>
                  <AlertDialogCancel>{isArabic ? 'إلغاء' : 'Cancel'}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                    {isArabic ? 'حذف نهائي' : 'Delete Permanently'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Separator />

          <Button variant="outline" onClick={onSignOut} className={`w-full ${isArabic ? 'flex-row-reverse' : ''}`}>
            {isArabic ? 'تسجيل الخروج' : 'Sign Out'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettingsSection;
