
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define user type
type User = {
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkUserLoggedIn = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // For demo purposes, we'll just check for a specific email/password
      // In a real app, this would be handled by a backend service
      if (email === "user@example.com" && password === "password") {
        const userData = { email, name: "Demo User" };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        navigate("/dashboard");
        return;
      }
      
      // If no match, throw an error
      throw new Error("Invalid email or password");
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function
  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // For demo purposes, we'll just store the user in localStorage
      // In a real app, this would be handled by a backend service
      const userData = { email, name };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate("/dashboard");
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
