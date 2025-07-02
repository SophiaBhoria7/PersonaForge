import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Goal, Shield, Laptop, Brain, Quote, Scale, Swords, Key, Check, TriangleAlert, CheckCircle, FileText, Code, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Persona } from "@shared/schema";

interface PersonaCardProps {
  persona: Persona;
  showExport?: boolean;
}

export function PersonaCard({ persona, showExport = false }: PersonaCardProps) {
  const { toast } = useToast();

  const handleExportPDF = async () => {
    try {
      const response = await fetch(`/api/personas/${persona.id}/export/pdf`);
      if (!response.ok) throw new Error('Failed to export PDF');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${persona.name}_persona.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "PDF Export Successful",
        description: "Your persona has been exported as a PDF file.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export persona as PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportJSON = async () => {
    try {
      const response = await fetch(`/api/personas/${persona.id}/export/json`);
      if (!response.ok) throw new Error('Failed to export JSON');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${persona.name}_persona.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "JSON Export Successful",
        description: "Your persona has been exported as a JSON file.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export persona as JSON. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    try {
      const response = await fetch(`/api/personas/${persona.id}/share`);
      const data = await response.json();
      
      await navigator.clipboard.writeText(data.shareLink);
      toast({
        title: "Share Link Copied",
        description: "The persona share link has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Failed to generate share link. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Persona Header */}
      <div className="bg-primary text-white p-8">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <User className="text-3xl" />
          </div>
          <div>
            <h4 className="font-display text-3xl font-bold">{persona.name}</h4>
            <p className="text-xl opacity-90">{persona.title}</p>
            <p className="text-lg opacity-75">{persona.location}</p>
          </div>
        </div>
      </div>

      {/* Persona Content */}
      <CardContent className="p-8 space-y-8">
        {/* Primary Motivation */}
        <div>
          <h5 className="font-display text-2xl font-semibold text-foreground mb-4 flex items-center">
            <Goal className="text-primary mr-3" />
            Primary Motivation
          </h5>
          <p className="text-muted-foreground leading-relaxed">
            {persona.primaryMotivation}
          </p>
        </div>

        {/* Trust Drivers */}
        <div>
          <h5 className="font-display text-2xl font-semibold text-foreground mb-4 flex items-center">
            <Shield className="text-primary mr-3" />
            Trust Drivers
          </h5>
          <ul className="space-y-2">
            {persona.trustDrivers.map((driver, index) => (
              <li key={index} className="flex items-center">
                <Check className="text-green-500 mr-3 h-4 w-4" />
                {driver}
              </li>
            ))}
          </ul>
        </div>

        {/* Access Context */}
        <div>
          <h5 className="font-display text-2xl font-semibold text-foreground mb-4 flex items-center">
            <Laptop className="text-primary mr-3" />
            Access Context
          </h5>
          <p className="text-muted-foreground leading-relaxed">
            {persona.accessContext}
          </p>
        </div>

        {/* Behavioral Insights */}
        <div>
          <h5 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center">
            <Brain className="text-primary mr-3" />
            Behavioral Insights
          </h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-accent/30 p-6 rounded-xl">
              <h6 className="font-semibold text-foreground mb-2">Decision Making</h6>
              <p className="text-muted-foreground text-sm">{persona.behavioralInsights.decisionMaking}</p>
            </div>
            <div className="bg-accent/30 p-6 rounded-xl">
              <h6 className="font-semibold text-foreground mb-2">Communication Style</h6>
              <p className="text-muted-foreground text-sm">{persona.behavioralInsights.communicationStyle}</p>
            </div>
            <div className="bg-accent/30 p-6 rounded-xl">
              <h6 className="font-semibold text-foreground mb-2">Learning Preference</h6>
              <p className="text-muted-foreground text-sm">{persona.behavioralInsights.learningPreference}</p>
            </div>
            <div className="bg-accent/30 p-6 rounded-xl">
              <h6 className="font-semibold text-foreground mb-2">Time Management</h6>
              <p className="text-muted-foreground text-sm">{persona.behavioralInsights.timeManagement}</p>
            </div>
          </div>
        </div>

        {/* User Voice Quotes */}
        <div>
          <h5 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center">
            <Quote className="text-primary mr-3" />
            User Voice Quotes
          </h5>
          <div className="space-y-4">
            {persona.userVoiceQuotes.map((quote, index) => (
              <blockquote key={index} className="bg-gray-50 p-6 rounded-xl border-l-4 border-primary">
                <p className="text-muted-foreground italic">"{quote}"</p>
              </blockquote>
            ))}
          </div>
        </div>

        {/* Ethics-Aware Assessment */}
        <div>
          <h5 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center">
            <Scale className="text-primary mr-3" />
            Ethics-Aware Assessment
          </h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="font-semibold text-red-600 mb-3">Potential Bias Considerations</h6>
              <ul className="space-y-2 text-sm">
                {persona.ethicsAssessment.biasConsiderations.map((bias, index) => (
                  <li key={index} className="flex items-start">
                    <TriangleAlert className="text-red-500 mr-2 mt-1 h-4 w-4" />
                    {bias}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="font-semibold text-green-600 mb-3">Inclusion Opportunities</h6>
              <ul className="space-y-2 text-sm">
                {persona.ethicsAssessment.inclusionOpportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 h-4 w-4" />
                    {opportunity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Strategic Impact */}
        <div>
          <h5 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center">
            <Swords className="text-primary mr-3" />
            Strategic Impact
          </h5>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h6 className="font-semibold text-blue-700 mb-3">Product</h6>
              <ul className="space-y-1 text-sm text-blue-600">
                {persona.strategicImpact.product.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <h6 className="font-semibold text-green-700 mb-3">Marketing</h6>
              <ul className="space-y-1 text-sm text-green-600">
                {persona.strategicImpact.marketing.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h6 className="font-semibold text-purple-700 mb-3">Design</h6>
              <ul className="space-y-1 text-sm text-purple-600">
                {persona.strategicImpact.design.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-primary/10 p-8 rounded-xl">
          <h5 className="font-display text-2xl font-semibold text-foreground mb-4 flex items-center">
            <Key className="text-primary mr-3" />
            Key Takeaway
          </h5>
          <p className="text-muted-foreground leading-relaxed">
            {persona.keyTakeaway}
          </p>
        </div>

        {/* Export Options */}
        {showExport && (
          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
            <Button 
              onClick={handleExportPDF}
              className="primary-button px-6 py-3 rounded-lg flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button 
              onClick={handleExportJSON}
              variant="secondary"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 flex items-center"
            >
              <Code className="mr-2 h-4 w-4" />
              Export JSON
            </Button>
            <Button 
              onClick={handleShare}
              variant="outline"
              className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 flex items-center"
            >
              <Share className="mr-2 h-4 w-4" />
              Share Link
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}