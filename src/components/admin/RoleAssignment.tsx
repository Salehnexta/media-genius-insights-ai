
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserRoles, UserRole } from '@/hooks/useUserRoles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Shield, UserCheck, UserX } from 'lucide-react';

interface RoleAssignmentProps {
  targetUserId: string;
  targetUserName: string;
  currentRoles: UserRole[];
  onRoleChange?: () => void;
}

const RoleAssignment: React.FC<RoleAssignmentProps> = ({
  targetUserId,
  targetUserName,
  currentRoles,
  onRoleChange
}) => {
  const { language } = useLanguage();
  const { assignRole, removeRole, isSuperAdmin } = useUserRoles();
  const { toast } = useToast();
  const isArabic = language === 'ar';
  
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [loading, setLoading] = useState(false);

  const roleLabels: Record<UserRole, { en: string; ar: string }> = {
    super_admin: { en: 'Super Admin', ar: 'مدير عام' },
    admin: { en: 'Admin', ar: 'مدير' },
    manager: { en: 'Manager', ar: 'مدير فرعي' },
    user: { en: 'User', ar: 'مستخدم' }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return 'bg-red-600';
      case 'admin': return 'bg-orange-600';
      case 'manager': return 'bg-blue-600';
      case 'user': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const handleAssignRole = async () => {
    if (currentRoles.includes(selectedRole)) {
      toast({
        title: isArabic ? "تحذير" : "Warning",
        description: isArabic ? "المستخدم يملك هذا الدور بالفعل" : "User already has this role",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const success = await assignRole(targetUserId, selectedRole);
    
    if (success) {
      toast({
        title: isArabic ? "تم بنجاح" : "Success",
        description: isArabic ? "تم تعيين الدور بنجاح" : "Role assigned successfully"
      });
      onRoleChange?.();
    } else {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "فشل في تعيين الدور" : "Failed to assign role",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const handleRemoveRole = async (role: UserRole) => {
    setLoading(true);
    const success = await removeRole(targetUserId, role);
    
    if (success) {
      toast({
        title: isArabic ? "تم بنجاح" : "Success",
        description: isArabic ? "تم إزالة الدور بنجاح" : "Role removed successfully"
      });
      onRoleChange?.();
    } else {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "فشل في إزالة الدور" : "Failed to remove role",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  if (!isSuperAdmin()) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
          <Shield className="h-5 w-5" />
          {isArabic ? 'إدارة الأدوار' : 'Role Management'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`${isArabic ? 'text-right' : ''}`}>
          <p className={`text-sm text-gray-600 dark:text-gray-400 mb-2 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'المستخدم:' : 'User:'} {targetUserName}
          </p>
          
          <div className={`flex flex-wrap gap-2 mb-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
            {currentRoles.map((role) => (
              <div key={role} className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Badge className={`${getRoleColor(role)} text-white ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? roleLabels[role].ar : roleLabels[role].en}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveRole(role)}
                  disabled={loading}
                  className="h-6 w-6 p-0 text-red-600 hover:text-red-800"
                >
                  <UserX className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className={`flex gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(roleLabels).map(([role, labels]) => (
                <SelectItem key={role} value={role}>
                  {isArabic ? labels.ar : labels.en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={handleAssignRole}
            disabled={loading}
            size="sm"
          >
            <UserCheck className="h-4 w-4 mr-1" />
            <span className={isArabic ? 'font-arabic' : ''}>
              {isArabic ? 'تعيين' : 'Assign'}
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleAssignment;
