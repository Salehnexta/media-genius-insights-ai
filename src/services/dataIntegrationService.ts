
import { MockApiService } from './mockApiService';

interface IntegrationStatus {
  platform: string;
  connected: boolean;
  lastSync: Date | null;
  status: 'active' | 'error' | 'pending' | 'disconnected';
  errorMessage?: string;
}

interface UserIntegrations {
  googleAnalytics: IntegrationStatus;
  facebookAds: IntegrationStatus;
  instagramBusiness: IntegrationStatus;
  linkedinCompany: IntegrationStatus;
  twitterAnalytics: IntegrationStatus;
  emailMarketing: IntegrationStatus;
  ecommerce: IntegrationStatus;
}

export class DataIntegrationService {
  private static integrations: UserIntegrations = {
    googleAnalytics: { platform: 'Google Analytics', connected: false, lastSync: null, status: 'disconnected' },
    facebookAds: { platform: 'Facebook Ads', connected: false, lastSync: null, status: 'disconnected' },
    instagramBusiness: { platform: 'Instagram Business', connected: false, lastSync: null, status: 'disconnected' },
    linkedinCompany: { platform: 'LinkedIn Company', connected: false, lastSync: null, status: 'disconnected' },
    twitterAnalytics: { platform: 'Twitter Analytics', connected: false, lastSync: null, status: 'disconnected' },
    emailMarketing: { platform: 'Email Marketing', connected: false, lastSync: null, status: 'disconnected' },
    ecommerce: { platform: 'E-commerce', connected: false, lastSync: null, status: 'disconnected' }
  };

  // Simulate connecting to various platforms
  static async connectGoogleAnalytics(websiteUrl: string): Promise<boolean> {
    try {
      this.integrations.googleAnalytics.status = 'pending';
      
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (Math.random() > 0.1) { // 90% success rate
        this.integrations.googleAnalytics = {
          platform: 'Google Analytics',
          connected: true,
          lastSync: new Date(),
          status: 'active'
        };
        return true;
      } else {
        this.integrations.googleAnalytics = {
          platform: 'Google Analytics',
          connected: false,
          lastSync: null,
          status: 'error',
          errorMessage: 'Unable to verify website ownership'
        };
        return false;
      }
    } catch (error) {
      this.integrations.googleAnalytics.status = 'error';
      this.integrations.googleAnalytics.errorMessage = 'Connection failed';
      return false;
    }
  }

  static async connectSocialMedia(platform: string, accountUrl: string): Promise<boolean> {
    const platformKey = platform.toLowerCase().replace(/\s+/g, '') as keyof UserIntegrations;
    
    try {
      if (this.integrations[platformKey]) {
        this.integrations[platformKey].status = 'pending';
        
        // Simulate OAuth flow delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (Math.random() > 0.05) { // 95% success rate
          this.integrations[platformKey] = {
            platform,
            connected: true,
            lastSync: new Date(),
            status: 'active'
          };
          return true;
        } else {
          this.integrations[platformKey] = {
            platform,
            connected: false,
            lastSync: null,
            status: 'error',
            errorMessage: 'Invalid account permissions'
          };
          return false;
        }
      }
      return false;
    } catch (error) {
      if (this.integrations[platformKey]) {
        this.integrations[platformKey].status = 'error';
        this.integrations[platformKey].errorMessage = 'Authentication failed';
      }
      return false;
    }
  }

  static getIntegrationStatus(): UserIntegrations {
    return { ...this.integrations };
  }

  static async syncAllData(industry: string, websiteUrl?: string, competitors: string[] = []): Promise<{
    analytics?: any;
    socialInsights?: any[];
    competitorData?: any[];
    trendData?: any;
  }> {
    const results: any = {};

    // Sync Google Analytics data if connected
    if (this.integrations.googleAnalytics.connected && websiteUrl) {
      try {
        results.analytics = await MockApiService.simulateGoogleAnalytics(websiteUrl, industry);
        this.integrations.googleAnalytics.lastSync = new Date();
      } catch (error) {
        console.error('Analytics sync failed:', error);
      }
    }

    // Sync social media data for connected platforms
    results.socialInsights = [];
    const socialPlatforms = ['facebook', 'instagram', 'linkedin', 'twitter'];
    
    for (const platform of socialPlatforms) {
      const platformKey = platform === 'facebook' ? 'facebookAds' :
                         platform === 'instagram' ? 'instagramBusiness' :
                         platform === 'linkedin' ? 'linkedinCompany' :
                         'twitterAnalytics';
      
      if (this.integrations[platformKey as keyof UserIntegrations]?.connected) {
        try {
          const insights = await MockApiService.simulateSocialMediaInsights(platform, '', industry);
          results.socialInsights.push(insights);
          this.integrations[platformKey as keyof UserIntegrations].lastSync = new Date();
        } catch (error) {
          console.error(`${platform} sync failed:`, error);
        }
      }
    }

    // Sync competitor data
    if (competitors.length > 0) {
      try {
        results.competitorData = await MockApiService.simulateCompetitorAnalysis(industry, competitors);
      } catch (error) {
        console.error('Competitor analysis failed:', error);
      }
    }

    // Sync trend data
    try {
      results.trendData = await MockApiService.simulateTrendForecasting(industry);
    } catch (error) {
      console.error('Trend forecasting failed:', error);
    }

    return results;
  }

  static async testConnection(platform: string): Promise<boolean> {
    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 1000));
    return Math.random() > 0.1; // 90% success rate
  }

  static disconnectPlatform(platform: string): boolean {
    const platformKey = platform.toLowerCase().replace(/\s+/g, '') as keyof UserIntegrations;
    
    if (this.integrations[platformKey]) {
      this.integrations[platformKey] = {
        platform: this.integrations[platformKey].platform,
        connected: false,
        lastSync: null,
        status: 'disconnected'
      };
      return true;
    }
    return false;
  }

  // Webhook simulation for real-time updates
  static simulateWebhookData(platform: string, eventType: string) {
    const webhookData = {
      platform,
      eventType,
      timestamp: new Date().toISOString(),
      data: {
        newFollowers: Math.floor(Math.random() * 10),
        engagement: Math.round((2 + Math.random() * 3) * 10) / 10,
        reach: Math.floor(Math.random() * 1000 + 500),
        impressions: Math.floor(Math.random() * 5000 + 1000)
      }
    };

    // Simulate real-time data push
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('webhookData', { detail: webhookData }));
    }

    return webhookData;
  }

  // Data quality validation
  static validateData(data: any, type: string): { isValid: boolean; issues: string[] } {
    const issues: string[] = [];
    let isValid = true;

    switch (type) {
      case 'analytics':
        if (!data.sessions || data.sessions < 0) {
          issues.push('Invalid session data');
          isValid = false;
        }
        if (!data.bounceRate || data.bounceRate < 0 || data.bounceRate > 100) {
          issues.push('Invalid bounce rate');
          isValid = false;
        }
        break;
      
      case 'social':
        if (!data.followers || data.followers < 0) {
          issues.push('Invalid follower count');
          isValid = false;
        }
        if (!data.engagement || data.engagement < 0) {
          issues.push('Invalid engagement rate');
          isValid = false;
        }
        break;
      
      default:
        break;
    }

    return { isValid, issues };
  }

  // Rate limiting simulation
  static async checkRateLimit(platform: string): Promise<{ allowed: boolean; resetTime?: Date }> {
    // Simulate rate limiting
    const rateLimitHit = Math.random() < 0.05; // 5% chance of hitting rate limit
    
    if (rateLimitHit) {
      const resetTime = new Date();
      resetTime.setMinutes(resetTime.getMinutes() + 15); // Reset in 15 minutes
      
      return { allowed: false, resetTime };
    }
    
    return { allowed: true };
  }
}
