
import { createContext, useState, useEffect , useContext } from 'react';
import type { ReactNode, FC } from 'react';
// Define the shape of your auth context value

export interface User {
  id: number;
  name: string;
  email: string;

}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (userData: User, token: string) => void;
  logout?: () => void;
  //   updateUser: (userData: Partial<User>) => void;
  //   updateToken: (newToken: string) => void;
}

// Create the context with a default value (undefined for safety)
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Provider props type
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // Example auth state (replace with real logic)
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // Initialize auth state from localStorage on app load
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setToken(storedToken);
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


  const login = (userData: User, token: string) => {
    try {
      // Update context state
      setUser(userData);
      setToken(token);
      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      // console.log("Log in Login :",user,token);

    } catch (error) {
      console.error('Error during login:', error);
      // Handle storage errors gracefully
    }
  };

  // Logout function
  const logout = () => {
    // Clear context state
    setUser(null);
    setToken(null);
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Optional: Call logout API
    // logoutAPI();
  };

  // const updateUser = (userData: Partial<User>) => {
  //   if (user) {
  //     const updatedUser = { ...user, ...userData };
  //     setUser(updatedUser);

  //     // Sync with localStorage
  //     localStorage.setItem('user', JSON.stringify(updatedUser));
  //   }
  // };

  //  // Update token function (for token refresh scenarios)
  // const updateToken = (newToken: string) => {
  //   try {
  //     setToken(newToken);
  //     localStorage.setItem('token', newToken);
  //   } catch (error) {
  //     console.error('Error updating token:', error);
  //   }
  // };

  // Computed values
  // const isAuthenticated = !!user;

  const val: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    token
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