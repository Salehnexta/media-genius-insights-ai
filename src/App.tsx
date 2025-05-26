
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthAr from "./pages/AuthAr";
import RegisterAr from "./pages/RegisterAr";
import LandingPage from "./pages/LandingPage";
import LandingPageAr from "./pages/LandingPageAr";
import Pricing from "./pages/Pricing";
import PricingAr from "./pages/PricingAr";
import Privacy from "./pages/Privacy";
import PrivacyAr from "./pages/PrivacyAr";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import TeamManagement from "./pages/TeamManagement";
import UserManagement from "./pages/UserManagement";
import HelpCenter from "./pages/HelpCenter";
import Billing from "./pages/Billing";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* الصفحة الرئيسية - توجيه للوحة التحكم أو الهبوط */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              />
              
              {/* لوحة التحكم - نفس المسار للراحة */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              
              {/* صفحات الهبوط */}
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/landing-ar" element={<LandingPageAr />} />
              
              {/* صفحات المصادقة */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth-ar" element={<AuthAr />} />
              <Route path="/register-ar" element={<RegisterAr />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* معالج الإعداد */}
              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                }
              />
              
              {/* الملف الشخصي */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              
              {/* صفحات الإدارة */}
              <Route
                path="/team-management"
                element={
                  <ProtectedRoute>
                    <TeamManagement />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/user-management"
                element={
                  <ProtectedRoute>
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              
              {/* المساعدة والدعم */}
              <Route
                path="/help-center"
                element={
                  <ProtectedRoute>
                    <HelpCenter />
                  </ProtectedRoute>
                }
              />
              
              {/* الفوترة */}
              <Route
                path="/billing"
                element={
                  <ProtectedRoute>
                    <Billing />
                  </ProtectedRoute>
                }
              />
              
              {/* صفحات الأسعار */}
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/pricing-ar" element={<PricingAr />} />
              
              {/* صفحات الخصوصية */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/privacy-ar" element={<PrivacyAr />} />
              
              {/* الشروط */}
              <Route path="/terms" element={<Terms />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
