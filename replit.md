# PersonaForge

## Overview

PersonaForge is an AI-powered tool for generating comprehensive user personas that go beyond traditional demographics. The application helps product builders, strategists, and researchers create rich, multidimensional personas based on motivation, trust drivers, behavioral insights, and ethics-aware considerations. Built as a full-stack web application with a modern React frontend and Express.js backend.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **AI Integration**: OpenAI GPT-4o for persona generation
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### Database Design
The application uses a PostgreSQL database with three main tables:
- `users`: User authentication and management
- `personas`: Generated persona data with structured JSON fields
- `persona_requests`: Input data and metadata for persona generation requests

## Key Components

### Persona Generation Engine
- **AI Model**: OpenAI GPT-4o for generating detailed personas
- **Input Processing**: Multi-step form collecting product details, user context, and ethics considerations
- **Output Structure**: Comprehensive persona profiles including motivation, trust drivers, behavioral insights, and strategic implications

### Form System
- **Multi-step Form**: Progressive data collection across multiple steps
- **Validation**: Zod schemas for type-safe form validation
- **User Experience**: Guided prompts to extract deeper user insights

### Persona Display
- **Rich Cards**: Visual persona profiles with structured sections
- **Export Options**: PDF and JSON export capabilities
- **Sharing**: Shareable links for persona profiles

### UI Design System
- **Color Palette**: Deep indigo (#4B5D67) with soft cream background (#F7F6F2)
- **Typography**: Inter/Lato for body text, Playfair Display for headings
- **Theme**: Professional, empathetic design focused on readability and emotional resonance

## Data Flow

1. **Input Collection**: User fills multi-step form with product and user context details
2. **AI Processing**: Form data sent to OpenAI API with structured prompts
3. **Persona Generation**: AI returns comprehensive persona data
4. **Storage**: Both request and generated persona stored in PostgreSQL
5. **Display**: Persona rendered in structured card format
6. **Export/Share**: PDF generation and shareable links for distribution

## External Dependencies

### Core Dependencies
- **Database**: Neon serverless PostgreSQL for data persistence
- **AI Service**: OpenAI API for persona generation
- **Session Store**: PostgreSQL-based session management

### UI Dependencies
- **Component Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form with Hookform/resolvers for validation

### Development Tools
- **Type Safety**: TypeScript across frontend and backend
- **Database Migration**: Drizzle Kit for schema management
- **Build Process**: Vite for frontend, esbuild for backend compilation

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React application to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations handle schema updates

### Environment Configuration
- **Database**: `DATABASE_URL` for PostgreSQL connection
- **AI Service**: `OPENAI_API_KEY` for OpenAI API access
- **Server**: Node.js production server with static file serving

### Production Setup
- Single-server deployment with Express serving both API and static files
- PostgreSQL database with connection pooling
- Environment-based configuration for development vs production

## Changelog
- July 02, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.