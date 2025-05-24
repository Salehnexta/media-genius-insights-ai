
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, Linkedin, Twitter, Type, Wand2, Copy, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

interface TextGeneratorProps {
  prompt: string;
  setPrompt: (value: string) => void;
  platform: string;
  setPlatform: (value: string) => void;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
  generatedContent: string;
  setGeneratedContent: (value: string) => void;
  isMobile?: boolean;
  userInfo?: string;
}

const platformPrompts = {
  twitter: "Write a short, engaging tweet about",
  instagram: "Create a captivating Instagram caption about",
  linkedin: "Write a professional LinkedIn post discussing",
  facebook: "Create an engaging Facebook post about"
};

const TextGenerator: React.FC<TextGeneratorProps> = ({
  prompt,
  setPrompt,
  platform,
  setPlatform,
  isGenerating,
  setIsGenerating,
  generatedContent,
  setGeneratedContent,
  isMobile = false,
  userInfo = ''
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const handleGenerateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يرجى إدخال موضوع للمحتوى" : "Please enter a topic for your content",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: { 
          prompt,
          platform,
          userInfo,
          language
        }
      });

      if (error) throw error;

      if (data.content) {
        setGeneratedContent(data.content);
        toast({
          title: isArabic ? "تم إنتاج المحتوى" : "Content Generated",
          description: isArabic ? `تم إنشاء محتوى ${platform}!` : `Your ${platform} content has been created!`
        });
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Content generation failed:', error);
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "فشل في إنتاج المحتوى. يرجى المحاولة مرة أخرى." : "Failed to generate content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyContent = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      toast({
        title: isArabic ? "تم النسخ!" : "Copied!",
        description: isArabic ? "تم نسخ المحتوى إلى الحافظة" : "Content copied to clipboard"
      });
    }
  };

  const platformIcons = {
    twitter: <Twitter className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />,
    facebook: <Facebook className="h-5 w-5" />
  };

  return (
    <Card className={isMobile ? 'shadow-sm' : ''}>
      <CardHeader className="pb-1 sm:pb-2">
        <CardTitle className={`${isMobile ? 'text-sm' : 'text-md'} font-medium flex items-center gap-2`}>
          <Type className="h-4 w-4 sm:h-5 sm:w-5" />
          {isArabic ? "مولد النصوص للوسائل الاجتماعية" : "Social Media Text Generator"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="twitter" onValueChange={setPlatform} className="w-full">
          <TabsList className={`w-full grid grid-cols-4 ${isMobile ? 'text-xs' : ''}`}>
            <TabsTrigger value="twitter" className="flex items-center gap-1 sm:gap-2">
              <Twitter className="h-3 w-3 sm:h-4 sm:w-4" /> 
              {!isMobile && "Twitter"}
            </TabsTrigger>
            <TabsTrigger value="instagram" className="flex items-center gap-1 sm:gap-2">
              <Instagram className="h-3 w-3 sm:h-4 sm:w-4" /> 
              {!isMobile && "Instagram"}
            </TabsTrigger>
            <TabsTrigger value="linkedin" className="flex items-center gap-1 sm:gap-2">
              <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" /> 
              {!isMobile && "LinkedIn"}
            </TabsTrigger>
            <TabsTrigger value="facebook" className="flex items-center gap-1 sm:gap-2">
              <Facebook className="h-3 w-3 sm:h-4 sm:w-4" /> 
              {!isMobile && "Facebook"}
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="content-prompt" className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                {platformPrompts[platform as keyof typeof platformPrompts]}:
              </Label>
              <div className="flex gap-2 mt-2">
                <Input 
                  id="content-prompt"
                  value={prompt} 
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={isArabic ? "أدخل موضوعك" : "Enter your topic"} 
                  className={`flex-1 ${isMobile ? 'text-xs' : 'text-sm'}`}
                  disabled={isGenerating}
                />
                <Button 
                  onClick={handleGenerateContent} 
                  disabled={isGenerating || !prompt.trim()}
                  className={isMobile ? 'text-xs px-3' : ''}
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 mr-1 sm:mr-2 animate-spin" />
                  ) : (
                    <Wand2 className="h-4 w-4 mr-1 sm:mr-2" />
                  )}
                  {isGenerating ? (isArabic ? "جاري الإنتاج..." : "Generating...") : (isArabic ? "إنتاج" : "Generate")}
                </Button>
              </div>
            </div>
            
            {generatedContent && (
              <div className="space-y-3">
                <Label className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {isArabic ? "المحتوى المُنتَج:" : "Generated Content:"}
                </Label>
                <div className="relative">
                  <Textarea 
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className={`min-h-[120px] p-4 ${isMobile ? 'text-xs' : 'text-sm'}`}
                  />
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleCopyContent}
                    className="absolute top-2 right-2"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    {isArabic ? "نسخ" : "Copy"}
                  </Button>
                </div>
                
                <div className="p-4 bg-muted rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    {platformIcons[platform as keyof typeof platformIcons]}
                    <span className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {isArabic ? "معاينة" : "Preview"}
                    </span>
                  </div>
                  <div className={`whitespace-pre-line ${isMobile ? 'text-xs' : 'text-sm'}`}>{generatedContent}</div>
                </div>
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TextGenerator;
