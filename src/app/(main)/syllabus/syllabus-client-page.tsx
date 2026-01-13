
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Search, FileCode, ChevronDown } from 'lucide-react';
import type { Syllabus } from '@/data/syllabus-initial';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';

interface FilteredResult {
  mainTitle: string;
  link: {
    label: string;
    url: string;
  };
}

// A custom hook to debounce any fast-changing value
function useDebounce(value: string, delay: number): string {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set up a timer to update the debounced value after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clean up the timer if the value changes before the delay has passed
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}


export default function SyllabusClientPage({ syllabi }: { syllabi: Syllabus[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms delay

  const filteredResults = useMemo((): FilteredResult[] => {
    if (!debouncedSearchTerm) {
      return [];
    }

    const lowerCaseSearch = debouncedSearchTerm.toLowerCase();
    const results: FilteredResult[] = [];

    syllabi.forEach(syllabus => {
      const mainTitleMatch = syllabus.title.toLowerCase().includes(lowerCaseSearch) || syllabus.description.toLowerCase().includes(lowerCaseSearch);

      if (mainTitleMatch) {
          results.push({
              mainTitle: syllabus.title,
              link: { label: `Main Syllabus: ${syllabus.title}`, url: syllabus.url }
          });
          if (syllabus.additionalUrls) {
            syllabus.additionalUrls.forEach(link => {
                results.push({ mainTitle: syllabus.title, link });
            });
          }
      } else {
         if (syllabus.additionalUrls) {
             syllabus.additionalUrls.forEach(link => {
                 if(link.label.toLowerCase().includes(lowerCaseSearch)) {
                     results.push({ mainTitle: syllabus.title, link });
                 }
             });
         }
      }
    });

    return results;
  }, [syllabi, debouncedSearchTerm]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
        <header className="p-6 bg-card rounded-xl border">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <FileCode className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gradient">
                        UG Scheme and Syllabus
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground mt-1">
                        Official VTU curriculum documents for all streams.
                    </p>
                </div>
            </div>
        </header>

        <div className="relative sticky top-[63px] z-20 bg-background/80 backdrop-blur-sm py-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search by stream, subject, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
            />
        </div>

        {debouncedSearchTerm ? (
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Search Results ({filteredResults.length})</h2>
                {filteredResults.length > 0 ? (
                    filteredResults.map((result, index) => (
                        <Card key={index} className="transition-shadow hover:shadow-md">
                            <CardContent className="p-4 flex items-center justify-between gap-4">
                                <div className="flex-grow min-w-0">
                                    <p className="font-semibold truncate">{result.link.label}</p>
                                    <p className="text-sm text-muted-foreground">{result.mainTitle}</p>
                                </div>
                                <Button asChild size="sm" variant="secondary" className="flex-shrink-0">
                                    <a href={result.link.url} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-16 text-muted-foreground bg-card border rounded-lg col-span-full">
                        <h2 className="text-2xl font-semibold">No Results Found</h2>
                        <p>No syllabus documents match your search. Try a different term.</p>
                    </div>
                )}
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {syllabi.map((syllabus) => (
                    <Card key={syllabus.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="text-lg">{syllabus.title}</CardTitle>
                            <CardDescription>{syllabus.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col gap-2">
                            <Button asChild size="sm" className="w-full">
                                <a href={syllabus.url} target="_blank" rel="noopener noreferrer">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Main Syllabus
                                </a>
                            </Button>
                            {syllabus.additionalUrls && syllabus.additionalUrls.length > 0 && (
                                <>
                                    <div className="relative my-2">
                                        <Separator />
                                        <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-card px-2 text-xs text-muted-foreground">
                                            Or
                                        </span>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full">
                                                Year-wise &amp; Subject-wise Syllabus
                                                <ChevronDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] max-h-60 overflow-y-auto" align="start">
                                            {syllabus.additionalUrls.map(link => (
                                                <DropdownMenuItem key={link.label} asChild>
                                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between cursor-pointer">
                                                        <span>{link.label}</span>
                                                        <Download className="mr-2 h-4 w-4" />
                                                    </a>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        )}
    </div>
  );
}

    