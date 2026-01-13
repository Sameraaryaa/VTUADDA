
'use client';

import Link from 'next/link';
import { FileX2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-center p-4">
      <div className="flex flex-col items-center gap-4 max-w-md">
        <div className="p-4 bg-muted rounded-full mb-4">
            <FileX2 className="w-16 h-16 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Unfortunately, the page you are looking for is not available or has been moved.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
