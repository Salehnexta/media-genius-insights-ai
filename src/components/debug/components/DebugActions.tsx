
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface DebugActionsProps {
  onRunTests: () => void;
  onFixSubscription: () => void;
  testing: boolean;
  fixingSubscription: boolean;
  hasSubscriptionIssue: boolean;
  user: any;
  isArabic: boolean;
}

const DebugActions: React.FC<DebugActionsProps> = ({
  onRunTests,
  onFixSubscription,
  testing,
  fixingSubscription,
  hasSubscriptionIssue,
  user,
  isArabic
}) => {
  return (
    <div className="flex gap-2">
      <Button 
        onClick={onRunTests} 
        disabled={testing}
        className={`flex-1 ${isArabic ? 'flex-row-reverse' : ''}`}
      >
        {testing ? (isArabic ? 'جاري الفحص...' : 'Running Tests...') : (isArabic ? 'فحص قاعدة البيانات' : 'Run Database Tests')}
      </Button>
      
      {hasSubscriptionIssue && user && (
        <Button 
          onClick={onFixSubscription}
          disabled={fixingSubscription}
          variant="outline"
          className={`${isArabic ? 'flex-row-reverse' : ''}`}
        >
          <Plus className="h-4 w-4 mr-2" />
          {fixingSubscription ? 'Creating...' : 'Fix Subscription'}
        </Button>
      )}
    </div>
  );
};

export default DebugActions;
