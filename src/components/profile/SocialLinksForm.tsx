
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Facebook className="h-5 w-5 text-blue-600" />
          <div className="flex-1">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              value={socialLinks.facebook}
              onChange={(e) => onSocialLinksChange({...socialLinks, facebook: e.target.value})}
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
              onChange={(e) => onSocialLinksChange({...socialLinks, twitter: e.target.value})}
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
              onChange={(e) => onSocialLinksChange({...socialLinks, instagram: e.target.value})}
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
              onChange={(e) => onSocialLinksChange({...socialLinks, linkedin: e.target.value})}
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
};

export default SocialLinksForm;
