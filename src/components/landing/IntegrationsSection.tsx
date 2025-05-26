
import React from 'react';

interface IntegrationsSectionProps {
  isArabic?: boolean;
}

const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({ isArabic = false }) => {
  const integrations = [
    { name: 'Google Analytics', logo: '📊' },
    { name: 'Facebook Ads', logo: '📘' },
    { name: 'Instagram', logo: '📷' },
    { name: 'LinkedIn', logo: '💼' },
    { name: 'Twitter', logo: '🐦' },
    { name: 'Shopify', logo: '🛍️' },
    { name: 'WordPress', logo: '📝' },
    { name: 'Mailchimp', logo: '📧' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'متكامل مع أدواتك المفضلة' : 'Integrates with Your Favorite Tools'}
          </h2>
          <p className={`text-gray-600 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic 
              ? 'اربط حساباتك وأدواتك الحالية بسهولة'
              : 'Seamlessly connect your existing accounts and tools'
            }
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
          {integrations.map((integration, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-3xl mb-2">{integration.logo}</div>
              <span className="text-sm text-gray-600 text-center">
                {integration.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
