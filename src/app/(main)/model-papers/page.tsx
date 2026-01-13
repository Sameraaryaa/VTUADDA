
import type { Metadata } from 'next';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BackButton } from '@/components/back-to-home-button';

export const metadata: Metadata = {
  title: 'VTU Model Question Papers',
  description: 'Download official VTU model question papers for all schemes, including the 2022 and 2025 schemes.',
};

const schemeData = [
    {
        scheme: '2022-scheme',
        title: '2022 Scheme',
        description: 'Model question papers for the ongoing 2022 scheme.'
    },
    {
        scheme: '2025-scheme',
        title: '2025 Scheme',
        description: 'First & Second semester papers for the new 2025 scheme.'
    }
]

export default function ModelPapersPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
        <BackButton />
        <header className="text-center">
            <h1 className="text-3xl font-bold text-gradient">Model Question Papers</h1>
            <p className="text-lg text-muted-foreground mt-2">Select a scheme to view the available papers.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemeData.map(item => (
                <Link key={item.scheme} href={`/model-papers/${item.scheme}`}>
                    <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                {item.title}
                                <ArrowRight className="w-5 h-5 text-muted-foreground" />
                            </CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    </div>
  );
}
