
import React from 'react';

const PrivacyHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Privacy Policy
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default PrivacyHeader;
