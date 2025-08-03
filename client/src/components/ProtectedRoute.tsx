// src/components/ProtectedRoute.tsx
import type {ReactNode} from 'react'; 
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import {jwtDecode} from "jwt-decode";
interface JWTPayload { exp: number;  }

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {

  const { user,token,isLoading ,logout} = useAuth();
  const location = useLocation();

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user || !token) {
    // console.log('NO Token or user fonm Protedte Rot',user,token);
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location }} 
        replace 
      />
    );
  }

    // Check token expiration in an effect
  useEffect(() => {
    try {
      const { exp } = jwtDecode<JWTPayload>(token);
      if (Date.now() >= exp * 1000) {
        logout();
      }
    } catch {
      logout();
    }
    // Only run when token changes
  }, [token, logout]);


  // chk token is expirs or not
    try {
    const { exp } = jwtDecode<JWTPayload>(token);
    if (Date.now() >= exp * 1000) {
      // token is expired
      logout();
      return <Navigate to="/login" replace />;
    }
  } catch {
    // token is malformed or decode failed
    logout();
    return <Navigate to="/login" replace />;
  }


  return <>{children}</>;
}
