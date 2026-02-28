'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ComparisonChartProps {
  data: {
    name: string;
    candidateA: number;
    candidateB: number;
  }[];
  candidateAName: string;
  candidateBName: string;
}

export function ComparisonChart({ data, candidateAName, candidateBName }: ComparisonChartProps) {
  return (
    <Card className="bg-black/20 border-primary/20 backdrop-blur-lg shadow-lg shadow-primary/10">
      <CardHeader>
        <CardTitle className="text-primary text-xl">Score Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              }}
            />
            <Legend />
            <Bar dataKey="candidateA" name={candidateAName} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="candidateB" name={candidateBName} fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
