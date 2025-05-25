
export interface WebsiteAnalysisResult {
  url: string;
  title: string;
  description: string;
  keywords: string[];
  performanceScore: number;
  seoScore: number;
  recommendations: string[];
  socialMediaPresence: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  techStack: string[];
  loadTime: number;
  mobileOptimized: boolean;
}

export class WebsiteAnalysisService {
  private static async fetchWithTimeout(url: string, timeout = 10000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  static async analyzeWebsite(url: string): Promise<WebsiteAnalysisResult> {
    // For now, return enhanced mock data with realistic analysis
    // In production, this would integrate with actual website analysis APIs
    
    const startTime = Date.now();
    
    try {
      // Attempt to fetch basic info (this will work for same-origin or CORS-enabled sites)
      const response = await this.fetchWithTimeout(url);
      const loadTime = Date.now() - startTime;
      
      // Generate realistic mock data based on URL
      const domain = new URL(url).hostname;
      const isEcommerce = domain.includes('shop') || domain.includes('store') || domain.includes('buy');
      const isBlog = domain.includes('blog') || domain.includes('news');
      const isTech = domain.includes('tech') || domain.includes('dev') || domain.includes('app');
      
      return {
        url,
        title: `${domain} - Business Website`,
        description: `Professional website for ${domain}`,
        keywords: this.generateKeywords(domain, isEcommerce, isBlog, isTech),
        performanceScore: Math.floor(Math.random() * 30) + 70, // 70-100
        seoScore: Math.floor(Math.random() * 40) + 60, // 60-100
        recommendations: this.generateRecommendations(isEcommerce, isBlog, isTech),
        socialMediaPresence: this.generateSocialMedia(domain),
        techStack: this.generateTechStack(isTech),
        loadTime,
        mobileOptimized: Math.random() > 0.3 // 70% chance of being mobile optimized
      };
    } catch (error) {
      // Fallback analysis based on URL structure
      const domain = new URL(url).hostname;
      
      return {
        url,
        title: `${domain} - Website Analysis`,
        description: `Analysis for ${domain}`,
        keywords: ['business', 'website', domain.split('.')[0]],
        performanceScore: Math.floor(Math.random() * 20) + 60, // 60-80 (lower since we couldn't fetch)
        seoScore: Math.floor(Math.random() * 30) + 50, // 50-80
        recommendations: [
          'Enable CORS headers for better analysis',
          'Improve website accessibility',
          'Add meta descriptions',
          'Optimize loading speed'
        ],
        socialMediaPresence: {},
        techStack: ['Unknown'],
        loadTime: 0,
        mobileOptimized: false
      };
    }
  }

  private static generateKeywords(domain: string, isEcommerce: boolean, isBlog: boolean, isTech: boolean): string[] {
    const baseKeywords = [domain.split('.')[0], 'business', 'website'];
    
    if (isEcommerce) {
      baseKeywords.push('ecommerce', 'online store', 'shopping', 'products');
    }
    
    if (isBlog) {
      baseKeywords.push('blog', 'articles', 'content', 'news');
    }
    
    if (isTech) {
      baseKeywords.push('technology', 'software', 'development', 'innovation');
    }
    
    return baseKeywords;
  }

  private static generateRecommendations(isEcommerce: boolean, isBlog: boolean, isTech: boolean): string[] {
    const baseRecommendations = [
      'Improve page loading speed',
      'Add meta descriptions to all pages',
      'Optimize images for web',
      'Implement structured data markup'
    ];

    if (isEcommerce) {
      baseRecommendations.push(
        'Add product schema markup',
        'Implement customer reviews',
        'Optimize checkout process'
      );
    }

    if (isBlog) {
      baseRecommendations.push(
        'Add social sharing buttons',
        'Implement article schema',
        'Improve content readability'
      );
    }

    if (isTech) {
      baseRecommendations.push(
        'Add technical documentation',
        'Implement API documentation',
        'Add code examples'
      );
    }

    return baseRecommendations;
  }

  private static generateSocialMedia(domain: string) {
    const hasTwitter = Math.random() > 0.5;
    const hasFacebook = Math.random() > 0.6;
    const hasInstagram = Math.random() > 0.4;
    const hasLinkedin = Math.random() > 0.7;

    return {
      ...(hasTwitter && { twitter: `https://twitter.com/${domain.split('.')[0]}` }),
      ...(hasFacebook && { facebook: `https://facebook.com/${domain.split('.')[0]}` }),
      ...(hasInstagram && { instagram: `https://instagram.com/${domain.split('.')[0]}` }),
      ...(hasLinkedin && { linkedin: `https://linkedin.com/company/${domain.split('.')[0]}` })
    };
  }

  private static generateTechStack(isTech: boolean): string[] {
    const commonTech = ['HTML5', 'CSS3', 'JavaScript'];
    
    if (isTech) {
      const techOptions = ['React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'PHP', 'WordPress'];
      const selectedTech = techOptions.filter(() => Math.random() > 0.5);
      return [...commonTech, ...selectedTech];
    }
    
    return [...commonTech, 'WordPress'];
  }
}
