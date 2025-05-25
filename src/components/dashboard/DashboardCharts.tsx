
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardCharts: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="dashboard-charts">
      <div className="charts-grid">
        {/* Performance Chart */}
        <Card className="chart-card">
          <CardHeader>
            <CardTitle className={isArabic ? 'text-right' : 'text-left'}>
              {isArabic ? 'أداء الحملات' : 'Campaign Performance'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-placeholder">
              <div className="chart-bars">
                <div className="chart-bar" style={{ height: '60%' }}></div>
                <div className="chart-bar" style={{ height: '80%' }}></div>
                <div className="chart-bar" style={{ height: '45%' }}></div>
                <div className="chart-bar" style={{ height: '90%' }}></div>
                <div className="chart-bar" style={{ height: '65%' }}></div>
                <div className="chart-bar" style={{ height: '75%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audience Analytics */}
        <Card className="chart-card">
          <CardHeader>
            <CardTitle className={isArabic ? 'text-right' : 'text-left'}>
              {isArabic ? 'تحليلات الجمهور' : 'Audience Analytics'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-placeholder">
              <div className="chart-pie">
                <div className="pie-segment pie-blue"></div>
                <div className="pie-segment pie-green"></div>
                <div className="pie-segment pie-purple"></div>
                <div className="pie-segment pie-orange"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCharts;
