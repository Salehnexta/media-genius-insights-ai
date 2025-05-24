
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, BarChart3, Image, Zap } from 'lucide-react';

interface AIFeaturesHighlightProps {
  isArabic: boolean;
}

const AIFeaturesHighlight: React.FC<AIFeaturesHighlightProps> = ({ isArabic }) => {
  const features = [
    {
      icon: MessageSquare,
      title: isArabic ? 'محادثات ذكية' : 'Smart Conversations',
      description: isArabic 
        ? 'تحدث مع وكلاء ذكيين متخصصين في الاستراتيجية والتحليل وإنشاء المحتوى'
        : 'Chat with specialized AI agents for strategy, analysis, and content creation',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: BarChart3,
      title: isArabic ? 'تحليلات ذكية' : 'AI Analytics',
      description: isArabic
        ? 'احصل على رؤى ذكية وتوصيات مدعومة بتقنية GPT-4'
        : 'Get intelligent insights and recommendations powered by GPT-4',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      icon: Image,
      title: isArabic ? 'إنتاج المحتوى' : 'Content Generation',
      description: isArabic
        ? 'أنشئ محتوى جذاب وصور بمساعدة الذكاء الاصطناعي'
        : 'Create compelling content and visuals with AI assistance',
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: Zap,
      title: isArabic ? 'الأتمتة' : 'Automation',
      description: isArabic
        ? 'أتمتة سير العمل الذكية والتحسين'
        : 'Intelligent workflow automation and optimization',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ];

  return (
    <div className="mt-12">
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            🤖 {isArabic ? 'ذكاء التسويق المدعوم بالذكاء الاصطناعي' : 'AI-Powered Marketing Intelligence'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIFeaturesHighlight;
