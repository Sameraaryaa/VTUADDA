
"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubjectStore } from "@/lib/store";
import type { LabResource } from "@/lib/types";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Edit, Trash2, Plus, Save } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

const labManualSchema = z.object({
    name: z.string().min(1, "Manual name is required."),
    url: z.string().url("Please enter a valid URL."),
});

const labResourceSchema = z.object({
  subjectName: z.string().min(3, "Subject Name is required."),
  subjectCode: z.string().min(3, "Subject Code is required."),
  branchName: z.string().min(2, "Branch Name is required."),
  semester: z.coerce.number().min(1).max(8),
  manuals: z.array(labManualSchema).min(1, "At least one manual is required."),
});

type LabFormValues = z.infer<typeof labResourceSchema>;

function LabResourceForm({ lab, onFinished }: { lab?: LabResource, onFinished: () => void }) {
  const { toast } = useToast();
  const { addLab, updateLab } = useSubjectStore();
  const isEditing = !!lab;

  const form = useForm<LabFormValues>({
    resolver: zodResolver(labResourceSchema),
    defaultValues: isEditing ? {
      ...lab,
      manuals: lab.manuals || [],
    } : {
      subjectName: '',
      subjectCode: '',
      branchName: '',
      semester: 3,
      manuals: [{ name: '', url: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "manuals",
  });

  const onSubmit = async (data: LabFormValues) => {
    try {
      if (isEditing && lab) {
        await updateLab(lab.id, data);
        toast({ title: "Lab Updated", description: "The lab resource has been saved." });
      } else {
        await addLab(data);
        toast({ title: "Lab Added", description: "The new lab resource has been created." });
      }
      onFinished();
      form.reset();
    } catch (error) {
      toast({ title: "Error", description: "An error occurred.", variant: "destructive" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="subjectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Name</FormLabel>
                  <FormControl><Input placeholder="e.g., Analog & Digital Electronics" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="subjectCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Code</FormLabel>
                  <FormControl><Input placeholder="e.g., 22CSL37" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="branchName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch Name</FormLabel>
                  <FormControl><Input placeholder="e.g., CSE / ISE" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semester</FormLabel>
                   <FormControl><Input type="number" min="1" max="8" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Manuals</CardTitle>
                <CardDescription>Add one or more download links for this lab.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {fields.map((field, index) => (
                     <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-2 items-start p-3 border rounded-md relative bg-background">
                        <div className="col-span-12 md:col-span-5">
                             <FormField
                                control={form.control}
                                name={`manuals.${index}.name`}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-xs">Manual Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Full Lab Manual" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                           <FormField
                                control={form.control}
                                name={`manuals.${index}.url`}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-xs">Download URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://..." {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                         <div className="col-span-12 md:col-span-1 flex items-end justify-end h-full">
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                className="text-destructive hover:bg-destructive/10"
                            >
                                <Trash2 className="w-4 h-4"/>
                            </Button>
                        </div>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={() => append({ name: '', url: '' })}>
                    <Plus className="mr-2 h-4 w-4" /> Add Manual
                </Button>
            </CardContent>
        </Card>

        <DialogFooter>
            <Button type="button" variant="ghost" onClick={onFinished}>Cancel</Button>
            <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Save Changes" : "Create Lab Resource"}
            </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}


export default function ManageLabsPage() {
  const { labs, isLoading, deleteLab } = useSubjectStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLab, setEditingLab] = useState<LabResource | undefined>(undefined);
  const { toast } = useToast();

  const handleOpenDialog = (lab?: LabResource) => {
    setEditingLab(lab);
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
      setDialogOpen(false);
      setEditingLab(undefined);
  }

  const handleDelete = async (id: string) => {
    try {
        await deleteLab(id);
        toast({ title: "Lab Deleted" });
    } catch(e) {
        toast({ title: "Error deleting lab", variant: "destructive"});
    }
  }

  return (
    <div className="space-y-6">
      <Dialog open={dialogOpen} onOpenChange={(isOpen) => { if (!isOpen) handleCloseDialog(); else setDialogOpen(true);}}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manage Lab Resources</CardTitle>
              <CardDescription>
                Add, edit, or delete standalone lab resources for the platform.
              </CardDescription>
            </div>
             <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Lab Resource
                </Button>
            </DialogTrigger>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject Name</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead className="text-center">Manuals</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [...Array(3)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2" />
                        </TableCell>
                         <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                         <TableCell className="text-center"><Skeleton className="h-6 w-8 mx-auto" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : labs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No lab resources found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    labs.map((lab) => (
                      <TableRow key={lab.id}>
                        <TableCell>
                          <p className="font-bold">{lab.subjectName}</p>
                          <p className="text-sm text-muted-foreground font-code">{lab.subjectCode} / Sem {lab.semester}</p>
                        </TableCell>
                        <TableCell>{lab.branchName}</TableCell>
                        <TableCell className="text-center">{lab.manuals.length}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                                <Button variant="outline" size="icon" onClick={() => handleOpenDialog(lab)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                 <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will permanently delete the lab resource "{lab.subjectName}". This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(lab.id)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
         <DialogContent className="sm:max-w-xl">
            <DialogHeader>
            <DialogTitle>{editingLab ? 'Edit Lab Resource' : 'Add New Lab Resource'}</DialogTitle>
            <DialogDescription>
                Fill in the details for the lab below.
            </DialogDescription>
            </DialogHeader>
            <LabResourceForm lab={editingLab} onFinished={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
