
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading text-center">
              About Future Roadmap
            </h1>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>
                  Helping you navigate your career journey with confidence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Future Roadmap is designed to provide personalized career guidance for anyone looking to start or advance their professional journey. 
                  We believe that every career path should be clear, achievable, and tailored to individual goals.
                </p>
                <p className="text-muted-foreground">
                  Our roadmaps combine industry best practices, expert insights, and real-world requirements to give you a comprehensive guide to achieving your career goals.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-career-purple text-white font-bold mr-3">1</span>
                    <div>
                      <h3 className="font-medium mb-1">Enter a Career Title</h3>
                      <p className="text-muted-foreground">
                        Simply type in the career you're interested in exploring.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-career-purple text-white font-bold mr-3">2</span>
                    <div>
                      <h3 className="font-medium mb-1">Generate Your Roadmap</h3>
                      <p className="text-muted-foreground">
                        Our system creates a customized career path with required steps.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-career-purple text-white font-bold mr-3">3</span>
                    <div>
                      <h3 className="font-medium mb-1">Explore the Details</h3>
                      <p className="text-muted-foreground">
                        Dive into each step to understand education requirements, skills needed, and experience milestones.
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Future Developments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We're constantly working to improve Future Roadmap. Some upcoming features include:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-career-purple mt-1.5 mr-2"></span>
                    <span>Personalized recommendations based on your skills and experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-career-purple mt-1.5 mr-2"></span>
                    <span>Integration with job listings to show current opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-career-purple mt-1.5 mr-2"></span>
                    <span>Community features to connect with professionals in your desired field</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-career-purple mt-1.5 mr-2"></span>
                    <span>Progress tracking to help you monitor your career journey</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
