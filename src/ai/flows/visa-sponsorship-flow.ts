'use server';
/**
 * @fileOverview A placeholder AI flow for assessing visa sponsorship readiness.
 *
 * - assessVisaSponsorship - A function that returns a mock assessment.
 * - AssessVisaSponsorshipInput - The input type for the function.
 * - VisaSponsorshipOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AssessVisaSponsorshipInputSchema = z.object({
  country: z.string().describe("The target country code (e.g., 'USA')."),
  jobTitle: z.string().describe('The target job title.'),
  skills: z.array(z.string()).describe("The candidate's key skills."),
});
export type AssessVisaSponsorshipInput = z.infer<typeof AssessVisaSponsorshipInputSchema>;

const VisaSponsorshipOutputSchema = z.object({
  readinessScore: z.number().min(0).max(100).describe('A score from 0-100 indicating the likelihood of being eligible for visa sponsorship.'),
  explanation: z.string().describe('An explanation of the factors influencing the score.'),
});
export type VisaSponsorshipOutput = z.infer<typeof VisaSponsorshipOutputSchema>;

export async function assessVisaSponsorship(
  input: AssessVisaSponsorshipInput
): Promise<VisaSponsorshipOutput> {
  return assessVisaSponsorshipFlow(input);
}

const assessVisaSponsorshipFlow = ai.defineFlow(
  {
    name: 'assessVisaSponsorshipFlow',
    inputSchema: AssessVisaSponsorshipInputSchema,
    outputSchema: VisaSponsorshipOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing time
    
    let score = 50;
    if (['software engineer', 'data scientist', 'cloud architect'].includes(input.jobTitle.toLowerCase())) {
        score += 25;
    }
     if (input.skills.some(s => ['ai', 'machine learning', 'cybersecurity'].includes(s.toLowerCase()))) {
        score += 15;
    }
    
    return {
      readinessScore: Math.min(100, score),
      explanation: "The candidate's profession is in a high-demand tech field, which generally increases the chances of visa sponsorship in countries like the USA. The presence of specialized skills like AI/ML further strengthens the case. This score is an estimate and not a guarantee.",
    };
  }
);
