'use server';
/**
 * @fileOverview A placeholder AI flow for extracting skills from a GitHub profile.
 *
 * - extractGithubSkills - A function that returns mock GitHub data.
 * - ExtractGithubSkillsInput - The input type for the function.
 * - GithubSkillExtractionOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExtractGithubSkillsInputSchema = z.object({
  githubUrl: z.string().url().describe('The URL of the user\'s GitHub profile.'),
});
export type ExtractGithubSkillsInput = z.infer<typeof ExtractGithubSkillsInputSchema>;

const GithubSkillExtractionOutputSchema = z.object({
  extractedSkills: z.array(z.string()).describe('A list of skills inferred from repository topics and descriptions.'),
  topLanguages: z.array(z.object({
    language: z.string(),
    percentage: z.number(),
  })).describe('A breakdown of the most used languages across the user\'s repositories.'),
  contributionStreak: z.number().describe('The user\'s current contribution streak.'),
  followers: z.number().describe('Number of GitHub followers.'),
});
export type GithubSkillExtractionOutput = z.infer<typeof GithubSkillExtractionOutputSchema>;

export async function extractGithubSkills(
  input: ExtractGithubSkillsInput
): Promise<GithubSkillExtractionOutput> {
  return extractGithubSkillsFlow(input);
}

const extractGithubSkillsFlow = ai.defineFlow(
  {
    name: 'extractGithubSkillsFlow',
    inputSchema: ExtractGithubSkillsInputSchema,
    outputSchema: GithubSkillExtractionOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 600)); // Simulate processing time
    return {
      extractedSkills: ["react", "typescript", "nodejs", "docker", "ci-cd", "jest"],
      topLanguages: [
        { language: "TypeScript", percentage: 45 },
        { language: "JavaScript", percentage: 30 },
        { language: "HTML", percentage: 15 },
        { language: "Shell", percentage: 10 },
      ],
      contributionStreak: 12,
      followers: 42,
    };
  }
);
