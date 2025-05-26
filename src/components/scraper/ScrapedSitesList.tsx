
import React, { useState, useEffect } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  History, 
  ExternalLink, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Eye
} from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface ScrapedSite {
  id: string;
  website_url: string;
  analysis_data: any;
  created_at: string;
  updated_at: string;
}

export const ScrapedSitesList: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const isArabic = language === 'ar';
  
  const [scrapedSites, setScrapedSites] = useState<ScrapedSite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadScrapedSites();
    }
  }, [user]);

  const loadScrapedSites = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_analysis')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('خطأ في تحميل المواقع:', error);
      } else {
        setScrapedSites(data || []);
      }
    } catch (error) {
      console.error('خطأ في تحميل المواقع:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (site: ScrapedSite) => {
    const hasEnhancedData = site.analysis_data?.enhanced;
    return hasEnhancedData 
      ? <CheckCircle className="h-4 w-4 text-green-500" />
      : <AlertCircle className="h-4 w-4 text-yellow-500" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isArabic 
      ? date.toLocaleDateString('ar-SA', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <Clock className="h-8 w-8 animate-spin mx-auto mb-2" />
            <p>{isArabic ? 'جاري التحميل...' : 'Loading...'}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          {isArabic ? 'المواقع المحللة' : 'Analyzed Websites'}
        </CardTitle>
        <CardDescription>
          {isArabic 
            ? `تم تحليل ${scrapedSites.length} موقع إجمالي`
            : `${scrapedSites.length} websites analyzed in total`
          }
        </CardDescription>
      </CardHeader>

      <CardContent>
        {scrapedSites.length === 0 ? (
          <div className="text-center py-8">
            <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {isArabic ? 'لا توجد مواقع محللة بعد' : 'No analyzed websites yet'}
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {scrapedSites.map((site) => (
                <div 
                  key={site.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {getStatusIcon(site)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{site.website_url}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(site.updated_at)}
                      </p>
                    </div>
                    <Badge 
                      variant={site.analysis_data?.enhanced ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {site.analysis_data?.enhanced
                        ? (isArabic ? 'محسن بالذكاء الاصطناعي' : 'AI Enhanced')
                        : (isArabic ? 'تحليل أساسي' : 'Basic Analysis')
                      }
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(site.website_url, '_blank')}
                      className="h-8 w-8 p-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
