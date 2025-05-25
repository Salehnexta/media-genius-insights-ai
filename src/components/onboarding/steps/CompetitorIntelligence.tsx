
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Users, Globe, DollarSign, Target, AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';
import { MockApiService } from '@/services/mockApiService';

interface CompetitorIntelligenceProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const CompetitorIntelligence: React.FC<CompetitorIntelligenceProps> = ({ data, updateData, isArabic }) => {
  const { t } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [competitorData, setCompetitorData] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any>(null);

  const startIntelligenceGathering = async () => {
    if (!data.competitors.length || !data.industry) return;
    
    setIsAnalyzing(true);
    
    try {
      // Simulate comprehensive competitor analysis
      const [competitors, trends] = await Promise.all([
        MockApiService.simulateCompetitorAnalysis(data.industry, data.competitors),
        MockApiService.simulateTrendForecasting(data.industry)
      ]);
      
      setCompetitorData(competitors);
      setTrendData(trends);
    } catch (error) {
      console.error('Intelligence gathering failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (data.competitors.length > 0 && data.industry && !competitorData.length && !isAnalyzing) {
      startIntelligenceGathering();
    }
  }, [data.competitors, data.industry]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getMarketShareColor = (share: number): string => {
    if (share >= 25) return 'text-red-600';
    if (share >= 15) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (data.competitors.length === 0) {
    return (
      <div className="text-center py-8">
        <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300">
          Add competitors in the previous step to see intelligence analysis
        </p>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="text-center py-12">
        <Loader className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Gathering Competitive Intelligence
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Analyzing competitors, market trends, and opportunities...
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
          <div>• Monitoring competitor websites and traffic</div>
          <div>• Analyzing social media presence</div>
          <div>• Examining pricing strategies</div>
          <div>• Identifying market opportunities</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Competitor Analysis Grid */}
      {competitorData.length > 0 && (
        <div className="grid gap-6">
          {competitorData.map((competitor, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    <Globe className="w-5 h-5" />
                    <span>{competitor.competitor}</span>
                  </div>
                  <Badge variant="outline" className={getMarketShareColor(competitor.marketShare)}>
                    {competitor.marketShare}% Market Share
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {formatNumber(competitor.monthlyTraffic)}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Monthly Traffic
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      ${competitor.pricing[1]?.price || 'N/A'}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Pro Plan Price
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">
                      {competitor.socialPresence[0]?.followers ? formatNumber(competitor.socialPresence[0].followers) : 'N/A'}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Social Followers
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">
                      {competitor.contentStrategy.postingFrequency}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Posts/Week
                    </div>
                  </div>
                </div>

                {/* SWOT Analysis */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Strengths
                    </h5>
                    <ul className="space-y-1">
                      {competitor.strengths.map((strength: string, idx: number) => (
                        <li key={idx} className="text-sm text-green-700 dark:text-green-300">
                          • {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-red-800 dark:text-red-200 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Weaknesses
                    </h5>
                    <ul className="space-y-1">
                      {competitor.weaknesses.map((weakness: string, idx: number) => (
                        <li key={idx} className="text-sm text-red-700 dark:text-red-300">
                          • {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing Strategy */}
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                    Pricing Strategy
                  </h5>
                  <div className={`flex gap-2 ${isArabic ? 'justify-end' : ''}`}>
                    {competitor.pricing.map((plan: any, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {plan.plan}: ${plan.price}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Market Trends Analysis */}
      {trendData && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardHeader>
            <CardTitle className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <TrendingUp className="w-5 h-5" />
              {data.industry.charAt(0).toUpperCase() + data.industry.slice(1)} Market Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Emerging Trends */}
            <div>
              <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-3">
                Emerging Trends
              </h5>
              <div className="grid md:grid-cols-3 gap-4">
                {trendData.emergingTrends.map((trend: any, index: number) => (
                  <div key={index} className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <div className="font-medium text-sm">{trend.trend}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Growth: +{trend.growthRate}%
                    </div>
                    <Progress value={Math.min(trend.growthRate * 2, 100)} className="h-1 mt-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Keyword Trends */}
            <div>
              <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-3">
                Trending Keywords
              </h5>
              <div className={`flex flex-wrap gap-2 ${isArabic ? 'justify-end' : ''}`}>
                {trendData.keywordTrends.map((keyword: any, index: number) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className={`text-xs ${
                      keyword.competition === 'Low' ? 'bg-green-100 text-green-800' :
                      keyword.competition === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {keyword.keyword} ({formatNumber(keyword.searchVolume)})
                  </Badge>
                ))}
              </div>
            </div>

            {/* Market Forecasts */}
            <div>
              <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-3">
                Market Forecasts
              </h5>
              <div className="grid md:grid-cols-3 gap-4">
                {trendData.marketForecasts.map((forecast: any, index: number) => (
                  <div key={index} className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <div className="font-medium text-sm">{forecast.metric}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {forecast.current} → {forecast.projected} ({forecast.timeframe})
                    </div>
                    <div className="text-xs font-medium text-green-600">
                      +{Math.round(((forecast.projected - forecast.current) / forecast.current) * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Strategic Opportunities */}
      {competitorData.length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <CardHeader>
            <CardTitle className="text-green-900 dark:text-green-100">
              Strategic Opportunities Identified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Target className="w-4 h-4 text-green-600 mt-0.5" />
                <div className="text-sm text-green-800 dark:text-green-200">
                  Price positioning opportunity: Average competitor pricing is ${Math.round(competitorData.reduce((sum, c) => sum + (c.pricing[1]?.price || 0), 0) / competitorData.length)}
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Users className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  Social media gap: Competitors have an average of {formatNumber(Math.round(competitorData.reduce((sum, c) => sum + (c.socialPresence[0]?.followers || 0), 0) / competitorData.length))} followers
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <TrendingUp className="w-4 h-4 text-purple-600 mt-0.5" />
                <div className="text-sm text-purple-800 dark:text-purple-200">
                  Content frequency opportunity: Competitors post {Math.round(competitorData.reduce((sum, c) => sum + c.contentStrategy.postingFrequency, 0) / competitorData.length)} times per week on average
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Refresh Analysis */}
      <div className="text-center">
        <Button variant="outline" onClick={startIntelligenceGathering} disabled={isAnalyzing}>
          {isAnalyzing ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <TrendingUp className="w-4 h-4 mr-2" />
              Refresh Intelligence
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CompetitorIntelligence;
