export interface EmailInput {
  name: string;
  role: string;
  skills: string[];
  experience: string;
  projects: string[];
  portfolioLink?: string;
  linkedinLink?: string;
  companyName: string;
  targetRole: string;
  recruiterName?: string;
  tone?: 'formal' | 'friendly' | 'direct';
}

export interface AIConfig {
  provider: 'groq';
  apiKey?: string; // Optional since we'll get it from env
  model?: string;
}

export interface EmailGenerationOptions {
  userData: EmailInput;
  aiConfig: AIConfig;
} 