
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bell, 
  Check, 
  X, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Trash2,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
}

interface ProfileNotificationsProps {
  isArabic: boolean;
}

const ProfileNotifications: React.FC<ProfileNotificationsProps> = ({ isArabic }) => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: isArabic ? 'تم تحديث الملف الشخصي' : 'Profile Updated',
      message: isArabic ? 'تم حفظ التغييرات بنجاح' : 'Your changes have been saved successfully',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: isArabic ? 'ميزة جديدة متاحة' : 'New Feature Available',
      message: isArabic ? 'اكتشف أدوات التحليل الجديدة' : 'Discover new analytics tools',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      type: 'warning',
      title: isArabic ? 'انتباه مطلوب' : 'Action Required',
      message: isArabic ? 'يرجى تحديث معلومات الفوترة' : 'Please update your billing information',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      actionRequired: true
    }
  ]);

  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return X;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-blue-500';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: isArabic ? "تم الحذف" : "Deleted",
      description: isArabic ? "تم حذف الإشعار" : "Notification deleted"
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: isArabic ? "تم التحديث" : "Updated",
      description: isArabic ? "تم تعليم جميع الإشعارات كمقروءة" : "All notifications marked as read"
    });
  };

  const clearAll = () => {
    setNotifications([]);
    toast({
      title: isArabic ? "تم الحذف" : "Cleared",
      description: isArabic ? "تم حذف جميع الإشعارات" : "All notifications cleared"
    });
  };

  const filteredNotifications = showUnreadOnly 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return isArabic ? `منذ ${minutes} دقيقة` : `${minutes}m ago`;
    } else if (hours < 24) {
      return isArabic ? `منذ ${hours} ساعة` : `${hours}h ago`;
    } else {
      return isArabic ? `منذ ${days} يوم` : `${days}d ago`;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
            <Bell className="h-5 w-5" />
            {isArabic ? 'الإشعارات' : 'Notifications'}
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        
        <div className={`flex gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Button
            variant={showUnreadOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            className={isArabic ? 'font-arabic' : ''}
          >
            {isArabic ? 'غير المقروءة فقط' : 'Unread Only'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className={isArabic ? 'font-arabic' : ''}
          >
            <Check className="h-4 w-4 mr-1" />
            {isArabic ? 'تعليم الكل كمقروء' : 'Mark All Read'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAll}
            disabled={notifications.length === 0}
            className={isArabic ? 'font-arabic' : ''}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            {isArabic ? 'حذف الكل' : 'Clear All'}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-96">
          {filteredNotifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className={isArabic ? 'font-arabic' : ''}>
                {isArabic ? 'لا توجد إشعارات' : 'No notifications'}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredNotifications.map((notification, index) => {
                const Icon = getNotificationIcon(notification.type);
                return (
                  <div key={notification.id}>
                    <div className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${!notification.read ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}>
                      <div className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <div className={`p-2 rounded-full ${notification.read ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}>
                          <Icon className={`h-4 w-4 ${getNotificationColor(notification.type)}`} />
                        </div>
                        
                        <div className={`flex-1 min-w-0 ${isArabic ? 'text-right' : ''}`}>
                          <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
                            <h4 className={`font-medium text-sm ${isArabic ? 'font-arabic' : ''}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            {notification.actionRequired && (
                              <Badge variant="outline" className="text-xs">
                                {isArabic ? 'مطلوب إجراء' : 'Action Required'}
                              </Badge>
                            )}
                          </div>
                          
                          <p className={`text-sm text-gray-600 mt-1 ${isArabic ? 'font-arabic' : ''}`}>
                            {notification.message}
                          </p>
                          
                          <div className={`flex items-center gap-4 mt-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTime(notification.timestamp)}
                            </span>
                            
                            <div className="flex gap-2">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-6 px-2 text-xs"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="h-6 px-2 text-xs text-red-500 hover:text-red-700"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < filteredNotifications.length - 1 && <Separator />}
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ProfileNotifications;
