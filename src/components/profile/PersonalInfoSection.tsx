
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { User, Mail, Phone, Building, MapPin, Globe, Clock, Save, X, CheckCircle } from 'lucide-react';
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
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    await onSave(editedProfile);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
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

  const InputField = ({ icon: Icon, label, id, value, onChange, disabled, placeholder, type = "text" }) => (
    <div className="space-y-3">
      <Label 
        htmlFor={id} 
        className={`flex items-center gap-3 text-base font-medium text-gray-700 dark:text-gray-300 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}
      >
        <Icon className="h-5 w-5 text-blue-600" />
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`h-12 text-base transition-all duration-200 border-2 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
          isArabic ? 'text-right font-arabic' : ''
        } ${disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : 'bg-white dark:bg-gray-900'}`}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Basic Information Card */}
      <Card className="shadow-lg border-0 bg-white dark:bg-gray-900 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 border-b">
          <CardTitle className={`flex items-center gap-3 text-xl font-bold text-gray-800 dark:text-white ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            {isArabic ? 'المعلومات الأساسية' : 'Basic Information'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              icon={User}
              label={isArabic ? 'الاسم الكامل' : 'Full Name'}
              id="full_name"
              value={isEditing ? editedProfile.full_name : profile.full_name}
              onChange={(e) => setEditedProfile(prev => ({ ...prev, full_name: e.target.value }))}
              disabled={!isEditing}
              placeholder={isArabic ? 'أدخل اسمك الكامل' : 'Enter your full name'}
            />
            
            <InputField
              icon={User}
              label={isArabic ? 'اسم المستخدم' : 'Username'}
              id="username"
              value={isEditing ? editedProfile.username : profile.username}
              onChange={(e) => setEditedProfile(prev => ({ ...prev, username: e.target.value }))}
              disabled={!isEditing}
              placeholder={isArabic ? 'اسم المستخدم' : 'Username'}
            />
          </div>

          <InputField
            icon={Mail}
            label={isArabic ? 'البريد الإلكتروني' : 'Email'}
            id="email"
            value={profile.email}
            onChange={() => {}}
            disabled={true}
            placeholder=""
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              icon={Phone}
              label={isArabic ? 'رقم الهاتف' : 'Phone Number'}
              id="phone"
              value={isEditing ? editedProfile.phone : profile.phone}
              onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
              disabled={!isEditing}
              placeholder={isArabic ? 'رقم الهاتف' : 'Phone number'}
            />
            
            <InputField
              icon={MapPin}
              label={isArabic ? 'الموقع' : 'Location'}
              id="location"
              value={isEditing ? editedProfile.location : profile.location}
              onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
              disabled={!isEditing}
              placeholder={isArabic ? 'المدينة، البلد' : 'City, Country'}
            />
          </div>

          <div className="space-y-3">
            <Label 
              htmlFor="bio" 
              className={`flex items-center gap-3 text-base font-medium text-gray-700 dark:text-gray-300 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}
            >
              <User className="h-5 w-5 text-blue-600" />
              {isArabic ? 'النبذة الشخصية' : 'Bio'}
            </Label>
            <Textarea
              id="bio"
              rows={4}
              value={isEditing ? editedProfile.bio : profile.bio}
              onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
              disabled={!isEditing}
              className={`text-base transition-all duration-200 border-2 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none ${
                isArabic ? 'text-right font-arabic' : ''
              } ${!isEditing ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : 'bg-white dark:bg-gray-900'}`}
              placeholder={isArabic ? 'اكتب نبذة عن نفسك...' : 'Tell us about yourself...'}
            />
          </div>

          {/* Enhanced Action Buttons */}
          <div className={`flex gap-4 pt-6 ${isArabic ? 'justify-start flex-row-reverse' : 'justify-end'}`}>
            {isEditing ? (
              <>
                <Button 
                  onClick={handleSave} 
                  disabled={loading}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  <span className={isArabic ? 'font-arabic' : ''}>
                    {loading ? (isArabic ? 'جاري الحفظ...' : 'Saving...') : (isArabic ? 'حفظ' : 'Save')}
                  </span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  className="border-2 border-gray-300 hover:border-gray-400 px-8 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  <span className={isArabic ? 'font-arabic' : ''}>{isArabic ? 'إلغاء' : 'Cancel'}</span>
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <span className={isArabic ? 'font-arabic' : ''}>{isArabic ? 'تعديل' : 'Edit'}</span>
              </Button>
            )}
            
            {saveSuccess && (
              <div className={`flex items-center gap-2 text-green-600 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <CheckCircle className="h-5 w-5" />
                <span className={isArabic ? 'font-arabic' : ''}>{isArabic ? 'تم الحفظ بنجاح' : 'Saved successfully'}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Professional Information Card */}
      <Card className="shadow-lg border-0 bg-white dark:bg-gray-900 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 border-b">
          <CardTitle className={`flex items-center gap-3 text-xl font-bold text-gray-800 dark:text-white ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Building className="h-5 w-5 text-white" />
            </div>
            {isArabic ? 'المعلومات المهنية' : 'Professional Information'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <InputField
            icon={Building}
            label={isArabic ? 'اسم الشركة' : 'Company Name'}
            id="company_name"
            value={isEditing ? editedProfile.company_name : profile.company_name}
            onChange={(e) => setEditedProfile(prev => ({ ...prev, company_name: e.target.value }))}
            disabled={!isEditing}
            placeholder={isArabic ? 'اسم الشركة' : 'Company name'}
          />

          <InputField
            icon={User}
            label={isArabic ? 'المسمى الوظيفي' : 'Job Title'}
            id="job_title"
            value={isEditing ? editedProfile.job_title : profile.job_title}
            onChange={(e) => setEditedProfile(prev => ({ ...prev, job_title: e.target.value }))}
            disabled={!isEditing}
            placeholder={isArabic ? 'المسمى الوظيفي' : 'Job title'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className={`flex items-center gap-3 text-base font-medium text-gray-700 dark:text-gray-300 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
                <Clock className="h-5 w-5 text-blue-600" />
                {isArabic ? 'المنطقة الزمنية' : 'Timezone'}
              </Label>
              <Select
                value={isEditing ? editedProfile.timezone : profile.timezone}
                onValueChange={(value) => setEditedProfile(prev => ({ ...prev, timezone: value }))}
                disabled={!isEditing}
              >
                <SelectTrigger className={`h-12 text-base border-2 hover:border-blue-300 focus:border-blue-500 ${isArabic ? 'text-right font-arabic' : ''}`}>
                  <SelectValue placeholder={isArabic ? 'اختر المنطقة الزمنية' : 'Select timezone'} />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white dark:bg-gray-800 border-2">
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz} className="hover:bg-blue-50 dark:hover:bg-gray-700">
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className={`flex items-center gap-3 text-base font-medium text-gray-700 dark:text-gray-300 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
                <Globe className="h-5 w-5 text-blue-600" />
                {isArabic ? 'اللغة المفضلة' : 'Preferred Language'}
              </Label>
              <Select
                value={isEditing ? editedProfile.language_preference : profile.language_preference}
                onValueChange={(value) => setEditedProfile(prev => ({ ...prev, language_preference: value }))}
                disabled={!isEditing}
              >
                <SelectTrigger className={`h-12 text-base border-2 hover:border-blue-300 focus:border-blue-500 ${isArabic ? 'text-right font-arabic' : ''}`}>
                  <SelectValue placeholder={isArabic ? 'اختر اللغة' : 'Select language'} />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white dark:bg-gray-800 border-2">
                  <SelectItem value="en" className="hover:bg-blue-50 dark:hover:bg-gray-700">English</SelectItem>
                  <SelectItem value="ar" className="hover:bg-blue-50 dark:hover:bg-gray-700 font-arabic">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Links Card */}
      <Card className="lg:col-span-2 shadow-lg border-0 bg-white dark:bg-gray-900 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 border-b">
          <CardTitle className={`flex items-center gap-3 text-xl font-bold text-gray-800 dark:text-white ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            {isArabic ? 'روابط التواصل الاجتماعي' : 'Social Media Links'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
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
