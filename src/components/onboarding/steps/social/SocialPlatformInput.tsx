
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface SocialPlatformInputProps {
  platform: {
    id: string;
    label: string;
    icon: React.ElementType;
    placeholder: string;
  };
  value: string;
  onChange: (platform: string, value: string) => void;
  isArabic: boolean;
  isAnalyzing?: boolean;
}

const SocialPlatformInput: React.FC<SocialPlatformInputProps> = ({ 
  platform, 
  value, 
  onChange, 
  isArabic,
  isAnalyzing = false 
}) => {
  const Icon = platform.icon;

  return (
    <div className="space-y-2">
      <Label htmlFor={platform.id} className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <Icon className="h-4 w-4" />
        {platform.label}
        {isAnalyzing && <Loader2 className="h-3 w-3 animate-spin" />}
      </Label>
      <Input
        id={platform.id}
        type="url"
        placeholder={platform.placeholder}
        value={value || ''}
        onChange={(e) => onChange(platform.id, e.target.value)}
        className={isArabic ? 'text-right' : ''}
        disabled={isAnalyzing}
      />
      {value && !value.startsWith('http') && (
        <p className="text-xs text-yellow-600">
          Please include http:// or https:// in the URL
        </p>
      )}
    </div>
  );
};

export default SocialPlatformInput;
