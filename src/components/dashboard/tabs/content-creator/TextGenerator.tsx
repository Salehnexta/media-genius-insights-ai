
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Copy, Wand2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import SmartInput from '@/components/ui/SmartInput';
import SmartTextarea from '@/components/ui/SmartTextarea';

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

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
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
          language: 'en' 
        }
      });

      if (error) throw error;

      setGeneratedContent(data.content);
      toast({
        title: "Success",
        description: "Content generated successfully!"
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied!",
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
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          AI Content Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Platform</label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
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
          <label className="text-sm font-medium">Content Prompt</label>
          <SmartInput
            value={prompt}
            onChange={setPrompt}
            placeholder="Describe the content you want to create..."
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
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Content
            </>
          )}
        </Button>

        {generatedContent && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Generated Content</label>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
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
