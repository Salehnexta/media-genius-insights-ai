
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Download, FileText, FileSpreadsheet, FileImage } from 'lucide-react';

interface DataExporterProps {
  data: any[];
  filename: string;
  title?: string;
}

type ExportFormat = 'csv' | 'json' | 'pdf';

const DataExporter: React.FC<DataExporterProps> = ({ 
  data, 
  filename, 
  title 
}) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const isArabic = language === 'ar';
  
  const [format, setFormat] = useState<ExportFormat>('csv');
  const [loading, setLoading] = useState(false);

  const exportFormats = {
    csv: { icon: FileSpreadsheet, label: isArabic ? 'CSV' : 'CSV' },
    json: { icon: FileText, label: isArabic ? 'JSON' : 'JSON' },
    pdf: { icon: FileImage, label: isArabic ? 'PDF' : 'PDF' }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape values that contain commas or quotes
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, `${filename}.csv`);
  };

  const exportToJSON = (data: any[], filename: string) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    downloadBlob(blob, `${filename}.json`);
  };

  const exportToPDF = async (data: any[], filename: string) => {
    // For PDF export, we'll create a simple HTML table and convert it
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title || filename}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          h1 { color: #333; }
        </style>
      </head>
      <body>
        <h1>${title || filename}</h1>
        <table>
          <thead>
            <tr>
              ${Object.keys(data[0] || {}).map(key => `<th>${key}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr>
                ${Object.values(row).map(value => `<td>${value}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    downloadBlob(blob, `${filename}.html`);
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleExport = async () => {
    if (!data.length) {
      toast({
        title: isArabic ? "تحذير" : "Warning",
        description: isArabic ? "لا توجد بيانات للتصدير" : "No data to export",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      switch (format) {
        case 'csv':
          exportToCSV(data, filename);
          break;
        case 'json':
          exportToJSON(data, filename);
          break;
        case 'pdf':
          await exportToPDF(data, filename);
          break;
      }
      
      toast({
        title: isArabic ? "تم بنجاح" : "Success",
        description: isArabic ? "تم تصدير البيانات بنجاح" : "Data exported successfully"
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "فشل في تصدير البيانات" : "Failed to export data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}>
          <Download className="h-5 w-5" />
          {isArabic ? 'تصدير البيانات' : 'Export Data'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className={`text-sm font-medium mb-2 block ${isArabic ? 'font-arabic text-right' : ''}`}>
            {isArabic ? 'تنسيق التصدير:' : 'Export Format:'}
          </label>
          <Select value={format} onValueChange={(value) => setFormat(value as ExportFormat)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(exportFormats).map(([key, { icon: Icon, label }]) => (
                <SelectItem key={key} value={key}>
                  <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <Icon className="h-4 w-4" />
                    {label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleExport}
          disabled={loading || !data.length}
          className="w-full"
        >
          <Download className="h-4 w-4 mr-2" />
          <span className={isArabic ? 'font-arabic' : ''}>
            {loading 
              ? (isArabic ? 'جاري التصدير...' : 'Exporting...') 
              : (isArabic ? 'تصدير' : 'Export')
            }
          </span>
        </Button>

        {data.length > 0 && (
          <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic text-right' : ''}`}>
            {isArabic ? `${data.length} عنصر جاهز للتصدير` : `${data.length} items ready to export`}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DataExporter;
