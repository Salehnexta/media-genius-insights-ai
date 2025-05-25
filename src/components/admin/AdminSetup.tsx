
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRoles } from '@/hooks/useUserRoles';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Shield, UserPlus, CheckCircle } from 'lucide-react';

const AdminSetup: React.FC = () => {
  const { user } = useAuth();
  const { assignRole, isSuperAdmin, refetch } = useUserRoles();
  const { toast } = useToast();
  
  const [hasAdmin, setHasAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const checkForAdmin = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('role', 'super_admin')
        .eq('is_active', true)
        .limit(1);

      if (error) {
        console.error('Error checking for admin:', error);
      } else {
        setHasAdmin(data && data.length > 0);
      }
    } catch (error) {
      console.error('Error checking for admin:', error);
    } finally {
      setLoading(false);
    }
  };

  const createFirstAdmin = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create an admin account",
        variant: "destructive"
      });
      return;
    }

    setCreating(true);
    
    try {
      // Insert directly into the database since this is the first admin
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          role: 'super_admin',
          assigned_by: user.id
        });

      if (error) {
        console.error('Error creating admin:', error);
        toast({
          title: "Error",
          description: "Failed to create admin account",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Super admin account created successfully!"
        });
        setHasAdmin(true);
        refetch(); // Refresh user roles
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      toast({
        title: "Error",
        description: "Failed to create admin account",
        variant: "destructive"
      });
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    checkForAdmin();
  }, []);

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking admin status...</p>
        </CardContent>
      </Card>
    );
  }

  if (hasAdmin && !isSuperAdmin()) {
    return null; // Don't show anything if admin exists and current user isn't admin
  }

  if (hasAdmin && isSuperAdmin()) {
    return (
      <Card className="w-full max-w-md mx-auto border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Admin Setup Complete
          </h3>
          <p className="text-green-700">
            You have super admin privileges and can manage the system.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto border-yellow-200 bg-yellow-50">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-yellow-800">
          <Shield className="h-6 w-6" />
          First Time Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <div className="space-y-2">
          <h3 className="font-semibold text-yellow-800">
            No Admin Account Found
          </h3>
          <p className="text-yellow-700 text-sm">
            This appears to be the first time accessing the system. 
            Create your super admin account to get started.
          </p>
        </div>

        <Button
          onClick={createFirstAdmin}
          disabled={creating}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          {creating ? 'Creating Admin...' : 'Create My Admin Account'}
        </Button>

        <p className="text-xs text-yellow-600">
          This will grant you super admin privileges to manage users, 
          roles, and system settings.
        </p>
      </CardContent>
    </Card>
  );
};

export default AdminSetup;
