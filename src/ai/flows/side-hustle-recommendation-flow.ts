'use server';
/**
 * @fileOverview A placeholder AI flow for recommending side hustles.
 *
 * - recommendSideHustles - A function that returns mock side hustle ideas.
 * - RecommendSideHustlesInput - The input type for the function.
 * - SideHustleOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecommendSideHustlesInputSchema = z.object({
  skills: z.array(z.string()).describe("A list of the candidate's primary skills."),
});
export type RecommendSideHustlesInput = z.infer<typeof RecommendSideHustlesInputSchema>;

const SideHustleOutputSchema = z.object({
  sideHustles: z.array(z.object({
    title: z.string().describe('The name of the side hustle.'),
    description: z.string().describe('A description of what the side hustle involves.'),
    potentialEarning: z.string().describe('A qualitative assessment of the earning potential (e.g., "Low", "Medium", "High").'),
  })).describe('A list of recommended side hustles.'),
});
export type SideHustleOutput = z.infer<typeof SideHustleOutputSchema>;

export async function recommendSideHustles(
  input: RecommendSideHustlesInput
): Promise<SideHustleOutput> {
  return recommendSideHustlesFlow(input);
}

const recommendSideHustlesFlow = ai.defineFlow(
  {
    name: 'recommendSideHustlesFlow',
    inputSchema: RecommendSideHustlesInputSchema,
    outputSchema: SideHustleOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      sideHustles: [
        {
          title: 'Freelance Technical Writer',
          description: 'Leverage your expertise to write blog posts, documentation, or tutorials for tech companies. Your skills in modern development make you a perfect fit.',
          potentialEarning: 'Medium',
        },
        {
          title: 'Build and Sell a Small SaaS Product',
          description: 'Identify a niche problem and build a small software-as-a-service solution to solve it. This can generate passive income once established.',
          potentialEarning: 'High',
        },
        {
          title: 'Offer 1-on-1 Mentoring or Tutoring',
          description: 'Help students or junior developers learn the skills you already have. This is a rewarding way to earn extra income and solidify your own knowledge.',
          potentialEarning: 'Medium',
        },
      ],
    };
  }
);
