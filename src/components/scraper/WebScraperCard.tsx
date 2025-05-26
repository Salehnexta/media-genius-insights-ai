
import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Brain, 
  HelpCircle, 
  Database, 
  FileText, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import { EnhancedScrapingService, EnhancedScrapedData } from '../../services/enhancedScrapingService';
import { useToast } from '@/hooks/use-toast';

interface WebScraperCardProps {
  className?: string;
}

export const WebScraperCard: React.FC<WebScraperCardProps> = ({ className }) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const isArabic = language === 'ar';

  const [url, setUrl] = useState('https://www.amazon.sa/');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EnhancedScrapedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'analysis' | 'questions' | 'structured' | 'raw'>('analysis');

  const enhancedService = new EnhancedScrapingService();

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      setError(isArabic ? 'يرجى إدخال رابط الموقع' : 'Please enter a website URL');
      return;
    }

    if (!user) {
      toast({
        title: isArabic ? "خطأ في المصادقة" : "Authentication Error",
        description: isArabic ? "يرجى تسجيل الدخول أولاً" : "Please log in first",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const scrapingResult = await enhancedService.scrapeAndAnalyze(url);
      
      if (scrapingResult.success && scrapingResult.data) {
        setResult(scrapingResult.data);
        toast({
          title: isArabic ? "تم التحليل بنجاح!" : "Analysis Complete!",
          description: isArabic ? "تم استخراج وتحليل البيانات بواسطة الذكاء الاصطناعي" : "Data extracted and analyzed using AI",
        });
      } else {
        setError(scrapingResult.error || (isArabic ? 'فشل في استرداد البيانات' : 'Failed to scrape data'));
      }
    } catch (err) {
      setError(isArabic ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const renderTabContent = () => {
    if (!result) return null;

    const tabs = {
      analysis: {
        icon: <Brain className="h-4 w-4" />,
        title: isArabic ? 'التحليل الذكي' : 'AI Analysis',
        content: result.aiAnalysis || (isArabic ? 'لا يوجد تحليل متاح' : 'No analysis available'),
        bgColor: 'bg-blue-50 dark:bg-blue-950/20',
        borderColor: 'border-blue-200 dark:border-blue-800'
      },
      questions: {
        icon: <HelpCircle className="h-4 w-4" />,
        title: isArabic ? 'أسئلة مقترحة' : 'Suggested Questions',
        content: result.aiQuestions || (isArabic ? 'لا توجد أسئلة متاحة' : 'No questions available'),
        bgColor: 'bg-green-50 dark:bg-green-950/20',
        borderColor: 'border-green-200 dark:border-green-800'
      },
      structured: {
        icon: <Database className="h-4 w-4" />,
        title: isArabic ? 'البيانات المنظمة' : 'Structured Data',
        content: result.structuredData ? JSON.stringify(result.structuredData, null, 2) : '{}',
        bgColor: 'bg-purple-50 dark:bg-purple-950/20',
        borderColor: 'border-purple-200 dark:border-purple-800'
      },
      raw: {
        icon: <FileText className="h-4 w-4" />,
        title: isArabic ? 'المحتوى الخام' : 'Raw Content',
        content: result.rawContent.substring(0, 2000) + '...',
        bgColor: 'bg-gray-50 dark:bg-gray-950/20',
        borderColor: 'border-gray-200 dark:border-gray-800'
      }
    };

    const currentTab = tabs[activeTab];

    return (
      <div className={`p-4 rounded-lg border ${currentTab.bgColor} ${currentTab.borderColor}`}>
        <div className="flex items-center gap-2 mb-3">
          {currentTab.icon}
          <h4 className="text-lg font-semibold">{currentTab.title}</h4>
        </div>
        <div className="whitespace-pre-wrap text-sm">
          {activeTab === 'structured' ? (
            <pre className="overflow-auto max-h-64 bg-white dark:bg-gray-800 p-3 rounded border text-xs">
              {currentTab.content}
            </pre>
          ) : (
            <div className="max-h-64 overflow-auto">
              {currentTab.content}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          {isArabic ? 'تحليل المواقع بالذكاء الاصطناعي' : 'AI Website Analysis'}
        </CardTitle>
        <CardDescription>
          {isArabic 
            ? 'استخرج وحلل محتوى أي موقع إلكتروني باستخدام الذكاء الاصطناعي'
            : 'Extract and analyze content from any website using AI'
          }
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* نموذج الإدخال */}
        <form onSubmit={handleScrape} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={isArabic ? "أدخل رابط الموقع..." : "Enter website URL..."}
              className="flex-1"
              disabled={loading}
              required
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="min-w-[120px]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {isArabic ? 'جاري التحليل...' : 'Analyzing...'}
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  {isArabic ? 'تحليل' : 'Analyze'}
                </>
              )}
            </Button>
          </div>
        </form>

        {/* رسائل الخطأ */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* النتائج */}
        {result && (
          <div className="space-y-4">
            {/* معلومات أساسية */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                {getStatusIcon(result.status)}
                <span className="text-sm font-medium truncate max-w-[300px]">
                  {result.url}
                </span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {result.processingTime}ms
              </Badge>
            </div>

            {/* التبويبات */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="analysis" className="text-xs">
                  <Brain className="h-3 w-3 mr-1" />
                  {isArabic ? 'تحليل' : 'Analysis'}
                </TabsTrigger>
                <TabsTrigger value="questions" className="text-xs">
                  <HelpCircle className="h-3 w-3 mr-1" />
                  {isArabic ? 'أسئلة' : 'Questions'}
                </TabsTrigger>
                <TabsTrigger value="structured" className="text-xs">
                  <Database className="h-3 w-3 mr-1" />
                  {isArabic ? 'بيانات' : 'Data'}
                </TabsTrigger>
                <TabsTrigger value="raw" className="text-xs">
                  <FileText className="h-3 w-3 mr-1" />
                  {isArabic ? 'خام' : 'Raw'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-4">
                {renderTabContent()}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
