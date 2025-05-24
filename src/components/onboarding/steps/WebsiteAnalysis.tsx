
import React, { useState, useEffect } from 'react';
import { OnboardingData } from '../OnboardingWizard';
import { useRealWebsiteAnalysis } from '@/hooks/useRealWebsiteAnalysis';
import { RealWebsiteAnalysisResult } from '@/services/realWebsiteAnalysis';
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
  const { analyzeWebsite, getWebsiteAnalysis, analyzing } = useRealWebsiteAnalysis();
  const [analysis, setAnalysis] = useState<RealWebsiteAnalysisResult | null>(null);

  const startAnalysis = async () => {
    if (!data.website) return;
    
    console.log('Starting real website analysis for:', data.website);
    const result = await analyzeWebsite(data.website);
    if (result) {
      setAnalysis(result);
    }
  };

  const loadExistingAnalysis = async () => {
    if (!data.website) return;
    
    const existingAnalysis = await getWebsiteAnalysis(data.website);
    if (existingAnalysis) {
      setAnalysis(existingAnalysis);
    }
  };

  useEffect(() => {
    if (data.website && !analysis && !analyzing) {
      // First try to load existing analysis
      loadExistingAnalysis().then(() => {
        // If no existing analysis, start new one
        if (!analysis) {
          startAnalysis();
        }
      });
    }
  }, [data.website]);

  if (!data.website) {
    return <WebsiteAnalysisPlaceholder type="no-website" isArabic={isArabic} />;
  }

  if (analyzing) {
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
