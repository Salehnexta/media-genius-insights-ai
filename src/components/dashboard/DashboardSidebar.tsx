
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  BarChart3, 
  Users, 
  Target, 
  MessageSquare, 
  Settings,
  Brain,
  Calendar,
  Palette,
  Zap
} from 'lucide-react';

const DashboardSidebar: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const menuItems = [
    {
      id: 'overview',
      label: isArabic ? 'نظرة عامة' : 'Overview',
      icon: BarChart3,
      active: true
    },
    {
      id: 'ai-team',
      label: isArabic ? 'فريق الذكاء الاصطناعي' : 'AI Team',
      icon: Brain
    },
    {
      id: 'campaigns',
      label: isArabic ? 'الحملات' : 'Campaigns',
      icon: Target
    },
    {
      id: 'audience',
      label: isArabic ? 'الجمهور' : 'Audience',
      icon: Users
    },
    {
      id: 'chat',
      label: isArabic ? 'المحادثة' : 'Chat',
      icon: MessageSquare
    },
    {
      id: 'calendar',
      label: isArabic ? 'التقويم' : 'Calendar',
      icon: Calendar
    },
    {
      id: 'brand-center',
      label: isArabic ? 'مركز العلامة التجارية' : 'Brand Center',
      icon: Palette
    },
    {
      id: 'content-studio',
      label: isArabic ? 'استوديو المحتوى' : 'Content Studio',
      icon: Zap
    },
    {
      id: 'settings',
      label: isArabic ? 'الإعدادات' : 'Settings',
      icon: Settings
    }
  ];

  return (
    <aside className="dashboard-sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="sidebar-item">
              <a
                href={`#${item.id}`}
                className={`sidebar-link ${item.active ? 'active' : ''}`}
              >
                <item.icon className="sidebar-icon" />
                <span className="sidebar-label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
