
"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSubjectStore } from "@/lib/store";
import { Skeleton } from "./ui/skeleton";
import { Instagram } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import type { LinkCategory } from "@/lib/types";

const SocialIcon = ({ name, url }: { name: string, url: string }) => {
    switch (name.toLowerCase()) {
        case "whatsapp":
            return (
                <a href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#25D366] text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.22 14.25c-.22-.11-.76-.38-1.04-.44s-.48-.11-.68.11c-.2.22-.39.44-.48.55-.09.11-.18.13-.33.04-.76-.36-1.42-.78-2-1.28-.48-.42-.96-.93-1.32-1.52-.09-.15-.04-.23.07-.34.1-.1.22-.26.33-.39.09-.11.13-.18.18-.3.06-.11.03-.22-.03-.33-.18-.36-1.04-2.5-1.42-3.41-.36-.88-.73-.76-.99-.76h-.48c-.27 0-.58.09-.88.36-.3.27-.94.91-.94 2.22s.97 2.56 1.1 2.74c.13.18 1.82 2.89 4.49 3.96.65.28 1.23.45 1.66.58.6.18 1.15.15 1.58.09.48-.06 1.42-.58 1.63-1.15.2-.58.2-.99.15-1.09s-.18-.16-.39-.27z"/></svg>
                </a>
            );
        case "instagram":
             return (
                <a href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white">
                    <Instagram size={20} />
                </a>
            );
        case "telegram":
            return (
                <a href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#229ED9] text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931L22.092 3.812c.27-1.24-.4-1.844-1.224-1.591L5.244 8.242c-1.22.48-1.214 1.165-.248 1.432l4.809 1.503 11.392-6.974c.546-.341 1.032-.158.633.243z"></path></svg>
                </a>
            );
        default:
            return null;
    }
}

const Copyright = () => {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        // This code runs only on the client, after hydration
        setYear(new Date().getFullYear());
    }, []);

    if (!year) {
        // Render a placeholder on the server and during initial client render
        return <p>&copy; vtuadda. All Rights Reserved.</p>;
    }

    return (
        <p>&copy; {year} vtuadda. All Rights Reserved.</p>
    );
};


const FooterSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <div className="space-y-3">
                    {[...Array(5)].map((_, j) => (
                        <Skeleton key={j} className="h-5 w-3/4" />
                    ))}
                </div>
            </div>
        ))}
    </div>
);

export function QuickLinksFooter() {
    const { linkCategories: allCategories, isLoading } = useSubjectStore();
    
    const uniqueCategories = useMemo(() => {
        const seenTitles = new Set<string>();
        const result: LinkCategory[] = [];
        // Iterate in reverse to keep the one with the higher order if titles are the same
        for (let i = allCategories.length - 1; i >= 0; i--) {
            const category = allCategories[i];
            if (!category) continue;
            const lowerCaseTitle = category.title.toLowerCase();
            if (!seenTitles.has(lowerCaseTitle)) {
                seenTitles.add(lowerCaseTitle);
                result.unshift(category); // Add to the beginning to maintain original order
            }
        }
        return result;
    }, [allCategories]);


    const showSkeleton = isLoading;

    if (showSkeleton) {
        return (
            <footer className="bg-card text-card-foreground border-t">
                 <div className="container mx-auto py-12 px-4 sm:px-6">
                    <FooterSkeleton />
                 </div>
            </footer>
        )
    }

    return (
        <footer className="bg-card text-card-foreground border-t">
            <div className="container mx-auto py-12 px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {uniqueCategories.map((category) => (
                        <div key={category.id}>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">{category.title}</h3>
                            <ul className="mt-4 space-y-3">
                                {category.links.map((link) => (
                                    <li key={link.text}>
                                        <Link href={link.url} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-base group" target={link.external ? "_blank" : "_self"} rel={link.external ? "noopener noreferrer" : ""}>
                                            {link.text}
                                            {link.external && <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                        <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Follow Us</h3>
                        <div className="flex gap-4 mt-4">
                            <SocialIcon name="whatsapp" url="https://whatsapp.com/channel/0029Vb6Kqwv6rsQqHrvQh81i" />
                            <SocialIcon name="instagram" url="https://www.instagram.com/thevtuadda?utm_source=qr&igsh=Zmh2MmJpZXIzYWNw" />
                            <SocialIcon name="telegram" url="https.t.me/vtuadda" />
                        </div>
                    </div>
                </div>
                 <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p className="mt-1">
                        Designed & Developed by <Link href="/authors" className="font-semibold text-primary hover:underline">ARYAA</Link>
                    </p>
                    <Copyright />
                </div>
            </div>
        </footer>
    );
}
