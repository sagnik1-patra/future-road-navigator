import { toast } from "@/hooks/use-toast";

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

// Enhanced API for career roadmaps
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
    
    // If no predefined roadmap, generate a dynamic one based on the career
    return generateDynamicRoadmap(career);
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

// Generate a detailed dynamic roadmap for any career
const generateDynamicRoadmap = (career: string): CareerRoadmap => {
  // Generate a more detailed and specific description based on career
  const careerDescription = generateCareerDescription(career);
  const salary = generateSalaryEstimate(career);
  const outlook = generateJobOutlook(career);
  
  // Generate specific steps for the career path
  const steps = generateCareerSteps(career);
  
  return {
    career,
    description: careerDescription,
    averageSalary: salary,
    jobOutlook: outlook,
    steps: steps
  };
};

// Helper function to generate a career description
const generateCareerDescription = (career: string): string => {
  const descriptions = [
    `A career as a ${career} involves applying specialized knowledge and skills to solve complex problems in the field.`,
    `${career} professionals are in demand for their expertise in analyzing, designing, and implementing solutions.`,
    `Working as a ${career} allows you to make an impact through innovation and strategic thinking.`,
    `${career} specialists collaborate with various stakeholders to achieve organizational goals and drive success.`
  ];
  
  // Combine multiple description snippets for a more comprehensive description
  const baseDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
  const additionalContext = `Professionals in this field typically need a combination of technical knowledge, analytical skills, and industry understanding. The ${career} role continues to evolve with changing technologies and market demands.`;
  
  return `${baseDescription} ${additionalContext}`;
};

// Helper function to generate salary estimate
const generateSalaryEstimate = (career: string): string => {
  // Base salary range depending on the perceived value of the career
  let baseLow = 50000;
  let baseHigh = 90000;
  
  // Adjust salary based on career keywords
  const careerLower = career.toLowerCase();
  
  if (careerLower.includes("engineer") || 
      careerLower.includes("developer") || 
      careerLower.includes("architect") ||
      careerLower.includes("data") ||
      careerLower.includes("analyst")) {
    baseLow = 70000;
    baseHigh = 120000;
  }
  
  if (careerLower.includes("senior") || 
      careerLower.includes("lead") || 
      careerLower.includes("manager") ||
      careerLower.includes("director")) {
    baseLow = 90000;
    baseHigh = 160000;
  }
  
  if (careerLower.includes("medical") || 
      careerLower.includes("doctor") || 
      careerLower.includes("health")) {
    baseLow = 150000;
    baseHigh = 300000;
  }
  
  // Format the salary range
  return `$${baseLow.toLocaleString()} - $${baseHigh.toLocaleString()}`;
};

// Helper function to generate job outlook
const generateJobOutlook = (career: string): string => {
  const outlooks = [
    "Growing faster than average",
    "Very positive growth outlook",
    "Steady demand expected",
    "High demand in certain regions",
    "Growth potential with specialized skills"
  ];
  
  return outlooks[Math.floor(Math.random() * outlooks.length)];
};

// Helper function to generate career steps
const generateCareerSteps = (career: string): CareerStep[] => {
  const careerLower = career.toLowerCase();
  const steps: CareerStep[] = [];
  
  // Step 1: Education (always first)
  let educationTitle = "Foundation Education";
  let educationDesc = `Get relevant education for ${career}`;
  let educationDuration = "2-4 years";
  let educationDetails = [
    "Research degree requirements specific to this field",
    "Consider specialized courses or certifications",
    "Look for accredited programs with good placement rates"
  ];
  
  // Customize education based on career
  if (careerLower.includes("engineer") || careerLower.includes("developer")) {
    educationTitle = "Technical Degree";
    educationDesc = "Bachelor's degree in relevant engineering or computer science field";
    educationDetails = [
      "Focus on fundamental technical principles",
      "Take specialized courses in your area of interest",
      "Complete practical projects to build your portfolio"
    ];
  } else if (careerLower.includes("design") || careerLower.includes("creative")) {
    educationTitle = "Design Education";
    educationDesc = "Degree in design, arts, or related creative field";
    educationDetails = [
      "Build a strong foundation in design principles",
      "Develop technical skills with industry tools",
      "Create a portfolio showcasing your best work"
    ];
  } else if (careerLower.includes("medical") || careerLower.includes("doctor") || careerLower.includes("health")) {
    educationTitle = "Medical Education";
    educationDesc = "Medical degree and specialized training";
    educationDuration = "6-10 years";
    educationDetails = [
      "Complete undergraduate pre-med requirements",
      "Attend medical school for specialized training",
      "Complete residency in your chosen specialty"
    ];
  }
  
  steps.push({
    id: 1,
    title: educationTitle,
    description: educationDesc,
    duration: educationDuration,
    type: "education",
    details: educationDetails
  });
  
  // Step 2: Essential Skills
  let skillsDetails = [
    "Technical skills specific to the role",
    "Soft skills like communication and teamwork",
    "Problem-solving and critical thinking"
  ];
  
  // Customize skills based on career
  if (careerLower.includes("engineer") || careerLower.includes("developer")) {
    skillsDetails = [
      "Programming languages relevant to your specialization",
      "System design and architecture principles",
      "Version control and collaboration tools",
      "Testing and debugging methodologies"
    ];
  } else if (careerLower.includes("design") || careerLower.includes("creative")) {
    skillsDetails = [
      "Industry standard design software",
      "User experience principles",
      "Visual communication techniques",
      "Creative problem solving"
    ];
  } else if (careerLower.includes("medical") || careerLower.includes("doctor")) {
    skillsDetails = [
      "Clinical diagnosis and treatment planning",
      "Patient communication and care",
      "Medical record management",
      "Staying current with medical research"
    ];
  } else if (careerLower.includes("manage") || careerLower.includes("leader")) {
    skillsDetails = [
      "Team leadership and delegation",
      "Strategic planning and execution",
      "Performance management and feedback",
      "Budget and resource allocation"
    ];
  }
  
  steps.push({
    id: 2,
    title: "Essential Skills",
    description: `Develop core competencies for ${career}`,
    duration: "Ongoing",
    type: "skill",
    details: skillsDetails
  });
  
  // Step 3: Entry Position
  steps.push({
    id: 3,
    title: "Entry-Level Position",
    description: `Begin your ${career} journey`,
    duration: "1-2 years",
    type: "experience",
    details: [
      "Apply theoretical knowledge in practical settings",
      "Learn from experienced professionals",
      "Build your professional network",
      "Identify areas for specialization"
    ]
  });
  
  // Step 4: Certification (if relevant)
  if (!careerLower.includes("artist") && !careerLower.includes("writer")) {
    let certDetails = [
      "Research industry-recognized certifications",
      "Prepare for and complete certification exams",
      "Keep certifications current with continuing education"
    ];
    
    // Customize certification based on career
    if (careerLower.includes("engineer") || careerLower.includes("developer")) {
      certDetails = [
        "Obtain technical certifications in your specialty",
        "Consider cloud platform certifications (AWS, Azure, etc.)",
        "Pursue project management certifications as you advance"
      ];
    } else if (careerLower.includes("finance") || careerLower.includes("account")) {
      certDetails = [
        "Pursue CPA, CFA, or other relevant financial certifications",
        "Complete continuing education requirements",
        "Specialize in high-demand areas like risk management"
      ];
    } else if (careerLower.includes("medical") || careerLower.includes("doctor")) {
      certDetails = [
        "Obtain board certification in your specialty",
        "Complete continuing medical education",
        "Consider subspecialty certifications"
      ];
    }
    
    steps.push({
      id: 4,
      title: "Professional Certification",
      description: "Validate your expertise",
      duration: "3-12 months",
      type: "certification",
      details: certDetails
    });
  }
  
  // Step 5: Mid-Level Position
  steps.push({
    id: steps.length + 1,
    title: "Mid-Level Position",
    description: "Take on more responsibility",
    duration: "2-3 years",
    type: "experience",
    details: [
      "Lead small projects or components",
      "Mentor junior team members",
      "Deepen your technical expertise",
      "Develop leadership and communication skills"
    ]
  });
  
  // Step 6: Specialization/Advanced Skills
  steps.push({
    id: steps.length + 1,
    title: "Specialized Expertise",
    description: "Develop mastery in specific areas",
    duration: "Ongoing",
    type: "skill",
    details: [
      "Identify and focus on high-value specializations",
      "Stay current with industry developments",
      "Attend advanced training and conferences",
      "Contribute to industry knowledge through articles or speaking"
    ]
  });
  
  // Step 7: Senior Position
  steps.push({
    id: steps.length + 1,
    title: "Senior Position",
    description: "Take on leadership and strategic roles",
    duration: "3-5+ years",
    type: "experience",
    details: [
      "Lead major initiatives and teams",
      "Contribute to organizational strategy",
      "Develop business and domain expertise",
      "Build your reputation as an industry authority"
    ]
  });
  
  return steps;
};

// Mock data for specific careers (keeping the existing data)
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
