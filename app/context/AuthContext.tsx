import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../lib/supabase";

type User = {
  id: string;
  username: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // For demo purposes, we're setting a mock user
  useEffect(() => {
    // In a real app, we would check for an existing session
    // and fetch the user profile

    // Mock user for development
    setUser({
      id: "123",
      username: "demo_user",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
    });
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      // In a real app with Supabase Auth:
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });
      // if (error) throw error;

      // Mock successful login
      setUser({
        id: "123",
        username: email.split("@")[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      });
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      // In a real app with Supabase Auth:
      // const { data, error } = await supabase.auth.signUp({
      //   email,
      //   password,
      //   options: {
      //     data: { username }
      //   }
      // });
      // if (error) throw error;

      // Mock successful signup
      setUser({
        id: "123",
        username,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      });
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      // In a real app with Supabase Auth:
      // const { error } = await supabase.auth.signOut();
      // if (error) throw error;

      // Mock sign out
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
