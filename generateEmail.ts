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
      max_tokens: 500,
      temperature: 0.7,
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