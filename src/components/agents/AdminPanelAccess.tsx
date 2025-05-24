
import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

const AdminPanelAccess: React.FC = () => {
  const { isAdmin, adminUser } = useAdmin();

  if (!isAdmin) return null;

  return (
    <Link to="/admin">
      <Button variant="outline" size="sm" className="gap-2">
        <Shield className="h-4 w-4" />
        Admin Panel
      </Button>
    </Link>
  );
};

export default AdminPanelAccess;
