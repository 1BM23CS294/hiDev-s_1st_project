import type {
  ExtractResumeInformationOutput,
  GenerateHiringRecommendationsOutput,
  GenerateResumeMatchScoreOutput,
} from '@/ai/flows';

export type Candidate = ExtractResumeInformationOutput;
export type MatchScore = GenerateResumeMatchScoreOutput;
export type HiringRecommendations = GenerateHiringRecommendationsOutput;

export type AnalyzedCandidate = {
  id: string;
  fileName: string;
  candidate: Candidate;
  matchScore: MatchScore;
  recommendations: HiringRecommendations;
};
