'use server';
/**
 * @fileOverview A placeholder AI flow for discovering hidden strengths from a resume.
 *
 * - hiddenStrengthDiscovery - A function that returns mock hidden strengths.
 * - HiddenStrengthDiscoveryInput - The input type for the function.
 * - HiddenStrengthDiscoveryOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const HiddenStrengthDiscoveryInputSchema = z.object({
  resumeExperience: z.string().describe("A summary of the candidate's work experience."),
  resumeSkills: z.array(z.string()).describe("A list of the candidate's skills."),
});
export type HiddenStrengthDiscoveryInput = z.infer<typeof HiddenStrengthDiscoveryInputSchema>;

const HiddenStrengthDiscoveryOutputSchema = z.object({
  hiddenStrengths: z.array(z.object({
    strength: z.string().describe('The identified hidden strength (e.g., "Cross-Functional Communication").'),
    evidence: z.string().describe('The evidence from the resume that suggests this strength.'),
  })).describe('A list of discovered strengths that are not explicitly stated.'),
});
export type HiddenStrengthDiscoveryOutput = z.infer<typeof HiddenStrengthDiscoveryOutputSchema>;

export async function hiddenStrengthDiscovery(
  input: HiddenStrengthDiscoveryInput
): Promise<HiddenStrengthDiscoveryOutput> {
  return hiddenStrengthDiscoveryFlow(input);
}

// This is a placeholder flow that returns mock data.
const hiddenStrengthDiscoveryFlow = ai.defineFlow(
  {
    name: 'hiddenStrengthDiscoveryFlow',
    inputSchema: HiddenStrengthDiscoveryInputSchema,
    outputSchema: HiddenStrengthDiscoveryOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing time
    
    return {
      hiddenStrengths: [
        {
          strength: "Cross-Functional Communication",
          evidence: "Experience descriptions mention collaboration with 'marketing', 'sales', and 'product' teams, indicating strong communication skills beyond the technical domain.",
        },
        {
          strength: "Resilience & Adaptability",
          evidence: "Successfully navigated a 'company-wide pivot' and 'integrated a newly acquired team', suggesting an ability to thrive in changing environments.",
        },
        {
            strength: "Mentorship & Team Building",
            evidence: "Repeatedly 'onboarded new hires' and 'led project sub-teams', which points to informal leadership and a commitment to team growth."
        }
      ],
    };
  }
);
