
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-full overflow-y-auto">
      <div className="md:col-span-1">
        <MarketShareChart chartConfig={chartConfig} />
      </div>
      <div className="md:col-span-1 lg:col-span-2">
        <PerformanceBenchmarkChart chartConfig={chartConfig} />
      </div>
      <div className="md:col-span-1 lg:col-span-2">
        <TrafficComparisonChart chartConfig={chartConfig} />
      </div>
      <div className="md:col-span-1">
        <BrandPositioningChart chartConfig={chartConfig} />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <MarketEvolutionChart chartConfig={chartConfig} />
      </div>
    </div>
  );
};

export default CompetitorsTab;
