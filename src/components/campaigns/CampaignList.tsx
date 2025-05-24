import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, MoreVertical, Edit, Trash2, Play, Pause, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import CampaignForm from './CampaignForm';
import CampaignDetails from './CampaignDetails';

const CampaignList = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const isArabic = language === 'ar';

  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
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
    fetchCampaigns();
  }, [user]);

  const handleDelete = async (campaignId: string) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', campaignId);

      if (error) throw error;

      toast({
        title: isArabic ? 'تم الحذف' : 'Campaign Deleted',
        description: isArabic ? 'تم حذف الحملة بنجاح' : 'Campaign has been deleted successfully'
      });

      fetchCampaigns();
    } catch (error: any) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleStatusChange = async (campaignId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({ status: newStatus })
        .eq('id', campaignId);

      if (error) throw error;

      toast({
        title: isArabic ? 'تم التحديث' : 'Status Updated',
        description: isArabic ? 'تم تحديث حالة الحملة' : 'Campaign status has been updated'
      });

      fetchCampaigns();
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

  // Show campaign details view
  if (selectedCampaignId) {
    return (
      <CampaignDetails
        campaignId={selectedCampaignId}
        onBack={() => setSelectedCampaignId(null)}
        onEdit={(campaign) => {
          setEditingCampaign(campaign);
          setSelectedCampaignId(null);
          setShowForm(true);
        }}
      />
    );
  }

  // Show campaign form
  if (showForm) {
    return (
      <CampaignForm
        campaign={editingCampaign}
        onClose={() => {
          setShowForm(false);
          setEditingCampaign(null);
        }}
        onSave={() => {
          fetchCampaigns();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div>
          <h2 className="text-2xl font-bold">
            {isArabic ? 'الحملات التسويقية' : 'Marketing Campaigns'}
          </h2>
          <p className="text-muted-foreground">
            {isArabic ? 'إدارة ومتابعة حملاتك التسويقية' : 'Manage and monitor your marketing campaigns'}
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          {isArabic ? 'حملة جديدة' : 'New Campaign'}
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {isArabic ? 'جاري التحميل...' : 'Loading campaigns...'}
          </p>
        </div>
      ) : campaigns.length === 0 ? (
        <Card className="p-8 text-center">
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">
              {isArabic ? 'لا توجد حملات بعد' : 'No campaigns yet'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isArabic ? 'ابدأ بإنشاء حملتك التسويقية الأولى' : 'Start by creating your first marketing campaign'}
            </p>
            <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
              {isArabic ? 'إنشاء حملة' : 'Create Campaign'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className={`flex items-start justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-1 ${isArabic ? 'text-right' : ''}`}>
                    <CardTitle className="text-lg mb-2">{campaign.name}</CardTitle>
                    {getStatusBadge(campaign.status)}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={isArabic ? 'start' : 'end'}>
                      <DropdownMenuItem onClick={() => {
                        setEditingCampaign(campaign);
                        setShowForm(true);
                      }}>
                        <Edit className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                        {isArabic ? 'تعديل' : 'Edit'}
                      </DropdownMenuItem>
                      {campaign.status === 'draft' && (
                        <DropdownMenuItem onClick={() => handleStatusChange(campaign.id, 'active')}>
                          <Play className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                          {isArabic ? 'تفعيل' : 'Activate'}
                        </DropdownMenuItem>
                      )}
                      {campaign.status === 'active' && (
                        <DropdownMenuItem onClick={() => handleStatusChange(campaign.id, 'paused')}>
                          <Pause className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                          {isArabic ? 'إيقاف' : 'Pause'}
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => handleDelete(campaign.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                        {isArabic ? 'حذف' : 'Delete'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {campaign.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {campaign.description}
                  </p>
                )}
                
                <div className="space-y-2 text-sm">
                  {campaign.budget && (
                    <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-muted-foreground">
                        {isArabic ? 'الميزانية:' : 'Budget:'}
                      </span>
                      <span className="font-medium">${campaign.budget}</span>
                    </div>
                  )}
                  
                  {campaign.start_date && (
                    <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-muted-foreground">
                        {isArabic ? 'تاريخ البداية:' : 'Start Date:'}
                      </span>
                      <span>{format(new Date(campaign.start_date), 'MMM dd, yyyy')}</span>
                    </div>
                  )}
                  
                  {campaign.end_date && (
                    <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-muted-foreground">
                        {isArabic ? 'تاريخ النهاية:' : 'End Date:'}
                      </span>
                      <span>{format(new Date(campaign.end_date), 'MMM dd, yyyy')}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setSelectedCampaignId(campaign.id)}
                  >
                    <Eye className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                    {isArabic ? 'عرض التفاصيل' : 'View Details'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignList;
