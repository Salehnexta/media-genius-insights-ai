import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Camera, Edit, User, MapPin, Calendar, Clock, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileHeaderProps {
  profile: any;
  stats: any;
  isArabic: boolean;
  onSave: (data: any) => void;
  loading: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  stats,
  isArabic,
  onSave,
  loading
}) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onSave(editedProfile);
    setIsEditing(false);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const avatarUrl = e.target?.result as string;
        setEditedProfile(prev => ({ ...prev, avatar_url: avatarUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500';
      case 'inactive': return 'bg-gray-500';
      case 'busy': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    if (isArabic) {
      switch (status) {
        case 'active': return 'نشط';
        case 'inactive': return 'غير نشط';
        case 'busy': return 'مشغول';
        default: return 'غير معروف';
      }
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getCompletionTip = () => {
    const missing = [];
    if (!profile.full_name) missing.push(isArabic ? 'الاسم الكامل' : 'Full Name');
    if (!profile.bio) missing.push(isArabic ? 'النبذة الشخصية' : 'Bio');
    if (!profile.company_name) missing.push(isArabic ? 'اسم الشركة' : 'Company Name');
    if (!profile.location) missing.push(isArabic ? 'الموقع' : 'Location');
    
    if (missing.length === 0) return isArabic ? 'ملف شخصي مكتمل!' : 'Profile Complete!';
    
    return isArabic 
      ? `مطلوب: ${missing.join('، ')}`
      : `Missing: ${missing.join(', ')}`;
  };

  return (
    <Card className="relative overflow-hidden shadow-lg border-0 bg-white dark:bg-gray-900">
      {/* Cover Photo */}
      <div className="relative h-56 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="h-full w-full">
            <defs>
              <pattern id="geometric" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill="white" opacity="0.3"/>
                <path d="M0,30 L60,30 M30,0 L30,60" stroke="white" strokeWidth="0.5" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geometric)"/>
          </svg>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/20 transition-all duration-200 ${isArabic ? 'left-4' : 'right-4'}`}
          onClick={() => {/* Handle cover photo upload */}}
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="relative pt-0 pb-8">
        {/* Profile Avatar Section */}
        <div className={`flex items-end gap-6 -mt-20 pb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className="relative group">
            <Avatar 
              className="w-36 h-36 border-4 border-white shadow-2xl cursor-pointer transition-transform duration-200 group-hover:scale-105" 
              onClick={handleAvatarClick}
            >
              <AvatarImage src={editedProfile.avatar_url || profile.avatar_url} />
              <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold">
                {profile.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              className="absolute bottom-3 right-3 rounded-full w-10 h-10 p-0 bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-200"
              onClick={handleAvatarClick}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Profile Information */}
          <div className={`flex-1 ${isArabic ? 'text-right' : ''}`}>
            <div className={`flex items-center gap-4 mb-3 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {profile.full_name || (isArabic ? 'المستخدم' : 'User Name')}
              </h1>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(profile.status)} shadow-lg`}></div>
                <Badge 
                  variant="secondary" 
                  className={`px-3 py-1 text-sm font-medium shadow-sm ${isArabic ? 'font-arabic' : ''}`}
                >
                  {getStatusLabel(profile.status)}
                </Badge>
              </div>
            </div>

            <div className={`flex items-center gap-6 text-gray-600 dark:text-gray-300 mb-4 text-lg ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <User className="h-5 w-5" />
                <span className={isArabic ? 'font-arabic' : ''}>{profile.job_title || (isArabic ? 'المستخدم' : 'User')}</span>
              </div>
              {profile.location && (
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="h-5 w-5" />
                  <span className={isArabic ? 'font-arabic' : ''}>{profile.location}</span>
                </div>
              )}
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Calendar className="h-5 w-5" />
                <span className={isArabic ? 'font-arabic' : ''}>
                  {isArabic ? 'انضم في' : 'Joined'} {new Date(user?.created_at || '').toLocaleDateString()}
                </span>
              </div>
            </div>

            {profile.bio && (
              <p className={`text-gray-700 dark:text-gray-300 mb-6 max-w-2xl text-lg leading-relaxed ${isArabic ? 'text-right font-arabic' : ''}`}>
                {profile.bio}
              </p>
            )}

            {/* Profile Completion */}
            <div className="mb-6">
              <div className={`flex items-center justify-between mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Star className="h-5 w-5 text-amber-500" />
                  <span className={`text-lg font-semibold text-gray-800 dark:text-gray-200 ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'اكتمال الملف الشخصي' : 'Profile Completion'}
                  </span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={`text-lg font-bold text-blue-600 cursor-help transition-colors hover:text-blue-700 ${isArabic ? 'font-arabic' : ''}`}>
                        {stats.profileCompletion}%
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className={isArabic ? 'text-right font-arabic' : ''}>
                      <p>{getCompletionTip()}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="relative">
                <Progress 
                  value={stats.profileCompletion} 
                  className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner"
                />
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${stats.profileCompletion}%` }}
                ></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={`flex gap-4 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
              {isEditing ? (
                <>
                  <Button 
                    onClick={handleSave} 
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    {loading ? (isArabic ? 'جاري الحفظ...' : 'Saving...') : (isArabic ? 'حفظ' : 'Save')}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 rounded-lg border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <span className={isArabic ? 'font-arabic' : ''}>{isArabic ? 'إلغاء' : 'Cancel'}</span>
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setIsEditing(true)} 
                  className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-3 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}
                >
                  <Edit className="h-5 w-5" />
                  {isArabic ? 'تعديل الملف الشخصي' : 'Edit Profile'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
