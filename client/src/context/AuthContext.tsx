
import {  createContext } from 'react';
import type { ReactNode, FC } from 'react';

// Define the shape of your auth context value
export interface AuthContextType {
  // Add your auth state and methods here
  user?: {
    id: number;
    name: string;
    email: string;
  } | null;
  // Example: login, logout, etc.
  login?: (email: string, password: string) => Promise<void>;
  logout?: () => void;
}

// Create the context with a default value (undefined for safety)
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider props type
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // Example auth state (replace with real logic)
  const val: AuthContextType = {
    user: null,
    // login: async (email, password) => { ... },
    // logout: () => { ... },
  };

  return (
    <AuthContext.Provider value={val}>
      {children}
    </AuthContext.Provider>
  );
};