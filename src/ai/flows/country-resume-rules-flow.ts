'use server';
/**
 * @fileOverview A placeholder AI flow for providing country-specific resume rules.
 *
 * - getCountryResumeRules - A function that returns mock rules.
 * - GetCountryResumeRulesInput - The input type for the function.
 * - CountryResumeRulesOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GetCountryResumeRulesInputSchema = z.object({
  country: z.string().describe("The target country code (e.g., 'DEU' for Germany)."),
});
export type GetCountryResumeRulesInput = z.infer<typeof GetCountryResumeRulesInputSchema>;

const CountryResumeRulesOutputSchema = z.object({
  countryName: z.string().describe("The full name of the country."),
  keyRules: z.array(z.string()).describe('A list of key resume formatting and content rules for that country.'),
});
export type CountryResumeRulesOutput = z.infer<typeof CountryResumeRulesOutputSchema>;

export async function getCountryResumeRules(
  input: GetCountryResumeRulesInput
): Promise<CountryResumeRulesOutput> {
  return getCountryResumeRulesFlow(input);
}

const countryRulesData: { [key: string]: { name: string; rules: string[] } } = {
    DEU: {
        name: "Germany",
        rules: [
            "A professional photo is highly recommended, often considered mandatory.",
            "Include personal details like date of birth and marital status (though this is becoming less common).",
            "Resumes (Lebenslauf) are typically chronological and can be longer than 2 pages.",
            "Sign and date your resume at the end.",
        ],
    },
    JPN: {
        name: "Japan",
        rules: [
            "A standardized resume format called 'Rirekisho' is often required.",
            "Must include a photo, which should be professional and taken within the last 3 months.",
            "Emphasis is placed on education and work history in a very structured manner.",
            "Handwritten resumes are still sometimes preferred for certain positions.",
        ],
    },
    GBR: {
        name: "United Kingdom",
        rules: [
            "Do not include a photo or personal information like age or marital status.",
            "Typically a 2-page maximum length.",
            "Start with a 'Personal Profile' or 'Professional Summary' to grab attention.",
            "Use clear, concise language and bullet points with action verbs.",
        ],
    },
    USA: {
         name: "United States",
        rules: [
            "Never include a photo, age, or any other personal data that could lead to discrimination.",
            "1-page resume is standard for most professionals; 2 pages for senior-level or academic roles.",
            "Tailor your resume for each application using keywords from the job description.",
            "Focus on quantifiable achievements rather than just listing responsibilities."
        ]
    }
};

const getCountryResumeRulesFlow = ai.defineFlow(
  {
    name: 'getCountryResumeRulesFlow',
    inputSchema: GetCountryResumeRulesInputSchema,
    outputSchema: CountryResumeRulesOutputSchema,
  },
  async (input) => {
    await new Promise(resolve => setTimeout(resolve, 200)); // Simulate processing time
    const data = countryRulesData[input.country] || { name: "Unknown Country", rules: ["No specific rules found for this country. General best practices apply."]};
    return {
      countryName: data.name,
      keyRules: data.rules,
    };
  }
);
