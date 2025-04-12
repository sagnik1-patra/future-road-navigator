
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserType = {
  name: string;
  email: string;
};

type Question = {
  id: string;
  question: string;
  type: "text" | "textarea" | "select";
  options?: string[];
};

type CareerSuggestion = {
  title: string;
  description: string;
  match: number;
  skills: string[];
  education: string[];
};

const CareerGuidance = ({ user }: { user: UserType }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isAssessing, setIsAssessing] = useState(false);
  const [suggestions, setSuggestions] = useState<CareerSuggestion[] | null>(null);
  const { toast } = useToast();

  const questions: Question[] = [
    {
      id: "strongest_subject",
      question: "What is your strongest subject in school or college?",
      type: "text",
    },
    {
      id: "free_time",
      question: "What do you enjoy doing in your free time?",
      type: "textarea",
    },
    {
      id: "programming",
      question: "Do you know any programming or coding languages? If yes, which ones?",
      type: "textarea",
    },
    {
      id: "work_preference",
      question: "Do you prefer working alone or in a team?",
      type: "select",
      options: ["Alone", "In a team", "Both equally"],
    },
    {
      id: "values",
      question: "What values are most important to you in a career? (e.g., creativity, helping others, financial security)",
      type: "textarea",
    },
  ];

  const handleNextQuestion = () => {
    if (!currentAnswer.trim()) {
      toast({
        title: "Input required",
        description: "Please provide an answer before continuing.",
        variant: "destructive",
      });
      return;
    }

    // Save the current answer
    const updatedAnswers = {
      ...answers,
      [questions[currentQuestionIndex].id]: currentAnswer,
    };
    setAnswers(updatedAnswers);
    setCurrentAnswer("");

    // Move to the next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered, generate suggestions
      generateSuggestions(updatedAnswers);
    }
  };

  const generateSuggestions = async (answerData: Record<string, string>) => {
    setIsAssessing(true);
    
    try {
      // In a real application, this would be an API call to a backend service
      // For now, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI-generated career suggestions based on answers
      const mockSuggestions: CareerSuggestion[] = [
        {
          title: "Software Developer",
          description: "Design, build, and maintain software applications and systems",
          match: 95,
          skills: ["Problem-solving", "Logical thinking", "Coding", "Collaboration"],
          education: ["Computer Science degree", "Coding bootcamp", "Self-learning + portfolio"],
        },
        {
          title: "UX/UI Designer",
          description: "Create user-friendly interfaces and enhance user experiences for digital products",
          match: 88,
          skills: ["Visual design", "User empathy", "Prototyping", "Research"],
          education: ["Design degree", "UX certification", "UI/UX bootcamp"],
        },
        {
          title: "Data Scientist",
          description: "Analyze complex data to help organizations make better decisions",
          match: 82,
          skills: ["Statistical analysis", "Programming", "Data visualization", "Machine learning"],
          education: ["Statistics/Math degree", "Data Science bootcamp", "Online specialization"],
        },
      ];
      
      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error("Error generating suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to generate career suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAssessing(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCurrentAnswer("");
    setSuggestions(null);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Personalized Career Guidance</h2>
        <p className="text-muted-foreground">
          Answer a few questions to get AI-powered career suggestions tailored to your interests and skills
        </p>
      </div>

      {!suggestions ? (
        <Card className="border-career-purple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-career-purple text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">
                {currentQuestionIndex + 1}
              </span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </CardTitle>
            <CardDescription>
              Help us understand your interests and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
            
            {currentQuestion.type === "text" && (
              <Input
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here..."
              />
            )}
            
            {currentQuestion.type === "textarea" && (
              <Textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows={4}
              />
            )}
            
            {currentQuestion.type === "select" && currentQuestion.options && (
              <div className="space-y-2">
                {currentQuestion.options.map((option) => (
                  <div
                    key={option}
                    className={`p-3 border rounded-md cursor-pointer hover:bg-muted transition-colors ${
                      currentAnswer === option ? "border-career-purple bg-career-purple/5" : ""
                    }`}
                    onClick={() => setCurrentAnswer(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-end mt-4">
              <Button 
                onClick={handleNextQuestion}
                className="bg-career-gradient"
              >
                {currentQuestionIndex < questions.length - 1 ? (
                  <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
                ) : (
                  <>Get Suggestions <Sparkles className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : isAssessing ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-career-purple border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p className="mt-4 text-center text-muted-foreground">
              Analyzing your responses and generating personalized career suggestions...
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Your Career Suggestions</h3>
            <Button variant="outline" onClick={handleRestart}>
              Start Over
            </Button>
          </div>
          
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="bg-gradient-to-r from-career-purple to-career-blue h-1" />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{suggestion.title}</CardTitle>
                      <CardDescription>{suggestion.description}</CardDescription>
                    </div>
                    <div className="bg-career-gradient text-white px-2 py-1 rounded-md text-sm font-medium">
                      {suggestion.match}% Match
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Key Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {suggestion.skills.map((skill, i) => (
                          <span key={i} className="bg-muted px-2 py-1 rounded-md text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Education Pathways</h4>
                      <ul className="space-y-1">
                        {suggestion.education.map((edu, i) => (
                          <li key={i} className="flex items-center gap-1 text-sm">
                            <ChevronRight className="h-4 w-4 text-career-purple" />
                            {edu}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button className="w-full mt-4 bg-career-gradient">
                      View Career Roadmap
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerGuidance;
