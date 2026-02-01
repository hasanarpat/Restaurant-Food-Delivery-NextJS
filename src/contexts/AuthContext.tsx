'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import apiClient from '@/lib/axios';

interface User {
  _id: string;
  email: string;
  role: string;
  profile: {
    fullName: string;
    avatar?: string;
  };
  phone?: string;
  addresses?: {
    _id: string;
    title: string;
    line1: string;
    city: string;
    zip: string;
  }[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to check if token exists in cookies
  const hasToken = () => {
    if (typeof document === 'undefined') return false;
    return document.cookie
      .split(';')
      .some((item) => item.trim().startsWith('token='));
  };

  const fetchUser = async () => {
    try {
      // Only fetch if token exists
      if (!hasToken()) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const response = await apiClient.get('/auth/me');
      setUser(response.data.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const refetch = async () => {
    setIsLoading(true);
    await fetchUser();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
