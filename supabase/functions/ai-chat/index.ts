
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { message, context = 'general', language = 'en' } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    console.log('Processing AI chat request:', { message, context, language });

    // Get specialized agent prompt based on context
    const systemPrompt = getAgentPrompt(context, language);

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
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI response generated successfully');

    return new Response(JSON.stringify({ 
      response: aiResponse,
      context,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallback: 'I apologize, but I encountered an issue processing your request. Please try again.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getAgentPrompt(context: string, language: string): string {
  const isArabic = language === 'ar';
  
  const basePrompt = isArabic 
    ? 'أنت مساعد تسويق ذكي متخصص في مساعدة الشركات على تحسين استراتيجيات التسويق الرقمي.'
    : 'You are an AI Marketing Assistant specialized in helping businesses optimize their digital marketing strategies.';

  const contextPrompts = {
    general: isArabic 
      ? `${basePrompt} قدم رؤى مفيدة وتوصيات عملية بناءً على أفضل الممارسات في التسويق الرقمي. أجب باللغة العربية.`
      : `${basePrompt} Provide helpful insights and actionable recommendations based on digital marketing best practices.`,
    
    campaign: isArabic
      ? `${basePrompt} أنت متخصص في تحليل الحملات التسويقية وتحسين الأداء. قدم تحليلاً مفصلاً ونصائح لتحسين ROI. أجب باللغة العربية.`
      : `${basePrompt} You specialize in campaign analysis and performance optimization. Provide detailed analysis and tips to improve ROI.`,
    
    content: isArabic
      ? `${basePrompt} أنت خبير في إنشاء المحتوى وتحسين المحتوى للوسائل الاجتماعية. قدم اقتراحات إبداعية ومقترحات للمحتوى. أجب باللغة العربية.`
      : `${basePrompt} You are an expert in content creation and social media content optimization. Provide creative suggestions and content ideas.`,
    
    audience: isArabic
      ? `${basePrompt} أنت متخصص في تحليل الجمهور وتجزئة العملاء. قدم رؤى حول سلوك المستهلكين واستراتيجيات الاستهداف. أجب باللغة العربية.`
      : `${basePrompt} You specialize in audience analysis and customer segmentation. Provide insights on consumer behavior and targeting strategies.`,
    
    trends: isArabic
      ? `${basePrompt} أنت محلل اتجاهات السوق وتتابع أحدث التطورات في التسويق الرقمي. قدم رؤى حول الاتجاهات الناشئة والفرص. أجب باللغة العربية.`
      : `${basePrompt} You are a market trends analyst tracking the latest developments in digital marketing. Provide insights on emerging trends and opportunities.`
  };

  return contextPrompts[context as keyof typeof contextPrompts] || contextPrompts.general;
}
