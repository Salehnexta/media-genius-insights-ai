
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const OpenAITest: React.FC = () => {
  const [prompt, setPrompt] = useState('مرحباً، اختبر الذكاء الاصطناعي');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const testOpenAI = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setResponse('');
    
    try {
      console.log('Testing OpenAI with prompt:', prompt);
      
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message: prompt,
          language: 'ar'
        }
      });
      
      if (error) {
        throw new Error(error.message || 'فشل في الاتصال بـ OpenAI');
      }
      
      if (data?.response) {
        setResponse(data.response);
        setSuccess(true);
      } else {
        throw new Error('لم يتم استلام رد من OpenAI');
      }
      
    } catch (err) {
      console.error('OpenAI test error:', err);
      setError(err instanceof Error ? err.message : 'خطأ غير معروف');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            اختبار OpenAI API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">الرسالة:</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="اكتب رسالة لاختبار الذكاء الاصطناعي..."
              className="min-h-[100px]"
            />
          </div>
          
          <Button 
            onClick={testOpenAI} 
            disabled={isLoading || !prompt.trim()}
            className="w-full flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MessageSquare className="w-4 h-4" />
            )}
            اختبار الذكاء الاصطناعي
          </Button>
          
          {/* Status */}
          {success && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">تم الاختبار بنجاح!</span>
            </div>
          )}
          
          {error && (
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Response */}
      {response && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="default" className="bg-green-100 text-green-800">
                رد الذكاء الاصطناعي
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{response}</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {isLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">جاري التواصل مع OpenAI...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OpenAITest;
