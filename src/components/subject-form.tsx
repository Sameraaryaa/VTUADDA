
"use client";

import { useForm, useFieldArray, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save } from "lucide-react";

import { useSubjectStore } from "@/lib/store";
import type { Subject, Branch, Note } from "@/lib/types";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "./ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
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

const noteSchema = z.object({
  name: z.string().min(1, "Note name is required."),
  url: z.string().url("Please enter a valid URL."),
});

const moduleSchema = z.object({
  moduleNumber: z.number(),
  name: z.string().optional(),
  description: z.string().optional(),
  notes: z.array(noteSchema).optional(),
});

const subjectFormSchema = z.object({
  code: z.string().min(1, "Subject code is required.").regex(/^[a-zA-Z0-9-]{3,15}$/, 'Code can only contain letters, numbers, and hyphens.'),
  name: z.string().min(3, "Subject name is required."),
  credits: z.coerce.number().min(0, "Credits cannot be negative.").optional(),
  semester: z.coerce.number().min(1, "Semester is required.").max(8),
  branch: z.array(z.string()).optional(),
  type: z.string().optional(),
  modules: z.array(moduleSchema).optional(),
  modelQuestionPapers: z.array(noteSchema).optional(),
  pyqs: z.array(noteSchema).optional(),
  labs: z.array(noteSchema).optional(),
});

type SubjectFormValues = z.infer<typeof subjectFormSchema>;

interface SubjectFormProps {
  subject?: Subject;
}

const NoteFieldArray = ({ control, name, title, description }: { control: any, name: `modelQuestionPapers` | `pyqs` | 'labs', title: string, description?: string }) => {
    const { fields, append, remove } = useFieldArray({ control, name });
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-2 items-start p-3 border rounded-md relative bg-background">
                        <div className="col-span-12 md:col-span-5">
                            <FormField
                                control={control}
                                name={`${name}.${index}.name`}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-xs">Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. June/July 2023 Paper" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={control}
                                name={`${name}.${index}.url`}
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
                                aria-label="Remove Item"
                            >
                                <Trash2 className="w-4 h-4"/>
                            </Button>
                        </div>
                    </div>
                ))}
                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => append({ name: "", url: ""})}
                >
                    <Plus className="mr-2 h-4 w-4"/> Add Entry
                </Button>
            </CardContent>
        </Card>
    );
}

function ModuleAccordionItem({ control, moduleIndex, removeModule, watch }: { control: Control<SubjectFormValues>, moduleIndex: number, removeModule: (index: number) => void, watch: Function }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `modules.${moduleIndex}.notes`
    });

    const noteCount = watch(`modules.${moduleIndex}.notes`)?.filter((n: Note) => n.name && n.url).length || 0;
    const moduleName = watch(`modules.${moduleIndex}.name`);

    return (
        <AccordionItem value={`module-${moduleIndex}`} className="border rounded-lg px-4 bg-background">
            <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full items-center pr-2">
                    <div className="flex items-center gap-4">
                        <h3 className="text-lg font-semibold">{moduleName || `Module ${moduleIndex + 1}`}</h3>
                        {noteCount > 0 && <Badge>{noteCount} Note(s)</Badge>}
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
                <FormField
                    control={control}
                    name={`modules.${moduleIndex}.name`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Module Name (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder={`e.g., Introduction to Linked Lists`} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name={`modules.${moduleIndex}.description`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Module Description (Optional)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="A brief description of topics covered in this module..." {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {fields.map((noteField, noteIndex) => (
                    <div key={noteField.id} className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-2 items-start p-3 border rounded-md relative">
                        <div className="col-span-12 md:col-span-5">
                            <FormField
                                control={control}
                                name={`modules.${moduleIndex}.notes.${noteIndex}.name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs">Note Name</FormLabel>
                                        <FormControl><Input placeholder="e.g. Lecture 1 Slides" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={control}
                                name={`modules.${moduleIndex}.notes.${noteIndex}.url`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs">Download URL</FormLabel>
                                        <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-1 flex items-end justify-end h-full">
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(noteIndex)}
                                className="text-destructive hover:bg-destructive/10"
                                aria-label="Remove Note"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
                <div className="flex gap-2 flex-wrap">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-grow"
                        onClick={() => append({ name: "", url: "" })}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Note
                    </Button>
                </div>
                <div className="pt-4 border-t">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="button" variant="destructive" className="w-full">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Module {moduleIndex + 1}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action will permanently delete Module {moduleIndex + 1} and all of its associated notes. This cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => removeModule(moduleIndex)}>
                                    Confirm Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}

export function SubjectForm({ subject }: SubjectFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { addSubject, updateSubject, deleteSubject, getSubjectByCode, branches } = useSubjectStore();
  const isEditing = !!subject;

  const defaultValues: Partial<SubjectFormValues> = {
      code: '',
      name: '',
      credits: 0,
      semester: 1,
      branch: [],
      type: '',
      modules: Array.from({ length: 5 }, (_, i) => ({ moduleNumber: i + 1, name: ``, description: "", notes: [] })),
      modelQuestionPapers: [],
      pyqs: [],
      labs: [],
      ...subject,
  }

  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: defaultValues as SubjectFormValues,
  });

  const { fields, append: appendModule, remove: removeModule } = useFieldArray({
    control: form.control,
    name: "modules",
  });

  const filterEmptyNotes = (notes: Note[] | undefined): Note[] => {
    if (!notes) return [];
    return notes.filter(note => note.name?.trim() !== '' && note.url?.trim() !== '');
  }

  const onSubmit = async (data: SubjectFormValues) => {
    // Sanitize data before submitting to Firestore
    const cleanedData = {
        ...data,
        type: data.type || '',
        branch: data.branch || [],
        modules: (data.modules || []).map((module, index) => ({
            moduleNumber: index + 1,
            name: module.name || '',
            description: module.description || '',
            notes: filterEmptyNotes(module.notes || []),
        })),
        modelQuestionPapers: filterEmptyNotes(data.modelQuestionPapers || []),
        pyqs: filterEmptyNotes(data.pyqs || []),
        labs: filterEmptyNotes(data.labs || []),
    };

    try {
      if (isEditing) {
        await updateSubject(subject.code, cleanedData as Subject);
        toast({
          title: "Subject Updated",
          description: `"${data.name}" has been successfully updated.`,
        });
      } else {
         if (getSubjectByCode(data.code)) {
           form.setError("code", { message: "This subject code already exists." });
           return;
         }
        await addSubject(cleanedData as Subject);
        toast({
          title: "Subject Created",
          description: `"${data.name}" has been successfully created.`,
        });
      }
      const primaryBranchId = data.branch?.[0] || 'first-year';
      router.push(`/udda#${primaryBranchId}`);
      router.refresh();
    } catch (error) {
        console.error("Error saving subject: ", error);
        toast({
            title: "Operation Failed",
            description: "An error occurred while saving the subject.",
            variant: "destructive"
        })
    }
  };
  
  const handleDeleteSubject = async () => {
    if (!isEditing) return;
    try {
        await deleteSubject(subject.code);
        toast({
            title: "Subject Deleted",
            description: `Subject "${subject.name}" (${subject.code}) has been deleted.`
        });
        router.push("/udda");
        router.refresh();
    } catch (error) {
        toast({
            title: "Error Deleting Subject",
            description: "An unexpected error occurred.",
            variant: "destructive"
        })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? `Edit: ${subject.name}` : "Create New Subject"}</CardTitle>
            <CardDescription>
              {isEditing
                ? "Modify the details for this subject."
                : "Fill out the form to add a new subject to the database."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Data Structures" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., BCS301"
                        {...field}
                        className="font-code uppercase"
                      />
                    </FormControl>
                    <FormDescription>
                       The subject code must be unique.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="credits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credits</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
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
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={String(field.value || 1)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a semester" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                          <SelectItem key={sem} value={String(sem)}>
                            {sem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., elective" {...field} />
                    </FormControl>
                     <FormDescription>
                      Optional: e.g., 'elective'
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="branch"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Branches</FormLabel>
                    <FormDescription>
                      Select the branches this subject applies to. Leave blank for 1st/2nd sem (it will be assigned to 'First Year' automatically).
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {Object.entries(branches).filter(([branchId]) => branchId !== 'first-year').map(([branchId, branchInfo]) => (
                    <FormField
                      key={branchId}
                      control={form.control}
                      name="branch"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={branchId}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(branchId)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), branchId])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== branchId
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {(branchInfo as Branch).name}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage Modules & Notes</CardTitle>
            <CardDescription>
              Add or remove notes for each module. You can also customize module names and descriptions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full space-y-4" defaultValue={['module-0']}>
                {fields.map((moduleField, moduleIndex) => (
                    <ModuleAccordionItem
                        key={moduleField.id}
                        control={form.control}
                        moduleIndex={moduleIndex}
                        removeModule={removeModule}
                        watch={form.watch}
                    />
                ))}
            </Accordion>
            <Button
                type="button"
                variant="outline"
                onClick={() => appendModule({ moduleNumber: fields.length + 1, name: ``, description: "", notes: [] })}
                className="mt-4"
            >
                <Plus className="mr-2 h-4 w-4" /> Add Module
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
            <NoteFieldArray control={form.control} name="modelQuestionPapers" title="Model Question Papers" />
            <NoteFieldArray control={form.control} name="pyqs" title="Previous Year Questions (PYQs)" />
            <NoteFieldArray control={form.control} name="labs" title="Lab Manuals" description="Add links to lab manuals or other related resources."/>
        </div>

        <div className="flex justify-between">
            {isEditing && (
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button type="button" variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Subject
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete the subject <strong className="font-semibold text-foreground">{subject.name}</strong>. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteSubject}>Delete Subject</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
            <Button type="submit" size="lg" className={!isEditing ? "w-full" : ""}>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Save Changes" : "Create Subject"}
            </Button>
        </div>
      </form>
    </Form>
  );
}
