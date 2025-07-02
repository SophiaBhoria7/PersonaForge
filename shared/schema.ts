import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const personas = pgTable("personas", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  primaryMotivation: text("primary_motivation").notNull(),
  trustDrivers: json("trust_drivers").$type<string[]>().notNull(),
  accessContext: text("access_context").notNull(),
  behavioralInsights: json("behavioral_insights").$type<{
    decisionMaking: string;
    communicationStyle: string;
    learningPreference: string;
    timeManagement: string;
  }>().notNull(),
  userVoiceQuotes: json("user_voice_quotes").$type<string[]>().notNull(),
  ethicsAssessment: json("ethics_assessment").$type<{
    biasConsiderations: string[];
    inclusionOpportunities: string[];
  }>().notNull(),
  strategicImpact: json("strategic_impact").$type<{
    product: string[];
    marketing: string[];
    design: string[];
  }>().notNull(),
  keyTakeaway: text("key_takeaway").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const personaRequests = pgTable("persona_requests", {
  id: serial("id").primaryKey(),
  productType: text("product_type").notNull(),
  industry: text("industry").notNull(),
  primaryUserGoal: text("primary_user_goal").notNull(),
  productDescription: text("product_description").notNull(),
  userContext: text("user_context"),
  challenges: text("challenges"),
  ethicsConsiderations: text("ethics_considerations"),
  trustFactors: text("trust_factors"),
  additionalNotes: text("additional_notes"),
  generatedPersonaId: integer("generated_persona_id").references(() => personas.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPersonaSchema = createInsertSchema(personas).omit({
  id: true,
  createdAt: true,
});

export const insertPersonaRequestSchema = createInsertSchema(personaRequests).omit({
  id: true,
  createdAt: true,
  generatedPersonaId: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Persona = typeof personas.$inferSelect;
export type InsertPersona = z.infer<typeof insertPersonaSchema>;
export type PersonaRequest = typeof personaRequests.$inferSelect;
export type InsertPersonaRequest = z.infer<typeof insertPersonaRequestSchema>;
