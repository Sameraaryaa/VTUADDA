

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen,
  Calculator, 
  Menu,
  Download,
  FlaskConical,
  Bookmark,
  FileSearch, 
  Users, 
  HelpCircle,
  BookUp,
  BookCopy,
  ChevronDown,
  Search,
  Instagram,
  Send,
  BookText,
  Bell,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { ClientOnly } from "@/components/client-only";
import { ScrollToTop } from "@/components/scroll-to-top";
import { useSubjectStore } from "@/lib/store";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";


const navItems = [
  { href: "/", label: "Browse", icon: BookOpen },
  { href: "/pyq", label: "PYQ Search", icon: FileSearch },
  { href: "/model-papers", label: "Model Papers", icon: BookCopy },
  { href: "/textbooks", label: "Textbooks", icon: Bookmark },
  { href: "/labs", label: "Lab Resources", icon: FlaskConical },
  { href: "/upload", label: "Notes Enquiry", icon: BookUp },
  { href: "/calculator", label: "Calculators", icon: Calculator },
];

const resourcesNavItems = [
    { href: "/resources/vtu-revaluation-guide", label: "Revaluation Guide", icon: BookText },
    { href: "/resources/how-to-calculate-sgpa-cgpa", label: "SGPA/CGPA Guide", icon: BookText },
];

const moreNavItems = [
    { href: "/download", label: "Download App", icon: Download },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
    { href: "/authors", label: "About Us", icon: Users }
];

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.22 14.25c-.22-.11-.76-.38-1.04-.44s-.48-.11-.68.11c-.2.22-.39.44-.48.55-.09.11-.18.13-.33.04-.76-.36-1.42-.78-2-1.28-.48-.42-.96-.93-1.32-1.52-.09-.15-.04-.23.07-.34.1-.1.22-.26.33-.39.09-.11.13-.18.18-.3.06-.11.03-.22-.03-.33-.18-.36-1.04-2.5-1.42-3.41-.36-.88-.73-.76-.99-.76h-.48c-.27 0-.58.09-.88.36-.3.27-.94.91-.94 2.22s.97 2.56 1.1 2.74c.13.18 1.82 2.89 4.49 3.96.65.28 1.23.45 1.66.58.6.18 1.15.15 1.58.09.48-.06 1.42-.58 1.63-1.15.2-.58.2-.99.15-1.09s-.18-.16-.39-.27z"/>
    </svg>
);

const socialNavItems = [
    { href: "https://whatsapp.com/channel/0029Vb6Kqwv6rsQqHrvQh81i", label: "WhatsApp Channel", icon: WhatsAppIcon },
    { href: "https://www.instagram.com/thevtuadda?utm_source=qr&igsh=Zmh2MmJpZXIzYWNw", label: "Instagram", icon: Instagram },
    { href: "https.t.me/vtuadda", label: "Telegram", icon: Send },
];


function NotificationBell() {
    const { campaigns } = useSubjectStore();
    const [hasUnread, setHasUnread] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const activeCampaigns = campaigns.filter(c => c.isActive);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && activeCampaigns.length > 0 && !sessionStorage.getItem('viewed-notifications-session')) {
            setHasUnread(true);
        }
    }, [isMounted, activeCampaigns]);

    const handleOpen = (open: boolean) => {
        if (open && hasUnread) {
            setHasUnread(false);
            sessionStorage.setItem('viewed-notifications-session', 'true');
        }
    };
    
    if (!isMounted) {
        return <Skeleton className="h-10 w-10 rounded-full" />
    }
    
    return (
        <DropdownMenu onOpenChange={handleOpen}>
            <DropdownMenuTrigger asChild>
                 <Button variant="outline" size="icon" className="relative" aria-label="Open Notifications">
                    <Bell className="h-[1.2rem] w-[1.2rem]" />
                    {hasUnread && (
                        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Announcements</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {activeCampaigns.length > 0 ? (
                        activeCampaigns.map(campaign => (
                            <DropdownMenuItem key={campaign.id} asChild className="cursor-pointer">
                                <Link href={campaign.ctaLink || '#'} className="flex flex-col items-start gap-1 whitespace-normal">
                                    <p className="font-bold">{campaign.title}</p>
                                    <p className="text-muted-foreground text-sm">{campaign.message}</p>
                                </Link>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <DropdownMenuItem disabled>
                            <p className="text-muted-foreground text-center w-full py-4">No new announcements</p>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default function MainLayoutClient({
  children,
}: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleSearch } = useSubjectStore();

  return (
      <>
        <div className="flex min-h-screen w-full flex-col bg-background">
            <header className="sticky top-0 z-30 w-full container mx-auto px-4 sm:px-6">
                <div className="relative w-full border bg-card/80 p-4 shadow-lg backdrop-blur-sm rounded-2xl mt-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                                <SheetTrigger asChild>
                                <Button size="icon" variant="outline" className="sm:hidden" aria-label="Toggle Menu">
                                    <Menu className="h-5 w-5" />
                                </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="sm:max-w-xs p-0 flex flex-col">
                                <SheetHeader className="p-4 border-b flex-shrink-0">
                                    <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>
                                <ScrollArea className="flex-grow">
                                    <nav className="grid gap-6 text-lg font-medium p-4">
                                        {[...navItems, ...resourcesNavItems, ...moreNavItems].map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                            "flex items-center gap-4 px-2.5 text-foreground/70 hover:text-foreground",
                                            pathname === item.href ? "text-foreground font-semibold" : ""
                                            )}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            {item.label}
                                        </Link>
                                        ))}
                                        <Separator />
                                        {socialNavItems.map((item) => (
                                            <a
                                                key={item.href}
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center gap-4 px-2.5 text-foreground/70 hover:text-foreground"
                                            >
                                                <item.icon className="h-5 w-5" />
                                                {item.label}
                                            </a>
                                            ))}
                                    </nav>
                                </ScrollArea>
                                </SheetContent>
                            </Sheet>
                            <Link
                                href="/"
                                className="group flex items-center justify-start gap-2 text-lg font-semibold text-foreground"
                            >
                                <div className="h-8 w-8">
                                    <img src="/icon.png" alt="vtuadda Logo" className="h-full w-full rounded-full object-cover" />
                                </div>
                                <span className="font-bold text-foreground sm:inline">vtuadda</span>
                            </Link>
                        </div>
                        
                        <nav className="hidden sm:flex items-center gap-4 lg:gap-6">
                        <ClientOnly>
                            {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.label}
                            </Link>
                            ))}
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus:outline-none">
                                    Resources
                                    <ChevronDown className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {resourcesNavItems.map(item => (
                                        <DropdownMenuItem key={item.href} asChild>
                                            <Link href={item.href}>
                                                <item.icon className="mr-2 h-4 w-4" />
                                                {item.label}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus:outline-none">
                                    More
                                    <ChevronDown className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {moreNavItems.map(item => (
                                        <DropdownMenuItem key={item.href} asChild>
                                            <Link href={item.href}>
                                                <item.icon className="mr-2 h-4 w-4" />
                                                {item.label}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </ClientOnly>
                        </nav>

                        <div className="flex items-center gap-2">
                             <Button variant="outline" size="icon" onClick={toggleSearch} aria-label="Open Search">
                                <Search className="h-[1.2rem] w-[1.2rem]" />
                            </Button>
                             <ClientOnly>
                                <NotificationBell />
                             </ClientOnly>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
                {children}
            </main>
            <ScrollToTop />
        </div>
      </>
  );
}
