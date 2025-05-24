import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { 
  User, Building, Globe, Mail, Calendar, Crown, 
  Facebook, Twitter, Instagram, Linkedin, 
  Settings, Bell, Shield, CreditCard, ArrowUpCircle,
  Eye, EyeOff, Smartphone, Monitor
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';

  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState({
    full_name: '',
    username: '',
    company_name: '',
    industry: '',
    website: '',
    avatar_url: '',
    bio: '',
    phone: '',
    location: ''
  });
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  });
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    twoFactorAuth: false,
    profileVisibility: 'public'
  });
  const [subscription, setSubscription] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchSubscription();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        setProfile({
          full_name: data.full_name || '',
          username: data.username || '',
          company_name: data.company_name || '',
          industry: data.industry || '',
          website: data.website || '',
          avatar_url: data.avatar_url || '',
          bio: (data as any).bio || '',
          phone: (data as any).phone || '',
          location: (data as any).location || ''
        });
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          subscription_plans (*)
        `)
        .eq('user_id', user?.id)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.log('No active subscription found');
        return;
      }
      if (data) setSubscription(data);
    } catch (error: any) {
      console.error('Error fetching subscription:', error);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...profile,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: isArabic ? 'تم التحديث' : 'Profile Updated',
        description: isArabic ? 'تم تحديث ملفك الشخصي بنجاح' : 'Your profile has been updated successfully'
      });
    } catch (error: any) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: isArabic ? 'تم تسجيل الخروج' : 'Signed Out',
        description: isArabic ? 'تم تسجيل خروجك بنجاح' : 'You have been signed out successfully'
      });
    } catch (error: any) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const getSubscriptionBadge = (planName: string) => {
    const badges = {
      'Basic': { label: isArabic ? 'أساسي' : 'Basic', variant: 'secondary' as const },
      'Professional': { label: isArabic ? 'احترافي' : 'Professional', variant: 'default' as const },
      'Enterprise': { label: isArabic ? 'مؤسسي' : 'Enterprise', variant: 'destructive' as const }
    };
    
    const badge = badges[planName as keyof typeof badges] || badges.Basic;
    return <Badge variant={badge.variant}>{badge.label}</Badge>;
  };

  const menuItems = [
    { id: 'profile', label: isArabic ? 'الملف الشخصي' : 'Profile', icon: User },
    { id: 'social', label: isArabic ? 'الشبكات الاجتماعية' : 'Social Media', icon: Globe },
    { id: 'settings', label: isArabic ? 'الإعدادات' : 'Settings', icon: Settings },
    { id: 'billing', label: isArabic ? 'الفوترة والاشتراك' : 'Billing & Subscription', icon: CreditCard }
  ];

  const renderProfileSection = () => (
    <form onSubmit={updateProfile} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">
            {isArabic ? 'الاسم الكامل' : 'Full Name'}
          </Label>
          <Input
            id="full_name"
            value={profile.full_name}
            onChange={(e) => setProfile({...profile, full_name: e.target.value})}
            className={isArabic ? 'text-right' : ''}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="username">
            {isArabic ? 'اسم المستخدم' : 'Username'}
          </Label>
          <Input
            id="username"
            value={profile.username}
            onChange={(e) => setProfile({...profile, username: e.target.value})}
            className={isArabic ? 'text-right' : ''}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">
          {isArabic ? 'النبذة الشخصية' : 'Bio'}
        </Label>
        <textarea
          id="bio"
          rows={3}
          value={profile.bio}
          onChange={(e) => setProfile({...profile, bio: e.target.value})}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 ${isArabic ? 'text-right' : ''}`}
          placeholder={isArabic ? 'اكتب نبذة عن نفسك...' : 'Tell us about yourself...'}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">
            {isArabic ? 'رقم الهاتف' : 'Phone Number'}
          </Label>
          <Input
            id="phone"
            value={profile.phone}
            onChange={(e) => setProfile({...profile, phone: e.target.value})}
            className={isArabic ? 'text-right' : ''}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">
            {isArabic ? 'الموقع' : 'Location'}
          </Label>
          <Input
            id="location"
            value={profile.location}
            onChange={(e) => setProfile({...profile, location: e.target.value})}
            className={isArabic ? 'text-right' : ''}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company_name">
            {isArabic ? 'اسم الشركة' : 'Company Name'}
          </Label>
          <Input
            id="company_name"
            value={profile.company_name}
            onChange={(e) => setProfile({...profile, company_name: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="industry">
            {isArabic ? 'المجال' : 'Industry'}
          </Label>
          <Input
            id="industry"
            value={profile.industry}
            onChange={(e) => setProfile({...profile, industry: e.target.value})}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">
          {isArabic ? 'الموقع الإلكتروني' : 'Website'}
        </Label>
        <Input
          id="website"
          value={profile.website}
          onChange={(e) => setProfile({...profile, website: e.target.value})}
          placeholder="https://example.com"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button 
          type="submit" 
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          {loading 
            ? (isArabic ? 'جاري الحفظ...' : 'Saving...')
            : (isArabic ? 'حفظ التغييرات' : 'Save Changes')
          }
        </Button>
        
        <Button 
          type="button" 
          variant="destructive" 
          onClick={handleSignOut}
        >
          {isArabic ? 'تسجيل الخروج' : 'Sign Out'}
        </Button>
      </div>
    </form>
  );

  const renderSocialSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Facebook className="h-5 w-5 text-blue-600" />
          <div className="flex-1">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              value={socialLinks.facebook}
              onChange={(e) => setSocialLinks({...socialLinks, facebook: e.target.value})}
              placeholder="https://facebook.com/username"
              className={isArabic ? 'text-right' : ''}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Twitter className="h-5 w-5 text-blue-400" />
          <div className="flex-1">
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              value={socialLinks.twitter}
              onChange={(e) => setSocialLinks({...socialLinks, twitter: e.target.value})}
              placeholder="https://twitter.com/username"
              className={isArabic ? 'text-right' : ''}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Instagram className="h-5 w-5 text-pink-500" />
          <div className="flex-1">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              value={socialLinks.instagram}
              onChange={(e) => setSocialLinks({...socialLinks, instagram: e.target.value})}
              placeholder="https://instagram.com/username"
              className={isArabic ? 'text-right' : ''}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Linkedin className="h-5 w-5 text-blue-700" />
          <div className="flex-1">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={socialLinks.linkedin}
              onChange={(e) => setSocialLinks({...socialLinks, linkedin: e.target.value})}
              placeholder="https://linkedin.com/in/username"
              className={isArabic ? 'text-right' : ''}
            />
          </div>
        </div>
      </div>

      <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
        {isArabic ? 'حفظ الروابط' : 'Save Social Links'}
      </Button>
    </div>
  );

  const renderSettingsSection = () => (
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
            onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
          />
        </div>

        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={isArabic ? 'text-right' : ''}>
            <Label>{isArabic ? 'إشعارات المتصفح' : 'Push Notifications'}</Label>
            <p className="text-sm text-gray-500">{isArabic ? 'إشعارات فورية في المتصفح' : 'Instant browser notifications'}</p>
          </div>
          <Switch 
            checked={settings.pushNotifications}
            onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
          />
        </div>

        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={isArabic ? 'text-right' : ''}>
            <Label>{isArabic ? 'رسائل تسويقية' : 'Marketing Emails'}</Label>
            <p className="text-sm text-gray-500">{isArabic ? 'تلقي العروض والأخبار' : 'Receive offers and news'}</p>
          </div>
          <Switch 
            checked={settings.marketingEmails}
            onCheckedChange={(checked) => setSettings({...settings, marketingEmails: checked})}
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
            onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
          />
        </div>

        <div className="space-y-2">
          <Label>{isArabic ? 'رؤية الملف الشخصي' : 'Profile Visibility'}</Label>
          <select 
            value={settings.profileVisibility}
            onChange={(e) => setSettings({...settings, profileVisibility: e.target.value})}
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

  const renderBillingSection = () => (
    <div className="space-y-6">
      {subscription && (
        <Card className="border-2 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              {isArabic ? 'اشتراكك الحالي' : 'Current Subscription'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {getSubscriptionBadge(subscription.subscription_plans.name)}
                  <span className="text-2xl font-bold">
                    {subscription.subscription_plans.price_sar} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                  <span className="text-gray-500">/{isArabic ? 'شهر' : 'month'}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isArabic ? 'ينتهي في:' : 'Expires on:'} {new Date(subscription.current_period_end).toLocaleDateString()}
                </p>
              </div>
              <Button variant="outline">
                {isArabic ? 'إدارة الاشتراك' : 'Manage Subscription'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-center">{isArabic ? 'أساسي' : 'Basic'}</CardTitle>
            <div className="text-center">
              <span className="text-3xl font-bold">99</span>
              <span className="text-gray-500"> {isArabic ? 'ريال/شهر' : 'SAR/month'}</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className={`space-y-2 text-sm ${isArabic ? 'text-right' : ''}`}>
              <li>✓ {isArabic ? '1000 رسالة شهريًا' : '1,000 messages/month'}</li>
              <li>✓ {isArabic ? 'تحليلات أساسية' : 'Basic analytics'}</li>
              <li>✓ {isArabic ? 'دعم بريد إلكتروني' : 'Email support'}</li>
            </ul>
            <Button className="w-full mt-4" variant="outline">
              {isArabic ? 'خطة حالية' : 'Current Plan'}
            </Button>
          </CardContent>
        </Card>

        <Card className="relative border-2 border-blue-500">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-blue-500">{isArabic ? 'الأكثر شعبية' : 'Most Popular'}</Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-center">{isArabic ? 'احترافي' : 'Professional'}</CardTitle>
            <div className="text-center">
              <span className="text-3xl font-bold">299</span>
              <span className="text-gray-500"> {isArabic ? 'ريال/شهر' : 'SAR/month'}</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className={`space-y-2 text-sm ${isArabic ? 'text-right' : ''}`}>
              <li>✓ {isArabic ? '10,000 رسالة شهريًا' : '10,000 messages/month'}</li>
              <li>✓ {isArabic ? 'تحليلات متقدمة' : 'Advanced analytics'}</li>
              <li>✓ {isArabic ? 'دعم أولوية' : 'Priority support'}</li>
              <li>✓ {isArabic ? 'تكامل API' : 'API integration'}</li>
            </ul>
            <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
              <ArrowUpCircle className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
              {isArabic ? 'ترقية الآن' : 'Upgrade Now'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">{isArabic ? 'مؤسسي' : 'Enterprise'}</CardTitle>
            <div className="text-center">
              <span className="text-3xl font-bold">999</span>
              <span className="text-gray-500"> {isArabic ? 'ريال/شهر' : 'SAR/month'}</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className={`space-y-2 text-sm ${isArabic ? 'text-right' : ''}`}>
              <li>✓ {isArabic ? 'رسائل غير محدودة' : 'Unlimited messages'}</li>
              <li>✓ {isArabic ? 'تحليلات مخصصة' : 'Custom analytics'}</li>
              <li>✓ {isArabic ? 'دعم مخصص 24/7' : 'Dedicated 24/7 support'}</li>
              <li>✓ {isArabic ? 'ميزات مؤسسية' : 'Enterprise features'}</li>
            </ul>
            <Button className="w-full mt-4" variant="outline">
              {isArabic ? 'تواصل معنا' : 'Contact Sales'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSection();
      case 'social': return renderSocialSection();
      case 'settings': return renderSettingsSection();
      case 'billing': return renderBillingSection();
      default: return renderProfileSection();
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  {profile.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{profile.full_name || 'User'}</CardTitle>
              <p className="text-muted-foreground">@{profile.username || 'username'}</p>
              
              {subscription && (
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Crown className="h-4 w-4 text-yellow-500" />
                    {getSubscriptionBadge(subscription.subscription_plans.name)}
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
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
              
              <Separator className="my-4" />
              
              <Button 
                variant="destructive" 
                onClick={handleSignOut}
                className={`w-full ${isArabic ? 'flex-row-reverse' : ''}`}
              >
                {isArabic ? 'تسجيل الخروج' : 'Sign Out'}
              </Button>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>
                {menuItems.find(item => item.id === activeSection)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderContent()}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
