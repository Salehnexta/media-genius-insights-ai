
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface UserInfoSectionProps {
  userInfo: string;
  setUserInfo: (value: string) => void;
  isMobile?: boolean;
}

const UserInfoSection: React.FC<UserInfoSectionProps> = ({ userInfo, setUserInfo, isMobile = false }) => {
  return (
    <Card className={isMobile ? 'shadow-sm' : ''}>
      <CardHeader className="pb-1 sm:pb-2">
        <CardTitle className={`${isMobile ? 'text-sm' : 'text-sm sm:text-md'} font-medium`}>
          User Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="user-info" className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
            Tell AI about yourself/brand
          </Label>
          <Textarea
            id="user-info"
            value={userInfo}
            onChange={(e) => setUserInfo(e.target.value)}
            placeholder="Describe your brand, target audience, tone of voice, and any specific requirements for content generation..."
            className={`min-h-[60px] ${isMobile ? 'text-xs' : 'text-sm'} sm:min-h-[80px]`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoSection;
