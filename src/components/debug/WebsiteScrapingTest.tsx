
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Globe, Search } from 'lucide-react';
import { RapidApiScraperService } from '@/services/rapidApiScraper';

const WebsiteScrapingTest: React.FC = () => {
  const [url, setUrl] = useState('https://nexta.sa');
  const [isLoading, setIsLoading] = useState(false);
  const [scrapingResult, setScrapingResult] = useState<any>(null);
  const [socialAnalysis, setSocialAnalysis] = useState<any>(null);

  const handleScrape = async () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    setScrapingResult(null);
    setSocialAnalysis(null);
    
    try {
      console.log('بدء اختبار الـ scraping للموقع:', url);
      
      // اختبار الـ scraping الأساسي
      const basicResult = await RapidApiScraperService.scrapeWebsite(url);
      setScrapingResult(basicResult);
      
      // اختبار تحليل حسابات السوشال ميديا
      const socialResult = await RapidApiScraperService.analyzeSocialMediaPresence(url);
      setSocialAnalysis(socialResult);
      
    } catch (error) {
      console.error('خطأ في الاختبار:', error);
      setScrapingResult({ success: false, error: error.message });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            اختبار RapidAPI Scraping
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="أدخل رابط الموقع..."
              className="flex-1"
            />
            <Button 
              onClick={handleScrape} 
              disabled={isLoading || !url.trim()}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              اختبار
            </Button>
          </div>
          
          {isLoading && (
            <div className="text-center py-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
              <p>جاري تحليل الموقع...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {scrapingResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              نتائج الـ Scraping الأساسي
              <Badge variant={scrapingResult.success ? "default" : "destructive"}>
                {scrapingResult.success ? "نجح" : "فشل"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {scrapingResult.success ? (
              <div className="space-y-3">
                <div>
                  <strong>العنوان:</strong>
                  <p className="text-sm text-gray-600">{scrapingResult.data?.title || 'غير متوفر'}</p>
                </div>
                <div>
                  <strong>الوصف:</strong>
                  <p className="text-sm text-gray-600">{scrapingResult.data?.description || 'غير متوفر'}</p>
                </div>
                <div>
                  <strong>روابط السوشال ميديا المكتشفة:</strong>
                  <div className="mt-2 space-y-1">
                    {scrapingResult.data?.socialLinks?.length > 0 ? (
                      scrapingResult.data.socialLinks.map((link: string, index: number) => (
                        <Badge key={index} variant="outline" className="mr-2">
                          {link}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">لم يتم العثور على روابط</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-red-600">خطأ: {scrapingResult.error}</p>
            )}
          </CardContent>
        </Card>
      )}

      {socialAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle>تحليل حسابات السوشال ميديا</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <strong>الإحصائيات:</strong>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm">عدد الحسابات المكتشفة: {socialAnalysis.analysis?.totalSocialAccounts || 0}</p>
                    <p className="text-sm">المنصات: {socialAnalysis.analysis?.socialPlatformsFound?.join(', ') || 'لا يوجد'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <strong>الحسابات المستخرجة:</strong>
                <div className="mt-2 space-y-2">
                  {Object.keys(socialAnalysis.extractedAccounts || {}).length > 0 ? (
                    Object.entries(socialAnalysis.extractedAccounts).map(([platform, account]: [string, any]) => (
                      <div key={platform} className="border rounded p-2">
                        <div className="font-medium">{platform}</div>
                        <div className="text-sm text-gray-600">
                          {account.handle || account.name || account.phone}
                          {account.followers && ` - ${account.followers} متابع`}
                          {account.url && (
                            <a href={account.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 ml-2">
                              زيارة
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">لم يتم العثور على حسابات</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WebsiteScrapingTest;
