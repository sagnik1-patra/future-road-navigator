
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CareerSearch from "@/components/CareerSearch";
import CareerRoadmap from "@/components/CareerRoadmap";
import { fetchCareerRoadmap, CareerRoadmap as RoadmapType } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapType | null>(null);
  const { toast } = useToast();

  const handleSearch = async (career: string) => {
    if (!career.trim()) return;
    
    setIsLoading(true);
    try {
      const data = await fetchCareerRoadmap(career);
      if (data) {
        setRoadmap(data);
        toast({
          title: "Roadmap Generated",
          description: `Career roadmap for ${data.career} is ready!`,
        });
      }
    } catch (error) {
      console.error("Error searching for career:", error);
      toast({
        title: "Error",
        description: "Failed to generate roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <CareerSearch onSearch={handleSearch} isLoading={isLoading} />
          
          {isLoading && (
            <div className="w-full max-w-4xl mx-auto mt-12 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-career-purple border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
              <p className="mt-2 text-muted-foreground">
                Generating your personalized career roadmap...
              </p>
            </div>
          )}
          
          {!isLoading && roadmap && <CareerRoadmap roadmap={roadmap} />}
          
          {!isLoading && !roadmap && (
            <div className="w-full max-w-4xl mx-auto mt-12 text-center space-y-4">
              <h3 className="text-xl font-medium">Ready to plan your career journey?</h3>
              <p className="text-muted-foreground">
                Enter a career title above to see a detailed roadmap tailored just for you.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
