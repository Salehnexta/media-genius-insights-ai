
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Database, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DatabaseStats {
  onboarding_data: number;
  website_analysis: number;
  social_media_accounts: number;
  ai_extraction_progress: number;
  competitor_analysis: number;
}

const DataStatusChecker: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [recentData, setRecentData] = useState<any[]>([]);

  const checkDatabaseData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Check various tables for data
      const tables = [
        'onboarding_data',
        'website_analysis', 
        'social_media_accounts',
        'ai_extraction_progress',
        'competitor_analysis'
      ];

      const stats: DatabaseStats = {
        onboarding_data: 0,
        website_analysis: 0,
        social_media_accounts: 0,
        ai_extraction_progress: 0,
        competitor_analysis: 0
      };

      // Get counts from each table
      for (const table of tables) {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (!error && count !== null) {
          stats[table as keyof DatabaseStats] = count;
        }
      }

      // Get recent onboarding data
      const { data: onboardingData } = await supabase
        .from('onboarding_data')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1);

      // Get recent website analysis
      const { data: websiteData } = await supabase
        .from('website_analysis')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1);

      const combinedData = [];
      if (onboardingData && onboardingData.length > 0) {
        combinedData.push({
          type: 'onboarding',
          data: onboardingData[0],
          updated_at: onboardingData[0].updated_at
        });
      }
      
      if (websiteData && websiteData.length > 0) {
        combinedData.push({
          type: 'website_analysis',
          data: websiteData[0],
          updated_at: websiteData[0].updated_at
        });
      }

      setStats(stats);
      setRecentData(combinedData);
      setLastChecked(new Date());
      
    } catch (error) {
      console.error('Error checking database:', error);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    checkDatabaseData();
  }, [user]);

  const getTotalRecords = () => {
    if (!stats) return 0;
    return Object.values(stats).reduce((sum, count) => sum + count, 0);
  };

  const getStatusIcon = (count: number) => {
    if (count > 0) return <CheckCircle className="w-4 h-4 text-green-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ar-SA');
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">يرجى تسجيل الدخول لعرض حالة البيانات</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-500" />
            حالة البيانات المستخرجة في قاعدة البيانات
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={checkDatabaseData}
              disabled={loading}
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              تحديث
            </Button>
            {lastChecked && (
              <span className="text-sm text-gray-500">
                آخر تحديث: {formatDate(lastChecked.toISOString())}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Clock className="w-6 h-6 animate-spin text-blue-500" />
              <span className="mr-2">جاري فحص قاعدة البيانات...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {/* إجمالي البيانات */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ملخص البيانات المخزنة
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {getTotalRecords()}
                    </p>
                    <p className="text-sm text-blue-800">إجمالي السجلات</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {stats ? Object.values(stats).filter(count => count > 0).length : 0}
                    </p>
                    <p className="text-sm text-green-800">جداول تحتوي على بيانات</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {recentData.length}
                    </p>
                    <p className="text-sm text-purple-800">عمليات حديثة</p>
                  </div>
                </div>
              </div>

              {/* تفاصيل كل جدول */}
              {stats && (
                <div className="space-y-3">
                  <h4 className="font-semibold">تفاصيل الجداول:</h4>
                  {Object.entries(stats).map(([table, count]) => (
                    <div key={table} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(count)}
                        <span className="font-medium">
                          {table === 'onboarding_data' && 'بيانات الإعداد الأولي'}
                          {table === 'website_analysis' && 'تحليل المواقع'}
                          {table === 'social_media_accounts' && 'حسابات السوشال ميديا'}
                          {table === 'ai_extraction_progress' && 'تقدم استخراج البيانات'}
                          {table === 'competitor_analysis' && 'تحليل المنافسين'}
                        </span>
                      </div>
                      <Badge variant={count > 0 ? "default" : "secondary"}>
                        {count} سجل
                      </Badge>
                    </div>
                  ))}
                </div>
              )}

              {/* البيانات الحديثة */}
              {recentData.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold">آخر البيانات المحفوظة:</h4>
                  {recentData.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">
                          {item.type === 'onboarding' ? 'إعداد أولي' : 'تحليل موقع'}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {formatDate(item.updated_at)}
                        </span>
                      </div>
                      {item.type === 'onboarding' && (
                        <div className="text-sm space-y-1">
                          {item.data.website && (
                            <p>الموقع: {item.data.website}</p>
                          )}
                          {item.data.business_name && (
                            <p>اسم العمل: {item.data.business_name}</p>
                          )}
                          {item.data.extracted_social_accounts && 
                           Object.keys(item.data.extracted_social_accounts).length > 0 && (
                            <p>حسابات سوشال ميديا: {Object.keys(item.data.extracted_social_accounts).length} حساب</p>
                          )}
                        </div>
                      )}
                      {item.type === 'website_analysis' && (
                        <div className="text-sm space-y-1">
                          <p>الموقع: {item.data.website_url}</p>
                          {item.data.seo_score && (
                            <p>نقاط SEO: {item.data.seo_score}%</p>
                          )}
                          {item.data.performance_score && (
                            <p>نقاط الأداء: {item.data.performance_score}%</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {getTotalRecords() === 0 && (
                <div className="text-center py-8">
                  <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-600 mb-2">
                    لا توجد بيانات مستخرجة حتى الآن
                  </h3>
                  <p className="text-gray-500 mb-4">
                    لم يتم العثور على بيانات مستخرجة في قاعدة البيانات لحسابك
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/scraping-test'}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    ابدأ عملية الاستخراج
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataStatusChecker;
