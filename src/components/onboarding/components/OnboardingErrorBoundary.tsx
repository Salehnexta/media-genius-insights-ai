
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  isArabic?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class OnboardingErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Onboarding error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { isArabic = false } = this.props;

      return (
        <div className={`min-h-screen flex items-center justify-center ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-600 mb-4">
              <h2 className="text-xl font-semibold mb-2">
                {isArabic ? 'حدث خطأ غير متوقع' : 'Something went wrong'}
              </h2>
              <p className="text-sm text-gray-600">
                {isArabic 
                  ? 'يرجى إعادة تحميل الصفحة والمحاولة مرة أخرى' 
                  : 'Please refresh the page and try again'
                }
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {isArabic ? 'إعادة تحميل' : 'Reload Page'}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
