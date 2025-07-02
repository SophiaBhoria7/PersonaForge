import { CohereClient } from "cohere-ai";
import type { InsertPersonaRequest, InsertPersona } from "@shared/schema";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || "",
});

export async function generatePersona(request: InsertPersonaRequest): Promise<InsertPersona> {
  try {
    const prompt = `Create a comprehensive user persona based on the following information:

Product Type: ${request.productType}
Industry: ${request.industry}
Primary User Goal: ${request.primaryUserGoal}
Product Description: ${request.productDescription}
User Context: ${request.userContext || 'Not specified'}
Challenges: ${request.challenges || 'Not specified'}
Ethics Considerations: ${request.ethicsConsiderations || 'Not specified'}
Trust Factors: ${request.trustFactors || 'Not specified'}
Additional Notes: ${request.additionalNotes || 'Not specified'}

Please generate a detailed persona in JSON format with exactly these fields:
{
  "name": "Full name of the persona",
  "title": "Professional title",
  "location": "City, State/Country",
  "primaryMotivation": "Detailed description of what drives this person",
  "trustDrivers": ["Array of 3-4 trust factors"],
  "accessContext": "Description of their access to technology and resources",
  "behavioralInsights": {
    "decisionMaking": "How they make decisions",
    "communicationStyle": "How they communicate",
    "learningPreference": "How they prefer to learn",
    "timeManagement": "How they manage time"
  },
  "userVoiceQuotes": ["Array of 2-3 realistic quotes they might say"],
  "ethicsAssessment": {
    "biasConsiderations": ["Array of 2-3 potential bias issues to consider"],
    "inclusionOpportunities": ["Array of 2-3 ways to be more inclusive"]
  },
  "strategicImpact": {
    "product": ["Array of 2-3 product implications"],
    "marketing": ["Array of 2-3 marketing implications"],
    "design": ["Array of 2-3 design implications"]
  },
  "keyTakeaway": "One key insight about this persona for product teams"
}

Make the persona realistic, detailed, and actionable. Focus on psychological motivations, behavioral patterns, and strategic insights rather than just demographics. Ensure the response is valid JSON only, no additional text.`;

    const response = await cohere.chat({
      model: "command-r-plus",
      message: prompt,
      maxTokens: 2000,
      temperature: 0.7,
    });

    const generatedText = response.text;
    
    // Extract JSON from the response
    let jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // If no JSON found, try to parse the entire response
      jsonMatch = [generatedText];
    }

    const personaData = JSON.parse(jsonMatch[0]);

    // Validate required fields and provide defaults if missing
    const persona: InsertPersona = {
      name: personaData.name || "Generated Persona",
      title: personaData.title || "Professional",
      location: personaData.location || "Unknown Location",
      primaryMotivation: personaData.primaryMotivation || "Seeking efficiency and effectiveness",
      trustDrivers: Array.isArray(personaData.trustDrivers) ? personaData.trustDrivers : ["Security", "Reliability", "Transparency"],
      accessContext: personaData.accessContext || "Standard technology access",
      behavioralInsights: {
        decisionMaking: personaData.behavioralInsights?.decisionMaking || "Data-driven approach",
        communicationStyle: personaData.behavioralInsights?.communicationStyle || "Clear and direct",
        learningPreference: personaData.behavioralInsights?.learningPreference || "Hands-on learning",
        timeManagement: personaData.behavioralInsights?.timeManagement || "Structured and organized"
      },
      userVoiceQuotes: Array.isArray(personaData.userVoiceQuotes) ? personaData.userVoiceQuotes : ["I need tools that just work", "Time is my most valuable resource"],
      ethicsAssessment: {
        biasConsiderations: Array.isArray(personaData.ethicsAssessment?.biasConsiderations) ? personaData.ethicsAssessment.biasConsiderations : ["Consider diverse perspectives", "Avoid assumptions"],
        inclusionOpportunities: Array.isArray(personaData.ethicsAssessment?.inclusionOpportunities) ? personaData.ethicsAssessment.inclusionOpportunities : ["Ensure accessibility", "Support diverse workflows"]
      },
      strategicImpact: {
        product: Array.isArray(personaData.strategicImpact?.product) ? personaData.strategicImpact.product : ["Focus on usability", "Prioritize core features"],
        marketing: Array.isArray(personaData.strategicImpact?.marketing) ? personaData.strategicImpact.marketing : ["Highlight efficiency", "Show clear value"],
        design: Array.isArray(personaData.strategicImpact?.design) ? personaData.strategicImpact.design : ["Clean interface", "Intuitive navigation"]
      },
      keyTakeaway: personaData.keyTakeaway || "This persona values efficiency and clear communication above all else."
    };

    return persona;

  } catch (error) {
    console.error("Error generating persona with Cohere:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to generate persona: ${errorMessage}`);
  }
}