
"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import type { Subject, Branch, Note } from "@/lib/types";
import { JsonLdSchema } from "./subject-schema";
import { FileText, FlaskConical, BookCopy, CheckCircle, ArrowLeft } from "lucide-react";
import { ResourceLink } from "@/components/resource-viewer";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Script from "next/script";

const ResourceTypeCard = ({ href, icon: Icon, title, description, count }: { href: string; icon: React.ElementType; title: string; description: string; count: number }) => (
    <Link href={href}>
        <Card className="hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
            <CardHeader className="flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description} ({count})</CardDescription>
                </div>
            </CardHeader>
        </Card>
    </Link>
);

const NoteItem = ({ note }: { note: Note }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg border bg-background">
            <div className="flex-grow min-w-0">
                <p className="font-medium break-words">{note.name}</p>
            </div>
            <div className="self-end sm:self-auto">
                <ResourceLink name={note.name} url={note.url} />
            </div>
        </div>
    );
};


export default function SubjectClientPage({ subject, branch }: { subject: Subject, branch: Branch | null }) {
  const router = useRouter();
  
  // Always treat modules as an array, converting from an object if necessary.
  const modulesArray = Array.isArray(subject.modules)
    ? subject.modules
    : Object.values(subject.modules || {});

  // Determine the first module that has notes to set the default open accordion item.
  const firstModuleWithNotes = modulesArray.find(m => {
    if (!m || !m.notes) return false;
    const notesArray = Array.isArray(m.notes) ? m.notes : Object.values(m.notes);
    return notesArray.length > 0;
  });
  const defaultAccordionValue = firstModuleWithNotes ? `module-${firstModuleWithNotes.moduleNumber}` : undefined;
  
  const modelPapersCount = subject.modelQuestionPapers?.length || 0;
  const pyqsCount = subject.pyqs?.length || 0;
  const labsCount = subject.labs?.length || 0;
  const subjectUrl = `/subject/${encodeURIComponent(subject.code)}`;
  const hasAnyNotes = modulesArray.some(m => {
      if (!m || !m.notes) return false;
      const notesArray = Array.isArray(m.notes) ? m.notes : Object.values(m.notes);
      return notesArray.length > 0;
  });

  return (
    <>
      <JsonLdSchema subject={subject} />
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="p-6 bg-card rounded-xl border">
        <div className="flex items-start justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gradient">
                {subject.name}
            </h1>
            <Button onClick={() => router.back()} variant="outline" className="hidden sm:flex">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
        </div>
        <p className="text-base md:text-lg font-code text-muted-foreground mt-1">
            {subject.code}
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-3">
            <Badge variant="secondary">Semester: {subject.semester}</Badge>
            {branch && <Badge variant="secondary">Branch: {branch.name}</Badge>}
            {subject.credits > 0 && <Badge variant="secondary">Credits: {subject.credits}</Badge>}
            {subject.scheme && <Badge variant="destructive">{subject.scheme}</Badge>}
        </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modelPapersCount > 0 && (
                <ResourceTypeCard
                    href={`${subjectUrl}/model-papers`}
                    icon={BookCopy}
                    title="Model Papers"
                    description="View official model papers"
                    count={modelPapersCount}
                />
            )}
            {pyqsCount > 0 && (
                <ResourceTypeCard
                    href={`${subjectUrl}/pyqs`}
                    icon={FileText}
                    title="PYQs"
                    description="Previous Year Questions"
                    count={pyqsCount}
                />
            )}
            {labsCount > 0 && (
                <ResourceTypeCard
                    href={`${subjectUrl}/labs`}
                    icon={FlaskConical}
                    title="Lab Manuals"
                    description="View lab resources"
                    count={labsCount}
                />
            )}
        </section>
        
        <section className="space-y-6 pt-4">
        <h2 className="text-xl md:text-2xl font-semibold">
            Module Notes & Syllabus
        </h2>
        {hasAnyNotes ? (
            <Accordion type="single" collapsible className="w-full space-y-4" defaultValue={defaultAccordionValue}>
            {modulesArray.map((module) => {
                if (!module) return null;
                // Ensure notes is always an array
                const notesArray = Array.isArray(module.notes) ? module.notes : Object.values(module.notes || {});
                const noteCount = notesArray.length;
                
                if (noteCount === 0) return null; // Don't render modules with no notes
                
                return (
                    <AccordionItem key={module.moduleNumber} value={`module-${module.moduleNumber}`} className="border rounded-xl bg-card">
                        <AccordionTrigger className="hover:no-underline px-4 py-3 text-lg font-semibold">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>{module.name || `Module ${module.moduleNumber}`}</span>
                                <Badge variant="default">
                                    {noteCount} Note{noteCount !== 1 ? 's' : ''}
                                </Badge>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                            {module.description && (
                                <p className="text-muted-foreground text-sm mt-1 mb-4 border-l-2 border-primary/50 pl-3">
                                    {module.description}
                                </p>
                            )}
                            <div className="space-y-3 pt-4">
                                {notesArray.map((note, index) => (
                                    <NoteItem key={index} note={note} />
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
            </Accordion>
        ) : (
            <div className="text-center py-16 text-muted-foreground bg-card border rounded-lg">
                <h2 className="text-2xl font-semibold">No Notes Found</h2>
                <p>There are no notes available for this subject yet. Please check back later!</p>
            </div>
        )}
        </section>
      </div>
    </>
  );
}
