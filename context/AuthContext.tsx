/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState } from '../types/user';

interface AuthContextType extends AuthState {
  login: (username: string, email: string) => Promise<boolean>;
  logout: () => void;
  loginAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('techstore_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Failed to restore auth state:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (username: string, email: string): Promise<boolean> => {
    setIsLoading(true);
    // Simple verification (client-side mock authentication)
    if (!username || !email) {
      setIsLoading(false);
      return false;
    }

    try {
      const newUser: User = { username, email };
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('techstore_user', JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    } catch (e) {
      console.error('Error during login:', e);
      setIsLoading(false);
      return false;
    }
  };

  const loginAsGuest = () => {
    const guestUser: User = { username: 'Guest User', email: 'guest@techstore.com' };
    setUser(guestUser);
    setIsAuthenticated(true);
    localStorage.setItem('techstore_user', JSON.stringify(guestUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('techstore_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        loginAsGuest,
      }}
    >
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
