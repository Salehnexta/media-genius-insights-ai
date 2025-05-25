
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRoles } from '@/hooks/useUserRoles';
import BreadcrumbNavigation from '@/components/layout/BreadcrumbNavigation';
import AdminSetup from '@/components/admin/AdminSetup';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const Index = () => {
  const { user } = useAuth();
  const { userRoles, loading } = useUserRoles();

  // Show admin setup if no roles are loaded and not loading
  const showAdminSetup = !loading && userRoles.length === 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-6">
        <BreadcrumbNavigation />
        
        {showAdminSetup ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <AdminSetup />
          </div>
        ) : (
          <DashboardTabs />
        )}
      </div>
    </div>
  );
};

export default Index;
