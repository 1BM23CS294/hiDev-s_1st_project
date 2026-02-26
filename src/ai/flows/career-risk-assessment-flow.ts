'use server';
/**
 * @fileOverview A placeholder AI flow for assessing career risk based on a resume.
 *
 * - careerRiskAssessment - A function that returns a mock risk assessment.
 * - CareerRiskAssessmentInput - The input type for the function.
 * - CareerRiskAssessmentOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CareerRiskAssessmentInputSchema = z.object({
  jobTitle: z.string().describe("The primary job title from the resume."),
  industry: z.string().describe("The primary industry of the candidate's experience."),
  skills: z.array(z.string()).describe("A list of the candidate's skills."),
});
export type CareerRiskAssessmentInput = z.infer<typeof CareerRiskAssessmentInputSchema>;

const CareerRiskAssessmentOutputSchema = z.object({
  riskScore: z.number().min(0).max(100).describe('A score from 0-100, where 100 is high risk.'),
  stabilityOutlook: z.string().describe('A qualitative assessment of the career stability (e.g., "Stable", "Moderate Volatility", "High-Growth Field").'),
  mitigationStrategies: z.array(z.string()).describe('A list of actionable strategies to reduce career risk.'),
});
export type CareerRiskAssessmentOutput = z.infer<typeof CareerRiskAssessmentOutputSchema>;

export async function careerRiskAssessment(
  input: CareerRiskAssessmentInput
): Promise<CareerRiskAssessmentOutput> {
  return careerRiskAssessmentFlow(input);
}

// This is a placeholder flow that returns mock data.
const careerRiskAssessmentFlow = ai.defineFlow(
  {
    name: 'careerRiskAssessmentFlow',
    inputSchema: CareerRiskAssessmentInputSchema,
    outputSchema: CareerRiskAssessmentOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing time
    
    let score = 35;
    if (input.industry.toLowerCase().includes('tech')) score += 10;
    if (input.skills.includes('AI') || input.skills.includes('Machine Learning')) score -= 20;


    return {
      riskScore: Math.max(0, Math.min(100, score)),
      stabilityOutlook: "Moderate Volatility with High-Growth Potential",
      mitigationStrategies: [
        "Develop skills in adjacent high-demand areas like cloud computing or data engineering.",
        "Build a strong professional network outside of your current company.",
        "Contribute to open-source projects to demonstrate expertise and adaptability.",
      ],
    };
  }
);
