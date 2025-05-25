
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageIcon, Wand2, Download, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

interface ImageGeneratorProps {
  imagePrompt: string;
  setImagePrompt: (value: string) => void;
  imageStyle: string;
  setImageStyle: (value: string) => void;
  isGeneratingImage: boolean;
  setIsGeneratingImage: (value: boolean) => void;
  generatedImage: string;
  setGeneratedImage: (value: string) => void;
  isMobile?: boolean;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  imagePrompt,
  setImagePrompt,
  imageStyle,
  setImageStyle,
  isGeneratingImage,
  setIsGeneratingImage,
  generatedImage,
  setGeneratedImage,
  isMobile = false
}) => {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: t('error.image.description'),
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingImage(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { 
          prompt: imagePrompt,
          style: imageStyle,
          size: '1024x1024'
        }
      });

      if (error) throw error;

      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        toast({
          title: t('success.image.generated'),
          description: t('success.image.message')
        });
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Image generation failed:', error);
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "فشل في إنتاج الصورة. يرجى المحاولة مرة أخرى." : "Failed to generate image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleDownloadImage = async () => {
    if (generatedImage) {
      try {
        const response = await fetch(generatedImage);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ai-generated-image-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        toast({
          title: t('success.downloaded'),
          description: t('success.download.message')
        });
      } catch (error) {
        toast({
          title: isArabic ? "خطأ" : "Error",
          description: isArabic ? "فشل في تحميل الصورة" : "Failed to download image",
          variant: "destructive"
        });
      }
    }
  };

  const styleOptions = [
    { value: 'realistic', label: t('style.realistic') },
    { value: 'illustration', label: t('style.illustration') },
    { value: 'cartoon', label: t('style.cartoon') },
    { value: 'abstract', label: t('style.abstract') },
    { value: 'minimalist', label: t('style.minimalist') }
  ];

  return (
    <Card className={isMobile ? 'shadow-sm' : ''}>
      <CardHeader className="pb-1 sm:pb-2">
        <CardTitle className={`${isMobile ? 'text-sm' : 'text-sm sm:text-md'} font-medium flex items-center gap-2`}>
          <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          {t('content.image.generator')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="image-prompt" className={`${isMobile ? 'text-xs' : 'text-sm'}`}>{t('content.image.description')}</Label>
                <Textarea
                  id="image-prompt"
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder={t('content.image.placeholder')}
                  className={`min-h-[60px] ${isMobile ? 'text-xs' : 'text-sm'} sm:min-h-[80px]`}
                  disabled={isGeneratingImage}
                />
              </div>
              
              <div>
                <Label htmlFor="image-style" className={`${isMobile ? 'text-xs' : 'text-sm'}`}>{t('content.image.style')}</Label>
                <select
                  id="image-style"
                  value={imageStyle}
                  onChange={(e) => setImageStyle(e.target.value)}
                  disabled={isGeneratingImage}
                  className={`w-full p-2 border border-input rounded-md bg-background ${isMobile ? 'text-xs' : 'text-sm'} disabled:opacity-50`}
                >
                  {styleOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <Button 
                onClick={handleGenerateImage} 
                disabled={isGeneratingImage || !imagePrompt.trim()}
                className={`w-full ${isMobile ? 'text-xs' : 'text-sm'}`}
                size="sm"
              >
                {isGeneratingImage ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4 mr-2" />
                )}
                {isGeneratingImage ? t('content.image.generating') : t('content.image.generate')}
              </Button>
            </div>
            
            <div className="space-y-3">
              {generatedImage ? (
                <div className="space-y-3">
                  <Label className={`${isMobile ? 'text-xs' : 'text-sm'}`}>Generated Image</Label>
                  <div className="relative">
                    <img
                      src={generatedImage}
                      alt={t('content.image.alt')}
                      className="w-full h-48 sm:h-64 object-cover rounded-lg border"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleDownloadImage}
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                    >
                      <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 sm:h-64 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 opacity-50" />
                    <p className={`${isMobile ? 'text-xs' : 'text-xs sm:text-sm'}`}>{t('content.image.placeholder.text')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageGenerator;
