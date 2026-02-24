import { Briefcase, FileText, BarChart2, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';

export function WelcomeSplash() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-card rounded-xl border-2 border-dashed">
      <div className="mb-6">
        <Logo />
      </div>
      <h2 className="text-3xl font-bold mb-2">Automate Your Resume Screening</h2>
      <p className="text-muted-foreground max-w-lg mb-10">
        Get started by providing a job description and a candidate's resume in the sidebar. CareerMatch AI will handle the rest.
      </p>
      <div className="grid md:grid-cols-3 gap-6 text-left w-full max-w-4xl">
        <Card className="bg-background/80">
          <CardHeader>
            <CardTitle className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary p-2 rounded-lg"><FileText className="w-6 h-6" /></div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">1. Provide Details</h3>
                <CardDescription>Paste the job description and upload a resume.</CardDescription>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-background/80">
          <CardHeader>
            <CardTitle className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary p-2 rounded-lg"><Zap className="w-6 h-6" /></div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">2. Get AI Analysis</h3>
                <CardDescription>Our AI parses, scores, and generates insights in seconds.</CardDescription>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-background/80">
          <CardHeader>
            <CardTitle className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary p-2 rounded-lg"><BarChart2 className="w-6 h-6" /></div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">3. Hire Faster</h3>
                <CardDescription>Make data-driven decisions with detailed reports.</CardDescription>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
