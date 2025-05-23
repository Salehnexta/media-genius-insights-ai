
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
    <div className="p-4 h-full overflow-y-auto">
      <div className="space-y-6 max-w-full">
        <div className="w-full">
          <MarketShareChart chartConfig={chartConfig} />
        </div>
        <div className="w-full">
          <PerformanceBenchmarkChart chartConfig={chartConfig} />
        </div>
        <div className="w-full">
          <TrafficComparisonChart chartConfig={chartConfig} />
        </div>
        <div className="w-full">
          <BrandPositioningChart chartConfig={chartConfig} />
        </div>
        <div className="w-full">
          <MarketEvolutionChart chartConfig={chartConfig} />
        </div>
      </div>
    </div>
  );
};

export default CompetitorsTab;
