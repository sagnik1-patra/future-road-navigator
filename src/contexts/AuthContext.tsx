
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

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
      // For demo purposes, first check for the demo account
      if (email === "user@example.com" && password === "password") {
        const userData = { email, name: "Demo User" };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        navigate("/dashboard");
        return;
      }
      
      // Check if this user has previously signed up
      const usersDataString = localStorage.getItem("users");
      if (usersDataString) {
        const users = JSON.parse(usersDataString);
        const foundUser = users.find((u: any) => u.email === email && u.password === password);
        
        if (foundUser) {
          const userData = { email, name: foundUser.name };
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
          toast({
            title: "Welcome back!",
            description: "You've successfully signed in.",
          });
          navigate("/dashboard");
          return;
        }
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
      // Store user in users array in localStorage
      const usersDataString = localStorage.getItem("users");
      const users = usersDataString ? JSON.parse(usersDataString) : [];
      
      // Check if user already exists
      if (users.some((user: any) => user.email === email)) {
        throw new Error("User with this email already exists");
      }
      
      // Add new user to users array
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      
      // Set current user and navigate
      const userData = { email, name };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      
      toast({
        title: "Account created!",
        description: "Your account has been successfully created.",
      });
      
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
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
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
