'use server';
/**
 * @fileOverview A placeholder AI flow for warning about obsolete skills.
 *
 * - skillObsolescenceWarning - A function that returns mock skill warnings.
 * - SkillObsolescenceWarningInput - The input type for the function.
 * - SkillObsolescenceWarningOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SkillObsolescenceWarningInputSchema = z.object({
  skills: z.array(z.string()).describe("A list of the candidate's skills."),
});
export type SkillObsolescenceWarningInput = z.infer<typeof SkillObsolescenceWarningInputSchema>;

const SkillObsolescenceWarningOutputSchema = z.object({
  warnings: z.array(z.object({
    skill: z.string(),
    riskLevel: z.enum(['High', 'Medium', 'Low']),
    suggestion: z.string(),
  })).describe('A list of skills at risk of becoming obsolete.'),
});
export type SkillObsolescenceWarningOutput = z.infer<typeof SkillObsolescenceWarningOutputSchema>;

export async function skillObsolescenceWarning(
  input: SkillObsolescenceWarningInput
): Promise<SkillObsolescenceWarningOutput> {
  return skillObsolescenceWarningFlow(input);
}

// This is a placeholder flow that returns mock data.
const skillObsolescenceWarningFlow = ai.defineFlow(
  {
    name: 'skillObsolescenceWarningFlow',
    inputSchema: SkillObsolescenceWarningInputSchema,
    outputSchema: SkillObsolescenceWarningOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing time
    
    const mockWarnings = [
      { skill: 'jQuery', riskLevel: 'High', suggestion: 'Focus on modern frameworks like React, Vue, or Svelte.' },
      { skill: 'AngularJS', riskLevel: 'High', suggestion: 'Migrate skills to the modern Angular (2+) or other popular frameworks.' },
      { skill: 'Manual Testing', riskLevel: 'Medium', suggestion: 'Expand expertise in automated testing frameworks like Cypress, Playwright, or Selenium.' },
      { skill: 'SQL', riskLevel: 'Low', suggestion: 'Still highly valuable, but consider adding experience with NoSQL databases like MongoDB or Firestore to broaden your skillset.' },
    ];
    
    const warnings = input.skills
        .map(skill => mockWarnings.find(w => w.skill.toLowerCase() === skill.toLowerCase()))
        .filter(Boolean) as { skill: string; riskLevel: "High" | "Medium" | "Low"; suggestion: string; }[];

    return { warnings };
  }
);
