
"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
        variant="default"
        size="icon"
        onClick={scrollToTop}
        className={cn(
            "fixed bottom-28 right-6 h-12 w-12 rounded-full shadow-lg transition-opacity duration-300 z-40 sm:bottom-6",
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-label="Scroll to top"
    >
        <ArrowUp className="h-6 w-6" />
    </Button>
  );
}
