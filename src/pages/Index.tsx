import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, MapPin, Shield, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [interestedCount, setInterestedCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Still loading initially from API
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check localStorage for voted status and load initial count from API
  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        // Try to get the count from the API first
        const response = await fetch('/api/counter');
        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }
        const data = await response.json();
        setInterestedCount(data.count);

        // After fetching, check localStorage for voted status specific to this browser
        const voted = localStorage.getItem('collegeconnect-voted') === 'true';
        setHasVoted(voted);

      } catch (error) {
        console.error('Failed to fetch count from API:', error);
        // Fallback: If API fails, try to load count from localStorage, and show a toast
        const storedCount = localStorage.getItem('collegeconnect-count');
        const initialCount = storedCount ? parseInt(storedCount, 10) : 3; // Default to 3 if nothing in localStorage
        setInterestedCount(initialCount);

        // Still check localStorage for voted status even if API failed for count
        const voted = localStorage.getItem('collegeconnect-voted') === 'true';
        setHasVoted(voted);

        toast({
          title: "Heads up!",
          description: "Could not load the latest interest count. Displaying cached data.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false); // Done loading, regardless of success or failure
      }
    };

    fetchInitialState();
  }, []); // Empty dependency array means this runs once on mount

  const handleInterestClick = async () => {
    // Disable button if already voted, submitting, or still loading initial data
    if (hasVoted || isSubmitting || isLoading) {
      console.log('Button click blocked:', { hasVoted, isSubmitting, isLoading });
      return;
    }

    setIsSubmitting(true); // Set submitting state to disable the button

    try {
      // Call the API to increment counter
      const response = await fetch('/api/counter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Attempt to read error message from response body if available
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(`Failed to increment counter: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      setInterestedCount(data.count); // Update count with the new value from the API
      setHasVoted(true); // Mark as voted for the current session

      // Store in localStorage to prevent multiple votes from same browser
      localStorage.setItem('collegeconnect-voted', 'true');
      localStorage.setItem('collegeconnect-count', data.count.toString()); // Store the new count for fallback

      toast({
        title: "Thanks for your interest! 🎉",
        description: "We'll notify you when CollegeConnect launches at Shoolini University.",
      });
    } catch (error) {
      console.error('Failed to increment counter:', error);
      toast({
        title: "Error",
        description: `Failed to register your interest: ${error.message}. Please try again.`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Seamless Access",
      description: "Minimal login, no personal data retained"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Campus‑Wide Hyperlocal Feed",
      description: "Connect with students on your campus and nearby universities"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "AI‑Powered Profanity & Abuse",
      description: "Smart content moderation for a safer community experience"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Student Community",
      description: "Built exclusively for university students, by students"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              CollegeConnect
            </span>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
            Coming Soon
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-purple-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Launching at universities nationwide
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Connect
            <br />
            Anonymously
            <br />
            <span className="text-gray-800">With Your Campus</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {/* Add a descriptive subtitle here if needed */}
          </p>

          {/* Interest Counter */}
          <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="text-3xl font-bold text-gray-800">
                  {isLoading ? "..." : interestedCount}
                </div>
                <p className="text-lg font-medium text-gray-700">
                  {interestedCount === 1 ? "student is" : "students are"} already interested
                </p>
                <Button
                  onClick={handleInterestClick}
                  disabled={hasVoted || isSubmitting || isLoading} // Added isLoading to disabled
                  // Responsive CSS for the button
                  className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3
                             px-4 text-base text-center sm:whitespace-normal
                             md:px-8 md:text-lg md:whitespace-nowrap"
                >
                  <Heart className={`w-5 h-5 mr-2 ${hasVoted ? 'fill-current' : ''}`} />
                  {isLoading ? "Loading..." : isSubmitting ? "Registering..." : hasVoted ? "Thanks for your interest!" : "I'm Interested"}
                </Button>
                {hasVoted && (
                  <p className="text-sm text-gray-500">
                    We'll notify you when CollegeConnect launches!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/70 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-purple-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Proof */}
        <div className="text-center">
          <p className="text-gray-500 mb-6">Launching first at:</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            <span className="text-lg font-semibold text-gray-700">Shoolini University</span>
          </div>
        </div>
      </main>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-500 text-sm">
        <p>&copy; 2025 CollegeConnect. Built for students, by students.</p>
      </footer>
    </div>
  );
};

export default Index;
