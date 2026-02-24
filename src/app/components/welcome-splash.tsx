import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Logo } from '@/components/logo';
import {
  Bot,
  BrainCircuit,
  DatabaseZap,
  Filter,
  Gauge,
  LayoutTemplate,
  Lightbulb,
  Scissors,
  UploadCloud,
} from 'lucide-react';

const steps = [
  {
    title: 'Step 1: Resume Upload & Job Description Input',
    content:
      "The process starts when you provide the two key pieces of information: the candidate's resume and the job description. The application accepts common file formats like PDF or DOCX for the resume. This initial data is the foundation for the entire analysis.",
    icon: <UploadCloud className="h-5 w-5" />,
  },
  {
    title: 'Step 2: Data Extraction & Structuring',
    content:
      "Once uploaded, the resume file is converted into a format the AI can understand. Our AI, powered by Google's Gemini model via Genkit, reads the resume to extract and structure key information like contact details, skills, work experience, and education history. This turns an unstructured document into clean, organized data.",
    icon: <BrainCircuit className="h-5 w-5" />,
  },
  {
    title: 'Step 3: AI Analysis & Scoring',
    content:
      "With the structured resume data and the job description, the AI performs a comparative analysis. It evaluates the candidate's skills and experience against the job requirements to generate a 'Match Score'. This score gives you a quick understanding of the candidate's suitability.",
    icon: <Gauge className="h-5 w-5" />,
  },
  {
    title: 'Step 4: Generating Recommendations',
    content:
      "Beyond just a score, the AI generates qualitative insights. It identifies the candidate's key strengths and potential weaknesses in relation to the role. It also crafts a set of tailored interview questions to help you probe deeper during the hiring process and provides an overall recommendation.",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    title: 'Step 5: Displaying the Report',
    content:
      "All the generated analysis—the score, strengths, weaknesses, and questions—is presented in a comprehensive and easy-to-read report. The user interface, built with Next.js, React, and ShadCN UI components, ensures you can quickly review the candidate's profile and the AI's insights.",
    icon: <LayoutTemplate className="h-5 w-5" />,
  },
];

export function WelcomeSplash() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-card rounded-xl border-2 border-dashed">
      <div className="mb-6">
        <Logo />
      </div>
      <h2 className="text-3xl font-bold mb-2">How CareerMatch AI Works</h2>
      <p className="text-muted-foreground max-w-3xl mb-10">
        Our system follows a sophisticated pipeline to deliver intelligent and
        accurate resume analysis. Here’s a breakdown of the key stages involved
        in our Generative AI-powered process built with Next.js and Genkit.
      </p>
      <div className="w-full max-w-4xl text-left">
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          {steps.map((step, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <span className="text-primary">{step.icon}</span>
                  <span className="font-semibold">{step.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-11 text-muted-foreground">
                {step.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
