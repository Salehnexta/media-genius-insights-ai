
import React from 'react';

interface OnboardingDebugPanelProps {
  currentStep: number;
  totalSteps: number;
  dataCompleted?: boolean;
  saving: boolean;
  isNavigating: boolean;
}

const OnboardingDebugPanel: React.FC<OnboardingDebugPanelProps> = ({
  currentStep,
  totalSteps,
  dataCompleted,
  saving,
  isNavigating
}) => {
  return (
    <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs">
      <h3 className="font-bold mb-2">Debug Info:</h3>
      <p>Current Step: {currentStep + 1}/{totalSteps}</p>
      <p>Is Final Step: {currentStep === totalSteps - 1 ? 'Yes' : 'No'}</p>
      <p>Data Completed: {dataCompleted ? 'Yes' : 'No'}</p>
      <p>Saving: {saving ? 'Yes' : 'No'}</p>
      <p>Navigating: {isNavigating ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default OnboardingDebugPanel;
