import { config } from 'dotenv';
config();

import '@/ai/flows/generate-resume-match-score.ts';
import '@/ai/flows/extract-resume-information-flow.ts';
import '@/ai/flows/generate-hiring-recommendations.ts';