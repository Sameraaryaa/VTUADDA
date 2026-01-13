
"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.22 14.25c-.22-.11-.76-.38-1.04-.44s-.48-.11-.68.11c-.2.22-.39.44-.48.55-.09.11-.18.13-.33.04-.76-.36-1.42-.78-2-1.28-.48-.42-.96-.93-1.32-1.52-.09-.15-.04-.23.07-.34.1-.1.22-.26.33-.39.09-.11.13-.18.18-.3.06-.11.03-.22-.03-.33-.18-.36-1.04-2.5-1.42-3.41-.36-.88-.73-.76-.99-.76h-.48c-.27 0-.58.09-.88.36-.3.27-.94.91-.94 2.22s.97 2.56 1.1 2.74c.13.18 1.82 2.89 4.49 3.96.65.28 1.23.45 1.66.58.6.18 1.15.15 1.58.09.48-.06 1.42-.58 1.63-1.15.2-.58.2-.99.15-1.09s-.18-.16-.39-.27z"/>
    </svg>
);

export const WhatsappBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const hasBeenDismissed = sessionStorage.getItem('whatsapp-banner-dismissed');
    if (hasBeenDismissed) {
        setIsDismissed(true);
        return;
    }
    
    // Show banner after a short delay
    const showTimer = setTimeout(() => {
        setIsVisible(true);
    }, 2000); // 2 seconds

    // Automatically hide banner after 6 seconds
    const hideTimer = setTimeout(() => {
        handleClose();
    }, 8000); // 2s show delay + 6s visible = 8s total from mount

    return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Use a timeout to allow the fade-out animation to complete before setting display to none
    setTimeout(() => {
      setIsDismissed(true);
      sessionStorage.setItem('whatsapp-banner-dismissed', 'true');
    }, 500);
  };

  if (isDismissed && !isVisible) {
      return null;
  }

  return (
    <div
      className={cn(
        "fixed top-20 sm:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-auto z-50 transition-all duration-500 ease-in-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}
    >
      <div className="relative p-2.5 pr-10 sm:p-3 sm:pr-12 bg-card border rounded-xl shadow-lg flex items-center gap-2 sm:gap-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#25D366] text-white">
            <WhatsAppIcon className="w-6 h-6" />
        </div>
        <div className="flex-grow">
            <h4 className="font-bold text-sm sm:text-base">Join our WhatsApp Community!</h4>
            <p className="text-xs sm:text-sm text-muted-foreground">Get the latest updates, notes, and connect with peers.</p>
        </div>
        <Button size="sm" asChild className="text-xs sm:text-sm">
          <a href="https://whatsapp.com/channel/0029Vb6Kqwv6rsQqHrvQh81i" target="_blank" rel="noopener noreferrer">
            Join
          </a>
        </Button>
         <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-7 w-7 text-muted-foreground hover:bg-muted/50"
            onClick={handleClose}
            aria-label="Close banner"
        >
            <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
