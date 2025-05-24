
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { language } = useLanguage();
  const { adminUser } = useAdmin();
  const isMobile = useIsMobile();
  const isArabic = language === 'ar';
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <AdminHeader 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isArabic={isArabic}
        isMobile={isMobile}
      />
      
      <div className="flex">
        <AdminSidebar 
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          isArabic={isArabic}
          isMobile={isMobile}
          adminRole={adminUser?.role || 'support'}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarOpen && !isMobile ? (isArabic ? 'mr-64' : 'ml-64') : ''
        }`}>
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
