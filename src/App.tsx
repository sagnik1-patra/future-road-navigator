
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

// This component handles redirecting from query params to search results
const RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const career = searchParams.get("career");
    
    if (career && location.pathname === "/") {
      // The career parameter exists, but we'll let the Index component handle it
      // We just need to make sure we're on the home page
      if (location.pathname !== "/") {
        navigate("/");
      }
    }
  }, [location, navigate]);

  return null;
};

const AppWithAuth = () => (
  <BrowserRouter>
    <AuthProvider>
      <RedirectHandler />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppWithAuth />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
