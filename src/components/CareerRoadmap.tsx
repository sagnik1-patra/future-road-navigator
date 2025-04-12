
import { useState } from "react";
import { 
  BookOpen, 
  BriefcaseBusiness, 
  Award, 
  Brain, 
  LightbulbIcon, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CareerRoadmap as RoadmapType, CareerStep } from "@/lib/api";

interface CareerRoadmapProps {
  roadmap: RoadmapType;
}

const CareerRoadmap = ({ roadmap }: CareerRoadmapProps) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const toggleExpand = (stepId: number) => {
    if (expandedStep === stepId) {
      setExpandedStep(null);
    } else {
      setExpandedStep(stepId);
    }
  };

  const getStepIcon = (type: CareerStep['type']) => {
    switch (type) {
      case 'education':
        return <BookOpen className="h-6 w-6 text-blue-600" />;
      case 'experience':
        return <BriefcaseBusiness className="h-6 w-6 text-purple-600" />;
      case 'certification':
        return <Award className="h-6 w-6 text-yellow-600" />;
      case 'skill':
        return <Brain className="h-6 w-6 text-green-600" />;
      case 'tip':
        return <LightbulbIcon className="h-6 w-6 text-amber-600" />;
      default:
        return <BookOpen className="h-6 w-6 text-blue-600" />;
    }
  };

  const getStepTypeColor = (type: CareerStep['type']) => {
    switch (type) {
      case 'education':
        return 'bg-blue-100 text-blue-800';
      case 'experience':
        return 'bg-purple-100 text-purple-800';
      case 'certification':
        return 'bg-yellow-100 text-yellow-800';
      case 'skill':
        return 'bg-green-100 text-green-800';
      case 'tip':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 pb-12 animate-fade-in">
      <Card className="mb-8 border-career-purple border-2">
        <CardHeader className="bg-career-gradient text-white">
          <CardTitle className="text-2xl md:text-3xl">{roadmap.career}</CardTitle>
          <CardDescription className="text-white/90 text-base">
            {roadmap.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Average Salary</span>
              <span className="font-medium text-lg">{roadmap.averageSalary}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Job Outlook</span>
              <span className="font-medium text-lg">{roadmap.jobOutlook}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-6 text-center gradient-heading">Your Career Roadmap</h2>
      
      <div className="relative space-y-6">
        <div className="roadmap-connector"></div>
        
        {roadmap.steps.map((step, index) => (
          <div key={step.id} className="relative animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="career-card">
              <div className="flex items-start mb-2">
                <div className="mr-4 mt-1">
                  {getStepIcon(step.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    <Badge variant="outline" className={`ml-2 ${getStepTypeColor(step.type)}`}>
                      {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-muted-foreground">Duration: </span>
                    <span className="ml-1 font-medium">{step.duration}</span>
                  </div>
                  
                  {step.details && (
                    <div className="mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center text-sm p-0 h-auto"
                        onClick={() => toggleExpand(step.id)}
                      >
                        {expandedStep === step.id ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            <span>Hide details</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            <span>Show details</span>
                          </>
                        )}
                      </Button>
                      
                      {expandedStep === step.id && (
                        <ul className="mt-3 space-y-2 text-sm">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-career-purple mt-1.5 mr-2"></span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerRoadmap;
