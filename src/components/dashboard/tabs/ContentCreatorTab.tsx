import React, { useState } from 'react';
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ContentCreatorTabProps {
  chartConfig: any;
}

const contentData = [
  { name: 'Jan', "Blog Posts": 12, "Videos": 8, "Images": 24, "Podcasts": 4 },
  { name: 'Feb', "Blog Posts": 15, "Videos": 10, "Images": 28, "Podcasts": 6 },
  { name: 'Mar', "Blog Posts": 18, "Videos": 12, "Images": 32, "Podcasts": 8 },
  { name: 'Apr', "Blog Posts": 14, "Videos": 9, "Images": 26, "Podcasts": 5 },
  { name: 'May', "Blog Posts": 16, "Videos": 11, "Images": 30, "Podcasts": 7 },
  { name: 'Jun', "Blog Posts": 20, "Videos": 14, "Images": 34, "Podcasts": 9 }
];

const engagementData = [
  { name: 'Jan', "Likes": 320, "Comments": 180, "Shares": 90 },
  { name: 'Feb', "Likes": 380, "Comments": 210, "Shares": 110 },
  { name: 'Mar', "Likes": 420, "Comments": 240, "Shares": 130 },
  { name: 'Apr', "Likes": 450, "Comments": 260, "Shares": 140 },
  { name: 'May', "Likes": 480, "Comments": 290, "Shares": 160 },
  { name: 'Jun', "Likes": 520, "Comments": 320, "Shares": 180 }
];

const contentQualityData = [
  { name: "SEO Score", value: 78 },
  { name: "Readability", value: 85 },
  { name: "Engagement", value: 72 },
  { name: "Originality", value: 90 }
];

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* New Content Creator Area */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Social Media Content Creator</CardTitle>
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
                <p className="text-sm text-muted-foreground mb-2">
                  {platformPrompts[platform as keyof typeof platformPrompts]}:
                </p>
                <div className="flex gap-2">
                  <Input 
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your topic" 
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleGenerateContent} 
                    disabled={isGenerating || !prompt.trim()}
                  >
                    {isGenerating ? "Generating..." : "Generate"}
                  </Button>
                </div>
              </div>
              
              {generatedContent && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Generated Content:</p>
                  <div className="relative">
                    <Textarea 
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                      className="min-h-[150px] p-4"
                    />
                    <div className="absolute top-2 right-2">
                      <Button size="sm" variant="outline" onClick={handleCopyContent}>
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-md">
                    <div className="flex items-center gap-2">
                      {platformIcons[platform as keyof typeof platformIcons]}
                      <span className="font-medium">Preview</span>
                    </div>
                    <div className="mt-2 whitespace-pre-line">{generatedContent}</div>
                  </div>
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Keep existing chart components */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Content Production</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.BarChart data={contentData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Bar dataKey="Blog Posts" fill="#4285F4" />
              <RechartsPrimitive.Bar dataKey="Videos" fill="#34A853" />
              <RechartsPrimitive.Bar dataKey="Images" fill="#FBBC05" />
              <RechartsPrimitive.Bar dataKey="Podcasts" fill="#EA4335" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Content Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.LineChart data={engagementData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Line type="monotone" dataKey="Likes" stroke="#4285F4" />
              <RechartsPrimitive.Line type="monotone" dataKey="Comments" stroke="#34A853" />
              <RechartsPrimitive.Line type="monotone" dataKey="Shares" stroke="#FBBC05" />
            </RechartsPrimitive.LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Content Quality Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="80%" 
              data={contentQualityData}>
              <RechartsPrimitive.PolarGrid />
              <RechartsPrimitive.PolarAngleAxis dataKey="name" />
              <RechartsPrimitive.PolarRadiusAxis angle={30} domain={[0, 100]} />
              <RechartsPrimitive.Radar name="Quality Score" dataKey="value" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.6} />
              <RechartsPrimitive.Tooltip />
            </RechartsPrimitive.RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Content Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.PieChart>
              <RechartsPrimitive.Pie
                data={[
                  { name: 'Website', value: 35 },
                  { name: 'Social Media', value: 40 },
                  { name: 'Email', value: 15 },
                  { name: 'Partners', value: 10 }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                dataKey="value"
              />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
            </RechartsPrimitive.PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Content Performance by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.AreaChart data={contentData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Area type="monotone" dataKey="Blog Posts" stroke="#4285F4" fill="#4285F4" fillOpacity={0.6} />
              <RechartsPrimitive.Area type="monotone" dataKey="Videos" stroke="#34A853" fill="#34A853" fillOpacity={0.6} />
              <RechartsPrimitive.Area type="monotone" dataKey="Images" stroke="#FBBC05" fill="#FBBC05" fillOpacity={0.6} />
            </RechartsPrimitive.AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Audience Response</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.ComposedChart data={engagementData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Bar dataKey="Comments" fill="#7E69AB" />
              <RechartsPrimitive.Line type="monotone" dataKey="Shares" stroke="#EA4335" />
            </RechartsPrimitive.ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Publishing Frequency</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.BarChart data={contentData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Bar dataKey="Blog Posts" fill="#9b87f5" />
              <RechartsPrimitive.Bar dataKey="Videos" fill="#6E59A5" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Content ROI</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <RechartsPrimitive.LineChart data={contentData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Line type="monotone" dataKey="Blog Posts" stroke="#4285F4" />
              <RechartsPrimitive.Line type="monotone" dataKey="Videos" stroke="#EA4335" />
            </RechartsPrimitive.LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCreatorTab;
