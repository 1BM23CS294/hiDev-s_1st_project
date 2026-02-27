import type {
  ExtractResumeInformationOutput,
  GenerateHiringRecommendationsOutput,
  GenerateResumeMatchScoreOutput,
  PredictSalaryRangeOutput,
  GenerateCareerPersonalityProfileOutput,
  VideoAnalysisOutput,
  WorkLifeBalanceOutput,
  NetworkingOpportunitiesOutput,
  RewriteResumeOutput,
  RoastResumeOutput,
  ConfidenceBoosterOutput,
  PersonalBrandCheckOutput,
  HiddenStrengthDiscoveryOutput,
  CareerRiskAssessmentOutput,
  SkillObsolescenceWarningOutput,
  ResumeVersionControlOutput,
  InternshipReadinessOutput,
  RankCandidateOutput,
  BenchmarkCandidateOutput,
  GetHiringFunnelInsightsOutput,
  GithubSkillExtractionOutput,
  LinkedInSyncOutput,
  KaggleProfileAnalysisOutput,
  PortfolioWebsiteAnalysisOutput,
  FreelanceProfileOptimizationOutput,
  GlassdoorCompanyFitOutput,
  InterviewExperienceOutput,
  ResumeExportOutput,
  CountryResumeRulesOutput,
  VisaSponsorshipOutput,
} from '@/ai/flows';

export type Candidate = ExtractResumeInformationOutput;
export type AnalysisResult = GenerateResumeMatchScoreOutput;
export type HiringRecommendations = GenerateHiringRecommendationsOutput;
export type SalaryPredictionResult = PredictSalaryRangeOutput;
export type CareerPersonalityProfile = GenerateCareerPersonalityProfileOutput;

// Original optional types
export type { VideoAnalysisOutput } from '@/ai/flows';
export type { WorkLifeBalanceOutput } from '@/ai/flows';
export type { NetworkingOpportunitiesOutput } from '@/ai/flows';
export type { RewriteResumeOutput } from '@/ai/flows';

// New optional types
export type { RoastResumeOutput } from '@/ai/flows';
export type { ConfidenceBoosterOutput } from '@/ai/flows';
export type { PersonalBrandCheckOutput } from '@/ai/flows';
export type { HiddenStrengthDiscoveryOutput } from '@/ai/flows';
export type { CareerRiskAssessmentOutput } from '@/ai/flows';
export type { SkillObsolescenceWarningOutput } from '@/ai/flows';
export type { ResumeVersionControlOutput } from '@/ai/flows';
export type { InternshipReadinessOutput } from '@/ai/flows';
export type { RankCandidateOutput } from '@/ai/flows';
export type { BenchmarkCandidateOutput } from '@/ai/flows';
export type { GetHiringFunnelInsightsOutput } from '@/ai/flows';

// Integrations & International
export type { GithubSkillExtractionOutput } from '@/ai/flows';
export type { LinkedInSyncOutput } from '@/ai/flows';
export type { KaggleProfileAnalysisOutput } from '@/ai/flows';
export type { PortfolioWebsiteAnalysisOutput } from '@/ai/flows';
export type { FreelanceProfileOptimizationOutput } from '@/ai/flows';
export type { GlassdoorCompanyFitOutput } from '@/ai/flows';
export type { InterviewExperienceOutput } from '@/ai/flows';
export type { ResumeExportOutput } from '@/ai/flows';
export type { CountryResumeRulesOutput } from '@/ai/flows';
export type { VisaSponsorshipOutput } from '@/ai/flows';


export type AnalyzedCandidate = {
  id: string;
  fileName: string;
  candidate: Candidate;
  analysis: AnalysisResult;
  recommendations: HiringRecommendations;
  personalityProfile: CareerPersonalityProfile;
  
  // Optional analysis results
  salaryPrediction?: SalaryPredictionResult;
  videoAnalysis?: VideoAnalysisOutput;
  workLifeBalance?: WorkLifeBalanceOutput;
  networking?: NetworkingOpportunitiesOutput;
  resumeRewrite?: {
    ats: RewriteResumeOutput;
    creative: RewriteResumeOutput;
    executive: RewriteResumeOutput;
  };
  
  // New analysis results
  roast?: RoastResumeOutput;
  confidenceReport?: ConfidenceBoosterOutput;
  brandCheck?: PersonalBrandCheckOutput;
  hiddenStrengths?: HiddenStrengthDiscoveryOutput;
  riskAssessment?: CareerRiskAssessmentOutput;
  skillWarning?: SkillObsolescenceWarningOutput;
  versionSuggestion?: ResumeVersionControlOutput;
  internshipReport?: InternshipReadinessOutput;

  // Enterprise results
  ranking?: RankCandidateOutput;
  benchmark?: BenchmarkCandidateOutput;
  funnelInsights?: GetHiringFunnelInsightsOutput;
  
  // Integrations & International
  githubSkills?: GithubSkillExtractionOutput;
  linkedinSync?: LinkedInSyncOutput;
  kaggleAnalysis?: KaggleProfileAnalysisOutput;
  portfolioAnalysis?: PortfolioWebsiteAnalysisOutput;
  freelanceOptimization?: FreelanceProfileOptimizationOutput;
  glassdoorFit?: GlassdoorCompanyFitOutput;
  interviewExperience?: InterviewExperienceOutput;
  resumeExports?: ResumeExportOutput;
  countryRules?: CountryResumeRulesOutput;
  visaSponsorship?: VisaSponsorshipOutput;
};
