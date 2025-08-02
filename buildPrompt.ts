import { EmailInput } from './types';

export function buildPrompt(user: EmailInput): string {
  return `
You are an expert HR communication specialist. Write a professional cold email from a job applicant to HR/recruiter following top-tier company standards.

Write a compelling cold email using these details:

APPLICANT PROFILE:
- Name: ${user.name}
- Current Position: ${user.role}
- Core Competencies: ${user.skills.join(', ')}
- Professional Background: ${user.experience}
- Key Achievements: ${user.projects.join(', ')}
- Professional Links: Portfolio: ${user.portfolioLink || 'Available upon request'}, LinkedIn: ${user.linkedinLink || 'Available upon request'}

TARGET OPPORTUNITY:
- Company: ${user.companyName}
- Position of Interest: ${user.targetRole}
- Contact: ${user.recruiterName || 'Hiring Manager'}
- Communication Style: ${user.tone || 'professional'}

EMAIL REQUIREMENTS:
- Use formal business email format
- Write in first person (applicant perspective)
- Subject line: Clear, professional, and specific to the role
- Opening: Professional greeting with recipient's name
- Introduction: Brief professional background and interest in the company
- Body: Highlight relevant skills, experience, and achievements that align with the role
- Value Proposition: Explain how your background can contribute to the company's success
- Call to Action: Professional request for further discussion
- Closing: Formal business closing with full name
- Tone: Confident, professional, and enthusiastic without being overly casual
- Length: Concise but comprehensive (150-200 words)
- Focus: Demonstrate understanding of the company and role requirements

FORMAT:
Subject: [Professional Subject Line]

Dear [Recruiter Name],

[Professional introduction and interest in the company]

[Relevant background and skills that match the role]

[Value proposition and achievements]

[Professional call to action]

Best regards,
[Full Name]

Return only the email text with proper formatting (no code, markdown, or JSON).
`;
} 