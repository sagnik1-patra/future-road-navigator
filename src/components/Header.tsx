
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b bg-white shadow-sm py-4">
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-career-purple" />
          <h1 className="text-2xl font-bold">
            <span className="gradient-heading">Future</span> Roadmap
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
          <Button variant="default" className="bg-career-gradient">
            Get Started
          </Button>
        </nav>
        <Button variant="ghost" className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </Button>
      </div>
    </header>
  );
};

export default Header;
