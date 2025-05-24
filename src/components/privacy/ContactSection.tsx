
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ContactSection: React.FC = () => {
  return (
    <Card className="bg-gray-50 dark:bg-gray-800/50">
      <CardContent className="pt-6">
        <div className="text-center">
          <h3 className="font-semibold mb-2">Contact Us About Privacy</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            For privacy-related questions or to exercise your rights, contact our Data Protection Officer:
          </p>
          <div className="space-y-1 text-sm">
            <p><strong>Company:</strong> Nexta Saudi Arabia</p>
            <p><strong>Email:</strong> info@nexta.sa</p>
            <p><strong>Address:</strong> Dammam Khobar, Saudi Arabia</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSection;
