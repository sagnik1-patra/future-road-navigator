
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, FileText, HelpCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpDesk = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How does the career guidance system work?",
      answer: "Our career guidance system uses interactive questions to understand your interests, skills, and preferences. Based on your responses, we analyze the data and suggest career options that are tailored specifically to you."
    },
    {
      question: "Can I save multiple career roadmaps?",
      answer: "Yes! You can generate and save multiple career roadmaps to compare different career paths and make an informed decision about your future."
    },
    {
      question: "How accurate are the career suggestions?",
      answer: "Our AI-powered system provides suggestions based on your input and current industry trends. While we strive for accuracy, we recommend using these suggestions as a starting point for further research and exploration."
    },
    {
      question: "Can I update my answers to the guidance questions later?",
      answer: "Absolutely! You can retake the guidance questionnaire at any time to update your preferences and get fresh career suggestions as your interests evolve."
    },
    {
      question: "How can I get additional help if I have questions?",
      answer: "You can contact our support team using the contact form below or by emailing support@futureroadmap.com. We typically respond within 24 hours on business days."
    }
  ];

  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Help & Support</h2>
        <p className="text-muted-foreground">
          Find answers to common questions or contact our support team for assistance
        </p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input 
          type="text" 
          placeholder="Search for help topics..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-career-purple" />
              Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Browse our comprehensive guides and tutorials
            </p>
            <Button variant="outline" className="w-full">View Documentation</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-career-purple" />
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get in touch with our friendly support team
            </p>
            <Button variant="outline" className="w-full">Contact Us</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-career-purple" />
              Video Tutorials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Watch step-by-step tutorial videos
            </p>
            <Button variant="outline" className="w-full">Watch Tutorials</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Quick answers to common questions about our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Alert>
              <AlertTitle>No results found</AlertTitle>
              <AlertDescription>
                No FAQs match your search query. Try different keywords or browse all FAQs by clearing your search.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpDesk;
