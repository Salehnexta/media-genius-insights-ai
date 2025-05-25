
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HelpCircle, MessageCircle, FileText, Video, Search, Send, Phone, Mail, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HelpSupportSectionProps {
  isArabic: boolean;
}

const HelpSupportSection: React.FC<HelpSupportSectionProps> = ({ isArabic }) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [supportForm, setSupportForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    message: '',
    email: ''
  });

  const faqs = [
    {
      id: 1,
      question: isArabic ? 'كيف يمكنني إعادة تعيين كلمة المرور؟' : 'How can I reset my password?',
      answer: isArabic 
        ? 'يمكنك إعادة تعيين كلمة المرور من خلال الذهاب إلى صفحة الأمان والخصوصية، ثم النقر على تغيير كلمة المرور. ستحتاج إلى إدخال كلمة المرور الحالية والجديدة.'
        : 'You can reset your password by going to the Security & Privacy section, then clicking on Change Password. You will need to enter your current password and the new one.',
      category: isArabic ? 'الحساب' : 'Account'
    },
    {
      id: 2,
      question: isArabic ? 'كيف يمكنني تغيير لغة الواجهة؟' : 'How can I change the interface language?',
      answer: isArabic 
        ? 'يمكنك تغيير لغة الواجهة من خلال الذهاب إلى قسم تغيير اللغة في الملف الشخصي، أو النقر على زر تغيير اللغة في القائمة العلوية.'
        : 'You can change the interface language by going to the Language Settings section in your profile, or by clicking the language toggle button in the top menu.',
      category: isArabic ? 'الإعدادات' : 'Settings'
    },
    {
      id: 3,
      question: isArabic ? 'كيف يمكنني تخصيص لوحة التحكم؟' : 'How can I customize my dashboard?',
      answer: isArabic 
        ? 'يمكنك تخصيص لوحة التحكم من خلال قسم تخصيص الواجهة، حيث يمكنك تغيير المظهر، وحجم الخط، وتخطيط الأدوات.'
        : 'You can customize your dashboard through the Interface Customization section, where you can change themes, font sizes, and widget layouts.',
      category: isArabic ? 'التخصيص' : 'Customization'
    },
    {
      id: 4,
      question: isArabic ? 'كيف يمكنني تفعيل المصادقة الثنائية؟' : 'How can I enable two-factor authentication?',
      answer: isArabic 
        ? 'يمكنك تفعيل المصادقة الثنائية من خلال قسم الأمان والخصوصية، ثم تفعيل المفتاح المخصص للمصادقة الثنائية.'
        : 'You can enable two-factor authentication through the Security & Privacy section, then toggle the switch for Two-Factor Authentication.',
      category: isArabic ? 'الأمان' : 'Security'
    },
    {
      id: 5,
      question: isArabic ? 'كيف يمكنني الاتصال بفريق الدعم؟' : 'How can I contact the support team?',
      answer: isArabic 
        ? 'يمكنك الاتصال بفريق الدعم من خلال نموذج الاتصال في هذه الصفحة، أو عبر البريد الإلكتروني support@example.com، أو الهاتف +966123456789.'
        : 'You can contact the support team through the contact form on this page, via email at support@example.com, or by phone at +966123456789.',
      category: isArabic ? 'الدعم' : 'Support'
    }
  ];

  const supportCategories = [
    { value: 'technical', label: isArabic ? 'مشكلة تقنية' : 'Technical Issue' },
    { value: 'account', label: isArabic ? 'مشكلة في الحساب' : 'Account Issue' },
    { value: 'billing', label: isArabic ? 'مشكلة في الفوترة' : 'Billing Issue' },
    { value: 'feature', label: isArabic ? 'طلب ميزة جديدة' : 'Feature Request' },
    { value: 'other', label: isArabic ? 'أخرى' : 'Other' }
  ];

  const priorities = [
    { value: 'low', label: isArabic ? 'منخفضة' : 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: isArabic ? 'متوسطة' : 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: isArabic ? 'عالية' : 'High', color: 'bg-red-100 text-red-800' }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSupportSubmit = () => {
    if (!supportForm.subject || !supportForm.message) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: isArabic ? "تم إرسال الطلب" : "Request Sent",
      description: isArabic ? "تم إرسال طلب الدعم بنجاح. سنتواصل معك قريباً." : "Support request sent successfully. We'll contact you soon."
    });

    setSupportForm({
      subject: '',
      category: '',
      priority: 'medium',
      message: '',
      email: ''
    });
  };

  return (
    <div className="space-y-8">
      {/* Support Contact Info */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 text-blue-700 dark:text-blue-300 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <HelpCircle className="h-6 w-6" />
            {isArabic ? 'معلومات الاتصال' : 'Contact Information'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 ${isArabic ? 'text-right' : ''}`}>
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className={`font-semibold text-blue-800 dark:text-blue-300 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'البريد الإلكتروني' : 'Email'}
              </h4>
              <p className={`text-sm text-blue-600 ${isArabic ? 'font-arabic' : ''}`}>
                support@example.com
              </p>
            </div>
            
            <div className={`text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20 ${isArabic ? 'text-right' : ''}`}>
              <Phone className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className={`font-semibold text-green-800 dark:text-green-300 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'الهاتف' : 'Phone'}
              </h4>
              <p className={`text-sm text-green-600 ${isArabic ? 'font-arabic' : ''}`}>
                +966 12 345 6789
              </p>
            </div>
            
            <div className={`text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 ${isArabic ? 'text-right' : ''}`}>
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className={`font-semibold text-purple-800 dark:text-purple-300 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'ساعات العمل' : 'Working Hours'}
              </h4>
              <p className={`text-sm text-purple-600 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? '24/7 دعم مستمر' : '24/7 Support'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Search */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <Search className="h-5 w-5" />
            {isArabic ? 'البحث في الأسئلة الشائعة' : 'Search FAQ'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className={`absolute top-3 h-4 w-4 text-gray-400 ${isArabic ? 'right-3' : 'left-3'}`} />
            <Input
              placeholder={isArabic ? 'ابحث في الأسئلة الشائعة...' : 'Search frequently asked questions...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${isArabic ? 'pr-10 text-right font-arabic' : 'pl-10'}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Frequently Asked Questions */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <FileText className="h-5 w-5" />
            {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                <AccordionTrigger className={`${isArabic ? 'text-right font-arabic' : ''} hover:no-underline`}>
                  <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Badge variant="outline" className={`${isArabic ? 'font-arabic' : ''}`}>
                      {faq.category}
                    </Badge>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={`${isArabic ? 'text-right font-arabic' : ''} text-gray-600 dark:text-gray-400`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          {filteredFaqs.length === 0 && (
            <div className={`text-center py-8 text-gray-500 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'لا توجد نتائج للبحث' : 'No search results found'}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Support Request Form */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <MessageCircle className="h-5 w-5" />
            {isArabic ? 'إرسال طلب دعم' : 'Submit Support Request'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject" className={`${isArabic ? 'text-right font-arabic' : ''}`}>
                {isArabic ? 'موضوع الطلب' : 'Subject'} *
              </Label>
              <Input
                id="subject"
                value={supportForm.subject}
                onChange={(e) => setSupportForm(prev => ({ ...prev, subject: e.target.value }))}
                placeholder={isArabic ? 'عنوان مختصر للمشكلة' : 'Brief title for your issue'}
                className={`${isArabic ? 'text-right font-arabic' : ''}`}
              />
            </div>

            <div className="space-y-2">
              <Label className={`${isArabic ? 'text-right font-arabic' : ''}`}>
                {isArabic ? 'فئة الطلب' : 'Category'}
              </Label>
              <Select value={supportForm.category} onValueChange={(value) => setSupportForm(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className={`${isArabic ? 'text-right font-arabic' : ''}`}>
                  <SelectValue placeholder={isArabic ? 'اختر فئة الطلب' : 'Select category'} />
                </SelectTrigger>
                <SelectContent>
                  {supportCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value} className={`${isArabic ? 'text-right font-arabic' : ''}`}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={`${isArabic ? 'text-right font-arabic' : ''}`}>
                {isArabic ? 'الأولوية' : 'Priority'}
              </Label>
              <Select value={supportForm.priority} onValueChange={(value) => setSupportForm(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger className={`${isArabic ? 'text-right font-arabic' : ''}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value} className={`${isArabic ? 'text-right font-arabic' : ''}`}>
                      <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <Badge className={priority.color}>
                          {priority.label}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className={`${isArabic ? 'text-right font-arabic' : ''}`}>
                {isArabic ? 'البريد الإلكتروني للرد' : 'Reply Email'}
              </Label>
              <Input
                id="email"
                type="email"
                value={supportForm.email}
                onChange={(e) => setSupportForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder={isArabic ? 'البريد الإلكتروني للرد' : 'Your email for response'}
                className={`${isArabic ? 'text-right font-arabic' : ''}`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className={`${isArabic ? 'text-right font-arabic' : ''}`}>
              {isArabic ? 'تفاصيل الطلب' : 'Message Details'} *
            </Label>
            <Textarea
              id="message"
              rows={6}
              value={supportForm.message}
              onChange={(e) => setSupportForm(prev => ({ ...prev, message: e.target.value }))}
              placeholder={isArabic ? 'اشرح مشكلتك أو طلبك بالتفصيل...' : 'Describe your issue or request in detail...'}
              className={`${isArabic ? 'text-right font-arabic' : ''} resize-none`}
            />
          </div>

          <Button 
            onClick={handleSupportSubmit}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            <span className={isArabic ? 'font-arabic' : ''}>
              {isArabic ? 'إرسال طلب الدعم' : 'Send Support Request'}
            </span>
          </Button>
        </CardContent>
      </Card>

      {/* Video Tutorials */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <Video className="h-5 w-5" />
            {isArabic ? 'فيديوهات تعليمية' : 'Video Tutorials'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((video) => (
              <div key={video} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded mb-3 flex items-center justify-center">
                  <Video className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className={`font-semibold mb-2 ${isArabic ? 'text-right font-arabic' : ''}`}>
                  {isArabic ? `دليل فيديو ${video}` : `Video Tutorial ${video}`}
                </h4>
                <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'text-right font-arabic' : ''}`}>
                  {isArabic 
                    ? 'شرح مفصل لكيفية استخدام النظام'
                    : 'Detailed explanation of how to use the system'
                  }
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSupportSection;
