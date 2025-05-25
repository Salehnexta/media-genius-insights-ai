
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
