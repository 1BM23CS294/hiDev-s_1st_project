import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { AnalyzedCandidate } from '@/lib/types';
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  Award,
} from 'lucide-react';
import { CircularProgress } from './circular-progress';


export function CandidateReport({ data }: { data: AnalyzedCandidate }) {
  const { candidate, matchScore, recommendations } = data;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                  <CardTitle className="text-2xl font-bold">{candidate.name}</CardTitle>
                  <CardDescription>Analysis based on file: {data.fileName}</CardDescription>
              </div>
              <Badge variant="outline" className='text-sm'>New Analysis</Badge>
          </div>
        </CardHeader>
        <CardContent className='space-y-6'>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary"><Award size={20} /> Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent className='grid md:grid-cols-3 gap-6 items-center'>
                    <div className='md:col-span-1 flex justify-center'>
                        <CircularProgress value={matchScore.matchScore} />
                    </div>
                    <div className='md:col-span-2 space-y-4'>
                        <div>
                            <h3 className="text-lg font-semibold">Match Explanation</h3>
                            <p className="text-sm text-foreground/80">{matchScore.explanation}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Overall Recommendation</h3>
                            <p className="text-sm text-foreground/80">{recommendations.overallRecommendation}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-400"><CheckCircle size={20} /> Top Strengths</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/80">
                            {recommendations.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-400"><XCircle size={20} /> Main Improvements</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/80">
                            {recommendations.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary"><HelpCircle size={20} /> Suggested Interview Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-decimal pl-5 space-y-2 text-sm text-foreground/80">
                        {recommendations.interviewQuestions.map((q, i) => <li key={i}>{q}</li>)}
                    </ul>
                </CardContent>
            </Card>

        </CardContent>
      </Card>
    </div>
  );
}
