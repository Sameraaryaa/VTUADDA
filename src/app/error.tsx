
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
          <div className="text-center max-w-lg">
            <AlertTriangle className="mx-auto h-16 w-16 text-destructive mb-4" />
            <h1 className="text-3xl font-bold text-destructive mb-2">
              Oops! Something went wrong.
            </h1>
            <p className="text-muted-foreground mb-6">
              We've encountered an unexpected error. Our team has been notified,
              but you can also help by trying again.
            </p>
            <Button onClick={() => reset()} size="lg">
              Try Again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
