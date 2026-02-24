import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import type { AnalyzedCandidate } from '@/lib/types';
import {
  Briefcase,
  GraduationCap,
  Lightbulb,
  Mail,
  MessageSquareQuote,
  Phone,
  Target,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function getInitials(name: string) {
  if (!name) return '??';
  return name
    .split(' ')
    .map(n => n[0])
    .filter(c => /[a-zA-Z]/.test(c))
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function getScoreColor(score: number) {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
}

export function CandidateReport({ data }: { data: AnalyzedCandidate }) {
  const { candidate, matchScore, recommendations } = data;
  const avatarPlaceholder = PlaceHolderImages.find(img => img.id === 'user-avatar');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src={avatarPlaceholder?.imageUrl} alt={candidate.name} data-ai-hint={avatarPlaceholder?.imageHint} />
              <AvatarFallback className="text-xl bg-muted">{getInitials(candidate.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold leading-none tracking-tight">{candidate.name}</h2>
              <div className="flex items-center gap-4 text-sm mt-1 text-muted-foreground">
                {candidate.email && <span className="flex items-center gap-1"><Mail size={14} /> {candidate.email}</span>}
                {candidate.phone && <span className="flex items-center gap-1"><Phone size={14} /> {candidate.phone}</span>}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className={`text-5xl font-bold ${getScoreColor(matchScore.matchScore)}`}>
                {matchScore.matchScore}<span className="text-3xl text-muted-foreground">/100</span>
              </div>
              <Progress value={matchScore.matchScore} className="w-32 h-2" />
              <p className="text-sm text-muted-foreground">Match Score</p>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MessageSquareQuote size={20} /> AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{matchScore.explanation}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Briefcase size={20} /> Work Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidate.experience.length > 0 ? candidate.experience.map((exp, index) => (
                  <div key={index} className="pl-4 border-l-2">
                    <h3 className="font-semibold">{exp.title} at {exp.company}</h3>
                    <p className="text-sm text-muted-foreground">
                      {exp.startDate} {exp.endDate ? ` - ${exp.endDate}` : '- Present'}
                    </p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                )) : <p className="text-sm text-muted-foreground">No work experience found.</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><GraduationCap size={20} /> Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {candidate.education.length > 0 ? candidate.education.map((edu, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                  </div>
                )) : <p className="text-sm text-muted-foreground">No education information found.</p>}
              </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Target size={20} /> Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.length > 0 ? candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                )) : <p className="text-sm text-muted-foreground">No skills found.</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lightbulb size={20} /> Hiring Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger><ThumbsUp className="mr-2 text-green-500"/> Strengths</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {recommendations.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger><ThumbsDown className="mr-2 text-red-500"/> Weaknesses</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {recommendations.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger><MessageSquareQuote className="mr-2 text-blue-500"/> Interview Questions</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-decimal pl-5 space-y-2 text-sm">
                      {recommendations.interviewQuestions.map((q, i) => <li key={i}>{q}</li>)}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Separator className="my-4"/>
              <div className="space-y-1">
                <h3 className="font-semibold">Overall Recommendation:</h3>
                <p className="text-sm text-muted-foreground">{recommendations.overallRecommendation}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
