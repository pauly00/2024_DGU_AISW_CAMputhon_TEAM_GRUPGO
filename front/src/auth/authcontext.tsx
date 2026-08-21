import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user';

interface AuthContextProps {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const STORAGE_KEY = 'grupgo_user';

// 저장소에서 사용자 복원
const loadStoredUser = (): User | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(loadStoredUser);

  // 새로고침 대비 저장소 동기화
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem('username', user.username);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('username');
    }
  }, [user]);

  const login = (nextUser: User) => setUser(nextUser);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn: user !== null, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
