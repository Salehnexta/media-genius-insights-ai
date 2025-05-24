
import { supabase } from '@/integrations/supabase/client';

interface CampaignData {
  id: string;
  name: string;
  status: string;
  budget?: number;
  user_id: string;
}

export const triggerZapierWebhook = async (event: string, campaignData: CampaignData) => {
  try {
    // Get user's active webhooks for this event
    const { data: webhooks, error } = await supabase
      .from('zapier_webhooks')
      .select('webhook_url')
      .eq('user_id', campaignData.user_id)
      .eq('trigger_event', event)
      .eq('is_active', true);

    if (error || !webhooks?.length) {
      console.log('No active webhooks found for event:', event);
      return;
    }

    // Prepare webhook payload
    const payload = {
      event,
      timestamp: new Date().toISOString(),
      campaign: {
        id: campaignData.id,
        name: campaignData.name,
        status: campaignData.status,
        budget: campaignData.budget
      },
      user_id: campaignData.user_id
    };

    // Send webhooks to all registered URLs
    const webhookPromises = webhooks.map(webhook => 
      fetch(webhook.webhook_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(payload)
      }).catch(error => {
        console.error('Webhook delivery failed:', error);
      })
    );

    await Promise.allSettled(webhookPromises);
    console.log(`Triggered ${webhooks.length} webhooks for event: ${event}`);

  } catch (error) {
    console.error('Error triggering Zapier webhooks:', error);
  }
};
