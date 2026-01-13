
"use client";

import { useMemo, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Search, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { ClientOnly } from '@/components/client-only';
import { ResourceLink } from '@/components/resource-viewer';
import type { Textbook } from '@/lib/types';
import Script from 'next/script';
import { useSubjectStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

const TextbookCard = ({ textbook, index }: { textbook: Textbook, index: number }) => {
    return (
        <Card className="flex flex-col animate-fade-in-up transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{animationDelay: `${index * 50}ms`}}>
            <CardHeader className="pb-4">
                 <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Book className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-bold leading-tight">{textbook.title}</CardTitle>
                <div className="text-sm text-muted-foreground pt-1">
                    <p>Author: {textbook.author}</p>
                </div>
            </CardHeader>
            <CardContent className="flex-grow" />
            <CardFooter className="mt-auto flex gap-2 pt-0">
                <ResourceLink name={textbook.title} url={textbook.downloadUrl} />
            </CardFooter>
        </Card>
    );
};

const TextbookSkeleton = () => (
    <Card className="flex flex-col">
        <CardHeader className="pb-4">
             <Skeleton className="w-12 h-12 rounded-lg mb-4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="flex-grow" />
        <CardFooter className="mt-auto flex gap-2 pt-0">
            <Skeleton className="h-9 w-full" />
        </CardFooter>
    </Card>
);

export default function TextbooksClientPage({ textbooks }: { textbooks: Textbook[] }) {
    const [isLoading, setIsLoading] = useState(false);
    const { searchTerm, setSearchTerm, isSearchVisible } = useSubjectStore();

    const filteredTextbooks = useMemo(() => {
        if (!searchTerm) {
            return textbooks;
        }
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return textbooks.filter(t => 
            t.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            t.author.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }, [textbooks, searchTerm]);

    return (
        <div className="space-y-8">
            <section className="animate-slide-in-from-top">
                <h1 className="text-3xl sm:text-4xl font-headline font-bold tracking-tight text-gradient">
                    Textbook Library
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground mt-2">
                    A comprehensive collection of recommended textbooks for various VTU subjects. Use the search to find books by title or author.
                </p>
            </section>
            <ClientOnly>
                {isSearchVisible && (
                    <div className="sticky top-[88px] z-20 bg-background/80 backdrop-blur-sm py-4 -mx-4 sm:mx-0 px-4 sm:px-0">
                        <div className="flex justify-end animate-fade-in-up">
                            <div className="relative w-full md:w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by title or author..."
                                    className="w-full pl-9"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                    {isLoading ? (
                        [...Array(8)].map((_, i) => <TextbookSkeleton key={i} />)
                    ) : filteredTextbooks.length > 0 ? (
                        filteredTextbooks.map((book, index) => <TextbookCard key={book.id} textbook={book} index={index} />)
                    ) : (
                        <div className="col-span-full text-center py-16 text-muted-foreground bg-card border rounded-lg animate-fade-in">
                            <h2 className="text-2xl font-semibold">No Textbooks Found</h2>
                            <p>{searchTerm ? "No textbooks match your search term." : "No textbooks have been added yet."}</p>
                        </div>
                    )}
                </div>
            </ClientOnly>
        </div>
    );
}
