import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generatePersona } from "./services/openai";
import { generatePersonaPDF, generatePersonaJSON, generateShareLink } from "./services/pdf";
import { insertPersonaRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate persona endpoint
  app.post("/api/personas/generate", async (req, res) => {
    try {
      const validatedRequest = insertPersonaRequestSchema.parse(req.body);
      
      // Store the request
      const personaRequest = await storage.createPersonaRequest(validatedRequest);
      
      // Generate persona using OpenAI
      const generatedPersona = await generatePersona(validatedRequest);
      
      // Store the generated persona
      const persona = await storage.createPersona(generatedPersona);
      
      // Update request with generated persona ID
      await storage.updatePersonaRequest(personaRequest.id, { 
        generatedPersonaId: persona.id 
      });
      
      res.json({ persona, requestId: personaRequest.id });
    } catch (error) {
      console.error("Error generating persona:", error);
      res.status(500).json({ 
        error: "Failed to generate persona", 
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Get persona by ID
  app.get("/api/personas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const persona = await storage.getPersona(id);
      
      if (!persona) {
        return res.status(404).json({ error: "Persona not found" });
      }
      
      res.json(persona);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch persona" });
    }
  });

  // Export persona as PDF
  app.get("/api/personas/:id/export/pdf", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const persona = await storage.getPersona(id);
      
      if (!persona) {
        return res.status(404).json({ error: "Persona not found" });
      }
      
      const pdfData = generatePersonaPDF(persona);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${persona.name}_persona.pdf"`);
      res.send(Buffer.from(pdfData.split(',')[1], 'base64'));
    } catch (error) {
      res.status(500).json({ error: "Failed to generate PDF" });
    }
  });

  // Export persona as JSON
  app.get("/api/personas/:id/export/json", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const persona = await storage.getPersona(id);
      
      if (!persona) {
        return res.status(404).json({ error: "Persona not found" });
      }
      
      const jsonData = generatePersonaJSON(persona);
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="${persona.name}_persona.json"`);
      res.send(jsonData);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate JSON" });
    }
  });

  // Get share link
  app.get("/api/personas/:id/share", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const persona = await storage.getPersona(id);
      
      if (!persona) {
        return res.status(404).json({ error: "Persona not found" });
      }
      
      const shareLink = generateShareLink(id);
      res.json({ shareLink });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate share link" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
