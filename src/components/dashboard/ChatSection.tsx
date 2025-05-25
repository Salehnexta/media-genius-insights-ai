
import React from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import { useLanguage } from '@/contexts/LanguageContext';

const ChatSection: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`h-full bg-white dark:bg-gray-900 ${isArabic ? 'rtl' : ''}`}>
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <h2 className={`text-lg font-semibold text-gray-900 dark:text-white ${isArabic ? 'text-right' : ''}`}>
          {isArabic ? 'مساعد التسويق الذكي' : 'AI Marketing Assistant'}
        </h2>
        <p className={`text-sm text-gray-500 dark:text-gray-400 mt-1 ${isArabic ? 'text-right' : ''}`}>
          {isArabic ? 'تحدث مع فريق التسويق الذكي' : 'Chat with your AI Marketing Team'}
        </p>
      </div>
      
      {/* Chat Interface */}
      <div className="h-[calc(100%-5rem)]">
        <ChatInterface isExpanded={true} />
      </div>
    </div>
  );
};

export default ChatSection;
