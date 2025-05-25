
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'super_admin' | 'admin' | 'manager' | 'user';

interface UserRoleData {
  id: string;
  user_id: string;
  role: UserRole;
  assigned_by: string | null;
  assigned_at: string;
  is_active: boolean;
  created_at: string;
}

export const useUserRoles = () => {
  const { user } = useAuth();
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserRoles = async () => {
    if (!user) {
      setUserRoles([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching user roles:', error);
        setError(error.message);
        setUserRoles(['user']); // Default role
      } else {
        const roles = data?.map((role: UserRoleData) => role.role) || ['user'];
        setUserRoles(roles);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching user roles:', err);
      setError('Failed to fetch user roles');
      setUserRoles(['user']);
    } finally {
      setLoading(false);
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return userRoles.includes(role);
  };

  const isAdmin = (): boolean => {
    return hasRole('super_admin') || hasRole('admin');
  };

  const isSuperAdmin = (): boolean => {
    return hasRole('super_admin');
  };

  const canManageUsers = (): boolean => {
    return hasRole('super_admin') || hasRole('admin') || hasRole('manager');
  };

  const assignRole = async (targetUserId: string, role: UserRole): Promise<boolean> => {
    if (!isSuperAdmin()) {
      setError('Insufficient permissions');
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: targetUserId,
          role: role,
          assigned_by: user?.id
        });

      if (error) {
        console.error('Error assigning role:', error);
        setError(error.message);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Error assigning role:', err);
      setError('Failed to assign role');
      return false;
    }
  };

  const removeRole = async (targetUserId: string, role: UserRole): Promise<boolean> => {
    if (!isSuperAdmin()) {
      setError('Insufficient permissions');
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ is_active: false })
        .eq('user_id', targetUserId)
        .eq('role', role);

      if (error) {
        console.error('Error removing role:', error);
        setError(error.message);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Error removing role:', err);
      setError('Failed to remove role');
      return false;
    }
  };

  useEffect(() => {
    fetchUserRoles();
  }, [user]);

  return {
    userRoles,
    loading,
    error,
    hasRole,
    isAdmin,
    isSuperAdmin,
    canManageUsers,
    assignRole,
    removeRole,
    refetch: fetchUserRoles
  };
};
