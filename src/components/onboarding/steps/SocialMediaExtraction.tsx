import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { OnboardingData } from '@/hooks/onboarding/types';
import { 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  MessageCircle,
  Plus,
  ExternalLink
} from 'lucide-react';

interface SocialMediaExtractionProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const SocialMediaExtraction: React.FC<SocialMediaExtractionProps> = ({ data, updateData, isArabic }) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [showManualAdd, setShowManualAdd] = useState(false);
  const [manualAccounts, setManualAccounts] = useState({
    instagram: '',
    facebook: '',
    twitter: '',
    youtube: '',
    tiktok: '',
    snapchat: '',
    whatsapp_business: ''
  });

  // محاكاة استخراج حسابات السوشال ميديا
  const simulateExtraction = async () => {
    setIsExtracting(true);
    setExtractionProgress(0);

    // محاكاة التقدم
    const intervals = [20, 40, 60, 80, 100];
    for (let i = 0; i < intervals.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setExtractionProgress(intervals[i]);
    }

    // بيانات وهمية مستخرجة
    const mockExtractedAccounts = {
      instagram: {
        handle: '@golden_burger_sa',
        followers: 1250,
        last_post: 'منذ 3 أيام',
        status: 'active' as const,
        url: 'https://instagram.com/golden_burger_sa'
      },
      facebook: {
        name: 'Golden Burger Restaurant',
        likes: 890,
        last_post: 'منذ أسبوع',
        status: 'limited' as const,
        url: 'https://facebook.com/goldenburger'
      },
      whatsapp_business: {
        phone: '+966501234567',
        status: 'verified' as const
      }
    };

    updateData({ 
      extracted_social_accounts: mockExtractedAccounts,
      social_extraction_status: 'completed'
    });
    
    setIsExtracting(false);
  };

  useEffect(() => {
    if (data.website && data.social_extraction_status === 'pending') {
      simulateExtraction();
    }
  }, [data.website]);

  const handleManualAdd = () => {
    const newAccounts = { ...data.extracted_social_accounts };
    
    Object.entries(manualAccounts).forEach(([platform, value]) => {
      if (value.trim()) {
        if (platform === 'whatsapp_business') {
          newAccounts[platform] = {
            phone: value,
            status: 'unverified' as const
          };
        } else {
          newAccounts[platform] = {
            handle: value,
            followers: 0,
            status: 'active' as const,
            url: value.startsWith('http') ? value : `https://${platform}.com/${value.replace('@', '')}`
          };
        }
      }
    });

    updateData({ extracted_social_accounts: newAccounts });
    setManualAccounts({
      instagram: '',
      facebook: '',
      twitter: '',
      youtube: '',
      tiktok: '',
      snapchat: '',
      whatsapp_business: ''
    });
    setShowManualAdd(false);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-5 h-5 text-pink-600" />;
      case 'facebook': return <Facebook className="w-5 h-5 text-blue-600" />;
      case 'twitter': return <Twitter className="w-5 h-5 text-blue-400" />;
      case 'youtube': return <Youtube className="w-5 h-5 text-red-600" />;
      case 'whatsapp_business': return <MessageCircle className="w-5 h-5 text-green-600" />;
      default: return <ExternalLink className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">{isArabic ? 'نشط' : 'Active'}</Badge>;
      case 'limited':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">{isArabic ? 'نشط محدود' : 'Limited'}</Badge>;
      case 'inactive':
        return <Badge variant="destructive">{isArabic ? 'غير نشط' : 'Inactive'}</Badge>;
      case 'verified':
        return <Badge variant="default" className="bg-green-100 text-green-800">{isArabic ? 'موثق' : 'Verified'}</Badge>;
      case 'unverified':
        return <Badge variant="secondary">{isArabic ? 'غير موثق' : 'Unverified'}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAccountDisplayName = (account: any) => {
    if ('handle' in account) return account.handle;
    if ('name' in account) return account.name;
    if ('phone' in account) return account.phone;
    return 'Unknown';
  };

  const getAccountMetrics = (account: any) => {
    if ('followers' in account && account.followers !== undefined) {
      return `${account.followers} ${isArabic ? 'متابع' : 'followers'}`;
    }
    if ('likes' in account && account.likes !== undefined) {
      return `${account.likes} ${isArabic ? 'إعجاب' : 'likes'}`;
    }
    return null;
  };

  const getLastPost = (account: any) => {
    if ('last_post' in account && account.last_post) {
      return `${isArabic ? 'آخر نشر:' : 'Last post:'} ${account.last_post}`;
    }
    return null;
  };

  const getAccountUrl = (account: any) => {
    return 'url' in account ? account.url : undefined;
  };

  if (isExtracting) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              {isArabic ? 'جاري استخراج حسابات التواصل الاجتماعي...' : 'Extracting Social Media Accounts...'}
            </CardTitle>
            <CardDescription>
              {isArabic 
                ? 'يقوم الذكاء الاصطناعي بتحليل موقعك والبحث عن حسابات التواصل الاجتماعي'
                : 'AI is analyzing your website and searching for social media accounts'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${extractionProgress}%` }}
                ></div>
              </div>
              <p className="text-center text-sm text-gray-600">
                {extractionProgress}% {isArabic ? 'مكتمل' : 'Complete'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <CheckCircle className="w-5 h-5 text-green-600" />
            {isArabic ? 'حسابات التواصل الاجتماعي المكتشفة' : 'Discovered Social Media Accounts'}
          </CardTitle>
          <CardDescription>
            {isArabic 
              ? 'تم العثور على الحسابات التالية. يرجى التأكد من صحتها أو إضافة حسابات أخرى.'
              : 'Found the following accounts. Please verify their accuracy or add other accounts.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.extracted_social_accounts && Object.keys(data.extracted_social_accounts).length > 0 ? (
              Object.entries(data.extracted_social_accounts).map(([platform, account]) => (
                <div key={platform} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    {getPlatformIcon(platform)}
                    <div className={isArabic ? 'text-right' : ''}>
                      <p className="font-medium">
                        {getAccountDisplayName(account)}
                      </p>
                      {getAccountMetrics(account) && (
                        <p className="text-sm text-gray-500">
                          {getAccountMetrics(account)}
                        </p>
                      )}
                      {getLastPost(account) && (
                        <p className="text-sm text-gray-500">
                          {getLastPost(account)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(account.status)}
                    {getAccountUrl(account) && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={getAccountUrl(account)} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {isArabic ? 'لم يتم العثور على حسابات' : 'No Accounts Found'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {isArabic 
                    ? 'لم نجد حسابات تواصل اجتماعي في موقعك. يمكنك إضافتها يدوياً.'
                    : 'We didn\'t find social media accounts on your website. You can add them manually.'
                  }
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowManualAdd(true)}
                className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
              >
                <Plus className="w-4 h-4" />
                {isArabic ? 'إضافة حسابات يدوياً' : 'Add Accounts Manually'}
              </Button>
              
              {Object.keys(data.extracted_social_accounts || {}).length === 0 && (
                <Button 
                  variant="outline"
                  onClick={() => updateData({ social_extraction_status: 'completed' })}
                >
                  {isArabic ? 'تخطي هذه الخطوة' : 'Skip This Step'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {showManualAdd && (
        <Card>
          <CardHeader>
            <CardTitle>
              {isArabic ? 'إضافة حسابات يدوياً' : 'Add Accounts Manually'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(manualAccounts).map(([platform, value]) => (
                <div key={platform} className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-medium ${isArabic ? 'flex-row-reverse' : ''}`}>
                    {getPlatformIcon(platform)}
                    {platform.charAt(0).toUpperCase() + platform.slice(1).replace('_', ' ')}
                  </label>
                  <Input
                    value={value}
                    onChange={(e) => setManualAccounts(prev => ({ ...prev, [platform]: e.target.value }))}
                    placeholder={
                      platform === 'whatsapp_business' 
                        ? '+966501234567' 
                        : `@${platform.replace('_business', '')}_account`
                    }
                    className={isArabic ? 'text-right' : ''}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleManualAdd}>
                {isArabic ? 'حفظ الحسابات' : 'Save Accounts'}
              </Button>
              <Button variant="outline" onClick={() => setShowManualAdd(false)}>
                {isArabic ? 'إلغاء' : 'Cancel'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {data.extracted_social_accounts && Object.keys(data.extracted_social_accounts).length === 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            {isArabic ? '💡 نصيحة' : '💡 Tip'}
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            {isArabic 
              ? 'يمكن لمورفو إنشاء وإدارة حسابات تواصل اجتماعي احترافية لك! سنساعدك في إنشاء المحتوى وجدولة النشر تلقائياً.'
              : 'Morpho can create and manage professional social media accounts for you! We\'ll help you create content and schedule posts automatically.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default SocialMediaExtraction;
