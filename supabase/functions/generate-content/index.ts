
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
    const { prompt, platform, userInfo, language = 'en' } = await req.json();

    const languageInstruction = language === 'ar' 
      ? 'يجب أن تكتب المحتوى باللغة العربية فقط. لا تستخدم كلمات أو عبارات إنجليزية.'
      : 'You must write content in English only.';

    const platformGuidelines = language === 'ar' ? {
      twitter: 'تويتر: محتوى قصير وجذاب (أقل من 280 حرف), استخدم هاشتاغات مناسبة',
      instagram: 'إنستغرام: محتوى بصري وملهم, استخدم هاشتاغات شائعة ووصف جذاب',
      linkedin: 'لينكد إن: محتوى مهني ومفيد, ركز على القيمة المضافة والخبرة',
      facebook: 'فيسبوك: محتوى تفاعلي ومجتمعي, شجع على التعليقات والمشاركة'
    } : {
      twitter: 'Twitter: Short and engaging content (under 280 characters), use relevant hashtags',
      instagram: 'Instagram: Visual and inspiring content, use trending hashtags and engaging captions',
      linkedin: 'LinkedIn: Professional and valuable content, focus on expertise and insights',
      facebook: 'Facebook: Interactive and community-focused content, encourage comments and shares'
    };

    const systemPrompt = language === 'ar'
      ? `أنت خبير في إنشاء المحتوى التسويقي. ${languageInstruction}
         
         قم بإنشاء محتوى مخصص لـ ${platform} باتباع هذه الإرشادات:
         ${platformGuidelines[platform] || platformGuidelines.twitter}
         
         معلومات المستخدم: ${userInfo || 'غير متوفرة'}
         
         يجب أن يكون المحتوى:
         - جذاب ومثير للاهتمام
         - مناسب للمنصة المحددة
         - يحث على التفاعل
         - يحتوي على call-to-action مناسب`
      : `You are an expert content marketing specialist. ${languageInstruction}
         
         Create content optimized for ${platform} following these guidelines:
         ${platformGuidelines[platform] || platformGuidelines.twitter}
         
         User info: ${userInfo || 'Not provided'}
         
         The content should be:
         - Engaging and compelling
         - Platform-appropriate
         - Encouraging interaction
         - Include relevant call-to-action`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-content function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
