
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialsSectionProps {
  isArabic?: boolean;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ isArabic = false }) => {
  const testimonials = [
    {
      name: isArabic ? 'أحمد محمد' : 'Ahmed Mohamed',
      company: isArabic ? 'شركة التقنية المتقدمة' : 'Advanced Tech Solutions',
      text: isArabic 
        ? 'لقد ساعدنا فريق التسويق الذكي في زيادة مبيعاتنا بنسبة 300% خلال 6 أشهر فقط!'
        : 'AI Marketing Team helped us increase our sales by 300% in just 6 months!',
      rating: 5
    },
    {
      name: isArabic ? 'سارة أحمد' : 'Sarah Ahmed',
      company: isArabic ? 'متجر الأزياء الحديثة' : 'Modern Fashion Store',
      text: isArabic
        ? 'الذكاء الاصطناعي يدير حملاتنا بكفاءة مذهلة. وفرنا الكثير من الوقت والمال.'
        : 'The AI manages our campaigns with incredible efficiency. We saved so much time and money.',
      rating: 5
    },
    {
      name: isArabic ? 'خالد العلي' : 'Khalid Al-Ali',
      company: isArabic ? 'شركة البناء الذكي' : 'Smart Construction Co.',
      text: isArabic
        ? 'أفضل استثمار قمنا به لنمو أعمالنا. النتائج تتحدث عن نفسها.'
        : 'Best investment we made for our business growth. The results speak for themselves.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
          </h2>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic 
              ? 'انضم إلى آلاف العملاء الذين حققوا نتائج استثنائية'
              : 'Join thousands of clients who achieved exceptional results'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className={`p-6 ${isArabic ? 'text-right' : ''}`}>
                <div className={`flex gap-1 mb-4 ${isArabic ? 'justify-end' : ''}`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className={`text-gray-600 mb-4 leading-relaxed ${isArabic ? 'font-arabic' : ''}`}>
                  "{testimonial.text}"
                </p>
                <div>
                  <p className={`font-semibold ${isArabic ? 'font-arabic' : ''}`}>
                    {testimonial.name}
                  </p>
                  <p className={`text-sm text-gray-500 ${isArabic ? 'font-arabic' : ''}`}>
                    {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
