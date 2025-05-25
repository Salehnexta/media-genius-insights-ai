
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Key, Eye, EyeOff, AlertTriangle, CheckCircle, Clock, Monitor } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SecurityPrivacySectionProps {
  settings: any;
  isArabic: boolean;
  onSettingsChange: (settings: any) => void;
  loading: boolean;
}

const SecurityPrivacySection: React.FC<SecurityPrivacySectionProps> = ({
  settings,
  isArabic,
  onSettingsChange,
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

  // Mock login history data
  const loginHistory = [
    {
      id: 1,
      date: new Date().toISOString(),
      location: isArabic ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia',
      device: 'Chrome on Windows',
      ip: '192.168.1.1',
      status: 'success'
    },
    {
      id: 2,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      location: isArabic ? 'جدة، السعودية' : 'Jeddah, Saudi Arabia',
      device: 'Safari on iPhone',
      ip: '192.168.1.2',
      status: 'success'
    },
    {
      id: 3,
      date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      location: isArabic ? 'دبي، الإمارات' : 'Dubai, UAE',
      device: 'Chrome on Android',
      ip: '192.168.1.3',
      status: 'failed'
    }
  ];

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "كلمات المرور الجديدة غير متطابقة" : "New passwords don't match",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل" : "Password must be at least 8 characters",
        variant: "destructive"
      });
      return;
    }

    // Password strength validation
    const hasUpperCase = /[A-Z]/.test(passwordData.newPassword);
    const hasLowerCase = /[a-z]/.test(passwordData.newPassword);
    const hasNumbers = /\d/.test(passwordData.newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      toast({
        title: isArabic ? "كلمة مرور ضعيفة" : "Weak Password",
        description: isArabic 
          ? "يجب أن تحتوي كلمة المرور على أحرف كبيرة وصغيرة وأرقام ورموز خاصة"
          : "Password must contain uppercase, lowercase, numbers and special characters",
        variant: "destructive"
      });
      return;
    }

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

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 12.5;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 12.5;
    return Math.min(100, strength);
  };

  const getStrengthLabel = (strength: number) => {
    if (strength < 25) return isArabic ? 'ضعيف جداً' : 'Very Weak';
    if (strength < 50) return isArabic ? 'ضعيف' : 'Weak';
    if (strength < 75) return isArabic ? 'متوسط' : 'Medium';
    if (strength < 90) return isArabic ? 'قوي' : 'Strong';
    return isArabic ? 'قوي جداً' : 'Very Strong';
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 25) return 'bg-red-500';
    if (strength < 50) return 'bg-orange-500';
    if (strength < 75) return 'bg-yellow-500';
    if (strength < 90) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);

  return (
    <div className="space-y-8">
      {/* Security Overview */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 text-blue-700 dark:text-blue-300 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <Shield className="h-6 w-6" />
            {isArabic ? 'نظرة عامة على الأمان' : 'Security Overview'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20 ${isArabic ? 'text-right' : ''}`}>
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className={`font-semibold text-green-800 dark:text-green-300 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'حساب محمي' : 'Account Secured'}
              </h4>
              <p className={`text-sm text-green-600 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'مستوى الأمان: عالي' : 'Security Level: High'}
              </p>
            </div>
            
            <div className={`text-center p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 ${isArabic ? 'text-right' : ''}`}>
              <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <h4 className={`font-semibold text-yellow-800 dark:text-yellow-300 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'المصادقة الثنائية' : '2FA Status'}
              </h4>
              <p className={`text-sm text-yellow-600 ${isArabic ? 'font-arabic' : ''}`}>
                {settings.twoFactorAuth 
                  ? (isArabic ? 'مفعّلة' : 'Enabled')
                  : (isArabic ? 'غير مفعّلة' : 'Not Enabled')
                }
              </p>
            </div>
            
            <div className={`text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 ${isArabic ? 'text-right' : ''}`}>
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className={`font-semibold text-blue-800 dark:text-blue-300 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'آخر تسجيل دخول' : 'Last Login'}
              </h4>
              <p className={`text-sm text-blue-600 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'منذ دقائق' : 'Few minutes ago'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <Key className="h-5 w-5" />
            {isArabic ? 'تغيير كلمة المرور' : 'Change Password'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className={`${isArabic ? 'text-right font-arabic' : ''}`}>
              {isArabic ? 'كلمة المرور الحالية' : 'Current Password'}
            </Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPasswords.current ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                className={`${isArabic ? 'text-right pr-10 font-arabic' : 'pr-10'}`}
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
              <Label htmlFor="newPassword" className={`${isArabic ? 'text-right font-arabic' : ''}`}>
                {isArabic ? 'كلمة المرور الجديدة' : 'New Password'}
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className={`${isArabic ? 'text-right pr-10 font-arabic' : 'pr-10'}`}
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
              
              {/* Password Strength Indicator */}
              {passwordData.newPassword && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                      {isArabic ? 'قوة كلمة المرور:' : 'Password Strength:'}
                    </span>
                    <Badge variant="outline" className={getStrengthColor(passwordStrength).replace('bg-', 'text-')}>
                      {getStrengthLabel(passwordStrength)}
                    </Badge>
                  </div>
                  <Progress value={passwordStrength} className="h-2" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className={`${isArabic ? 'text-right font-arabic' : ''}`}>
                {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className={`${isArabic ? 'text-right pr-10 font-arabic' : 'pr-10'}`}
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

          <Button 
            onClick={handlePasswordChange} 
            disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <span className={isArabic ? 'font-arabic' : ''}>
              {isArabic ? 'تغيير كلمة المرور' : 'Change Password'}
            </span>
          </Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <Shield className="h-5 w-5" />
            {isArabic ? 'المصادقة الثنائية' : 'Two-Factor Authentication'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className={`${isArabic ? 'text-right' : ''}`}>
              <Label className={`${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'تفعيل المصادقة الثنائية' : 'Enable Two-Factor Authentication'}
              </Label>
              <p className={`text-sm text-gray-500 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'حماية إضافية لحسابك باستخدام تطبيق المصادقة' : 'Add extra security using an authenticator app'}
              </p>
            </div>
            <Switch 
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => onSettingsChange({...settings, twoFactorAuth: checked})}
            />
          </div>
          
          {settings.twoFactorAuth && (
            <div className={`p-4 bg-green-50 dark:bg-green-900/20 rounded-lg ${isArabic ? 'text-right' : ''}`}>
              <p className={`text-green-800 dark:text-green-300 text-sm ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic 
                  ? 'المصادقة الثنائية مفعّلة. حسابك محمي بطبقة إضافية من الأمان.'
                  : 'Two-factor authentication is enabled. Your account has an extra layer of security.'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <Eye className="h-5 w-5" />
            {isArabic ? 'إعدادات الخصوصية' : 'Privacy Settings'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className={`${isArabic ? 'text-right' : ''}`}>
              <Label className={`${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'مشاركة البيانات للتحسين' : 'Share Data for Improvements'}
              </Label>
              <p className={`text-sm text-gray-500 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'السماح بمشاركة البيانات المجهولة لتحسين الخدمة' : 'Allow anonymous data sharing to improve our service'}
              </p>
            </div>
            <Switch 
              checked={settings.dataSharing}
              onCheckedChange={(checked) => onSettingsChange({...settings, dataSharing: checked})}
            />
          </div>

          <Separator />

          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className={`${isArabic ? 'text-right' : ''}`}>
              <Label className={`${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'رؤية الملف الشخصي' : 'Profile Visibility'}
              </Label>
              <p className={`text-sm text-gray-500 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'من يمكنه رؤية ملفك الشخصي' : 'Who can see your profile information'}
              </p>
            </div>
            <Badge variant="outline" className={`${isArabic ? 'font-arabic' : ''}`}>
              {settings.profileVisibility === 'public' 
                ? (isArabic ? 'عام' : 'Public')
                : settings.profileVisibility === 'private' 
                  ? (isArabic ? 'خاص' : 'Private')
                  : (isArabic ? 'الأصدقاء فقط' : 'Friends Only')
              }
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Login History */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <Monitor className="h-5 w-5" />
            {isArabic ? 'سجل تسجيلات الدخول' : 'Login History'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loginHistory.map((login) => (
              <div key={login.id} className={`flex items-center justify-between p-4 border rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-3 h-3 rounded-full ${login.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div className={`${isArabic ? 'text-right' : ''}`}>
                    <p className={`font-medium ${isArabic ? 'font-arabic' : ''}`}>{login.device}</p>
                    <p className={`text-sm text-gray-500 ${isArabic ? 'font-arabic' : ''}`}>
                      {login.location} • {login.ip}
                    </p>
                  </div>
                </div>
                <div className={`text-sm text-gray-500 ${isArabic ? 'text-right font-arabic' : ''}`}>
                  {new Date(login.date).toLocaleDateString(isArabic ? 'ar' : 'en')}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityPrivacySection;
