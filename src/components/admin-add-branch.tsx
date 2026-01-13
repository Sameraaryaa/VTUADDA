
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubjectStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { schemes } from "@/data/subjects-initial"; // Import schemes directly

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Save } from "lucide-react";
import { Textarea } from "./ui/textarea";

const addBranchSchema = z.object({
    id: z.string().min(1, "Branch ID is required.").regex(/^[a-z0-9-]+$/, 'ID must be lowercase letters, numbers, and hyphens only.'),
    name: z.string().min(1, "Branch name is required."),
    description: z.string().min(1, "Description is required."),
    scheme: z.string({ required_error: "Please select a scheme." }).min(1, "Please select a scheme."),
});

type AddBranchFormValues = z.infer<typeof addBranchSchema>;

export function AddBranchDialog() {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { addBranch, branches } = useSubjectStore();

    const form = useForm<AddBranchFormValues>({
        resolver: zodResolver(addBranchSchema),
        defaultValues: {
            id: '',
            name: '',
            description: '',
            scheme: '',
        },
    });

    const onSubmit = async (data: AddBranchFormValues) => {
        if (branches[data.id]) {
            form.setError("id", { message: "This Branch ID already exists." });
            return;
        }
        try {
            await addBranch(data.id, {
                name: data.name,
                description: data.description,
                scheme: data.scheme,
                likes: 0,
                textbooks: []
            });
            toast({
                title: "Branch Added",
                description: `Successfully added ${data.name}.`,
            });
            setOpen(false);
            form.reset();
        } catch (error) {
            toast({
                title: "Error",
                description: "Could not add the new branch.",
                variant: "destructive",
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add Branch</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Add New Branch</DialogTitle>
                    <DialogDescription>
                        Create a new engineering branch. The ID should be a unique, URL-friendly slug.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Branch ID</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g., new-branch-name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Branch Name</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g., New Branch of Engineering" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="scheme"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Scheme</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger><SelectValue placeholder="Select a scheme" /></SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {schemes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                <Textarea placeholder="A short description of the branch." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button type="submit"><Save className="mr-2 h-4 w-4" /> Create Branch</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
