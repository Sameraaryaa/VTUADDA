
"use client";

import { Heart, Instagram, Search, ArrowRight, BookCopy as BookCopyIcon, Send, X } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Subject, Branch } from "@/lib/types";
import { useMemo, useState } from "react";
import Link from "next/link";
import { doc, increment, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { FeedbackForm } from "@/components/feedback-form";
import { ContactForm } from "@/components/contact-form";
import { ResourceViewerDialog } from "@/components/resource-viewer";
import { ClientOnly } from "@/components/client-only";
import { Badge } from "@/components/ui/badge";
import { useSubjectStore } from "@/lib/store";
import { filterSubjects } from "@/lib/search-utils";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.22 14.25c-.22-.11-.76-.38-1.04-.44s-.48-.11-.68.11c-.2.22-.39.44-.48.55-.09.11-.18.13-.33.04-.76-.36-1.42-.78-2-1.28-.48-.42-.96-.93-1.32-1.52-.09-.15-.04-.23.07-.34.1-.1.22-.26.33-.39.09-.11.13-.18.18-.3.06-.11.03-.22-.03-.33-.18-.36-1.04-2.5-1.42-3.41-.36-.88-.73-.76-.99-.76h-.48c-.27 0-.58.09-.88.36-.3.27-.94.91-.94 2.22s.97 2.56 1.1 2.74c.13.18 1.82 2.89 4.49 3.96.65.28 1.23.45 1.66.58.6.18 1.15.15 1.58.09.48-.06 1.42-.58 1.63-1.15.2-.58.2-.99.15-1.09s-.18-.16-.39-.27z"/>
    </svg>
)

const SocialIcon = ({ name, url }: { name: string, url: string }) => {
    switch (name.toLowerCase()) {
        case "whatsapp":
            return (
                <a href={url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity" aria-label="WhatsApp">
                    <WhatsAppIcon className="w-7 h-7" />
                </a>
            );
        case "instagram":
             return (
                <a href={url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white hover:opacity-90 transition-opacity" aria-label="Instagram">
                    <Instagram size={24} />
                </a>
            );
        case "telegram":
            return (
                <a href={url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-[#229ED9] text-white hover:opacity-90 transition_opacity" aria_label="Telegram">
                    <Send size={24} />
                </a>
            );
        default:
            return null;
    }
}

const hasContent = (subject: Subject): boolean => {
    if (!subject) return false;
    const modulesArray = Array.isArray(subject.modules) ? subject.modules : Object.values(subject.modules || {});
    const hasNotes = modulesArray.some(m => m && Array.isArray(m.notes) && m.notes.length > 0);
    const hasModelPapers = subject.modelQuestionPapers && subject.modelQuestionPapers.length > 0;
    const hasPyqs = subject.pyqs && subject.pyqs.length > 0;
    const hasLabs = subject.labs && subject.labs.length > 0;
    return hasNotes || hasModelPapers || hasPyqs || hasLabs;
};

const formatLikes = (num: number): string => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return String(num);
};

const SubjectCard = ({ subject, branchName, onResultClick }: { subject: Subject; branchName: string; onResultClick: () => void; }) => {
    const notesAvailable = hasContent(subject);
    return (
        <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex-grow">
                <CardHeader>
                    <CardTitle className="text-lg leading-tight">{subject.name}</CardTitle>
                    <CardDescription className="font-code pt-1">{subject.code}</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{subject.credits} Credits</Badge>
                        <Badge variant="outline">{branchName}</Badge>
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
                    <Button asChild variant="default" className="w-full" onClick={onResultClick}>
                        <Link href={`/subject/${encodeURIComponent(subject.code)}`}>
                            View Materials
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

const GridSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        ))}
    </div>
);

export default function BrowseClientPage() {
    // Data is now sourced from the global Zustand store
    const { 
        subjects, 
        branches, 
        searchTerm, 
        setSearchTerm, 
        selectedBranch, 
        setSelectedBranch,
        selectedScheme, 
        setSelectedScheme,
        selectedSemester,
        setSelectedSemester,
        schemes,
        isSearchVisible,
        toggleSearch,
    } = useSubjectStore();
    const { toast } = useToast();
    
    const branchDisplayOrder = [
        'firstyear25','first-year', 'cse', 'ise', 'aiml' , 'aids', 'ece', 'mech', 'eee', 'ect', 'civil', 'bt', 'ae'
    ];

    const popularDownloads = useMemo(() => {
        const allNotesWithSubjects = (subjects || []).flatMap(subject => {
            const modulesArray = Array.isArray(subject.modules) ? subject.modules : Object.values(subject.modules || {});
            
            const notes = (modulesArray || []).flatMap(module => {
                if (!module) return [];
                const notesArray = Array.isArray(module.notes) ? module.notes : Object.values(module.notes || {});
                return (notesArray || []).map(note => ({
                    ...note,
                    type: 'note',
                    subjectName: subject.name,
                    subjectCode: subject.code,
                }));
            });

            const pyqs = (subject.pyqs || []).map(pyq => ({ ...pyq, type: 'pyq', subjectName: subject.name, subjectCode: subject.code }));
            const modelPapers = (subject.modelQuestionPapers || []).map(paper => ({ ...paper, type: 'model', subjectName: subject.name, subjectCode: subject.code }));

            return [...notes, ...pyqs, ...modelPapers];
        });

        return [...allNotesWithSubjects]
            .filter(item => item && item.name && item.subjectName)
            .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
            .slice(0, 5);
    }, [subjects]);

    const filteredSubjects = useMemo(() => {
        return filterSubjects(subjects, searchTerm, selectedScheme, selectedBranch, selectedSemester);
    }, [subjects, searchTerm, selectedScheme, selectedSemester, selectedBranch]);

     const filteredBranches = useMemo(() => {
        let branchEntries = Object.entries(branches || {});
        
        if (selectedScheme) {
            branchEntries = branchEntries.filter(([, branch]) => branch.scheme === selectedScheme);
        }
        
        if (selectedBranch) {
            branchEntries = branchEntries.filter(([branchId]) => branchId === selectedBranch);
        }

        if (selectedSemester) {
            const semesterNum = parseInt(selectedSemester, 10);
            branchEntries = branchEntries.filter(([branchId]) => 
                (subjects || []).some(subject => 
                    subject.semester === semesterNum && (subject.branch?.includes(branchId))
                )
            );
        }
        
        const knownIds = new Set(branchDisplayOrder);
        
        const sortedKnown = branchDisplayOrder
            .map(id => branchEntries.find(([branchId]) => branchId === id))
            .filter(Boolean) as [string, Branch][];
            
        const sortedUnknown = branchEntries
            .filter(([branchId]) => !knownIds.has(branchId))
            .sort(([, a], [, b]) => a.name.localeCompare(b.name));

        return [...sortedKnown, ...sortedUnknown];

    }, [branches, selectedScheme, selectedSemester, selectedBranch, subjects]);
    
    const handleLike = async (branchId: string, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        
        if (!db) return;
        const branchRef = doc(db, 'branches', branchId);
        const batch = writeBatch(db);
        batch.update(branchRef, { likes: increment(1) });
        
        try {
            await batch.commit();
            toast({
              title: "Thanks for the love!",
              description: "Your like has been counted.",
            });
        } catch (error) {
            console.error("Error liking branch:", error);
            toast({
              title: "Error",
              description: "Could not register your like. Please try again.",
              variant: "destructive",
            });
        }
    }
    
    const showSearchResults = searchTerm || selectedBranch || selectedScheme || selectedSemester;

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedScheme('');
        setSelectedBranch('');
        setSelectedSemester('');
    };
    
    return (
        <>
             <VisuallyHidden>
                <h2>The ultimate resource hub for VTU students</h2>
                <p>
                    Your one-stop destination for VTU notes, question papers, and more. We provide a comprehensive collection of engineering subjects and curriculum resources, meticulously organized for your convenience.
                </p>
                <p>
                   Whether you are looking for electronics notes, computer science materials, or the syllabus for any semester, we have you covered for all branches of engineering.
                </p>
            </VisuallyHidden>
            <div className="flex flex-col gap-8 md:gap-12">
                
                <section id="browse" aria-labelledby="browse-heading" className="scroll-mt-20">
                    {isSearchVisible && (
                        <div className="sticky top-[88px] z-20 bg-background/80 backdrop-blur-sm -mx-4 sm:mx-0 pt-4 pb-4 px-4 sm:px-0 mb-8">
                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by subject, code, or keyword..."
                                        className="w-full pl-9"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                     <Button variant="ghost" onClick={toggleSearch} size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                                        <X className="w-4 h-4"/>
                                        <span className="sr-only">Close search</span>
                                    </Button>
                                </div>
                                <div className="w-full flex flex-row gap-2">
                                    <Select value={selectedScheme} onValueChange={setSelectedScheme}>
                                        <SelectTrigger className="w-full sm:flex-grow"><SelectValue placeholder="Scheme" /></SelectTrigger>
                                        <SelectContent>
                                            {(schemes || []).map(scheme => <SelectItem key={scheme} value={scheme}>{scheme}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                                        <SelectTrigger className="w-full sm:flex-grow"><SelectValue placeholder="Branch" /></SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(branches || {}).map(([id, branch]) => <SelectItem key={id} value={id}>{branch.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                                        <SelectTrigger className="w-full sm:flex-grow"><SelectValue placeholder="Semester" /></SelectTrigger>
                                        <SelectContent>
                                            {[...Array(8)].map((_, i) => <SelectItem key={i+1} value={`${i+1}`}>Sem {i+1}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    {showSearchResults && (
                                        <Button variant="ghost" onClick={clearFilters} size="icon" className="flex-shrink-0">
                                            <X className="w-4 h-4"/>
                                            <span className="sr-only">Clear filters</span>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <ClientOnly fallback={<GridSkeleton />}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <div className="lg:col-span-8">
                                {showSearchResults ? (
                                    <div id="search-results" className="space-y-4">
                                        <h2 className="text-2xl font-bold">Search Results ({filteredSubjects.length})</h2>
                                        {filteredSubjects.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                                {filteredSubjects.map(subject => {
                                                    const branchId = subject.branch && subject.branch.length > 0 ? subject.branch[0] : 'first-year';
                                                    const branchName = branches[branchId]?.name || "General";
                                                    return (
                                                        <SubjectCard 
                                                            key={subject.code} 
                                                            subject={subject} 
                                                            branchName={branchName} 
                                                            onResultClick={() => setSearchTerm('')}
                                                        />
                                                    )
                                                })}
                                            </div>
                                        ) : (
                                            <div className="text-center py-16 text-muted-foreground bg-card border rounded-lg">
                                                <h2 className="text-2xl font-semibold">No Subjects Found</h2>
                                                <p>Try adjusting your search term or filters.</p>
                                            </div>
                                        )}
                                    </div>
                                ) : filteredBranches.length > 0 ? (
                                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {filteredBranches.map(([branchId, branchInfo], index) => {
                                            const subjectsInBranch = (subjects || []).filter(s => s.branch?.includes(branchId) && hasContent(s)).length;
                                            if (subjectsInBranch === 0 && selectedSemester) {
                                                return null;
                                            }

                                            const likes = branchInfo.likes || 0;
                                            const branchUrl = `/branch/${encodeURIComponent(branchId)}`;

                                            return (
                                                <Link key={branchId} href={branchUrl} className="group flex flex-col">
                                                    <Card className="h-full transition-all duration-300 flex flex-col hover:shadow-lg hover:-translate-y-1 overflow-hidden">
                                                        <div className="relative aspect-video bg-muted">
                                                            <Image
                                                                src="/card-bg7.png"
                                                                alt={branchInfo.name}
                                                                fill
                                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 flex items-center justify-center p-4">
                                                                <h3 className="text-2xl font-extrabold text-white text-center" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
                                                                    {branchInfo.name}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        <CardContent className="p-4 flex-grow">
                                                            <p className="text-sm text-muted-foreground line-clamp-2">{branchInfo.description}</p>
                                                        </CardContent>
                                                        <CardFooter className="p-4 pt-0 flex items-center justify-between text-muted-foreground text-xs">
                                                            <div className="flex items-center gap-1.5">
                                                                <BookCopyIcon className="w-4 h-4" />
                                                                <span>{subjectsInBranch} subject(s)</span>
                                                            </div>
                                                            <button onClick={(e) => handleLike(branchId, e)} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                                                                <Heart className="w-4 h-4" />
                                                                <span>{formatLikes(likes)}</span>
                                                            </button>
                                                        </CardFooter>
                                                    </Card>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-16 text-muted-foreground bg-card border rounded-lg col-span-full">
                                        <h2 className="text-2xl font-semibold">No Branches Found</h2>
                                        <p>Try adjusting your search filters.</p>
                                    </div>
                                )}
                            </div>
                            <aside className="lg:col-span-4 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Popular Downloads</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                    {popularDownloads.length === 0 ? (
                                            <div className="text-center py-8 text-muted-foreground">
                                                <p>No popular downloads yet.</p>
                                            </div>
                                    ) : (
                                            <ul className="space-y-1">
                                                {popularDownloads.map((item, index) => (
                                                    <li key={`${item.type}-${item.subjectCode}-${item.name}-${index}`}>
                                                        <ResourceViewerDialog
                                                            title={item.name}
                                                            embedUrl={item.url.replace('/view', '/preview')}
                                                            trigger={
                                                                <button className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted w-full text-left transition-colors">
                                                                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground font-bold text-sm">{index + 1}</div>
                                                                    <div className="flex-grow">
                                                                        <p className="font-bold text-sm">{item.subjectName}</p>
                                                                        <p className="text-xs text-muted-foreground">{item.name}</p>
                                                                    </div>
                                                                </button>
                                                            }
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                    )}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Follow Us</CardTitle>
                                        <CardDescription>Join our community for updates and more!</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-center gap-4">
                                            <SocialIcon name="whatsapp" url="https://whatsapp.com/channel/0029Vb6Kqwv6rsQqHrvQh81i" />
                                            <SocialIcon name="instagram" url="https://www.instagram.com/thevtuadda?utm_source=qr&igsh=Zmh2MmJpZXIzYWNw" />
                                            <SocialIcon name="telegram" url="https.t.me/vtuadda" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </aside>
                        </div>
                    </ClientOnly>
                </section>
                
                <ClientOnly>
                  <ContactForm />
                </ClientOnly>
                <ClientOnly>
                  <FeedbackForm />
                </ClientOnly>
            </div>
        </>
    );
}

    