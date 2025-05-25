
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SocialLinksFormProps {
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  onSocialLinksChange: (links: any) => void;
}

const SocialLinksForm: React.FC<SocialLinksFormProps> = ({
  socialLinks,
  onSocialLinksChange
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const SocialField = ({ icon: Icon, label, platform, color, placeholder }) => (
    <div className={`flex items-center gap-4 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 ${isArabic ? 'flex-row-reverse' : ''}`}>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color} shadow-lg`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1 space-y-2">
        <Label 
          htmlFor={platform} 
          className={`text-base font-medium text-gray-700 dark:text-gray-300 ${isArabic ? 'text-right font-arabic' : ''}`}
        >
          {label}
        </Label>
        <Input
          id={platform}
          value={socialLinks[platform]}
          onChange={(e) => onSocialLinksChange({...socialLinks, [platform]: e.target.value})}
          placeholder={placeholder}
          className={`h-11 text-base border-2 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${isArabic ? 'text-right font-arabic' : ''}`}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <SocialField
          icon={Facebook}
          label="Facebook"
          platform="facebook"
          color="bg-blue-600"
          placeholder="https://facebook.com/username"
        />

        <SocialField
          icon={Twitter}
          label="Twitter"
          platform="twitter"
          color="bg-blue-400"
          placeholder="https://twitter.com/username"
        />

        <SocialField
          icon={Instagram}
          label="Instagram"
          platform="instagram"
          color="bg-gradient-to-r from-purple-600 to-pink-600"
          placeholder="https://instagram.com/username"
        />

        <SocialField
          icon={Linkedin}
          label="LinkedIn"
          platform="linkedin"
          color="bg-blue-700"
          placeholder="https://linkedin.com/in/username"
        />
      </div>

      <div className={`flex justify-center pt-4 ${isArabic ? 'text-right' : ''}`}>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105">
          <span className={isArabic ? 'font-arabic' : ''}>{isArabic ? 'حفظ الروابط' : 'Save Social Links'}</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialLinksForm;
