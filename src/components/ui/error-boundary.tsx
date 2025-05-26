
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  isArabic?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isArabic = this.props.isArabic;

      return (
        <div className={`min-h-[400px] flex items-center justify-center p-4 ${isArabic ? 'rtl' : 'ltr'}`}>
          <Card className="w-full max-w-md">
            <CardHeader className={`text-center ${isArabic ? 'text-right' : 'text-left'}`}>
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className={`text-xl ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'حدث خطأ غير متوقع' : 'Something went wrong'}
              </CardTitle>
            </CardHeader>
            <CardContent className={`text-center space-y-4 ${isArabic ? 'text-right' : 'text-left'}`}>
              <p className={`text-muted-foreground ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic 
                  ? 'نعتذر، حدث خطأ أثناء تحميل هذا القسم. يرجى المحاولة مرة أخرى.'
                  : 'We apologize for the inconvenience. Please try refreshing the page.'
                }
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left">
                  <summary className="cursor-pointer text-sm font-medium">
                    Error Details
                  </summary>
                  <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
              <div className={`flex gap-2 justify-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Button onClick={this.handleRetry} className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  {isArabic ? 'إعادة المحاولة' : 'Try Again'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()}
                >
                  {isArabic ? 'تحديث الصفحة' : 'Refresh Page'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
