'use server';
/**
 * @fileOverview A placeholder AI flow for aggregating interview experiences for a company.
 *
 * - getInterviewExperience - A function that returns mock interview experience.
 * - GetInterviewExperienceInput - The input type for the function.
 * - InterviewExperienceOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GetInterviewExperienceInputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  jobTitle: z.string().describe('The job title being applied for.'),
});
export type GetInterviewExperienceInput = z.infer<typeof GetInterviewExperienceInputSchema>;

const InterviewExperienceOutputSchema = z.object({
  aggregatedExperiences: z.array(z.string()).describe('A list of summarized, anonymous interview experiences.'),
  commonQuestions: z.array(z.string()).describe('A list of frequently asked interview questions for the role.'),
});
export type InterviewExperienceOutput = z.infer<typeof InterviewExperienceOutputSchema>;

export async function getInterviewExperience(
  input: GetInterviewExperienceInput
): Promise<InterviewExperienceOutput> {
  return getInterviewExperienceFlow(input);
}

const getInterviewExperienceFlow = ai.defineFlow(
  {
    name: 'getInterviewExperienceFlow',
    inputSchema: GetInterviewExperienceInputSchema,
    outputSchema: InterviewExperienceOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 550)); // Simulate processing time
    return {
      aggregatedExperiences: [
        "The process involved a phone screen, a technical take-home assignment, and a final round with 3 on-site interviews.",
        "One candidate mentioned a focus on system design questions in the final round.",
        "Another candidate noted that behavioral questions were centered around teamwork and handling tight deadlines."
      ],
      commonQuestions: [
        "Tell me about a time you had a disagreement with a team member and how you resolved it.",
        "How would you design a scalable microservices architecture for a real-time data feed?",
        "What are the pros and cons of using a NoSQL database vs. a relational database for this application?",
      ]
    };
  }
);
