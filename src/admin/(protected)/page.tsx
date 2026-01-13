

"use client";

import Link from "next/link";
import { useSubjectStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, PlusCircle, CheckCircle, XCircle, Trash2, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Subject, Branch } from "@/lib/types";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { ManageBranchDialog } from "@/components/admin-manage-branch";
import { AddBranchDialog } from "@/components/admin-add-branch";


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

export default function AdminDashboard() {
  const { subjects, branches, deleteMultipleSubjects, deleteMultipleBranches } = useSubjectStore();
  const [selectedSubjectCodes, setSelectedSubjectCodes] = useState<string[]>([]);
  const [selectedBranchIds, setSelectedBranchIds] = useState<string[]>([]);
  const { toast } = useToast();

  const getSubjectsByBranch = (branchId: string) => {
    return subjects.filter((subject) => subject.branch?.includes(branchId));
  };

  const groupSubjectsBySemester = (subjectList: Subject[]) => {
    return subjectList.reduce((acc, subject) => {
      const semester = subject.semester;
      if (!acc[semester]) {
        acc[semester] = [];
      }
      acc[semester].push(subject);
      return acc;
    }, {} as Record<number, Subject[]>);
  };
  
  const toggleSelectAllSubjects = (subjectCodes: string[]) => {
    const allSelected = subjectCodes.every(code => selectedSubjectCodes.includes(code));
    if (allSelected) {
      setSelectedSubjectCodes(selectedSubjectCodes.filter(code => !subjectCodes.includes(code)));
    } else {
      setSelectedSubjectCodes(Array.from(new Set([...selectedSubjectCodes, ...subjectCodes])));
    }
  };

  const handleDeleteSelectedSubjects = async () => {
    try {
        await deleteMultipleSubjects(selectedSubjectCodes);
        toast({
            title: "Subjects Deleted",
            description: `${selectedSubjectCodes.length} subject(s) have been deleted.`
        });
        setSelectedSubjectCodes([]);
    } catch (e) {
        toast({
            title: "Error",
            description: "Could not delete the selected subjects.",
            variant: "destructive"
        })
    }
  }

  const handleDeleteSelectedBranches = async () => {
    try {
        await deleteMultipleBranches(selectedBranchIds);
        toast({
            title: "Branches Deleted",
            description: `${selectedBranchIds.length} branch(es) have been deleted.`
        });
        setSelectedBranchIds([]);
    } catch (e) {
        toast({
            title: "Error",
            description: "Could not delete the selected branches.",
            variant: "destructive"
        })
    }
  }


  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Manage Subjects & Branches
          </h2>
          <p className="text-muted-foreground">
            Manage your subjects, branches, and their linked study materials.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <AddBranchDialog />
            <Button asChild>
                <Link href="/admin/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Subject
                </Link>
            </Button>
        </div>
      </div>
      
       <div className="flex flex-wrap gap-2">
            {selectedSubjectCodes.length > 0 && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                         <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete {selectedSubjectCodes.length} Subject(s)
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete {selectedSubjectCodes.length} selected subject(s). This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setSelectedSubjectCodes([])}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteSelectedSubjects}>Confirm Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
             {selectedBranchIds.length > 0 && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                         <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete {selectedBranchIds.length} Branch(es)
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete {selectedBranchIds.length} selected branch(es): <strong>{selectedBranchIds.map(id => branches[id]?.name).join(', ')}</strong>. This will NOT delete the subjects within them.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setSelectedBranchIds([])}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteSelectedBranches}>Confirm Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>


      <Accordion type="single" collapsible className="w-full" defaultValue="cse">
        {Object.entries(branches).map(([branchId, branchInfo]) => {
          const branchSubjects = getSubjectsByBranch(branchId);
          const subjectsBySemester = groupSubjectsBySemester(branchSubjects);

          return (
            <AccordionItem key={branchId} value={branchId} className="border rounded-xl">
                <div className="flex items-center gap-4 px-4">
                    <Checkbox
                        id={`branch-cb-${branchId}`}
                        checked={selectedBranchIds.includes(branchId)}
                        onCheckedChange={(checked) => {
                            setSelectedBranchIds(
                                checked
                                ? [...selectedBranchIds, branchId]
                                : selectedBranchIds.filter(id => id !== branchId)
                            )
                        }}
                        aria-label={`Select branch ${branchInfo.name}`}
                    />
                    <AccordionTrigger className="text-xl font-bold hover:no-underline flex-1 py-4">
                       <span className="text-left">{branchInfo.name} ({branchSubjects.length} subjects)</span>
                    </AccordionTrigger>
                </div>
              <AccordionContent className="px-2 sm:px-4">
                <div className="space-y-6 pt-4">
                  <ManageBranchDialog branchId={branchId} branchInfo={branchInfo} />

                  {Object.keys(subjectsBySemester).length > 0 ? (
                    Object.entries(subjectsBySemester)
                    .sort(([semA], [semB]) => Number(semA) - Number(semB))
                    .map(([semester, subjectList]) => {
                        const semesterSubjectCodes = subjectList.map(s => s.code);
                        const areAllInSemesterSelected = semesterSubjectCodes.length > 0 && semesterSubjectCodes.every(code => selectedSubjectCodes.includes(code));
                        return (
                          <div key={semester}>
                            <h4 className="text-lg font-semibold mb-2 pl-2">
                              {getSemesterName(Number(semester))}
                            </h4>
                            <div className="border rounded-lg overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="w-[50px] px-2">
                                        <Checkbox
                                            checked={areAllInSemesterSelected}
                                            onCheckedChange={() => toggleSelectAllSubjects(semesterSubjectCodes)}
                                            aria-label="Select all subjects in this semester"
                                        />
                                    </TableHead>
                                    <TableHead>
                                      Code
                                    </TableHead>
                                    <TableHead>Subject Name</TableHead>
                                    <TableHead className="hidden md:table-cell text-center">
                                      Credits
                                    </TableHead>
                                     <TableHead className="hidden sm:table-cell text-center">
                                      Notes Added
                                    </TableHead>
                                    <TableHead className="text-right">
                                      Actions
                                    </TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {subjectList.map((subject) => (
                                    <TableRow key={subject.code} data-state={selectedSubjectCodes.includes(subject.code) ? "selected" : ""}>
                                       <TableCell className="px-2">
                                            <Checkbox
                                                checked={selectedSubjectCodes.includes(subject.code)}
                                                onCheckedChange={(checked) => {
                                                    setSelectedSubjectCodes(
                                                        checked
                                                        ? [...selectedSubjectCodes, subject.code]
                                                        : selectedSubjectCodes.filter(code => code !== subject.code)
                                                    )
                                                }}
                                                aria-label={`Select ${subject.name}`}
                                            />
                                       </TableCell>
                                      <TableCell className="font-code font-semibold">
                                        {subject.code}
                                      </TableCell>
                                      <TableCell>{subject.name}</TableCell>
                                      <TableCell className="hidden md:table-cell text-center">
                                        <Badge variant={"secondary"}>
                                           {subject.credits}
                                        </Badge>
                                      </TableCell>
                                       <TableCell className="hidden sm:table-cell text-center">
                                         {hasNotes(subject) ? (
                                            <CheckCircle className={cn("h-5 w-5 mx-auto text-green-500 dark:text-green-400")} />
                                         ) : (
                                            <XCircle className={cn("h-5 w-5 mx-auto text-red-500 dark:text-red-400")} />
                                         )}
                                      </TableCell>
                                      <TableCell className="text-right">
                                        <div className="flex justify-end items-center gap-1">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                          >
                                            <Link href={`/admin/edit/${subject.code}`}>
                                              <Edit className="mr-2 h-4 w-4" />
                                              <span className="hidden sm:inline">Edit</span>
                                            </Link>
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        )
                    })
                  ) : (
                    <p className="text-muted-foreground pl-2">No subjects found for this branch.</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
