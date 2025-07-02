import { users, personas, personaRequests, type User, type InsertUser, type Persona, type InsertPersona, type PersonaRequest, type InsertPersonaRequest } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPersona(persona: InsertPersona): Promise<Persona>;
  getPersona(id: number): Promise<Persona | undefined>;
  createPersonaRequest(request: InsertPersonaRequest): Promise<PersonaRequest>;
  updatePersonaRequest(id: number, updates: Partial<PersonaRequest>): Promise<PersonaRequest | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private personas: Map<number, Persona>;
  private personaRequests: Map<number, PersonaRequest>;
  private currentUserId: number;
  private currentPersonaId: number;
  private currentRequestId: number;

  constructor() {
    this.users = new Map();
    this.personas = new Map();
    this.personaRequests = new Map();
    this.currentUserId = 1;
    this.currentPersonaId = 1;
    this.currentRequestId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPersona(insertPersona: InsertPersona): Promise<Persona> {
    const id = this.currentPersonaId++;
    const persona: Persona = { 
      ...insertPersona, 
      id, 
      createdAt: new Date() 
    };
    this.personas.set(id, persona);
    return persona;
  }

  async getPersona(id: number): Promise<Persona | undefined> {
    return this.personas.get(id);
  }

  async createPersonaRequest(insertRequest: InsertPersonaRequest): Promise<PersonaRequest> {
    const id = this.currentRequestId++;
    const request: PersonaRequest = { 
      ...insertRequest,
      userContext: insertRequest.userContext || null,
      challenges: insertRequest.challenges || null,
      ethicsConsiderations: insertRequest.ethicsConsiderations || null,
      trustFactors: insertRequest.trustFactors || null,
      additionalNotes: insertRequest.additionalNotes || null,
      id, 
      createdAt: new Date(),
      generatedPersonaId: null
    };
    this.personaRequests.set(id, request);
    return request;
  }

  async updatePersonaRequest(id: number, updates: Partial<PersonaRequest>): Promise<PersonaRequest | undefined> {
    const request = this.personaRequests.get(id);
    if (!request) return undefined;
    
    const updatedRequest = { ...request, ...updates };
    this.personaRequests.set(id, updatedRequest);
    return updatedRequest;
  }
}

export const storage = new MemStorage();
