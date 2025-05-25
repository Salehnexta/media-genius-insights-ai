import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserRoles } from '@/hooks/useUserRoles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import BreadcrumbNavigation from '@/components/layout/BreadcrumbNavigation';
import BackButton from '@/components/layout/BackButton';
import RoleAssignment from '@/components/admin/RoleAssignment';
import { Users, Shield, Search, Filter, UserCheck, UserX } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  joinDate: string;
  avatar?: string;
}

const UserManagement: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { canManageUsers, isAdmin } = useUserRoles();
  const { toast } = useToast();
  const isArabic = language === 'ar';
  
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'محمد أحمد',
      email: 'mohamed@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-20',
      joinDate: '2024-01-01'
    },
    {
      id: '2',
      name: 'سارة محمود',
      email: 'sara@example.com',
      role: 'manager',
      status: 'active',
      lastLogin: '2024-01-19',
      joinDate: '2024-01-05'
    },
    {
      id: '3',
      name: 'علي حسن',
      email: 'ali@example.com',
      role: 'user',
      status: 'inactive',
      lastLogin: '2024-01-15',
      joinDate: '2024-01-10'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    toast({
      title: isArabic ? "تم التحديث" : "Updated",
      description: isArabic ? "تم تحديث حالة المستخدم" : "User status has been updated"
    });
  };

  const handleRoleChange = (userId: string, newRole: User['role']) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    
    toast({
      title: isArabic ? "تم التحديث" : "Updated",
      description: isArabic ? "تم تحديث دور المستخدم" : "User role has been updated"
    });
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'admin': return 'bg-red-600';
      case 'manager': return 'bg-blue-600';
      case 'user': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'inactive': return 'bg-yellow-600';
      case 'suspended': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  // Check permissions
  if (!canManageUsers()) {
    return (
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 p-8 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="max-w-6xl mx-auto">
          <BreadcrumbNavigation />
          <BackButton showHome />
          <Card>
            <CardContent className="p-8 text-center">
              <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className={`text-xl font-semibold mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'غير مصرح' : 'Access Denied'}
              </h2>
              <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'ليس لديك صلاحية للوصول لهذه الصفحة' : 'You do not have permission to access this page'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 p-8 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto space-y-8">
        <BreadcrumbNavigation />
        <BackButton showHome />
        
        {/* Header */}
        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={`${isArabic ? 'text-right' : ''}`}>
            <h1 className={`text-3xl font-bold ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'إدارة المستخدمين' : 'User Management'}
            </h1>
            <p className={`text-gray-600 dark:text-gray-400 mt-2 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'إدارة المستخدمين والصلاحيات' : 'Manage users and permissions'}
            </p>
          </div>
          <Shield className="h-8 w-8 text-blue-600" />
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`${isArabic ? 'text-right' : ''}`}>
                  <p className={`text-2xl font-bold ${isArabic ? 'font-arabic' : ''}`}>{users.length}</p>
                  <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'إجمالي المستخدمين' : 'Total Users'}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`${isArabic ? 'text-right' : ''}`}>
                  <p className={`text-2xl font-bold text-green-600 ${isArabic ? 'font-arabic' : ''}`}>
                    {users.filter(u => u.status === 'active').length}
                  </p>
                  <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'نشط' : 'Active'}
                  </p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`${isArabic ? 'text-right' : ''}`}>
                  <p className={`text-2xl font-bold text-yellow-600 ${isArabic ? 'font-arabic' : ''}`}>
                    {users.filter(u => u.status === 'inactive').length}
                  </p>
                  <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'غير نشط' : 'Inactive'}
                  </p>
                </div>
                <UserX className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`${isArabic ? 'text-right' : ''}`}>
                  <p className={`text-2xl font-bold text-red-600 ${isArabic ? 'font-arabic' : ''}`}>
                    {users.filter(u => u.role === 'admin').length}
                  </p>
                  <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'مديرين' : 'Admins'}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className={`flex gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <Input
                  placeholder={isArabic ? 'البحث عن المستخدمين...' : 'Search users...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`${isArabic ? 'text-right' : ''}`}
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={isArabic ? 'الحالة' : 'Status'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isArabic ? 'جميع الحالات' : 'All Status'}</SelectItem>
                  <SelectItem value="active">{isArabic ? 'نشط' : 'Active'}</SelectItem>
                  <SelectItem value="inactive">{isArabic ? 'غير نشط' : 'Inactive'}</SelectItem>
                  <SelectItem value="suspended">{isArabic ? 'موقوف' : 'Suspended'}</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={isArabic ? 'الدور' : 'Role'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isArabic ? 'جميع الأدوار' : 'All Roles'}</SelectItem>
                  <SelectItem value="admin">{isArabic ? 'مدير' : 'Admin'}</SelectItem>
                  <SelectItem value="manager">{isArabic ? 'مدير فرعي' : 'Manager'}</SelectItem>
                  <SelectItem value="user">{isArabic ? 'مستخدم' : 'User'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle className={`${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'قائمة المستخدمين' : 'Users List'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredUsers.map((userData) => (
                <div key={userData.id} className="space-y-4">
                  <div className={`flex items-center justify-between p-4 border rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <Avatar>
                        <AvatarImage src={userData.avatar} />
                        <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className={`${isArabic ? 'text-right' : ''}`}>
                        <h3 className={`font-semibold ${isArabic ? 'font-arabic' : ''}`}>{userData.name}</h3>
                        <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>{userData.email}</p>
                        <p className={`text-sm text-gray-500 ${isArabic ? 'font-arabic' : ''}`}>
                          {isArabic ? 'آخر دخول:' : 'Last login:'} {userData.lastLogin}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <Select value={userData.role} onValueChange={(value) => handleRoleChange(userData.id, value as User['role'])}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">{isArabic ? 'مدير' : 'Admin'}</SelectItem>
                          <SelectItem value="manager">{isArabic ? 'مدير فرعي' : 'Manager'}</SelectItem>
                          <SelectItem value="user">{isArabic ? 'مستخدم' : 'User'}</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select value={userData.status} onValueChange={(value) => handleStatusChange(userData.id, value as User['status'])}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">{isArabic ? 'نشط' : 'Active'}</SelectItem>
                          <SelectItem value="inactive">{isArabic ? 'غير نشط' : 'Inactive'}</SelectItem>
                          <SelectItem value="suspended">{isArabic ? 'موقوف' : 'Suspended'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Role management for each user */}
                  {isAdmin() && (
                    <RoleAssignment
                      targetUserId={userData.id}
                      targetUserName={userData.name}
                      currentRoles={[userData.role]} // Convert old role to new system
                      onRoleChange={() => {
                        // Refresh users data
                        toast({
                          title: isArabic ? "تم التحديث" : "Updated",
                          description: isArabic ? "تم تحديث أدوار المستخدم" : "User roles updated"
                        });
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
