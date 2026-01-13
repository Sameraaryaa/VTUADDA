
"use client";

import type { Subject, Note } from "@/lib/types";
import { ResourceLink } from "@/components/resource-viewer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const ResourceItem = ({ note, isPyq }: { note: Note, isPyq: boolean }) => {
    return (
        <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg border bg-background"
        >
            <div className="flex items-center gap-3 min-w-0">
                <p className="font-medium break-words">{note.name}</p>
            </div>
            <div className="self-end sm:self-center">
                 <ResourceLink name={note.name} url={note.url} isPyq={isPyq} />
            </div>
        </div>
    );
};


export const SubjectResourcePage = ({ subject, resourceType }: { subject: Subject, resourceType: 'pyqs' | 'modelQuestionPapers' | 'labs' }) => {
    const router = useRouter();
    const resources: Note[] = (subject[resourceType] as Note[]) || [];
    const titles = {
        pyqs: "Previous Year Question Papers",
        modelQuestionPapers: "Model Question Papers",
        labs: "Lab Resources",
    };
    
    const title = titles[resourceType];
    const isPyqPage = resourceType === 'pyqs';

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12">
            <header className="p-6 bg-card rounded-xl border">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-gradient">
                            {title}
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground mt-1">
                            For {subject.name} <span className="font-code">({subject.code})</span>
                        </p>
                    </div>
                    <Button onClick={() => router.back()} variant="outline" className="hidden sm:flex">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                </div>
            </header>

            {isPyqPage && (
                 <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        For Previous Year Question Papers, please click on the <strong>Download</strong> button to get the file. The view option is disabled for these documents.
                    </AlertDescription>
                </Alert>
            )}
            
            <div className="space-y-4">
                {resources.length > 0 ? (
                    resources.map((resource, index) => <ResourceItem key={index} note={resource} isPyq={isPyqPage} />)
                ) : (
                    <div className="text-center py-16 text-muted-foreground bg-card border rounded-lg">
                        <h2 className="text-2xl font-semibold">No Resources Found</h2>
                        <p>There are no {title.toLowerCase()} available for this subject yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
