
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import DataStatusChecker from "@/components/debug/DataStatusChecker";

const Index = () => {
  const { user, loading } = useAuth();
  const { isArabic } = useLanguage();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {isArabic ? "مرحباً بك في مورفو" : "Welcome to Morpho"}
          </h1>
          <p className="text-gray-600">
            {isArabic ? "يرجى تسجيل الدخول للمتابعة" : "Please sign in to continue"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-2">
            {isArabic ? "مرحباً بك في مورفو" : "Welcome to Morpho"}
          </h1>
          <p className="text-center text-gray-600">
            {isArabic ? "منصة الذكاء الاصطناعي للتسويق الرقمي" : "AI-Powered Digital Marketing Platform"}
          </p>
        </div>
        
        {/* عرض حالة البيانات المستخرجة */}
        <div className="mb-8">
          <DataStatusChecker />
        </div>
        
        <DashboardLayoutWrapper />
      </div>
    </div>
  );
};

export default Index;
