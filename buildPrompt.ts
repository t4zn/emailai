import { EmailInput } from './types';

export function buildPrompt(user: EmailInput): string {
  // Generate multiple random creative elements for more variety
  const creativeElements = [
    "Start with a bold industry insight that connects to their business challenges",
    "Open with a specific question about their recent strategic decisions",
    "Begin with a personal story that demonstrates deep industry understanding",
    "Lead with an observation about their company's unique market position",
    "Start with a metaphor that relates to their business model and challenges",
    "Open with a surprising statistic about their industry that affects them",
    "Begin with a direct statement about their company's untapped potential",
    "Lead with a specific problem you've identified in their competitive landscape",
    "Start with a provocative industry trend that impacts their business",
    "Open with a personal anecdote that shows deep market knowledge",
    "Begin with a bold prediction about their industry's future",
    "Lead with an observation about their company's unique culture or approach",
    "Start with a specific challenge their competitors are facing",
    "Open with a surprising insight about their target market",
    "Begin with a metaphor about business growth and opportunity"
  ];
  
  const writingStyles = [
    "confident and direct",
    "thoughtful and analytical", 
    "enthusiastic and energetic",
    "strategic and insightful",
    "personal and authentic",
    "professional yet conversational",
    "bold and innovative",
    "experienced and wise"
  ];
  
  const selectedElement = creativeElements[Math.floor(Math.random() * creativeElements.length)];
  const selectedStyle = writingStyles[Math.floor(Math.random() * writingStyles.length)];
  
  // Add random creative instructions for more variety
  const creativeInstructions = [
    "Include one surprising but relevant detail about your background",
    "Use a metaphor related to their business challenges",
    "Reference a specific industry trend that affects them",
    "Mention a unique perspective you bring from your experience",
    "Include a specific example of how you solved a similar problem",
    "Reference their company's recent news or achievements",
    "Use an analogy that connects your skills to their needs",
    "Include a bold prediction about their industry's future",
    "Reference a specific challenge their competitors face",
    "Use a personal story that demonstrates your understanding"
  ];
  
  const selectedInstructions = creativeInstructions
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .join('\n- ');
  
  // Add unique timestamp and random elements to ensure each generation is different
  const timestamp = Date.now();
  const randomSeed = Math.random();
  const uniqueElements = [
    `Include a reference to current market conditions (timestamp: ${timestamp})`,
    `Use a metaphor involving ${['technology', 'growth', 'innovation', 'transformation', 'scaling', 'disruption'][Math.floor(Math.random() * 6)]}`,
    `Reference a specific challenge from ${['Q1', 'Q2', 'Q3', 'Q4'][Math.floor(Math.random() * 4)]} of this year`,
    `Include a detail about ${['remote work', 'digital transformation', 'AI adoption', 'sustainability', 'customer experience', 'data analytics'][Math.floor(Math.random() * 6)]}`
  ];
  
  const uniqueElement = uniqueElements[Math.floor(Math.random() * uniqueElements.length)];
  
  return `
You are a brilliant, creative professional writer and business strategist. Your task is to analyze the provided information and create a completely original, intelligent cold email that demonstrates deep understanding and strategic thinking.

**CRITICAL REQUIREMENTS:**
- ANALYZE the information provided deeply - don't just use it as placeholders
- Create a completely fresh email that feels like it was written by a brilliant human
- Use the creative element: "${selectedElement}"
- Write in a ${selectedStyle} tone
- Make every sentence original and intelligent
- Show deep understanding of their business, industry, and challenges
- Use specific, vivid details and strategic insights
- Create emotional connection through intelligent storytelling
- Avoid any generic phrases or corporate speak
- Make it sound like a real person with unique insights wrote it
- If there are typos or errors in the input, correct them intelligently
- Don't just replace placeholders - create original content
- Include these creative elements:
- ${selectedInstructions}
- ${uniqueElement}

**DEEP ANALYSIS REQUIRED:**
- What does this company actually do? Research and understand their business model
- What challenges might they be facing in their industry?
- How does the applicant's background connect to their specific needs?
- What unique value can this person bring to this specific company?
- What makes this email different from every other cold email they receive?
- What industry trends are affecting their business?
- What competitive pressures might they be facing?

**Applicant Information (ANALYZE deeply, don't just use as placeholders):**
- Name: ${user.name}
- Current Role: ${user.role}
- Key Skills: ${user.skills.join(', ')}
- Experience: ${user.experience}
- Notable Projects: ${user.projects.join('; ')}
- Portfolio: ${user.portfolioLink || 'Not provided'}
- LinkedIn: ${user.linkedinLink || 'Not provided'}

**Target Company Analysis:**
- Company: ${user.companyName}
- Position: ${user.targetRole}
- Recipient: ${user.recruiterName || 'Hiring Manager'}
- Tone: ${user.tone || 'professional'}

**CREATIVE INSTRUCTIONS:**
1. Start with: "${selectedElement}"
2. Analyze their business and create a unique insight about their challenges
3. Connect the applicant's background to their specific needs (don't just list skills)
4. Present achievements as solutions to problems they might face
5. Include one surprising but relevant detail about your background
6. Create a memorable opening that's completely different from typical cold emails
7. End with a compelling, specific call-to-action that shows initiative
8. Use natural transitions between ideas
9. Include one metaphor or analogy related to their business
10. Make it sound like a real person with unique insights wrote it
11. Vary sentence structure dramatically (mix short and long sentences)
12. Use unexpected but relevant details that make it memorable
13. Include the unique element: ${uniqueElement}

**STYLE REQUIREMENTS:**
- Vary paragraph length dramatically (1-4 sentences per paragraph)
- Use different types of openings (question, statement, story, observation)
- Mix formal and casual language appropriately
- Include one unexpected detail that makes it memorable
- Use active voice and strong verbs
- Avoid corporate jargon and buzzwords
- Make every sentence count - no filler
- If there are typos in the input, correct them naturally
- Use creative transitions between ideas
- Include specific, vivid details that show deep understanding

**LENGTH:** 150-200 words, including subject line

**OUTPUT FORMAT:** 
Subject: [Creative subject line]
[Email body with natural formatting]

**IMPORTANT:** This should feel like a completely unique email written by a real person with deep insights, not a template with filled-in blanks. ANALYZE the information and create original, intelligent content. Every sentence should be original and intelligent. Make it so good that it stands out from every other cold email they receive. This generation is unique (timestamp: ${timestamp}, seed: ${randomSeed}).
`;
}
