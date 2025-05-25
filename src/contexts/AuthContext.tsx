
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, options?: { full_name?: string }) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST - critical for preventing deadlocks
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);
        
        // Only synchronous operations here to prevent deadlocks
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // If we need to fetch additional data after auth state change,
        // defer it with setTimeout to prevent callback deadlocks
        if (session?.user && event === 'SIGNED_IN') {
          setTimeout(() => {
            console.log('User signed in:', session.user.id);
            // Any additional async operations can go here
          }, 0);
        }
        
        if (event === 'SIGNED_OUT') {
          setTimeout(() => {
            console.log('User signed out');
            // Any cleanup operations can go here
          }, 0);
        }
      }
    );

    // Get initial session AFTER setting up the listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('Attempting sign in for:', email);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('Sign in error:', error);
    } else {
      console.log('Sign in successful');
    }
    
    return { error };
  };

  const signUp = async (email: string, password: string, options?: { full_name?: string }) => {
    console.log('Attempting sign up for:', email);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: options
      }
    });
    
    if (error) {
      console.error('Sign up error:', error);
    } else {
      console.log('Sign up successful');
    }
    
    return { error };
  };

  const signOut = async () => {
    console.log('Attempting sign out');
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error:', error);
    } else {
      console.log('Sign out successful');
    }
    
    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
