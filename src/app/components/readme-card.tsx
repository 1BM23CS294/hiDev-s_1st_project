import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const readmeContent = `# Welcome to the Intelligent Resume Analyzer!

This app is your personal AI assistant for understanding resumes. Whether you're a recruiter looking for the perfect candidate or a job seeker aiming to improve your resume, this tool is for you.

---

## What Can It Do?

*   **Analyze Resumes:** Upload a resume and a job description to see how well they match.
*   **Compare Two Candidates:** Upload two resumes to get a side-by-side comparison.
*   **Get Deep AI Insights:** Go beyond simple scores. Discover strengths, weaknesses, and even get a fun "resume roast" for constructive feedback.
*   **Explore Career Tools:** Predict salary ranges, check for in-demand skills, and get personalized tips for improvement.
*   **Save Your Work:** Sign up for a free account to save and review your analysis reports anytime.

---

## Local Setup: Step-by-Step Guide

Follow these steps to run the Intelligent Resume Analyzer on your own computer.

### Step 1: Check Prerequisites
Make sure you have **Node.js** installed on your computer. This is essential for running the application.

### Step 2: Install Project Dependencies
Open your computer's terminal (command prompt) and navigate to your project's folder. Then, run the following command to install all the necessary code packages:
\`\`\`bash
npm install
\`\`\`

### Step 3: Get Your Free Google AI API Key
This app uses Google's Gemini AI. To use its features, you need a free, personal API key.

1.  **Go to Google AI Studio**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  **Create & Copy Your Key**: Follow the on-screen steps to create a new API key and copy it.

> **Important**: Your API key is like a personal password for Google's AI services. It must be kept secret. Using your own key keeps your usage secure. The process is quick and free.

### Step 4: Add Your API Key to the Project
You need to tell the application what your API key is.

1.  **Find the \`.env\` file**: In the main project folder, locate the file named \`.env\`. The key inside is just a placeholder.
2.  **Paste Your Key**: Open this file and replace the placeholder key with the unique key you copied from Google AI Studio.

    It should look like this after you edit it:
    \`\`\`
    GEMINI_API_KEY="AIzaSy...your...unique...key..."
    \`\`\`

### Step 5: Start the App!
You're ready to go. To start the application, run this command in your terminal:
\`\`\`bash
npm run dev
\`\`\`
This will start the local development server.

### Step 6: View the App in Your Browser
Open your web browser and navigate to the address below to see the application in action:
**[http://localhost:9002](http://localhost:9002)**

---

## Technology We Use

*   **Framework:** Next.js
*   **Artificial Intelligence:** Google Gemini
*   **User Interface:** React, Tailwind CSS, and shadcn/ui
*   **Backend:** Firebase (for user accounts and data storage)
`;

export function ReadmeCard() {
  return (
    <Card className="bg-black/20 border-primary/20 backdrop-blur-xl shadow-2xl shadow-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <BookText size={22} /> Project README
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full rounded-md border border-border/50 bg-black/20 p-4">
            <pre className="text-sm text-foreground/80 whitespace-pre-wrap font-sans">
                <code>
                    {readmeContent}
                </code>
            </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
