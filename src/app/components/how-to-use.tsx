'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FileText, Video, DollarSign, Clock, Users, PenSquare, Lightbulb } from 'lucide-react';

const features = [
  {
    title: '1. Core Analysis',
    icon: <FileText className="w-8 h-8 mx-auto" />,
    instructions: [
      "Paste the full job description into the text area.",
      "Click 'Select a resume file...' to upload a candidate's resume (PDF or DOCX).",
      "Choose the relevant country from the dropdown.",
      "Click 'Next' to proceed to advanced options."
    ],
  },
  {
    title: '2. Advanced Analysis',
    icon: <Lightbulb className="w-8 h-8 mx-auto" />,
    instructions: [
        "On Step 2, you'll find several checkboxes for advanced AI reports.",
        "Each checkbox is enabled by default for a full analysis.",
        "Deselect any reports you wish to skip.",
        "Click 'Analyze Now' to start the process."
    ],
  },
  {
    title: 'Video Feedback',
    icon: <Video className="w-8 h-8 mx-auto" />,
    instructions: [
      "Enable the 'AI Video Feedback' option in Step 2.",
      "Upload a video file (e.g., a mock interview or elevator pitch).",
      "Our AI will provide feedback on expressions, voice, and confidence in the 'Video' tab of the report."
    ],
  },
  {
    title: 'Salary Prediction',
    icon: <DollarSign className="w-8 h-8 mx-auto" />,
    instructions: [
      "Keep the 'Salary Prediction' option checked.",
      "The AI will predict a realistic salary range for the role in the selected country's currency.",
      "Find the results and optimization tips in the 'Salary' tab."
    ],
  },
  {
    title: 'Work-Life Balance',
    icon: <Clock className="w-8 h-8 mx-auto" />,
    instructions: [
      "The 'Work-Life Balance Predictor' analyzes the job description for clues about company culture and demands.",
      "It provides a balance score and estimated weekly hours.",
      "Results are shown in the 'Work-Life' tab."
    ],
  },
    {
    title: 'Networking Finder',
    icon: <Users className="w-8 h-8 mx-auto" />,
    instructions: [
        "The 'Networking Opportunity Finder' helps candidates connect.",
        "It suggests relevant events, contacts, and online groups based on the candidate's profile.",
        "Explore these opportunities in the 'Networking' tab."
    ],
  },
  {
    title: 'Resume Rewriter',
    icon: <PenSquare className="w-8 h-8 mx-auto" />,
    instructions: [
      "The 'Resume Rewriter' generates three alternate versions of the resume content.",
      "These versions are tailored for ATS, Creative, and Executive roles.",
      "View them in the 'Rewrite' tab of the final report."
    ],
  },
];

function FlipCard({ front, back }: { front: React.ReactNode, back: React.ReactNode }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flip-card bg-transparent w-full h-[220px]" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={cn("flip-card-inner relative w-full h-full text-center", isFlipped && "rotate-y-180")}>
        <div className="flip-card-front absolute w-full h-full flex flex-col justify-center items-center p-4 rounded-lg bg-black/40 border border-primary/30 shadow-lg cursor-pointer">
          {front}
        </div>
        <div className="flip-card-back absolute w-full h-full flex flex-col justify-center items-center p-4 rounded-lg bg-primary/90 text-primary-foreground border border-primary shadow-lg cursor-pointer rotate-y-180">
          {back}
        </div>
      </div>
    </div>
  );
}

export function HowToUse() {
  return (
    <Card className="bg-black/20 border-primary/20 backdrop-blur-xl shadow-2xl shadow-primary/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold">How to Use the Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FlipCard
              key={index}
              front={
                <>
                  <div className="text-primary mb-2">{feature.icon}</div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                </>
              }
              back={
                <div className='text-left'>
                    <h4 className='font-bold text-lg mb-2'>{feature.title}</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {feature.instructions.map((step, i) => <li key={i}>{step}</li>)}
                    </ul>
                </div>
              }
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}