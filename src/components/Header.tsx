
import { useState } from "react";
import { GraduationCap, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <header className="border-b bg-white shadow-sm py-4">
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-career-purple" />
          <h1 className="text-2xl font-bold">
            <Link to="/">
              <span className="gradient-heading">Future</span> Roadmap
            </Link>
          </h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-career-purple transition-colors">
            Home
          </Link>
          <Link to="/explore" className="text-gray-700 hover:text-career-purple transition-colors">
            Explore Careers
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-career-purple transition-colors">
            About
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-career-purple transition-colors">
                Dashboard
              </Link>
              <Button 
                variant="outline" 
                onClick={signOut}
                className="text-gray-700 hover:text-career-purple transition-colors"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin" className="text-gray-700 hover:text-career-purple transition-colors">
                Sign In
              </Link>
              <Link to="/signup">
                <Button variant="default" className="bg-career-gradient">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-4">
              <SheetTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-career-purple" />
                <span>Future Roadmap</span>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-career-purple transition-colors">
                Home
              </Link>
              <Link to="/explore" className="text-gray-700 hover:text-career-purple transition-colors">
                Explore Careers
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-career-purple transition-colors">
                About
              </Link>
              
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-career-purple transition-colors">
                    Dashboard
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={signOut}
                    className="text-gray-700 hover:text-career-purple transition-colors"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="text-gray-700 hover:text-career-purple transition-colors">
                    Sign In
                  </Link>
                  <Link to="/signup">
                    <Button variant="default" className="w-full bg-career-gradient">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
