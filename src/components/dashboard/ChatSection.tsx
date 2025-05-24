
import React, { useState } from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MessageSquare, Minimize2, Maximize2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ChatSection: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  if (isMobile && !isExpanded) {
    return (
      <div className={`fixed bottom-4 z-50 ${isArabic ? 'left-4' : 'right-4'}`}>
        <Button
          onClick={() => setIsExpanded(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg touch-manipulation"
          style={{ minHeight: '56px', minWidth: '56px' }}
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
      </div>
    );
  }

  if (isMobile && isExpanded) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900">
        <div className="flex flex-col h-full">
          {/* Mobile Chat Header */}
          <div className={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <h2 className={`text-lg font-semibold text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'مدير التسويق الذكي' : 'AI Marketing Manager'}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="h-10 w-10 p-0 touch-manipulation"
            >
              <Minimize2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Chat Content */}
          <div className="flex-1">
            <ChatInterface isMobile={true} isExpanded={true} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm border h-[600px] ${isArabic ? 'rtl' : ''}`}>
      <div className="h-full">
        <ChatInterface isExpanded={true} />
      </div>
    </div>
  );
};

export default ChatSection;
