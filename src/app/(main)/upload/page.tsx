
import { BackButton } from "@/components/back-to-home-button";
import { ClientOnly } from "@/components/client-only";
import { NotesEnquiryForm } from "@/components/notes-enquiry-form";
import type { Metadata } from "next";
import Script from "next/script";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Coffee } from "lucide-react";

export const metadata: Metadata = {
    title: 'Contribute or Request Materials | vtuadda',
    description: 'Contribute your notes to the vtuadda community or request materials for a subject to help us grow our library.',
}

export default function UploadPage() {
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-0 space-y-8" data-ai-id="upload-page-container">
                <BackButton />
                <div className="mb-6 text-center animate-slide-in-from-top" data-ai-id="upload-page-header">
                    <h1 className="text-3xl font-headline font-bold tracking-tight text-gradient" data-ai-id="upload-page-heading">Help Us Grow</h1>
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto" data-ai-id="upload-page-subheading">
                        Contribute your notes or request materials for a subject. Your help is valuable to the community.
                    </p>
                </div>
                <ClientOnly>
                    <NotesEnquiryForm />
                </ClientOnly>

                 <Card className="animate-fade-in-up">
                    <CardHeader className="text-center items-center">
                        <div className="p-3 bg-primary/10 rounded-full w-fit mb-2">
                            <Coffee className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Like Our Work?</CardTitle>
                        <CardDescription>
                            Your support helps us cover server costs and keep this platform free for all students. Consider buying us a coffee!
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        <Image
                            src="/qr-code.png"
                            alt="Buy Me a Coffee QR Code"
                            width={200}
                            height={200}
                            className="rounded-lg border p-1"
                            data-ai-hint="QR code"
                        />
                        <p className="text-sm text-muted-foreground">Scan to support us</p>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
