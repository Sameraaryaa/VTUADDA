
"use client";

import Link from "next/link";
import { BookCopy, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Subject, Branch } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const getSemesterName = (semester: number) => {
  if (semester === 1) return "1st Semester";
  if (semester === 2) return "2nd Semester";
  if (semester === 3) return "3rd Semester";
  return `${semester}th Semester`;
};

const hasNotes = (subject: Subject) => {
    if (!subject || !subject.modules) return false;
    return subject.modules.some(module => module.notes && module.notes.length > 0);
}

const SubjectCard = ({ subject }: { subject: Subject }) => {
    const notesAvailable = hasNotes(subject);
    return (
        <Card className="flex flex-col h-full hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex-grow">
                <CardHeader>
                    <CardTitle className="text-lg leading-tight">{subject.name}</CardTitle>
                    <CardDescription className="font-code pt-1">{subject.code}</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{subject.credits} Credits</Badge>
                         <Badge variant="secondary" className={cn(
                            notesAvailable ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
                        )}>
                            {notesAvailable ? 'Notes Available' : 'No Notes Yet'}
                        </Badge>
                    </div>
                </CardContent>
            </div>
            <CardFooter>
                 <div className="w-full">
                    <Button asChild variant="default" className="w-full">
                        <Link href={`/subject/${encodeURIComponent(subject.code)}`}>
                            View Materials
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

function BranchSubjectList({ subjects }: { subjects: Subject[] }) {
  const subjectsBySemester = subjects.reduce((acc, subject) => {
    const semester = subject.semester;
    if (!acc[semester]) {
      acc[semester] = [];
    }
    acc[semester].push(subject);
    return acc;
  }, {} as Record<number, Subject[]>);

  const sortedSemesters = Object.keys(subjectsBySemester).sort(
    (a, b) => Number(a) - Number(b)
  );

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight mb-4">Subjects</h2>
      {sortedSemesters.length > 0 ? (
        <div className="space-y-8">
          {sortedSemesters.map((semester) => (
            <div key={semester}>
              <h3 className="text-xl font-bold mb-4 border-b pb-2">
                {getSemesterName(Number(semester))}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjectsBySemester[Number(semester)].map((subject) => (
                    <SubjectCard key={subject.code} subject={subject} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground bg-card border rounded-lg">
            <h2 className="text-2xl font-semibold">No Subjects Found</h2>
            <p>There are no subjects assigned to this branch yet.</p>
        </div>
      )}
    </section>
  );
}


export default function BranchClientPage({ branchId, branchInfo, subjects }: { branchId: string, branchInfo: Branch, subjects: Subject[] }) {
    const recommendedTextbooks = branchInfo?.textbooks || [];

    return (
        <div className="flex flex-col gap-8">
            <section>
                <h1 className="text-3xl font-headline font-bold tracking-tight">
                {branchInfo.name}
                </h1>
                <p className="text-muted-foreground mt-1">{branchInfo.description}</p>
            </section>
            
            <div className="space-y-12">
                {recommendedTextbooks.length > 0 && (
                    <Link href={`/branch/${branchId}/textbooks`}>
                        <Card className="hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                            <CardHeader className="flex-row items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <BookCopy className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Recommended Textbooks</CardTitle>
                                    <CardDescription>View all common textbooks for {branchInfo.name}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                )}

                <BranchSubjectList subjects={subjects} />
            </div>
        </div>
    );
}
