
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Zap, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface ZapierWebhook {
  id: string;
  name: string;
  webhook_url: string;
  trigger_event: string;
  is_active: boolean;
  created_at: string;
}

const ZapierIntegration: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [webhooks, setWebhooks] = useState<ZapierWebhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    webhook_url: '',
    trigger_event: 'campaign_created'
  });

  const triggerEvents = [
    { value: 'campaign_created', label: isArabic ? 'إنشاء حملة جديدة' : 'Campaign Created' },
    { value: 'campaign_updated', label: isArabic ? 'تحديث الحملة' : 'Campaign Updated' },
    { value: 'campaign_activated', label: isArabic ? 'تفعيل الحملة' : 'Campaign Activated' },
    { value: 'campaign_paused', label: isArabic ? 'إيقاف الحملة' : 'Campaign Paused' },
    { value: 'campaign_completed', label: isArabic ? 'اكتمال الحملة' : 'Campaign Completed' }
  ];

  useEffect(() => {
    fetchWebhooks();
  }, [user]);

  const fetchWebhooks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('zapier_webhooks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWebhooks(data || []);
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

  const addWebhook = async () => {
    if (!user || !newWebhook.webhook_url) return;

    try {
      const { error } = await supabase
        .from('zapier_webhooks')
        .insert([{
          name: newWebhook.name || `${newWebhook.trigger_event} webhook`,
          webhook_url: newWebhook.webhook_url,
          trigger_event: newWebhook.trigger_event,
          user_id: user.id,
          is_active: true
        }]);

      if (error) throw error;

      toast({
        title: isArabic ? 'تم إضافة الويب هوك' : 'Webhook Added',
        description: isArabic ? 'تم إضافة الويب هوك بنجاح' : 'Zapier webhook has been added successfully'
      });

      setNewWebhook({ name: '', webhook_url: '', trigger_event: 'campaign_created' });
      setShowAddForm(false);
      fetchWebhooks();
    } catch (error: any) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const deleteWebhook = async (id: string) => {
    try {
      const { error } = await supabase
        .from('zapier_webhooks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: isArabic ? 'تم الحذف' : 'Webhook Deleted',
        description: isArabic ? 'تم حذف الويب هوك' : 'Zapier webhook has been deleted'
      });

      fetchWebhooks();
    } catch (error: any) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const testWebhook = async (webhookUrl: string) => {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
          message: 'Test webhook from Marketing Dashboard'
        })
      });

      toast({
        title: isArabic ? 'تم إرسال التجربة' : 'Test Sent',
        description: isArabic ? 'تم إرسال طلب التجربة إلى Zapier' : 'Test request sent to Zapier. Check your Zap history.'
      });
    } catch (error) {
      toast({
        title: isArabic ? 'خطأ في التجربة' : 'Test Failed',
        description: isArabic ? 'فشل في إرسال التجربة' : 'Failed to send test webhook',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Zap className="h-5 w-5 text-orange-500" />
            {isArabic ? 'تكامل Zapier' : 'Zapier Integration'}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {isArabic ? 
              'ربط حملاتك التسويقية مع آلاف التطبيقات الأخرى عبر Zapier' : 
              'Connect your marketing campaigns with thousands of other apps via Zapier'
            }
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
              <h3 className="text-lg font-medium">
                {isArabic ? 'الويب هوكس المفعلة' : 'Active Webhooks'}
              </h3>
              <Button onClick={() => setShowAddForm(true)} size="sm">
                <Plus className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                {isArabic ? 'إضافة ويب هوك' : 'Add Webhook'}
              </Button>
            </div>

            {showAddForm && (
              <Card className="p-4 border-dashed">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>
                      {isArabic ? 'اسم الويب هوك' : 'Webhook Name'}
                    </Label>
                    <Input
                      placeholder={isArabic ? 'اسم اختياري للويب هوك' : 'Optional webhook name'}
                      value={newWebhook.name}
                      onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>
                      {isArabic ? 'رابط Zapier Webhook' : 'Zapier Webhook URL'}
                    </Label>
                    <Input
                      placeholder="https://hooks.zapier.com/hooks/catch/..."
                      value={newWebhook.webhook_url}
                      onChange={(e) => setNewWebhook({ ...newWebhook, webhook_url: e.target.value })}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      {isArabic ? 
                        'احصل على هذا الرابط من Zapier عند إنشاء Zap جديد' : 
                        'Get this URL from Zapier when creating a new Zap'
                      }
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      {isArabic ? 'حدث التشغيل' : 'Trigger Event'}
                    </Label>
                    <Select value={newWebhook.trigger_event} onValueChange={(value) => setNewWebhook({ ...newWebhook, trigger_event: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {triggerEvents.map((event) => (
                          <SelectItem key={event.value} value={event.value}>
                            {event.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className={`flex gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Button onClick={addWebhook} disabled={!newWebhook.webhook_url}>
                      {isArabic ? 'إضافة' : 'Add'}
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      {isArabic ? 'إلغاء' : 'Cancel'}
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <div className="space-y-3">
              {loading ? (
                <p className="text-center text-muted-foreground">
                  {isArabic ? 'جاري التحميل...' : 'Loading webhooks...'}
                </p>
              ) : webhooks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>{isArabic ? 'لا توجد ويب هوكس مضافة بعد' : 'No webhooks added yet'}</p>
                  <p className="text-sm">
                    {isArabic ? 
                      'أضف ويب هوك لتفعيل الأتمتة مع التطبيقات الأخرى' : 
                      'Add a webhook to enable automation with other apps'
                    }
                  </p>
                </div>
              ) : (
                webhooks.map((webhook) => (
                  <div key={webhook.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className={`flex-1 ${isArabic ? 'text-right' : ''}`}>
                      <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <h4 className="font-medium">{webhook.name}</h4>
                        <Badge variant={webhook.is_active ? 'default' : 'secondary'}>
                          {webhook.is_active ? 
                            (isArabic ? 'مفعل' : 'Active') : 
                            (isArabic ? 'معطل' : 'Inactive')
                          }
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {triggerEvents.find(e => e.value === webhook.trigger_event)?.label}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {webhook.webhook_url}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => testWebhook(webhook.webhook_url)}
                      >
                        {isArabic ? 'تجربة' : 'Test'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => deleteWebhook(webhook.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                {isArabic ? 'كيفية الإعداد' : 'How to Setup'}
              </h4>
              <ol className={`text-sm text-muted-foreground space-y-1 ${isArabic ? 'text-right' : ''}`}>
                <li>1. {isArabic ? 'انتقل إلى Zapier.com وأنشئ حساب جديد' : 'Go to Zapier.com and create an account'}</li>
                <li>2. {isArabic ? 'أنشئ Zap جديد واختر "Webhooks by Zapier" كمشغل' : 'Create a new Zap and choose "Webhooks by Zapier" as trigger'}</li>
                <li>3. {isArabic ? 'اختر "Catch Hook" وانسخ رابط الويب هوك' : 'Select "Catch Hook" and copy the webhook URL'}</li>
                <li>4. {isArabic ? 'ألصق الرابط هنا واختر الحدث المناسب' : 'Paste the URL here and select the appropriate trigger event'}</li>
                <li>5. {isArabic ? 'أكمل إعداد Zap في Zapier لربطه بالتطبيقات الأخرى' : 'Complete your Zap setup in Zapier to connect with other apps'}</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZapierIntegration;
