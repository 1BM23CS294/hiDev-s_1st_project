import { Logo } from '@/components/logo';
import { Card } from '@/components/ui/card';
import { FileText, Lightbulb, UploadCloud } from 'lucide-react';

const steps = [
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: '1. Provide a Job Description',
    description: 'Paste the full job description into the designated field. This provides the context for our AI to evaluate candidates against.',
  },
  {
    icon: <UploadCloud className="h-6 w-6 text-primary" />,
    title: '2. Upload a Resume',
    description: 'Select and upload the candidate\'s resume file (PDF or DOCX). Our system will parse the document to extract key information.',
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    title: '3. Get Instant AI Analysis',
    description: 'Receive a comprehensive report including a match score, a summary of strengths and weaknesses, and tailored interview questions.',
  }
];

export function WelcomeSplash() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 md:p-8 text-center bg-card rounded-xl border-2 border-dashed">
      <div className="mb-6">
        <Logo />
      </div>
      <h2 className="text-3xl font-bold tracking-tight mb-2">Unlock Your Perfect Hire, Instantly</h2>
      <p className="text-muted-foreground max-w-2xl mb-10">
        CareerMatch AI streamlines your recruitment process. Stop manually screening resumes and let our intelligent analysis find the best-fit candidates for you in seconds.
      </p>
      
      <div className="w-full max-w-4xl">
        <h3 className="text-xl font-semibold mb-6">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {steps.map((step, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full border">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
       <p className="text-xs text-muted-foreground mt-12">
        Get started by providing a job description and uploading a resume on the left panel.
      </p>
    </div>
  );
}
