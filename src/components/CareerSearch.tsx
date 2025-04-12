
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CareerSearchProps {
  onSearch: (career: string) => void;
  isLoading: boolean;
}

const CareerSearch = ({ onSearch, isLoading }: CareerSearchProps) => {
  const [career, setCareer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (career.trim()) {
      onSearch(career.trim());
    }
  };

  const popularCareers = [
    "Software Engineer", 
    "UX Designer", 
    "Data Scientist", 
    "Product Manager", 
    "Marketing Manager"
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
          Discover Your Career Path
        </h2>
        <p className="text-muted-foreground text-lg mb-6">
          Enter a career title to get a personalized roadmap to success
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative mb-8">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Enter a career (e.g., Software Engineer)"
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
          <Button 
            type="submit" 
            className="h-12 px-8 text-base bg-career-gradient"
            disabled={!career.trim() || isLoading}
          >
            {isLoading ? "Searching..." : "Generate Roadmap"}
          </Button>
        </div>
      </form>

      <Card className="bg-muted/50 border border-muted">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Popular career searches:</h3>
          <div className="flex flex-wrap gap-2">
            {popularCareers.map((career) => (
              <Button
                key={career}
                variant="outline"
                size="sm"
                onClick={() => {
                  setCareer(career);
                  onSearch(career);
                }}
                disabled={isLoading}
                className="bg-white hover:bg-muted transition-colors"
              >
                {career}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerSearch;
