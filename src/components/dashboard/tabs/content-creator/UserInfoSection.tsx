
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from '@/contexts/LanguageContext';

interface UserInfoSectionProps {
  userInfo: string;
  setUserInfo: (value: string) => void;
  isMobile?: boolean;
}

const UserInfoSection: React.FC<UserInfoSectionProps> = ({ userInfo, setUserInfo, isMobile = false }) => {
  const { t } = useLanguage();

  return (
    <Card className={isMobile ? 'shadow-sm' : ''}>
      <CardHeader className="pb-1 sm:pb-2">
        <CardTitle className={`${isMobile ? 'text-sm' : 'text-sm sm:text-md'} font-medium`}>
          {t('content.user.info')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="user-info" className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
            {t('content.user.label')}
          </Label>
          <Textarea
            id="user-info"
            value={userInfo}
            onChange={(e) => setUserInfo(e.target.value)}
            placeholder={t('content.user.placeholder')}
            className={`min-h-[60px] ${isMobile ? 'text-xs' : 'text-sm'} sm:min-h-[80px]`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoSection;
