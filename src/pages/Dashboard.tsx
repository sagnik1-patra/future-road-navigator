
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, User, Compass } from "lucide-react";
import HelpDesk from "@/components/dashboard/HelpDesk";
import CareerGuidance from "@/components/dashboard/CareerGuidance";
import UserProfile from "@/components/dashboard/UserProfile";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
            <p className="text-muted-foreground">
              Let's explore your career possibilities today
            </p>
          </div>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="guidance" className="w-full">
          <TabsList className="mb-8 w-full grid grid-cols-3 h-auto">
            <TabsTrigger value="guidance" className="flex flex-col py-3 gap-2">
              <Compass className="h-5 w-5" />
              <span>Career Guidance</span>
            </TabsTrigger>
            <TabsTrigger value="help" className="flex flex-col py-3 gap-2">
              <HelpCircle className="h-5 w-5" />
              <span>Help Desk</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col py-3 gap-2">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="guidance">
            <CareerGuidance user={user} />
          </TabsContent>
          
          <TabsContent value="help">
            <HelpDesk />
          </TabsContent>
          
          <TabsContent value="profile">
            <UserProfile user={user} />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
