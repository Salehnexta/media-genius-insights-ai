
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageSquare, Maximize2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import EnhancedChatInterface from '@/components/chat/EnhancedChatInterface';

interface EnhancedChatSectionProps {
  currentMetrics?: any;
}

const EnhancedChatSection: React.FC<EnhancedChatSectionProps> = ({ currentMetrics }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  if (isMobile) {
    return (
      <>
        {/* Mobile Floating Chat Button */}
        <div className={`fixed bottom-6 z-50 ${isArabic ? 'left-6' : 'right-6'}`}>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
                style={{ minHeight: '56px', minWidth: '56px' }}
              >
                <MessageSquare className="h-6 w-6 text-white" />
              </Button>
            </DialogTrigger>
            <DialogContent className={`max-w-full h-[90vh] w-[95vw] p-0 ${isArabic ? 'rtl' : ''}`}>
              <DialogHeader className="p-4 pb-0">
                <DialogTitle className={isArabic ? 'text-right' : ''}>
                  {isArabic ? 'مدير التسويق الذكي' : 'AI Marketing Manager'}
                </DialogTitle>
              </DialogHeader>
              <div className="flex-1 p-4 pt-0">
                <EnhancedChatInterface 
                  isExpanded={true}
                  currentMetrics={currentMetrics}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Bottom Chat Bar */}
        {!isModalOpen && (
          <div className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t p-4 z-40 ${isArabic ? 'rtl' : ''}`}>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <div className={isArabic ? 'text-right' : ''}>
                  <p className="font-medium text-sm">
                    {isArabic ? 'مدير التسويق الذكي' : 'AI Marketing Manager'}
                  </p>
                  <p className="text-xs text-gray-600">
                    {isArabic ? 'مستعد لمساعدتك' : 'Ready to help'}
                  </p>
                </div>
              </div>
              <Button onClick={() => setIsModalOpen(true)}>
                {isArabic ? 'بدء المحادثة' : 'Start Chat'}
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm border ${isArabic ? 'rtl' : ''}`}>
      <div className="h-full">
        <EnhancedChatInterface 
          isExpanded={isExpanded}
          onToggleExpanded={() => setIsExpanded(!isExpanded)}
          currentMetrics={currentMetrics}
        />
      </div>
    </div>
  );
};

export default EnhancedChatSection;
