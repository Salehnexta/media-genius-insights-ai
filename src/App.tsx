
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthAr from "./pages/AuthAr";
import RegisterAr from "./pages/RegisterAr";
import LandingPage from "./pages/LandingPage";
import LandingPageAr from "./pages/LandingPageAr";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Campaigns from "./pages/Campaigns";
import ZapierSettings from "./pages/ZapierSettings";
import Subscription from "./pages/Subscription";
import SubscriptionAr from "./pages/SubscriptionAr";
import Pricing from "./pages/Pricing";
import PricingAr from "./pages/PricingAr";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Debug from "./pages/Debug";
import Agents from "./pages/Agents";
import NotFound from "./pages/NotFound";

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
              {/* Public routes */}
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/landing-ar" element={<LandingPageAr />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth-ar" element={<AuthAr />} />
              <Route path="/register-ar" element={<RegisterAr />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/pricing-ar" element={<PricingAr />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              
              {/* Protected routes */}
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
              <Route path="/agents" element={<ProtectedRoute><Agents /></ProtectedRoute>} />
              <Route path="/zapier" element={<ProtectedRoute><ZapierSettings /></ProtectedRoute>} />
              <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
              <Route path="/subscription-ar" element={<ProtectedRoute><SubscriptionAr /></ProtectedRoute>} />
              <Route path="/debug" element={<ProtectedRoute><Debug /></ProtectedRoute>} />
              
              {/* 404 fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
