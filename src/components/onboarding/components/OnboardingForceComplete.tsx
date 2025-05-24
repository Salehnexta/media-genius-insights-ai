
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
      
      // Directly update the database to mark onboarding as complete
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

      console.log('Onboarding marked as complete, redirecting...');
      
      toast({
        title: isArabic ? 'تم الإكمال!' : 'Completed!',
        description: isArabic ? 'تم إكمال الإعداد بنجاح' : 'Onboarding completed successfully',
      });

      // Force redirect to dashboard
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
        {isArabic ? 'إكمال الإعداد الآن' : 'Complete Onboarding Now'}
      </Button>
    </div>
  );
};

export default OnboardingForceComplete;
