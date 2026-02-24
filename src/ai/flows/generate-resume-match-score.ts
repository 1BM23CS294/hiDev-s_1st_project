'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a match score
 * between a resume's extracted skills/experience and a job description.
 *
 * - generateResumeMatchScore - A function that calculates the match score.
 * - GenerateResumeMatchScoreInput - The input type for the function.
 * - GenerateResumeMatchScoreOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResumeMatchScoreInputSchema = z.object({
  resumeSkills: z.array(z.string()).describe('A list of skills extracted from the resume.'),
  resumeExperience: z.string().describe('A summary of the experience extracted from the resume.'),
  jobDescription: z.string().describe('The full job description text.'),
});
export type GenerateResumeMatchScoreInput = z.infer<typeof GenerateResumeMatchScoreInputSchema>;

const GenerateResumeMatchScoreOutputSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe('A match score between 0 and 100, indicating how well the resume matches the job description.'),
  explanation: z
    .string()
    .describe('A detailed explanation for the given match score, highlighting strengths and weaknesses.'),
});
export type GenerateResumeMatchScoreOutput = z.infer<typeof GenerateResumeMatchScoreOutputSchema>;

export async function generateResumeMatchScore(
  input: GenerateResumeMatchScoreInput
): Promise<GenerateResumeMatchScoreOutput> {
  return generateResumeMatchScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumeMatchScorePrompt',
  input: {schema: GenerateResumeMatchScoreInputSchema},
  output: {schema: GenerateResumeMatchScoreOutputSchema},
  prompt: `You are an expert HR recruiter assistant tasked with evaluating a candidate's suitability for a job based on their resume skills and experience against a given job description.

Compare the provided resume skills and experience with the job description. Based on this comparison, generate a match score from 0 to 100, where 100 indicates a perfect match.

Also, provide a detailed explanation for the generated match score, highlighting key strengths that align with the job requirements and areas where the candidate might be lacking.

Resume Skills:
{{#each resumeSkills}}- {{{this}}}
{{/each}}

Resume Experience:
{{{resumeExperience}}}

Job Description:
{{{jobDescription}}}

Consider all aspects including required skills, years of experience, relevant duties, and any other implied requirements in the job description.`,
});

const generateResumeMatchScoreFlow = ai.defineFlow(
  {
    name: 'generateResumeMatchScoreFlow',
    inputSchema: GenerateResumeMatchScoreInputSchema,
    outputSchema: GenerateResumeMatchScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
