
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Users, UserPlus, Settings, Mail, Calendar, MoreVertical } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: 'active' | 'inactive';
  joinDate: string;
  lastActivity: string;
}

const TeamManagement: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const isArabic = language === 'ar';
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      role: 'مدير التسويق',
      status: 'active',
      joinDate: '2024-01-15',
      lastActivity: '2024-01-20'
    },
    {
      id: '2',
      name: 'فاطمة علي',
      email: 'fatma@example.com',
      role: 'مختص التسويق الرقمي',
      status: 'active',
      joinDate: '2024-01-10',
      lastActivity: '2024-01-19'
    }
  ]);
  
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('member');

  const handleInviteMember = async () => {
    if (!newMemberEmail) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يرجى إدخال البريد الإلكتروني" : "Please enter email address",
        variant: "destructive"
      });
      return;
    }

    // Simulate invitation
    toast({
      title: isArabic ? "تم الإرسال" : "Invitation Sent",
      description: isArabic ? "تم إرسال دعوة انضمام للفريق" : "Team invitation has been sent"
    });
    
    setNewMemberEmail('');
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'مدير التسويق':
      case 'Marketing Manager':
        return 'bg-blue-600';
      case 'مختص التسويق الرقمي':
      case 'Digital Marketing Specialist':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 lg:p-8 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
        {/* Header - Responsive */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
          <div className={`${isArabic ? 'text-right' : ''}`}>
            <h1 className={`text-2xl sm:text-3xl font-bold ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'إدارة الفريق' : 'Team Management'}
            </h1>
            <p className={`text-gray-600 dark:text-gray-400 mt-2 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'إدارة أعضاء الفريق والصلاحيات' : 'Manage team members and permissions'}
            </p>
          </div>
          <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
        </div>

        {/* Team Stats - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`${isArabic ? 'text-right' : ''}`}>
                  <p className={`text-xl sm:text-2xl font-bold ${isArabic ? 'font-arabic' : ''}`}>12</p>
                  <p className={`text-sm sm:text-base text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'إجمالي الأعضاء' : 'Total Members'}
                  </p>
                </div>
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`${isArabic ? 'text-right' : ''}`}>
                  <p className={`text-xl sm:text-2xl font-bold text-green-600 ${isArabic ? 'font-arabic' : ''}`}>10</p>
                  <p className={`text-sm sm:text-base text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'نشط' : 'Active'}
                  </p>
                </div>
                <div className="h-3 w-3 bg-green-500 rounded-full flex-shrink-0"></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`${isArabic ? 'text-right' : ''}`}>
                  <p className={`text-xl sm:text-2xl font-bold text-yellow-600 ${isArabic ? 'font-arabic' : ''}`}>2</p>
                  <p className={`text-sm sm:text-base text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'دعوات معلقة' : 'Pending'}
                  </p>
                </div>
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invite New Member - Responsive */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 ${isArabic ? 'sm:flex-row-reverse font-arabic' : ''}`}>
              <UserPlus className="h-5 w-5 flex-shrink-0" />
              <span className="text-lg sm:text-xl">
                {isArabic ? 'دعوة عضو جديد' : 'Invite New Member'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex flex-col sm:flex-row gap-4 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
              <Input
                type="email"
                placeholder={isArabic ? 'البريد الإلكتروني' : 'Email address'}
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                className={`flex-1 ${isArabic ? 'text-right' : ''}`}
              />
              <Button onClick={handleInviteMember} className="w-full sm:w-auto">
                <Mail className="h-4 w-4 mr-2" />
                <span className={isArabic ? 'font-arabic' : ''}>
                  {isArabic ? 'إرسال دعوة' : 'Send Invite'}
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Team Members List - Responsive */}
        <Card>
          <CardHeader>
            <CardTitle className={`text-lg sm:text-xl ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'أعضاء الفريق' : 'Team Members'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className={`${isArabic ? 'text-right' : ''}`}>
                      <h3 className={`font-semibold text-sm sm:text-base ${isArabic ? 'font-arabic' : ''}`}>{member.name}</h3>
                      <p className={`text-xs sm:text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>{member.email}</p>
                    </div>
                  </div>
                  
                  <div className={`flex flex-wrap items-center gap-2 sm:gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Badge className={`${getRoleColor(member.role)} text-white text-xs ${isArabic ? 'font-arabic' : ''}`}>
                      {member.role}
                    </Badge>
                    <Badge variant={member.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                      {member.status === 'active' 
                        ? (isArabic ? 'نشط' : 'Active')
                        : (isArabic ? 'غير نشط' : 'Inactive')
                      }
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamManagement;
