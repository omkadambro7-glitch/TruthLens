import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, password: string, role?: string, orgSlug?: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  loading: true
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('truthlens_token');
    const savedUser = localStorage.getItem('truthlens_user');
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('truthlens_token');
        localStorage.removeItem('truthlens_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) return false;
      const data = await res.json();
      setToken(data.access_token);
      setUser(data.user);
      localStorage.setItem('truthlens_token', data.access_token);
      localStorage.setItem('truthlens_user', JSON.stringify(data.user));
      return true;
    } catch (e) {
      return false;
    }
  };

  const register = async (fullName: string, email: string, password: string, role: string = 'individual', orgSlug?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, password, role, org_slug: orgSlug })
      });
      if (!res.ok) return false;
      const data = await res.json();
      setToken(data.access_token);
      setUser(data.user);
      localStorage.setItem('truthlens_token', data.access_token);
      localStorage.setItem('truthlens_user', JSON.stringify(data.user));
      return true;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('truthlens_token');
    localStorage.removeItem('truthlens_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
