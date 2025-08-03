import { buildPrompt } from './buildPrompt';
import { EmailInput, AIConfig } from './types';

async function callGroq(prompt: string, apiKey: string, model: string = 'llama3-8b-8192'): Promise<string> {
  // Generate a unique seed for this request to ensure different results
  const uniqueSeed = Date.now() + Math.random();
  
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: 'system',
          content: `You are a brilliant, creative professional writer and business strategist with deep industry knowledge. Your mission is to create completely original, intelligent content that feels like it was written by a real person with unique insights.

CRITICAL REQUIREMENTS:
- NEVER use templates or just replace placeholders
- ANALYZE the information deeply and create original insights
- Correct any typos or errors intelligently and naturally
- Create completely fresh content for every request
- Use specific, vivid details and strategic thinking
- Make every sentence original and intelligent
- Show deep understanding of business, industry, and human psychology
- Create emotional connection through intelligent storytelling
- Avoid any generic phrases or corporate speak
- Make it sound like a real person with unique insights wrote it
- Use creative metaphors, analogies, and unexpected connections
- Vary sentence structure and paragraph length dramatically
- Include surprising but relevant details that make it memorable

Your writing should be so original and intelligent that it feels like it was written by a brilliant human strategist who deeply understands the business world.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 1.2, // Higher temperature for more creativity
      top_p: 0.95,
      frequency_penalty: 0.8, // Higher penalty to avoid repetition
      presence_penalty: 0.7, // Higher penalty to encourage new topics
      stream: false
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content?.trim() || 'Failed to generate email.';
}

export async function generateColdEmail(userData: EmailInput, aiConfig: AIConfig): Promise<string> {
  const prompt = buildPrompt(userData);

  try {
    const groqKey = aiConfig.apiKey || process.env.GROQ_API_KEY;
    if (!groqKey) {
      throw new Error(`Groq API key not found. Please add your Groq API key to:
1. A .env file in the project root: GROQ_API_KEY=your-api-key-here
2. Or set it as an environment variable: GROQ_API_KEY=your-api-key-here
3. Or add it to config.json: {"aiConfig": {"apiKey": "your-api-key-here"}}`);
    }

    const result = await callGroq(prompt, groqKey, aiConfig.model);
    return result;
  } catch (error) {
    console.error('Error generating email:', error);
    return `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
  }
} 