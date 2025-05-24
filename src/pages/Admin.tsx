
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from '@/contexts/AdminContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import UserManagement from '@/components/admin/UserManagement';
import AITeamManagement from '@/components/admin/AITeamManagement';
import ContentManagement from '@/components/admin/ContentManagement';
import BillingAdmin from '@/components/admin/BillingAdmin';
import SystemConfiguration from '@/components/admin/SystemConfiguration';
import AnalyticsReporting from '@/components/admin/AnalyticsReporting';
import SupportManagement from '@/components/admin/SupportManagement';

const Admin: React.FC = () => {
  return (
    <AdminProvider>
      <LanguageProvider>
        <AdminProtectedRoute>
          <AdminLayout>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/ai-team" element={
                <AdminProtectedRoute requiredRole="admin">
                  <AITeamManagement />
                </AdminProtectedRoute>
              } />
              <Route path="/content" element={
                <AdminProtectedRoute requiredRole="moderator">
                  <ContentManagement />
                </AdminProtectedRoute>
              } />
              <Route path="/billing" element={
                <AdminProtectedRoute requiredRole="admin">
                  <BillingAdmin />
                </AdminProtectedRoute>
              } />
              <Route path="/system" element={
                <AdminProtectedRoute requiredRole="super_admin">
                  <SystemConfiguration />
                </AdminProtectedRoute>
              } />
              <Route path="/analytics" element={
                <AdminProtectedRoute requiredRole="admin">
                  <AnalyticsReporting />
                </AdminProtectedRoute>
              } />
              <Route path="/support" element={<SupportManagement />} />
            </Routes>
          </AdminLayout>
        </AdminProtectedRoute>
      </LanguageProvider>
    </AdminProvider>
  );
};

export default Admin;
