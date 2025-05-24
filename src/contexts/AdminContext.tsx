
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  user_id: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator' | 'support';
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

interface AdminContextType {
  adminUser: AdminUser | null;
  isAdmin: boolean;
  loading: boolean;
  hasPermission: (requiredRole: 'super_admin' | 'admin' | 'moderator' | 'support') => boolean;
  refreshAdminStatus: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const roleHierarchy = {
    'super_admin': 4,
    'admin': 3,
    'moderator': 2,
    'support': 1
  };

  const hasPermission = (requiredRole: 'super_admin' | 'admin' | 'moderator' | 'support'): boolean => {
    if (!adminUser) return false;
    return roleHierarchy[adminUser.role] >= roleHierarchy[requiredRole];
  };

  const refreshAdminStatus = async () => {
    if (!user) {
      setAdminUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching admin user:', error);
        setAdminUser(null);
      } else {
        setAdminUser(data || null);
        
        // Update last login
        if (data) {
          await supabase
            .from('admin_users')
            .update({ last_login: new Date().toISOString() })
            .eq('id', data.id);
        }
      }
    } catch (error) {
      console.error('Error in refreshAdminStatus:', error);
      setAdminUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAdminStatus();
  }, [user]);

  const value = {
    adminUser,
    isAdmin: !!adminUser,
    loading,
    hasPermission,
    refreshAdminStatus
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
