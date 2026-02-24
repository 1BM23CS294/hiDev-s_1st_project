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
  Scissors,
} from 'lucide-react';

const steps = [
  {
    title: 'Step 1: Data Sourcing',
    content:
      'We gather relevant data from multiple sources to form the core of the Gen AI project. This ensures the AI system has a robust knowledge base to make informed, contextually accurate decisions.',
    icon: <DatabaseZap className="h-5 w-5" />,
  },
  {
    title: 'Step 2: Data Preprocessing',
    content:
      'Raw data is cleaned, structured, and organized to ensure quality and usability. This step is crucial for eliminating irrelevant or redundant information, which improves the efficiency and accuracy of the AI model.',
    icon: <Filter className="h-5 w-5" />,
  },
  {
    title: 'Step 3: Splitting & Chunking',
    content:
      'Large documents are broken down into smaller, manageable chunks. This enables more focused processing while retaining contextual relevance, optimizing performance for large amounts of data.',
    icon: <Scissors className="h-5 w-5" />,
  },
  {
    title: 'Step 4: Embeddings & Knowledge Base',
    content:
      'Text is converted into numerical representations (embeddings) that capture its semantic meaning. These are stored in a vector database, creating a searchable knowledge base for the AI.',
    icon: <BrainCircuit className="h-5 w-5" />,
  },
  {
    title: 'Step 5: AI Query Processing',
    content:
      'User queries are processed to retrieve relevant data from the knowledge base. An AI engine then generates a context-aware response, ensuring meaningful and accurate results.',
    icon: <Bot className="h-5 w-5" />,
  },
  {
    title: 'Step 6: UI & Deployment',
    content:
      'An intuitive user interface is built for seamless interaction. The application is deployed to the cloud to ensure it is scalable, reliable, and available.',
    icon: <LayoutTemplate className="h-5 w-5" />,
  },
  {
    title: 'Step 7: Testing & Optimization',
    content:
      'The entire system is continuously tested and optimized for functionality, speed, and accuracy, ensuring a high-quality and reliable user experience.',
    icon: <Gauge className="h-5 w-5" />,
  },
];

export function WelcomeSplash() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-card rounded-xl border-2 border-dashed">
      <div className="mb-6">
        <Logo />
      </div>
      <h2 className="text-3xl font-bold mb-2">How Our AI Works</h2>
      <p className="text-muted-foreground max-w-2xl mb-10">
        Our system follows a sophisticated pipeline to deliver intelligent and
        accurate resume analysis. Here’s a breakdown of the key stages involved
        in our Generative AI-powered process.
      </p>
      <div className="w-full max-w-4xl text-left">
        <Accordion type="single" collapsible className="w-full">
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