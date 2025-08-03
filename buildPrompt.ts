import { EmailInput } from './types';

export function buildPrompt(user: EmailInput): string {
  // Generate multiple random elements to ensure uniqueness
  const openingStyles = [
    "Start with a bold industry insight that connects to their business",
    "Open with a specific question about their recent challenges",
    "Begin with a personal story related to their industry",
    "Lead with an observation about their company's unique position",
    "Start with a metaphor that relates to their business model",
    "Open with a surprising statistic about their industry",
    "Begin with a direct statement about their company's potential",
    "Lead with a specific problem you've identified in their space"
  ];
  
  const achievementStyles = [
    "Weave achievements into compelling stories with specific outcomes",
    "Present achievements as solutions to problems they might face",
    "Frame achievements as evidence of strategic thinking",
    "Connect achievements to their company's specific needs",
    "Present achievements as examples of scalable impact",
    "Frame achievements as proof of innovative problem-solving"
  ];
  
  const closingStyles = [
    "End with a specific, actionable proposal",
    "Close with a compelling question that requires their response",
    "End with a bold statement about mutual opportunity",
    "Close with a specific next step that shows initiative",
    "End with a unique insight about their company's future",
    "Close with a direct challenge to their current approach"
  ];
  
  const selectedOpening = openingStyles[Math.floor(Math.random() * openingStyles.length)];
  const selectedAchievement = achievementStyles[Math.floor(Math.random() * achievementStyles.length)];
  const selectedClosing = closingStyles[Math.floor(Math.random() * closingStyles.length)];
  
  return `
You are a creative professional writer who crafts completely original, intelligent emails. Your task is to write a unique cold email that demonstrates deep understanding and creativity.

**CRITICAL REQUIREMENTS:**
- Create a completely fresh email that feels like it was written by a brilliant human
- Use the opening style: "${selectedOpening}"
- Use the achievement style: "${selectedAchievement}"
- Use the closing style: "${selectedClosing}"
- Make every sentence original and intelligent
- Show deep understanding of their business and industry
- Use specific, vivid details and insights
- Create emotional connection through intelligent storytelling
- Avoid any generic phrases or corporate speak
- Make it sound like a real person with unique insights wrote it

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
- Tone: ${user.tone || 'professional'}

**CREATIVE INSTRUCTIONS:**
1. Start with: "${selectedOpening}"
2. Weave in achievements using: "${selectedAchievement}"
3. Include a unique insight about ${user.companyName} that shows deep research
4. Use varied sentence structures - mix short punchy sentences with longer flowing ones
5. Include one surprising but relevant detail about your background
6. Create a memorable opening that's completely different from typical cold emails
7. End with: "${selectedClosing}"
8. Use natural transitions between ideas
9. Include one metaphor or analogy related to their business
10. Make it sound like a real person with unique insights wrote it

**STYLE REQUIREMENTS:**
- Vary paragraph length dramatically (1-4 sentences per paragraph)
- Use different types of openings (question, statement, story, observation)
- Mix formal and casual language appropriately
- Include one unexpected detail that makes it memorable
- Use active voice and strong verbs
- Avoid corporate jargon and buzzwords
- Make every sentence count - no filler

**LENGTH:** 150-200 words, including subject line

**OUTPUT FORMAT:** 
Subject: [Creative subject line]
[Email body with natural formatting]

**IMPORTANT:** This should feel like a completely unique email written by a real person with deep insights, not a template with filled-in blanks. Make it personal, specific, and memorable. Every sentence should be original and intelligent.
`;
}
