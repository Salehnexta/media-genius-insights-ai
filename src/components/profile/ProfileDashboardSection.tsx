
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Bell, 
  Activity, 
  TrendingUp, 
  RefreshCw,
  Settings,
  Maximize2
} from 'lucide-react';
import ProfileNotifications from './ProfileNotifications';
import RealTimeActivityFeed from './RealTimeActivityFeed';
import InteractiveProfileStats from './InteractiveProfileStats';

interface ProfileDashboardSectionProps {
  isArabic: boolean;
}

const ProfileDashboardSection: React.FC<ProfileDashboardSectionProps> = ({ isArabic }) => {
  const [activeTab, setActiveTab] = useState('stats');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const tabs = [
    {
      value: 'stats',
      label: isArabic ? 'الإحصائيات' : 'Statistics',
      icon: BarChart3
    },
    {
      value: 'activity',
      label: isArabic ? 'النشاط المباشر' : 'Live Activity',
      icon: Activity
    },
    {
      value: 'notifications',
      label: isArabic ? 'الإشعارات' : 'Notifications',
      icon: Bell
    }
  ];

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-950 p-6 overflow-auto' : ''}`}>
      <Card className="shadow-sm lg:shadow-lg border-0 bg-white dark:bg-gray-900">
        <CardHeader className="border-b">
          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
              <TrendingUp className="h-5 w-5" />
              {isArabic ? 'لوحة التحكم التفاعلية' : 'Interactive Dashboard'}
            </CardTitle>
            
            <div className={`flex gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="h-8 w-8 p-0"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <TabsList className={`grid w-full grid-cols-3 h-auto p-1 bg-transparent ${isArabic ? 'rtl' : ''}`}>
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className={`flex items-center gap-2 py-3 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
            
            <div className="p-6">
              <TabsContent value="stats" className="m-0">
                <InteractiveProfileStats isArabic={isArabic} />
              </TabsContent>
              
              <TabsContent value="activity" className="m-0">
                <RealTimeActivityFeed isArabic={isArabic} />
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                <ProfileNotifications isArabic={isArabic} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDashboardSection;
