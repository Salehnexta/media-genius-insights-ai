
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Edit, User, MapPin, Calendar, Clock } from 'lucide-react';
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
      // In a real app, you'd upload this to storage
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
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'busy': return 'bg-yellow-500';
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

  return (
    <Card className="relative overflow-hidden">
      {/* Cover Photo */}
      <div 
        className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative"
        style={{
          backgroundImage: profile.cover_photo_url ? `url(${profile.cover_photo_url})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-4 bg-white/20 text-white hover:bg-white/30 ${isArabic ? 'left-4' : 'right-4'}`}
          onClick={() => {/* Handle cover photo upload */}}
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="relative pt-0">
        {/* Profile Avatar */}
        <div className={`flex items-end gap-6 -mt-16 pb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg cursor-pointer" onClick={handleAvatarClick}>
              <AvatarImage src={editedProfile.avatar_url || profile.avatar_url} />
              <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                {profile.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              className="absolute bottom-2 right-2 rounded-full w-8 h-8 p-0"
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

          {/* Profile Info */}
          <div className={`flex-1 ${isArabic ? 'text-right' : ''}`}>
            <div className={`flex items-center gap-3 mb-2 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {profile.full_name || 'User Name'}
              </h1>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(profile.status)}`}></div>
                <Badge variant="secondary">{getStatusLabel(profile.status)}</Badge>
              </div>
            </div>

            <div className={`flex items-center gap-4 text-gray-600 dark:text-gray-300 mb-3 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
              <div className={`flex items-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <User className="h-4 w-4" />
                <span>{profile.job_title || (isArabic ? 'المستخدم' : 'User')}</span>
              </div>
              {profile.location && (
                <div className={`flex items-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              <div className={`flex items-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Calendar className="h-4 w-4" />
                <span>
                  {isArabic ? 'انضم في' : 'Joined'} {new Date(user?.created_at || '').toLocaleDateString()}
                </span>
              </div>
            </div>

            {profile.bio && (
              <p className={`text-gray-600 dark:text-gray-300 mb-4 max-w-2xl ${isArabic ? 'text-right' : ''}`}>
                {profile.bio}
              </p>
            )}

            {/* Profile Completion */}
            <div className="mb-4">
              <div className={`flex items-center justify-between mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {isArabic ? 'اكتمال الملف الشخصي' : 'Profile Completion'}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {stats.profileCompletion}%
                </span>
              </div>
              <Progress value={stats.profileCompletion} className="h-2" />
            </div>

            {/* Action Buttons */}
            <div className={`flex gap-3 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
              {isEditing ? (
                <>
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? (isArabic ? 'جاري الحفظ...' : 'Saving...') : (isArabic ? 'حفظ' : 'Save')}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    {isArabic ? 'إلغاء' : 'Cancel'}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Edit className="h-4 w-4" />
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
