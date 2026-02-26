'use server';
/**
 * @fileOverview A placeholder AI flow for "roasting" a resume.
 *
 * - roastResume - A function that returns a mock resume roast.
 * - RoastResumeInput - The input type for the function.
 * - RoastResumeOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RoastResumeInputSchema = z.object({
  resumeSummary: z.string().describe("A summary of the candidate's resume."),
});
export type RoastResumeInput = z.infer<typeof RoastResumeInputSchema>;

const RoastResumeOutputSchema = z.object({
  roastLevel: z.enum(['Mild', 'Medium', 'Spicy']),
  roast: z.string().describe('A funny but insightful roast of the resume.'),
  constructiveTakeaways: z.array(z.string()).describe('Actionable advice hidden in the roast.'),
});
export type RoastResumeOutput = z.infer<typeof RoastResumeOutputSchema>;

export async function roastResume(
  input: RoastResumeInput
): Promise<RoastResumeOutput> {
  return roastResumeFlow(input);
}

// This is a placeholder flow that returns mock data.
const roastResumeFlow = ai.defineFlow(
  {
    name: 'roastResumeFlow',
    inputSchema: RoastResumeInputSchema,
    outputSchema: RoastResumeOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing time
    
    return {
      roastLevel: "Medium",
      roast: "Is this a resume or a list of every software you've ever heard of? 'Proficient in Microsoft Word' is like saying you're 'proficient in breathing'. Let's hope your real skills are less obvious.",
      constructiveTakeaways: [
        "Focus on impact rather than just listing technologies.",
        "Remove overly common skills to make space for unique strengths.",
        "Tailor the skills section to the job you're applying for.",
      ]
    };
  }
);
