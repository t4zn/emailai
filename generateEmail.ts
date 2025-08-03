import { buildPrompt } from './buildPrompt';
import { EmailInput, AIConfig } from './types';

async function callGroq(prompt: string, apiKey: string, model: string = 'llama3-8b-8192'): Promise<string> {
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
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.9,
      top_p: 0.95,
      frequency_penalty: 0.3,
      presence_penalty: 0.2,
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
      throw new Error('Groq API key not found in config or GROQ_API_KEY environment variable');
    }

    const result = await callGroq(prompt, groqKey, aiConfig.model);
    return result;
  } catch (error) {
    console.error('Error generating email:', error);
    return `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
  }
}

export async function generateMultipleEmails(userData: EmailInput, aiConfig: AIConfig, count: number = 3): Promise<string[]> {
  const emails: string[] = [];
  
  for (let i = 0; i < count; i++) {
    try {
      const email = await generateColdEmail(userData, aiConfig);
      emails.push(email);
      
      // Add a small delay between requests to ensure variety
      if (i < count - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error(`Error generating email ${i + 1}:`, error);
      emails.push(`Error generating email ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  return emails;
} 