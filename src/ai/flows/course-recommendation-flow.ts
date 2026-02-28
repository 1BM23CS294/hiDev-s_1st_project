'use server';
/**
 * @fileOverview A placeholder AI flow for recommending online courses.
 *
 * - recommendCourses - A function that returns mock course recommendations.
 * - RecommendCoursesInput - The input type for the function.
 * - CourseRecommendationOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecommendCoursesInputSchema = z.object({
  resumeSummary: z.string().describe('A summary of the candidate\'s resume.'),
  missingSkills: z.array(z.string()).describe('A list of skills the candidate is missing.'),
});
export type RecommendCoursesInput = z.infer<typeof RecommendCoursesInputSchema>;

const CourseRecommendationOutputSchema = z.object({
  courses: z.array(z.object({
    title: z.string().describe('The title of the recommended course.'),
    platform: z.string().describe('The platform offering the course (e.g., Coursera, Udemy).'),
    url: z.string().url().describe('A direct link to the course.'),
    description: z.string().describe('A brief explanation of why this course is a good fit.'),
  })).describe('A list of recommended online courses.'),
});
export type CourseRecommendationOutput = z.infer<typeof CourseRecommendationOutputSchema>;

export async function recommendCourses(
  input: RecommendCoursesInput
): Promise<CourseRecommendationOutput> {
  return recommendCoursesFlow(input);
}

const recommendCoursesFlow = ai.defineFlow(
  {
    name: 'recommendCoursesFlow',
    inputSchema: RecommendCoursesInputSchema,
    outputSchema: CourseRecommendationOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 450));
    const skillToLearn = input.missingSkills[0] || 'Data Visualization';
    return {
      courses: [
        {
          title: `Complete Guide to ${skillToLearn}`,
          platform: 'Udemy',
          url: 'https://www.udemy.com/',
          description: `This highly-rated course provides a comprehensive introduction to ${skillToLearn}, covering all the fundamentals needed to get started.`,
        },
        {
          title: `${skillToLearn} Specialization`,
          platform: 'Coursera',
          url: 'https://www.coursera.org/',
          description: `Offered by a top university, this specialization offers a deep dive into advanced topics and includes hands-on projects to build your portfolio.`,
        },
      ],
    };
  }
);
