
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save, X } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CampaignFormProps {
  onClose: () => void;
  onSave: () => void;
  campaign?: any;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ onClose, onSave, campaign }) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const isArabic = language === 'ar';

  const [formData, setFormData] = useState({
    name: campaign?.name || '',
    description: campaign?.description || '',
    status: campaign?.status || 'draft',
    budget: campaign?.budget || '',
    start_date: campaign?.start_date ? new Date(campaign.start_date) : null,
    end_date: campaign?.end_date ? new Date(campaign.end_date) : null,
    target_audience: campaign?.target_audience || {
      demographics: '',
      interests: '',
      location: ''
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const campaignData = {
        name: formData.name,
        description: formData.description,
        status: formData.status,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        start_date: formData.start_date?.toISOString().split('T')[0] || null,
        end_date: formData.end_date?.toISOString().split('T')[0] || null,
        target_audience: formData.target_audience,
        user_id: user.id
      };

      let result;
      if (campaign) {
        result = await supabase
          .from('campaigns')
          .update(campaignData)
          .eq('id', campaign.id);
      } else {
        result = await supabase
          .from('campaigns')
          .insert([campaignData]);
      }

      if (result.error) throw result.error;

      toast({
        title: isArabic ? 'تم الحفظ بنجاح' : 'Campaign Saved',
        description: isArabic ? 'تم حفظ الحملة بنجاح' : 'Campaign has been saved successfully'
      });

      onSave();
      onClose();
    } catch (error: any) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className={isArabic ? 'text-right' : ''}>
          {campaign ? 
            (isArabic ? 'تعديل الحملة' : 'Edit Campaign') : 
            (isArabic ? 'حملة جديدة' : 'New Campaign')
          }
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              {isArabic ? 'اسم الحملة' : 'Campaign Name'}
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={isArabic ? 'أدخل اسم الحملة' : 'Enter campaign name'}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">
              {isArabic ? 'الحالة' : 'Status'}
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder={isArabic ? 'اختر الحالة' : 'Select status'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">{isArabic ? 'مسودة' : 'Draft'}</SelectItem>
                <SelectItem value="active">{isArabic ? 'نشطة' : 'Active'}</SelectItem>
                <SelectItem value="paused">{isArabic ? 'متوقفة' : 'Paused'}</SelectItem>
                <SelectItem value="completed">{isArabic ? 'مكتملة' : 'Completed'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            {isArabic ? 'الوصف' : 'Description'}
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder={isArabic ? 'اوصف أهداف وتفاصيل الحملة' : 'Describe campaign goals and details'}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">
            {isArabic ? 'الميزانية' : 'Budget'}
          </Label>
          <Input
            id="budget"
            type="number"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            placeholder={isArabic ? 'أدخل الميزانية' : 'Enter budget amount'}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{isArabic ? 'تاريخ البداية' : 'Start Date'}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={`w-full justify-start text-left font-normal ${!formData.start_date && 'text-muted-foreground'}`}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.start_date ? format(formData.start_date, 'PPP') : (isArabic ? 'اختر التاريخ' : 'Pick a date')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.start_date}
                  onSelect={(date) => setFormData({ ...formData, start_date: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>{isArabic ? 'تاريخ النهاية' : 'End Date'}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={`w-full justify-start text-left font-normal ${!formData.end_date && 'text-muted-foreground'}`}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.end_date ? format(formData.end_date, 'PPP') : (isArabic ? 'اختر التاريخ' : 'Pick a date')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.end_date}
                  onSelect={(date) => setFormData({ ...formData, end_date: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold">
            {isArabic ? 'الجمهور المستهدف' : 'Target Audience'}
          </Label>
          
          <div className="space-y-2">
            <Label htmlFor="demographics">
              {isArabic ? 'الديموغرافيا' : 'Demographics'}
            </Label>
            <Input
              id="demographics"
              value={formData.target_audience.demographics}
              onChange={(e) => setFormData({
                ...formData,
                target_audience: { ...formData.target_audience, demographics: e.target.value }
              })}
              placeholder={isArabic ? 'العمر، الجنس، المستوى التعليمي' : 'Age, gender, education level'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">
              {isArabic ? 'الاهتمامات' : 'Interests'}
            </Label>
            <Input
              id="interests"
              value={formData.target_audience.interests}
              onChange={(e) => setFormData({
                ...formData,
                target_audience: { ...formData.target_audience, interests: e.target.value }
              })}
              placeholder={isArabic ? 'التكنولوجيا، الرياضة، السفر' : 'Technology, sports, travel'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">
              {isArabic ? 'الموقع الجغرافي' : 'Geographic Location'}
            </Label>
            <Input
              id="location"
              value={formData.target_audience.location}
              onChange={(e) => setFormData({
                ...formData,
                target_audience: { ...formData.target_audience, location: e.target.value }
              })}
              placeholder={isArabic ? 'المملكة العربية السعودية، الرياض' : 'Saudi Arabia, Riyadh'}
            />
          </div>
        </div>

        <div className={`flex gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Button onClick={handleSave} disabled={isLoading || !formData.name}>
            <Save className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
            {isLoading ? (isArabic ? 'جاري الحفظ...' : 'Saving...') : (isArabic ? 'حفظ' : 'Save')}
          </Button>
          <Button variant="outline" onClick={onClose}>
            {isArabic ? 'إلغاء' : 'Cancel'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignForm;
