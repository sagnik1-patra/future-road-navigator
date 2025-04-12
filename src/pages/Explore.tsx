
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseBusiness, Code, PieChart, PenTool, TrendingUp, Users, Zap, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CareerCategory {
  name: string;
  icon: React.ReactNode;
  careers: string[];
  description: string;
}

const Explore = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<CareerCategory | null>(null);

  const careerCategories: CareerCategory[] = [
    {
      name: "Technology",
      icon: <Code className="h-6 w-6" />,
      careers: ["Software Engineer", "Data Scientist", "Cloud Architect", "Cybersecurity Analyst", "Machine Learning Engineer"],
      description: "Careers in technology focus on developing, maintaining, and improving technological systems and software."
    },
    {
      name: "Design",
      icon: <PenTool className="h-6 w-6" />,
      careers: ["UX Designer", "Graphic Designer", "Product Designer", "UI Designer", "Industrial Designer"],
      description: "Design careers involve creating visual assets, user interfaces, and product experiences that are both functional and aesthetically pleasing."
    },
    {
      name: "Business",
      icon: <BriefcaseBusiness className="h-6 w-6" />,
      careers: ["Product Manager", "Business Analyst", "Project Manager", "Management Consultant", "Operations Manager"],
      description: "Business roles focus on strategy, management, and operations to help organizations achieve their goals effectively."
    },
    {
      name: "Data",
      icon: <PieChart className="h-6 w-6" />,
      careers: ["Data Analyst", "Business Intelligence Analyst", "Database Administrator", "Data Engineer", "Quantitative Analyst"],
      description: "Data professionals work with information to extract insights, build infrastructure, and inform decision-making."
    },
    {
      name: "Marketing",
      icon: <TrendingUp className="h-6 w-6" />,
      careers: ["Digital Marketing Manager", "SEO Specialist", "Content Strategist", "Marketing Analyst", "Brand Manager"],
      description: "Marketing roles focus on promoting products or services and building brand awareness through various channels."
    },
    {
      name: "People",
      icon: <Users className="h-6 w-6" />,
      careers: ["Human Resources Manager", "Talent Acquisition Specialist", "Learning & Development Manager", "People Operations", "Diversity & Inclusion Specialist"],
      description: "People-focused careers involve recruiting, developing, and supporting employees within organizations."
    },
    {
      name: "Creative",
      icon: <Lightbulb className="h-6 w-6" />,
      careers: ["Content Creator", "Copywriter", "Video Producer", "Creative Director", "Art Director"],
      description: "Creative careers involve producing original content, designs, and campaigns across various media."
    },
    {
      name: "Entrepreneurship",
      icon: <Zap className="h-6 w-6" />,
      careers: ["Founder", "Startup CEO", "Small Business Owner", "Product Entrepreneur", "Social Entrepreneur"],
      description: "Entrepreneurial paths involve starting and growing businesses, developing products, and bringing innovative ideas to market."
    }
  ];

  const handleCategorySelect = (category: CareerCategory) => {
    setSelectedCategory(category);
  };

  const handleCareerSelect = (career: string) => {
    // We'll simulate a search for this career by navigating to home with query params
    navigate(`/?career=${encodeURIComponent(career)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">
              Explore Career Paths
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Browse through different career categories to find the perfect path for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {careerCategories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory?.name === category.name ? "default" : "outline"}
                className={`h-auto py-6 flex flex-col items-center justify-center gap-2 ${
                  selectedCategory?.name === category.name ? "bg-career-gradient text-white" : "hover:bg-muted/50"
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                <div className={`p-2 rounded-full ${
                  selectedCategory?.name === category.name 
                    ? "bg-white/20" 
                    : "bg-muted"
                }`}>
                  {category.icon}
                </div>
                <span className="text-lg font-medium">{category.name}</span>
              </Button>
            ))}
          </div>

          {selectedCategory && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-career-purple/10">
                    {selectedCategory.icon}
                  </div>
                  {selectedCategory.name} Careers
                </CardTitle>
                <CardDescription>
                  {selectedCategory.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedCategory.careers.map((career) => (
                    <Button
                      key={career}
                      variant="outline"
                      className="justify-start h-auto py-3 px-4 bg-white hover:bg-muted/50"
                      onClick={() => handleCareerSelect(career)}
                    >
                      <BriefcaseBusiness className="h-4 w-4 mr-2 text-career-purple" />
                      {career}
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  Click on a career to see a detailed roadmap
                </p>
              </CardFooter>
            </Card>
          )}

          {!selectedCategory && (
            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Select a category above to explore specific careers
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
