
import React from 'react';
import { Loader2, User, Settings, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface ProfileLoadingStateProps {
  isArabic: boolean;
}

const ProfileLoadingState: React.FC<ProfileLoadingStateProps> = ({ isArabic }) => {
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Header Loading */}
        <div className="mb-6 sm:mb-8">
          <Card className="relative overflow-hidden shadow-lg border-0 bg-white dark:bg-gray-900">
            <div className="h-56 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700" />
            <CardContent className="relative pt-0 pb-8">
              <div className={`flex items-end gap-6 -mt-20 pb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Skeleton className="w-36 h-36 rounded-full border-4 border-white" />
                <div className={`flex-1 space-y-3 ${isArabic ? 'text-right' : ''}`}>
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-72" />
                  <Skeleton className="h-3 w-full max-w-md" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar Loading */}
          <div className="xl:col-span-1">
            <Card className="h-fit">
              <CardHeader className="text-center">
                <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
                <Skeleton className="h-6 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </CardHeader>
              <CardContent className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-lg" />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Content Loading */}
          <div className="xl:col-span-3">
            <Card className="shadow-sm lg:shadow-lg border-0 bg-white dark:bg-gray-900">
              <CardHeader className="border-b p-4 sm:p-6">
                <Skeleton className="h-8 w-48" />
              </CardHeader>
              <CardContent className="p-4 sm:p-6 lg:p-8 space-y-6">
                <div className="text-center py-12">
                  <LoadingSpinner 
                    size="lg" 
                    text={isArabic ? 'جاري تحميل الملف الشخصي...' : 'Loading profile...'}
                    variant="primary"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoadingState;
