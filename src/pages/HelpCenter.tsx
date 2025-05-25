
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import BreadcrumbNavigation from '@/components/layout/BreadcrumbNavigation';
import BackButton from '@/components/layout/BackButton';
import { HelpCircle, Search, MessageSquare, Phone, Mail, FileText } from 'lucide-react';

const HelpCenter: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const isArabic = language === 'ar';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const faqItems = [
    {
      question: isArabic ? 'كيف أبدأ في استخدام المنصة؟' : 'How do I get started with the platform?',
      answer: isArabic ? 'يمكنك البدء بإنشاء حساب والمرور بعملية الإعداد الأولي.' : 'You can start by creating an account and going through the initial setup process.'
    },
    {
      question: isArabic ? 'كيف يمكنني تغيير خطة الاشتراك؟' : 'How can I change my subscription plan?',
      answer: isArabic ? 'يمكنك تغيير خطة الاشتراك من صفحة الفواتير.' : 'You can change your subscription plan from the billing page.'
    },
    {
      question: isArabic ? 'هل توجد خصومات للاستخدام السنوي؟' : 'Are there discounts for annual usage?',
      answer: isArabic ? 'نعم، نوفر خصم 20% للاشتراكات السنوية.' : 'Yes, we offer a 20% discount for annual subscriptions.'
    }
  ];

  const handleCreateTicket = () => {
    if (!ticketSubject || !ticketMessage) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يرجى ملء جميع الحقول" : "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate ticket creation
    toast({
      title: isArabic ? "تم بنجاح" : "Success",
      description: isArabic ? "تم إنشاء تذكرة الدعم بنجاح" : "Support ticket created successfully"
    });
    
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 p-8 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto space-y-8">
        <BreadcrumbNavigation />
        <BackButton showHome />
        
        {/* Header */}
        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={`${isArabic ? 'text-right' : ''}`}>
            <h1 className={`text-3xl font-bold ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'مركز المساعدة' : 'Help Center'}
            </h1>
            <p className={`text-gray-600 dark:text-gray-400 mt-2 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'نحن هنا لمساعدتك' : 'We are here to help you'}
            </p>
          </div>
          <HelpCircle className="h-8 w-8 text-blue-600" />
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className={`flex gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className="flex-1 relative">
                <Search className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-3 h-4 w-4 text-gray-400`} />
                <Input
                  placeholder={isArabic ? 'ابحث في المساعدة...' : 'Search help...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${isArabic ? 'pr-10 text-right' : 'pl-10'}`}
                />
              </div>
              <Button>
                <span className={isArabic ? 'font-arabic' : ''}>
                  {isArabic ? 'بحث' : 'Search'}
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
                <FileText className="h-5 w-5" />
                {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className={`border-b pb-4 ${isArabic ? 'text-right' : ''}`}>
                    <h4 className={`font-semibold mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                      {item.question}
                    </h4>
                    <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
                <MessageSquare className="h-5 w-5" />
                {isArabic ? 'تواصل مع الدعم' : 'Contact Support'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isArabic ? 'font-arabic text-right' : ''}`}>
                  {isArabic ? 'موضوع التذكرة' : 'Ticket Subject'}
                </label>
                <Input
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder={isArabic ? 'أدخل موضوع المشكلة...' : 'Enter issue subject...'}
                  className={isArabic ? 'text-right' : ''}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isArabic ? 'font-arabic text-right' : ''}`}>
                  {isArabic ? 'وصف المشكلة' : 'Issue Description'}
                </label>
                <Textarea
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder={isArabic ? 'صف المشكلة بالتفصيل...' : 'Describe your issue in detail...'}
                  rows={4}
                  className={isArabic ? 'text-right' : ''}
                />
              </div>
              
              <Button onClick={handleCreateTicket} className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                <span className={isArabic ? 'font-arabic' : ''}>
                  {isArabic ? 'إنشاء تذكرة دعم' : 'Create Support Ticket'}
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className={`${isArabic ? 'font-arabic text-right' : ''}`}>
              {isArabic ? 'معلومات التواصل' : 'Contact Information'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <p className={`font-semibold ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'الهاتف' : 'Phone'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">+966-11-123-4567</p>
                </div>
              </div>
              
              <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className={`font-semibold ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'البريد الإلكتروني' : 'Email'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">support@smartmarketing.sa</p>
                </div>
              </div>
              
              <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <div>
                  <p className={`font-semibold ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'الدردشة المباشرة' : 'Live Chat'}
                  </p>
                  <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'متاح 24/7' : 'Available 24/7'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter;
