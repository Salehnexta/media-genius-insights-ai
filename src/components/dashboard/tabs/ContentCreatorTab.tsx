import React, { useState, useEffect } from 'react';
import UserInfoSection from './content-creator/UserInfoSection';
import PublishingCalendar from './content-creator/PublishingCalendar';
import ImageGenerator from './content-creator/ImageGenerator';
import TextGenerator from './content-creator/TextGenerator';

interface ContentCreatorTabProps {
  chartConfig: any;
}

interface ScheduledPost {
  id: number;
  content: string;
  platform: string;
  image: string;
  time: string;
}

const ContentCreatorTab: React.FC<ContentCreatorTabProps> = ({ chartConfig }) => {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  
  // Image generation states
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageStyle, setImageStyle] = useState("realistic");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [userInfo, setUserInfo] = useState("");

  // Calendar states
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [scheduledPosts, setScheduledPosts] = useState<{[key: string]: ScheduledPost[]}>({});

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="p-2 sm:p-4 h-full overflow-y-auto">
      <div className="space-y-4 sm:space-y-6 max-w-full">
        
        <UserInfoSection 
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isMobile={isMobile}
        />

        <PublishingCalendar 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          scheduledPosts={scheduledPosts}
          setScheduledPosts={setScheduledPosts}
          generatedContent={generatedContent}
          platform={platform}
          generatedImage={generatedImage}
          isMobile={isMobile}
        />

        <ImageGenerator 
          imagePrompt={imagePrompt}
          setImagePrompt={setImagePrompt}
          imageStyle={imageStyle}
          setImageStyle={setImageStyle}
          isGeneratingImage={isGeneratingImage}
          setIsGeneratingImage={setIsGeneratingImage}
          generatedImage={generatedImage}
          setGeneratedImage={setGeneratedImage}
          isMobile={isMobile}
        />

        <TextGenerator 
          prompt={prompt}
          setPrompt={setPrompt}
          platform={platform}
          setPlatform={setPlatform}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
          generatedContent={generatedContent}
          setGeneratedContent={setGeneratedContent}
          isMobile={isMobile}
          userInfo={userInfo}
        />

      </div>
    </div>
  );
};

export default ContentCreatorTab;
