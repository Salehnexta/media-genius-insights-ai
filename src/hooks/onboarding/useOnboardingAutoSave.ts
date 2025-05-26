
import { useEffect, useRef, useCallback } from 'react';
import { OnboardingData } from './types';

export const useOnboardingAutoSave = (
  data: OnboardingData | null,
  saveFunction: () => Promise<boolean>,
  saving: boolean
) => {
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  const lastSaveDataRef = useRef<string>('');

  // Memoized save function to prevent unnecessary re-renders
  const memoizedSaveData = useCallback(async () => {
    if (!isMountedRef.current) return false;
    
    try {
      return await saveFunction();
    } catch (error) {
      console.error('Save error:', error);
      return false;
    }
  }, [saveFunction]);

  // Improved auto-save with better debouncing and duplicate prevention
  useEffect(() => {
    // Clear existing timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = null;
    }

    // Only auto-save if we have meaningful data and component is mounted
    if (!data || !isMountedRef.current || saving) return;
    
    const hasData = data.skillLevel || data.businessName || data.website || 
                   (data.socialAccounts && Object.keys(data.socialAccounts).length > 0) ||
                   (data.competitors && data.competitors.length > 0) ||
                   (data.goals && data.goals.length > 0);

    if (!hasData) return;

    // Create a hash of the current data to prevent saving identical data
    const currentDataHash = JSON.stringify(data);
    
    // Don't save if data hasn't changed
    if (currentDataHash === lastSaveDataRef.current) {
      return;
    }

    // Increased debounce time to 5 seconds to reduce frequency
    const timer = setTimeout(async () => {
      if (!isMountedRef.current || saving) return;
      
      // Double-check data hasn't changed during the delay
      const latestDataHash = JSON.stringify(data);
      if (latestDataHash === lastSaveDataRef.current) {
        return;
      }
      
      console.log('Auto-saving onboarding data...');
      try {
        await memoizedSaveData();
        lastSaveDataRef.current = latestDataHash;
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, 5000); // Increased from 2000 to 5000ms

    autoSaveTimerRef.current = timer;

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [data, memoizedSaveData, saving]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
        autoSaveTimerRef.current = null;
      }
    };
  }, []);

  return {
    memoizedSaveData
  };
};
