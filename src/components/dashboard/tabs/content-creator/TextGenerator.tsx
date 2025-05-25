
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Copy, Wand2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import SmartInput from '@/components/ui/SmartInput';
import SmartTextarea from '@/components/ui/SmartTextarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface TextGeneratorProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  platform: string;
  setPlatform: (platform: string) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
  generatedContent: string;
  setGeneratedContent: (content: string) => void;
  isMobile: boolean;
  userInfo: string;
}

const TextGenerator: React.FC<TextGeneratorProps> = ({
  prompt,
  setPrompt,
  platform,
  setPlatform,
  isGenerating,
  setIsGenerating,
  generatedContent,
  setGeneratedContent,
  isMobile,
  userInfo
}) => {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: t('ai.error'),
        description: "Please enter a content prompt",
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

      setGeneratedContent(data.content);
      toast({
        title: "Success",
        description: t('ai.success')
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error",
        description: t('ai.error'),
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: t('ai.copied'),
      description: "Content copied to clipboard"
    });
  };

  const contextData = {
    platform,
    userInfo,
    contentType: 'social_media_post'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Wand2 className="h-5 w-5" />
          {t('ai.contentGenerator')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('ai.platform')}</label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger>
              <SelectValue placeholder={t('ai.platform.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('ai.contentPrompt')}</label>
          <SmartInput
            value={prompt}
            onChange={setPrompt}
            placeholder={t('ai.contentPrompt.placeholder')}
            fieldType="content"
            context={contextData}
            className="w-full"
          />
        </div>

        <Button 
          onClick={generateContent} 
          disabled={isGenerating || !prompt.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {t('ai.generating')}
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              {t('ai.generateContent')}
            </>
          )}
        </Button>

        {generatedContent && (
          <div className="space-y-2">
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <label className="text-sm font-medium">{t('ai.generatedContent')}</label>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                {t('ai.copy')}
              </Button>
            </div>
            <SmartTextarea
              value={generatedContent}
              onChange={setGeneratedContent}
              placeholder="Generated content will appear here..."
              fieldType="content"
              context={contextData}
              rows={6}
              className="w-full"
            />
          </div>
        )}

      </CardContent>
    </Card>
  );
};

export default TextGenerator;
