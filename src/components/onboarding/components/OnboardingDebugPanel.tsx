
import React from 'react';
import { Button } from '@/components/ui/button';

interface OnboardingDebugPanelProps {
  currentStep: number;
  totalSteps: number;
  dataCompleted?: boolean;
  saving: boolean;
  isNavigating: boolean;
  onForceComplete?: () => void;
}

const OnboardingDebugPanel: React.FC<OnboardingDebugPanelProps> = ({ 
  currentStep,
  totalSteps,
  dataCompleted,
  saving,
  isNavigating,
  onForceComplete
}) => {
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const handleForceComplete = () => {
    console.log('=== FORCE COMPLETE DEBUG ===');
    console.log('Current step:', currentStep);
    console.log('Total steps:', totalSteps);
    console.log('Data completed:', dataCompleted);
    
    if (onForceComplete) {
      onForceComplete();
    } else {
      // Force navigation to dashboard
      console.log('Force completing onboarding and navigating to dashboard');
      window.location.href = '/';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg shadow-lg text-xs">
      <h4 className="font-bold mb-2">Debug Panel</h4>
      <div className="space-y-1">
        <div>Step: {currentStep + 1}/{totalSteps}</div>
        <div>Completed: {dataCompleted ? 'Yes' : 'No'}</div>
        <div>Saving: {saving ? 'Yes' : 'No'}</div>
        <div>Navigating: {isNavigating ? 'Yes' : 'No'}</div>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleForceComplete}
          className="mt-2 w-full"
        >
          Force Complete & Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default OnboardingDebugPanel;
