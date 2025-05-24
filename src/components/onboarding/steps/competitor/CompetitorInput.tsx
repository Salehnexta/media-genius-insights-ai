
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Plus } from 'lucide-react';

interface CompetitorInputProps {
  onAddCompetitor: (competitor: string) => void;
  isArabic: boolean;
}

const CompetitorInput: React.FC<CompetitorInputProps> = ({ onAddCompetitor, isArabic }) => {
  const { t } = useLanguage();
  const [competitorInput, setCompetitorInput] = useState('');

  const handleAdd = () => {
    if (competitorInput.trim()) {
      onAddCompetitor(competitorInput.trim());
      setCompetitorInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="competitor" className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
        <Search className="w-4 h-4" />
        {t('onboarding.competitors.add')}
      </Label>
      <div className={`flex gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <Input
          id="competitor"
          value={competitorInput}
          onChange={(e) => setCompetitorInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('onboarding.competitors.placeholder')}
          className={`flex-1 ${isArabic ? 'text-right' : ''}`}
        />
        <Button onClick={handleAdd} disabled={!competitorInput.trim()}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CompetitorInput;
