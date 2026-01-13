

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
    BookOpen, 
    Calculator, 
    Download, 
    FlaskConical, 
    Bookmark, 
    FileSearch, 
    Users, 
    HelpCircle,
    BookCopy,
    BookUp,
    BookText
} from 'lucide-react';
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";

const quickActions = [
    { href: "/", label: "Browse", icon: BookOpen },
    { href: "/pyq", label: "PYQ Search", icon: FileSearch },
    { href: "/model-papers", label: "Model Papers", icon: BookCopy },
    { href: "/textbooks", label: "Textbooks", icon: Bookmark },
    { href: "/labs", label: "Lab Resources", icon: FlaskConical },
    { href: "/upload", label: "Notes Enquiry", icon: BookUp },
    { href: "/calculator", label: "Calculators", icon: Calculator },
    { href: "/resources/vtu-revaluation-guide", label: "Revaluation Guide", icon: BookText },
    { href: "/resources/how-to-calculate-sgpa-cgpa", label: "SGPA/CGPA Guide", icon: BookText },
    { href: "/download", label: "Download App", icon: Download },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
    { href: "/authors", label: "About Us", icon: Users }
];


interface QuickActionsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function QuickActionsDialog({ open, onOpenChange }: QuickActionsDialogProps) {
    const pathname = usePathname();
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bottom-0 translate-y-0 rounded-b-none rounded-t-xl sm:bottom-auto sm:translate-y-[-50%] sm:rounded-lg p-4">
          <DialogHeader className="px-2">
            <DialogTitle>Quick Actions</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] sm:max-h-[70vh]">
           <div className="grid grid-cols-4 gap-2 p-2">
                {quickActions.map(action => (
                    <Link key={action.href} href={action.href} onClick={() => onOpenChange(false)}>
                        <div className={cn(
                            "flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg aspect-square text-center",
                            pathname === action.href 
                                ? "bg-primary/10 text-primary" 
                                : "bg-muted text-muted-foreground hover:bg-muted/50"
                        )}>
                            <action.icon className="w-6 h-6"/>
                            <span className="text-xs font-medium leading-tight">{action.label}</span>
                        </div>
                    </Link>
                ))}
           </div>
           </ScrollArea>
        </DialogContent>
      </Dialog>
    )
}
