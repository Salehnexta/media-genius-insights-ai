
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OnboardingData } from '@/hooks/onboarding/types';
import { 
  Brain, 
  CheckCircle, 
  Edit, 
  Target, 
  Users, 
  TrendingUp, 
  Clock, 
  Camera,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface AIRecommendationsProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ data, updateData, isArabic }) => {
  const [currentSection, setCurrentSection] = useState<string>('industry');

  // بيانات وهمية للاقتراحات
  const mockRecommendations = {
    industry: {
      suggestion: isArabic ? 'مطعم للوجبات السريعة' : 'Fast Food Restaurant',
      type: isArabic ? 'قطاع المطاعم والضيافة' : 'Restaurant & Hospitality Sector',
      confidence: 95,
      reason: isArabic ? 'الوجبات السريعة تستهدف عادة الشباب والعاملين' : 'Fast food typically targets young people and workers'
    },
    target_audience: {
      age_range: '18-35 سنة',
      gender: isArabic ? 'الجميع (ذكور وإناث)' : 'Everyone (Male & Female)',
      interests: ['الطعام', 'التوصيل السريع', 'الوجبات الجاهزة'],
      location: isArabic ? 'في دائرة 5 كم من موقع المطعم' : 'Within 5km radius of restaurant location',
      confidence: 88
    },
    competitors: [
      { name: 'مطعم البرجر الذهبي', type: 'direct', strength: 'medium' },
      { name: 'كنتاكي', type: 'direct', strength: 'strong' },
      { name: 'ماكدونالدز', type: 'direct', strength: 'very_strong' },
      { name: 'مطاعم الحي المحلية', type: 'indirect', strength: 'weak' }
    ],
    marketing_goals: [
      { goal: isArabic ? 'زيادة طلبات التوصيل بنسبة 30%' : 'Increase delivery orders by 30%', priority: 'high' },
      { goal: isArabic ? 'زيادة الوعي بالعلامة التجارية في المنطقة' : 'Increase brand awareness in the area', priority: 'medium' },
      { goal: isArabic ? 'جذب 50 عميل جديد شهرياً' : 'Attract 50 new customers monthly', priority: 'high' }
    ],
    channels: {
      instagram: { percentage: 70, reason: isArabic ? 'لعرض الطعام' : 'For food display' },
      google_ads: { percentage: 20, reason: isArabic ? 'للعملاء المحليين' : 'For local customers' },
      whatsapp: { percentage: 10, reason: isArabic ? 'لخدمة العملاء' : 'For customer service' }
    },
    posting_times: {
      lunch: { start: '11:30', end: '14:00' },
      dinner: { start: '18:00', end: '21:00' },
      weekend: { start: '12:00', end: '22:00' }
    },
    content_types: {
      food_photos: 50,
      videos: 30,
      offers: 15,
      customer_reviews: 5
    }
  };

  const handleConfirmation = (section: string, confirmed: boolean, modifications?: any) => {
    const newConfirmations = { ...data.user_confirmations };
    newConfirmations[`${section}_confirmed`] = confirmed;
    
    let updates: any = { user_confirmations: newConfirmations };
    
    if (confirmed) {
      switch (section) {
        case 'industry':
          updates.ai_suggested_industry = mockRecommendations.industry.suggestion;
          updates.ai_suggested_business_type = mockRecommendations.industry.type;
          break;
        case 'target_audience':
          updates.ai_suggested_target_age_range = mockRecommendations.target_audience.age_range;
          updates.ai_suggested_target_gender = 'both';
          updates.ai_suggested_target_interests = mockRecommendations.target_audience.interests;
          updates.ai_suggested_target_location = mockRecommendations.target_audience.location;
          break;
        case 'competitors':
          updates.ai_discovered_competitors = mockRecommendations.competitors;
          break;
        case 'goals':
          updates.ai_suggested_marketing_goals = mockRecommendations.marketing_goals;
          break;
        case 'channels':
          updates.ai_suggested_channels = mockRecommendations.channels;
          break;
        case 'content':
          updates.ai_suggested_content_types = mockRecommendations.content_types;
          updates.ai_suggested_posting_times = mockRecommendations.posting_times;
          break;
      }
    }
    
    updateData(updates);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const sections = [
    { id: 'industry', title: isArabic ? 'نوع النشاط' : 'Business Type', icon: Brain },
    { id: 'target_audience', title: isArabic ? 'الجمهور المستهدف' : 'Target Audience', icon: Users },
    { id: 'competitors', title: isArabic ? 'المنافسين' : 'Competitors', icon: Target },
    { id: 'goals', title: isArabic ? 'الأهداف التسويقية' : 'Marketing Goals', icon: TrendingUp },
    { id: 'channels', title: isArabic ? 'القنوات التسويقية' : 'Marketing Channels', icon: Target },
    { id: 'content', title: isArabic ? 'المحتوى والأوقات' : 'Content & Timing', icon: Camera }
  ];

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex overflow-x-auto gap-2 pb-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isConfirmed = data.user_confirmations?.[`${section.id}_confirmed`];
          return (
            <Button
              key={section.id}
              variant={currentSection === section.id ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentSection(section.id)}
              className={`flex items-center gap-2 whitespace-nowrap ${isArabic ? 'flex-row-reverse' : ''}`}
            >
              <Icon className="w-4 h-4" />
              {section.title}
              {isConfirmed && <CheckCircle className="w-4 h-4 text-green-600" />}
            </Button>
          );
        })}
      </div>

      {/* Industry Analysis */}
      {currentSection === 'industry' && (
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Brain className="w-5 h-5 text-blue-600" />
              {isArabic ? 'تحليل نوع النشاط التجاري' : 'Business Type Analysis'}
            </CardTitle>
            <CardDescription>
              {isArabic ? 'بناءً على تحليل موقعك ومعلوماتك' : 'Based on your website and information analysis'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className={`flex items-center justify-between mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <h3 className="font-semibold">{mockRecommendations.industry.suggestion}</h3>
                  <Badge className={getConfidenceColor(mockRecommendations.industry.confidence)}>
                    {mockRecommendations.industry.confidence}% {isArabic ? 'ثقة' : 'confidence'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{mockRecommendations.industry.type}</p>
                <p className="text-sm">{mockRecommendations.industry.reason}</p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleConfirmation('industry', true)}
                  className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  {isArabic ? 'صحيح' : 'Correct'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleConfirmation('industry', false)}
                  className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
                >
                  <Edit className="w-4 h-4" />
                  {isArabic ? 'تعديل' : 'Edit'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Target Audience */}
      {currentSection === 'target_audience' && (
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Users className="w-5 h-5 text-purple-600" />
              {isArabic ? 'الجمهور المستهدف المقترح' : 'Suggested Target Audience'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-1">{isArabic ? 'الفئة العمرية' : 'Age Range'}</h4>
                  <p>{mockRecommendations.target_audience.age_range}</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-1">{isArabic ? 'الجنس' : 'Gender'}</h4>
                  <p>{mockRecommendations.target_audience.gender}</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-1">{isArabic ? 'الموقع' : 'Location'}</h4>
                  <p>{mockRecommendations.target_audience.location}</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-1">{isArabic ? 'الاهتمامات' : 'Interests'}</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {mockRecommendations.target_audience.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleConfirmation('target_audience', true)}
                  className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  {isArabic ? 'مناسب' : 'Suitable'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleConfirmation('target_audience', false)}
                  className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
                >
                  <Edit className="w-4 h-4" />
                  {isArabic ? 'تعديل' : 'Modify'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Final Summary */}
      {currentSection === 'content' && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
            {isArabic ? '🎉 تهانينا! تم إعداد ملفك التسويقي' : '🎉 Congratulations! Your marketing profile is ready'}
          </h3>
          <p className="text-sm text-green-800 dark:text-green-200">
            {isArabic 
              ? 'يمكنك الآن البدء في استخدام نظام التسويق الذكي. سنقوم بإنشاء المحتوى وإدارة حملاتك تلقائياً!'
              : 'You can now start using the smart marketing system. We\'ll create content and manage your campaigns automatically!'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
