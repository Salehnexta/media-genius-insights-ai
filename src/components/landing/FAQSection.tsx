
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQSectionProps {
  isArabic?: boolean;
}

const FAQSection: React.FC<FAQSectionProps> = ({ isArabic = false }) => {
  const faqs = [
    {
      question: isArabic ? 'ما هو فريق التسويق الذكي؟' : 'What is AI Marketing Team?',
      answer: isArabic 
        ? 'فريق التسويق الذكي هو منصة تستخدم الذكاء الاصطناعي لإدارة وتحسين حملاتك التسويقية تلقائياً. يعمل كفريق تسويق كامل يعمل على مدار الساعة لنمو أعمالك.'
        : 'AI Marketing Team is a platform that uses artificial intelligence to automatically manage and optimize your marketing campaigns. It works like a complete marketing team that operates 24/7 to grow your business.'
    },
    {
      question: isArabic ? 'كم من الوقت احتاج لرؤية النتائج؟' : 'How long does it take to see results?',
      answer: isArabic 
        ? 'معظم عملائنا يرون تحسناً في الأداء خلال أول أسبوعين، بينما تظهر النتائج الكبيرة عادة خلال 4-6 أسابيع من الاستخدام المنتظم.'
        : 'Most of our clients see performance improvements within the first two weeks, while significant results typically appear within 4-6 weeks of regular use.'
    },
    {
      question: isArabic ? 'هل أحتاج لخبرة تقنية؟' : 'Do I need technical experience?',
      answer: isArabic 
        ? 'لا، تم تصميم المنصة لتكون سهلة الاستخدام للجميع. الذكاء الاصطناعي يتولى الجوانب التقنية المعقدة، بينما تركز أنت على استراتيجية أعمالك.'
        : 'No, the platform is designed to be user-friendly for everyone. The AI handles the complex technical aspects while you focus on your business strategy.'
    },
    {
      question: isArabic ? 'هل يمكنني إلغاء الاشتراك في أي وقت؟' : 'Can I cancel my subscription anytime?',
      answer: isArabic 
        ? 'نعم، يمكنك إلغاء اشتراكك في أي وقت بدون رسوم إضافية. كما نقدم ضمان استرداد المال لمدة 30 يوماً.'
        : 'Yes, you can cancel your subscription anytime without additional fees. We also offer a 30-day money-back guarantee.'
    },
    {
      question: isArabic ? 'هل تدعمون التكامل مع منصات أخرى؟' : 'Do you support integrations with other platforms?',
      answer: isArabic 
        ? 'نعم، نتكامل مع أكثر من 50 منصة شائعة مثل Google Analytics، Facebook Ads، Instagram، وغيرها الكثير.'
        : 'Yes, we integrate with over 50 popular platforms including Google Analytics, Facebook Ads, Instagram, and many more.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic 
              ? 'إجابات على أكثر الأسئلة شيوعاً حول منصتنا'
              : 'Answers to the most common questions about our platform'
            }
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg px-6"
              >
                <AccordionTrigger className={`text-left hover:no-underline ${isArabic ? 'text-right font-arabic' : ''}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className={`text-gray-600 ${isArabic ? 'text-right font-arabic' : ''}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
