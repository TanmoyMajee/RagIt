
import { createContext, useState, useEffect , useContext } from 'react';
import type { ReactNode, FC } from 'react';
import axios from 'axios';
// Define the shape of your auth context value

export interface User {
  id: number;
  name: string;
  email: string;
  plan:string
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
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

  
    // Fetch user info from backend
  const fetchUser = async (jwtToken: string) => {
    try {
      const backendURL = import.meta.env.VITE_BACKEND_URL || "";
      const res = await axios.get(`${backendURL}/auth/profile`, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });
      console.log(res);
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
    }
  };

   // On app load, check for token and fetch user info
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async( token: string) : Promise<void> => {
    try {
      setToken(token);
      // Persist to localStorage
      localStorage.setItem('token', token);
      await fetchUser(token);
      // console.log("Log in Login :",user,token);

    } catch (error) {
      console.error('Error during login:', error);
      // Handle storage errors gracefully
    }
  };

  // Logout function
  const logout = ()=> { 
    // Clear context state
     const confirmLogout = window.confirm("Are you sure you want to logout?");
     if(confirmLogout){
    setUser(null);
    setToken(null);
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
     }

    // Optional: Call logout API
    // logoutAPI();
  };



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


// // Initialize auth state from localStorage on app load
  // useEffect(() => {
  //   const initializeAuth = () => {
  //     try {
  //       const storedUser = localStorage.getItem('user');
  //       const storedToken = localStorage.getItem('token');

  //       if (storedUser && storedToken) {
  //         const userData = JSON.parse(storedUser);
  //         setUser(userData);
  //         setToken(storedToken);
  //       }
  //     } catch (error) {
  //       console.error('Error initializing auth:', error);
  //       // Clear potentially corrupted data
  //       localStorage.removeItem('user');
  //       localStorage.removeItem('token');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   initializeAuth();
  // }, []);