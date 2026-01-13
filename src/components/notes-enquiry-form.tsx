
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BookUp, UploadCloud, File, X, Send, Mail } from "lucide-react";
import React, { useState, useMemo } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { Progress } from "./ui/progress";
import { submitContribution } from "@/ai/flows/submit-contribution-flow";
import { ContributionInputSchema } from "@/lib/types";
import { useSubjectStore } from "@/lib/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";

// Schema for the contribution form
const contributionFormSchema = z.object({
  scheme: z.string().min(1, "Scheme is required."),
  branch: z.string().min(1, "Branch is required."),
  semester: z.string().min(1, "Semester is required."),
  subjectName: z.string().min(3, "Subject name must be at least 3 characters."),
  subjectCode: z.string().regex(/^[a-zA-Z0-9]{5,10}$/, "Please enter a valid subject code."),
  module: z.string().min(1, "Module is required."),
  name: z.string().min(2, "Your name is required."),
  email: z.string().email("A valid email is required to contact you."),
  showCredit: z.enum(["yes", "no"], {required_error: "Please select an option."}),
  resourceType: z.string().optional(),
});
type ContributionFormValues = z.infer<typeof contributionFormSchema>;

// Schema for the request form
const requestFormSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("A valid email is required."),
  subject: z.string().min(3, "Please enter the subject you are requesting."),
  message: z.string().optional(),
});
type RequestFormValues = z.infer<typeof requestFormSchema>;


// --- Contribution Form Component ---
const ContributeNotesForm = () => {
    const { toast } = useToast();
    const { edgestore } = useEdgeStore();
    const { schemes, branches } = useSubjectStore();
    const [file, setFile] = useState<File>();
    const [progress, setProgress] = useState(0);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<ContributionFormValues>({
        resolver: zodResolver(contributionFormSchema),
        defaultValues: { scheme: "", branch: "", semester: "", subjectName: "", subjectCode: "", module: "", name: "", email: "" },
    });
    
    const selectedScheme = form.watch("scheme");

    const filteredBranches = useMemo(() => {
        if (!selectedScheme) return [];
        return Object.entries(branches).filter(([, branchData]) => branchData.scheme === selectedScheme);
    }, [selectedScheme, branches]);

    async function onSubmit(values: ContributionFormValues) {
        if (!file) {
            toast({ title: "No File Selected", description: "Please select a file to upload.", variant: "destructive" });
            return;
        }
        
        setIsSubmitting(true);
        try {
        const res = await edgestore.publicFiles.upload({
            file,
            input: { type: 'contribution' },
            onProgressChange: (progress) => { setProgress(progress); },
        });

        await submitContribution({
            ...values,
            subjectCode: values.subjectCode.toUpperCase(),
            showCredit: values.showCredit === 'yes',
            resourceType: 'notes',
            fileUrl: res.url,
        });

        toast({ title: "Submission Successful!", description: "Thank you for your contribution. We will review it shortly." });

        form.reset();
        setFile(undefined);
        setProgress(0);
        } catch (error) {
        console.error('Error during contribution submission:', error);
        toast({ title: "Submission Failed", description: "An error occurred while submitting. Please try again.", variant: "destructive" });
        } finally {
        setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="scheme" render={({ field }) => (<FormItem><FormLabel>Scheme *</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}><FormControl><SelectTrigger><SelectValue placeholder="Choose Scheme" /></SelectTrigger></FormControl><SelectContent>{schemes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="branch" render={({ field }) => (<FormItem><FormLabel>Branch *</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting || !selectedScheme}><FormControl><SelectTrigger><SelectValue placeholder="Choose Branch" /></SelectTrigger></FormControl><SelectContent>{filteredBranches.map(([id, branch]) => <SelectItem key={id} value={branch.name}>{branch.name}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="semester" render={({ field }) => (<FormItem><FormLabel>Semester *</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}><FormControl><SelectTrigger><SelectValue placeholder="Choose Semester" /></SelectTrigger></FormControl><SelectContent>{[...Array(8)].map((_, i) => <SelectItem key={i + 1} value={`${i + 1}`}>Sem {i + 1}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="subjectName" render={({ field }) => (<FormItem><FormLabel>Subject Name *</FormLabel><FormControl><Input placeholder="E.g. Theory of Computation" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="subjectCode" render={({ field }) => (<FormItem><FormLabel>Subject Code *</FormLabel><FormControl><Input placeholder="E.g. BCS503" {...field} className="font-code uppercase" disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <FormField control={form.control} name="module" render={({ field }) => (<FormItem><FormLabel>Module *</FormLabel><FormControl><Input placeholder="E.g. module1" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Your Name *</FormLabel><FormControl><Input placeholder="E.g. Arya" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email Address *</FormLabel><FormControl><Input placeholder="E.g. aryasam248@gmail.com" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <div className="space-y-2">
                    <FormLabel>Upload file *</FormLabel>
                    {file ? (
                        <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 overflow-hidden"><File className="w-6 h-6 text-muted-foreground flex-shrink-0" /><span className="text-sm font-medium truncate">{file.name}</span></div>
                        <Button type="button" variant="ghost" size="icon" className="text-muted-foreground" onClick={() => setFile(undefined)} disabled={isSubmitting}><X className="w-4 h-4" /></Button>
                        </div>
                    ) : (
                        <div className="relative flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-background px-6 py-10 text-center transition-colors hover:border-primary/50" onDrop={(e) => { e.preventDefault(); setFile(e.dataTransfer.files[0]); }} onDragOver={(e) => e.preventDefault()}>
                        <div className="flex flex-col items-center gap-2 text-muted-foreground"><UploadCloud className="h-10 w-10" /><p className="font-medium">Drag and drop or <span className="text-primary">click to choose file</span></p><p className="text-xs">PDF, DOCX, ZIP supported</p></div>
                        <Input type="file" className="absolute inset-0 h-full w-full cursor-pointer opacity-0" onChange={(e) => setFile(e.target.files?.[0])} disabled={isSubmitting} />
                        </div>
                    )}
                </div>
                {progress > 0 && <Progress value={progress} />}
                <FormField control={form.control} name="showCredit" render={({ field }) => (<FormItem className="space-y-3"><FormLabel>Do you want to show your name as credit? *</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center gap-4" disabled={isSubmitting}><FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem><FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="no" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>)} />
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || !file}><Send className="mr-2 h-4 w-4" />{isSubmitting ? 'Submitting...' : 'Submit Contribution'}</Button>
            </form>
        </Form>
    );
};

// --- Request Form Component ---
const RequestNotesForm = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<RequestFormValues>({
        resolver: zodResolver(requestFormSchema),
        defaultValues: { name: "", email: "", subject: "", message: "" },
    });

    function onSubmit(data: RequestFormValues) {
        setIsSubmitting(true);
        try {
            const subject = encodeURIComponent(`Notes Request: ${data.subject}`);
            const body = encodeURIComponent(`Hello, I would like to request notes for the following subject:\n\nSubject: ${data.subject}\n\nAdditional Info: ${data.message || 'N/A'}\n\nFrom,\n${data.name}\n${data.email}`);
            const mailtoLink = `mailto:thevtuadda@gmail.com?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
            toast({ title: "Redirecting to your email client...", description: "Please complete sending the email from your mail app." });
            form.reset();
        } catch (error: any) {
            toast({ title: "Error", description: `Could not open email client: ${error.message}`, variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Your Name *</FormLabel><FormControl><Input placeholder="Your Name" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Your Email *</FormLabel><FormControl><Input placeholder="your.email@example.com" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <FormField control={form.control} name="subject" render={({ field }) => (<FormItem><FormLabel>Subject Name / Code *</FormLabel><FormControl><Input placeholder="e.g., Data Structures or BCS304" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormLabel>Additional Message (Optional)</FormLabel><FormControl><Textarea placeholder="Any specific details, like 'looking for handwritten notes'..." {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>)} />
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}><Mail className="mr-2 h-4 w-4" />{isSubmitting ? 'Opening Email...' : 'Send Request via Email'}</Button>
            </form>
        </Form>
    );
}

// --- Main Component with Tabs ---
export function NotesEnquiryForm() {
  return (
    <Card className="animate-fade-in-up">
      <CardContent className="p-4 sm:p-6">
        <Tabs defaultValue="contribute" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contribute">
                <BookUp className="mr-2 h-4 w-4" /> Contribute Notes
            </TabsTrigger>
            <TabsTrigger value="request">
                <Mail className="mr-2 h-4 w-4" /> Request Notes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="contribute" className="mt-6">
             <ContributeNotesForm />
          </TabsContent>
          <TabsContent value="request" className="mt-6">
            <p className="text-sm text-muted-foreground mb-4">Can't find the notes you're looking for? Let us know, and we'll do our best to find them for you. Submitting this form will open your default email client.</p>
            <RequestNotesForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
