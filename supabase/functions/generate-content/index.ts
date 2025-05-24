
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, platform, userInfo = '', language = 'en' } = await req.json();

    if (!prompt) {
      throw new Error('Prompt is required');
    }

    console.log('Generating content:', { prompt, platform, language });

    const systemPrompt = getContentSystemPrompt(platform, userInfo, language);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log('Content generated successfully');

    return new Response(JSON.stringify({ 
      content: generatedContent,
      platform,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-content function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallback: 'Failed to generate content. Please try again.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getContentSystemPrompt(platform: string, userInfo: string, language: string): string {
  const isArabic = language === 'ar';
  
  const platformSpecs = {
    twitter: isArabic 
      ? 'اكتب تغريدة جذابة وقصيرة (أقل من 280 حرف) مع هاشتاغات ذات صلة'
      : 'Write an engaging, short tweet (under 280 characters) with relevant hashtags',
    instagram: isArabic
      ? 'اكتب تسمية توضيحية جذابة لإنستجرام مع إيموجي وهاشتاغات. اجعلها ملهمة وبصرية'
      : 'Write an engaging Instagram caption with emojis and hashtags. Make it visual and inspiring',
    linkedin: isArabic
      ? 'اكتب منشور لينكد إن احترافي ومدروس مع رؤى قيمة ودعوة للعمل'
      : 'Write a professional, thoughtful LinkedIn post with valuable insights and a call-to-action',
    facebook: isArabic
      ? 'اكتب منشور فيسبوك ودود وجذاب يشجع على المشاركة والتفاعل'
      : 'Write a friendly, engaging Facebook post that encourages sharing and interaction'
  };

  const basePrompt = isArabic
    ? 'أنت خبير في كتابة المحتوى للوسائل الاجتماعية.'
    : 'You are an expert social media content creator.';

  const userContext = userInfo 
    ? (isArabic ? `\n\nسياق العمل: ${userInfo}` : `\n\nBusiness context: ${userInfo}`)
    : '';

  return `${basePrompt} ${platformSpecs[platform as keyof typeof platformSpecs] || platformSpecs.twitter}${userContext}`;
}
