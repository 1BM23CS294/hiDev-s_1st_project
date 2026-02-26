'use server';
/**
 * @fileOverview A placeholder AI flow for assessing internship readiness.
 *
 * - internshipReadiness - A function that returns a mock readiness score.
 * - InternshipReadinessInput - The input type for the function.
 * - InternshipReadinessOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const InternshipReadinessInputSchema = z.object({
  resumeSummary: z.string().describe("A summary of the student's resume, including projects and education."),
});
export type InternshipReadinessInput = z.infer<typeof InternshipReadinessInputSchema>;

const InternshipReadinessOutputSchema = z.object({
  readinessScore: z.number().min(0).max(100).describe('A score from 0-100 indicating readiness for an internship in their field.'),
  feedback: z.array(z.string()).describe('Specific feedback and suggestions for improvement.'),
  projectHighlights: z.array(z.string()).describe('Highlights of projects that are most valuable for internship applications.'),
});
export type InternshipReadinessOutput = z.infer<typeof InternshipReadinessOutputSchema>;

export async function internshipReadiness(
  input: InternshipReadinessInput
): Promise<InternshipReadinessOutput> {
  return internshipReadinessFlow(input);
}

// This is a placeholder flow that returns mock data.
const internshipReadinessFlow = ai.defineFlow(
  {
    name: 'internshipReadinessFlow',
    inputSchema: InternshipReadinessInputSchema,
    outputSchema: InternshipReadinessOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing time
    
    return {
      readinessScore: 78,
      feedback: [
        "Quantify the impact of your personal projects. Instead of 'built a web app', try 'built a web app used by 50+ beta testers'.",
        "Add a 'Technical Skills' section that is easy for recruiters to scan quickly.",
        "Your coursework is relevant, but consider adding 1-2 more complex projects to your portfolio.",
      ],
      projectHighlights: [
        "The 'AI-Powered Chess Engine' project demonstrates strong problem-solving and algorithm skills.",
        "Your contribution to the 'Open-Source Library' shows an ability to collaborate on a real-world codebase.",
      ]
    };
  }
);
