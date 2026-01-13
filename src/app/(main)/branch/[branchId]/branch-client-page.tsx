
"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Subject, Branch, Note } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Script from "next/script";

const hasContent = (subject: Subject): boolean => {
    if (!subject) return false;
    const modulesArray = Array.isArray(subject.modules) ? subject.modules : Object.values(subject.modules || {});
    const hasNotes = modulesArray.some(m => m && Array.isArray(m.notes) && m.notes.length > 0);
    const hasModelPapers = subject.modelQuestionPapers && subject.modelQuestionPapers.length > 0;
    const hasPyqs = subject.pyqs && subject.pyqs.length > 0;
    const hasLabs = subject.labs && subject.labs.length > 0;
    return hasNotes || hasModelPapers || hasPyqs || hasLabs;
};

const getSemesterName = (semester: number) => {
  if (semester === 1) return "1st Semester";
  if (semester === 2) return "2nd Semester";
  if (semester === 3) return "3rd Semester";
  return `${semester}th Semester`;
};

const SubjectCard = ({ subject }: { subject: Subject }) => {
    const notesAvailable = hasContent(subject);
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
                            {notesAvailable ? 'Materials Available' : 'No Materials Yet'}
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

function BranchSubjectList({ subjects, selectedSemester, branchId }: { subjects: Subject[], selectedSemester?: number, branchId: string }) {
  const subjectsWithContent = subjects.filter(hasContent);

  const subjectsBySemester = subjectsWithContent.reduce((acc, subject) => {
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
      <h2 className="text-2xl font-bold tracking-tight mb-4">
        {selectedSemester ? `Subjects for ${getSemesterName(selectedSemester)}` : "Subjects"}
      </h2>
      {sortedSemesters.length > 0 ? (
        <div className="space-y-8">
          {sortedSemesters.map((semester) => (
            <div key={semester}>
              <Link href={`/branch/${branchId}/sem-${semester}`}>
                <h3 className="text-xl font-bold mb-4 border-b pb-2 hover:text-primary transition-colors">
                    {getSemesterName(Number(semester))}
                </h3>
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <p>
                {selectedSemester 
                    ? `There are no subjects with materials listed for this semester.`
                    : `There are no subjects with materials assigned to this branch yet.`
                }
            </p>
        </div>
      )}
    </section>
  );
}


export default function BranchClientPage({ branchId, branchInfo, subjects, selectedSemester }: { branchId: string, branchInfo: Branch, subjects: Subject[], selectedSemester?: number }) {
    const recommendedTextbooks = branchInfo?.textbooks || [];
    const router = useRouter();
    const subjectsWithContent = subjects.filter(hasContent);

    return (
        <div className="flex flex-col gap-8 max-w-7xl mx-auto">
            <div className="flex items-start justify-between">
                <section>
                    <h1 className="text-3xl font-headline font-bold tracking-tight">
                    {branchInfo.name}
                    </h1>
                    <p className="text-muted-foreground mt-1">{branchInfo.description}</p>
                </section>
                <Button onClick={() => router.back()} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>
            

            <div className="space-y-12">
                {recommendedTextbooks.length > 0 && !selectedSemester && (
                    <Link href={`/branch/${branchId}/textbooks`}>
                        <Card className="hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                            <CardHeader className="flex-row items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                                </div>
                                <div>
                                    <CardTitle>Recommended Textbooks</CardTitle>
                                    <CardDescription>View all common textbooks for {branchInfo.name}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                )}

                <BranchSubjectList subjects={subjectsWithContent} selectedSemester={selectedSemester} branchId={branchId} />
            </div>
        </div>
    );
}

