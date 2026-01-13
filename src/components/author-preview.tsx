
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function AuthorPreview() {
  return (
    <section id="authors-preview" className="py-12 lg:py-16">
        <div className="container mx-auto px-4 text-center">
            <Button asChild>
                <Link href="/authors">
                    View the Authors
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
    </section>
  );
}
