import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, MapPin, Shield, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  // Initialize interestedCount from localStorage, defaulting to 0 if not found
  const [interestedCount, setInterestedCount] = useState(() => {
    const storedCount = localStorage.getItem('collegeconnect-interested-count');
    return storedCount ? parseInt(storedCount, 10) : 0;
  });

  // Initialize hasVoted from localStorage to prevent multiple clicks from the same user
  const [hasVoted, setHasVoted] = useState(() => {
    return localStorage.getItem('collegeconnect-has-voted') === 'true';
  });

  const [isLoading, setIsLoading] = useState(false); // No longer loading from an API
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effect to update localStorage whenever interestedCount or hasVoted changes
  useEffect(() => {
    localStorage.setItem('collegeconnect-interested-count', interestedCount.toString());
  }, [interestedCount]);

  useEffect(() => {
    localStorage.setItem('collegeconnect-has-voted', hasVoted.toString());
  }, [hasVoted]);


  const handleInterestClick = () => {
    // Disable button if already voted or submitting
    if (hasVoted || isSubmitting) {
      return;
    }

    setIsSubmitting(true); // Indicate that a "submission" (local storage update) is in progress

    // Simulate an async operation to mimic a backend call (optional, but good for UX)
    setTimeout(() => {
      setInterestedCount(prevCount => prevCount + 1);
      setHasVoted(true); // Mark as voted in the current session
      setIsSubmitting(false); // Reset submitting state

      toast({
        title: "Thanks for your interest! 🎉",
        description: "We'll notify you when CollegeConnect launches at Shoolini University.",
      });
    }, 500); // Simulate a 0.5-second network delay
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
                  {interestedCount}
                </div>
                <p className="text-lg font-medium text-gray-700">
                  {interestedCount === 1 ? "student is" : "students are"} already interested
                </p>
                <Button
                  onClick={handleInterestClick}
                  disabled={hasVoted || isSubmitting}
                  // Responsive CSS for the button:
                  // px-4 and text-base are for small screens (mobile-first)
                  // text-center ensures wrapped text is centered
                  // sm:whitespace-normal allows text to wrap on small screens (up to sm breakpoint)
                  // sm:whitespace-nowrap prevents wrapping from the sm breakpoint upwards
                  // md:px-8 and md:text-lg apply for medium screens and larger
                  className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3
                             px-4 text-base text-center sm:whitespace-normal
                             md:px-8 md:text-lg md:whitespace-nowrap"
                >
                  <Heart className={`w-5 h-5 mr-2 ${hasVoted ? 'fill-current' : ''}`} />
                  {isSubmitting ? "Registering..." : hasVoted ? "Thanks for your interest!" : "I'm Interested"}
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
