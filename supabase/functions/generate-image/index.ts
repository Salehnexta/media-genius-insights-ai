
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
    const { prompt, style = 'realistic', size = '1024x1024' } = await req.json();

    if (!prompt) {
      throw new Error('Prompt is required');
    }

    console.log('Generating image with DALL-E:', { prompt, style, size });

    // Enhance prompt based on style
    const enhancedPrompt = enhancePromptWithStyle(prompt, style);

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: enhancedPrompt,
        n: 1,
        size: size,
        quality: 'standard',
        response_format: 'url'
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    console.log('Image generated successfully');

    return new Response(JSON.stringify({ 
      imageUrl,
      prompt: enhancedPrompt,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-image function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallback: 'Failed to generate image. Please try again with a different prompt.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function enhancePromptWithStyle(prompt: string, style: string): string {
  const styleEnhancements = {
    realistic: `High-quality, photorealistic ${prompt}`,
    illustration: `Beautiful digital illustration of ${prompt}, artistic style`,
    cartoon: `Cartoon-style illustration of ${prompt}, colorful and playful`,
    abstract: `Abstract artistic interpretation of ${prompt}, modern art style`,
    minimalist: `Minimalist, clean design of ${prompt}, simple and elegant`
  };

  return styleEnhancements[style as keyof typeof styleEnhancements] || prompt;
}
