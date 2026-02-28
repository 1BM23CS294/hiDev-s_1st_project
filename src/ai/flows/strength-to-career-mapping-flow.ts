'use server';
/**
 * @fileOverview A placeholder AI flow for mapping strengths to potential career paths.
 *
 * - mapStrengthsToCareers - A function that returns mock career path suggestions.
 * - MapStrengthsToCareersInput - The input type for the function.
 * - CareerMappingOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MapStrengthsToCareersInputSchema = z.object({
  keyStrengths: z.array(z.string()).describe("A list of the candidate's key strengths."),
});
export type MapStrengthsToCareersInput = z.infer<typeof MapStrengthsToCareersInputSchema>;

const CareerMappingOutputSchema = z.object({
  careerPaths: z.array(z.object({
    path: z.string().describe('The suggested career path or role.'),
    description: z.string().describe('A description of this career path.'),
    alignment: z.string().describe('How the candidate\'s strengths align with this path.'),
  })).describe('A list of potential career paths based on strengths.'),
});
export type CareerMappingOutput = z.infer<typeof CareerMappingOutputSchema>;

export async function mapStrengthsToCareers(
  input: MapStrengthsToCareersInput
): Promise<CareerMappingOutput> {
  return mapStrengthsToCareersFlow(input);
}

const mapStrengthsToCareersFlow = ai.defineFlow(
  {
    name: 'mapStrengthsToCareersFlow',
    inputSchema: MapStrengthsToCareersInputSchema,
    outputSchema: CareerMappingOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const strength = input.keyStrengths[0] || 'Project Leadership';
    return {
      careerPaths: [
        {
          path: 'Product Manager',
          description: 'A role focused on defining product strategy, features, and vision from a user-centric and business-oriented perspective.',
          alignment: `Your strength in '${strength}' aligns perfectly with the need for product managers to guide cross-functional teams and drive projects to completion.`,
        },
        {
          path: 'Engineering Manager',
          description: 'A leadership role focused on managing a team of engineers, fostering their growth, and ensuring the technical execution of projects.',
          alignment: `The ability to lead projects and mentor others is a direct prerequisite for moving into an Engineering Manager role.`,
        },
      ],
    };
  }
);
