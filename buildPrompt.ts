import { EmailInput } from './types';

export function buildPrompt(user: EmailInput): string {
  return `
You are an expert career coach and professional writer helping job applicants craft personalized, compelling cold emails. Your task is to create a unique, engaging email that stands out while maintaining professionalism.

**Applicant Information:**
- Name: ${user.name}
- Current Role: ${user.role}
- Key Skills: ${user.skills.join(', ')}
- Professional Experience: ${user.experience}
- Notable Achievements: ${user.projects.join('; ')}
- Portfolio: ${user.portfolioLink || 'Not provided'}
- LinkedIn: ${user.linkedinLink || 'Not provided'}

**Target Position:**
- Company: ${user.companyName}
- Role: ${user.targetRole}
- Recipient: ${user.recruiterName || 'Hiring Manager'}
- Tone: ${user.tone || 'professional yet conversational'}

**Instructions:**
1. Create a completely original email that doesn't follow a template
2. Make it sound natural and human-written, not AI-generated
3. Show genuine interest in the company and role
4. Highlight 1-2 key achievements that are most relevant to the target role
5. Include a specific detail about ${user.companyName} that shows you've researched them
6. Keep it concise (125-175 words)
7. Use a professional but approachable tone
8. End with a clear call-to-action
9. Avoid generic phrases like "I'm excited to apply" - be specific about why you're interested
10. Don't use placeholders - fill in all details based on the information provided

**Important:** Do not use any template structures or placeholders. The email should flow naturally as if written by a human professional. Focus on creating a personal connection and demonstrating value rather than listing qualifications.

Return only the email content with proper formatting (no code blocks, markdown, or JSON). Include a subject line at the top.
`;
}
