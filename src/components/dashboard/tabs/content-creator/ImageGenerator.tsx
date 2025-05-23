
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageIcon, Wand2, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ImageGeneratorProps {
  imagePrompt: string;
  setImagePrompt: (value: string) => void;
  imageStyle: string;
  setImageStyle: (value: string) => void;
  isGeneratingImage: boolean;
  setIsGeneratingImage: (value: boolean) => void;
  generatedImage: string;
  setGeneratedImage: (value: string) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  imagePrompt,
  setImagePrompt,
  imageStyle,
  setImageStyle,
  isGeneratingImage,
  setIsGeneratingImage,
  generatedImage,
  setGeneratedImage
}) => {
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

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm sm:text-md font-medium flex items-center gap-2">
          <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          AI Image Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="image-prompt" className="text-sm">Image Description</Label>
                <Textarea
                  id="image-prompt"
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Describe the image you want to generate (e.g., 'A modern office space with people collaborating')"
                  className="min-h-[80px] sm:min-h-[100px] text-sm"
                />
              </div>
              
              <div>
                <Label htmlFor="image-style" className="text-sm">Style</Label>
                <select
                  id="image-style"
                  value={imageStyle}
                  onChange={(e) => setImageStyle(e.target.value)}
                  className="w-full p-2 border border-input rounded-md bg-background text-sm"
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
                className="w-full text-sm"
                size="sm"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                {isGeneratingImage ? "Generating Image..." : "Generate Image"}
              </Button>
            </div>
            
            <div className="space-y-3">
              {generatedImage ? (
                <div className="space-y-3">
                  <Label className="text-sm">Generated Image</Label>
                  <div className="relative">
                    <img
                      src={generatedImage}
                      alt="Generated social media image"
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
                    <p className="text-xs sm:text-sm">Generated image will appear here</p>
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
