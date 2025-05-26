
import { useState, useCallback } from 'react';

interface LoadingState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface UseLoadingStateReturn extends LoadingState {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: boolean) => void;
  reset: () => void;
  executeAsync: <T>(asyncFn: () => Promise<T>) => Promise<T | null>;
}

export const useLoadingState = (initialState?: Partial<LoadingState>): UseLoadingStateReturn => {
  const [state, setState] = useState<LoadingState>({
    loading: false,
    error: null,
    success: false,
    ...initialState
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading, error: null }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error, loading: false, success: false }));
  }, []);

  const setSuccess = useCallback((success: boolean) => {
    setState(prev => ({ ...prev, success, loading: false, error: null }));
  }, []);

  const reset = useCallback(() => {
    setState({ loading: false, error: null, success: false });
  }, []);

  const executeAsync = useCallback(async <T,>(asyncFn: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      const result = await asyncFn();
      setSuccess(true);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    }
  }, [setLoading, setSuccess, setError]);

  return {
    ...state,
    setLoading,
    setError,
    setSuccess,
    reset,
    executeAsync
  };
};
