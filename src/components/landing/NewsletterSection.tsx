
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle } from 'lucide-react';

interface NewsletterSectionProps {
  isArabic?: boolean;
}

const NewsletterSection: React.FC<NewsletterSectionProps> = ({ isArabic = false }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Newsletter subscription:', email);
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <Mail className="w-16 h-16 mx-auto mb-6 text-blue-200" />
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'ابق على اطلاع بآخر الأخبار' : 'Stay Updated with Latest News'}
          </h2>
          <p className={`text-xl mb-8 text-blue-100 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic 
              ? 'احصل على نصائح تسويقية حصرية وآخر التحديثات مباشرة في بريدك الإلكتروني'
              : 'Get exclusive marketing tips and latest updates delivered to your inbox'
            }
          </p>

          {isSubscribed ? (
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-4" />
              <h3 className={`text-xl font-bold mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'شكراً لك!' : 'Thank You!'}
              </h3>
              <p className={`text-blue-100 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic 
                  ? 'تم تسجيلك بنجاح في النشرة الإخبارية'
                  : 'You have been successfully subscribed to our newsletter'
                }
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={`flex gap-4 max-w-md mx-auto ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                className={`flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 ${isArabic ? 'text-right' : ''}`}
                required
              />
              <Button 
                type="submit" 
                variant="secondary"
                className={`px-6 ${isArabic ? 'font-arabic' : ''}`}
              >
                {isArabic ? 'اشترك' : 'Subscribe'}
              </Button>
            </form>
          )}

          <p className={`text-sm text-blue-200 mt-4 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic 
              ? 'لن نشارك بريدك الإلكتروني مع أطراف ثالثة. يمكنك إلغاء الاشتراك في أي وقت.'
              : 'We will never share your email with third parties. Unsubscribe anytime.'
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
