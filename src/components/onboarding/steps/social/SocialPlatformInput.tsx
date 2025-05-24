
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface SocialPlatformInputProps {
  platform: {
    id: string;
    label: string;
    icon: LucideIcon;
    placeholder: string;
  };
  value: string;
  onChange: (platform: string, value: string) => void;
  isArabic: boolean;
}

const SocialPlatformInput: React.FC<SocialPlatformInputProps> = ({
  platform,
  value,
  onChange,
  isArabic
}) => {
  const Icon = platform.icon;
  const hasAccount = value;

  return (
    <div className="space-y-3">
      <Label 
        htmlFor={platform.id}
        className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
      >
        <Icon className="w-4 h-4" />
        {platform.label}
        {hasAccount && (
          <Badge variant="secondary" className="ml-auto">
            Connected
          </Badge>
        )}
      </Label>
      
      <Input
        id={platform.id}
        type="url"
        value={value || ''}
        onChange={(e) => onChange(platform.id, e.target.value)}
        placeholder={platform.placeholder}
        className={isArabic ? 'text-right' : ''}
      />
    </div>
  );
};

export default SocialPlatformInput;
