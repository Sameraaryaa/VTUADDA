
"use client";

import { useMemo, useState } from "react";
import { FlaskConical, FileText, Search, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { LabResource, LabManual, Branch } from "@/lib/types";
import { ResourceLink } from "@/components/resource-viewer";
import { Input } from "@/components/ui/input";
import { ClientOnly } from "@/components/client-only";
import { filterLabs } from "@/lib/search-utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSubjectStore } from "@/lib/store";

const ManualLink = ({ manual }: { manual: LabManual }) => {
    return (
        <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg border bg-background"
        >
            <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-medium break-words">{manual.name}</span>
            </div>
            <ResourceLink name={manual.name} url={manual.url} />
        </div>
    );
};


const LabsPageSkeleton = () => (
    <div className="flex flex-col gap-8 animate-pulse">
        <div className="flex justify-end">
            <Skeleton className="h-10 w-full md:w-[300px]" />
        </div>
        <div className="space-y-6">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
        </div>
    </div>
);

function LabsContent({ labs, branches, schemes }: { labs: LabResource[], branches: Record<string, Branch>, schemes: string[] }) {
    const {
        searchTerm,
        setSearchTerm,
        selectedScheme,
        setSelectedScheme,
        selectedBranch,
        setSelectedBranch,
        selectedSemester,
        setSelectedSemester,
    } = useSubjectStore();

    const filteredLabs = useMemo(() => {
        return filterLabs(labs, branches, searchTerm, selectedScheme, selectedBranch, selectedSemester);
    }, [labs, branches, searchTerm, selectedScheme, selectedBranch, selectedSemester]);
    
    const showSearchResults = searchTerm || selectedScheme || selectedBranch || selectedSemester;

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedScheme('');
        setSelectedBranch('');
        setSelectedSemester('');
    };

    return (
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
                 {filteredLabs.length > 0 ? (
                    <div className="space-y-8 pt-4">
                        {filteredLabs.map((lab) => (
                            <Card key={lab.id} className="flex flex-col hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl break-words">{lab.subjectName}</CardTitle>
                                    <div className="flex items-center gap-2 pt-1 flex-wrap">
                                        <Badge variant="secondary" className="font-code">{lab.subjectCode}</Badge>
                                        <Badge variant="outline">Sem {lab.semester}</Badge>
                                        <Badge variant="outline" className="whitespace-normal break-all">{lab.branchName}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {lab.manuals.map((manual, index) => (
                                        <ManualLink key={index} manual={manual} />
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-muted-foreground bg-card border rounded-lg mt-4">
                        <h2 className="text-2xl font-semibold">No Lab Manuals Found</h2>
                        <p>{searchTerm ? "Try adjusting your search term." : "We are working on adding lab resources. Please check back later!"}</p>
                    </div>
                )}
            </div>
             <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-20 self-start">
                 <div className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by subject, code, or branch keyword..."
                            className="w-full pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                     <div className="w-full flex flex-col gap-2">
                        <Select value={selectedScheme} onValueChange={setSelectedScheme}>
                            <SelectTrigger className="w-full"><SelectValue placeholder="Scheme" /></SelectTrigger>
                            <SelectContent>
                                {(schemes || []).map(scheme => <SelectItem key={scheme} value={scheme}>{scheme}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                            <SelectTrigger className="w-full"><SelectValue placeholder="Branch" /></SelectTrigger>
                            <SelectContent>
                                {Object.entries(branches || {}).map(([id, branch]) => <SelectItem key={id} value={id}>{branch.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                            <SelectTrigger className="w-full"><SelectValue placeholder="Semester" /></SelectTrigger>
                            <SelectContent>
                                {[...Array(8)].map((_, i) => <SelectItem key={i+1} value={`${i+1}`}>Sem {i+1}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        {(showSearchResults) && (
                            <Button variant="ghost" onClick={clearFilters} size="sm" className="w-full">
                                <X className="w-4 h-4 mr-2"/>
                                Clear filters
                            </Button>
                        )}
                    </div>
                </div>
             </aside>
        </div>
    );
}

export default function LabsClientPage({ labs, branches, schemes }: { labs: LabResource[], branches: Record<string, Branch>, schemes: string[] }) {
    const { isSearchVisible } = useSubjectStore();
    return (
        <div className="flex flex-col gap-8">
            <section>
                <h1 className="text-3xl font-headline font-bold tracking-tight text-gradient flex items-center gap-3">
                    <FlaskConical className="w-8 h-8 text-primary" />
                    Lab Resources
                </h1>
                <p className="text-muted-foreground mt-1">A collection of lab manuals and resources from all branches.</p>
            </section>
            
            <ClientOnly>
                 {isSearchVisible ? <LabsContent labs={labs} branches={branches} schemes={schemes} /> : <LabsContent labs={labs} branches={branches} schemes={schemes} /> }
            </ClientOnly>
        </div>
    )
}
