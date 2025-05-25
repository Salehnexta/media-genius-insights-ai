
interface MockGoogleAnalyticsData {
  sessions: number;
  pageviews: number;
  bounceRate: number;
  avgSessionDuration: string;
  conversionRate: number;
  topPages: { page: string; views: number; bounceRate: number }[];
  trafficSources: { source: string; percentage: number; sessions: number }[];
  demographics: {
    ageGroups: { range: string; percentage: number }[];
    genders: { gender: string; percentage: number }[];
    locations: { country: string; sessions: number; percentage: number }[];
  };
  monthlyTrends: { month: string; sessions: number; conversions: number }[];
}

interface MockSocialInsights {
  platform: string;
  followers: number;
  followersGrowth: number;
  engagement: number;
  reach: number;
  impressions: number;
  topPosts: { content: string; engagement: number; reach: number }[];
  audienceDemographics: {
    ageGroups: { range: string; percentage: number }[];
    locations: string[];
    interests: string[];
  };
  bestPostingTimes: { day: string; hour: number; engagement: number }[];
  competitorComparison: { competitor: string; followers: number; engagement: number }[];
}

interface MockCompetitorIntelligence {
  competitor: string;
  website: string;
  monthlyTraffic: number;
  marketShare: number;
  pricing: { plan: string; price: number; features: string[] }[];
  socialPresence: { platform: string; followers: number; engagement: number }[];
  contentStrategy: {
    postingFrequency: number;
    topContentTypes: string[];
    engagementTactics: string[];
  };
  strengths: string[];
  weaknesses: string[];
  threats: string[];
  opportunities: string[];
}

interface MockTrendData {
  industry: string;
  emergingTrends: { trend: string; growthRate: number; timeframe: string }[];
  seasonalPatterns: { period: string; impact: number; description: string }[];
  keywordTrends: { keyword: string; searchVolume: number; competition: string; trend: number }[];
  consumerBehavior: { behavior: string; adoption: number; impact: string }[];
  marketForecasts: { metric: string; current: number; projected: number; timeframe: string }[];
}

export class MockApiService {
  static generateGoogleAnalyticsData(industry: string, websiteAge: number = 2): MockGoogleAnalyticsData {
    const industryMultipliers = {
      technology: { sessions: 1.3, conversion: 1.2 },
      healthcare: { sessions: 0.8, conversion: 1.4 },
      finance: { sessions: 0.9, conversion: 1.1 },
      retail: { sessions: 1.5, conversion: 0.9 },
      education: { sessions: 1.1, conversion: 1.3 },
      food: { sessions: 1.2, conversion: 0.8 },
      travel: { sessions: 1.4, conversion: 0.7 },
      'real-estate': { sessions: 0.7, conversion: 1.5 },
      consulting: { sessions: 0.8, conversion: 1.6 },
      other: { sessions: 1.0, conversion: 1.0 }
    };

    const multiplier = industryMultipliers[industry as keyof typeof industryMultipliers] || industryMultipliers.other;
    const baseSessions = Math.floor(5000 * websiteAge * multiplier.sessions);

    return {
      sessions: baseSessions,
      pageviews: Math.floor(baseSessions * (2.5 + Math.random())),
      bounceRate: Math.round((45 + Math.random() * 30) * 10) / 10,
      avgSessionDuration: `${Math.floor(Math.random() * 3 + 1)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      conversionRate: Math.round(2.5 * multiplier.conversion * 10) / 10,
      topPages: [
        { page: '/', views: Math.floor(baseSessions * 0.3), bounceRate: 35 },
        { page: '/products', views: Math.floor(baseSessions * 0.2), bounceRate: 42 },
        { page: '/about', views: Math.floor(baseSessions * 0.15), bounceRate: 38 },
        { page: '/contact', views: Math.floor(baseSessions * 0.1), bounceRate: 28 },
        { page: '/blog', views: Math.floor(baseSessions * 0.08), bounceRate: 55 }
      ],
      trafficSources: [
        { source: 'Organic Search', percentage: 45, sessions: Math.floor(baseSessions * 0.45) },
        { source: 'Direct', percentage: 25, sessions: Math.floor(baseSessions * 0.25) },
        { source: 'Social Media', percentage: 15, sessions: Math.floor(baseSessions * 0.15) },
        { source: 'Referral', percentage: 10, sessions: Math.floor(baseSessions * 0.1) },
        { source: 'Paid Search', percentage: 5, sessions: Math.floor(baseSessions * 0.05) }
      ],
      demographics: {
        ageGroups: [
          { range: '18-24', percentage: 15 },
          { range: '25-34', percentage: 35 },
          { range: '35-44', percentage: 25 },
          { range: '45-54', percentage: 15 },
          { range: '55+', percentage: 10 }
        ],
        genders: [
          { gender: 'Male', percentage: 52 },
          { gender: 'Female', percentage: 45 },
          { gender: 'Other', percentage: 3 }
        ],
        locations: [
          { country: 'United States', sessions: Math.floor(baseSessions * 0.4), percentage: 40 },
          { country: 'United Kingdom', sessions: Math.floor(baseSessions * 0.15), percentage: 15 },
          { country: 'Canada', sessions: Math.floor(baseSessions * 0.12), percentage: 12 },
          { country: 'Australia', sessions: Math.floor(baseSessions * 0.08), percentage: 8 },
          { country: 'Germany', sessions: Math.floor(baseSessions * 0.06), percentage: 6 }
        ]
      },
      monthlyTrends: this.generateMonthlyTrends(baseSessions, industry)
    };
  }

  static generateSocialInsights(platform: string, industry: string): MockSocialInsights {
    const platformMultipliers = {
      facebook: { followers: 1.0, engagement: 1.0 },
      instagram: { followers: 0.8, engagement: 1.5 },
      twitter: { followers: 0.6, engagement: 0.8 },
      linkedin: { followers: 0.4, engagement: 0.6 },
      youtube: { followers: 0.3, engagement: 2.0 }
    };

    const industryFollowers = {
      retail: 5000,
      food: 8000,
      technology: 3000,
      healthcare: 2000,
      finance: 1500,
      education: 3500,
      travel: 6000,
      'real-estate': 1800,
      consulting: 1200,
      other: 2500
    };

    const multiplier = platformMultipliers[platform as keyof typeof platformMultipliers] || platformMultipliers.facebook;
    const baseFollowers = industryFollowers[industry as keyof typeof industryFollowers] || industryFollowers.other;
    const followers = Math.floor(baseFollowers * multiplier.followers * (0.8 + Math.random() * 0.4));

    return {
      platform,
      followers,
      followersGrowth: Math.round((5 + Math.random() * 15) * 10) / 10,
      engagement: Math.round(2.5 * multiplier.engagement * 10) / 10,
      reach: Math.floor(followers * (2 + Math.random() * 3)),
      impressions: Math.floor(followers * (5 + Math.random() * 10)),
      topPosts: [
        { content: `${industry} tips that boost engagement`, engagement: 4.2, reach: Math.floor(followers * 0.8) },
        { content: 'Behind the scenes content', engagement: 3.8, reach: Math.floor(followers * 0.6) },
        { content: 'Customer success story', engagement: 5.1, reach: Math.floor(followers * 0.9) }
      ],
      audienceDemographics: {
        ageGroups: [
          { range: '18-24', percentage: 25 },
          { range: '25-34', percentage: 40 },
          { range: '35-44', percentage: 20 },
          { range: '45+', percentage: 15 }
        ],
        locations: ['United States', 'United Kingdom', 'Canada', 'Australia'],
        interests: this.getIndustryInterests(industry)
      },
      bestPostingTimes: [
        { day: 'Monday', hour: 9, engagement: 3.2 },
        { day: 'Wednesday', hour: 14, engagement: 4.1 },
        { day: 'Friday', hour: 11, engagement: 3.8 },
        { day: 'Sunday', hour: 19, engagement: 4.5 }
      ],
      competitorComparison: [
        { competitor: 'Market Leader', followers: Math.floor(followers * 2.5), engagement: 2.8 },
        { competitor: 'Direct Competitor', followers: Math.floor(followers * 1.2), engagement: 3.1 },
        { competitor: 'Niche Player', followers: Math.floor(followers * 0.7), engagement: 4.2 }
      ]
    };
  }

  static generateCompetitorIntelligence(industry: string, numberOfCompetitors: number = 3): MockCompetitorIntelligence[] {
    const competitorNames = {
      technology: ['TechCorp', 'InnovateSoft', 'CloudSolutions'],
      retail: ['MegaStore', 'ShopSmart', 'RetailPro'],
      food: ['FoodieHub', 'TastyBites', 'CulinaryEdge'],
      healthcare: ['HealthFirst', 'MedTech Solutions', 'WellnessPro'],
      finance: ['FinanceGuru', 'InvestSmart', 'MoneyWise'],
      education: ['LearnMore', 'EduTech', 'SkillBuilder'],
      travel: ['TravelEase', 'Wanderlust', 'JourneyPro'],
      'real-estate': ['PropertyPlus', 'RealtyPro', 'HomeFinder'],
      consulting: ['ConsultExperts', 'StrategyPro', 'BusinessWise'],
      other: ['MarketLeader', 'IndustryPro', 'CompetitorX']
    };

    const names = competitorNames[industry as keyof typeof competitorNames] || competitorNames.other;
    
    return names.slice(0, numberOfCompetitors).map((name, index) => ({
      competitor: name,
      website: `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
      monthlyTraffic: Math.floor(50000 * (2 - index * 0.3) * (0.8 + Math.random() * 0.4)),
      marketShare: Math.round((30 - index * 8) * (0.8 + Math.random() * 0.4)),
      pricing: [
        { plan: 'Basic', price: 29 + index * 10, features: ['Feature A', 'Feature B', 'Support'] },
        { plan: 'Pro', price: 79 + index * 20, features: ['All Basic', 'Feature C', 'Analytics'] },
        { plan: 'Enterprise', price: 199 + index * 50, features: ['All Pro', 'Custom', 'Priority Support'] }
      ],
      socialPresence: [
        { platform: 'Facebook', followers: Math.floor(8000 * (2 - index * 0.3)), engagement: 2.5 + Math.random() },
        { platform: 'Instagram', followers: Math.floor(5000 * (2 - index * 0.3)), engagement: 3.2 + Math.random() },
        { platform: 'LinkedIn', followers: Math.floor(3000 * (2 - index * 0.3)), engagement: 1.8 + Math.random() }
      ],
      contentStrategy: {
        postingFrequency: 5 + index,
        topContentTypes: ['Educational', 'Product Updates', 'Industry News'],
        engagementTactics: ['User Generated Content', 'Polls & Questions', 'Behind the Scenes']
      },
      strengths: [
        'Strong brand recognition',
        'Extensive feature set',
        'Large customer base'
      ].slice(0, 2 + index),
      weaknesses: [
        'Higher pricing',
        'Complex user interface',
        'Slow customer support'
      ].slice(0, 2 + index),
      threats: [
        'New market entrants',
        'Changing customer preferences',
        'Economic uncertainty'
      ],
      opportunities: [
        'Emerging markets',
        'Technology partnerships',
        'Product innovation'
      ]
    }));
  }

  static generateTrendData(industry: string): MockTrendData {
    const industryTrends = {
      technology: {
        emerging: ['AI Integration', 'Cloud Migration', 'Cybersecurity'],
        keywords: ['artificial intelligence', 'machine learning', 'cloud computing', 'cybersecurity']
      },
      retail: {
        emerging: ['Social Commerce', 'Sustainability', 'Personalization'],
        keywords: ['online shopping', 'sustainable products', 'personalized recommendations', 'social media shopping']
      },
      healthcare: {
        emerging: ['Telemedicine', 'Digital Health', 'Preventive Care'],
        keywords: ['telehealth', 'digital wellness', 'remote monitoring', 'health apps']
      },
      finance: {
        emerging: ['Digital Banking', 'Cryptocurrency', 'Robo-Advisors'],
        keywords: ['digital banking', 'fintech', 'cryptocurrency', 'investment apps']
      },
      other: {
        emerging: ['Digital Transformation', 'Remote Work', 'Sustainability'],
        keywords: ['digital solutions', 'remote services', 'eco-friendly', 'online platforms']
      }
    };

    const trends = industryTrends[industry as keyof typeof industryTrends] || industryTrends.other;

    return {
      industry,
      emergingTrends: trends.emerging.map(trend => ({
        trend,
        growthRate: Math.round((15 + Math.random() * 35) * 10) / 10,
        timeframe: '6-12 months'
      })),
      seasonalPatterns: [
        { period: 'Q1', impact: 85, description: 'Post-holiday recovery period' },
        { period: 'Q2', impact: 110, description: 'Spring growth season' },
        { period: 'Q3', impact: 95, description: 'Summer slowdown' },
        { period: 'Q4', impact: 130, description: 'Holiday peak season' }
      ],
      keywordTrends: trends.keywords.map(keyword => ({
        keyword,
        searchVolume: Math.floor(1000 + Math.random() * 9000),
        competition: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        trend: Math.round((5 + Math.random() * 25) * 10) / 10
      })),
      consumerBehavior: [
        { behavior: 'Mobile-first browsing', adoption: 78, impact: 'High' },
        { behavior: 'Voice search usage', adoption: 34, impact: 'Medium' },
        { behavior: 'Social media discovery', adoption: 56, impact: 'High' },
        { behavior: 'Video content preference', adoption: 67, impact: 'High' }
      ],
      marketForecasts: [
        { metric: 'Market Size', current: 100, projected: 125, timeframe: '2024-2025' },
        { metric: 'Digital Adoption', current: 65, projected: 78, timeframe: '2024-2025' },
        { metric: 'Customer Acquisition Cost', current: 100, projected: 115, timeframe: '2024-2025' }
      ]
    };
  }

  private static generateMonthlyTrends(baseSessions: number, industry: string) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const seasonalMultipliers = {
      retail: [0.8, 0.9, 1.0, 1.1, 1.1, 1.0, 0.9, 1.0, 1.1, 1.2, 1.4, 1.6],
      travel: [0.7, 0.8, 1.0, 1.2, 1.3, 1.4, 1.5, 1.4, 1.2, 1.0, 0.8, 0.9],
      education: [1.3, 1.2, 1.1, 1.0, 0.9, 0.7, 0.8, 1.4, 1.3, 1.1, 1.0, 0.9],
      other: [0.9, 0.9, 1.0, 1.1, 1.1, 1.0, 0.9, 1.0, 1.1, 1.1, 1.2, 1.3]
    };

    const multipliers = seasonalMultipliers[industry as keyof typeof seasonalMultipliers] || seasonalMultipliers.other;
    
    return months.map((month, index) => ({
      month,
      sessions: Math.floor(baseSessions * multipliers[index] * (0.9 + Math.random() * 0.2)),
      conversions: Math.floor(baseSessions * multipliers[index] * 0.025 * (0.8 + Math.random() * 0.4))
    }));
  }

  private static getIndustryInterests(industry: string): string[] {
    const interests = {
      technology: ['Software Development', 'Innovation', 'Tech News', 'Gadgets'],
      retail: ['Shopping', 'Fashion', 'Lifestyle', 'Product Reviews'],
      food: ['Cooking', 'Restaurants', 'Food Trends', 'Nutrition'],
      healthcare: ['Wellness', 'Fitness', 'Medical News', 'Health Tips'],
      finance: ['Investing', 'Personal Finance', 'Business News', 'Economics'],
      education: ['Learning', 'Career Development', 'Skills Training', 'Academia'],
      travel: ['Tourism', 'Adventure', 'Culture', 'Hospitality'],
      'real-estate': ['Property Investment', 'Home Improvement', 'Real Estate News', 'Architecture'],
      consulting: ['Business Strategy', 'Management', 'Leadership', 'Professional Development'],
      other: ['Business', 'Innovation', 'Industry News', 'Professional Services']
    };

    return interests[industry as keyof typeof interests] || interests.other;
  }

  // Integration simulation methods
  static async simulateGoogleAnalytics(websiteUrl: string, industry: string): Promise<MockGoogleAnalyticsData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    return this.generateGoogleAnalyticsData(industry);
  }

  static async simulateSocialMediaInsights(platform: string, accountUrl: string, industry: string): Promise<MockSocialInsights> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1500));
    return this.generateSocialInsights(platform, industry);
  }

  static async simulateCompetitorAnalysis(industry: string, competitors: string[]): Promise<MockCompetitorIntelligence[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    return this.generateCompetitorIntelligence(industry, competitors.length || 3);
  }

  static async simulateTrendForecasting(industry: string): Promise<MockTrendData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2500));
    return this.generateTrendData(industry);
  }
}
