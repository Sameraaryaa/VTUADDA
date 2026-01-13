
"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubjectStore } from "@/lib/store";
import type { Branch } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Plus, Save, Settings, Trash2 } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";

const noteSchema = z.object({
  name: z.string().min(1, "Note name is required."),
  url: z.string().url("Please enter a valid URL."),
});

const branchFormSchema = z.object({
    name: z.string().min(1, "Branch name is required."),
    description: z.string().min(1, "Description is required."),
    scheme: z.string().min(1, "Scheme is required."),
    textbooks: z.array(noteSchema).optional(),
});

type BranchFormValues = z.infer<typeof branchFormSchema>;

export function ManageBranchDialog({ branchId, branchInfo }: { branchId: string; branchInfo: Branch }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { updateBranch, schemes } = useSubjectStore();

    const form = useForm<BranchFormValues>({
        resolver: zodResolver(branchFormSchema),
        defaultValues: {
            name: branchInfo.name,
            description: branchInfo.description,
            scheme: branchInfo.scheme,
            textbooks: branchInfo.textbooks || [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'textbooks',
    });

    const onSubmit = async (data: BranchFormValues) => {
        try {
            await updateBranch(branchId, { ...branchInfo, ...data });
            toast({
                title: "Branch Updated",
                description: `Successfully updated ${data.name}.`,
            });
            setOpen(false);
        } catch (error) {
            toast({
                title: "Error",
                description: "Could not update the branch.",
                variant: "destructive",
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"><Settings className="mr-2 h-4 w-4" /> Manage Branch</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Manage: {branchInfo.name}</DialogTitle>
                    <DialogDescription>
                        Edit branch details and manage recommended textbooks.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh] pr-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Branch Name</FormLabel>
                                        <FormControl>
                                        <Input {...field} />
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
                                                <SelectTrigger><SelectValue placeholder="Select scheme" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {schemes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                    <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <Card>
                                <CardHeader>
                                    <CardTitle>Recommended Textbooks</CardTitle>
                                    <CardDescription>Manage the common textbooks for this entire branch.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="grid grid-cols-12 gap-x-4 gap-y-2 items-start p-3 border rounded-md relative bg-background">
                                            <div className="col-span-12 md:col-span-5">
                                                <FormField
                                                    control={form.control}
                                                    name={`textbooks.${index}.name`}
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel className="text-xs">Textbook Name</FormLabel>
                                                            <FormControl><Input placeholder="e.g. Higher Engineering Mathematics" {...field} /></FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <FormField
                                                    control={form.control}
                                                    name={`textbooks.${index}.url`}
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel className="text-xs">Download URL</FormLabel>
                                                            <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="col-span-12 md:col-span-1 flex items-end justify-end h-full">
                                                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="text-destructive hover:bg-destructive/10">
                                                    <Trash2 className="w-4 h-4"/>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" onClick={() => append({ name: "", url: "" })}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Textbook
                                    </Button>
                                </CardContent>
                            </Card>
                             <DialogFooter className="sticky bottom-0 bg-background pt-4">
                                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                                <Button type="submit"><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
