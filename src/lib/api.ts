
import { toast } from "@/components/ui/use-toast";

// Career data types
export interface CareerStep {
  id: number;
  title: string;
  description: string;
  duration: string;
  type: 'education' | 'skill' | 'experience' | 'certification' | 'tip';
  details?: string[];
}

export interface CareerRoadmap {
  career: string;
  description: string;
  averageSalary: string;
  jobOutlook: string;
  steps: CareerStep[];
}

// Mock API for career roadmaps - this would be replaced with a real API call
export const fetchCareerRoadmap = async (career: string): Promise<CareerRoadmap | null> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Convert to lowercase for case-insensitive matching
    const careerLower = career.toLowerCase();
    
    // Check if we have a predefined roadmap for this career
    const roadmap = mockRoadmaps.find(r => 
      r.career.toLowerCase() === careerLower ||
      r.career.toLowerCase().includes(careerLower) ||
      careerLower.includes(r.career.toLowerCase())
    );
    
    if (roadmap) {
      return roadmap;
    }
    
    // If no predefined roadmap, generate a generic one based on the career
    return generateGenericRoadmap(career);
  } catch (error) {
    console.error("Error fetching career roadmap:", error);
    toast({
      title: "Error",
      description: "Failed to fetch career roadmap. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

// Generate a generic roadmap if we don't have specific data
const generateGenericRoadmap = (career: string): CareerRoadmap => {
  return {
    career,
    description: `A career in ${career} can be rewarding and challenging. It typically requires a combination of education, skills development, and practical experience.`,
    averageSalary: "Varies by location and experience",
    jobOutlook: "Research current job market trends",
    steps: [
      {
        id: 1,
        title: "Foundation Education",
        description: `Get relevant education for ${career}`,
        duration: "2-4 years",
        type: "education",
        details: [
          "Research degree requirements specific to this field",
          "Consider specialized courses or certifications",
          "Look for accredited programs with good placement rates"
        ]
      },
      {
        id: 2,
        title: "Essential Skills",
        description: "Develop core competencies",
        duration: "Ongoing",
        type: "skill",
        details: [
          "Technical skills specific to the role",
          "Soft skills like communication and teamwork",
          "Problem-solving and critical thinking"
        ]
      },
      {
        id: 3,
        title: "Entry-Level Position",
        description: "Gain practical experience",
        duration: "1-2 years",
        type: "experience",
        details: [
          "Apply for internships or junior positions",
          "Build a professional network",
          "Develop a portfolio of work"
        ]
      },
      {
        id: 4,
        title: "Professional Certification",
        description: "Validate your expertise",
        duration: "3-6 months",
        type: "certification",
        details: [
          "Research industry-recognized certifications",
          "Prepare for and complete certification exams",
          "Keep certifications current with continuing education"
        ]
      },
      {
        id: 5,
        title: "Career Growth",
        description: "Advance to more senior roles",
        duration: "2-5 years",
        type: "experience",
        details: [
          "Take on more responsibility",
          "Mentor junior colleagues",
          "Specialize in a particular area"
        ]
      }
    ]
  };
};

// Mock data for specific careers
const mockRoadmaps: CareerRoadmap[] = [
  {
    career: "Software Engineer",
    description: "Software engineers design, develop, and maintain software systems. They analyze user needs, design software solutions, write and test code, and ensure software quality.",
    averageSalary: "$110,000 - $150,000",
    jobOutlook: "Growing much faster than average",
    steps: [
      {
        id: 1,
        title: "Computer Science Degree",
        description: "Bachelor's degree in Computer Science or related field",
        duration: "4 years",
        type: "education",
        details: [
          "Focus on data structures and algorithms",
          "Learn software design principles",
          "Build projects for your portfolio"
        ]
      },
      {
        id: 2,
        title: "Programming Languages",
        description: "Learn key programming languages and tools",
        duration: "Continuous",
        type: "skill",
        details: [
          "JavaScript, Python, Java, or C++",
          "Front-end frameworks (React, Vue, Angular)",
          "Back-end technologies (Node.js, Django, Spring)",
          "Database systems (SQL, MongoDB)"
        ]
      },
      {
        id: 3,
        title: "Internship",
        description: "Gain real-world experience through internships",
        duration: "3-6 months",
        type: "experience",
        details: [
          "Apply theoretical knowledge in practice",
          "Understand software development lifecycle",
          "Work with experienced engineers"
        ]
      },
      {
        id: 4,
        title: "Junior Developer",
        description: "Start as a junior developer to build experience",
        duration: "1-2 years",
        type: "experience",
        details: [
          "Contribute to existing codebases",
          "Learn version control systems like Git",
          "Participate in code reviews"
        ]
      },
      {
        id: 5,
        title: "Mid-level Engineer",
        description: "Progress to more complex projects and responsibilities",
        duration: "2-3 years",
        type: "experience",
        details: [
          "Lead small to medium projects",
          "Mentor junior developers",
          "Improve system design skills"
        ]
      },
      {
        id: 6,
        title: "Specialized Skills",
        description: "Develop expertise in specific areas",
        duration: "Ongoing",
        type: "skill",
        details: [
          "Cloud technologies (AWS, Azure, GCP)",
          "DevOps and CI/CD pipelines",
          "Machine learning or security"
        ]
      },
      {
        id: 7,
        title: "Professional Certification",
        description: "Get certified in relevant technologies",
        duration: "Variable",
        type: "certification",
        details: [
          "AWS Certified Developer",
          "Microsoft Certified: Azure Developer",
          "Google Cloud Professional Developer"
        ]
      },
      {
        id: 8,
        title: "Senior Engineer",
        description: "Take on senior engineering roles",
        duration: "3+ years",
        type: "experience",
        details: [
          "Architecture and system design",
          "Technical leadership",
          "Cross-team collaboration"
        ]
      }
    ]
  },
  {
    career: "UX Designer",
    description: "UX Designers focus on creating meaningful experiences for users by understanding their needs, conducting research, and designing intuitive interfaces and interactions.",
    averageSalary: "$85,000 - $130,000",
    jobOutlook: "Growing faster than average",
    steps: [
      {
        id: 1,
        title: "Design Education",
        description: "Degree in Design, HCI, or related field",
        duration: "2-4 years",
        type: "education",
        details: [
          "Study visual design principles",
          "Learn about human-computer interaction",
          "Understand psychology and human behavior"
        ]
      },
      {
        id: 2,
        title: "UX Fundamentals",
        description: "Master UX design principles and methodologies",
        duration: "6-12 months",
        type: "skill",
        details: [
          "User research techniques",
          "Usability testing",
          "Information architecture",
          "Wireframing and prototyping"
        ]
      },
      {
        id: 3,
        title: "Design Tools",
        description: "Learn industry-standard design tools",
        duration: "3-6 months",
        type: "skill",
        details: [
          "Figma or Sketch",
          "Adobe XD",
          "Prototyping tools (InVision, Principle)",
          "Design systems"
        ]
      },
      {
        id: 4,
        title: "Portfolio Development",
        description: "Create a strong UX design portfolio",
        duration: "2-3 months",
        type: "experience",
        details: [
          "Document your design process",
          "Showcase problem-solving skills",
          "Include case studies with measurable outcomes"
        ]
      },
      {
        id: 5,
        title: "Entry-Level Position",
        description: "Start as a junior UX designer",
        duration: "1-2 years",
        type: "experience",
        details: [
          "Work on real projects with constraints",
          "Collaborate with developers and stakeholders",
          "Learn to present and defend design decisions"
        ]
      },
      {
        id: 6,
        title: "Specialized UX Skills",
        description: "Develop expertise in specific areas",
        duration: "Ongoing",
        type: "skill",
        details: [
          "Interaction design",
          "UI design",
          "Content strategy",
          "Research specialization"
        ]
      },
      {
        id: 7,
        title: "UX Certification",
        description: "Get industry-recognized certifications",
        duration: "1-6 months",
        type: "certification",
        details: [
          "Nielsen Norman Group UX Certification",
          "Interaction Design Foundation Courses",
          "Google UX Design Certificate"
        ]
      },
      {
        id: 8,
        title: "Senior UX Designer",
        description: "Progress to senior designer roles",
        duration: "3+ years",
        type: "experience",
        details: [
          "Lead design strategy",
          "Mentor junior designers",
          "Influence product direction"
        ]
      }
    ]
  },
  {
    career: "Data Scientist",
    description: "Data Scientists extract insights from complex data using statistics, programming, and domain knowledge to solve business problems and drive decision-making.",
    averageSalary: "$100,000 - $160,000",
    jobOutlook: "Growing much faster than average",
    steps: [
      {
        id: 1,
        title: "Quantitative Education",
        description: "Degree in Statistics, Math, Computer Science or related field",
        duration: "4 years",
        type: "education",
        details: [
          "Focus on statistics and probability",
          "Study linear algebra and calculus",
          "Take courses in computer science"
        ]
      },
      {
        id: 2,
        title: "Programming Skills",
        description: "Learn programming languages for data analysis",
        duration: "6-12 months",
        type: "skill",
        details: [
          "Python or R for data analysis",
          "SQL for database querying",
          "Big data tools (Spark, Hadoop)",
          "Version control with Git"
        ]
      },
      {
        id: 3,
        title: "Data Analysis & Visualization",
        description: "Master data manipulation and visualization techniques",
        duration: "3-6 months",
        type: "skill",
        details: [
          "Data cleaning and preprocessing",
          "Exploratory data analysis",
          "Data visualization (Matplotlib, Seaborn, Tableau)",
          "Statistical analysis"
        ]
      },
      {
        id: 4,
        title: "Machine Learning",
        description: "Learn machine learning algorithms and applications",
        duration: "6-12 months",
        type: "skill",
        details: [
          "Supervised learning algorithms",
          "Unsupervised learning",
          "Model evaluation and validation",
          "Feature engineering"
        ]
      },
      {
        id: 5,
        title: "Entry-Level Data Role",
        description: "Start as a data analyst or junior data scientist",
        duration: "1-2 years",
        type: "experience",
        details: [
          "Apply analytical skills to real business problems",
          "Create data-driven reports and visualizations",
          "Collaborate with stakeholders to define goals"
        ]
      },
      {
        id: 6,
        title: "Advanced ML & AI",
        description: "Develop expertise in advanced techniques",
        duration: "Ongoing",
        type: "skill",
        details: [
          "Deep learning and neural networks",
          "Natural language processing",
          "Computer vision",
          "Reinforcement learning"
        ]
      },
      {
        id: 7,
        title: "Professional Certification",
        description: "Get industry-recognized certifications",
        duration: "3-6 months",
        type: "certification",
        details: [
          "AWS Certified Machine Learning",
          "Google Professional Data Engineer",
          "IBM Data Science Professional"
        ]
      },
      {
        id: 8,
        title: "Senior Data Scientist",
        description: "Progress to senior roles",
        duration: "3+ years",
        type: "experience",
        details: [
          "Lead complex data science projects",
          "Develop data strategy",
          "Mentor junior data scientists",
          "Translate business needs into data solutions"
        ]
      }
    ]
  }
];
