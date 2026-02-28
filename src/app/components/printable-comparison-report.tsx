'use client';
import type { AnalyzedCandidate } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

export function PrintableComparisonReport({ data }: { data: [AnalyzedCandidate, AnalyzedCandidate] }) {
  const [candidateA, candidateB] = data;

  const comparisonChartData = [
    {
      name: 'Overall',
      candidateA: candidateA.analysis.overallScore,
      candidateB: candidateB.analysis.overallScore,
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
     <div className="flex-1 space-y-4 break-inside-avoid">
        <div className="border p-4 rounded-lg">
             <h3 className="text-xl font-bold text-center text-gray-800">{candidate.candidate.name}</h3>
             <p className="text-center text-gray-600 text-sm mb-4">{candidate.fileName}</p>
             <div className="text-center my-4">
                <p className="text-4xl font-bold text-blue-600">{candidate.analysis.overallScore}%</p>
                <p className="font-semibold text-gray-700">{candidate.analysis.rating}</p>
             </div>
             <p className="text-sm text-gray-600 italic text-center">{candidate.analysis.explanation}</p>
        </div>
        <div className="border p-4 rounded-lg">
            <h4 className="font-semibold flex items-center gap-2 mb-2 text-green-600"><CheckCircle2 size={18} /> Strengths</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
               {candidate.recommendations.strengths.slice(0, 3).map((s, i) => <li key={i}>{s}</li>)}
            </ul>
        </div>
         <div className="border p-4 rounded-lg">
             <h4 className="font-semibold flex items-center gap-2 mb-2 text-yellow-600"><ShieldAlert size={18}/> Weaknesses</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
               {candidate.recommendations.weaknesses.slice(0, 3).map((w, i) => <li key={i}>{w}</li>)}
            </ul>
        </div>
     </div>
  );

  return (
    <div className="w-full space-y-8">
        <header className="text-center mb-8 border-b pb-4">
            <h1 className="text-4xl font-bold text-gray-900">Candidate Comparison Report</h1>
            <p className="text-md text-gray-500">Side-by-side analysis</p>
        </header>
        
        <div className="break-after-page flex justify-center">
             <div className='flex flex-col items-center'>
                 <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Metric Comparison</h2>
                 <BarChart 
                    width={700}
                    height={350}
                    data={comparisonChartData} 
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                 >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="candidateA" name={candidateA.candidate.name} fill="#3b82f6" />
                    <Bar dataKey="candidateB" name={candidateB.candidate.name} fill="#82ca9d" />
                </BarChart>
            </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
            {renderCandidateColumn(candidateA)}
            {renderCandidateColumn(candidateB)}
        </div>
    </div>
  );
}
