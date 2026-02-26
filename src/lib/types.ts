import type {
  ExtractResumeInformationOutput,
  GenerateHiringRecommendationsOutput,
  GenerateResumeMatchScoreOutput,
  PredictSalaryRangeOutput,
} from '@/ai/flows';

export type Candidate = ExtractResumeInformationOutput;
export type AnalysisResult = GenerateResumeMatchScoreOutput;
export type HiringRecommendations = GenerateHiringRecommendationsOutput;
export type SalaryPredictionResult = PredictSalaryRangeOutput;

export type AnalyzedCandidate = {
  id: string;
  fileName: string;
  candidate: Candidate;
  analysis: AnalysisResult;
  recommendations: HiringRecommendations;
  salaryPrediction: SalaryPredictionResult;
};
