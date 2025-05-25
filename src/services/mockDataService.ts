
interface MockWebsiteAnalysis {
  seo: {
    score: number;
    issues: string[];
    strengths: string[];
    technicalStack: string[];
    contentGaps: string[];
  };
  performance: {
    score: number;
    loadTime: string;
    mobileScore: number;
    desktopScore: number;
    coreWebVitals: {
      lcp: string;
      fid: string;
      cls: string;
    };
  };
  content: {
    pages: number;
    blogPosts: number;
    lastUpdated: string;
    contentGaps: string[];
    topKeywords: string[];
  };
  competition: {
    ranking: string;
    keywords: number;
    backlinks: number;
    marketShare: string;
    competitorGaps: string[];
  };
}

interface MockSocialMetrics {
  platform: string;
  followers: number;
  engagement: number;
  postsPerWeek: number;
  topContent: string[];
  audienceDemographics: {
    ageGroups: { range: string; percentage: number }[];
    topLocations: string[];
  };
}

interface MockIndustryBenchmarks {
  avgConversionRate: number;
  avgCTR: number;
  avgCPM: number;
  topChannels: string[];
  seasonalTrends: { month: string; performance: number }[];
  competitorAnalysis: {
    name: string;
    marketShare: number;
    strengths: string[];
    weaknesses: string[];
  }[];
}

export class MockDataService {
  static generateWebsiteAnalysis(url: string, industry: string): MockWebsiteAnalysis {
    const industryFactors = this.getIndustryFactors(industry);
    
    return {
      seo: {
        score: Math.floor(Math.random() * 30) + 70,
        issues: [
          'Missing meta description on 3 pages',
          'Page load speed could be improved',
          'Alt text missing on 5 images',
          `${industry} specific schema markup missing`,
          'Internal linking structure needs optimization'
        ].slice(0, Math.floor(Math.random() * 3) + 2),
        strengths: [
          'Good title tag optimization',
          'Mobile-friendly design',
          'SSL certificate installed',
          `Strong ${industry} keyword targeting`,
          'Clean URL structure'
        ].slice(0, Math.floor(Math.random() * 3) + 2),
        technicalStack: this.getTechStack(url),
        contentGaps: [
          `${industry} comparison guides missing`,
          'Customer testimonials need expansion',
          'FAQ section incomplete',
          'Case studies could be added'
        ]
      },
      performance: {
        score: Math.floor(Math.random() * 20) + 75,
        loadTime: `${(Math.random() * 2 + 1.5).toFixed(1)}s`,
        mobileScore: Math.floor(Math.random() * 20) + 75,
        desktopScore: Math.floor(Math.random() * 15) + 85,
        coreWebVitals: {
          lcp: `${(Math.random() * 1 + 2).toFixed(1)}s`,
          fid: `${Math.floor(Math.random() * 50 + 50)}ms`,
          cls: `0.${Math.floor(Math.random() * 3)}`
        }
      },
      content: {
        pages: Math.floor(Math.random() * 20) + 10,
        blogPosts: Math.floor(Math.random() * 15) + 5,
        lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        contentGaps: [
          `${industry} best practices guide`,
          'Video content opportunities',
          'Interactive tools/calculators',
          'Customer success stories'
        ],
        topKeywords: this.getIndustryKeywords(industry)
      },
      competition: {
        ranking: `Top ${Math.floor(Math.random() * 5) + 1} in local market`,
        keywords: Math.floor(Math.random() * 50) + 25,
        backlinks: Math.floor(Math.random() * 300) + 100,
        marketShare: `${Math.floor(Math.random() * 15) + 5}%`,
        competitorGaps: [
          'Content marketing opportunities',
          'Social media presence',
          'Email marketing automation',
          'Mobile app presence'
        ]
      }
    };
  }

  static generateSocialMetrics(platform: string, industry: string): MockSocialMetrics {
    const baseFollowers = this.getBaseFollowers(platform);
    const industryMultiplier = this.getIndustryMultiplier(industry);
    
    return {
      platform,
      followers: Math.floor(baseFollowers * industryMultiplier * (Math.random() * 0.5 + 0.75)),
      engagement: Math.random() * 3 + 1,
      postsPerWeek: Math.floor(Math.random() * 5) + 2,
      topContent: [
        `${industry} tips and insights`,
        'Behind-the-scenes content',
        'Customer testimonials',
        'Product/service highlights'
      ],
      audienceDemographics: {
        ageGroups: [
          { range: '18-24', percentage: Math.floor(Math.random() * 20) + 10 },
          { range: '25-34', percentage: Math.floor(Math.random() * 25) + 25 },
          { range: '35-44', percentage: Math.floor(Math.random() * 20) + 20 },
          { range: '45+', percentage: Math.floor(Math.random() * 15) + 10 }
        ],
        topLocations: ['United States', 'United Kingdom', 'Canada', 'Australia']
      }
    };
  }

  static generateIndustryBenchmarks(industry: string): MockIndustryBenchmarks {
    const benchmarks = {
      technology: { avgConversionRate: 2.5, avgCTR: 3.2, avgCPM: 8.5 },
      healthcare: { avgConversionRate: 3.1, avgCTR: 2.8, avgCPM: 12.0 },
      finance: { avgConversionRate: 2.8, avgCTR: 2.1, avgCPM: 15.0 },
      retail: { avgConversionRate: 1.8, avgCTR: 4.1, avgCPM: 6.2 },
      education: { avgConversionRate: 4.2, avgCTR: 3.8, avgCPM: 7.8 },
      food: { avgConversionRate: 2.1, avgCTR: 5.2, avgCPM: 5.5 },
      travel: { avgConversionRate: 2.3, avgCTR: 3.9, avgCPM: 9.2 },
      'real-estate': { avgConversionRate: 1.2, avgCTR: 2.7, avgCPM: 18.5 },
      consulting: { avgConversionRate: 3.8, avgCTR: 2.9, avgCPM: 22.0 },
      other: { avgConversionRate: 2.4, avgCTR: 3.1, avgCPM: 10.0 }
    };

    const industryData = benchmarks[industry as keyof typeof benchmarks] || benchmarks.other;

    return {
      ...industryData,
      topChannels: this.getTopChannels(industry),
      seasonalTrends: this.getSeasonalTrends(industry),
      competitorAnalysis: this.getCompetitorAnalysis(industry)
    };
  }

  private static getIndustryFactors(industry: string): number {
    const factors = {
      technology: 1.2,
      healthcare: 0.9,
      finance: 0.8,
      retail: 1.1,
      education: 1.0,
      food: 1.3,
      travel: 0.7,
      'real-estate': 0.9,
      consulting: 1.1,
      other: 1.0
    };
    return factors[industry as keyof typeof factors] || 1.0;
  }

  private static getTechStack(url: string): string[] {
    const commonStacks = [
      ['React', 'Node.js', 'PostgreSQL'],
      ['WordPress', 'PHP', 'MySQL'],
      ['Shopify', 'Liquid', 'JavaScript'],
      ['Next.js', 'Vercel', 'MongoDB'],
      ['Vue.js', 'Express', 'Redis']
    ];
    return commonStacks[Math.floor(Math.random() * commonStacks.length)];
  }

  private static getIndustryKeywords(industry: string): string[] {
    const keywords = {
      technology: ['software development', 'cloud computing', 'AI solutions', 'digital transformation'],
      healthcare: ['patient care', 'medical services', 'health insurance', 'telemedicine'],
      finance: ['financial planning', 'investment advice', 'loan services', 'banking solutions'],
      retail: ['online shopping', 'product reviews', 'customer service', 'free shipping'],
      education: ['online learning', 'skill development', 'certification programs', 'educational resources'],
      food: ['restaurant delivery', 'healthy eating', 'food recipes', 'catering services'],
      travel: ['vacation packages', 'hotel booking', 'travel insurance', 'destination guides'],
      'real-estate': ['property listings', 'home buying', 'real estate agent', 'property investment'],
      consulting: ['business strategy', 'management consulting', 'process improvement', 'expert advice'],
      other: ['quality service', 'customer satisfaction', 'professional solutions', 'industry expertise']
    };
    return keywords[industry as keyof typeof keywords] || keywords.other;
  }

  private static getBaseFollowers(platform: string): number {
    const baseCounts = {
      facebook: 2500,
      instagram: 1800,
      twitter: 1200,
      linkedin: 800,
      youtube: 500
    };
    return baseCounts[platform as keyof typeof baseCounts] || 1000;
  }

  private static getIndustryMultiplier(industry: string): number {
    const multipliers = {
      technology: 1.5,
      retail: 2.2,
      food: 1.8,
      travel: 1.6,
      healthcare: 0.8,
      finance: 0.7,
      education: 1.1,
      'real-estate': 0.9,
      consulting: 0.8,
      other: 1.0
    };
    return multipliers[industry as keyof typeof multipliers] || 1.0;
  }

  private static getTopChannels(industry: string): string[] {
    const channels = {
      technology: ['Google Ads', 'LinkedIn', 'Content Marketing', 'SEO'],
      healthcare: ['Google Ads', 'Facebook', 'Local SEO', 'Email Marketing'],
      finance: ['Google Ads', 'LinkedIn', 'Content Marketing', 'Webinars'],
      retail: ['Facebook Ads', 'Instagram', 'Google Shopping', 'Email Marketing'],
      education: ['Google Ads', 'YouTube', 'Content Marketing', 'Social Media'],
      food: ['Instagram', 'Facebook', 'Local SEO', 'Delivery Apps'],
      travel: ['Google Ads', 'Instagram', 'Influencer Marketing', 'Content Marketing'],
      'real-estate': ['Facebook Ads', 'Google Ads', 'Local SEO', 'Referrals'],
      consulting: ['LinkedIn', 'Content Marketing', 'Webinars', 'Referrals'],
      other: ['Google Ads', 'Social Media', 'Email Marketing', 'SEO']
    };
    return channels[industry as keyof typeof channels] || channels.other;
  }

  private static getSeasonalTrends(industry: string): { month: string; performance: number }[] {
    // Returns performance index where 100 is average
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const patterns = {
      retail: [85, 80, 95, 105, 110, 100, 90, 95, 100, 105, 120, 140],
      travel: [70, 75, 90, 110, 115, 120, 125, 120, 105, 95, 80, 85],
      education: [120, 110, 100, 95, 90, 70, 75, 130, 125, 105, 100, 95],
      food: [95, 100, 105, 100, 105, 110, 115, 110, 100, 105, 115, 125],
      other: [95, 95, 100, 105, 105, 100, 95, 100, 105, 105, 110, 115]
    };

    const pattern = patterns[industry as keyof typeof patterns] || patterns.other;
    return months.map((month, index) => ({ month, performance: pattern[index] }));
  }

  private static getCompetitorAnalysis(industry: string): { name: string; marketShare: number; strengths: string[]; weaknesses: string[] }[] {
    return [
      {
        name: 'Market Leader',
        marketShare: Math.floor(Math.random() * 15) + 25,
        strengths: ['Brand recognition', 'Large customer base', 'Extensive resources'],
        weaknesses: ['Higher prices', 'Slow innovation', 'Poor customer service']
      },
      {
        name: 'Rising Competitor',
        marketShare: Math.floor(Math.random() * 10) + 15,
        strengths: ['Competitive pricing', 'Modern technology', 'Agile approach'],
        weaknesses: ['Limited brand awareness', 'Smaller team', 'Less experience']
      },
      {
        name: 'Niche Player',
        marketShare: Math.floor(Math.random() * 8) + 8,
        strengths: ['Specialized expertise', 'Personal service', 'Industry focus'],
        weaknesses: ['Limited services', 'Small marketing budget', 'Regional presence']
      }
    ];
  }
}
