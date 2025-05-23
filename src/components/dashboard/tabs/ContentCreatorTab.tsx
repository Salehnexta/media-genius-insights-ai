
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Facebook, Instagram, Linkedin, Twitter, ImageIcon, Type, Wand2, Download, Copy, CalendarDays } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ContentCreatorTabProps {
  chartConfig: any;
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

const ContentCreatorTab: React.FC<ContentCreatorTabProps> = ({ chartConfig }) => {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  
  // Image generation states
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageStyle, setImageStyle] = useState("realistic");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [userInfo, setUserInfo] = useState("");

  // Calendar states
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [scheduledPosts, setScheduledPosts] = useState<{[key: string]: any[]}>({});

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

  const handleGenerateImage = () => {
    if (!imagePrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description for your image",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingImage(true);
    
    // Simulate image generation with user info
    setTimeout(() => {
      const mockImageUrl = `https://picsum.photos/512/512?random=${Date.now()}`;
      setGeneratedImage(mockImageUrl);
      setIsGeneratingImage(false);
      
      toast({
        title: "Image Generated",
        description: "Your AI image has been created with user context!"
      });
    }, 2000);
  };

  const handleSchedulePost = () => {
    if (!selectedDate || !generatedContent) {
      toast({
        title: "Error",
        description: "Please select a date and generate content first",
        variant: "destructive"
      });
      return;
    }

    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const newPost = {
      id: Date.now(),
      content: generatedContent,
      platform,
      image: generatedImage,
      time: format(new Date(), "HH:mm")
    };

    setScheduledPosts(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newPost]
    }));

    toast({
      title: "Post Scheduled",
      description: `Your ${platform} post has been scheduled for ${format(selectedDate, "PPP")}`
    });
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

  const handleDownloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `social-media-image-${Date.now()}.jpg`;
      link.click();
      
      toast({
        title: "Downloaded!",
        description: "Image downloaded successfully"
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
    <div className="p-4 h-full overflow-y-auto">
      <div className="space-y-6 max-w-full">
        
        {/* User Information */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="user-info">Tell AI about yourself/brand</Label>
              <Textarea
                id="user-info"
                value={userInfo}
                onChange={(e) => setUserInfo(e.target.value)}
                placeholder="Describe your brand, target audience, tone of voice, and any specific requirements for content generation..."
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Publishing Calendar */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Publishing Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label>Select Publishing Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                
                <Button 
                  onClick={handleSchedulePost}
                  disabled={!selectedDate || !generatedContent}
                  className="w-full"
                >
                  Schedule Post
                </Button>
              </div>
              
              <div className="space-y-3">
                <Label>Scheduled Posts</Label>
                <div className="max-h-48 overflow-y-auto border rounded-md p-2">
                  {Object.entries(scheduledPosts).length === 0 ? (
                    <p className="text-muted-foreground text-sm">No posts scheduled yet</p>
                  ) : (
                    Object.entries(scheduledPosts).map(([date, posts]) => (
                      <div key={date} className="mb-3">
                        <p className="font-medium text-sm">{format(new Date(date), "PPP")}</p>
                        {posts.map((post) => (
                          <div key={post.id} className="text-xs text-muted-foreground ml-2">
                            {platformIcons[post.platform as keyof typeof platformIcons]} {post.platform} at {post.time}
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Image Generator */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              AI Image Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="image-prompt">Image Description</Label>
                    <Textarea
                      id="image-prompt"
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      placeholder="Describe the image you want to generate (e.g., 'A modern office space with people collaborating')"
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="image-style">Style</Label>
                    <select
                      id="image-style"
                      value={imageStyle}
                      onChange={(e) => setImageStyle(e.target.value)}
                      className="w-full p-2 border border-input rounded-md bg-background"
                    >
                      <option value="realistic">Realistic</option>
                      <option value="illustration">Illustration</option>
                      <option value="cartoon">Cartoon</option>
                      <option value="abstract">Abstract</option>
                      <option value="minimalist">Minimalist</option>
                    </select>
                  </div>
                  
                  <Button 
                    onClick={handleGenerateImage} 
                    disabled={isGeneratingImage || !imagePrompt.trim()}
                    className="w-full"
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    {isGeneratingImage ? "Generating Image..." : "Generate Image"}
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {generatedImage ? (
                    <div className="space-y-3">
                      <Label>Generated Image</Label>
                      <div className="relative">
                        <img
                          src={generatedImage}
                          alt="Generated social media image"
                          className="w-full h-64 object-cover rounded-lg border"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleDownloadImage}
                          className="absolute top-2 right-2"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-64 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Generated image will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Text Generator */}
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

      </div>
    </div>
  );
};

export default ContentCreatorTab;
