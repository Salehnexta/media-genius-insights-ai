
import React from 'react';
import { TrendingUp, TrendingDown, User, CreditCard, BarChart2, Globe } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    positive: boolean;
  };
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-md bg-blue-50 dark:bg-blue-900/20 text-primary">
          {icon}
        </div>
      </div>
      <div className="flex items-center mt-2">
        {change.positive ? (
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
        )}
        <span className={`text-sm font-medium ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
          {change.value}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs previous period</span>
      </div>
    </div>
  );
};

const StatCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Reach"
        value="2.4M"
        change={{ value: "12%", positive: true }}
        icon={<Globe className="h-5 w-5" />}
      />
      <StatCard
        title="Engagement Rate"
        value="4.8%"
        change={{ value: "0.5%", positive: true }}
        icon={<BarChart2 className="h-5 w-5" />}
      />
      <StatCard
        title="Ad Spend"
        value="$12,450"
        change={{ value: "8%", positive: false }}
        icon={<CreditCard className="h-5 w-5" />}
      />
      <StatCard
        title="New Followers"
        value="1,203"
        change={{ value: "15%", positive: true }}
        icon={<User className="h-5 w-5" />}
      />
    </div>
  );
};

export default StatCards;
