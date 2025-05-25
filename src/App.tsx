
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
              {/* Redirect root to Arabic landing page */}
              <Route path="/" element={<Navigate to="/landing-ar" replace />} />
              
              {/* Landing pages */}
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/landing-ar" element={<LandingPageAr />} />
              
              {/* Auth pages */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth-ar" element={<AuthAr />} />
              <Route path="/register-ar" element={<RegisterAr />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              
              {/* Profile */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              
              {/* Management pages */}
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
              
              {/* Support and Help */}
              <Route
                path="/help-center"
                element={
                  <ProtectedRoute>
                    <HelpCenter />
                  </ProtectedRoute>
                }
              />
              
              {/* Billing */}
              <Route
                path="/billing"
                element={
                  <ProtectedRoute>
                    <Billing />
                  </ProtectedRoute>
                }
              />
              
              {/* Pricing pages */}
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/pricing-ar" element={<PricingAr />} />
              
              {/* Privacy pages */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/privacy-ar" element={<PrivacyAr />} />
              
              {/* Terms */}
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
