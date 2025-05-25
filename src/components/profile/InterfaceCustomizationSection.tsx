
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Palette, Monitor, Smartphone, Sun, Moon, Type, Layout, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InterfaceCustomizationSectionProps {
  settings: any;
  isArabic: boolean;
  onSettingsChange: (settings: any) => void;
  loading: boolean;
}

const InterfaceCustomizationSection: React.FC<InterfaceCustomizationSectionProps> = ({
  settings,
  isArabic,
  onSettingsChange,
  loading
}) => {
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState(16);

  const themes = [
    {
      id: 'light',
      name: isArabic ? 'فاتح' : 'Light',
      description: isArabic ? 'نمط فاتح مناسب للاستخدام النهاري' : 'Bright theme suitable for daytime use',
      icon: Sun,
      preview: 'bg-white border-gray-200'
    },
    {
      id: 'dark',
      name: isArabic ? 'داكن' : 'Dark',
      description: isArabic ? 'نمط داكن مناسب للاستخدام الليلي' : 'Dark theme suitable for nighttime use',
      icon: Moon,
      preview: 'bg-gray-900 border-gray-700'
    },
    {
      id: 'auto',
      name: isArabic ? 'تلقائي' : 'Auto',
      description: isArabic ? 'يتبع إعدادات النظام' : 'Follows system settings',
      icon: Monitor,
      preview: 'bg-gradient-to-br from-white to-gray-900 border-gray-400'
    }
  ];

  const dashboardLayouts = [
    {
      id: 'default',
      name: isArabic ? 'افتراضي' : 'Default',
      description: isArabic ? 'التخطيط الافتراضي للوحة التحكم' : 'Standard dashboard layout'
    },
    {
      id: 'compact',
      name: isArabic ? 'مضغوط' : 'Compact',
      description: isArabic ? 'تخطيط مضغوط لعرض المزيد من المعلومات' : 'Compact layout to show more information'
    },
    {
      id: 'wide',
      name: isArabic ? 'عريض' : 'Wide',
      description: isArabic ? 'تخطيط عريض مناسب للشاشات الكبيرة' : 'Wide layout suitable for large screens'
    }
  ];

  const fontSizes = [
    { value: 12, label: isArabic ? 'صغير جداً' : 'Extra Small' },
    { value: 14, label: isArabic ? 'صغير' : 'Small' },
    { value: 16, label: isArabic ? 'متوسط' : 'Medium' },
    { value: 18, label: isArabic ? 'كبير' : 'Large' },
    { value: 20, label: isArabic ? 'كبير جداً' : 'Extra Large' }
  ];

  const handleThemeChange = (themeId: string) => {
    onSettingsChange({ ...settings, theme: themeId });
    toast({
      title: isArabic ? "تم تغيير المظهر" : "Theme Changed",
      description: isArabic ? "تم تطبيق المظهر الجديد" : "New theme has been applied"
    });
  };

  const handleLayoutChange = (layoutId: string) => {
    onSettingsChange({ ...settings, dashboardLayout: layoutId });
    toast({
      title: isArabic ? "تم تغيير التخطيط" : "Layout Changed",
      description: isArabic ? "تم تطبيق التخطيط الجديد" : "New layout has been applied"
    });
  };

  const handleFontSizeChange = (size: number[]) => {
    const newSize = size[0];
    setFontSize(newSize);
    onSettingsChange({ ...settings, fontSize: newSize.toString() });
  };

  return (
    <div className="space-y-8">
      {/* Theme Selection */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <Palette className="h-5 w-5" />
            {isArabic ? 'اختيار المظهر' : 'Theme Selection'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themes.map((theme) => {
              const IconComponent = theme.icon;
              return (
                <div
                  key={theme.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-blue-300 hover:shadow-md ${
                    settings.theme === theme.id 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  } ${isArabic ? 'text-right' : ''}`}
                  onClick={() => handleThemeChange(theme.id)}
                >
                  <div className={`flex items-center gap-3 mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded border-2 ${theme.preview}`} />
                    <IconComponent className="h-5 w-5 text-gray-600" />
                    <h3 className={`font-semibold ${isArabic ? 'font-arabic' : ''}`}>{theme.name}</h3>
                    {settings.theme === theme.id && (
                      <Badge className="bg-blue-600 text-white ml-auto">
                        {isArabic ? 'مُختار' : 'Active'}
                      </Badge>
                    )}
                  </div>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                    {theme.description}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Layout */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <Layout className="h-5 w-5" />
            {isArabic ? 'تخطيط لوحة التحكم' : 'Dashboard Layout'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label className={`${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'اختر تخطيط لوحة التحكم المفضل' : 'Choose your preferred dashboard layout'}
            </Label>
            <Select value={settings.dashboardLayout} onValueChange={handleLayoutChange}>
              <SelectTrigger className={`${isArabic ? 'text-right font-arabic' : ''}`}>
                <SelectValue placeholder={isArabic ? 'اختر التخطيط' : 'Select layout'} />
              </SelectTrigger>
              <SelectContent>
                {dashboardLayouts.map((layout) => (
                  <SelectItem key={layout.id} value={layout.id} className={`${isArabic ? 'text-right font-arabic' : ''}`}>
                    <div className={`${isArabic ? 'text-right' : ''}`}>
                      <div className={`font-medium ${isArabic ? 'font-arabic' : ''}`}>{layout.name}</div>
                      <div className={`text-sm text-gray-500 ${isArabic ? 'font-arabic' : ''}`}>{layout.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Font Size */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <Type className="h-5 w-5" />
            {isArabic ? 'حجم الخط' : 'Font Size'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className={`${isArabic ? 'text-right' : ''}`}>
              <Label className={`mb-4 block ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'حجم الخط:' : 'Font Size:'} 
                <span className="ml-2 text-blue-600 font-semibold">{fontSize}px</span>
              </Label>
              <Slider
                value={[fontSize]}
                onValueChange={handleFontSizeChange}
                max={24}
                min={12}
                step={2}
                className="w-full"
              />
              <div className={`flex justify-between text-sm text-gray-500 mt-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
                <span>{isArabic ? 'صغير' : 'Small'}</span>
                <span>{isArabic ? 'كبير' : 'Large'}</span>
              </div>
            </div>

            {/* Font Size Preview */}
            <div className={`p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 ${isArabic ? 'text-right' : ''}`}>
              <h4 className={`font-semibold mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'معاينة حجم الخط:' : 'Font Size Preview:'}
              </h4>
              <p style={{ fontSize: `${fontSize}px` }} className={`${isArabic ? 'font-arabic' : ''}`}>
                {isArabic 
                  ? 'هذا نص تجريبي لمعاينة حجم الخط المختار. يمكنك ضبط الحجم حسب تفضيلك.'
                  : 'This is sample text to preview the selected font size. You can adjust the size to your preference.'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Display Options */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse text-right font-arabic' : ''}`}>
            <Eye className="h-5 w-5" />
            {isArabic ? 'خيارات العرض' : 'Display Options'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className={`${isArabic ? 'text-right' : ''}`}>
              <Label className={`${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'عرض الرسوم المتحركة' : 'Show Animations'}
              </Label>
              <p className={`text-sm text-gray-500 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'تفعيل التأثيرات المرئية والانتقالات' : 'Enable visual effects and transitions'}
              </p>
            </div>
            <Switch 
              checked={settings.animations || true}
              onCheckedChange={(checked) => onSettingsChange({...settings, animations: checked})}
            />
          </div>

          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className={`${isArabic ? 'text-right' : ''}`}>
              <Label className={`${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'عرض الإشعارات' : 'Show Notifications'}
              </Label>
              <p className={`text-sm text-gray-500 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'عرض الإشعارات على الواجهة' : 'Display notifications on the interface'}
              </p>
            </div>
            <Switch 
              checked={settings.showNotifications || true}
              onCheckedChange={(checked) => onSettingsChange({...settings, showNotifications: checked})}
            />
          </div>

          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className={`${isArabic ? 'text-right' : ''}`}>
              <Label className={`${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'نمط عالي التباين' : 'High Contrast Mode'}
              </Label>
              <p className={`text-sm text-gray-500 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'تحسين الرؤية للمستخدمين ذوي الاحتياجات الخاصة' : 'Improve visibility for users with special needs'}
              </p>
            </div>
            <Switch 
              checked={settings.highContrast || false}
              onCheckedChange={(checked) => onSettingsChange({...settings, highContrast: checked})}
            />
          </div>

          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className={`${isArabic ? 'text-right' : ''}`}>
              <Label className={`${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'تصغير الشريط الجانبي' : 'Compact Sidebar'}
              </Label>
              <p className={`text-sm text-gray-500 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'عرض الشريط الجانبي بشكل مضغوط' : 'Show sidebar in compact mode'}
              </p>
            </div>
            <Switch 
              checked={settings.compactSidebar || false}
              onCheckedChange={(checked) => onSettingsChange({...settings, compactSidebar: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className={`flex gap-4 pt-4 ${isArabic ? 'justify-start flex-row-reverse' : 'justify-end'}`}>
        <Button 
          onClick={() => {
            toast({
              title: isArabic ? "تم الحفظ" : "Saved",
              description: isArabic ? "تم حفظ إعدادات الواجهة بنجاح" : "Interface settings saved successfully"
            });
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          disabled={loading}
        >
          <span className={isArabic ? 'font-arabic' : ''}>
            {loading ? (isArabic ? 'جاري الحفظ...' : 'Saving...') : (isArabic ? 'حفظ الإعدادات' : 'Save Settings')}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default InterfaceCustomizationSection;
