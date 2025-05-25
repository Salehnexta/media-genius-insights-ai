
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wwbmwozanhxjwfdxezmz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3Ym13b3phbmh4andmZHhlem16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMyNDYsImV4cCI6MjA2MzE1OTI0Nn0.XhMBJRsqIEeGMJH8c7M_D654cK7e1xvGIPRuMuJq_t4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
