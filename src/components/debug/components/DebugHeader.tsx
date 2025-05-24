
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from 'lucide-react';

interface DebugHeaderProps {
  isArabic: boolean;
}

const DebugHeader: React.FC<DebugHeaderProps> = ({ isArabic }) => {
  return (
    <CardHeader>
      <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <Database className="h-6 w-6" />
        {isArabic ? 'فحص قاعدة البيانات' : 'Database Debugger'}
      </CardTitle>
    </CardHeader>
  );
};

export default DebugHeader;
