
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OnboardingData } from '../OnboardingWizard';

interface OnboardingContentProps {
  stepTitle: string;
  stepComponent: React.ComponentType<{
    data: OnboardingData;
    updateData: (data: Partial<OnboardingData>) => void;
    isArabic: boolean;
  }>;
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const OnboardingContent: React.FC<OnboardingContentProps> = ({ 
  stepTitle,
  stepComponent: StepComponent,
  data,
  updateData,
  isArabic
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className={`text-xl ${isArabic ? 'text-right' : 'text-left'}`}>
          {stepTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <StepComponent
          data={data}
          updateData={updateData}
          isArabic={isArabic}
        />
      </CardContent>
    </Card>
  );
};

export default OnboardingContent;
