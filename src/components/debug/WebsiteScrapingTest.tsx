
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Globe, Search, ExternalLink, Phone, Mail, MapPin, Zap, Brain, Star } from 'lucide-react';
import { RapidApiScraperService } from '@/services/rapidApiScraper';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AIAnalysisResult {
  businessInfo: {
    name: string;
    type: string;
    industry: string;
    description: string;
  };
  contactInfo: {
    phones: string[];
    emails: string[];
    addresses: string[];
    workingHours: string;
  };
  digitalPresence: {
    socialMedia: string[];
    ecommerce: boolean;
    mobileApp: boolean;
    onlineServices: string[];
  };
  competitiveAnalysis: {
    strengths: string[];
    services: string[];
    targetAudience: string;
    brandingElements: string[];
  };
  marketingInsights: {
    promotions: string[];
    customerReviews: boolean;
    testimonials: string[];
    contentStrategy: string[];
  };
}

const WebsiteScrapingTest: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [url, setUrl] = useState('https://www.amazon.sa/');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzingWithAI, setIsAnalyzingWithAI] = useState(false);
  const [scrapingResult, setScrapingResult] = useState<any>(null);
  const [socialAnalysis, setSocialAnalysis] = useState<any>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [autoStarted, setAutoStarted] = useState(false);

  // Auto-start scraping for amazon.sa
  useEffect(() => {
    if (!autoStarted) {
      setAutoStarted(true);
      handleScrape();
    }
  }, []);

  const analyzeWithOpenAI = async (scrapedContent: string, websiteUrl: string) => {
    if (!user) {
      toast({
        title: "خطأ في المصادقة",
        description: "يرجى تسجيل الدخول أولاً",
        variant: "destructive"
      });
      return null;
    }

    try {
      const analysisPrompt = `
قم بتحليل الموقع التالي وأعطني معلومات مفصلة بصيغة JSON باللغة العربية:

الموقع: ${websiteUrl}
المحتوى المستخرج: ${scrapedContent.substring(0, 4000)}

أريد التحليل في الشكل التالي بدقة:
{
  "businessInfo": {
    "name": "اسم الشركة أو الموقع",
    "type": "نوع العمل (متجر إلكتروني، شركة خدمات، إلخ)",
    "industry": "القطاع (تجارة إلكترونية، تقنية، إلخ)",
    "description": "وصف مختصر للعمل"
  },
  "contactInfo": {
    "phones": ["قائمة أرقام الهاتف المستخرجة"],
    "emails": ["قائمة الإيميلات المستخرجة"],
    "addresses": ["قائمة العناوين المستخرجة"],
    "workingHours": "ساعات العمل إن وجدت"
  },
  "digitalPresence": {
    "socialMedia": ["قائمة حسابات السوشال ميديا المكتشفة"],
    "ecommerce": true/false,
    "mobileApp": true/false,
    "onlineServices": ["قائمة الخدمات الرقمية المتاحة"]
  },
  "competitiveAnalysis": {
    "strengths": ["نقاط القوة المكتشفة"],
    "services": ["قائمة الخدمات أو المنتجات"],
    "targetAudience": "الجمهور المستهدف",
    "brandingElements": ["عناصر الهوية التجارية"]
  },
  "marketingInsights": {
    "promotions": ["العروض والخصومات المكتشفة"],
    "customerReviews": true/false,
    "testimonials": ["آراء العملاء المستخرجة"],
    "contentStrategy": ["استراتيجية المحتوى المكتشفة"]
  }
}

يرجى التأكد من أن الإجابة JSON صحيحة ومكتملة.`;

      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message: analysisPrompt,
          language: 'ar'
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      // محاولة تحليل الـ JSON
      let analysisData;
      try {
        // البحث عن JSON في الرد
        const jsonMatch = data.response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analysisData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('لم يتم العثور على JSON صحيح في الرد');
        }
      } catch (parseError) {
        console.error('خطأ في تحليل JSON:', parseError);
        // إنشاء بيانات افتراضية من الرد
        analysisData = {
          businessInfo: {
            name: "تم استخراج البيانات",
            type: "موقع إلكتروني", 
            industry: "غير محدد",
            description: data.response.substring(0, 200)
          },
          contactInfo: {
            phones: [],
            emails: [],
            addresses: [],
            workingHours: "غير محدد"
          },
          digitalPresence: {
            socialMedia: [],
            ecommerce: false,
            mobileApp: false,
            onlineServices: []
          },
          competitiveAnalysis: {
            strengths: [],
            services: [],
            targetAudience: "غير محدد",
            brandingElements: []
          },
          marketingInsights: {
            promotions: [],
            customerReviews: false,
            testimonials: [],
            contentStrategy: []
          }
        };
      }

      // حفظ التحليل في قاعدة البيانات
      const { error: saveError } = await supabase
        .from('website_analysis')
        .upsert({
          user_id: user.id,
          website_url: websiteUrl,
          analysis_data: {
            ...analysisData,
            aiAnalysisTimestamp: new Date().toISOString(),
            analysisType: 'openai_enhanced'
          },
          updated_at: new Date().toISOString()
        });

      if (saveError) {
        console.error('خطأ في حفظ التحليل:', saveError);
      }

      return analysisData;
    } catch (error) {
      console.error('خطأ في تحليل OpenAI:', error);
      toast({
        title: "خطأ في التحليل الذكي",
        description: "حدث خطأ أثناء تحليل البيانات بواسطة الذكاء الاصطناعي",
        variant: "destructive"
      });
      return null;
    }
  };

  const handleScrape = async () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    setScrapingResult(null);
    setSocialAnalysis(null);
    setAiAnalysis(null);
    
    try {
      console.log('بدء استخراج البيانات للموقع:', url);
      
      // المرحلة 1: استخراج البيانات الأساسية
      const basicResult = await RapidApiScraperService.scrapeWebsite(url);
      setScrapingResult(basicResult);
      
      // المرحلة 2: تحليل السوشال ميديا
      const socialResult = await RapidApiScraperService.analyzeSocialMediaPresence(url);
      setSocialAnalysis(socialResult);
      
      // المرحلة 3: التحليل الذكي بواسطة OpenAI
      if (basicResult.success && basicResult.data) {
        setIsAnalyzingWithAI(true);
        const aiResult = await analyzeWithOpenAI(basicResult.data.content, url);
        setAiAnalysis(aiResult);
        setIsAnalyzingWithAI(false);
        
        toast({
          title: "تم الاستخراج بنجاح!",
          description: "تم استخراج وتحليل البيانات بواسطة الذكاء الاصطناعي",
        });
      }
      
    } catch (error) {
      console.error('خطأ في الاستخراج:', error);
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
            استخراج وتحليل ذكي بتقنية الذكاء الاصطناعي
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
              تحليل ذكي
            </Button>
          </div>
          
          {(isLoading || isAnalyzingWithAI) && (
            <div className="text-center py-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-500" />
              <p>
                {isAnalyzingWithAI 
                  ? "جاري التحليل الذكي بواسطة OpenAI..." 
                  : "جاري استخراج البيانات..."}
              </p>
              <Badge variant="outline" className="mt-2">
                <Brain className="w-3 h-3 mr-1" />
                ذكاء اصطناعي متقدم
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* التحليل الذكي بواسطة OpenAI */}
      {aiAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              التحليل الذكي بواسطة OpenAI
              <Badge variant="default" className="bg-purple-100 text-purple-800">
                <Star className="w-3 h-3 mr-1" />
                محسّن بالذكاء الاصطناعي
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* معلومات العمل */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  معلومات العمل
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">اسم العمل:</span>
                    <p className="text-blue-800">{aiAnalysis.businessInfo.name}</p>
                  </div>
                  <div>
                    <span className="font-medium">نوع العمل:</span>
                    <p className="text-blue-800">{aiAnalysis.businessInfo.type}</p>
                  </div>
                  <div>
                    <span className="font-medium">القطاع:</span>
                    <p className="text-blue-800">{aiAnalysis.businessInfo.industry}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-medium">الوصف:</span>
                    <p className="text-blue-800">{aiAnalysis.businessInfo.description}</p>
                  </div>
                </div>
              </div>

              {/* معلومات الاتصال */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  معلومات الاتصال
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiAnalysis.contactInfo.phones.length > 0 && (
                    <div>
                      <span className="font-medium">أرقام الهاتف:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {aiAnalysis.contactInfo.phones.map((phone, index) => (
                          <Badge key={index} variant="outline" className="bg-white">
                            {phone}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {aiAnalysis.contactInfo.emails.length > 0 && (
                    <div>
                      <span className="font-medium">الإيميلات:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {aiAnalysis.contactInfo.emails.map((email, index) => (
                          <Badge key={index} variant="outline" className="bg-white">
                            {email}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {aiAnalysis.contactInfo.workingHours && (
                    <div className="md:col-span-2">
                      <span className="font-medium">ساعات العمل:</span>
                      <p className="text-green-800">{aiAnalysis.contactInfo.workingHours}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* الحضور الرقمي */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-3">الحضور الرقمي</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-purple-600">متجر إلكتروني</p>
                    <p className="text-xl font-bold text-purple-900">
                      {aiAnalysis.digitalPresence.ecommerce ? 'نعم' : 'لا'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-purple-600">تطبيق جوال</p>
                    <p className="text-xl font-bold text-purple-900">
                      {aiAnalysis.digitalPresence.mobileApp ? 'نعم' : 'لا'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-purple-600">سوشال ميديا</p>
                    <p className="text-xl font-bold text-purple-900">
                      {aiAnalysis.digitalPresence.socialMedia.length}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-purple-600">خدمات رقمية</p>
                    <p className="text-xl font-bold text-purple-900">
                      {aiAnalysis.digitalPresence.onlineServices.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* التحليل التنافسي */}
              {aiAnalysis.competitiveAnalysis.strengths.length > 0 && (
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-3">التحليل التنافسي</h4>
                  <div className="space-y-3">
                    {aiAnalysis.competitiveAnalysis.strengths.length > 0 && (
                      <div>
                        <span className="font-medium text-orange-800">نقاط القوة:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {aiAnalysis.competitiveAnalysis.strengths.map((strength, index) => (
                            <Badge key={index} variant="outline" className="bg-white">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {aiAnalysis.competitiveAnalysis.services.length > 0 && (
                      <div>
                        <span className="font-medium text-orange-800">الخدمات:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {aiAnalysis.competitiveAnalysis.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="bg-white">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* النتائج الأساسية */}
      {scrapingResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              البيانات المستخرجة الأساسية
              <Badge variant={scrapingResult.success ? "default" : "destructive"}>
                {scrapingResult.success ? "تم الاستخراج بنجاح" : "فشل"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {scrapingResult.success ? (
              <div className="space-y-4">
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
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WebsiteScrapingTest;
