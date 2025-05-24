
import React from 'react';
import { Agent } from './MarketingDashboard';
import MarketingManagerWorkspace from './workspaces/MarketingManagerWorkspace';
import ContentSEOWorkspace from './workspaces/ContentSEOWorkspace';
import SocialCreatorWorkspace from './workspaces/SocialCreatorWorkspace';
import SocialCXWorkspace from './workspaces/SocialCXWorkspace';
import CampaignPerformanceWorkspace from './workspaces/CampaignPerformanceWorkspace';

interface AgentWorkspaceAreaProps {
  selectedAgent: Agent | null;
  isArabic: boolean;
}

const AgentWorkspaceArea: React.FC<AgentWorkspaceAreaProps> = ({ selectedAgent, isArabic }) => {
  if (!selectedAgent) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className={`text-center max-w-md ${isArabic ? 'text-right' : ''}`}>
          <div className="text-6xl mb-4">🤖</div>
          <h3 className={`text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2 ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 'اختر وكيلاً للبدء' : 'Select an Agent to Start'}
          </h3>
          <p className={`text-gray-500 ${isArabic ? 'text-right leading-relaxed' : ''}`}>
            {isArabic 
              ? 'اختر وكيلاً من الشريط الجانبي الأيسر لعرض مساحة العمل المخصصة والتفاعل معه. كل وكيل لديه أدوات وإمكانيات متخصصة.'
              : 'Choose an agent from the left sidebar to view their specialized workspace and interact with them. Each agent has unique tools and capabilities.'
            }
          </p>
          
          {/* Quick Start Guide */}
          <div className={`mt-8 text-sm text-gray-600 ${isArabic ? 'text-right' : 'text-left'}`}>
            <h4 className="font-semibold mb-3">
              {isArabic ? 'الوكلاء المتاحون:' : 'Available Agents:'}
            </h4>
            <ul className="space-y-2">
              <li className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>🧠</span>
                <span>{isArabic ? 'مدير التسويق - الاستراتيجية والتنسيق' : 'Marketing Manager - Strategy & Coordination'}</span>
              </li>
              <li className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>📝</span>
                <span>{isArabic ? 'أخصائي المحتوى والسيو - إنشاء وتحسين المحتوى' : 'Content & SEO Specialist - Content Creation & Optimization'}</span>
              </li>
              <li className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>📱</span>
                <span>{isArabic ? 'منشئ المحتوى الاجتماعي - النشر والتفاعل' : 'Social Content Creator - Publishing & Engagement'}</span>
              </li>
              <li className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>👥</span>
                <span>{isArabic ? 'مدير التجربة الاجتماعية - المراقبة ودعم العملاء' : 'Social CX Manager - Monitoring & Customer Support'}</span>
              </li>
              <li className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span>📊</span>
                <span>{isArabic ? 'أخصائي الحملات والأداء - التحليلات والتحسين' : 'Campaign & Performance Specialist - Analytics & Optimization'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const renderWorkspace = () => {
    switch (selectedAgent.specialization) {
      case 'marketing-manager':
        return <MarketingManagerWorkspace agent={selectedAgent} isArabic={isArabic} />;
      case 'content-seo':
        return <ContentSEOWorkspace agent={selectedAgent} isArabic={isArabic} />;
      case 'social-creator':
        return <SocialCreatorWorkspace agent={selectedAgent} isArabic={isArabic} />;
      case 'social-cx':
        return <SocialCXWorkspace agent={selectedAgent} isArabic={isArabic} />;
      case 'campaign-performance':
        return <CampaignPerformanceWorkspace agent={selectedAgent} isArabic={isArabic} />;
      default:
        return <MarketingManagerWorkspace agent={selectedAgent} isArabic={isArabic} />;
    }
  };

  return (
    <div className="h-full" dir={isArabic ? 'rtl' : 'ltr'}>
      {renderWorkspace()}
    </div>
  );
};

export default AgentWorkspaceArea;
