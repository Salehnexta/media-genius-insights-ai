
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Brain, 
  MessageSquare, 
  Target, 
  BarChart3, 
  Palette, 
  Mail, 
  Search, 
  Users,
  TrendingUp,
  Zap,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface AIMarketingTeamEnhancedProps {
  onAgentSelect?: (agent: any) => void;
}

const AIMarketingTeamEnhanced: React.FC<AIMarketingTeamEnhancedProps> = ({ onAgentSelect }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const teamMembers = [
    {
      id: 'marketing-manager',
      name: isArabic ? 'مدير التسويق الذكي' : 'AI Marketing Manager',
      role: isArabic ? 'استراتيجية شاملة وتنسيق الحملات' : 'Strategy & Campaign Coordination',
      specialization: 'marketing-manager',
      icon: <Brain className="h-6 w-6" />,
      bgColor: 'bg-blue-500',
      status: isArabic ? 'نشط' : 'Active',
      currentTask: isArabic ? 'تحليل أداء الحملة الجديدة' : 'Analyzing new campaign performance',
      completedTasks: 23,
      progress: 85,
      capabilities: ['Strategy Planning', 'ROI Analysis', 'Team Coordination'],
      expertise: isArabic ? 'خبير في وضع الاستراتيجيات التسويقية الشاملة' : 'Expert in comprehensive marketing strategies'
    },
    {
      id: 'content-strategist',
      name: isArabic ? 'استراتيجي المحتوى الذكي' : 'AI Content Strategist',
      role: isArabic ? 'إنشاء وتخطيط المحتوى' : 'Content Creation & Planning',
      specialization: 'content-strategy',
      icon: <MessageSquare className="h-6 w-6" />,
      bgColor: 'bg-purple-500',
      status: isArabic ? 'يعمل' : 'Working',
      currentTask: isArabic ? 'إنشاء تقويم المحتوى الشهري' : 'Creating monthly content calendar',
      completedTasks: 31,
      progress: 92,
      capabilities: ['Content Planning', 'SEO Optimization', 'Editorial Management'],
      expertise: isArabic ? 'متخصص في تطوير استراتيجيات المحتوى المؤثرة' : 'Specialist in developing impactful content strategies'
    },
    {
      id: 'brand-manager',
      name: isArabic ? 'مدير العلامة التجارية الذكي' : 'AI Brand Manager',
      role: isArabic ? 'إدارة وتطوير العلامة التجارية' : 'Brand Development & Management',
      specialization: 'brand-management',
      icon: <Target className="h-6 w-6" />,
      bgColor: 'bg-green-500',
      status: isArabic ? 'نشط' : 'Active',
      currentTask: isArabic ? 'مراجعة الهوية البصرية' : 'Reviewing visual identity guidelines',
      completedTasks: 18,
      progress: 78,
      capabilities: ['Brand Guidelines', 'Visual Identity', 'Brand Positioning'],
      expertise: isArabic ? 'خبير في بناء وإدارة هوية العلامات التجارية' : 'Expert in building and managing brand identities'
    },
    {
      id: 'social-media',
      name: isArabic ? 'مدير التواصل الاجتماعي الذكي' : 'AI Social Media Manager',
      role: isArabic ? 'إدارة منصات التواصل الاجتماعي' : 'Social Media Platform Management',
      specialization: 'social-media',
      icon: <Users className="h-6 w-6" />,
      bgColor: 'bg-pink-500',
      status: isArabic ? 'نشط' : 'Active',
      currentTask: isArabic ? 'جدولة منشورات الأسبوع' : 'Scheduling weekly posts',
      completedTasks: 45,
      progress: 95,
      capabilities: ['Social Scheduling', 'Community Management', 'Engagement Strategy'],
      expertise: isArabic ? 'متخصص في بناء المجتمعات وزيادة التفاعل' : 'Specialist in community building and engagement'
    },
    {
      id: 'analytics-expert',
      name: isArabic ? 'خبير التحليلات الذكي' : 'AI Analytics Expert',
      role: isArabic ? 'تحليل البيانات والأداء' : 'Data Analysis & Performance',
      specialization: 'analytics-expert',
      icon: <BarChart3 className="h-6 w-6" />,
      bgColor: 'bg-orange-500',
      status: isArabic ? 'يعمل' : 'Working',
      currentTask: isArabic ? 'إعداد تقرير الأداء الشهري' : 'Preparing monthly performance report',
      completedTasks: 27,
      progress: 88,
      capabilities: ['Data Analysis', 'Performance Tracking', 'Predictive Analytics'],
      expertise: isArabic ? 'خبير في تحويل البيانات إلى رؤى قابلة للتنفيذ' : 'Expert in transforming data into actionable insights'
    },
    {
      id: 'graphic-designer',
      name: isArabic ? 'المصمم الجرافيكي الذكي' : 'AI Graphic Designer',
      role: isArabic ? 'التصميم المرئي والإبداعي' : 'Visual & Creative Design',
      specialization: 'graphic-designer',
      icon: <Palette className="h-6 w-6" />,
      bgColor: 'bg-indigo-500',
      status: isArabic ? 'نشط' : 'Active',
      currentTask: isArabic ? 'تصميم قوالب التسويق' : 'Creating marketing templates',
      completedTasks: 34,
      progress: 90,
      capabilities: ['Visual Design', 'Brand Assets', 'Creative Templates'],
      expertise: isArabic ? 'متخصص في إنشاء تصاميم مرئية مؤثرة' : 'Specialist in creating impactful visual designs'
    },
    {
      id: 'email-marketing',
      name: isArabic ? 'خبير التسويق الإلكتروني' : 'AI Email Marketing Expert',
      role: isArabic ? 'التسويق عبر البريد الإلكتروني' : 'Email Marketing & Automation',
      specialization: 'email-marketing',
      icon: <Mail className="h-6 w-6" />,
      bgColor: 'bg-teal-500',
      status: isArabic ? 'نشط' : 'Active',
      currentTask: isArabic ? 'تحسين حملة البريد الإلكتروني' : 'Optimizing email campaign',
      completedTasks: 29,
      progress: 87,
      capabilities: ['Email Automation', 'List Management', 'Campaign Analytics'],
      expertise: isArabic ? 'خبير في بناء حملات بريدية فعالة' : 'Expert in building effective email campaigns'
    },
    {
      id: 'seo-expert',
      name: isArabic ? 'خبير السيو الذكي' : 'AI SEO Expert',
      role: isArabic ? 'تحسين محركات البحث' : 'Search Engine Optimization',
      specialization: 'seo-expert',
      icon: <Search className="h-6 w-6" />,
      bgColor: 'bg-cyan-500',
      status: isArabic ? 'يعمل' : 'Working',
      currentTask: isArabic ? 'تحليل الكلمات المفتاحية' : 'Analyzing keyword performance',
      completedTasks: 22,
      progress: 83,
      capabilities: ['Keyword Research', 'Technical SEO', 'Ranking Optimization'],
      expertise: isArabic ? 'متخصص في تحسين الظهور في محركات البحث' : 'Specialist in improving search engine visibility'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'نشط':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20';
      case 'Working':
      case 'يعمل':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20';
    }
  };

  const handleAgentClick = (agent: any) => {
    onAgentSelect?.(agent);
  };

  return (
    <div className={`space-y-6 ${isArabic ? 'rtl' : ''}`}>
      {/* Team Overview */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
            <Users className="h-5 w-5" />
            {isArabic ? 'نظرة عامة على الفريق' : 'Team Overview'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600">{isArabic ? 'أعضاء الفريق' : 'Team Members'}</div>
            </div>
            <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
              <div className="text-2xl font-bold text-green-600">6</div>
              <div className="text-sm text-gray-600">{isArabic ? 'نشط حالياً' : 'Currently Active'}</div>
            </div>
            <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
              <div className="text-2xl font-bold text-purple-600">229</div>
              <div className="text-sm text-gray-600">{isArabic ? 'المهام المكتملة' : 'Tasks Completed'}</div>
            </div>
            <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
              <div className="text-2xl font-bold text-orange-600">88%</div>
              <div className="text-sm text-gray-600">{isArabic ? 'متوسط الأداء' : 'Average Performance'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <Card 
            key={member.id} 
            className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-200 dark:hover:border-blue-800"
            onClick={() => handleAgentClick(member)}
          >
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-3 rounded-lg ${member.bgColor} text-white`}>
                    {member.icon}
                  </div>
                  <div className={isArabic ? 'text-right' : ''}>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(member.status)}>
                  {member.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Current Task */}
              <div>
                <div className={`flex items-center gap-2 mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">{isArabic ? 'المهمة الحالية:' : 'Current Task:'}</span>
                </div>
                <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'text-right' : ''}`}>
                  {member.currentTask}
                </p>
                <div className="mt-2">
                  <div className={`flex justify-between text-sm mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span>{isArabic ? 'التقدم:' : 'Progress:'}</span>
                    <span>{member.progress}%</span>
                  </div>
                  <Progress value={member.progress} className="h-2" />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
                  <div className={`flex items-center justify-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-lg font-bold text-green-600">{member.completedTasks}</span>
                  </div>
                  <p className="text-xs text-gray-600">{isArabic ? 'مهام مكتملة' : 'Completed'}</p>
                </div>
                <div className={`text-center ${isArabic ? 'text-right' : ''}`}>
                  <div className={`flex items-center justify-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-lg font-bold text-blue-600">{member.progress}%</span>
                  </div>
                  <p className="text-xs text-gray-600">{isArabic ? 'الأداء' : 'Performance'}</p>
                </div>
              </div>

              {/* Expertise */}
              <div>
                <p className={`text-xs text-gray-600 dark:text-gray-400 ${isArabic ? 'text-right leading-relaxed' : ''}`}>
                  {member.expertise}
                </p>
              </div>

              {/* Action Button */}
              <Button 
                className={`w-full ${isArabic ? 'flex-row-reverse' : ''}`}
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAgentClick(member);
                }}
              >
                <Zap className="h-4 w-4 mr-2" />
                {isArabic ? 'فتح مساحة العمل' : 'Open Workspace'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIMarketingTeamEnhanced;
