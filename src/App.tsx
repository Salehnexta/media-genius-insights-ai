
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import AuthAr from '@/pages/AuthAr';
import RegisterAr from '@/pages/RegisterAr';
import LandingPage from '@/pages/LandingPage';
import LandingPageAr from '@/pages/LandingPageAr';
import Pricing from '@/pages/Pricing';
import PricingAr from '@/pages/PricingAr';
import Privacy from '@/pages/Privacy';
import PrivacyAr from '@/pages/PrivacyAr';
import Terms from '@/pages/Terms';
import Onboarding from '@/pages/Onboarding';
import Profile from '@/pages/Profile';
import EnhancedProfile from '@/pages/EnhancedProfile';
import Subscription from '@/pages/Subscription';
import SubscriptionAr from '@/pages/SubscriptionAr';
import Campaigns from '@/pages/Campaigns';
import Agents from '@/pages/Agents';
import Insights from '@/pages/Insights';
import ZapierSettings from '@/pages/ZapierSettings';
import Debug from '@/pages/Debug';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={
                <LanguageProvider>
                  <Index />
                </LanguageProvider>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Navigate to="/" replace />
                </ProtectedRoute>
              } />
              <Route path="/auth" element={
                <LanguageProvider>
                  <Auth />
                </LanguageProvider>
              } />
              <Route path="/auth-ar" element={<AuthAr />} />
              <Route path="/register-ar" element={<RegisterAr />} />
              <Route path="/landing" element={
                <LanguageProvider>
                  <LandingPage />
                </LanguageProvider>
              } />
              <Route path="/landing-ar" element={<LandingPageAr />} />
              <Route path="/pricing" element={
                <LanguageProvider>
                  <Pricing />
                </LanguageProvider>
              } />
              <Route path="/pricing-ar" element={<PricingAr />} />
              <Route path="/privacy" element={
                <LanguageProvider>
                  <Privacy />
                </LanguageProvider>
              } />
              <Route path="/privacy-ar" element={<PrivacyAr />} />
              <Route path="/terms" element={
                <LanguageProvider>
                  <Terms />
                </LanguageProvider>
              } />
              <Route path="/onboarding" element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <LanguageProvider>
                    <Profile />
                  </LanguageProvider>
                </ProtectedRoute>
              } />
              <Route path="/enhanced-profile" element={
                <ProtectedRoute>
                  <LanguageProvider>
                    <EnhancedProfile />
                  </LanguageProvider>
                </ProtectedRoute>
              } />
              <Route path="/subscription" element={
                <ProtectedRoute>
                  <LanguageProvider>
                    <Subscription />
                  </LanguageProvider>
                </ProtectedRoute>
              } />
              <Route path="/subscription-ar" element={
                <ProtectedRoute>
                  <SubscriptionAr />
                </ProtectedRoute>
              } />
              <Route path="/campaigns" element={
                <ProtectedRoute>
                  <LanguageProvider>
                    <Campaigns />
                  </LanguageProvider>
                </ProtectedRoute>
              } />
              <Route path="/agents" element={
                <ProtectedRoute>
                  <LanguageProvider>
                    <Agents />
                  </LanguageProvider>
                </ProtectedRoute>
              } />
              <Route path="/insights" element={
                <ProtectedRoute>
                  <LanguageProvider>
                    <Insights />
                  </LanguageProvider>
                </ProtectedRoute>
              } />
              <Route path="/zapier-settings" element={
                <ProtectedRoute>
                  <LanguageProvider>
                    <ZapierSettings />
                  </LanguageProvider>
                </ProtectedRoute>
              } />
              <Route path="/debug" element={
                <ProtectedRoute>
                  <LanguageProvider>
                    <Debug />
                  </LanguageProvider>
                </ProtectedRoute>
              } />
              <Route path="*" element={
                <LanguageProvider>
                  <NotFound />
                </LanguageProvider>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
