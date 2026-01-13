
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HardDriveDownload, Search, Download } from 'lucide-react';
import type { ModelPaper, ModelPaperSet } from '@/data/model-papers-initial';
import { Input } from '@/components/ui/input';

// Custom hook to debounce fast-changing values
function useDebounce(value: string, delay: number): string {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

interface FilteredResult {
  mainTitle: string;
  link: ModelPaperSet;
}


export default function ModelPapersClientPage({ papers, title }: { papers: ModelPaper[], title: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms delay

  const allSets = useMemo(() => papers.flatMap(paper => paper.sets), [papers]);

  const filteredResults = useMemo((): ModelPaperSet[] => {
    if (!debouncedSearchTerm) {
      return [];
    }
    const lowerCaseSearch = debouncedSearchTerm.toLowerCase();
    return allSets.filter(set =>
        set.name.toLowerCase().includes(lowerCaseSearch)
    );
  }, [allSets, debouncedSearchTerm]);


  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
        <header className="p-6 bg-card rounded-xl border">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <Search className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gradient">
                        {title}
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground mt-1">
                        Official model question papers from VTU. {allSets.length} set(s) available.
                    </p>
                </div>
            </div>
        </header>

        <div className="relative sticky top-[63px] z-20 bg-background/80 backdrop-blur-sm py-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Enter subject code to find model paper..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
            />
        </div>

        {debouncedSearchTerm ? (
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Search Results ({filteredResults.length})</h2>
                {filteredResults.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredResults.map((result, index) => (
                        <Button key={index} asChild size="sm" variant="outline" className="flex-shrink-0 justify-start">
                            <a href={result.url} target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-4 w-4" />
                                <span className="truncate">{result.name}</span>
                            </a>
                        </Button>
                    ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-muted-foreground bg-card border rounded-lg col-span-full">
                        <h2 className="text-2xl font-semibold">No Results Found</h2>
                        <p>No model papers match your search. Try a different term.</p>
                    </div>
                )}
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-8">
                {papers.map((paper) => (
                    <Card key={paper.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="text-lg">{paper.title}</CardTitle>
                            <CardDescription>{paper.sets.length} set(s) available</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {paper.sets.map((set, index) => (
                                    <Button key={index} asChild size="sm" className="flex-shrink-0 justify-start">
                                        <a href={set.url} target="_blank" rel="noopener noreferrer">
                                            <HardDriveDownload className="mr-2 h-4 w-4" />
                                            <span className="truncate">{set.name}</span>
                                        </a>
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )}
    </div>
  );
}

    