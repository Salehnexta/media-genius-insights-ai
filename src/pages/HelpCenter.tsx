
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Book, 
  Video, 
  Mail,
  Phone,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

const HelpCenter: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const isArabic = language === 'ar';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [supportTicket, setSupportTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium'
  });

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: isArabic ? 'كيف أقوم بإنشاء حملة تسويقية جديدة؟' : 'How do I create a new marketing campaign?',
      answer: isArabic 
        ? 'لإنشاء حملة جديدة، انتقل إلى قسم الحملات واضغط على "إنشاء حملة جديدة". ثم اتبع الخطوات لتحديد الهدف والجمهور والميزانية.'
        : 'To create a new campaign, navigate to the Campaigns section and click "Create New Campaign". Then follow the steps to define your goal, audience, and budget.',
      category: isArabic ? 'الحملات' : 'Campaigns',
      helpful: 15
    },
    {
      id: '2',
      question: isArabic ? 'كيف أقوم بربط حساباتي على وسائل التواصل الاجتماعي؟' : 'How do I connect my social media accounts?',
      answer: isArabic 
        ? 'انتقل إلى الإعدادات > ربط الحسابات، واختر المنصة التي تريد ربطها واتبع تعليمات المصادقة.'
        : 'Go to Settings > Connect Accounts, choose the platform you want to connect and follow the authentication instructions.',
      category: isArabic ? 'الإعدادات' : 'Settings',
      helpful: 12
    },
    {
      id: '3',
      question: isArabic ? 'كيف أراجع تحليلات أداء حملاتي؟' : 'How do I review my campaign performance analytics?',
      answer: isArabic 
        ? 'يمكنك مراجعة تحليلات الأداء من خلال قسم التقارير أو من داخل كل حملة على حدة.'
        : 'You can review performance analytics through the Reports section or from within each individual campaign.',
      category: isArabic ? 'التقارير' : 'Reports',
      helpful: 8
    }
  ];

  const handleSupportTicketSubmit = () => {
    if (!supportTicket.subject || !supportTicket.description) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: isArabic ? "تم الإرسال" : "Ticket Submitted",
      description: isArabic ? "تم إرسال طلب الدعم بنجاح" : "Support ticket has been submitted successfully"
    });

    setSupportTicket({ subject: '', description: '', priority: 'medium' });
  };

  const filteredFAQs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 p-8 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className={`text-center space-y-4`}>
          <HelpCircle className="h-16 w-16 text-blue-600 mx-auto" />
          <h1 className={`text-4xl font-bold ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'مركز المساعدة' : 'Help Center'}
          </h1>
          <p className={`text-gray-600 dark:text-gray-400 text-lg ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'نحن هنا لمساعدتك في كل ما تحتاجه' : 'We\'re here to help you with everything you need'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Book className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'دليل المستخدم' : 'User Guide'}
              </h3>
              <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'تعلم كيفية استخدام النظام بشكل كامل' : 'Learn how to use the system completely'}
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Video className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'فيديوهات تعليمية' : 'Video Tutorials'}
              </h3>
              <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'شاهد فيديوهات شرح مفصلة' : 'Watch detailed explanation videos'}
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'تواصل مع الدعم' : 'Contact Support'}
              </h3>
              <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'احصل على مساعدة شخصية فورية' : 'Get immediate personal assistance'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className={`grid w-full grid-cols-3 ${isArabic ? 'font-arabic' : ''}`}>
            <TabsTrigger value="faq">
              {isArabic ? 'الأسئلة الشائعة' : 'FAQ'}
            </TabsTrigger>
            <TabsTrigger value="contact">
              {isArabic ? 'تواصل معنا' : 'Contact Us'}
            </TabsTrigger>
            <TabsTrigger value="resources">
              {isArabic ? 'الموارد' : 'Resources'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="p-6">
                <div className="relative">
                  <Search className={`absolute top-3 h-4 w-4 text-gray-400 ${isArabic ? 'right-3' : 'left-3'}`} />
                  <Input
                    placeholder={isArabic ? 'ابحث في الأسئلة الشائعة...' : 'Search FAQ...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`${isArabic ? 'pr-10 text-right' : 'pl-10'}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className={`flex items-start justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <CardTitle className={`text-lg ${isArabic ? 'font-arabic text-right' : ''}`}>
                        {item.question}
                      </CardTitle>
                      <Badge variant="secondary" className={`${isArabic ? 'font-arabic' : ''}`}>
                        {item.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-gray-600 dark:text-gray-400 mb-4 ${isArabic ? 'font-arabic text-right' : ''}`}>
                      {item.answer}
                    </p>
                    <div className={`flex items-center gap-2 text-sm text-gray-500 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className={isArabic ? 'font-arabic' : ''}>
                        {item.helpful} {isArabic ? 'شخص وجد هذا مفيداً' : 'people found this helpful'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className={`${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'طرق التواصل' : 'Contact Methods'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div className={`${isArabic ? 'text-right' : ''}`}>
                      <p className={`font-semibold ${isArabic ? 'font-arabic' : ''}`}>
                        {isArabic ? 'البريد الإلكتروني' : 'Email'}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">support@example.com</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Phone className="h-5 w-5 text-green-600" />
                    <div className={`${isArabic ? 'text-right' : ''}`}>
                      <p className={`font-semibold ${isArabic ? 'font-arabic' : ''}`}>
                        {isArabic ? 'الهاتف' : 'Phone'}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">+966 11 234 5678</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Clock className="h-5 w-5 text-purple-600" />
                    <div className={`${isArabic ? 'text-right' : ''}`}>
                      <p className={`font-semibold ${isArabic ? 'font-arabic' : ''}`}>
                        {isArabic ? 'ساعات العمل' : 'Working Hours'}
                      </p>
                      <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                        {isArabic ? 'الأحد - الخميس: 9:00 - 17:00' : 'Sun - Thu: 9:00 AM - 5:00 PM'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support Ticket Form */}
              <Card>
                <CardHeader>
                  <CardTitle className={`${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'إرسال طلب دعم' : 'Submit Support Ticket'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isArabic ? 'font-arabic text-right' : ''}`}>
                      {isArabic ? 'موضوع الطلب' : 'Subject'}
                    </label>
                    <Input
                      value={supportTicket.subject}
                      onChange={(e) => setSupportTicket(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder={isArabic ? 'اكتب موضوع طلب الدعم' : 'Enter support ticket subject'}
                      className={`${isArabic ? 'text-right' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isArabic ? 'font-arabic text-right' : ''}`}>
                      {isArabic ? 'الوصف' : 'Description'}
                    </label>
                    <Textarea
                      value={supportTicket.description}
                      onChange={(e) => setSupportTicket(prev => ({ ...prev, description: e.target.value }))}
                      placeholder={isArabic ? 'اشرح مشكلتك بالتفصيل' : 'Describe your issue in detail'}
                      rows={4}
                      className={`${isArabic ? 'text-right' : ''}`}
                    />
                  </div>
                  
                  <Button onClick={handleSupportTicketSubmit} className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    <span className={isArabic ? 'font-arabic' : ''}>
                      {isArabic ? 'إرسال الطلب' : 'Submit Ticket'}
                    </span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
                    <Book className="h-5 w-5" />
                    {isArabic ? 'دليل البدء السريع' : 'Quick Start Guide'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-gray-600 dark:text-gray-400 mb-4 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    {isArabic 
                      ? 'دليل شامل للبدء في استخدام النظام في خطوات بسيطة'
                      : 'Comprehensive guide to get started with the system in simple steps'
                    }
                  </p>
                  <Button variant="outline">
                    <span className={isArabic ? 'font-arabic' : ''}>
                      {isArabic ? 'قراءة الدليل' : 'Read Guide'}
                    </span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
                    <Video className="h-5 w-5" />
                    {isArabic ? 'فيديوهات تعليمية' : 'Video Tutorials'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-gray-600 dark:text-gray-400 mb-4 ${isArabic ? 'font-arabic text-right' : ''}`}>
                    {isArabic 
                      ? 'مجموعة من الفيديوهات التعليمية لشرح جميع ميزات النظام'
                      : 'Collection of educational videos explaining all system features'
                    }
                  </p>
                  <Button variant="outline">
                    <span className={isArabic ? 'font-arabic' : ''}>
                      {isArabic ? 'مشاهدة الفيديوهات' : 'Watch Videos'}
                    </span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HelpCenter;
