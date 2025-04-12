
import { GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <GraduationCap className="h-6 w-6 text-career-purple mr-2" />
            <span className="text-lg font-semibold">Future Roadmap</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Future Roadmap. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
