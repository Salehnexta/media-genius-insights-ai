
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, Linkedin, Twitter, Type, Wand2, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TextGeneratorProps {
  prompt: string;
  setPrompt: (value: string) => void;
  platform: string;
  setPlatform: (value: string) => void;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
  generatedContent: string;
  setGeneratedContent: (value: string) => void;
}

const platformPrompts = {
  twitter: "Write a short, engaging tweet about",
  instagram: "Create a captivating Instagram caption about",
  linkedin: "Write a professional LinkedIn post discussing",
  facebook: "Create an engaging Facebook post about"
};

const mockResponses = {
  twitter: (topic: string) => `📣 Check out our latest insights on ${topic}! We're revolutionizing how businesses approach this area. Join the conversation and share your thoughts! #MarketingInsights #Innovation`,
  instagram: (topic: string) => `✨ Diving deep into ${topic} today!\n\nAt our agency, we're constantly exploring new frontiers to bring you the best strategies and insights.\n\nDouble-tap if you're as excited about this as we are!\n\n#MarketingMagic #BrandGrowth #IndustryLeaders`,
  linkedin: (topic: string) => `I'm excited to share our team's latest analysis on ${topic}.\n\nOur research has revealed some fascinating trends that are reshaping how businesses approach their marketing strategies in 2025.\n\nKey takeaways:\n• Data-driven decisions are now essential\n• Customer experience remains paramount\n• Authentic storytelling drives engagement\n\nWhat strategies are you implementing in this area? I'd love to hear your thoughts in the comments below.`,
  facebook: (topic: string) => `🔍 JUST RELEASED: Our latest findings on ${topic}!\n\nOur team has been working tirelessly to bring you cutting-edge insights that will transform your marketing approach.\n\nCheck out the full report on our website (link in bio) and let us know what you think!\n\nTag someone who needs to see this 👇`
};

const TextGenerator: React.FC<TextGeneratorProps> = ({
  prompt,
  setPrompt,
  platform,
  setPlatform,
  isGenerating,
  setIsGenerating,
  generatedContent,
  setGeneratedContent
}) => {
  const handleGenerateContent = () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic for your content",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      const response = mockResponses[platform as keyof typeof mockResponses](prompt);
      setGeneratedContent(response);
      setIsGenerating(false);
      
      toast({
        title: "Content Generated",
        description: `Your ${platform} content has been created!`
      });
    }, 1500);
  };

  const handleCopyContent = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard"
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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          <Type className="h-5 w-5" />
          Social Media Text Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="twitter" onValueChange={setPlatform} className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="twitter" className="flex items-center gap-2">
              <Twitter className="h-4 w-4" /> Twitter
            </TabsTrigger>
            <TabsTrigger value="instagram" className="flex items-center gap-2">
              <Instagram className="h-4 w-4" /> Instagram
            </TabsTrigger>
            <TabsTrigger value="linkedin" className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </TabsTrigger>
            <TabsTrigger value="facebook" className="flex items-center gap-2">
              <Facebook className="h-4 w-4" /> Facebook
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="content-prompt">
                {platformPrompts[platform as keyof typeof platformPrompts]}:
              </Label>
              <div className="flex gap-2 mt-2">
                <Input 
                  id="content-prompt"
                  value={prompt} 
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your topic" 
                  className="flex-1"
                />
                <Button 
                  onClick={handleGenerateContent} 
                  disabled={isGenerating || !prompt.trim()}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating..." : "Generate"}
                </Button>
              </div>
            </div>
            
            {generatedContent && (
              <div className="space-y-3">
                <Label>Generated Content:</Label>
                <div className="relative">
                  <Textarea 
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="min-h-[150px] p-4"
                  />
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleCopyContent}
                    className="absolute top-2 right-2"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </div>
                
                <div className="p-4 bg-muted rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    {platformIcons[platform as keyof typeof platformIcons]}
                    <span className="font-medium">Preview</span>
                  </div>
                  <div className="whitespace-pre-line text-sm">{generatedContent}</div>
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
