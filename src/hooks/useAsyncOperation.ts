
import { useState, useCallback } from 'react';

interface AsyncOperationState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface UseAsyncOperationReturn<T> extends AsyncOperationState<T> {
  execute: (operation: () => Promise<T>) => Promise<T | null>;
  reset: () => void;
  setData: (data: T | null) => void;
}

export const useAsyncOperation = <T = any>(initialData: T | null = null): UseAsyncOperationReturn<T> => {
  const [state, setState] = useState<AsyncOperationState<T>>({
    data: initialData,
    loading: false,
    error: null,
    success: false
  });

  const execute = useCallback(async (operation: () => Promise<T>): Promise<T | null> => {
    setState(prev => ({ 
      ...prev, 
      loading: true, 
      error: null, 
      success: false 
    }));

    try {
      const result = await operation();
      setState(prev => ({ 
        ...prev, 
        data: result, 
        loading: false, 
        success: true 
      }));
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: errorMessage, 
        success: false 
      }));
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: initialData,
      loading: false,
      error: null,
      success: false
    });
  }, [initialData]);

  const setData = useCallback((data: T | null) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    setData
  };
};
