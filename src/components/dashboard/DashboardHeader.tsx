
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Filter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const DashboardHeader: React.FC = () => {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`flex justify-between items-center mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
      <div className={isArabic ? 'text-right' : ''}>
        <h1 className="text-2xl font-bold">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
      </div>
      
      <div className={`flex items-center ${isArabic ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
        <Select defaultValue="7days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">{t('time.today')}</SelectItem>
            <SelectItem value="yesterday">{t('time.yesterday')}</SelectItem>
            <SelectItem value="7days">{t('time.7days')}</SelectItem>
            <SelectItem value="30days">{t('time.30days')}</SelectItem>
            <SelectItem value="90days">{t('time.90days')}</SelectItem>
            <SelectItem value="custom">{t('time.custom')}</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        
        <Button variant="outline" className={isArabic ? 'flex-row-reverse' : ''}>
          <Download className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          {t('export')}
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
