
import {  createContext, useState ,useEffect } from 'react';
import type { ReactNode, FC } from 'react';
// Define the shape of your auth context value

export interface User {
  id: number;
  name: string;
  email: string;
  // Add other user properties as needed
}

export interface AuthContextType {
  // Add your auth state and methods here
  user: User | null;
  // Example: login, logout, etc.
  isLoading: boolean;
  login: (userData: User, token?: string) => void;
  logout?: () => void;
  updateUser: (userData: Partial<User>) => void;

}

// Create the context with a default value (undefined for safety)
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider props type
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // Example auth state (replace with real logic)
  const [user,setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on app load
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);


  const login = (userData: User, token?: string) => {
      try {
      // Update context state
      setUser(userData);
      
      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      if (token) {
        localStorage.setItem('token', token);
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle storage errors gracefully
    }
  };

    // Logout function
  const logout = () => {
    // Clear context state
    setUser(null);
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Optional: Call logout API
    // logoutAPI();
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Sync with localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Computed values
  // const isAuthenticated = !!user;

  const val: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    // login: async (email, password) => { ... },
    // logout: () => { ... },
  };

  return (
    <AuthContext.Provider value={val}>
      {children}
    </AuthContext.Provider>
  );
};



// Why Context State Instead of Direct localStorage Access?
// 1. Reactivity Issue

// localStorage is not reactive - React doesn't know when localStorage changes
// If you directly check localStorage in components, they won't re-render when auth state changes
// Example: User logs out in one tab, other tabs won't update automatically