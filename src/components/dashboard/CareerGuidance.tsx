
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
      
      // Generate dynamic career suggestions based on answers
      const generatedSuggestions = generateDynamicSuggestions(answerData);
      
      setSuggestions(generatedSuggestions);
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

  // Generate dynamic career suggestions based on user answers
  const generateDynamicSuggestions = (answerData: Record<string, string>): CareerSuggestion[] => {
    const suggestions: CareerSuggestion[] = [];
    
    // Extract key information from answers
    const subject = answerData.strongest_subject.toLowerCase();
    const hobbies = answerData.free_time.toLowerCase();
    const programmingSkills = answerData.programming.toLowerCase();
    const workStyle = answerData.work_preference;
    const values = answerData.values.toLowerCase();
    
    // Track potential career areas based on answers
    const careerAreas = new Map<string, number>();
    
    // Process strongest subject
    if (subject.includes("math") || subject.includes("mathematics") || subject.includes("calculus") || subject.includes("statistics")) {
      careerAreas.set("Data Science", (careerAreas.get("Data Science") || 0) + 30);
      careerAreas.set("Financial Analyst", (careerAreas.get("Financial Analyst") || 0) + 25);
      careerAreas.set("Actuary", (careerAreas.get("Actuary") || 0) + 30);
      careerAreas.set("Software Engineering", (careerAreas.get("Software Engineering") || 0) + 15);
    }
    
    if (subject.includes("physics") || subject.includes("engineering")) {
      careerAreas.set("Mechanical Engineer", (careerAreas.get("Mechanical Engineer") || 0) + 30);
      careerAreas.set("Electrical Engineer", (careerAreas.get("Electrical Engineer") || 0) + 30);
      careerAreas.set("Software Engineering", (careerAreas.get("Software Engineering") || 0) + 15);
    }
    
    if (subject.includes("computer") || subject.includes("tech") || subject.includes("information technology")) {
      careerAreas.set("Software Engineering", (careerAreas.get("Software Engineering") || 0) + 35);
      careerAreas.set("Cybersecurity Analyst", (careerAreas.get("Cybersecurity Analyst") || 0) + 30);
      careerAreas.set("IT Project Manager", (careerAreas.get("IT Project Manager") || 0) + 25);
    }
    
    if (subject.includes("biology") || subject.includes("chemistry") || subject.includes("science")) {
      careerAreas.set("Medical Doctor", (careerAreas.get("Medical Doctor") || 0) + 30);
      careerAreas.set("Research Scientist", (careerAreas.get("Research Scientist") || 0) + 35);
      careerAreas.set("Pharmacologist", (careerAreas.get("Pharmacologist") || 0) + 25);
    }
    
    if (subject.includes("art") || subject.includes("design") || subject.includes("creative")) {
      careerAreas.set("UX/UI Designer", (careerAreas.get("UX/UI Designer") || 0) + 35);
      careerAreas.set("Graphic Designer", (careerAreas.get("Graphic Designer") || 0) + 35);
      careerAreas.set("Marketing Specialist", (careerAreas.get("Marketing Specialist") || 0) + 20);
    }
    
    if (subject.includes("english") || subject.includes("writing") || subject.includes("literature") || subject.includes("communication")) {
      careerAreas.set("Content Writer", (careerAreas.get("Content Writer") || 0) + 35);
      careerAreas.set("Marketing Specialist", (careerAreas.get("Marketing Specialist") || 0) + 25);
      careerAreas.set("Public Relations", (careerAreas.get("Public Relations") || 0) + 30);
    }
    
    if (subject.includes("psychology") || subject.includes("sociology")) {
      careerAreas.set("Psychologist", (careerAreas.get("Psychologist") || 0) + 35);
      careerAreas.set("Human Resources", (careerAreas.get("Human Resources") || 0) + 30);
      careerAreas.set("Social Worker", (careerAreas.get("Social Worker") || 0) + 30);
    }
    
    if (subject.includes("business") || subject.includes("economics") || subject.includes("finance")) {
      careerAreas.set("Financial Analyst", (careerAreas.get("Financial Analyst") || 0) + 35);
      careerAreas.set("Business Analyst", (careerAreas.get("Business Analyst") || 0) + 35);
      careerAreas.set("Management Consultant", (careerAreas.get("Management Consultant") || 0) + 30);
    }
    
    // Process free time activities/hobbies
    if (hobbies.includes("coding") || hobbies.includes("programming") || hobbies.includes("tech") || hobbies.includes("computer")) {
      careerAreas.set("Software Engineering", (careerAreas.get("Software Engineering") || 0) + 20);
      careerAreas.set("Data Science", (careerAreas.get("Data Science") || 0) + 15);
    }
    
    if (hobbies.includes("art") || hobbies.includes("drawing") || hobbies.includes("painting") || hobbies.includes("design")) {
      careerAreas.set("Graphic Designer", (careerAreas.get("Graphic Designer") || 0) + 20);
      careerAreas.set("UX/UI Designer", (careerAreas.get("UX/UI Designer") || 0) + 20);
      careerAreas.set("Architect", (careerAreas.get("Architect") || 0) + 15);
    }
    
    if (hobbies.includes("writing") || hobbies.includes("blogging") || hobbies.includes("journaling")) {
      careerAreas.set("Content Writer", (careerAreas.get("Content Writer") || 0) + 20);
      careerAreas.set("Journalist", (careerAreas.get("Journalist") || 0) + 20);
      careerAreas.set("Marketing Specialist", (careerAreas.get("Marketing Specialist") || 0) + 15);
    }
    
    if (hobbies.includes("gaming") || hobbies.includes("game")) {
      careerAreas.set("Game Developer", (careerAreas.get("Game Developer") || 0) + 20);
      careerAreas.set("UX/UI Designer", (careerAreas.get("UX/UI Designer") || 0) + 10);
    }
    
    if (hobbies.includes("analyzing") || hobbies.includes("research") || hobbies.includes("reading")) {
      careerAreas.set("Data Science", (careerAreas.get("Data Science") || 0) + 15);
      careerAreas.set("Research Scientist", (careerAreas.get("Research Scientist") || 0) + 15);
      careerAreas.set("Business Analyst", (careerAreas.get("Business Analyst") || 0) + 15);
    }
    
    if (hobbies.includes("people") || hobbies.includes("volunteering") || hobbies.includes("helping")) {
      careerAreas.set("Social Worker", (careerAreas.get("Social Worker") || 0) + 20);
      careerAreas.set("Human Resources", (careerAreas.get("Human Resources") || 0) + 15);
      careerAreas.set("Teacher", (careerAreas.get("Teacher") || 0) + 20);
    }
    
    // Process programming knowledge
    if (programmingSkills.includes("yes") || 
        programmingSkills.includes("python") || 
        programmingSkills.includes("java") || 
        programmingSkills.includes("javascript") || 
        programmingSkills.includes("c++") || 
        programmingSkills.includes("html") || 
        programmingSkills.includes("css")) {
      
      careerAreas.set("Software Engineering", (careerAreas.get("Software Engineering") || 0) + 25);
      
      if (programmingSkills.includes("python") || programmingSkills.includes("r") || programmingSkills.includes("matlab")) {
        careerAreas.set("Data Science", (careerAreas.get("Data Science") || 0) + 25);
        careerAreas.set("Machine Learning Engineer", (careerAreas.get("Machine Learning Engineer") || 0) + 25);
      }
      
      if (programmingSkills.includes("javascript") || programmingSkills.includes("html") || programmingSkills.includes("css")) {
        careerAreas.set("Front-end Developer", (careerAreas.get("Front-end Developer") || 0) + 25);
        careerAreas.set("UX/UI Designer", (careerAreas.get("UX/UI Designer") || 0) + 15);
      }
    }
    
    // Process work preference
    if (workStyle === "Alone") {
      careerAreas.set("Research Scientist", (careerAreas.get("Research Scientist") || 0) + 10);
      careerAreas.set("Content Writer", (careerAreas.get("Content Writer") || 0) + 10);
      careerAreas.set("Data Science", (careerAreas.get("Data Science") || 0) + 10);
    } else if (workStyle === "In a team") {
      careerAreas.set("Project Manager", (careerAreas.get("Project Manager") || 0) + 15);
      careerAreas.set("Marketing Specialist", (careerAreas.get("Marketing Specialist") || 0) + 10);
      careerAreas.set("Product Manager", (careerAreas.get("Product Manager") || 0) + 15);
    }
    
    // Process values
    if (values.includes("creativity") || values.includes("innovative") || values.includes("creative")) {
      careerAreas.set("UX/UI Designer", (careerAreas.get("UX/UI Designer") || 0) + 15);
      careerAreas.set("Graphic Designer", (careerAreas.get("Graphic Designer") || 0) + 15);
      careerAreas.set("Marketing Specialist", (careerAreas.get("Marketing Specialist") || 0) + 10);
      careerAreas.set("Architect", (careerAreas.get("Architect") || 0) + 15);
    }
    
    if (values.includes("helping") || values.includes("impact") || values.includes("social") || values.includes("people")) {
      careerAreas.set("Social Worker", (careerAreas.get("Social Worker") || 0) + 20);
      careerAreas.set("Teacher", (careerAreas.get("Teacher") || 0) + 20);
      careerAreas.set("Medical Doctor", (careerAreas.get("Medical Doctor") || 0) + 15);
      careerAreas.set("Nonprofit Manager", (careerAreas.get("Nonprofit Manager") || 0) + 20);
    }
    
    if (values.includes("financial") || values.includes("money") || values.includes("security") || values.includes("stability")) {
      careerAreas.set("Financial Analyst", (careerAreas.get("Financial Analyst") || 0) + 15);
      careerAreas.set("Software Engineering", (careerAreas.get("Software Engineering") || 0) + 10);
      careerAreas.set("Actuary", (careerAreas.get("Actuary") || 0) + 15);
    }
    
    if (values.includes("challenge") || values.includes("learning") || values.includes("growth")) {
      careerAreas.set("Management Consultant", (careerAreas.get("Management Consultant") || 0) + 15);
      careerAreas.set("Research Scientist", (careerAreas.get("Research Scientist") || 0) + 15);
      careerAreas.set("Software Engineering", (careerAreas.get("Software Engineering") || 0) + 10);
    }
    
    // Sort career areas by score and take the top 5
    const sortedCareers = Array.from(careerAreas.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    // Generate detailed suggestions for top careers
    sortedCareers.forEach(([career, score]) => {
      const suggestion = getCareerDetails(career, Math.min(Math.round(score), 100));
      suggestions.push(suggestion);
    });
    
    return suggestions;
  };
  
  // Get detailed information for a specific career
  const getCareerDetails = (career: string, match: number): CareerSuggestion => {
    const careerDetails: Record<string, CareerSuggestion> = {
      "Software Engineering": {
        title: "Software Engineer",
        description: "Design, develop, and maintain software applications and systems",
        match: match,
        skills: ["Programming", "Problem-solving", "Data structures", "Algorithms", "Collaboration"],
        education: ["Computer Science degree", "Coding bootcamp", "Self-learning + portfolio"],
      },
      "UX/UI Designer": {
        title: "UX/UI Designer",
        description: "Create user-friendly interfaces and enhance user experiences for digital products",
        match: match,
        skills: ["Visual design", "User empathy", "Prototyping", "Research", "Wireframing"],
        education: ["Design degree", "UX certification", "UI/UX bootcamp"],
      },
      "Data Science": {
        title: "Data Scientist",
        description: "Analyze complex data to help organizations make better decisions",
        match: match,
        skills: ["Statistical analysis", "Programming", "Data visualization", "Machine learning"],
        education: ["Statistics/Math degree", "Data Science bootcamp", "Online specialization"],
      },
      "Financial Analyst": {
        title: "Financial Analyst",
        description: "Evaluate financial data and provide investment recommendations",
        match: match,
        skills: ["Financial modeling", "Market analysis", "Excel", "Critical thinking"],
        education: ["Finance/Economics degree", "CFA certification", "MBA"],
      },
      "Graphic Designer": {
        title: "Graphic Designer",
        description: "Create visual concepts to communicate ideas that inspire and inform consumers",
        match: match,
        skills: ["Visual design", "Typography", "Color theory", "Adobe Creative Suite"],
        education: ["Design degree", "Portfolio development", "Design certification"],
      },
      "Content Writer": {
        title: "Content Writer",
        description: "Create engaging written content for websites, blogs, and marketing materials",
        match: match,
        skills: ["Writing", "SEO knowledge", "Research", "Editing", "Content strategy"],
        education: ["English/Journalism degree", "Writing courses", "Marketing certification"],
      },
      "Marketing Specialist": {
        title: "Marketing Specialist",
        description: "Develop and implement marketing strategies to promote products or services",
        match: match,
        skills: ["Market research", "Digital marketing", "Analytics", "Social media", "Creativity"],
        education: ["Marketing degree", "Digital marketing certification", "MBA"],
      },
      "Mechanical Engineer": {
        title: "Mechanical Engineer",
        description: "Design, develop, build, and test mechanical devices and systems",
        match: match,
        skills: ["CAD software", "Problem-solving", "Physics", "Mathematics", "Technical drawing"],
        education: ["Mechanical Engineering degree", "Engineering license", "Master's degree"],
      },
      "Medical Doctor": {
        title: "Medical Doctor",
        description: "Diagnose and treat injuries and illnesses to improve patient health",
        match: match,
        skills: ["Medical knowledge", "Problem-solving", "Communication", "Empathy", "Decision-making"],
        education: ["Pre-med bachelor's degree", "Medical school (MD/DO)", "Residency"],
      },
      "Research Scientist": {
        title: "Research Scientist",
        description: "Conduct experiments and investigations to develop or improve products and processes",
        match: match,
        skills: ["Research methods", "Data analysis", "Critical thinking", "Lab techniques"],
        education: ["Science degree", "Master's degree", "PhD in specialized field"],
      },
      "Psychologist": {
        title: "Psychologist",
        description: "Study cognitive, emotional, and social processes and behavior",
        match: match,
        skills: ["Assessment", "Therapy techniques", "Research", "Communication", "Empathy"],
        education: ["Psychology degree", "Master's in Psychology", "PhD/PsyD"],
      },
      "Human Resources": {
        title: "HR Specialist",
        description: "Recruit, screen, interview, and place workers, and handle employee relations",
        match: match,
        skills: ["Communication", "Conflict resolution", "Employment law", "Organization"],
        education: ["HR/Business degree", "SHRM certification", "MBA with HR focus"],
      },
      "Business Analyst": {
        title: "Business Analyst",
        description: "Analyze business processes and systems to recommend improvements",
        match: match,
        skills: ["Requirements gathering", "Process modeling", "Data analysis", "Problem-solving"],
        education: ["Business/IT degree", "MBA", "Business Analysis certification"],
      },
      "Project Manager": {
        title: "Project Manager",
        description: "Plan, execute, and close projects on time and within budget",
        match: match,
        skills: ["Leadership", "Organization", "Risk management", "Communication", "Budgeting"],
        education: ["Business/Management degree", "PMP certification", "MBA"],
      },
      "Teacher": {
        title: "Teacher",
        description: "Educate students on various subjects and help them develop knowledge and skills",
        match: match,
        skills: ["Communication", "Lesson planning", "Assessment", "Classroom management"],
        education: ["Education degree", "Teaching credential", "Subject matter expertise"],
      },
      "Social Worker": {
        title: "Social Worker",
        description: "Help people solve and cope with problems in their everyday lives",
        match: match,
        skills: ["Empathy", "Communication", "Crisis intervention", "Case management"],
        education: ["Social Work degree", "MSW", "Social Work license"],
      },
      "Front-end Developer": {
        title: "Front-end Developer",
        description: "Build user interfaces and interactive elements for websites and applications",
        match: match,
        skills: ["HTML", "CSS", "JavaScript", "UI frameworks", "Responsive design"],
        education: ["Computer Science degree", "Web development bootcamp", "Self-learning + portfolio"],
      },
      "Cybersecurity Analyst": {
        title: "Cybersecurity Analyst",
        description: "Protect computer systems and networks from information disclosure or theft",
        match: match,
        skills: ["Network security", "Threat analysis", "Security tools", "Incident response"],
        education: ["IT/Cybersecurity degree", "Security certifications (CISSP, CEH)", "Ongoing training"],
      },
      "Game Developer": {
        title: "Game Developer",
        description: "Design and create video games for computers, consoles, and mobile devices",
        match: match,
        skills: ["Programming", "Game physics", "3D modeling", "Animation", "Creativity"],
        education: ["Computer Science/Game Development degree", "Portfolio of games", "Coding bootcamp"],
      },
      "Architect": {
        title: "Architect",
        description: "Design buildings and structures, considering aesthetics, function, and safety",
        match: match,
        skills: ["Design", "3D modeling", "Technical drawing", "Building codes", "Project management"],
        education: ["Architecture degree", "Internship", "Architecture license"],
      },
      "Product Manager": {
        title: "Product Manager",
        description: "Develop product strategy and roadmap to meet customer needs and business goals",
        match: match,
        skills: ["Market research", "Strategy", "Communication", "Leadership", "Data analysis"],
        education: ["Business/Technical degree", "MBA", "Product management certification"],
      },
      "Actuary": {
        title: "Actuary",
        description: "Analyze financial costs of risk and uncertainty using mathematics and statistics",
        match: match,
        skills: ["Statistical analysis", "Mathematics", "Risk assessment", "Financial knowledge"],
        education: ["Mathematics/Statistics/Actuarial Science degree", "Actuarial exams", "Certification"],
      },
      "Electrical Engineer": {
        title: "Electrical Engineer",
        description: "Design, develop, and test electrical equipment and systems",
        match: match,
        skills: ["Circuit design", "Electronics", "Power systems", "Technical drawing", "Problem-solving"],
        education: ["Electrical Engineering degree", "Engineering license", "Master's degree"],
      },
      "IT Project Manager": {
        title: "IT Project Manager",
        description: "Plan and oversee IT projects, ensuring they're completed on time and within budget",
        match: match,
        skills: ["Technical knowledge", "Leadership", "Risk management", "Budgeting", "Communication"],
        education: ["IT/Business degree", "PMP certification", "IT certifications"],
      },
      "Pharmacologist": {
        title: "Pharmacologist",
        description: "Study how drugs interact with biological systems to develop new medications",
        match: match,
        skills: ["Pharmacology", "Research methods", "Data analysis", "Laboratory techniques"],
        education: ["Pharmacology/Biochemistry degree", "Master's degree", "PhD"],
      },
      "Journalist": {
        title: "Journalist",
        description: "Research, write, and report news stories for print, broadcast, or digital media",
        match: match,
        skills: ["Writing", "Research", "Interviewing", "Fact-checking", "Communication"],
        education: ["Journalism/Communication degree", "Portfolio of work", "Internship experience"],
      },
      "Management Consultant": {
        title: "Management Consultant",
        description: "Help organizations improve performance by solving problems and finding solutions",
        match: match,
        skills: ["Problem-solving", "Business analysis", "Strategic thinking", "Communication", "Presentation"],
        education: ["Business degree", "MBA", "Consulting experience"],
      },
      "Machine Learning Engineer": {
        title: "Machine Learning Engineer",
        description: "Design and implement machine learning models to solve complex problems",
        match: match,
        skills: ["Programming", "Machine learning algorithms", "Mathematics", "Data modeling"],
        education: ["Computer Science degree", "Machine Learning specialization", "Advanced degree (MS/PhD)"],
      },
      "Nonprofit Manager": {
        title: "Nonprofit Manager",
        description: "Oversee operations and programs for nonprofit organizations to fulfill their mission",
        match: match,
        skills: ["Leadership", "Fundraising", "Program management", "Community outreach", "Budgeting"],
        education: ["Nonprofit Management degree", "MBA", "Experience in nonprofit sector"],
      },
      // Add more careers as needed
    };
    
    // Default career info if not found in the mapping
    if (!careerDetails[career]) {
      return {
        title: career,
        description: `Work in the field of ${career}`,
        match: match,
        skills: ["Research this career", "Identify key skills", "Network with professionals"],
        education: ["Research education requirements", "Look for related certificates or degrees"],
      };
    }
    
    return careerDetails[career];
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
