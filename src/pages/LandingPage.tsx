
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BarChart3, Brain, Target, TrendingUp, Users, Zap } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-marketing-gradient rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-marketing-gradient bg-clip-text text-transparent">
              MarketingGenius AI
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/ar" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              العربية
            </Link>
            <Link to="/dashboard">
              <Button>
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Revolutionize Your Marketing with 
            <span className="bg-marketing-gradient bg-clip-text text-transparent"> AI Intelligence</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your marketing strategy with comprehensive analytics, AI-powered insights, 
            and real-time performance tracking. Make data-driven decisions that drive growth.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link to="/dashboard">
              <Button size="lg" className="bg-marketing-gradient hover:opacity-90">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Modern Marketers
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to understand, optimize, and scale your marketing efforts
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-blue-500 mb-2" />
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Track and analyze your marketing performance with comprehensive dashboards and real-time metrics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Brain className="h-10 w-10 text-purple-500 mb-2" />
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>
                  Get intelligent recommendations and predictive analytics to optimize your marketing strategy
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Target className="h-10 w-10 text-green-500 mb-2" />
                <CardTitle>Audience Intelligence</CardTitle>
                <CardDescription>
                  Understand your customers better with detailed audience insights and behavioral analysis
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-red-500 mb-2" />
                <CardTitle>Competitor Analysis</CardTitle>
                <CardDescription>
                  Stay ahead of the competition with comprehensive market intelligence and benchmarking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="h-10 w-10 text-yellow-500 mb-2" />
                <CardTitle>Campaign Management</CardTitle>
                <CardDescription>
                  Plan, execute, and optimize your marketing campaigns with data-driven insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Zap className="h-10 w-10 text-indigo-500 mb-2" />
                <CardTitle>Content Creation</CardTitle>
                <CardDescription>
                  Generate engaging content with AI assistance and schedule across multiple platforms
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-marketing-gradient">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of marketers who are already using MarketingGenius AI to drive better results
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-8 w-8 bg-marketing-gradient rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">MarketingGenius AI</span>
          </div>
          <p className="text-gray-400">
            © 2024 MarketingGenius AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
