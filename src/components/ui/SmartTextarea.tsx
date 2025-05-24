
import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Lightbulb, Loader2 } from 'lucide-react';
import { aiAgentService } from '@/services/aiAgentService';

interface SmartTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fieldType: string;
  context?: any;
  className?: string;
  disabled?: boolean;
  rows?: number;
}

const SmartTextarea: React.FC<SmartTextareaProps> = ({
  value,
  onChange,
  placeholder,
  fieldType,
  context = {},
  className,
  disabled,
  rows = 4
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const generateSuggestions = async () => {
    if (loading || !value.trim()) return;
    
    setLoading(true);
    try {
      const smartSuggestions = await aiAgentService.generateSmartSuggestion(
        fieldType,
        value,
        context
      );
      setSuggestions(smartSuggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !textareaRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${className} pr-12`}
          disabled={disabled}
          rows={rows}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={generateSuggestions}
          disabled={loading || disabled || !value.trim()}
          className="absolute top-2 right-2 h-8 w-8 p-0"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Lightbulb className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          <div className="p-2">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
              AI Suggestions:
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => applySuggestion(suggestion)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
              >
                <div className="line-clamp-3">{suggestion}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartTextarea;
