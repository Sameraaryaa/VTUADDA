
"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Search, FileText, X } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { Branch } from '@/lib/types';
import { ResourceLink } from '@/components/resource-viewer';
import { ClientOnly } from '@/components/client-only';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { type PyqResult } from './page';
import { filterPyqs } from '@/lib/search-utils';
import Script from 'next/script';
import { useSubjectStore } from '@/lib/store';

const PyqResultCard = ({ result, branchName }: { result: PyqResult, branchName?: string }) => {
    return (
        <Card className="animate-fade-in-up transition-shadow hover:shadow-lg">
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                 <div className="flex items-center gap-3 flex-grow min-w-0">
                    <FileText className="w-6 h-6 text-primary flex-shrink-0" />
                    <div className="flex-grow">
                        <Link href={`/subject/${encodeURIComponent(result.subjectCode)}`}>
                            <p className="font-semibold hover:underline break-words">{result.subjectName}</p>
                        </Link>
                         <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground mt-1">
                            <span>{result.subjectCode}</span>
                            {branchName && <><span>•</span><span>{branchName}</span></>}
                            <span>•</span>
                            <span>Sem {result.semester}</span>
                        </div>
                        <p className="text-sm break-words mt-1">{result.name}</p>
                    </div>
                </div>
                 <ResourceLink name={result.name} url={result.url} isPyq={true} />
            </CardContent>
        </Card>
    );
}

export default function PyqClientPage({ allPyqs, branches, schemes }: { allPyqs: PyqResult[], branches: Record<string, Branch>, schemes: string[] }) {
    const [isLoading, setIsLoading] = useState(false);
    const {
        searchTerm,
        setSearchTerm,
        selectedScheme,
        setSelectedScheme,
        selectedBranch,
        setSelectedBranch,
        selectedSemester,
        setSelectedSemester,
        isSearchVisible,
        toggleSearch
    } = useSubjectStore();
    
    const filteredPyqs = useMemo(() => {
        setIsLoading(true);
        const results = filterPyqs(allPyqs, branches, searchTerm, selectedScheme, selectedBranch, selectedSemester);
        setIsLoading(false);
        return results;
    }, [searchTerm, selectedScheme, selectedBranch, selectedSemester, allPyqs, branches]);
    
    const showSearchResults = searchTerm || selectedScheme || selectedBranch || selectedSemester;

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedScheme('');
        setSelectedBranch('');
        setSelectedSemester('');
    };

    return (
        <div className="space-y-8">
            <section className="animate-slide-in-from-top">
                <h1 className="text-3xl sm:text-4xl font-headline font-bold tracking-tight text-gradient">
                    Search Previous Year Questions
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground mt-2">
                    Find question papers from past VTU exams across all subjects. This is an essential resource for understanding exam patterns and focusing your preparation on the most important topics.
                </p>
            </section>

            <ClientOnly>
                {isSearchVisible && (
                     <div className="sticky top-[88px] z-20 bg-background/80 backdrop-blur-sm -mx-4 sm:mx-0 pt-4 pb-4 px-4 sm:px-0 animate-fade-in-up">
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Filter by PYQ name, subject, code, or branch keyword..."
                                    className="pl-10 text-base py-6 bg-card"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="w-full flex flex-row gap-2">
                                <Select value={selectedScheme} onValueChange={setSelectedScheme}>
                                    <SelectTrigger className="w-full flex-grow"><SelectValue placeholder="Scheme" /></SelectTrigger>
                                    <SelectContent>
                                        {(schemes || []).map(scheme => <SelectItem key={scheme} value={scheme}>{scheme}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                                    <SelectTrigger className="w-full flex-grow"><SelectValue placeholder="Branch" /></SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(branches || {}).map(([id, branch]) => <SelectItem key={id} value={id}>{branch.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                                    <SelectTrigger className="w-full flex-grow"><SelectValue placeholder="Semester" /></SelectTrigger>
                                    <SelectContent>
                                        {[...Array(8)].map((_, i) => <SelectItem key={i+1} value={`${i+1}`}>Sem {i+1}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {(showSearchResults) && (
                                    <Button variant="ghost" onClick={clearFilters} size="icon" className="flex-shrink-0">
                                        <X className="w-4 h-4"/>
                                        <span className="sr-only">Clear filters</span>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                
                <section className="space-y-4 pt-4">
                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
                        </div>
                    ) : (
                        <>
                            {filteredPyqs.length > 0 ? (
                                filteredPyqs.map((pyq, index) => {
                                    const primaryBranchId = pyq.branchIds.length > 0 ? pyq.branchIds[0] : null;
                                    const branchName = primaryBranchId ? branches[primaryBranchId]?.name : undefined;
                                    return <PyqResultCard key={`${pyq.subjectCode}-${index}`} result={pyq} branchName={branchName} />
                                })
                            ) : (
                                <div className="text-center py-16 text-muted-foreground bg-card border rounded-lg">
                                    <h2 className="text-2xl font-semibold">No Results Found</h2>
                                    <p>We couldn't find any PYQs matching your filters. Try adjusting your search.</p>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </ClientOnly>
        </div>
    );
}
