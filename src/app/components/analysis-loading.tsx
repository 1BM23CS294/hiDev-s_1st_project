import { Loader2 } from 'lucide-react';

export function AnalysisLoading() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center p-8 gap-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <h2 className="text-2xl font-semibold">Analyzing Resume...</h2>
      <p className="text-muted-foreground max-w-sm">
        Our AI is processing the documents. This might take a moment. Please don't close this page.
      </p>
    </div>
  );
}
