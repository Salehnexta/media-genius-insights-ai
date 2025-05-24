
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { 
  Search, 
  Filter, 
  Download, 
  Mail, 
  MoreHorizontal,
  UserCheck,
  UserX,
  Eye
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
  onboarding_data?: {
    completed_at: string | null;
    business_name: string | null;
  } | null;
}

const UserManagement: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Get user count first
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      setTotalUsers(count || 0);

      // Fetch users with related data
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          avatar_url,
          created_at,
          onboarding_data (
            completed_at,
            business_name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching users:', error);
        return;
      }

      // Transform data to match our interface
      const transformedUsers = data?.map(user => ({
        id: user.id,
        email: '', // We'll need to get this from auth.users if needed
        created_at: user.created_at || '',
        last_sign_in_at: null,
        profiles: {
          full_name: user.full_name,
          avatar_url: user.avatar_url
        },
        onboarding_data: user.onboarding_data?.[0] || null
      })) || [];

      setUsers(transformedUsers);
    } catch (error) {
      console.error('Error in fetchUsers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.onboarding_data?.business_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (user: User) => {
    const isOnboarded = user.onboarding_data?.completed_at;
    if (isOnboarded) {
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
  };

  return (
    <div className={`space-y-6 ${isArabic ? 'rtl' : 'ltr'}`}>
      
      {/* Header */}
      <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div>
          <h1 className={`text-2xl font-bold text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'إدارة المستخدمين' : 'User Management'}
          </h1>
          <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? `إجمالي ${totalUsers} مستخدم` : `Total ${totalUsers} users`}
          </p>
        </div>
        
        <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            {isArabic ? 'تصدير' : 'Export'}
          </Button>
          <Button className="gap-2">
            <Mail className="h-4 w-4" />
            {isArabic ? 'إرسال رسالة' : 'Send Message'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'إجمالي المستخدمين' : 'Total Users'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.onboarding_data?.completed_at).length}
            </div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'المستخدمون النشطون' : 'Active Users'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {users.filter(u => !u.onboarding_data?.completed_at).length}
            </div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'في انتظار التفعيل' : 'Pending Activation'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'المحظورون' : 'Suspended'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className={`${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'البحث والتصفية' : 'Search & Filter'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className="flex-1 relative">
              <Search className={`absolute top-3 h-4 w-4 text-gray-400 ${isArabic ? 'right-3' : 'left-3'}`} />
              <Input
                placeholder={isArabic ? 'البحث عن المستخدمين...' : 'Search users...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${isArabic ? 'pr-10' : 'pl-10'}`}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              {isArabic ? 'تصفية' : 'Filter'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className={`${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'قائمة المستخدمين' : 'Users List'}
          </CardTitle>
          <CardDescription className={`${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'إدارة حسابات المستخدمين ومعلوماتهم' : 'Manage user accounts and information'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {isArabic ? 'جاري التحميل...' : 'Loading...'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={isArabic ? 'text-right' : ''}>
                    {isArabic ? 'المستخدم' : 'User'}
                  </TableHead>
                  <TableHead className={isArabic ? 'text-right' : ''}>
                    {isArabic ? 'النشاط التجاري' : 'Business'}
                  </TableHead>
                  <TableHead className={isArabic ? 'text-right' : ''}>
                    {isArabic ? 'الحالة' : 'Status'}
                  </TableHead>
                  <TableHead className={isArabic ? 'text-right' : ''}>
                    {isArabic ? 'تاريخ التسجيل' : 'Join Date'}
                  </TableHead>
                  <TableHead className={isArabic ? 'text-right' : ''}>
                    {isArabic ? 'الإجراءات' : 'Actions'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <Avatar>
                          <AvatarImage src={user.profiles?.avatar_url || ''} />
                          <AvatarFallback>
                            {user.profiles?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {user.profiles?.full_name || 'Unknown User'}
                          </p>
                          <p className="text-sm text-gray-500">ID: {user.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.onboarding_data?.business_name || '-'}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user)}
                    </TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            {isArabic ? 'عرض التفاصيل' : 'View Details'}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Mail className="h-4 w-4" />
                            {isArabic ? 'إرسال رسالة' : 'Send Message'}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-red-600">
                            <UserX className="h-4 w-4" />
                            {isArabic ? 'إيقاف الحساب' : 'Suspend Account'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
