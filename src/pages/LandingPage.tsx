
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BarChart3, Brain, Target, TrendingUp, Users, Zap, CheckCircle, Star, Globe, Shield, Play } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-md dark:bg-gray-900/95 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MarketingGenius AI
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">About</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">Testimonials</a>
            </nav>
            <Link to="/ar" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
              العربية
            </Link>
            <Link to="/dashboard">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
              🚀 AI-Powered Marketing Intelligence
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            Transform Your
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Marketing Strategy
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Harness the power of AI to understand your audience, optimize campaigns, and drive unprecedented growth. 
            Join thousands of marketers making data-driven decisions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-1">
              <img 
                src="/lovable-uploads/f69bc471-c52a-4ed9-bdfe-f26e2923002b.png" 
                alt="MarketingGenius AI Dashboard"
                className="w-full rounded-xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">50K+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">2M+</div>
              <div className="text-gray-600 dark:text-gray-400">Campaigns Analyzed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">95%</div>
              <div className="text-gray-600 dark:text-gray-400">Customer Satisfaction</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">40%</div>
              <div className="text-gray-600 dark:text-gray-400">Average ROI Increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  Why Choose Us
                </span>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Empowering Modern Marketers Worldwide
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our AI-driven platform helps thousands of marketing professionals across the globe 
                  make smarter decisions, optimize campaigns, and achieve better ROI through advanced 
                  analytics and intelligent insights.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Real-time Campaign Optimization</h3>
                    <p className="text-gray-600 dark:text-gray-300">Monitor and adjust your campaigns instantly with AI-powered recommendations</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Advanced Audience Targeting</h3>
                    <p className="text-gray-600 dark:text-gray-300">Reach the right people at the right time with precision targeting</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Predictive Analytics</h3>
                    <p className="text-gray-600 dark:text-gray-300">Forecast trends and make proactive decisions with AI insights</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8">
                <img 
                  src="/lovable-uploads/f69bc471-c52a-4ed9-bdfe-f26e2923002b.png" 
                  alt="Professional using marketing platform"
                  className="w-full rounded-xl shadow-2xl"
                />
              </div>
              <div className="absolute -z-10 -top-8 -right-8 w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
              Features
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive tools and insights to transform your marketing strategy
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "Performance Analytics",
                description: "Track and analyze your marketing performance with comprehensive dashboards and real-time metrics",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                icon: <Brain className="h-8 w-8" />,
                title: "AI-Powered Insights",
                description: "Get intelligent recommendations and predictive analytics to optimize your marketing strategy",
                gradient: "from-purple-500 to-purple-600"
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Audience Intelligence",
                description: "Understand your customers better with detailed audience insights and behavioral analysis",
                gradient: "from-green-500 to-green-600"
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Competitor Analysis",
                description: "Stay ahead of the competition with comprehensive market intelligence and benchmarking",
                gradient: "from-red-500 to-red-600"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Campaign Management",
                description: "Plan, execute, and optimize your marketing campaigns with data-driven insights",
                gradient: "from-yellow-500 to-yellow-600"
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Content Creation",
                description: "Generate engaging content with AI assistance and schedule across multiple platforms",
                gradient: "from-indigo-500 to-indigo-600"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader className="space-y-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Loved by Marketing Teams Worldwide
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Marketing Director",
                company: "TechCorp",
                avatar: "S",
                gradient: "from-blue-500 to-blue-600",
                content: "MarketingGenius AI has completely transformed how we approach our marketing campaigns. The insights are incredibly accurate and actionable."
              },
              {
                name: "Michael Chen",
                role: "CEO",
                company: "TechStart",
                avatar: "M",
                gradient: "from-green-500 to-green-600",
                content: "The AI-powered recommendations have helped us increase our conversion rates by 60%. It's like having a marketing expert on our team 24/7."
              },
              {
                name: "Emily Rodriguez",
                role: "Growth Manager",
                company: "ScaleUp Inc",
                avatar: "E",
                gradient: "from-purple-500 to-purple-600",
                content: "Outstanding platform! The competitor analysis feature alone has saved us countless hours of research and helped us stay ahead of the market."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto text-center">
          <div className="space-y-4 mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
              Security & Trust
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Enterprise-Grade Security & Reliability
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Shield className="h-12 w-12" />,
                title: "Bank-Level Security",
                description: "Your data is protected with enterprise-grade encryption and security protocols",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                icon: <Globe className="h-12 w-12" />,
                title: "Global Infrastructure",
                description: "99.9% uptime with servers across multiple regions for optimal performance",
                gradient: "from-green-500 to-green-600"
              },
              {
                icon: <CheckCircle className="h-12 w-12" />,
                title: "GDPR Compliant",
                description: "Fully compliant with international data protection regulations",
                gradient: "from-purple-500 to-purple-600"
              }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className={`w-20 h-20 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center text-white mx-auto`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <div className="space-y-8 max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-white">
              Ready to Transform Your Marketing?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Join thousands of marketers who are already using MarketingGenius AI to drive better results. 
              Start your free trial today and see the difference AI can make.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">MarketingGenius AI</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Transforming marketing with AI-powered insights and analytics. 
                Join thousands of marketers making data-driven decisions.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/campaigns" className="hover:text-white transition-colors">Campaigns</Link></li>
                <li><Link to="/subscription" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><Link to="/profile" className="hover:text-white transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Legal & Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/debug" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 MarketingGenius AI. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link to="/ar" className="text-gray-400 hover:text-white transition-colors text-sm">
                العربية
              </Link>
              <Link to="/auth" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
