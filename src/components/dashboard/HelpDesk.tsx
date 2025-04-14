
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, FileText, HelpCircle, Phone, Mail, Send } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const HelpDesk = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const faqs = [
    {
      question: "How does the career guidance system work?",
      answer: "Our AI-powered career guidance system uses interactive questions to understand your interests, skills, and preferences. Based on your responses, we analyze the data and suggest the perfect career match for you, along with a detailed roadmap for success."
    },
    {
      question: "Can I save my career roadmap for later?",
      answer: "Yes! Once generated, your career roadmap will be saved to your profile where you can access it anytime. You can also generate multiple roadmaps as your interests evolve."
    },
    {
      question: "How accurate are the career suggestions?",
      answer: "Our advanced AI algorithm provides highly personalized suggestions based on your unique profile and current industry trends. The system continuously learns and improves with each user interaction, making recommendations increasingly accurate."
    },
    {
      question: "Can I update my answers to the guidance questions later?",
      answer: "Absolutely! You can retake the guidance questionnaire at any time to update your preferences and get a fresh career suggestion as your interests evolve."
    },
    {
      question: "How can I get additional help if I have questions?",
      answer: "You can contact our support team using the contact form below, call us directly at +91 8972252624, or email support@futureroadmap.com. We typically respond within 24 hours on business days."
    }
  ];

  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending the contact message
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

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
              <Phone className="h-5 w-5 text-career-purple" />
              Call Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Talk to our support team directly
            </p>
            <p className="font-medium">+91 8972252624</p>
            <p className="text-xs text-muted-foreground mt-1">Available 9AM-6PM, Monday-Friday</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-career-purple" />
              Email Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Send us an email anytime
            </p>
            <p className="font-medium">support@futureroadmap.com</p>
            <p className="text-xs text-muted-foreground mt-1">We respond within 24 hours on business days</p>
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

      <Card className="mb-8">
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

      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            Submit your question or feedback and we'll get back to you as soon as possible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="How can we help you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-career-gradient" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em]"></div>
                  Sending...
                </>
              ) : (
                <>
                  Send Message <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MessageCircle className="h-4 w-4 mr-2" />
            We typically respond within 24 hours on business days
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HelpDesk;
