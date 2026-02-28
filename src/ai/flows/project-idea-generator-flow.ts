'use server';
/**
 * @fileOverview A placeholder AI flow for generating project ideas based on missing skills.
 *
 * - generateProjectIdeas - A function that returns mock project ideas.
 * - GenerateProjectIdeasInput - The input type for the function.
 * - ProjectIdeaOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateProjectIdeasInputSchema = z.object({
  missingSkills: z.array(z.string()).describe("A list of skills the candidate is missing for a target role."),
});
export type GenerateProjectIdeasInput = z.infer<typeof GenerateProjectIdeasInputSchema>;

const ProjectIdeaOutputSchema = z.object({
  projectIdeas: z.array(z.object({
    title: z.string().describe('The title of the project idea.'),
    description: z.string().describe('A brief description of the project and what it entails.'),
    relevantSkills: z.array(z.string()).describe('Which of the missing skills this project would help develop.'),
  })).describe('A list of project ideas to build skills.'),
});
export type ProjectIdeaOutput = z.infer<typeof ProjectIdeaOutputSchema>;

export async function generateProjectIdeas(
  input: GenerateProjectIdeasInput
): Promise<ProjectIdeaOutput> {
  return generateProjectIdeasFlow(input);
}

const generateProjectIdeasFlow = ai.defineFlow(
  {
    name: 'generateProjectIdeasFlow',
    inputSchema: GenerateProjectIdeasInputSchema,
    outputSchema: ProjectIdeaOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const skill = input.missingSkills[0] || 'Cloud Infrastructure';
    return {
      projectIdeas: [
        {
          title: `Deploy a Personal Blog with ${skill}`,
          description: `Build and deploy a full-stack personal blog application. Use a modern frontend framework and a backend service, and deploy it using Docker and a cloud provider like AWS or Google Cloud. This will give you hands-on experience with ${skill}.`,
          relevantSkills: [skill],
        },
        {
          title: 'CI/CD Pipeline for a Sample App',
          description: 'Take an existing sample application and build a complete Continuous Integration and Continuous Deployment pipeline for it using GitHub Actions or Jenkins. The pipeline should automatically test, build, and deploy the application.',
          relevantSkills: ['CI/CD', skill],
        },
      ],
    };
  }
);
