
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProfileFormProps {
  profile: {
    full_name: string;
    username: string;
    company_name: string;
    industry: string;
    website: string;
    bio: string;
    phone: string;
    location: string;
  };
  onProfileChange: (profile: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  onSignOut: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onProfileChange,
  onSubmit,
  loading,
  onSignOut
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">
            {isArabic ? 'الاسم الكامل' : 'Full Name'}
          </Label>
          <Input
            id="full_name"
            value={profile.full_name}
            onChange={(e) => onProfileChange({...profile, full_name: e.target.value})}
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
            onChange={(e) => onProfileChange({...profile, username: e.target.value})}
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
          onChange={(e) => onProfileChange({...profile, bio: e.target.value})}
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
            onChange={(e) => onProfileChange({...profile, phone: e.target.value})}
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
            onChange={(e) => onProfileChange({...profile, location: e.target.value})}
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
            onChange={(e) => onProfileChange({...profile, company_name: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="industry">
            {isArabic ? 'المجال' : 'Industry'}
          </Label>
          <Input
            id="industry"
            value={profile.industry}
            onChange={(e) => onProfileChange({...profile, industry: e.target.value})}
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
          onChange={(e) => onProfileChange({...profile, website: e.target.value})}
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
          onClick={onSignOut}
        >
          {isArabic ? 'تسجيل الخروج' : 'Sign Out'}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
