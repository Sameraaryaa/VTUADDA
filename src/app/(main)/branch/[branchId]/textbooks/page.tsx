
import { getBranchInfo } from '@/lib/server-fetch';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResourceLink } from '@/components/resource-viewer';
import type { Note } from '@/lib/types';

type BranchTextbooksPageProps = {
  params: {
    branchId: string;
  };
};

const TextbookItem = ({ textbook }: { textbook: Note }) => {
    return (
        <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg border bg-background"
        >
            <div className="flex items-center gap-3">
                <p className="font-medium">{textbook.name}</p>
            </div>
            <ResourceLink name={textbook.name} url={textbook.url} />
        </div>
    );
};

export default async function BranchTextbooksPage({ params }: BranchTextbooksPageProps) {
  const { branchId } = params;
  
  const branchInfo = await getBranchInfo(branchId);
  
  if (!branchInfo) {
    notFound();
  }

  const recommendedTextbooks = branchInfo.textbooks || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
        <header className="p-6 bg-card rounded-xl border">
            <h1 className="text-2xl md:text-3xl font-bold text-gradient">
                Recommended Textbooks for {branchInfo.name}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mt-1">
                A collection of commonly used textbooks for this branch.
            </p>
        </header>

        {recommendedTextbooks.length > 0 ? (
             <Card>
                <CardHeader>
                    <CardTitle>Textbooks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {recommendedTextbooks.map((book, index) => (
                        <TextbookItem key={index} textbook={book} />
                    ))}
                </CardContent>
            </Card>
        ) : (
            <div className="text-center py-16 text-muted-foreground bg-card border rounded-lg">
                <h2 className="text-2xl font-semibold">No Recommended Textbooks Found</h2>
                <p>There are no specific textbooks assigned to this branch yet.</p>
            </div>
        )}
    </div>
  );
}
