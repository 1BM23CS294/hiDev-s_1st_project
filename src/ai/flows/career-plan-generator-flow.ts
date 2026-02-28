'use server';
/**
 * @fileOverview A placeholder AI flow for generating a 30-60-90 day career plan.
 *
 * - generateCareerPlan - A function that returns a mock career plan.
 * - GenerateCareerPlanInput - The input type for the function.
 * - CareerPlanOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCareerPlanInputSchema = z.object({
  currentRole: z.string().describe("The candidate's current job title."),
  targetRole: z.string().describe('A desired future role or goal.'),
  resumeSummary: z.string().describe('A summary of the candidate\'s resume.'),
});
export type GenerateCareerPlanInput = z.infer<typeof GenerateCareerPlanInputSchema>;

const CareerPlanOutputSchema = z.object({
  plan: z.object({
    thirtyDays: z.array(z.string()).describe('Actionable goals for the first 30 days.'),
    sixtyDays: z.array(z.string()).describe('Actionable goals for the next 30-60 days.'),
    ninetyDays: z.array(z.string()).describe('Actionable goals for the next 60-90 days.'),
  }).describe('A 30-60-90 day plan to progress towards the target role.'),
});
export type CareerPlanOutput = z.infer<typeof CareerPlanOutputSchema>;

export async function generateCareerPlan(
  input: GenerateCareerPlanInput
): Promise<CareerPlanOutput> {
  return generateCareerPlanFlow(input);
}

const generateCareerPlanFlow = ai.defineFlow(
  {
    name: 'generateCareerPlanFlow',
    inputSchema: GenerateCareerPlanInputSchema,
    outputSchema: CareerPlanOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      plan: {
        thirtyDays: [
          'Identify and bridge immediate skill gaps by taking an online course in a key missing technology.',
          'Conduct informational interviews with two professionals currently in your target role.',
          'Revise your resume and LinkedIn profile to align with the language of your target role.',
        ],
        sixtyDays: [
          'Begin working on a portfolio project that demonstrates your new skills.',
          'Contribute to a relevant open-source project.',
          'Attend one industry-specific webinar or virtual meetup.',
        ],
        ninetyDays: [
          'Present your portfolio project to a mentor or peer for feedback.',
          'Begin applying selectively to target roles that are a strong fit.',
          'Obtain a relevant certification in your field of interest.',
        ],
      },
    };
  }
);
