
import React from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import { useLanguage } from '@/contexts/LanguageContext';

const ChatSection: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`h-full bg-white dark:bg-gray-900 ${isArabic ? 'rtl' : ''}`}>
      {/* Chat Interface */}
      <div className="h-full">
        <ChatInterface isExpanded={true} />
      </div>
    </div>
  );
};

export default ChatSection;
