
import React, { useState, useEffect } from 'react';
import { OnboardingData } from '../OnboardingWizard';
import { MockDataService } from '@/services/mockDataService';
import WebsiteAnalysisHeader from './website/WebsiteAnalysisHeader';
import WebsiteAnalysisPlaceholder from './website/WebsiteAnalysisPlaceholder';
import SEOAnalysisCard from './website/SEOAnalysisCard';
import PerformanceAnalysisCard from './website/PerformanceAnalysisCard';
import ContentAnalysisCard from './website/ContentAnalysisCard';
import CompetitionAnalysisCard from './website/CompetitionAnalysisCard';
import AIRecommendationsCard from './website/AIRecommendationsCard';

interface WebsiteAnalysisProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  isArabic: boolean;
}

const WebsiteAnalysis: React.FC<WebsiteAnalysisProps> = ({ data, updateData, isArabic }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const startAnalysis = () => {
    if (!data.website) return;
    
    setIsAnalyzing(true);
    // Simulate API call with enhanced mock data
    setTimeout(() => {
      const mockAnalysis = MockDataService.generateWebsiteAnalysis(data.website, data.industry || 'other');
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  useEffect(() => {
    if (data.website && !analysis && !isAnalyzing) {
      startAnalysis();
    }
  }, [data.website]);

  if (!data.website) {
    return <WebsiteAnalysisPlaceholder type="no-website" isArabic={isArabic} />;
  }

  if (isAnalyzing) {
    return <WebsiteAnalysisPlaceholder type="analyzing" isArabic={isArabic} />;
  }

  if (!analysis) {
    return (
      <WebsiteAnalysisPlaceholder 
        type="start-analysis" 
        onStartAnalysis={startAnalysis}
        isArabic={isArabic} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <WebsiteAnalysisHeader 
        website={data.website}
        onRefresh={startAnalysis}
        isArabic={isArabic}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <SEOAnalysisCard analysis={analysis} isArabic={isArabic} />
        <PerformanceAnalysisCard analysis={analysis} isArabic={isArabic} />
        <ContentAnalysisCard analysis={analysis} isArabic={isArabic} />
        <CompetitionAnalysisCard analysis={analysis} isArabic={isArabic} />
      </div>

      <AIRecommendationsCard industry={data.industry} isArabic={isArabic} />
    </div>
  );
};

export default WebsiteAnalysis;
