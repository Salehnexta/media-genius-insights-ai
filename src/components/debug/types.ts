
export type TestStatus = 'success' | 'error' | 'warning';

export interface TestResult {
  name: string;
  status: TestStatus;
  message: string;
  details?: any;
}
