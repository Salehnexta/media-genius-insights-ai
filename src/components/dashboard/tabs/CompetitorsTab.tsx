
import React from 'react';
import MarketShareChart from '../charts/competitors/MarketShareChart';
import PerformanceBenchmarkChart from '../charts/competitors/PerformanceBenchmarkChart';
import TrafficComparisonChart from '../charts/competitors/TrafficComparisonChart';
import BrandPositioningChart from '../charts/competitors/BrandPositioningChart';
import MarketEvolutionChart from '../charts/competitors/MarketEvolutionChart';

interface CompetitorsTabProps {
  chartConfig: any;
}

const CompetitorsTab: React.FC<CompetitorsTabProps> = ({ chartConfig }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <MarketShareChart chartConfig={chartConfig} />
      <PerformanceBenchmarkChart chartConfig={chartConfig} />
      <TrafficComparisonChart chartConfig={chartConfig} />
      <BrandPositioningChart chartConfig={chartConfig} />
      <MarketEvolutionChart chartConfig={chartConfig} />
    </div>
  );
};

export default CompetitorsTab;
