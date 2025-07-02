import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { insertPersonaRequestSchema, type InsertPersonaRequest, type Persona } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface PersonaFormProps {
  onPersonaGenerated: (persona: Persona) => void;
}

const formSchema = insertPersonaRequestSchema.extend({
  productType: insertPersonaRequestSchema.shape.productType,
  industry: insertPersonaRequestSchema.shape.industry,
});

export function PersonaForm({ onPersonaGenerated }: PersonaFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertPersonaRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productType: "",
      industry: "",
      primaryUserGoal: "",
      productDescription: "",
      userContext: "",
      challenges: "",
      ethicsConsiderations: "",
      trustFactors: "",
      additionalNotes: "",
    },
  });

  const onSubmit = async (data: InsertPersonaRequest) => {
    setIsGenerating(true);
    try {
      const response = await apiRequest('POST', '/api/personas/generate', data);
      const result = await response.json();
      
      onPersonaGenerated(result.persona);
      
      toast({
        title: "Persona Generated Successfully",
        description: "Your AI-powered persona has been created with comprehensive insights.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate persona. Please check your inputs and try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    const values = form.getValues();
    switch (currentStep) {
      case 1:
        return values.productType && values.industry && values.primaryUserGoal && values.productDescription;
      case 2:
        return true; // Optional step
      case 3:
        return true; // Optional step
      case 4:
        return true; // Optional step
      default:
        return false;
    }
  };

  const renderStepProgress = () => (
    <div className="mb-12">
      <div className="flex items-center justify-center space-x-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step <= currentStep ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {step}
            </div>
            <span className={`ml-2 font-medium ${
              step <= currentStep ? 'text-primary' : 'text-gray-600'
            }`}>
              {step === 1 && 'Product Basics'}
              {step === 2 && 'User Context'}
              {step === 3 && 'Ethics & Trust'}
              {step === 4 && 'Additional Notes'}
            </span>
            {step < 4 && <div className="w-8 h-0.5 bg-gray-300 ml-4"></div>}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {renderStepProgress()}

          {/* Step 1: Product Basics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h4 className="font-display text-2xl font-semibold text-foreground mb-6">Step 1: Product Basics</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="productType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product type..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="web-application">Web Application</SelectItem>
                          <SelectItem value="mobile-app">Mobile App</SelectItem>
                          <SelectItem value="saas-platform">SaaS Platform</SelectItem>
                          <SelectItem value="ecommerce-site">E-commerce Site</SelectItem>
                          <SelectItem value="content-platform">Content Platform</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="media">Media</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="primaryUserGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary User Goal</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="What is the main goal users are trying to achieve with your product?"
                        className="h-24"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Provide a brief description of your product and its core features..."
                        className="h-32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 2: User Context */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h4 className="font-display text-2xl font-semibold text-foreground mb-6">Step 2: User Context</h4>
              
              <FormField
                control={form.control}
                name="userContext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Context & Environment</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Describe the typical environment and context where users interact with your product..."
                        className="h-32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="challenges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Challenges & Pain Points</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="What challenges or frustrations do users typically face in this domain?"
                        className="h-32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 3: Ethics & Trust */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h4 className="font-display text-2xl font-semibold text-foreground mb-6">Step 3: Ethics & Trust</h4>
              
              <FormField
                control={form.control}
                name="ethicsConsiderations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ethics & Bias Considerations</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Are there any specific ethical considerations, potential biases, or inclusivity concerns for your product?"
                        className="h-32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="trustFactors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trust & Credibility Factors</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="What factors would make users trust your product? What builds credibility in your industry?"
                        className="h-32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 4: Additional Notes */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h4 className="font-display text-2xl font-semibold text-foreground mb-6">Step 4: Additional Notes</h4>
              
              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Context (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Any additional information that would help create a more accurate persona for your product..."
                        className="h-40"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h5 className="font-semibold text-blue-800 mb-2">Ready to Generate</h5>
                <p className="text-blue-700 text-sm">
                  We'll use AI to analyze your inputs and create a comprehensive persona with behavioral insights, 
                  authentic quotes, bias assessments, and strategic recommendations.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200">
            <Button 
              type="button"
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            {currentStep < 4 ? (
              <Button 
                type="button"
                onClick={nextStep}
                disabled={!canProceed()}
                className="primary-button px-8 py-3 rounded-lg flex items-center"
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="submit"
                disabled={isGenerating}
                className="primary-button px-8 py-3 rounded-lg flex items-center"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Persona...
                  </>
                ) : (
                  <>
                    Generate Persona
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
}
