'use server';

import {
  extractResumeInformation,
  generateHiringRecommendations,
  generateResumeMatchScore,
  predictSalaryRange,
  generateCareerPersonalityProfile,
  analyzeVideoResume,
  predictWorkLifeBalance,
  findNetworkingOpportunities,
  rewriteResume,
  roastResume,
  confidenceBooster,
  personalBrandCheck,
  hiddenStrengthDiscovery,
  careerRiskAssessment,
  skillObsolescenceWarning,
  resumeVersionControl,
  internshipReadiness,
} from '@/ai/flows';
import type {
  AnalyzedCandidate,
  RewriteResumeOutput,
} from '@/lib/types';
import { z } from 'zod';

const fileSchema = z.instanceof(File).refine(file => file.size > 0, 'A file is required.');

const AnalyzeResumeSchema = z.object({
  jobDescription: z.string().min(50, 'Job description must be at least 50 characters.'),
  resumeFile: fileSchema.refine(file => file.size < 5 * 1024 * 1024, 'Resume file size must be less than 5MB.'),
  country: z.string().min(2, 'Please select a country.'),
  
  // Analysis Mode
  analysisMode: z.enum(['normal', 'fresher', 'executive']).default('normal'),

  // Optional Analyses (Original)
  predictSalary: z.coerce.boolean().default(true),
  analyzeVideo: z.coerce.boolean().default(false),
  videoFile: fileSchema.refine(file => file.size < 50 * 1024 * 1024, 'Video file size must be less than 50MB.').optional(),
  predictWorkLife: z.coerce.boolean().default(true),
  findNetworking: z.coerce.boolean().default(true),
  rewriteResume: z.coerce.boolean().default(true),

  // New Analysis Modules
  roastResume: z.coerce.boolean().default(true),
  confidenceBooster: z.coerce.boolean().default(true),
  personalBrandCheck: z.coerce.boolean().default(true),
  hiddenStrengthDiscovery: z.coerce.boolean().default(true),
  careerRiskAssessment: z.coerce.boolean().default(true),
  skillObsolescenceWarning: z.coerce.boolean().default(true),
  resumeVersionControl: z.coerce.boolean().default(true),
  internshipReadiness: z.coerce.boolean().default(true),
});


type FormState = {
  success: boolean;
  message: string;
  data?: AnalyzedCandidate;
  errors?: {
    jobDescription?: string[];
    resumeFile?: string[];
    country?: string[];
    videoFile?: string[];
    _form?: string[];
  };
};

export async function analyzeResume(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = AnalyzeResumeSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { 
    jobDescription, 
    resumeFile, 
    country,
    analysisMode,
    // Original optional analyses
    predictSalary,
    analyzeVideo,
    videoFile,
    predictWorkLife,
    findNetworking,
    rewriteResume: shouldRewriteResume,
    // New optional analyses
    roastResume: shouldRoast,
    confidenceBooster: shouldBoost,
    personalBrandCheck: shouldCheckBrand,
    hiddenStrengthDiscovery: shouldDiscoverStrengths,
    careerRiskAssessment: shouldAssessRisk,
    skillObsolescenceWarning: shouldWarnSkills,
    resumeVersionControl: shouldVersion,
    internshipReadiness: shouldAssessInternship,
  } = validatedFields.data;

  try {
    const fileToDataUri = async (file: File) => {
        const fileBuffer = await file.arrayBuffer();
        return `data:${file.type};base64,${Buffer.from(fileBuffer).toString('base64')}`;
    }

    // 1. Convert resume to data URI
    const resumeDataUri = await fileToDataUri(resumeFile);

    // 2. Start core analysis, with specific error handling for parsing
    let extractedInfo;
    try {
        extractedInfo = await extractResumeInformation({ resumeDataUri });
    } catch (e) {
        console.error("Error during extractResumeInformation:", e);
        // This is a critical failure point. Provide a detailed error message.
        throw new Error("The AI failed to read the resume. The file may be corrupted, password-protected, or in an unsupported format. Please try another file.");
    }

    if (!extractedInfo || !extractedInfo.name) {
       throw new Error('Could not parse resume. The AI could not find key details like the candidate\'s name. Please ensure the file is a valid and clearly structured resume.');
    }
    
    const resumeExperienceSummary = extractedInfo.summary || extractedInfo.experience.map(exp => `${exp.title} at ${exp.company}: ${exp.description}`).join('\n');
    const resumeFullTextForProfiling = `${extractedInfo.summary || ''}\n\nSkills: ${extractedInfo.skills.join(', ')}\n\nExperience:\n${resumeExperienceSummary}`;

    // 3. Perform analysis with score first.
    const analysis = await generateResumeMatchScore({ resumeSkills: extractedInfo.skills, resumeExperience: resumeExperienceSummary, jobDescription });
    if (!analysis) throw new Error('Core analysis failed to generate a score.');

    // 4. Perform all other analyses in parallel, now with the correct score for recommendations.
    const allOtherPromises = [
        generateHiringRecommendations({
            parsedResume: {
                name: extractedInfo.name,
                email: extractedInfo.email,
                skills: extractedInfo.skills,
                experience: extractedInfo.experience,
                education: extractedInfo.education,
                summary: extractedInfo.summary,
            },
            jobDescription,
            overallScore: analysis.overallScore, // Use the real score
        }),
        generateCareerPersonalityProfile({ resumeSummary: resumeFullTextForProfiling }),
        predictSalary ? predictSalaryRange({ jobDescription, resumeSkills: extractedInfo.skills, resumeExperience: resumeExperienceSummary, country }) : Promise.resolve(null),
        (analyzeVideo && videoFile) ? analyzeVideoResume({ videoDataUri: await fileToDataUri(videoFile) }) : Promise.resolve(null),
        predictWorkLife ? predictWorkLifeBalance({ jobDescription, resumeExperience: resumeExperienceSummary }) : Promise.resolve(null),
        findNetworking ? findNetworkingOpportunities({ jobTitle: extractedInfo.experience[0]?.title || 'Professional', skills: extractedInfo.skills, location: country }) : Promise.resolve(null),
        ...(shouldRewriteResume ? [
            rewriteResume({ style: 'ats', summary: extractedInfo.summary, experience: extractedInfo.experience, skills: extractedInfo.skills }),
            rewriteResume({ style: 'creative', summary: extractedInfo.summary, experience: extractedInfo.experience, skills: extractedInfo.skills }),
            rewriteResume({ style: 'executive', summary: extractedInfo.summary, experience: extractedInfo.experience, skills: extractedInfo.skills }),
        ] : [Promise.resolve(null), Promise.resolve(null), Promise.resolve(null)]),
        shouldRoast ? roastResume({ resumeSummary: resumeFullTextForProfiling }) : Promise.resolve(null),
        shouldBoost ? confidenceBooster({ resumeSummary: resumeFullTextForProfiling }) : Promise.resolve(null),
        shouldCheckBrand ? personalBrandCheck({ resumeSummary: resumeFullTextForProfiling }) : Promise.resolve(null),
        shouldDiscoverStrengths ? hiddenStrengthDiscovery({ resumeExperience: resumeExperienceSummary, resumeSkills: extractedInfo.skills }) : Promise.resolve(null),
        shouldAssessRisk ? careerRiskAssessment({ jobTitle: extractedInfo.experience[0]?.title || 'Unknown', industry: 'General', skills: extractedInfo.skills }) : Promise.resolve(null),
        shouldWarnSkills ? skillObsolescenceWarning({ skills: extractedInfo.skills }) : Promise.resolve(null),
        shouldVersion ? resumeVersionControl({ resumeSummary: extractedInfo.summary || '', jobDescription }) : Promise.resolve(null),
        (shouldAssessInternship || analysisMode === 'fresher') ? internshipReadiness({ resumeSummary: resumeFullTextForProfiling }) : Promise.resolve(null),
    ];

    const [
        recommendations, personalityProfile,
        salaryPrediction, videoAnalysis, workLifeBalance, networking,
        atsRewrite, creativeRewrite, executiveRewrite,
        roast, confidenceReport, brandCheck, hiddenStrengths, riskAssessment, skillWarning, versionSuggestion, internshipReport,
    ] = await Promise.all(allOtherPromises);
    
    if (!recommendations) throw new Error('Hiring recommendations failed to generate.');

    const result: AnalyzedCandidate = {
      id: crypto.randomUUID(),
      fileName: resumeFile.name,
      candidate: extractedInfo,
      analysis,
      recommendations,
      personalityProfile,
      // Optional analysis results
      salaryPrediction: salaryPrediction || undefined,
      videoAnalysis: videoAnalysis || undefined,
      workLifeBalance: workLifeBalance || undefined,
      networking: networking || undefined,
      resumeRewrite: (atsRewrite && creativeRewrite && executiveRewrite) ? {
        ats: atsRewrite as RewriteResumeOutput,
        creative: creativeRewrite as RewriteResumeOutput,
        executive: executiveRewrite as RewriteResumeOutput,
      } : undefined,
      // New analysis results
      roast: roast || undefined,
      confidenceReport: confidenceReport || undefined,
      brandCheck: brandCheck || undefined,
      hiddenStrengths: hiddenStrengths || undefined,
      riskAssessment: riskAssessment || undefined,
      skillWarning: skillWarning || undefined,
      versionSuggestion: versionSuggestion || undefined,
      internshipReport: internshipReport || undefined,
    };

    return { success: true, message: 'Analysis complete.', data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during analysis.';
    return {
      success: false,
      message: 'Analysis failed.',
      errors: { _form: [errorMessage] }
    };
  }
}
