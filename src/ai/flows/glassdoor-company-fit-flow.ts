'use server';
/**
 * @fileOverview A placeholder AI flow for assessing company fit using Glassdoor data.
 *
 * - getGlassdoorCompanyFit - A function that returns mock company fit data.
 * - GetGlassdoorCompanyFitInput - The input type for the function.
 * - GlassdoorCompanyFitOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GetGlassdoorCompanyFitInputSchema = z.object({
  companyName: z.string().describe('The name of the company to look up.'),
});
export type GetGlassdoorCompanyFitInput = z.infer<typeof GetGlassdoorCompanyFitInputSchema>;

const GlassdoorCompanyFitOutputSchema = z.object({
  overallRating: z.number().min(0).max(5).describe('The overall company rating on Glassdoor.'),
  cultureAndValuesRating: z.number().min(0).max(5).describe('The culture and values rating.'),
  workLifeBalanceRating: z.number().min(0).max(5).describe('The work/life balance rating.'),
  pros: z.array(z.string()).describe('A list of common "pros" mentioned in reviews.'),
  cons: z.array(z.string()).describe('A list of common "cons" mentioned in reviews.'),
});
export type GlassdoorCompanyFitOutput = z.infer<typeof GlassdoorCompanyFitOutputSchema>;

export async function getGlassdoorCompanyFit(
  input: GetGlassdoorCompanyFitInput
): Promise<GlassdoorCompanyFitOutput> {
  return getGlassdoorCompanyFitFlow(input);
}

const getGlassdoorCompanyFitFlow = ai.defineFlow(
  {
    name: 'getGlassdoorCompanyFitFlow',
    inputSchema: GetGlassdoorCompanyFitInputSchema,
    outputSchema: GlassdoorCompanyFitOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 700)); // Simulate processing time
    return {
      overallRating: 4.2,
      cultureAndValuesRating: 4.5,
      workLifeBalanceRating: 3.8,
      pros: ["Great team and smart colleagues", "Interesting and challenging projects", "Good benefits package"],
      cons: ["Management can be disorganized at times", "Fast-paced environment can lead to burnout", "Legacy code can be difficult to work with"],
    };
  }
);
