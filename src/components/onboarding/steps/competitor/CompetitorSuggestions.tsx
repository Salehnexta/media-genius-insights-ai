
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface CompetitorSuggestionsProps {
  industry: string;
  competitors: string[];
  onAddCompetitor: (competitor: string) => void;
  isArabic: boolean;
}

const CompetitorSuggestions: React.FC<CompetitorSuggestionsProps> = ({
  industry,
  competitors,
  onAddCompetitor,
  isArabic
}) => {
  const suggestedCompetitors = {
    technology: ['Microsoft', 'Google', 'Amazon', 'Apple', 'Meta'],
    retail: ['Amazon', 'Walmart', 'Target', 'Best Buy', 'Costco'],
    food: ['McDonald\'s', 'Starbucks', 'Subway', 'KFC', 'Pizza Hut'],
    healthcare: ['Johnson & Johnson', 'Pfizer', 'UnitedHealth', 'CVS Health', 'Anthem'],
    finance: ['JPMorgan Chase', 'Bank of America', 'Wells Fargo', 'Citigroup', 'Goldman Sachs'],
    education: ['Coursera', 'Udemy', 'Khan Academy', 'edX', 'Skillshare'],
    travel: ['Booking.com', 'Expedia', 'Airbnb', 'TripAdvisor', 'Kayak'],
    'real-estate': ['Zillow', 'Realtor.com', 'Redfin', 'Compass', 'Century 21'],
    consulting: ['McKinsey', 'BCG', 'Bain', 'Deloitte', 'PwC'],
    other: ['Company A', 'Company B', 'Company C', 'Company D', 'Company E']
  };

  const suggestions = industry ? 
    suggestedCompetitors[industry as keyof typeof suggestedCompetitors] || suggestedCompetitors.other :
    [];

  if (!suggestions.length || competitors.length >= 3) {
    return null;
  }

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Popular {industry} competitors:
      </Label>
      <div className={`flex flex-wrap gap-2 ${isArabic ? 'justify-end' : ''}`}>
        {suggestions.slice(0, 5).map((suggestion) => (
          <Button
            key={suggestion}
            variant="outline"
            size="sm"
            onClick={() => onAddCompetitor(suggestion)}
            disabled={competitors.includes(suggestion)}
            className="text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CompetitorSuggestions;
