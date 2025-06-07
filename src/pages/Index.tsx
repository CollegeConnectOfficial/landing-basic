
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, MapPin, Shield, Mail, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      toast({
        title: "You're on the list! 🎉",
        description: "We'll notify you when CollegeConnect launches at your university.",
      });
      setEmail("");
    }
  };

  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Hyperlocal",
      description: "Connect with students on your campus and nearby universities"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Anonymous",
      description: "Share thoughts, ask questions, and connect without judgment"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Real Conversations",
      description: "Genuine discussions about campus life, academics, and more"
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
            Your Campus,
            <br />
            Your Voice,
            <br />
            <span className="text-gray-800">Your Community</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            CollegeConnect is the hyperlocal, anonymous social platform where university students 
            can share, connect, and discover what's really happening on campus.
          </p>

          {/* Email Signup */}
          <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Get early access
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your .edu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-white border-gray-200"
                        required
                      />
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Join
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    We'll notify you when CollegeConnect launches at your university
                  </p>
                </form>
              ) : (
                <div className="text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                  <h3 className="font-semibold text-gray-800">You're all set!</h3>
                  <p className="text-sm text-gray-600">
                    We'll let you know when we launch at your university.
                  </p>
                </div>
              )}
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
          <p className="text-gray-500 mb-6">Launching first at these universities:</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            <span className="text-lg font-semibold text-gray-700">Stanford University</span>
            <span className="text-lg font-semibold text-gray-700">UC Berkeley</span>
            <span className="text-lg font-semibold text-gray-700">UCLA</span>
            <span className="text-lg font-semibold text-gray-700">USC</span>
            <span className="text-lg font-semibold text-gray-700">UCSD</span>
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
        <p>&copy; 2024 CollegeConnect. Built for students, by students.</p>
      </footer>
    </div>
  );
};

export default Index;
