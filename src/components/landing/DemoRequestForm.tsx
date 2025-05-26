
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PlayCircle, CheckCircle } from 'lucide-react';

interface DemoRequestFormProps {
  isArabic?: boolean;
}

const DemoRequestForm: React.FC<DemoRequestFormProps> = ({ isArabic = false }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Demo request submitted:', formData);
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className={`text-xl font-bold mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'تم إرسال طلبك بنجاح!' : 'Request Submitted Successfully!'}
              </h3>
              <p className={`text-gray-600 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic 
                  ? 'سيتواصل معك فريقنا خلال 24 ساعة لتحديد موعد العرض التوضيحي.'
                  : 'Our team will contact you within 24 hours to schedule your demo.'
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'احجز عرضاً توضيحياً مجانياً' : 'Book a Free Demo'}
          </h2>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic 
              ? 'شاهد كيف يمكن لفريق التسويق الذكي أن يحول أعمالك في عرض مخصص لك'
              : 'See how AI Marketing Team can transform your business in a personalized demo'
            }
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
              <PlayCircle className="w-6 h-6 text-blue-600" />
              {isArabic ? 'طلب عرض توضيحي' : 'Request Demo'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className={isArabic ? 'font-arabic' : ''}>
                    {isArabic ? 'الاسم الكامل' : 'Full Name'}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={isArabic ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                    required
                    className={isArabic ? 'text-right' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className={isArabic ? 'font-arabic' : ''}>
                    {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
                    required
                    className={isArabic ? 'text-right' : ''}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company" className={isArabic ? 'font-arabic' : ''}>
                  {isArabic ? 'اسم الشركة' : 'Company Name'}
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder={isArabic ? 'أدخل اسم شركتك' : 'Enter your company name'}
                  className={isArabic ? 'text-right' : ''}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className={isArabic ? 'font-arabic' : ''}>
                  {isArabic ? 'رسالة إضافية (اختيارية)' : 'Additional Message (Optional)'}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={isArabic ? 'أخبرنا عن احتياجاتك التسويقية' : 'Tell us about your marketing needs'}
                  rows={4}
                  className={isArabic ? 'text-right' : ''}
                />
              </div>
              
              <Button 
                type="submit" 
                className={`w-full bg-blue-600 hover:bg-blue-700 ${isArabic ? 'font-arabic' : ''}`}
                size="lg"
              >
                {isArabic ? 'احجز العرض التوضيحي الآن' : 'Book Demo Now'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DemoRequestForm;
