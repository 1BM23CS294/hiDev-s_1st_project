import type { AnalyzedCandidate } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ComparisonChart } from './comparison-chart';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CircularProgress } from './circular-progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ShieldAlert, DollarSign, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

function getInitials(name: string) {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export function ComparisonReport({ data }: { data: [AnalyzedCandidate, AnalyzedCandidate] }) {
  const [candidateA, candidateB] = data;

  const comparisonChartData = [
    {
      name: 'Overall',
      candidateA: candidateA.analysis.overallScore,
      candidateB: candidateB.analysis.overallScore,
    },
    {
      name: 'Personality',
      candidateA: candidateA.personalityProfile.traits[0]?.score || 0,
      candidateB: candidateB.personalityProfile.traits[0]?.score || 0,
    },
    {
      name: 'Brand',
      candidateA: candidateA.brandCheck?.consistencyScore || 0,
      candidateB: candidateB.brandCheck?.consistencyScore || 0,
    },
     {
      name: 'Sponsorship',
      candidateA: candidateA.visaSponsorship?.readinessScore || 0,
      candidateB: candidateB.visaSponsorship?.readinessScore || 0,
    },
  ];
  
  const renderCandidateColumn = (candidate: AnalyzedCandidate) => (
     <div className="flex-1 space-y-4">
        <Card className="bg-black/20 border-primary/20 backdrop-blur-lg shadow-lg shadow-primary/10 text-center">
             <CardHeader className="items-center">
                <Avatar className="w-16 h-16 mb-2 border-2 border-primary">
                    <AvatarFallback className="text-2xl bg-muted">{getInitials(candidate.candidate.name)}</AvatarFallback>
                </Avatar>
                <CardTitle>{candidate.candidate.name}</CardTitle>
             </CardHeader>
             <CardContent>
                 <CircularProgress value={candidate.analysis.overallScore} />
                 <p className="text-sm text-muted-foreground mt-4">{candidate.analysis.explanation}</p>
             </CardContent>
        </Card>
        <Card className="bg-black/20 border-primary/20 backdrop-blur-lg shadow-lg shadow-primary/10">
            <CardHeader><CardTitle className="text-lg text-green-400 flex items-center gap-2"><CheckCircle2 size={20}/> Strengths</CardTitle></CardHeader>
            <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80">
                   {candidate.recommendations.strengths.slice(0, 3).map((s, i) => <li key={i}>{s}</li>)}
                </ul>
            </CardContent>
        </Card>
         <Card className="bg-black/20 border-primary/20 backdrop-blur-lg shadow-lg shadow-primary/10">
            <CardHeader><CardTitle className="text-lg text-amber-400 flex items-center gap-2"><ShieldAlert size={20}/> Weaknesses</CardTitle></CardHeader>
            <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80">
                   {candidate.recommendations.weaknesses.slice(0, 3).map((w, i) => <li key={i}>{w}</li>)}
                </ul>
            </CardContent>
        </Card>
        {candidate.salaryPrediction && (
             <Card className="bg-black/20 border-primary/20 backdrop-blur-lg shadow-lg shadow-primary/10 text-center">
                 <CardHeader><CardTitle className="text-lg text-primary flex items-center gap-2 justify-center"><DollarSign size={20}/> Salary</CardTitle></CardHeader>
                 <CardContent>
                    <p className="text-2xl font-bold">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: candidate.salaryPrediction.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(candidate.salaryPrediction.predictedMinSalary)}
                    </p>
                    <p className="text-muted-foreground"> to </p>
                    <p className="text-2xl font-bold">
                       {new Intl.NumberFormat('en-US', { style: 'currency', currency: candidate.salaryPrediction.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(candidate.salaryPrediction.predictedMaxSalary)}
                    </p>
                 </CardContent>
             </Card>
        )}
     </div>
  );

  return (
    <div className="w-full space-y-6">
        <div className="text-center">
            <div className="flex flex-wrap items-center justify-center gap-4 mb-2">
                <h2 className="text-2xl font-bold sm:text-3xl">Resume Comparison</h2>
                <Button variant="outline" size="sm" onClick={() => window.print()} className="no-print">
                    <Printer size={16} className="mr-2"/>
                    Print Report
                </Button>
            </div>
            <p className="text-sm text-muted-foreground">Side-by-side analysis of two candidates.</p>
        </div>
        
        <ComparisonChart 
            data={comparisonChartData}
            candidateAName={candidateA.candidate.name}
            candidateBName={candidateB.candidate.name}
        />

        <div className="flex flex-col md:flex-row gap-6">
            {renderCandidateColumn(candidateA)}
            {renderCandidateColumn(candidateB)}
        </div>
    </div>
  );
}
