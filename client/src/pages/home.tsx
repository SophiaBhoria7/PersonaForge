import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Lightbulb, Rocket, Play, FileText, Code, Share, UsersRound, Shield, Laptop, Brain, Quote, Scale, Swords, Key, Check, TriangleAlert, CheckCircle } from "lucide-react";
import { PersonaCard } from "@/components/persona-card";
import { PersonaForm } from "@/components/persona-form";
import { scrollToSection } from "@/lib/utils";
import type { Persona } from "@shared/schema";

// Demo persona data - exactly matching the design reference
const demoPersona: Persona = {
  id: 1,
  name: "Sarah Chen",
  title: "Senior Product Manager",
  location: "San Francisco, CA",
  primaryMotivation: "Sarah is driven by the need to make data-driven decisions that improve user experience while balancing business objectives. She seeks tools that provide actionable insights without overwhelming complexity, allowing her to communicate findings effectively to both technical and non-technical stakeholders.",
  trustDrivers: [
    "Transparent methodology and data sources",
    "Peer recommendations and case studies", 
    "Integration with existing workflow tools",
    "Responsive customer support and documentation"
  ],
  accessContext: "Sarah primarily works from a modern office environment with high-speed internet, using a MacBook Pro and dual monitors. She occasionally works remotely and needs tools that function reliably across different network conditions. She values mobile accessibility for reviewing insights during commutes and client meetings.",
  behavioralInsights: {
    decisionMaking: "Prefers to validate hypotheses with data before making recommendations",
    communicationStyle: "Values clear, visual presentations that tell a compelling story",
    learningPreference: "Learns best through hands-on exploration and guided tutorials",
    timeManagement: "Operates under tight deadlines, values efficiency and quick insights"
  },
  userVoiceQuotes: [
    "I need tools that help me tell the story behind the data, not just show me numbers.",
    "Time is my biggest constraint. If a tool takes more than 10 minutes to learn, I won't use it.",
    "I trust recommendations from my network more than any marketing material."
  ],
  ethicsAssessment: {
    biasConsiderations: [
      "Tech-industry perspective may not represent all user types",
      "High digital literacy could bias toward complex solutions", 
      "Geographic location influences timezone and cultural assumptions"
    ],
    inclusionOpportunities: [
      "Consider users with varying levels of technical expertise",
      "Design for different work environments and access patterns",
      "Account for diverse communication and learning styles"
    ]
  },
  strategicImpact: {
    product: [
      "Prioritize intuitive navigation",
      "Include data export features",
      "Optimize for mobile viewing"
    ],
    marketing: [
      "Lead with peer testimonials",
      "Showcase integration capabilities", 
      "Emphasize time-saving benefits"
    ],
    design: [
      "Focus on clean, scannable layouts",
      "Provide contextual help options",
      "Enable customizable dashboards"
    ]
  },
  keyTakeaway: "Sarah represents the efficiency-driven professional who values tools that enhance her expertise rather than replace it. Success with this persona requires building trust through transparency, providing immediate value, and supporting her role as a strategic communicator within her organization.",
  createdAt: new Date()
};

export default function Home() {
  const [showDemo, setShowDemo] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [generatedPersona, setGeneratedPersona] = useState<Persona | null>(null);

  const handlePersonaGenerated = (persona: Persona) => {
    setGeneratedPersona(persona);
    setShowForm(false);
    scrollToSection('generated-persona');
  };

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <UsersRound className="text-white text-lg" />
              </div>
              <h1 className="font-display text-2xl font-bold text-primary">PersonaForge</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('demo')} className="text-foreground hover:text-primary transition-colors">Demo</button>
              <button onClick={() => scrollToSection('generate')} className="text-foreground hover:text-primary transition-colors">Generate</button>
              <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors">About</button>
            </nav>
            <Button 
              onClick={() => scrollToSection('generate')}
              className="primary-button px-6 py-2 rounded-lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/30 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-5xl font-bold text-foreground mb-6 leading-tight">
                AI-Powered User Personas
                <span className="text-primary"> Beyond Demographics</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Generate rich, multidimensional user personas based on motivation, trust, access, and behavioral insights. 
                Built for product builders, strategists, and researchers who design better by understanding better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => {
                    setShowDemo(true);
                    scrollToSection('demo');
                  }}
                  className="primary-button px-8 py-4 rounded-lg font-medium"
                >
                  <Play className="mr-2 h-4 w-4" />
                  View Demo
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setShowForm(true);
                    scrollToSection('generate');
                  }}
                  className="border-2 border-primary text-primary px-8 py-4 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 font-medium"
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  Generate Persona
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional user research team collaborating on personas" 
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">AI Generating Insights...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="font-display text-4xl font-bold text-foreground mb-4">See PersonaForge in Action</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore a comprehensive persona generated by our AI - going far beyond basic demographics to provide actionable insights for product teams.
            </p>
          </div>

          {showDemo && (
            <div className="max-w-4xl mx-auto">
              <PersonaCard persona={demoPersona} showExport={true} />
            </div>
          )}

          {!showDemo && (
            <div className="text-center">
              <Button 
                onClick={() => setShowDemo(true)}
                className="primary-button px-8 py-4 rounded-lg font-medium"
              >
                <Play className="mr-2 h-4 w-4" />
                View Demo Persona
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Generate Persona Section */}
      <section id="generate" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="font-display text-4xl font-bold text-foreground mb-4">Generate Your Persona</h3>
            <p className="text-xl text-muted-foreground">
              Follow our guided 4-step process to create comprehensive, AI-powered user personas tailored to your product.
            </p>
          </div>

          {showForm && (
            <PersonaForm onPersonaGenerated={handlePersonaGenerated} />
          )}

          {!showForm && !generatedPersona && (
            <div className="text-center">
              <Button 
                onClick={() => setShowForm(true)}
                className="primary-button px-8 py-4 rounded-lg font-medium"
              >
                <Rocket className="mr-2 h-4 w-4" />
                Start Generating
              </Button>
            </div>
          )}

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start">
              <Lightbulb className="text-blue-500 text-xl mr-3 mt-1" />
              <div>
                <h5 className="font-semibold text-blue-800 mb-2">AI-Powered Generation</h5>
                <p className="text-blue-700 text-sm leading-relaxed">
                  PersonaForge uses OpenAI's advanced language models to generate comprehensive personas. 
                  The AI analyzes your inputs and creates detailed user profiles with authentic quotes, behavioral insights, and strategic recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Generated Persona Display */}
      {generatedPersona && (
        <section id="generated-persona" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="font-display text-4xl font-bold text-foreground mb-4">Your Generated Persona</h3>
              <p className="text-xl text-muted-foreground">
                Here's your AI-generated persona with comprehensive insights and strategic recommendations.
              </p>
            </div>
            <PersonaCard persona={generatedPersona} showExport={true} />
          </div>
        </section>
      )}

      {/* Core Values Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-accent/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="font-display text-4xl font-bold text-foreground mb-4">Why PersonaForge?</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built for builders who want to design better by understanding better. Our approach goes beyond surface-level demographics.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Diverse team analyzing user personas and data visualizations" 
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-semibold text-foreground mb-2">Ethics-Aware Design</h4>
                  <p className="text-muted-foreground">Built-in bias assessment and inclusion opportunities to ensure your personas promote fairness and accessibility.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-semibold text-foreground mb-2">Behavioral Depth</h4>
                  <p className="text-muted-foreground">Go beyond demographics to understand motivation, trust drivers, and access contexts that truly shape user behavior.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Rocket className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-semibold text-foreground mb-2">Strategic Impact</h4>
                  <p className="text-muted-foreground">Each persona includes specific recommendations for product, marketing, and design decisions.</p>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-display text-4xl font-bold text-white mb-6">Ready to Generate Better Personas?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of product builders, strategists, and researchers who create more inclusive and effective products with PersonaForge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => {
                setShowDemo(true);
                scrollToSection('demo');
              }}
              className="bg-white text-primary px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 font-semibold"
            >
              <Play className="mr-2 h-4 w-4" />
              Try Demo Persona
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setShowForm(true);
                scrollToSection('generate');
              }}
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary transition-all duration-200 font-semibold"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Start Generating
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <UsersRound className="text-white" />
                </div>
                <h5 className="font-display text-xl font-bold">PersonaForge</h5>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered user persona generation for better product decisions.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Product</h6>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Company</h6>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 PersonaForge. All rights reserved. Built for builders who design better by understanding better.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
