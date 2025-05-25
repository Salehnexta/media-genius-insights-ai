
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OnboardingForceCompleteProps {
  isArabic?: boolean;
}

const OnboardingForceComplete: React.FC<OnboardingForceCompleteProps> = ({ isArabic = false }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleForceComplete = async () => {
    if (!user) {
      console.error('No user found');
      return;
    }

    try {
      console.log('=== FORCE COMPLETING ONBOARDING ===');
      
      // First check if record exists
      const { data: existingData } = await supabase
        .from('onboarding_data')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingData) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('onboarding_data')
          .update({
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);

        if (updateError) {
          console.error('Error updating onboarding:', updateError);
          throw updateError;
        }
      } else {
        // Create new record with minimal data
        const { error: insertError } = await supabase
          .from('onboarding_data')
          .insert({
            user_id: user.id,
            completed_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            skill_level: 'beginner',
            business_name: 'Default Business',
            industry: 'technology'
          });

        if (insertError) {
          console.error('Error creating onboarding record:', insertError);
          throw insertError;
        }
      }

      console.log('Onboarding marked as complete, redirecting...');
      
      toast({
        title: isArabic ? 'تم الإكمال!' : 'Completed!',
        description: isArabic ? 'تم إكمال الإعداد بنجاح' : 'Onboarding completed successfully',
      });

      // Force redirect to dashboard with a hard refresh
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);

    } catch (error) {
      console.error('Error in force complete:', error);
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: isArabic ? 'حدث خطأ في إكمال الإعداد' : 'Error completing onboarding',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button 
        onClick={handleForceComplete}
        className="bg-red-600 hover:bg-red-700 text-white"
        size="sm"
      >
        {isArabic ? 'إكمال الإعداد الآن' : 'Force Complete & Go to Dashboard'}
      </Button>
    </div>
  );
};

export default OnboardingForceComplete;
