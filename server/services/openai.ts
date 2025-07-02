import OpenAI from "openai";
import type { InsertPersona, InsertPersonaRequest } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export async function generatePersona(request: InsertPersonaRequest): Promise<InsertPersona> {
  const prompt = `Generate a comprehensive user persona for a ${request.productType} in the ${request.industry} industry.

Product Description: ${request.productDescription}
Primary User Goal: ${request.primaryUserGoal}
User Context: ${request.userContext || "Not specified"}
Challenges: ${request.challenges || "Not specified"}
Ethics Considerations: ${request.ethicsConsiderations || "Not specified"}
Trust Factors: ${request.trustFactors || "Not specified"}
Additional Notes: ${request.additionalNotes || "Not specified"}

Generate a detailed persona in JSON format with the following structure:
{
  "name": "First Last Name",
  "title": "Job Title",
  "location": "City, State/Country",
  "primaryMotivation": "Detailed paragraph about what drives this user",
  "trustDrivers": ["4-5 trust factors as bullet points"],
  "accessContext": "Detailed paragraph about technology and environment",
  "behavioralInsights": {
    "decisionMaking": "How they make decisions",
    "communicationStyle": "How they communicate",
    "learningPreference": "How they prefer to learn",
    "timeManagement": "How they manage time"
  },
  "userVoiceQuotes": ["3 authentic-sounding quotes"],
  "ethicsAssessment": {
    "biasConsiderations": ["3-4 potential bias risks"],
    "inclusionOpportunities": ["3-4 inclusion suggestions"]
  },
  "strategicImpact": {
    "product": ["3-4 product recommendations"],
    "marketing": ["3-4 marketing recommendations"],
    "design": ["3-4 design recommendations"]
  },
  "keyTakeaway": "Summary paragraph with strategic insights"
}

Make the persona realistic, detailed, and actionable. Focus on motivation, behavior, and context rather than just demographics.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert UX researcher and strategist who creates detailed, empathetic user personas. Generate realistic, actionable personas that go beyond demographics to include motivation, trust, access, and behavioral insights."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      name: result.name,
      title: result.title,
      location: result.location,
      primaryMotivation: result.primaryMotivation,
      trustDrivers: result.trustDrivers,
      accessContext: result.accessContext,
      behavioralInsights: result.behavioralInsights,
      userVoiceQuotes: result.userVoiceQuotes,
      ethicsAssessment: result.ethicsAssessment,
      strategicImpact: result.strategicImpact,
      keyTakeaway: result.keyTakeaway,
    };
  } catch (error) {
    throw new Error(`Failed to generate persona: ${error.message}`);
  }
}
