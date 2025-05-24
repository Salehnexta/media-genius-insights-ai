
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthAr from "./pages/AuthAr";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import Campaigns from "./pages/Campaigns";
import Agents from "./pages/Agents";
import Insights from "./pages/Insights";
import Subscription from "./pages/Subscription";
import SubscriptionAr from "./pages/SubscriptionAr";
import Pricing from "./pages/Pricing";
import PricingAr from "./pages/PricingAr";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import LandingPage from "./pages/LandingPage";
import LandingPageAr from "./pages/LandingPageAr";
import RegisterAr from "./pages/RegisterAr";
import ZapierSettings from "./pages/ZapierSettings";
import Debug from "./pages/Debug";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/landing-ar" element={<LandingPageAr />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth-ar" element={<AuthAr />} />
                <Route path="/register-ar" element={<RegisterAr />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/pricing-ar" element={<PricingAr />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/debug" element={<Debug />} />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/campaigns"
                  element={
                    <ProtectedRoute>
                      <Campaigns />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/agents"
                  element={
                    <ProtectedRoute>
                      <Agents />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/insights"
                  element={
                    <ProtectedRoute>
                      <Insights />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/subscription"
                  element={
                    <ProtectedRoute>
                      <Subscription />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/subscription-ar"
                  element={
                    <ProtectedRoute>
                      <SubscriptionAr />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/zapier-settings"
                  element={
                    <ProtectedRoute>
                      <ZapierSettings />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
