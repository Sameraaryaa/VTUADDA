
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { HardDriveDownload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

export function InstallPromptDialog() {
  const [isVisible, setIsVisible] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const hasSeenPrompt = sessionStorage.getItem('install-prompt-shown');
    const isInstalled = typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches;

    if (!hasSeenPrompt && !isInstalled) {
        const timer = setTimeout(() => {
            setIsVisible(true);
            sessionStorage.setItem('install-prompt-shown', 'true');
        }, 35000); // 35 seconds

        return () => clearTimeout(timer); // Cleanup timer if the component unmounts
    }
    
    return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    let hideTimer: NodeJS.Timeout;
    if (isVisible) {
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Disappear after 5 seconds
    }
    return () => clearTimeout(hideTimer);
  }, [isVisible]);

  const handleInstallClick = () => {
    if (installPrompt) {
        (installPrompt as any).prompt();
        (installPrompt as any).userChoice.then((choiceResult: { outcome: 'accepted' | 'dismissed' }) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            setInstallPrompt(null);
            setIsVisible(false);
        });
    } else {
        // Fallback for browsers that don't support the prompt (like iOS Safari)
        router.push('/download');
        setIsVisible(false);
    }
  }

  const handleDismiss = () => {
    setIsVisible(false);
  }

  return (
    <div className={cn(
        "fixed bottom-24 sm:bottom-4 left-4 right-4 sm:left-auto sm:max-w-md z-50 transition-all duration-500 ease-in-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"
      )}>
        <Card className="shadow-2xl">
             <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:bg-muted/50"
                onClick={handleDismiss}
                aria-label="Close install prompt"
            >
                <X className="w-4 h-4" />
            </Button>
            <CardHeader className="pr-10">
                <CardTitle className="text-lg flex items-center gap-2">
                    <img src="/icon.png" alt="vtuadda Logo" className="h-8 w-8 rounded-lg object-cover" />
                    Get the vtuadda App
                </CardTitle>
                <CardDescription>
                    For a faster, offline experience, add vtuadda to your home screen.
                </CardDescription>
            </CardHeader>
            <div className="p-6 pt-0 flex flex-col sm:flex-row gap-2">
                <Button onClick={handleInstallClick} className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90">
                    <HardDriveDownload className="mr-2 h-4 w-4" />
                    Install Now
                </Button>
                 <Button variant="secondary" onClick={handleDismiss} className="w-full">
                    Maybe Later
                </Button>
            </div>
        </Card>
    </div>
  );
}
