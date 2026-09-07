// contexts/AuthContext.tsx
'use client'; // This context provider must be a client component

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getRole, UserRole } from '@/data/roles/role'; // Adjust import path if necessary

interface AuthContextType {
  role: UserRole | null;
  setAuthRole: (newRole: UserRole) => void;
  // Add a logout function if you want to manage it here
  logout: () => void;
}

// Create the context with an initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole | null>(null);

  // This useEffect runs only ONCE when the AuthProvider mounts for the first time
  // It initializes the role state from localStorage.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('role');
      let initialRole: UserRole;

      if (storedRole) {
        // Try to parse as a number first
        if (!isNaN(Number(storedRole))) {
          initialRole = getRole(parseInt(storedRole, 10));
        } else if ( // Check if it's a valid string role
          storedRole === 'student' ||
          storedRole === 'instructor' ||
          storedRole === 'admin' ||
          storedRole === 'superadmin' ||
          storedRole === 'guest'
        ) {
          initialRole = storedRole as UserRole;
        } else {
          initialRole = 'guest'; // Fallback for invalid string in localStorage
        }
      } else {
        initialRole = 'guest'; // Default if no role in localStorage
        localStorage.setItem('role', 'guest'); // Ensure 'guest' is always set initially
      }
      setRole(initialRole);
      console.log('AuthContext: Initial role set from localStorage:', initialRole);
    }
  }, []); // Empty dependency array, runs once on mount

  // Function to update role state and localStorage,
  // This will trigger re-renders in components consuming the context.
  const setAuthRole = (newRole: UserRole) => {
    setRole(newRole);
    if (typeof window !== 'undefined') {
      localStorage.setItem('role', newRole);
      console.log('AuthContext: Role updated to localStorage and state:', newRole);
    }
  };

  // Optional: Logout function
  const logout = () => {
    setAuthRole('guest'); // Set role to guest
    // You might also clear other user data from localStorage here
    // localStorage.removeItem('authToken');
    // localStorage.removeItem('userId');
    console.log('AuthContext: User logged out, role set to guest.');
  };

  return (
    <AuthContext.Provider value={{ role, setAuthRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};