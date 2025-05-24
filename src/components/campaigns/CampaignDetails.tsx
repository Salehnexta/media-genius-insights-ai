
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Edit, Play, Pause, BarChart3, Target, DollarSign, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format, differenceInDays, isAfter, isBefore } from 'date-fns';

interface CampaignDetailsProps {
  campaignId: string;
  onBack: () => void;
  onEdit: (campaign: any) => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({ campaignId, onBack, onEdit }) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const isArabic = language === 'ar';

  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchCampaign = async () => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', campaignId)
        .single();

      if (error) throw error;
      setCampaign(data);
    } catch (error: any) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [campaignId]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({ status: newStatus })
        .eq('id', campaignId);

      if (error) throw error;

      toast({
        title: isArabic ? 'تم التحديث' : 'Status Updated',
        description: isArabic ? 'تم تحديث حالة الحملة' : 'Campaign status updated'
      });

      fetchCampaign();
    } catch (error: any) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: isArabic ? 'مسودة' : 'Draft', variant: 'secondary' as const },
      active: { label: isArabic ? 'نشطة' : 'Active', variant: 'default' as const },
      paused: { label: isArabic ? 'متوقفة' : 'Paused', variant: 'destructive' as const },
      completed: { label: isArabic ? 'مكتملة' : 'Completed', variant: 'outline' as const }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getCampaignProgress = () => {
    if (!campaign?.start_date || !campaign?.end_date) return 0;
    
    const now = new Date();
    const start = new Date(campaign.start_date);
    const end = new Date(campaign.end_date);
    
    if (isBefore(now, start)) return 0;
    if (isAfter(now, end)) return 100;
    
    const totalDays = differenceInDays(end, start);
    const passedDays = differenceInDays(now, start);
    
    return Math.round((passedDays / totalDays) * 100);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          {isArabic ? 'جاري التحميل...' : 'Loading campaign...'}
        </p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          {isArabic ? 'الحملة غير موجودة' : 'Campaign not found'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <Button variant="ghost" onClick={onBack} size="sm">
          <ArrowLeft className={`h-4 w-4 ${isArabic ? 'ml-2 rotate-180' : 'mr-2'}`} />
          {isArabic ? 'العودة' : 'Back'}
        </Button>
        
        <div className="flex-1">
          <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <h1 className="text-2xl font-bold">{campaign.name}</h1>
            {getStatusBadge(campaign.status)}
          </div>
        </div>

        <div className={`flex gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          {campaign.status === 'draft' && (
            <Button onClick={() => handleStatusChange('active')} size="sm">
              <Play className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
              {isArabic ? 'تفعيل' : 'Launch'}
            </Button>
          )}
          {campaign.status === 'active' && (
            <Button onClick={() => handleStatusChange('paused')} variant="outline" size="sm">
              <Pause className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
              {isArabic ? 'إيقاف' : 'Pause'}
            </Button>
          )}
          <Button onClick={() => onEdit(campaign)} variant="outline" size="sm">
            <Edit className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
            {isArabic ? 'تعديل' : 'Edit'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className={isArabic ? 'text-right' : ''}>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? 'الميزانية' : 'Budget'}
                </p>
                <p className="text-2xl font-bold">
                  ${campaign.budget?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className={isArabic ? 'text-right' : ''}>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? 'المدة' : 'Duration'}
                </p>
                <p className="text-2xl font-bold">
                  {campaign.start_date && campaign.end_date
                    ? `${differenceInDays(new Date(campaign.end_date), new Date(campaign.start_date))} ${isArabic ? 'يوم' : 'days'}`
                    : isArabic ? 'غير محدد' : 'Not set'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div className={isArabic ? 'text-right' : ''}>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? 'التقدم' : 'Progress'}
                </p>
                <p className="text-2xl font-bold">{getCampaignProgress()}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Target className="h-8 w-8 text-orange-600" />
              <div className={isArabic ? 'text-right' : ''}>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? 'الأداء' : 'Performance'}
                </p>
                <p className="text-2xl font-bold">
                  {campaign.status === 'active' ? (isArabic ? 'جيد' : 'Good') : '--'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {campaign.start_date && campaign.end_date && (
        <Card>
          <CardHeader>
            <CardTitle className={isArabic ? 'text-right' : ''}>
              {isArabic ? 'تقدم الحملة' : 'Campaign Progress'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className={`flex justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>{format(new Date(campaign.start_date), 'MMM dd, yyyy')}</span>
                <span>{format(new Date(campaign.end_date), 'MMM dd, yyyy')}</span>
              </div>
              <Progress value={getCampaignProgress()} className="h-2" />
              <p className={`text-sm text-muted-foreground ${isArabic ? 'text-right' : ''}`}>
                {getCampaignProgress()}% {isArabic ? 'مكتمل' : 'complete'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">{isArabic ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
          <TabsTrigger value="audience">{isArabic ? 'الجمهور' : 'Audience'}</TabsTrigger>
          <TabsTrigger value="metrics">{isArabic ? 'المقاييس' : 'Metrics'}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'text-right' : ''}>
                {isArabic ? 'وصف الحملة' : 'Campaign Description'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-muted-foreground ${isArabic ? 'text-right' : ''}`}>
                {campaign.description || (isArabic ? 'لا يوجد وصف' : 'No description provided')}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'text-right' : ''}>
                {isArabic ? 'الجمهور المستهدف' : 'Target Audience'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {campaign.target_audience?.demographics && (
                <div>
                  <h4 className={`font-semibold mb-2 ${isArabic ? 'text-right' : ''}`}>
                    {isArabic ? 'الديموغرافيا' : 'Demographics'}
                  </h4>
                  <p className={`text-muted-foreground ${isArabic ? 'text-right' : ''}`}>
                    {campaign.target_audience.demographics}
                  </p>
                </div>
              )}
              
              {campaign.target_audience?.interests && (
                <div>
                  <h4 className={`font-semibold mb-2 ${isArabic ? 'text-right' : ''}`}>
                    {isArabic ? 'الاهتمامات' : 'Interests'}
                  </h4>
                  <p className={`text-muted-foreground ${isArabic ? 'text-right' : ''}`}>
                    {campaign.target_audience.interests}
                  </p>
                </div>
              )}
              
              {campaign.target_audience?.location && (
                <div>
                  <h4 className={`font-semibold mb-2 ${isArabic ? 'text-right' : ''}`}>
                    {isArabic ? 'الموقع الجغرافي' : 'Location'}
                  </h4>
                  <p className={`text-muted-foreground ${isArabic ? 'text-right' : ''}`}>
                    {campaign.target_audience.location}
                  </p>
                </div>
              )}
              
              {!campaign.target_audience?.demographics && !campaign.target_audience?.interests && !campaign.target_audience?.location && (
                <p className={`text-muted-foreground ${isArabic ? 'text-right' : ''}`}>
                  {isArabic ? 'لم يتم تحديد الجمهور المستهدف' : 'No target audience specified'}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'text-right' : ''}>
                {isArabic ? 'مقاييس الأداء' : 'Performance Metrics'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-muted-foreground ${isArabic ? 'text-right' : ''}`}>
                {isArabic ? 'ستظهر مقاييس الأداء هنا عند تفعيل الحملة' : 'Performance metrics will appear here once the campaign is active'}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignDetails;
