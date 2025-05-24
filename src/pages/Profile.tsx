
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Building, Globe, Mail, Calendar, Crown } from 'lucide-react';
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
  const [profile, setProfile] = useState({
    full_name: '',
    username: '',
    company_name: '',
    industry: '',
    website: '',
    avatar_url: ''
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
      if (data) setProfile(data);
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

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <Card className="lg:col-span-1">
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
                  <p className="text-sm text-muted-foreground">
                    {subscription.subscription_plans.price_sar} {isArabic ? 'ريال/شهر' : 'SAR/month'}
                  </p>
                </div>
              )}
            </CardHeader>
          </Card>

          {/* Profile Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {isArabic ? 'معلومات الملف الشخصي' : 'Profile Information'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={updateProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">
                      {isArabic ? 'الاسم الكامل' : 'Full Name'}
                    </Label>
                    <Input
                      id="full_name"
                      value={profile.full_name}
                      onChange={(e) => setProfile({...profile, full_name: e.target.value})}
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
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    {isArabic ? 'البريد الإلكتروني' : 'Email'}
                  </Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-gray-100 dark:bg-gray-800"
                  />
                </div>

                <Separator />

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
            </CardContent>
          </Card>
        </div>

        {/* Account Details */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {isArabic ? 'تفاصيل الحساب' : 'Account Details'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {isArabic ? 'تاريخ التسجيل:' : 'Member since:'}
                </span>
                <span>{new Date(user?.created_at || '').toLocaleDateString()}</span>
              </div>
              
              {profile.company_name && (
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {isArabic ? 'الشركة:' : 'Company:'}
                  </span>
                  <span>{profile.company_name}</span>
                </div>
              )}
              
              {profile.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {isArabic ? 'الموقع:' : 'Website:'}
                  </span>
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {profile.website}
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
