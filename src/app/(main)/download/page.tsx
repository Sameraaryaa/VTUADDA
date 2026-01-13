
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HardDriveDownload, MoreVertical, PlusSquare, Share, CheckCircle2, Tv, Zap, WifiOff, Link as LinkIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InstallGuideAndroid } from "@/components/install-guide-android";
import type { Metadata } from "next";
import { BackButton } from "@/components/back-to-home-button";
import Script from 'next/script';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function DownloadPage() {
    const [installPrompt, setInstallPrompt] = useState<Event | null>(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setInstallPrompt(event);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = () => {
        if (!installPrompt) return;
        (installPrompt as any).prompt();
        (installPrompt as any).userChoice.then((choiceResult: { outcome: 'accepted' | 'dismissed' }) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            setInstallPrompt(null);
        });
    };

    const androidSteps = [
        {
            title: "Open the Menu",
            instruction: "Tap the three-dot menu icon at the top-right corner of your browser.",
            icon: <MoreVertical className="w-5 h-5 text-primary" />
        },
        {
            title: "Select 'Install app'",
            instruction: "Look for and tap on the 'Install app' or 'Add to Home screen' option in the menu.",
            icon: <HardDriveDownload className="w-5 h-5 text-primary" />
        },
        {
            title: "Confirm Installation",
            instruction: "A pop-up will appear. Tap 'Install' to add the vtuadda icon to your home screen.",
            icon: <CheckCircle2 className="w-5 h-5 text-primary" />
        }
    ];

    const iosSteps = [
        {
            title: "Open the Share Menu",
            instruction: "Tap the 'Share' icon at the bottom of the Safari browser screen.",
            icon: <Share className="w-6 h-6" />
        },
        {
            title: "Add to Home Screen",
            instruction: "Scroll down in the share sheet and tap on 'Add to Home Screen'.",
            icon: <PlusSquare className="w-6 h-6" />
        },
        {
            title: "Confirm and Add",
            instruction: "You can rename the app if you wish, then tap 'Add' in the top-right corner to place it on your home screen.",
            icon: <CheckCircle2 className="w-6 h-6" />
        }
    ];

    const benefits = [
        {
            icon: <Tv className="w-5 h-5 text-primary" />,
            feature: "App-like Experience",
            benefit: "Launch it directly from your home screen just like a native app."
        },
        {
            icon: <Zap className="w-5 h-5 text-primary" />,
            feature: "Faster Performance",
            benefit: "Enjoy quicker loading times and smoother navigation."
        },
        {
            icon: <WifiOff className="w-5 h-5 text-primary" />,
            feature: "Offline Access",
            benefit: "Access downloaded materials even without an internet connection."
        },
        {
            icon: <LinkIcon className="w-5 h-5 text-primary" />,
            feature: "Instant Access",
            benefit: "No need to open a browser and type the URL every time."
        }
    ];
    
    const pageSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "vtuadda",
      "operatingSystem": "WEB, ANDROID, IOS",
      "applicationCategory": "EducationalApplication",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "250"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-12 px-4 sm:px-0" data-ai-id="download-page-container">
            <Script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
            />
            <BackButton />
            <section className="text-center" data-ai-id="download-page-header">
                <h1 className="text-3xl sm:text-4xl font-headline font-bold tracking-tight text-gradient" data-ai-id="download-page-heading">
                    Install vtuadda
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto" data-ai-id="download-page-subheading">
                    Get quick access to all your study materials by adding vtuadda to your home screen. It’s fast, free, and works offline!
                </p>
            </section>
            
            {installPrompt && (
                <Card className="bg-primary/10 border-primary/20 animate-fade-in-up">
                    <CardHeader className="text-center">
                        <CardTitle>One-Click Install Available!</CardTitle>
                        <CardDescription>Your browser supports direct installation.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Button size="lg" onClick={handleInstallClick}>
                            <HardDriveDownload className="mr-2 h-5 w-5" />
                            Install vtuadda App Now
                        </Button>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-ai-id="download-guides-grid">
                <Card data-ai-id="android-guide-card">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold" data-ai-id="android-guide-title">
                            For Android Users
                        </CardTitle>
                        <CardDescription data-ai-id="android-guide-desc">Using Chrome or a Chromium-based browser.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2 space-y-6">
                        <InstallGuideAndroid />
                       {androidSteps.map((step, index) => (
                            <div key={index} className="flex items-start gap-4" data-ai-id={`android-step-${index + 1}`}>
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">{index + 1}</div>
                                <div className="flex-grow pt-1">
                                    <p className="font-semibold text-lg flex items-center gap-2">
                                        {step.icon}
                                        {step.title}
                                    </p>
                                    <p className="text-muted-foreground mt-1">{step.instruction}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card data-ai-id="ios-guide-card">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold" data-ai-id="ios-guide-title">
                            For iOS (iPhone/iPad) Users
                        </CardTitle>
                        <CardDescription data-ai-id="ios-guide-desc">Using the Safari browser.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        {iosSteps.map((step, index) => (
                            <li key={index} className="flex items-start gap-4 list-none" data-ai-id={`ios-step-${index + 1}`}>
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">{index + 1}</div>
                                <div className="flex-grow pt-1">
                                    <p className="font-semibold text-lg flex items-center gap-2">
                                        <span className="text-primary">{step.icon}</span>
                                        {step.title}
                                    </p>
                                    <p className="text-muted-foreground mt-1">{step.instruction}</p>
                                </div>
                            </li>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Card data-ai-id="benefits-card">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-center text-gradient" data-ai-id="benefits-title">Benefits of Installing the vtuadda App</CardTitle>
                    <CardDescription className="text-center" data-ai-id="benefits-desc">Get the best experience by adding our app to your home screen.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]" data-ai-id="benefits-table-header-feature">Feature</TableHead>
                                <TableHead data-ai-id="benefits-table-header-benefit">Benefit</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {benefits.map((item, index) => (
                                <TableRow key={index} data-ai-id={`benefit-row-${index + 1}`}>
                                    <TableCell className="font-semibold flex items-center gap-2">
                                        {item.icon} {item.feature}
                                    </TableCell>
                                    <TableCell>{item.benefit}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

             <section className="text-center text-muted-foreground" data-ai-id="download-footer-text">
                <p>That's it! You can now launch vtuadda just like any other app directly from your home screen.</p>
            </section>
        </div>
    );
}
