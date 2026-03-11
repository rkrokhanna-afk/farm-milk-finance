import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from './mock-data';

interface AppContextType {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  language: 'en' | 'hi';
  setLanguage: (l: 'en' | 'hi') => void;
  currentFarmerId: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  return (
    <AppContext.Provider value={{ role, setRole, isLoggedIn, setIsLoggedIn, language, setLanguage, currentFarmerId: 'f1' }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
