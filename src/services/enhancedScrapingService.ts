
import { supabase } from '@/integrations/supabase/client';

export interface EnhancedScrapedData {
  url: string;
  status: 'success' | 'failed' | 'processing';
  rawContent: string;
  aiAnalysis?: string;
  aiQuestions?: string;
  structuredData?: any;
  processingTime: number;
  scrapedAt: string;
}

export interface ScrapingResult {
  success: boolean;
  data?: EnhancedScrapedData;
  error?: string;
}

export class EnhancedScrapingService {
  private static readonly RAPIDAPI_KEY = 'df76b9a44emshdfe1a42c0a600ffp192615jsn9f5f9489bf3b';
  private static readonly RAPIDAPI_HOST = 'scrapeninja.p.rapidapi.com';

  async scrapeAndAnalyze(url: string): Promise<ScrapingResult> {
    const startTime = Date.now();
    
    try {
      // مرحلة 1: استخراج المحتوى الخام
      const scrapingResult = await this.scrapeWebsite(url);
      if (!scrapingResult.success) {
        return scrapingResult;
      }

      const rawContent = scrapingResult.data?.rawContent || '';
      
      // مرحلة 2: التحليل بواسطة OpenAI
      const aiAnalysis = await this.analyzeWithAI(rawContent, url);
      const aiQuestions = await this.generateQuestions(rawContent, url);
      const structuredData = await this.extractStructuredData(rawContent, url);
      
      const processingTime = Date.now() - startTime;
      
      const enhancedData: EnhancedScrapedData = {
        url,
        status: 'success',
        rawContent: rawContent.substring(0, 5000), // أول 5000 حرف
        aiAnalysis,
        aiQuestions,
        structuredData,
        processingTime,
        scrapedAt: new Date().toISOString()
      };

      // حفظ في قاعدة البيانات
      await this.saveToDatabase(enhancedData);

      return {
        success: true,
        data: enhancedData
      };

    } catch (error) {
      console.error('خطأ في العملية المحسنة:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'خطأ غير معروف'
      };
    }
  }

  private async scrapeWebsite(url: string): Promise<ScrapingResult> {
    try {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      const response = await fetch('https://scrapeninja.p.rapidapi.com/scrape-js', {
        method: 'POST',
        headers: {
          'X-RapidAPI-Key': EnhancedScrapingService.RAPIDAPI_KEY,
          'X-RapidAPI-Host': EnhancedScrapingService.RAPIDAPI_HOST,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: url,
          geo: 'us',
          js: true,
          premium: true
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const htmlContent = data.body || data.html || '';
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      const textContent = doc.body?.textContent?.replace(/\s+/g, ' ').trim() || '';

      return {
        success: true,
        data: {
          url,
          status: 'success',
          rawContent: textContent,
          processingTime: 0,
          scrapedAt: new Date().toISOString()
        }
      };

    } catch (error) {
      console.error('خطأ في الاستخراج:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'خطأ في الاستخراج'
      };
    }
  }

  private async analyzeWithAI(rawContent: string, url: string): Promise<string> {
    try {
      const analysisPrompt = `
قم بتحليل المحتوى التالي للموقع وأعطني ملخصاً شاملاً:

الموقع: ${url}
المحتوى: ${rawContent.substring(0, 2000)}...

أريد تحليلاً يتضمن:
- نوع الموقع ومجال العمل
- الهدف الرئيسي من الموقع
- الجمهور المستهدف
- نقاط القوة والضعف
- التوصيات للتحسين

أجب باللغة العربية وكن مفصلاً ومفيداً.`;

      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message: analysisPrompt,
          context: 'content',
          language: 'ar'
        }
      });

      if (error) throw error;

      return data.response || 'لا يوجد تحليل متاح';
    } catch (error) {
      console.error('خطأ في التحليل:', error);
      return 'فشل في إنشاء التحليل';
    }
  }

  private async generateQuestions(rawContent: string, url: string): Promise<string> {
    try {
      const questionsPrompt = `
بناءً على محتوى الموقع التالي، اقترح 5-7 أسئلة مفيدة يمكن أن يطرحها المستخدم لفهم الموقع بشكل أفضل:

الموقع: ${url}
المحتوى: ${rawContent.substring(0, 2000)}...

اجعل الأسئلة:
- واضحة ومباشرة
- تغطي جوانب مختلفة من الموقع
- مفيدة للتحليل التسويقي
- باللغة العربية

ضع كل سؤال في سطر منفصل مع رقم.`;

      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message: questionsPrompt,
          context: 'content',
          language: 'ar'
        }
      });

      if (error) throw error;

      return data.response || 'لا توجد أسئلة متاحة';
    } catch (error) {
      console.error('خطأ في توليد الأسئلة:', error);
      return 'فشل في إنشاء الأسئلة';
    }
  }

  private async extractStructuredData(rawContent: string, url: string): Promise<any> {
    try {
      const structuredPrompt = `
استخرج البيانات المنظمة من محتوى الموقع التالي وأعطني النتيجة بصيغة JSON:

الموقع: ${url}
المحتوى: ${rawContent.substring(0, 2000)}...

أريد JSON يحتوي على:
{
  "title": "عنوان الموقع",
  "description": "وصف مختصر",
  "category": "فئة الموقع",
  "language": "اللغة",
  "contact": {
    "email": "البريد الإلكتروني إن وجد",
    "phone": "رقم الهاتف إن وجد"
  },
  "social": ["قائمة المنصات الاجتماعية"],
  "keywords": ["كلمات مفتاحية مهمة"],
  "features": ["ميزات رئيسية للموقع"]
}

أعطني JSON صحيح فقط بدون تفسير إضافي.`;

      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message: structuredPrompt,
          context: 'content',
          language: 'ar'
        }
      });

      if (error) throw error;

      try {
        const jsonMatch = data.response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        return {};
      } catch {
        return {
          title: "غير متاح",
          description: "لم يتم استخراج البيانات المنظمة",
          category: "غير محدد"
        };
      }
    } catch (error) {
      console.error('خطأ في استخراج البيانات المنظمة:', error);
      return {};
    }
  }

  private async saveToDatabase(data: EnhancedScrapedData): Promise<void> {
    try {
      const { error } = await supabase
        .from('website_analysis')
        .upsert({
          website_url: data.url,
          analysis_data: {
            aiAnalysis: data.aiAnalysis,
            aiQuestions: data.aiQuestions,
            structuredData: data.structuredData,
            rawContent: data.rawContent,
            processingTime: data.processingTime,
            enhanced: true
          },
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('خطأ في حفظ البيانات:', error);
      }
    } catch (error) {
      console.error('خطأ في حفظ قاعدة البيانات:', error);
    }
  }
}
