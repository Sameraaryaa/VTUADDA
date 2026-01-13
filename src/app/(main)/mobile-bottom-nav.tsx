
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    BookOpenIcon,
    CalculatorIcon, 
    Squares2X2Icon
} from '@heroicons/react/24/outline';
import { cn } from "@/lib/utils";
import { useState } from "react";
import { QuickActionsDialog } from "@/components/quick-actions-dialog";
import { FileSearch, BookUp, Bookmark } from "lucide-react";

const NavItem = ({ href, label, icon: Icon, isActive }: { href: string; label: string; icon: React.ElementType; isActive: boolean }) => (
    <Link href={href} className={cn(
        "flex flex-col items-center justify-center h-full gap-1 w-full rounded-lg",
        isActive ? "text-primary font-semibold" : "text-muted-foreground",
        "transition-all duration-200 hover:text-primary"
    )}>
        <Icon className="w-6 h-6" />
        <span className="text-xs font-medium">{label}</span>
    </Link>
);

export function MobileBottomNav() {
    const pathname = usePathname();
    const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

    const navItems = [
        { href: "/textbooks", label: "Textbooks", icon: Bookmark },
        { href: "/pyq", label: "PYQs", icon: FileSearch },
        { href: "/calculator", label: "SGPA", icon: CalculatorIcon },
        { href: "/upload", label: "Upload", icon: BookUp },
    ];
    
    return (
        <>
            {/* Main Floating Bar */}
            <div className="sm:hidden fixed bottom-4 left-4 right-4 h-16 bg-card/80 backdrop-blur-sm border border-border/80 z-50 rounded-xl shadow-lg">
                 <div className="grid h-full grid-cols-5 items-center px-2 relative">
                    <NavItem {...navItems[0]} isActive={pathname === navItems[0].href} />
                    <NavItem {...navItems[1]} isActive={pathname === navItems[1].href} />
                    
                    {/* Placeholder for the central button */}
                    <div />

                    <NavItem {...navItems[2]} isActive={pathname === navItems[2].href} />
                    <NavItem {...navItems[3]} isActive={pathname === navItems[3].href} />
                 </div>
            </div>

            {/* Central Elevated Button */}
            <div className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 z-50">
                 <div className="relative flex justify-center items-center w-full h-full">
                     <button
                        onClick={() => setIsQuickActionsOpen(true)}
                        className="w-16 h-16 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center transform active:scale-90 transition-transform shadow-lg shadow-pink-500/40 dark:shadow-pink-500/30 absolute top-[-0.75rem] border-4 border-background"
                        aria-label="Open Quick Actions"
                    >
                        <Squares2X2Icon className="w-7 h-7" />
                    </button>
                </div>
            </div>

            <QuickActionsDialog open={isQuickActionsOpen} onOpenChange={setIsQuickActionsOpen} />
        </>
    );
}
