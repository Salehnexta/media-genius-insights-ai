
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useLanguage } from '@/contexts/LanguageContext';

interface ScheduledPost {
  id: number;
  content: string;
  platform: string;
  image: string;
  time: string;
}

interface PublishingCalendarProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  scheduledPosts: {[key: string]: ScheduledPost[]};
  setScheduledPosts: React.Dispatch<React.SetStateAction<{[key: string]: ScheduledPost[]}>>;
  generatedContent: string;
  platform: string;
  generatedImage: string;
  isMobile?: boolean;
}

const PublishingCalendar: React.FC<PublishingCalendarProps> = ({
  selectedDate,
  setSelectedDate,
  scheduledPosts,
  setScheduledPosts,
  generatedContent,
  platform,
  generatedImage,
  isMobile = false
}) => {
  const { t } = useLanguage();

  const platformIcons = {
    twitter: <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />,
    instagram: <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />,
    linkedin: <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />,
    facebook: <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
  };

  const handleSchedulePost = () => {
    if (!selectedDate || !generatedContent) {
      toast({
        title: "Error",
        description: t('error.date.content'),
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
      title: t('success.post.scheduled'),
      description: t('success.post.message').replace('{platform}', platform).replace('{date}', format(selectedDate, "PPP"))
    });
  };

  return (
    <Card className={isMobile ? 'shadow-sm' : ''}>
      <CardHeader className="pb-1 sm:pb-2">
        <CardTitle className={`${isMobile ? 'text-sm' : 'text-sm sm:text-md'} font-medium flex items-center gap-2`}>
          <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" />
          {t('content.calendar')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label className={`${isMobile ? 'text-xs' : 'text-sm'}`}>{t('content.calendar.date')}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    `w-full justify-start text-left font-normal ${isMobile ? 'text-xs' : 'text-sm'}`,
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : t('content.calendar.pick')}
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
              className={`w-full ${isMobile ? 'text-xs' : 'text-sm'}`}
              size="sm"
            >
              {t('content.calendar.schedule')}
            </Button>
          </div>
          
          <div className="space-y-3">
            <Label className={`${isMobile ? 'text-xs' : 'text-sm'}`}>{t('content.calendar.scheduled')}</Label>
            <div className="max-h-32 sm:max-h-48 overflow-y-auto border rounded-md p-2">
              {Object.entries(scheduledPosts).length === 0 ? (
                <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-xs sm:text-sm'}`}>{t('content.calendar.no.posts')}</p>
              ) : (
                Object.entries(scheduledPosts).map(([date, posts]) => (
                  <div key={date} className="mb-3">
                    <p className={`font-medium ${isMobile ? 'text-xs' : 'text-xs sm:text-sm'}`}>{format(new Date(date), "PPP")}</p>
                    {posts.map((post) => (
                      <div key={post.id} className="text-xs text-muted-foreground ml-2 flex items-center gap-1">
                        {platformIcons[post.platform as keyof typeof platformIcons]} 
                        <span className="truncate">{post.platform} at {post.time}</span>
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
  );
};

export default PublishingCalendar;
