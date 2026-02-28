'use server';
/**
 * @fileOverview A placeholder AI flow for estimating freelance pricing.
 *
 * - estimateFreelancePricing - A function that returns mock pricing estimates.
 * - EstimateFreelancePricingInput - The input type for the function.
 * - FreelancePricingOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { countries } from '@/lib/countries';

const EstimateFreelancePricingInputSchema = z.object({
  jobTitle: z.string().describe('The type of freelance work (e.g., "Web Developer", "Graphic Designer").'),
  experienceLevel: z.enum(['junior', 'mid', 'senior']).describe('The freelancer\'s experience level.'),
  country: z.string().describe('The freelancer\'s country of residence.'),
});
export type EstimateFreelancePricingInput = z.infer<typeof EstimateFreelancePricingInputSchema>;

const FreelancePricingOutputSchema = z.object({
  hourlyRate: z.object({
    min: z.number(),
    max: z.number(),
  }).describe('The estimated hourly rate range.'),
  projectRate: z.object({
    min: z.number(),
    max: z.number(),
  }).describe('The estimated project rate range for a typical small-to-medium project.'),
  currency: z.string().describe('The currency for the estimates (e.g., "USD").'),
  factors: z.array(z.string()).describe('Factors influencing this pricing estimate.'),
});
export type FreelancePricingOutput = z.infer<typeof FreelancePricingOutputSchema>;

export async function estimateFreelancePricing(
  input: EstimateFreelancePricingInput
): Promise<FreelancePricingOutput> {
  return estimateFreelancePricingFlow(input);
}

const estimateFreelancePricingFlow = ai.defineFlow(
  {
    name: 'estimateFreelancePricingFlow',
    inputSchema: EstimateFreelancePricingInputSchema,
    outputSchema: FreelancePricingOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 350));
    
    const countryData = countries.find(c => c.value === input.country) || countries.find(c => c.value === 'USA');
    const currency = countryData?.currency || 'USD';

    let baseMin = 40;
    if (input.experienceLevel === 'mid') baseMin = 65;
    if (input.experienceLevel === 'senior') baseMin = 90;

    return {
      hourlyRate: { min: baseMin, max: baseMin + 30 },
      projectRate: { min: baseMin * 20, max: (baseMin + 30) * 40 },
      currency: currency,
      factors: [
        `Based on a ${input.experienceLevel}-level ${input.jobTitle} in ${countryData?.label}.`,
        'Rates can vary significantly based on project complexity, client budget, and specific technologies used.',
        'This is an estimate; market research is recommended for precise pricing.',
      ],
    };
  }
);
