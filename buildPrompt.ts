import { EmailInput } from './types';

export function buildPrompt(user: EmailInput): string {
  // Generate a random creative direction to ensure uniqueness
  const creativeDirections = [
    "Start with a surprising industry insight or trend",
    "Open with a specific question about their business challenges",
    "Begin with a personal story related to their industry",
    "Lead with a bold statement about their company's potential",
    "Start with an observation about their recent company news",
    "Open with a metaphor related to their business",
    "Begin with a specific problem you can solve for them",
    "Lead with a compliment about their company culture"
  ];
  
  const toneVariations = {
    'formal': ['professional', 'business-focused', 'corporate'],
    'friendly': ['approachable', 'conversational', 'personable'],
    'direct': ['straightforward', 'results-oriented', 'efficient']
  };
  
  const selectedDirection = creativeDirections[Math.floor(Math.random() * creativeDirections.length)];
  const toneStyle = toneVariations[user.tone || 'friendly'][Math.floor(Math.random() * 3)];
  
  return `
You are a creative professional writer tasked with crafting a completely unique, personalized cold email. Each email you write should be entirely original - no templates, no placeholders, no generic structures.

**CRITICAL REQUIREMENTS:**
- Create a completely fresh email every time
- Use the creative direction: "${selectedDirection}"
- Vary sentence structure and length dramatically
- Include unexpected but relevant details
- Make each email feel like it was written by a different person
- Use natural language patterns, not corporate speak
- Include specific, vivid details about achievements
- Create emotional connection through storytelling
- Use varied vocabulary and avoid repetitive phrases

**Applicant Profile:**
- Name: ${user.name}
- Current Role: ${user.role}
- Key Skills: ${user.skills.join(', ')}
- Experience: ${user.experience}
- Notable Projects: ${user.projects.join('; ')}
- Portfolio: ${user.portfolioLink || 'Not provided'}
- LinkedIn: ${user.linkedinLink || 'Not provided'}

**Target Opportunity:**
- Company: ${user.companyName}
- Position: ${user.targetRole}
- Recipient: ${user.recruiterName || 'Hiring Manager'}
- Tone Style: ${toneStyle}

**CREATIVE INSTRUCTIONS:**
1. Start with the creative direction: "${selectedDirection}"
2. Weave in 1-2 specific achievements as stories, not bullet points
3. Include a unique insight about ${user.companyName} that shows deep research
4. Use varied sentence structures - mix short punchy sentences with longer flowing ones
5. Include one surprising but relevant detail about your background
6. Create a memorable opening that's different from typical cold emails
7. End with a compelling, specific call-to-action
8. Use natural transitions between ideas
9. Include one metaphor or analogy related to their business
10. Make it sound like a real person wrote it, not AI

**STYLE VARIATIONS TO USE:**
- Vary paragraph length (1-3 sentences per paragraph)
- Use different types of openings (question, statement, story, observation)
- Mix formal and casual language appropriately
- Include one unexpected detail that makes it memorable
- Use active voice and strong verbs
- Avoid corporate jargon and buzzwords

**LENGTH:** 150-200 words, including subject line

**OUTPUT FORMAT:** 
Subject: [Creative subject line]
[Email body with natural formatting]

Remember: This should feel like a completely unique email written by a real person, not a template with filled-in blanks. Make it personal, specific, and memorable.
`;
}
