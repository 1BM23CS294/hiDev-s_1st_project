
'use client';

import { useState, useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { FileText, UploadCloud, Users, X as XIcon, Loader2 } from 'lucide-react';
import { analyzeResume } from '@/app/actions';
import type { AnalyzedCandidate } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CandidateReport } from './components/candidate-report';
import { WelcomeSplash } from './components/welcome-splash';
import { AnalysisLoading } from './components/analysis-loading';
import { Logo } from '@/components/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        'Analyze Resume'
      )}
    </Button>
  );
}


const initialState: {
  success: boolean;
  message: string;
  data?: AnalyzedCandidate;
  errors?: any;
} = {
  success: false,
  message: '',
};

export default function Home() {
  const [state, formAction] = useFormState(analyzeResume, initialState);
  const [candidates, setCandidates] = useState<AnalyzedCandidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<AnalyzedCandidate | null>(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success && state.data) {
      const newCandidate = state.data;
      setCandidates(prev => [newCandidate, ...prev]);
      setSelectedCandidate(newCandidate);
      toast({
        title: "Analysis Complete",
        description: `${newCandidate.candidate.name}'s resume has been analyzed.`,
        variant: "default",
      });
      formRef.current?.reset();
      setFileName('');
    } else if (!state.success && state.message && state.message !== '') {
      toast({
        title: "Analysis Failed",
        description: state.errors?._form?.[0] || state.message,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }, [state, toast]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Check if form is valid before setting loading state
    const formData = new FormData(e.currentTarget);
    const jobDesc = formData.get('jobDescription') as string;
    const resume = formData.get('resumeFile') as File;
    if (jobDesc && resume?.size > 0) {
      setIsLoading(true);
    }
    // The actual submission is handled by the form action
  };

  const renderContent = () => {
    if (isLoading) {
      return <AnalysisLoading />;
    }
    if (selectedCandidate) {
      return <CandidateReport data={selectedCandidate} />;
    }
    return <WelcomeSplash />;
  };

  return (
    <div className="flex h-screen w-full bg-secondary">
      <aside className="flex flex-col w-full max-w-sm border-r bg-background">
        <div className="p-4 border-b">
          <Logo />
        </div>
        <form ref={formRef} action={formAction} onSubmit={handleFormSubmit} className="flex flex-col flex-1">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><FileText size={20} /> Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="job-description" className="sr-only">Job Description</Label>
                  <Textarea
                    id="job-description"
                    name="jobDescription"
                    placeholder="Paste the job description here..."
                    className="min-h-[150px] text-sm"
                    required
                  />
                   {state.errors?.jobDescription && <p className="text-red-500 text-sm mt-1">{state.errors.jobDescription[0]}</p>}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><UploadCloud size={20} /> Resume Upload</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="resume-file" className="sr-only">Resume</Label>
                   <Input id="resume-file" name="resumeFile" type="file" ref={fileInputRef} onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} className="hidden" required/>
                    <Button type="button" variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
                       {fileName ? <span className="truncate">{fileName}</span> : 'Select a file (PDF, DOCX)'}
                    </Button>
                  {state.errors?.resumeFile && <p className="text-red-500 text-sm mt-1">{state.errors.resumeFile[0]}</p>}
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t mt-auto">
            <SubmitButton />
          </div>
        </form>

        <div className="border-t flex-shrink-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Users size={20} /> Candidates</CardTitle>
          </CardHeader>
          <ScrollArea className="h-48">
            <CardContent>
              {candidates.length > 0 ? (
                <ul className="space-y-2">
                  {candidates.map((c) => (
                    <li key={c.id}>
                      <button 
                        onClick={() => setSelectedCandidate(c)} 
                        className={cn(
                          "w-full text-left p-2 rounded-md transition-colors", 
                          selectedCandidate?.id === c.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        )}>
                        <p className="font-semibold truncate">{c.candidate.name}</p>
                        <p className={cn("text-xs truncate", selectedCandidate?.id === c.id ? "text-primary-foreground/70" : "text-muted-foreground")}>{c.fileName}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No candidates analyzed yet.</p>
              )}
            </CardContent>
          </ScrollArea>
        </div>
      </aside>
      
      <main className="flex-1">
        <ScrollArea className="h-screen">
          <div className="p-6">
            {renderContent()}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
