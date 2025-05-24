
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'busy' | 'offline';
  description: string;
  capabilities: string[];
  tasksCompleted: number;
  currentTask?: string;
  lastActive: Date;
  performance: number;
}

interface CreateAgentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAgentCreated: (agent: Agent) => void;
}

const CreateAgentDialog: React.FC<CreateAgentDialogProps> = ({
  isOpen,
  onClose,
  onAgentCreated
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    capabilities: [] as string[]
  });
  const [newCapability, setNewCapability] = useState('');

  const agentTypes = [
    { value: 'strategy', label: isArabic ? 'استراتيجية' : 'Strategy' },
    { value: 'content', label: isArabic ? 'محتوى' : 'Content' },
    { value: 'analytics', label: isArabic ? 'تحليلات' : 'Analytics' },
    { value: 'competitor', label: isArabic ? 'منافسين' : 'Competitor' },
    { value: 'seo', label: isArabic ? 'سيو' : 'SEO' },
    { value: 'custom', label: isArabic ? 'مخصص' : 'Custom' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      name: formData.name,
      type: formData.type,
      status: 'idle',
      description: formData.description,
      capabilities: formData.capabilities,
      tasksCompleted: 0,
      lastActive: new Date(),
      performance: 0
    };

    onAgentCreated(newAgent);
    
    // Reset form
    setFormData({
      name: '',
      type: '',
      description: '',
      capabilities: []
    });
    setNewCapability('');
  };

  const addCapability = () => {
    if (newCapability.trim() && !formData.capabilities.includes(newCapability.trim())) {
      setFormData({
        ...formData,
        capabilities: [...formData.capabilities, newCapability.trim()]
      });
      setNewCapability('');
    }
  };

  const removeCapability = (capability: string) => {
    setFormData({
      ...formData,
      capabilities: formData.capabilities.filter(c => c !== capability)
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isArabic ? 'إنشاء وكيل ذكي جديد' : 'Create New AI Agent'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">
              {isArabic ? 'اسم الوكيل' : 'Agent Name'}
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={isArabic ? 'أدخل اسم الوكيل' : 'Enter agent name'}
              required
            />
          </div>

          <div>
            <Label htmlFor="type">
              {isArabic ? 'نوع الوكيل' : 'Agent Type'}
            </Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder={isArabic ? 'اختر نوع الوكيل' : 'Select agent type'} />
              </SelectTrigger>
              <SelectContent>
                {agentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">
              {isArabic ? 'الوصف' : 'Description'}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={isArabic ? 'اكتب وصف للوكيل' : 'Describe the agent'}
              rows={3}
              required
            />
          </div>

          <div>
            <Label>
              {isArabic ? 'القدرات' : 'Capabilities'}
            </Label>
            <div className={`flex gap-2 mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Input
                value={newCapability}
                onChange={(e) => setNewCapability(e.target.value)}
                placeholder={isArabic ? 'أضف قدرة جديدة' : 'Add capability'}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCapability())}
              />
              <Button type="button" onClick={addCapability} variant="outline">
                {isArabic ? 'إضافة' : 'Add'}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.capabilities.map((capability, index) => (
                <Badge key={index} variant="secondary" className={`flex items-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  {capability}
                  <button
                    type="button"
                    onClick={() => removeCapability(capability)}
                    className="hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className={`flex gap-3 pt-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Button type="submit" className="flex-1">
              {isArabic ? 'إنشاء الوكيل' : 'Create Agent'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              {isArabic ? 'إلغاء' : 'Cancel'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAgentDialog;
