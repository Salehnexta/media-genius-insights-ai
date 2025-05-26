import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Globe, Search, ExternalLink, Phone, Mail, MapPin, Zap } from 'lucide-react';
import { RapidApiScraperService } from '@/services/rapidApiScraper';

const WebsiteScrapingTest: React.FC = () => {
  const [url, setUrl] = useState('https://nbtdigital.com/');
  const [isLoading, setIsLoading] = useState(false);
  const [scrapingResult, setScrapingResult] = useState<any>(null);
  const [socialAnalysis, setSocialAnalysis] = useState<any>(null);
  const [autoStarted, setAutoStarted] = useState(false);

  // Auto-start scraping for nbtdigital.com
  useEffect(() => {
    if (!autoStarted) {
      setAutoStarted(true);
      handleScrape();
    }
  }, []);

  const handleScrape = async () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    setScrapingResult(null);
    setSocialAnalysis(null);
    
    try {
      console.log('بدء اختبار الـ JavaScript scraping للموقع:', url);
      
      // اختبار الـ scraping المحسن
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

  const extractContactInfo = (content: string) => {
    const phoneRegex = /(\+966|966|05)\d{8,9}|(\+\d{1,3}\s?)?\(?\d{3,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,6}/g;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    
    const phones = content.match(phoneRegex) || [];
    const emails = content.match(emailRegex) || [];
    
    return { phones: [...new Set(phones)], emails: [...new Set(emails)] };
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" />
            استخراج معلومات محسّن بتقنية JavaScript
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
              تحليل محسّن
            </Button>
          </div>
          
          {isLoading && (
            <div className="text-center py-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-500" />
              <p>جاري التحليل المحسّن للموقع باستخدام JavaScript...</p>
              <Badge variant="outline" className="mt-2">
                <Zap className="w-3 h-3 mr-1" />
                تقنية JavaScript متقدمة
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {scrapingResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              معلومات الموقع المستخرجة
              <Badge variant={scrapingResult.success ? "default" : "destructive"}>
                {scrapingResult.success ? "تم الاستخراج بنجاح" : "فشل"}
              </Badge>
              {scrapingResult.success && (
                <Badge variant="outline" className="bg-blue-50">
                  <Zap className="w-3 h-3 mr-1" />
                  JavaScript
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {scrapingResult.success ? (
              <div className="space-y-6">
                {/* معلومات أساسية محسّنة */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        عنوان الموقع
                      </h4>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {scrapingResult.data?.title || 'غير متوفر'}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-lg mb-2">الوصف</h4>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm">
                        {scrapingResult.data?.description || 'غير متوفر'}
                      </p>
                    </div>
                  </div>

                  {/* معلومات الاتصال المحسّنة */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg mb-2">معلومات الاتصال</h4>
                    {(() => {
                      const contactInfo = extractContactInfo(scrapingResult.data?.content || '');
                      return (
                        <div className="space-y-3">
                          {contactInfo.phones.length > 0 && (
                            <div className="bg-green-50 p-3 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Phone className="w-4 h-4 text-green-600" />
                                <span className="font-medium text-green-800">أرقام الهاتف</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {contactInfo.phones.map((phone, index) => (
                                  <Badge key={index} variant="outline" className="bg-white">
                                    {phone}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {contactInfo.emails.length > 0 && (
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Mail className="w-4 h-4 text-blue-600" />
                                <span className="font-medium text-blue-800">البريد الإلكتروني</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {contactInfo.emails.map((email, index) => (
                                  <Badge key={index} variant="outline" className="bg-white">
                                    {email}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {contactInfo.phones.length === 0 && contactInfo.emails.length === 0 && (
                            <p className="text-gray-500 text-center py-4">لم يتم العثور على معلومات اتصال واضحة</p>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* روابط السوشال ميديا المحسّنة */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">حسابات التواصل الاجتماعي</h4>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    {scrapingResult.data?.socialLinks?.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {scrapingResult.data.socialLinks.map((link: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-white rounded border shadow-sm">
                            <ExternalLink className="w-4 h-4 text-purple-600" />
                            <a href={link} target="_blank" rel="noopener noreferrer" 
                               className="text-purple-700 hover:text-purple-900 text-sm truncate flex-1 font-medium">
                              {link.replace('https://', '').replace('http://', '')}
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">لم يتم العثور على روابط تواصل اجتماعي</p>
                    )}
                  </div>
                </div>

                {/* إحصائيات الموقع المحسّنة */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg text-center">
                    <h5 className="font-medium text-blue-600">الروابط</h5>
                    <p className="text-2xl font-bold text-blue-900">
                      {scrapingResult.data?.links?.length || 0}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg text-center">
                    <h5 className="font-medium text-green-600">الصور</h5>
                    <p className="text-2xl font-bold text-green-900">
                      {scrapingResult.data?.images?.length || 0}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg text-center">
                    <h5 className="font-medium text-purple-600">سوشال ميديا</h5>
                    <p className="text-2xl font-bold text-purple-900">
                      {scrapingResult.data?.socialLinks?.length || 0}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg text-center">
                    <h5 className="font-medium text-orange-600">حجم المحتوى</h5>
                    <p className="text-2xl font-bold text-orange-900">
                      {scrapingResult.data?.content ? `${Math.round(scrapingResult.data.content.length / 1000)}K` : '0K'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-red-600 font-medium">خطأ: {scrapingResult.error}</p>
                <p className="text-gray-500 mt-2">تأكد من صحة الرابط وأن الموقع متاح</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {socialAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline" className="bg-yellow-50">
                <Zap className="w-3 h-3 mr-1" />
                تحليل محسّن
              </Badge>
              تحليل الحضور الرقمي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600">المنصات المكتشفة</p>
                  <p className="text-xl font-bold text-blue-900">
                    {socialAnalysis.analysis?.totalSocialAccounts || 0}
                  </p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600">معلومات الاتصال</p>
                  <p className="text-xl font-bold text-green-900">
                    {socialAnalysis.analysis?.hasContactInfo ? 'متوفر' : 'غير متوفر'}
                  </p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600">نوع الموقع</p>
                  <p className="text-xl font-bold text-purple-900">تجاري</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-600">الحالة</p>
                  <p className="text-xl font-bold text-orange-900">نشط</p>
                </div>
              </div>
              
              {Object.keys(socialAnalysis.extractedAccounts || {}).length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">الحسابات المستخرجة:</h4>
                  <div className="space-y-3">
                    {Object.entries(socialAnalysis.extractedAccounts).map(([platform, account]: [string, any]) => (
                      <div key={platform} className="border rounded-lg p-4 bg-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium capitalize mb-1">{platform.replace('_', ' ')}</div>
                            <div className="text-sm text-gray-600">
                              {account.handle || account.name || account.phone}
                              {account.followers && ` - ${account.followers} متابع`}
                              {account.likes && ` - ${account.likes} إعجاب`}
                            </div>
                            {account.last_post && (
                              <div className="text-xs text-gray-500 mt-1">
                                آخر نشر: {account.last_post}
                              </div>
                            )}
                          </div>
                          {account.url && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={account.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WebsiteScrapingTest;
