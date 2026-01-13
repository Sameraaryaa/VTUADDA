
import { BackButton } from "@/components/back-to-home-button";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Briefcase, MessageSquare, ExternalLink } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <BackButton />
            <header className="text-center">
                <h1 className="text-3xl sm:text-4xl font-headline font-bold tracking-tight text-gradient">Contact Us</h1>
                <p className="text-lg text-muted-foreground mt-2">
                    We’re here to help! Whether you have questions, suggestions, or feedback, we’d love to hear from you.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader className="flex-row items-center gap-4">
                        <Mail className="w-8 h-8 text-primary" />
                        <CardTitle>General Inquiries</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">For any questions regarding our study materials, site features, or general queries.</p>
                        <a href="mailto:thevtuadda@gmail.com" className="mt-4 inline-flex items-center font-semibold text-primary">
                            thevtuadda@gmail.com <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex-row items-center gap-4">
                        <Briefcase className="w-8 h-8 text-primary" />
                        <CardTitle>Collaborate With Us</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Interested in advertising your product or service? We offer banner ads and sponsored content opportunities.</p>
                        <a href="mailto:thevtuadda@gmail.com?subject=Advertising Inquiry" className="mt-4 inline-flex items-center font-semibold text-primary">
                            Contact for Advertising <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                    </CardContent>
                </Card>
            </div>
            
            <ContactForm />

        </div>
    )
}
