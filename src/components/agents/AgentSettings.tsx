
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Settings, Save, RefreshCw, Volume2, Zap, Brain } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  specialization: string;
}

interface AgentSettingsProps {
  agent: Agent;
  isArabic: boolean;
}

const AgentSettings: React.FC<AgentSettingsProps> = ({ agent, isArabic }) => {
  const [settings, setSettings] = useState({
    responseSpeed: [75],
    creativity: [60],
    formality: [70],
    proactivity: [80],
    notifications: true,
    autoTask: true,
    learningMode: true,
    voiceEnabled: false
  });

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
  };

  const handleReset = () => {
    // Reset to defaults
    setSettings({
      responseSpeed: [75],
      creativity: [60],
      formality: [70],
      proactivity: [80],
      notifications: true,
      autoTask: true,
      learningMode: true,
      voiceEnabled: false
    });
  };

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
        <h2 className="text-xl font-semibold">{isArabic ? 'إعدادات الوكيل' : 'Agent Settings'}</h2>
        <div className={`flex gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {isArabic ? 'إعادة تعيين' : 'Reset'}
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            {isArabic ? 'حفظ' : 'Save'}
          </Button>
        </div>
      </div>

      {/* Behavior Settings */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Brain className="h-5 w-5" />
            {isArabic ? 'إعدادات السلوك' : 'Behavior Settings'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-sm font-medium">
              {isArabic ? 'سرعة الاستجابة' : 'Response Speed'} ({settings.responseSpeed[0]}%)
            </Label>
            <Slider
              value={settings.responseSpeed}
              onValueChange={(value) => setSettings({...settings, responseSpeed: value})}
              max={100}
              step={5}
              className="mt-2"
            />
            <p className="text-xs text-gray-600 mt-1">
              {isArabic ? 'تحكم في سرعة استجابة الوكيل' : 'Control how quickly the agent responds'}
            </p>
          </div>

          <div>
            <Label className="text-sm font-medium">
              {isArabic ? 'الإبداع' : 'Creativity'} ({settings.creativity[0]}%)
            </Label>
            <Slider
              value={settings.creativity}
              onValueChange={(value) => setSettings({...settings, creativity: value})}
              max={100}
              step={5}
              className="mt-2"
            />
            <p className="text-xs text-gray-600 mt-1">
              {isArabic ? 'مستوى الإبداع في الاستجابات' : 'Level of creativity in responses'}
            </p>
          </div>

          <div>
            <Label className="text-sm font-medium">
              {isArabic ? 'الرسمية' : 'Formality'} ({settings.formality[0]}%)
            </Label>
            <Slider
              value={settings.formality}
              onValueChange={(value) => setSettings({...settings, formality: value})}
              max={100}
              step={5}
              className="mt-2"
            />
            <p className="text-xs text-gray-600 mt-1">
              {isArabic ? 'مستوى الرسمية في التواصل' : 'Level of formality in communication'}
            </p>
          </div>

          <div>
            <Label className="text-sm font-medium">
              {isArabic ? 'الاستباقية' : 'Proactivity'} ({settings.proactivity[0]}%)
            </Label>
            <Slider
              value={settings.proactivity}
              onValueChange={(value) => setSettings({...settings, proactivity: value})}
              max={100}
              step={5}
              className="mt-2"
            />
            <p className="text-xs text-gray-600 mt-1">
              {isArabic ? 'مدى استباقية الوكيل في اقتراح المهام' : 'How proactively the agent suggests tasks'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Settings className="h-5 w-5" />
            {isArabic ? 'إعدادات الميزات' : 'Feature Settings'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div>
              <Label className="text-sm font-medium">{isArabic ? 'الإشعارات' : 'Notifications'}</Label>
              <p className="text-xs text-gray-600">{isArabic ? 'تلقي إشعارات عن النشاطات' : 'Receive notifications about activities'}</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
            />
          </div>

          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div>
              <Label className="text-sm font-medium">{isArabic ? 'المهام التلقائية' : 'Auto Task Assignment'}</Label>
              <p className="text-xs text-gray-600">{isArabic ? 'تعيين المهام تلقائياً' : 'Automatically assign tasks'}</p>
            </div>
            <Switch
              checked={settings.autoTask}
              onCheckedChange={(checked) => setSettings({...settings, autoTask: checked})}
            />
          </div>

          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div>
              <Label className="text-sm font-medium">{isArabic ? 'وضع التعلم' : 'Learning Mode'}</Label>
              <p className="text-xs text-gray-600">{isArabic ? 'تعلم من التفاعلات السابقة' : 'Learn from previous interactions'}</p>
            </div>
            <Switch
              checked={settings.learningMode}
              onCheckedChange={(checked) => setSettings({...settings, learningMode: checked})}
            />
          </div>

          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div>
              <Label className="text-sm font-medium">{isArabic ? 'التحكم الصوتي' : 'Voice Control'}</Label>
              <p className="text-xs text-gray-600">{isArabic ? 'تفعيل الأوامر الصوتية' : 'Enable voice commands'}</p>
            </div>
            <Switch
              checked={settings.voiceEnabled}
              onCheckedChange={(checked) => setSettings({...settings, voiceEnabled: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Agent Information */}
      <Card>
        <CardHeader>
          <CardTitle>{isArabic ? 'معلومات الوكيل' : 'Agent Information'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm">{isArabic ? 'الإصدار:' : 'Version:'}</span>
            <Badge variant="secondary">v2.1.0</Badge>
          </div>
          <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm">{isArabic ? 'آخر تحديث:' : 'Last Updated:'}</span>
            <span className="text-sm text-gray-600">2024-01-15</span>
          </div>
          <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm">{isArabic ? 'الحالة:' : 'Status:'}</span>
            <Badge className="bg-green-100 text-green-700">{isArabic ? 'نشط' : 'Active'}</Badge>
          </div>
          <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm">{isArabic ? 'وقت التشغيل:' : 'Uptime:'}</span>
            <span className="text-sm text-gray-600">24/7</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentSettings;
