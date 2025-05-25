
import React from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChatSection: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <Card className={`h-[700px] ${isArabic ? 'rtl' : ''}`}>
      <CardHeader className="pb-3">
        <CardTitle className={`text-lg font-semibold ${isArabic ? 'text-right' : ''}`}>
          {isArabic ? 'مساعد التسويق الذكي' : 'AI Marketing Assistant'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-4rem)]">
        <div className="h-full">
          <ChatInterface isExpanded={true} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatSection;
