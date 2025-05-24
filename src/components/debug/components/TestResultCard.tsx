
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import type { TestResult, TestStatus } from '../types';

interface TestResultCardProps {
  result: TestResult;
  isArabic: boolean;
}

const TestResultCard: React.FC<TestResultCardProps> = ({ result, isArabic }) => {
  const getStatusIcon = (status: TestStatus) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: TestStatus) => {
    const statusText: Record<TestStatus, string> = {
      success: 'success',
      error: 'error',
      warning: 'warning'
    };

    const badgeVariant = status === 'success' ? 'default' : 
                        status === 'error' ? 'destructive' : 'secondary';

    return <Badge variant={badgeVariant}>{statusText[status]}</Badge>;
  };

  return (
    <Alert className={`${result.status === 'error' ? 'border-red-200' : result.status === 'warning' ? 'border-yellow-200' : 'border-green-200'}`}>
      <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          {getStatusIcon(result.status)}
          <span className="font-medium">{result.name}</span>
          {getStatusBadge(result.status)}
        </div>
      </div>
      <AlertDescription className={`mt-2 ${isArabic ? 'text-right' : ''}`}>
        {result.message}
        {result.details && (
          <details className="mt-2">
            <summary className="cursor-pointer text-sm opacity-75">
              {isArabic ? 'التفاصيل' : 'Details'}
            </summary>
            <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(result.details, null, 2)}
            </pre>
          </details>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default TestResultCard;
