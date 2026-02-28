'use server';
/**
 * @fileOverview A placeholder AI flow for suggesting professional certifications.
 *
 * - suggestCertifications - A function that returns mock certification suggestions.
 * - SuggestCertificationsInput - The input type for the function.
 * - CertificationSuggestionOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestCertificationsInputSchema = z.object({
  jobTitle: z.string().describe("The candidate's target job title."),
  skills: z.array(z.string()).describe("The candidate's existing skills."),
});
export type SuggestCertificationsInput = z.infer<typeof SuggestCertificationsInputSchema>;

const CertificationSuggestionOutputSchema = z.object({
  certifications: z.array(z.object({
    name: z.string().describe('The name of the certification.'),
    issuingBody: z.string().describe('The organization that issues the certification (e.g., AWS, Google, PMI).'),
    relevance: z.string().describe('Why this certification is relevant for the candidate.'),
  })).describe('A list of recommended certifications.'),
});
export type CertificationSuggestionOutput = z.infer<typeof CertificationSuggestionOutputSchema>;

export async function suggestCertifications(
  input: SuggestCertificationsInput
): Promise<CertificationSuggestionOutput> {
  return suggestCertificationsFlow(input);
}

const suggestCertificationsFlow = ai.defineFlow(
  {
    name: 'suggestCertificationsFlow',
    inputSchema: SuggestCertificationsInputSchema,
    outputSchema: CertificationSuggestionOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      certifications: [
        {
          name: 'AWS Certified Solutions Architect - Associate',
          issuingBody: 'Amazon Web Services',
          relevance: `For a ${input.jobTitle}, having a foundational cloud certification is critical. This will validate your skills in designing and deploying scalable systems on AWS.`,
        },
        {
          name: 'Certified Kubernetes Application Developer (CKAD)',
          issuingBody: 'The Linux Foundation',
          relevance: 'Demonstrates your ability to work with containerized applications, a skill highly sought after for modern software development roles.',
        },
      ],
    };
  }
);
