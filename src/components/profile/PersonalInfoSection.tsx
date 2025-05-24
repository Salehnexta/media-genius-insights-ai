
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, Building, MapPin, Globe, Clock } from 'lucide-react';
import SocialLinksForm from './SocialLinksForm';

interface PersonalInfoSectionProps {
  profile: any;
  socialLinks: any;
  isArabic: boolean;
  onSave: (data: any) => void;
  onSocialLinksChange: (links: any) => void;
  loading: boolean;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  profile,
  socialLinks,
  isArabic,
  onSave,
  onSocialLinksChange,
  loading
}) => {
  const [editedProfile, setEditedProfile] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Dubai',
    'Asia/Riyadh'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
            <User className="h-5 w-5" />
            {isArabic ? 'المعلومات الأساسية' : 'Basic Information'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                <User className="h-4 w-4" />
                {isArabic ? 'الاسم الكامل' : 'Full Name'}
              </Label>
              <Input
                id="full_name"
                value={isEditing ? editedProfile.full_name : profile.full_name}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, full_name: e.target.value }))}
                disabled={!isEditing}
                className={isArabic ? 'text-right' : ''}
                placeholder={isArabic ? 'أدخل اسمك الكامل' : 'Enter your full name'}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                <User className="h-4 w-4" />
                {isArabic ? 'اسم المستخدم' : 'Username'}
              </Label>
              <Input
                id="username"
                value={isEditing ? editedProfile.username : profile.username}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, username: e.target.value }))}
                disabled={!isEditing}
                className={isArabic ? 'text-right' : ''}
                placeholder={isArabic ? 'اسم المستخدم' : 'Username'}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
              <Mail className="h-4 w-4" />
              {isArabic ? 'البريد الإلكتروني' : 'Email'}
            </Label>
            <Input
              id="email"
              value={profile.email}
              disabled
              className={`bg-gray-100 dark:bg-gray-800 ${isArabic ? 'text-right' : ''}`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                <Phone className="h-4 w-4" />
                {isArabic ? 'رقم الهاتف' : 'Phone Number'}
              </Label>
              <Input
                id="phone"
                value={isEditing ? editedProfile.phone : profile.phone}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                disabled={!isEditing}
                className={isArabic ? 'text-right' : ''}
                placeholder={isArabic ? 'رقم الهاتف' : 'Phone number'}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                <MapPin className="h-4 w-4" />
                {isArabic ? 'الموقع' : 'Location'}
              </Label>
              <Input
                id="location"
                value={isEditing ? editedProfile.location : profile.location}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                disabled={!isEditing}
                className={isArabic ? 'text-right' : ''}
                placeholder={isArabic ? 'المدينة، البلد' : 'City, Country'}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
              <User className="h-4 w-4" />
              {isArabic ? 'النبذة الشخصية' : 'Bio'}
            </Label>
            <Textarea
              id="bio"
              rows={3}
              value={isEditing ? editedProfile.bio : profile.bio}
              onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
              disabled={!isEditing}
              className={isArabic ? 'text-right' : ''}
              placeholder={isArabic ? 'اكتب نبذة عن نفسك...' : 'Tell us about yourself...'}
            />
          </div>

          <div className={`flex gap-3 pt-4 ${isArabic ? 'justify-start flex-row-reverse' : 'justify-end'}`}>
            {isEditing ? (
              <>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? (isArabic ? 'جاري الحفظ...' : 'Saving...') : (isArabic ? 'حفظ' : 'Save')}
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                {isArabic ? 'تعديل' : 'Edit'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
            <Building className="h-5 w-5" />
            {isArabic ? 'المعلومات المهنية' : 'Professional Information'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company_name" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
              <Building className="h-4 w-4" />
              {isArabic ? 'اسم الشركة' : 'Company Name'}
            </Label>
            <Input
              id="company_name"
              value={isEditing ? editedProfile.company_name : profile.company_name}
              onChange={(e) => setEditedProfile(prev => ({ ...prev, company_name: e.target.value }))}
              disabled={!isEditing}
              className={isArabic ? 'text-right' : ''}
              placeholder={isArabic ? 'اسم الشركة' : 'Company name'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="job_title" className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
              <User className="h-4 w-4" />
              {isArabic ? 'المسمى الوظيفي' : 'Job Title'}
            </Label>
            <Input
              id="job_title"
              value={isEditing ? editedProfile.job_title : profile.job_title}
              onChange={(e) => setEditedProfile(prev => ({ ...prev, job_title: e.target.value }))}
              disabled={!isEditing}
              className={isArabic ? 'text-right' : ''}
              placeholder={isArabic ? 'المسمى الوظيفي' : 'Job title'}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                <Clock className="h-4 w-4" />
                {isArabic ? 'المنطقة الزمنية' : 'Timezone'}
              </Label>
              <Select
                value={isEditing ? editedProfile.timezone : profile.timezone}
                onValueChange={(value) => setEditedProfile(prev => ({ ...prev, timezone: value }))}
                disabled={!isEditing}
              >
                <SelectTrigger className={isArabic ? 'text-right' : ''}>
                  <SelectValue placeholder={isArabic ? 'اختر المنطقة الزمنية' : 'Select timezone'} />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                <Globe className="h-4 w-4" />
                {isArabic ? 'اللغة المفضلة' : 'Preferred Language'}
              </Label>
              <Select
                value={isEditing ? editedProfile.language_preference : profile.language_preference}
                onValueChange={(value) => setEditedProfile(prev => ({ ...prev, language_preference: value }))}
                disabled={!isEditing}
              >
                <SelectTrigger className={isArabic ? 'text-right' : ''}>
                  <SelectValue placeholder={isArabic ? 'اختر اللغة' : 'Select language'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Links */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
            <Globe className="h-5 w-5" />
            {isArabic ? 'روابط التواصل الاجتماعي' : 'Social Media Links'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SocialLinksForm
            socialLinks={socialLinks}
            onSocialLinksChange={onSocialLinksChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoSection;
